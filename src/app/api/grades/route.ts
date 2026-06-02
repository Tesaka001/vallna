import { NextResponse } from "next/server";

import { isValidDateString, todayInTimezone } from "@/lib/journal/dates";
import {
  parseCategoryId,
  parseGrade,
  parseOptionalNote,
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

export async function GET(request: Request) {
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !isValidDateString(date)) {
    return NextResponse.json({ error: "Valid date query parameter required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("daily_grades")
    .select(
      "id, category_id, grade, note, grade_date, created_at, updated_at, tracking_categories ( id, name, emoji, is_active )",
    )
    .eq("user_id", user.id)
    .eq("grade_date", date)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Could not load grades." }, { status: 500 });
  }

  return NextResponse.json({ grades: data ?? [] });
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
    const categoryId = parseCategoryId(payload.category_id);
    const grade = parseGrade(payload.grade);
    const note = parseOptionalNote(payload.note);

    let gradeDate =
      typeof payload.grade_date === "string" ? payload.grade_date : undefined;

    if (gradeDate && !isValidDateString(gradeDate)) {
      throw new TrackingValidationError("Invalid grade date.");
    }

    if (!gradeDate) {
      const { data: profile } = await supabase
        .from("users")
        .select("timezone")
        .eq("id", user.id)
        .single();

      gradeDate = todayInTimezone(profile?.timezone ?? "UTC");
    }

    const { data: category, error: categoryError } = await supabase
      .from("tracking_categories")
      .select("id")
      .eq("id", categoryId)
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    if (categoryError || !category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    const { data: existing } = await supabase
      .from("daily_grades")
      .select("id")
      .eq("user_id", user.id)
      .eq("category_id", categoryId)
      .eq("grade_date", gradeDate)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from("daily_grades")
        .update({ grade, note })
        .eq("id", existing.id)
        .eq("user_id", user.id)
        .select(
          "id, category_id, grade, note, grade_date, created_at, updated_at, tracking_categories ( id, name, emoji, is_active )",
        )
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Could not save grade." }, { status: 500 });
      }

      return NextResponse.json({ grade: data });
    }

    const { data, error } = await supabase
      .from("daily_grades")
      .insert({
        user_id: user.id,
        category_id: categoryId,
        grade,
        note,
        grade_date: gradeDate,
      })
      .select(
        "id, category_id, grade, note, grade_date, created_at, updated_at, tracking_categories ( id, name, emoji, is_active )",
      )
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Could not save grade." }, { status: 500 });
    }

    return NextResponse.json({ grade: data }, { status: 201 });
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
