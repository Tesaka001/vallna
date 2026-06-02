import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { attributeReferralIfPresent } from "@/lib/referrals/attribute";
import { REFERRER_COOKIE_NAME } from "@/lib/referrals/constants";
import { createClient } from "@/lib/supabase/server";

// Email confirmation / magic-link verification. Verifies the OTP token hash and
// establishes the session, then redirects to the intended destination.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        await attributeReferralIfPresent(user.id, user.email);
      }

      const response = NextResponse.redirect(`${origin}${next}`);
      response.cookies.delete(REFERRER_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/error?reason=confirm`);
}
