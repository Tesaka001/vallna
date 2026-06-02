import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import type { ReportType } from "@/lib/supabase/types";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const limit = Math.min(Number(searchParams.get("limit") ?? "30"), 100);

  let query = supabase
    .from("reports")
    .select(
      "id, report_type, period_start, period_end, content, generated_at, delivered_at, model_used",
    )
    .eq("user_id", user.id)
    .order("generated_at", { ascending: false })
    .limit(limit);

  const validTypes: ReportType[] = ["daily", "weekly", "monthly"];
  if (type && validTypes.includes(type as ReportType)) {
    query = query.eq("report_type", type as ReportType);
  }

  if (from) {
    query = query.gte("period_start", from);
  }
  if (to) {
    query = query.lte("period_end", to);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Could not load reports." }, { status: 500 });
  }

  return NextResponse.json({ reports: data ?? [] });
}
