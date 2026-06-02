import { NextResponse } from "next/server";

import {
  parseCategoryName,
  parseOptionalEmoji,
  TrackingValidationError,
} from "@/lib/tracking/validate";
import type { TablesUpdate } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
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
    const updates: TablesUpdate<"tracking_categories"> = {};

    if ("name" in payload) {
      updates.name = parseCategoryName(payload.name);
    }
    if ("emoji" in payload) {
      updates.emoji = parseOptionalEmoji(payload.emoji);
    }
    if ("display_order" in payload) {
      const order = payload.display_order;
      if (typeof order !== "number" || !Number.isInteger(order) || order < 0) {
        throw new TrackingValidationError("Invalid display order.");
      }
      updates.display_order = order;
    }

    if (Object.keys(updates).length === 0) {
      throw new TrackingValidationError("Nothing to update.");
    }

    const { data, error } = await supabase
      .from("tracking_categories")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("is_active", true)
      .select("id, name, emoji, is_active, display_order, created_at, updated_at")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ category: data });
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

/** Soft-delete: preserves historical grades (§5.5). */
export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { supabase, user } = await requireUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("tracking_categories")
    .update({ is_active: false })
    .eq("id", id)
    .eq("user_id", user.id)
    .eq("is_active", true)
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
