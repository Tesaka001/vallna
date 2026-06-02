import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { TrackingDayView } from "@/components/tracking/tracking-day-view";
import { isValidDateString, todayInTimezone } from "@/lib/journal/dates";
import { createClient } from "@/lib/supabase/server";

type TrackingPageProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function TrackingPage({ searchParams }: TrackingPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/tracking");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_complete, timezone")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const timezone = profile.timezone ?? "UTC";
  const params = await searchParams;
  const initialDate =
    params.date && isValidDateString(params.date)
      ? params.date
      : todayInTimezone(timezone);

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-10">
        <AppHeader active="tracking" />
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <TrackingDayView timezone={timezone} initialDate={initialDate} />
        </Suspense>
      </div>
    </div>
  );
}
