import { formatInTimeZone } from "date-fns-tz";
import { NextResponse } from "next/server";

import { todayInTimezone } from "@/lib/journal/dates";
import { isLlmConfigured } from "@/lib/llm/client";
import { deliverPendingReports } from "@/lib/notifications/deliver-report";
import { generateDailyReport } from "@/lib/reports/pipeline/daily";
import { createAdminClient } from "@/lib/supabase/admin";

function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

/** Hourly cron: generate daily reports for users whose local time is 23:00. */
export async function POST(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isLlmConfigured()) {
    return NextResponse.json({ error: "LLM not configured." }, { status: 503 });
  }

  const supabase = createAdminClient();
  const { data: users, error } = await supabase
    .from("users")
    .select("id, timezone")
    .eq("onboarding_complete", true);

  if (error || !users) {
    return NextResponse.json({ error: "Could not load users." }, { status: 500 });
  }

  const results = {
    processed: 0,
    generated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const user of users) {
    const timezone = user.timezone ?? "UTC";
    const localHour = Number(formatInTimeZone(new Date(), timezone, "H"));

    if (localHour !== 23) {
      continue;
    }

    results.processed += 1;
    const reportDate = todayInTimezone(timezone);
    const outcome = await generateDailyReport(supabase, user.id, reportDate);

    if (outcome.status === "generated") {
      results.generated += 1;
    } else if (outcome.status === "failed") {
      results.failed += 1;
    } else {
      results.skipped += 1;
    }
  }

  const delivered = await deliverPendingReports(supabase);

  return NextResponse.json({ success: true, results, delivered });
}
