import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  REFERRER_COOKIE_MAX_AGE,
  REFERRER_COOKIE_NAME,
} from "@/lib/referrals/constants";
import { isValidReferrerId } from "@/lib/referrals/validate";

import type { Database } from "./types";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/auth", "/error"];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isOnboardingExempt(pathname: string): boolean {
  return (
    pathname === "/onboarding" ||
    pathname.startsWith("/api/onboarding") ||
    pathname.startsWith("/auth") ||
    pathname === "/error"
  );
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const refParam = request.nextUrl.searchParams.get("ref");
  if (
    refParam &&
    isValidReferrerId(refParam) &&
    (pathname === "/signup" || pathname === "/")
  ) {
    supabaseResponse.cookies.set(REFERRER_COOKIE_NAME, refParam, {
      maxAge: REFERRER_COOKIE_MAX_AGE,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  if (!user && !isPublicRoute(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  let onboardingComplete = true;

  if (user) {
    const { data: appUser } = await supabase
      .from("users")
      .select("onboarding_complete")
      .eq("id", user.id)
      .single();

    onboardingComplete = appUser?.onboarding_complete ?? false;
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = onboardingComplete ? "/dashboard" : "/onboarding";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && !onboardingComplete && !isOnboardingExempt(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (user && onboardingComplete && pathname === "/onboarding") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
