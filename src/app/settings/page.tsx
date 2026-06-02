import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { createClient } from "@/lib/supabase/server";
import type { NotificationPreference } from "@/lib/supabase/types";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/settings");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_complete, notification_preference")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const preference =
    (profile.notification_preference as NotificationPreference) ?? "both";

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-10">
        <AppHeader active="settings" />
        <NotificationSettings initialPreference={preference} />
      </div>
    </div>
  );
}
