"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const DEFAULT_REDIRECT = "/dashboard";

function safeRedirectTo(value: FormDataEntryValue | null): string {
  // Only allow same-origin relative paths to avoid open-redirects.
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return DEFAULT_REDIRECT;
}

async function getOrigin(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  );
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeRedirectTo(formData.get("redirectTo"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Where the email confirmation link returns the user.
      emailRedirectTo: `${origin}/auth/confirm?next=${DEFAULT_REDIRECT}`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // If email confirmation is enabled, the session is not yet active.
  redirect("/signup?checkEmail=1");
}

export async function signInWithGoogle(formData: FormData) {
  const redirectTo = safeRedirectTo(formData.get("redirectTo"));
  const supabase = await createClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
