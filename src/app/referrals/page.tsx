import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { ReferralShare } from "@/components/referrals/referral-share";
import { ReviewPrompt } from "@/components/referrals/review-prompt";
import { getStoreLinks } from "@/lib/referrals/stores";
import { createClient } from "@/lib/supabase/server";

export default async function ReferralsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/referrals");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const storeLinks = getStoreLinks();

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-10">
        <AppHeader active="referrals" />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Share Vallna</h1>
          <p className="text-sm text-muted-foreground">
            Pass the passage on — and, when the app is in the stores, leave a review
            so others can find their way here.
          </p>
        </div>
        <ReferralShare />
        <ReviewPrompt storeLinks={storeLinks} variant="page" />
      </div>
    </div>
  );
}
