import Link from "next/link";

import { signout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export function AppHeader({
  active,
}: {
  active?: "journal" | "tracking" | "reports" | "dashboard" | "settings";
}) {
  return (
    <header className="flex w-full max-w-2xl items-center justify-between gap-4">
      <Link
        href="/journal"
        className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground"
      >
        Vallna
      </Link>
      <nav className="flex flex-wrap items-center justify-end gap-2">
        <Button
          render={<Link href="/journal" />}
          variant={active === "journal" ? "default" : "ghost"}
          size="sm"
        >
          Journal
        </Button>
        <Button
          render={<Link href="/tracking" />}
          variant={active === "tracking" ? "default" : "ghost"}
          size="sm"
        >
          Tracking
        </Button>
        <Button
          render={<Link href="/reports" />}
          variant={active === "reports" ? "default" : "ghost"}
          size="sm"
        >
          Reports
        </Button>
        <Button
          render={<Link href="/settings" />}
          variant={active === "settings" ? "default" : "ghost"}
          size="sm"
        >
          Settings
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
