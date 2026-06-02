import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export type UserDataExport = {
  exported_at: string;
  export_version: "1.0";
  user: Record<string, unknown> | null;
  astro_profile: Record<string, unknown> | null;
  onboarding_surveys: Record<string, unknown>[];
  journal_entries: Record<string, unknown>[];
  tracking_categories: Record<string, unknown>[];
  daily_grades: Record<string, unknown>[];
  reports: Record<string, unknown>[];
  usage_costs: Record<string, unknown>[];
  push_subscriptions: Record<string, unknown>[];
  referrals_as_referrer: Record<string, unknown>[];
  referrals_as_referred: Record<string, unknown>[];
};

export async function exportUserData(userId: string): Promise<UserDataExport> {
  const supabase = createAdminClient();

  const [
    userResult,
    astroResult,
    surveysResult,
    journalResult,
    categoriesResult,
    gradesResult,
    reportsResult,
    usageResult,
    pushResult,
    referrerResult,
    referredResult,
  ] = await Promise.all([
    supabase.from("users").select("*").eq("id", userId).maybeSingle(),
    supabase.from("astro_profiles").select("*").eq("user_id", userId).maybeSingle(),
    supabase.from("onboarding_surveys").select("*").eq("user_id", userId),
    supabase.from("journal_entries").select("*").eq("user_id", userId),
    supabase.from("tracking_categories").select("*").eq("user_id", userId),
    supabase.from("daily_grades").select("*").eq("user_id", userId),
    supabase.from("reports").select("*").eq("user_id", userId),
    supabase.from("usage_costs").select("*").eq("user_id", userId),
    supabase.from("push_subscriptions").select("*").eq("user_id", userId),
    supabase.from("referrals").select("*").eq("referrer_user_id", userId),
    supabase.from("referrals").select("*").eq("referred_user_id", userId),
  ]);

  if (userResult.error) {
    throw new Error("Could not export user profile.");
  }

  return {
    exported_at: new Date().toISOString(),
    export_version: "1.0",
    user: userResult.data,
    astro_profile: astroResult.data,
    onboarding_surveys: surveysResult.data ?? [],
    journal_entries: journalResult.data ?? [],
    tracking_categories: categoriesResult.data ?? [],
    daily_grades: gradesResult.data ?? [],
    reports: reportsResult.data ?? [],
    usage_costs: usageResult.data ?? [],
    push_subscriptions: pushResult.data ?? [],
    referrals_as_referrer: referrerResult.data ?? [],
    referrals_as_referred: referredResult.data ?? [],
  };
}
