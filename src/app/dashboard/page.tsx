import Link from "next/link";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("display_name, onboarding_complete")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const greeting = profile.display_name?.trim() || "You";

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col items-center gap-10">
        <AppHeader active="dashboard" />
        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome, {greeting}.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Your profile is set. Start with today&apos;s journal — multiple entries
            per day are welcome.
          </p>
          <Button render={<Link href="/journal" />} size="lg">
            Open journal
          </Button>
        </div>
      </div>
    </div>
  );
}
