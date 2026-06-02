import { NextResponse } from "next/server";

import { isValidDateString, todayInTimezone } from "@/lib/journal/dates";
import {
  JournalValidationError,
  parseJournalContent,
} from "@/lib/journal/validate";
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
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let query = supabase
    .from("journal_entries")
    .select("id, content, entry_date, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (date) {
    if (!isValidDateString(date)) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    query = query.eq("entry_date", date);
  } else if (from && to) {
    if (!isValidDateString(from) || !isValidDateString(to)) {
      return NextResponse.json({ error: "Invalid date range." }, { status: 400 });
    }
    query = query.gte("entry_date", from).lte("entry_date", to);
  } else {
    return NextResponse.json(
      { error: "Provide date or from/to query parameters." },
      { status: 400 },
    );
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Could not load entries." }, { status: 500 });
  }

  return NextResponse.json({ entries: data ?? [] });
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
    const content = parseJournalContent(payload.content);

    let entryDate =
      typeof payload.entry_date === "string" ? payload.entry_date : undefined;

    if (entryDate && !isValidDateString(entryDate)) {
      throw new JournalValidationError("Invalid entry date.");
    }

    if (!entryDate) {
      const { data: profile } = await supabase
        .from("users")
        .select("timezone")
        .eq("id", user.id)
        .single();

      const timezone = profile?.timezone ?? "UTC";
      entryDate = todayInTimezone(timezone);
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: user.id,
        content,
        entry_date: entryDate,
      })
      .select("id, content, entry_date, created_at, updated_at")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Could not save entry." }, { status: 500 });
    }

    return NextResponse.json({ entry: data }, { status: 201 });
  } catch (error) {
    if (error instanceof JournalValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
