import { redirect } from "next/navigation";

import { signout } from "../(auth)/actions";
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
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <span className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
        Vallna
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">
        Welcome, {greeting}.
      </h1>
      <p className="max-w-md text-muted-foreground">
        Your profile is set. Journal and daily tracking arrive in the next steps.
      </p>
      <form action={signout}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
