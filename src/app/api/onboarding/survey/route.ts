import { NextResponse } from "next/server";

import { computeAstroProfile } from "@/lib/astro/build-profile";
import { isLlmConfigured } from "@/lib/llm/client";
import {
  OnboardingValidationError,
  parseOnboardingPayload,
} from "@/lib/onboarding/validate";
import { scoreOnboardingSurvey } from "@/lib/reports/pipeline/onboarding-score";
import type { Json } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const payload = parseOnboardingPayload(body);
    const astro = await computeAstroProfile({
      birthDate: payload.birth_date,
      birthTime: payload.birth_time,
      birthLocation: payload.birth_location,
      timezone: payload.timezone,
    });

    const completedAt = new Date().toISOString();

    const profileJson = astro.profile_json as Json;

    const { error: profileError } = await supabase
      .from("astro_profiles")
      .upsert(
        {
          user_id: user.id,
          birth_date: astro.birth_date,
          birth_time: astro.birth_time,
          birth_location: astro.birth_location,
          birth_lat: astro.birth_lat,
          birth_lng: astro.birth_lng,
          sun_sign: astro.sun_sign,
          moon_sign: astro.moon_sign,
          rising_sign: astro.rising_sign,
          dreamspell_kin: astro.dreamspell_kin,
          dreamspell_seal: astro.dreamspell_seal,
          dreamspell_tone: astro.dreamspell_tone,
          dreamspell_wavespell: astro.dreamspell_wavespell,
          profile_json: profileJson,
          computed_at: astro.computed_at,
        },
        { onConflict: "user_id" },
      );

    if (profileError) {
      return NextResponse.json(
        { error: "Could not save profile." },
        { status: 500 },
      );
    }

    let selfPerceptionScore: number | null = null;
    let surveyResponses: Record<string, unknown> = { ...payload.responses };

    if (isLlmConfigured()) {
      const score = await scoreOnboardingSurvey({
        userId: user.id,
        responses: payload.responses,
        profileJson,
      });

      if (score) {
        selfPerceptionScore = score.self_perception_score;
        surveyResponses = {
          ...payload.responses,
          _alignment_summary: score.alignment_summary,
          _tension_points: score.tension_points,
        };
      }
    }

    const { error: surveyError } = await supabase
      .from("onboarding_surveys")
      .insert({
        user_id: user.id,
        responses: surveyResponses as Json,
        self_perception_score: selfPerceptionScore,
        completed_at: completedAt,
      });

    if (surveyError) {
      return NextResponse.json(
        { error: "Could not save survey." },
        { status: 500 },
      );
    }

    const { error: userError } = await supabase
      .from("users")
      .update({
        display_name: payload.display_name ?? null,
        timezone: payload.timezone,
        onboarding_complete: true,
      })
      .eq("id", user.id);

    if (userError) {
      return NextResponse.json(
        { error: "Could not update user profile." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof OnboardingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
