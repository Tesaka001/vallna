import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { sendReportEmail, isEmailConfigured } from "./email";
import { isPushConfigured, sendReportPushToUser } from "./push";
import type { Database, NotificationPreference } from "@/lib/supabase/types";

function appUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function reportSubject(reportType: string, periodStart: string): string {
  if (reportType === "weekly") {
    return `Your weekly report · ${periodStart}`;
  }
  if (reportType === "monthly") {
    return `Your monthly report · ${periodStart}`;
  }
  return `Your daily report · ${periodStart}`;
}

function previewFromContent(content: string): string {
  const lines = content.split("\n").filter(Boolean);
  return lines.slice(0, 3).join("\n");
}

export async function deliverReport(
  supabase: SupabaseClient<Database>,
  reportId: string,
): Promise<{ delivered: boolean; channels: string[] }> {
  const { data: report } = await supabase
    .from("reports")
    .select(
      "id, user_id, report_type, period_start, content, delivered_at",
    )
    .eq("id", reportId)
    .single();

  if (!report || report.delivered_at) {
    return { delivered: false, channels: [] };
  }

  if (!report.content) {
    await supabase
      .from("reports")
      .update({ delivered_at: new Date().toISOString() })
      .eq("id", reportId);
    return { delivered: true, channels: ["skipped_empty"] };
  }

  const { data: user } = await supabase
    .from("users")
    .select("email, display_name, notification_preference")
    .eq("id", report.user_id)
    .single();

  if (!user) {
    return { delivered: false, channels: [] };
  }

  const preference = user.notification_preference as NotificationPreference;
  const reportUrl = `${appUrl()}/reports/${reportId}`;
  const channels: string[] = [];

  if (preference === "none") {
    await supabase
      .from("reports")
      .update({ delivered_at: new Date().toISOString() })
      .eq("id", reportId);
    return { delivered: true, channels: ["in_app_only"] };
  }

  if (
    (preference === "email" || preference === "both") &&
    isEmailConfigured()
  ) {
    await sendReportEmail({
      to: user.email,
      displayName: user.display_name,
      subject: reportSubject(report.report_type, report.period_start),
      preview: previewFromContent(report.content),
      reportUrl,
    });
    channels.push("email");
  }

  if (
    (preference === "push" || preference === "both") &&
    isPushConfigured()
  ) {
    const sent = await sendReportPushToUser(supabase, report.user_id, {
      title: "Your report is ready",
      body: previewFromContent(report.content).slice(0, 140),
      url: reportUrl,
    });
    if (sent > 0) {
      channels.push("push");
    }
  }

  await supabase
    .from("reports")
    .update({ delivered_at: new Date().toISOString() })
    .eq("id", reportId);

  return { delivered: true, channels };
}

/** Deliver any generated reports that have not yet been sent. */
export async function deliverPendingReports(
  supabase: SupabaseClient<Database>,
  userId?: string,
): Promise<number> {
  let query = supabase
    .from("reports")
    .select("id")
    .is("delivered_at", null)
    .not("content", "is", null)
    .limit(50);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data: pending } = await query;

  if (!pending?.length) {
    return 0;
  }

  let count = 0;
  for (const row of pending) {
    const result = await deliverReport(supabase, row.id);
    if (result.delivered) {
      count += 1;
    }
  }

  return count;
}
