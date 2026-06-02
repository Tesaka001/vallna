import { redirect } from "next/navigation";

import { signout } from "../(auth)/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already gates this route; re-check here for defense in depth.
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <span className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
        Vallna
      </span>
      <h1 className="text-3xl font-semibold tracking-tight">
        You&apos;re signed in.
      </h1>
      <p className="text-muted-foreground">{user.email}</p>
      <form action={signout}>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </form>
    </div>
  );
}
