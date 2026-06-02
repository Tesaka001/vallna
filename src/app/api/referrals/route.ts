import { NextResponse } from "next/server";

import { buildReferralLink } from "@/lib/referrals/link";
import { createClient } from "@/lib/supabase/server";

async function loadReferralsForUser(userId: string) {
  const supabase = await createClient();

  const { data: referrals, error } = await supabase
    .from("referrals")
    .select(
      "id, referred_email, referred_user_id, converted_at, created_at",
    )
    .eq("referrer_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return null;
  }

  const converted = referrals?.filter((row) => row.converted_at).length ?? 0;

  return {
    link: buildReferralLink(userId),
    referrals: referrals ?? [],
    stats: {
      total: referrals?.length ?? 0,
      converted,
    },
  };
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await loadReferralsForUser(user.id);
  if (!payload) {
    return NextResponse.json({ error: "Could not load referrals." }, { status: 500 });
  }

  return NextResponse.json(payload);
}

/** Generate (or return) the referral link for the current user. Idempotent. */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await loadReferralsForUser(user.id);
  if (!payload) {
    return NextResponse.json({ error: "Could not generate link." }, { status: 500 });
  }

  return NextResponse.json({
    link: payload.link,
    stats: payload.stats,
  });
}
