import { NextResponse } from "next/server";

import { MAX_TRACKING_CATEGORIES } from "@/lib/tracking/constants";
import {
  parseCategoryName,
  parseOptionalEmoji,
  TrackingValidationError,
} from "@/lib/tracking/validate";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function GET() {
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("tracking_categories")
    .select("id, name, emoji, is_active, display_order, created_at, updated_at")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Could not load categories." }, { status: 500 });
  }

  return NextResponse.json({ categories: data ?? [] });
}

export async function POST(request: Request) {
  const { supabase, user } = await requireUser();
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
    const payload = body as Record<string, unknown>;
    const name = parseCategoryName(payload.name);
    const emoji = parseOptionalEmoji(payload.emoji);

    const { count, error: countError } = await supabase
      .from("tracking_categories")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (countError) {
      return NextResponse.json({ error: "Could not create category." }, { status: 500 });
    }

    if ((count ?? 0) >= MAX_TRACKING_CATEGORIES) {
      return NextResponse.json(
        { error: `You can track up to ${MAX_TRACKING_CATEGORIES} categories.` },
        { status: 400 },
      );
    }

    const { data: lastCategory } = await supabase
      .from("tracking_categories")
      .select("display_order")
      .eq("user_id", user.id)
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const displayOrder = (lastCategory?.display_order ?? 0) + 1;

    const { data, error } = await supabase
      .from("tracking_categories")
      .insert({
        user_id: user.id,
        name,
        emoji,
        display_order: displayOrder,
        is_active: true,
      })
      .select("id, name, emoji, is_active, display_order, created_at, updated_at")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Could not create category." }, { status: 500 });
    }

    return NextResponse.json({ category: data }, { status: 201 });
  } catch (error) {
    if (error instanceof TrackingValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
