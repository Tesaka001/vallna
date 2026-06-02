import { NextResponse } from "next/server";

import { attributeReferralIfPresent } from "@/lib/referrals/attribute";
import { REFERRER_COOKIE_NAME } from "@/lib/referrals/constants";
import { createClient } from "@/lib/supabase/server";

function safeRedirectTo(value: string | null): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/dashboard";
}

// OAuth (and PKCE) callback. Exchanges the auth code for a session, then
// redirects to the intended destination.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeRedirectTo(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        await attributeReferralIfPresent(user.id, user.email);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      let response: NextResponse;
      if (isLocalEnv) {
        response = NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        response = NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        response = NextResponse.redirect(`${origin}${next}`);
      }

      response.cookies.delete(REFERRER_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/error?reason=oauth`);
}
