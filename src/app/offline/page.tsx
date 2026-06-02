import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-24">
      <main className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">You&apos;re offline</h1>
        <p className="text-sm text-muted-foreground">
          Vallna needs a connection to sync your journal and load reports. Check your
          network and try again.
        </p>
        <Button render={<Link href="/" />}>Try again</Button>
      </main>
    </div>
  );
}
