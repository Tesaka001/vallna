import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-24 font-sans">
      <main className="flex w-full max-w-xl flex-col items-center gap-10 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Vallna
        </span>

        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          A truth app, not a comfort app.
        </h1>

        <p className="max-w-md text-pretty text-lg leading-8 text-muted-foreground">
          Honest pattern detection through daily journaling and AI-enriched
          insight. The poison transforms to cure.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/signup" />} size="lg">
            Begin
          </Button>
          <Button render={<Link href="/login" />} size="lg" variant="outline">
            Sign in
          </Button>
        </div>

        <p className="pt-8 text-xs uppercase tracking-widest text-muted-foreground/70">
          Installable PWA
        </p>
        <Link
          href="/privacy"
          className="text-xs text-muted-foreground underline underline-offset-4"
        >
          Privacy policy
        </Link>
      </main>
    </div>
  );
}
