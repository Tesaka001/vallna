import Link from "next/link";
import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { createClient } from "@/lib/supabase/server";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/onboarding");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_complete) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-16">
      <Link
        href="/"
        className="mb-12 text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground"
      >
        Vallna
      </Link>
      <OnboardingForm />
    </div>
  );
}
