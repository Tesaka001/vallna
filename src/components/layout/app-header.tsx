import Link from "next/link";

import { signout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export function AppHeader({
  active,
}: {
  active?: "journal" | "dashboard";
}) {
  return (
    <header className="flex w-full max-w-2xl items-center justify-between gap-4">
      <Link
        href="/journal"
        className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground"
      >
        Vallna
      </Link>
      <nav className="flex items-center gap-2">
        <Button
          render={<Link href="/journal" />}
          variant={active === "journal" ? "default" : "ghost"}
          size="sm"
        >
          Journal
        </Button>
        <Button
          render={<Link href="/dashboard" />}
          variant={active === "dashboard" ? "default" : "ghost"}
          size="sm"
        >
          Home
        </Button>
        <form action={signout}>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </nav>
    </header>
  );
}
