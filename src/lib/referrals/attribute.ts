import "server-only";

import { cookies } from "next/headers";

import { createAdminClient } from "@/lib/supabase/admin";

import { REFERRER_COOKIE_NAME } from "./constants";
import { isValidReferrerId } from "./validate";

export async function getReferrerIdFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(REFERRER_COOKIE_NAME)?.value;
  if (!value || !isValidReferrerId(value)) {
    return null;
  }
  return value;
}

export async function attributeReferralIfPresent(
  referredUserId: string,
  referredEmail: string,
): Promise<boolean> {
  const referrerUserId = await getReferrerIdFromCookie();
  if (!referrerUserId) {
    return false;
  }

  return attributeReferral(referredUserId, referredEmail, referrerUserId);
}

export async function attributeReferral(
  referredUserId: string,
  referredEmail: string,
  referrerUserId: string,
): Promise<boolean> {
  if (referrerUserId === referredUserId) {
    return false;
  }

  const supabase = createAdminClient();

  const { data: referrer } = await supabase
    .from("users")
    .select("id")
    .eq("id", referrerUserId)
    .maybeSingle();

  if (!referrer) {
    return false;
  }

  const { data: existing } = await supabase
    .from("referrals")
    .select("id")
    .eq("referred_user_id", referredUserId)
    .maybeSingle();

  if (existing) {
    return false;
  }

  const { error } = await supabase.from("referrals").insert({
    referrer_user_id: referrerUserId,
    referred_email: referredEmail,
    referred_user_id: referredUserId,
    converted_at: new Date().toISOString(),
  });

  return !error;
}
