import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import type { NotificationPreference } from "@/lib/supabase/types";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select(
      "id, email, display_name, notification_preference, timezone, onboarding_complete",
    )
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  return NextResponse.json({ user: data });
}

export async function PATCH(request: Request) {
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

  const payload = body as Record<string, unknown>;
  const updates: {
    notification_preference?: NotificationPreference;
    display_name?: string;
  } = {};

  if ("notification_preference" in payload) {
    const value = payload.notification_preference;
    if (
      value !== "email" &&
      value !== "push" &&
      value !== "both" &&
      value !== "none"
    ) {
      return NextResponse.json(
        { error: "Invalid notification preference." },
        { status: 400 },
      );
    }
    updates.notification_preference = value;
  }

  if ("display_name" in payload && typeof payload.display_name === "string") {
    updates.display_name = payload.display_name.trim();
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", user.id)
    .select(
      "id, email, display_name, notification_preference, timezone, onboarding_complete",
    )
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }

  return NextResponse.json({ user: data });
}
