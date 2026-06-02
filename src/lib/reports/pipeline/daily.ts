import type { SupabaseClient } from "@supabase/supabase-js";

import { scanReportStrings } from "@/lib/llm/brand-voice";
import { logUsageCost } from "@/lib/llm/usage";
import { runJsonPrompt, LLM_MODELS } from "@/lib/llm/run-json-prompt";
import type { DailyReportOutput, Tier1Summary } from "@/lib/llm/types";
import {
  TIER1_SUMMARISER_PROMPT,
  TIER2_DAILY_REPORT_PROMPT,
} from "@/lib/prompts";
import {
  buildCalibrationNote,
  formatDailyReportContent,
  userJourneyDay,
} from "@/lib/reports/helpers";
import type { Database } from "@/lib/supabase/types";

export type DailyPipelineResult =
  | { status: "generated"; reportId: string }
  | { status: "skipped"; reason: "no_data" | "already_exists" | "recently_generated" }
  | { status: "failed" };

type GradeRow = {
  grade: number;
  note: string | null;
  tracking_categories: { name: string } | null;
};

export async function generateDailyReport(
  supabase: SupabaseClient<Database>,
  userId: string,
  reportDate: string,
): Promise<DailyPipelineResult> {
  const { data: existing } = await supabase
    .from("reports")
    .select("id, generated_at")
    .eq("user_id", userId)
    .eq("report_type", "daily")
    .eq("period_start", reportDate)
    .eq("period_end", reportDate)
    .maybeSingle();

  if (existing) {
    return { status: "skipped", reason: "already_exists" };
  }

  const twentyTwoHoursAgo = new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString();
  const { data: recentTier2 } = await supabase
    .from("usage_costs")
    .select("id")
    .eq("user_id", userId)
    .eq("operation", "daily_report_tier2")
    .gte("created_at", twentyTwoHoursAgo)
    .limit(1);

  if (recentTier2 && recentTier2.length > 0) {
    return { status: "skipped", reason: "recently_generated" };
  }

  const [{ data: journalEntries }, { data: grades }, { data: user }, { data: profile }, { data: survey }] =
    await Promise.all([
      supabase
        .from("journal_entries")
        .select("content, created_at")
        .eq("user_id", userId)
        .eq("entry_date", reportDate)
        .order("created_at", { ascending: true }),
      supabase
        .from("daily_grades")
        .select("grade, note, tracking_categories ( name )")
        .eq("user_id", userId)
        .eq("grade_date", reportDate),
      supabase.from("users").select("created_at").eq("id", userId).single(),
      supabase
        .from("astro_profiles")
        .select("profile_json")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("onboarding_surveys")
        .select("responses, self_perception_score")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  const hasJournal = (journalEntries?.length ?? 0) > 0;
  const hasGrades = (grades?.length ?? 0) > 0;

  if (!hasJournal && !hasGrades) {
    await supabase.from("reports").insert({
      user_id: userId,
      report_type: "daily",
      period_start: reportDate,
      period_end: reportDate,
      content: null,
      recommendations: { skipped: true, reason: "no_data" },
      model_used: null,
      tokens_used: 0,
    });
    return { status: "skipped", reason: "no_data" };
  }

  let tier1Summary: Tier1Summary | null = null;
  let totalTokens = 0;

  if (hasJournal) {
    const tier1Input = {
      journal_entries: journalEntries,
      grades: formatGrades(grades ?? []),
    };

    try {
      const tier1 = await runJsonPrompt<Tier1Summary>({
        system: TIER1_SUMMARISER_PROMPT,
        userMessage: JSON.stringify(tier1Input),
        model: LLM_MODELS.TIER1,
        maxOutputTokens: 500,
      });

      tier1Summary = tier1.data;
      totalTokens += tier1.inputTokens + tier1.outputTokens;

      await logUsageCost(supabase, {
        userId,
        operation: "daily_report_tier1",
        model: tier1.model,
        inputTokens: tier1.inputTokens,
        outputTokens: tier1.outputTokens,
      });
    } catch {
      await logUsageCost(supabase, {
        userId,
        operation: "failed_report",
        model: LLM_MODELS.TIER1,
        inputTokens: 0,
        outputTokens: 0,
      });
      return { status: "failed" };
    }
  }

  const journeyDay = user?.created_at
    ? userJourneyDay(user.created_at, reportDate)
    : 1;

  const responses = survey?.responses as Record<string, unknown> | null;
  const tensionPoints = Array.isArray(responses?._tension_points)
    ? responses._tension_points.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  const calibrationNote = buildCalibrationNote({
    score: survey?.self_perception_score ?? null,
    challenge: typeof responses?.challenge === "string" ? responses.challenge : null,
    tensionPoints,
    journeyDay,
  });

  const tier2UserMessage = JSON.stringify({
    report_date: reportDate,
    journey_day: journeyDay,
    no_journal_context: !hasJournal,
    tier1_summary: tier1Summary,
    grades: formatGrades(grades ?? []),
    user_profile: profile?.profile_json ?? null,
    calibration_note: calibrationNote,
    stated_focus:
      journeyDay <= 14 && typeof responses?.challenge === "string"
        ? responses.challenge
        : null,
  });

  try {
    const tier2 = await runJsonPrompt<DailyReportOutput>({
      system: TIER2_DAILY_REPORT_PROMPT,
      userMessage: tier2UserMessage,
      model: LLM_MODELS.TIER2,
      maxOutputTokens: 1000,
      retryHint: "Include headline, observation, recommendations (array), and closing.",
    });

    const violations = scanReportStrings([
      tier2.data.headline,
      tier2.data.observation,
      tier2.data.pattern_signal,
      tier2.data.insight_lens,
      tier2.data.closing,
      ...tier2.data.recommendations.map((r) => r.text),
    ]);

    if (violations.length > 0) {
      throw new Error("Brand voice violation detected.");
    }

    totalTokens += tier2.inputTokens + tier2.outputTokens;

    await logUsageCost(supabase, {
      userId,
      operation: "daily_report_tier2",
      model: tier2.model,
      inputTokens: tier2.inputTokens,
      outputTokens: tier2.outputTokens,
    });

    const content = formatDailyReportContent(tier2.data);

    const { data: report, error } = await supabase
      .from("reports")
      .insert({
        user_id: userId,
        report_type: "daily",
        period_start: reportDate,
        period_end: reportDate,
        content,
        recommendations: tier2.data,
        model_used: tier2.model,
        tokens_used: totalTokens,
      })
      .select("id")
      .single();

    if (error || !report) {
      return { status: "failed" };
    }

    return { status: "generated", reportId: report.id };
  } catch {
    await logUsageCost(supabase, {
      userId,
      operation: "failed_report",
      model: LLM_MODELS.TIER2,
      inputTokens: 0,
      outputTokens: 0,
    });
    return { status: "failed" };
  }
}

function formatGrades(grades: GradeRow[]) {
  return grades.map((row) => ({
    category: row.tracking_categories?.name ?? "Unknown",
    grade: row.grade,
    note: row.note,
  }));
}
