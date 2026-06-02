import Link from "next/link";

import { Button } from "@/components/ui/button";

const REASONS: Record<string, string> = {
  oauth: "We couldn't complete sign-in with that provider. Please try again.",
  confirm: "That confirmation link is invalid or has expired.",
};

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message =
    (reason && REASONS[reason]) ?? "Something went wrong. Please try again.";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Something interrupted the flow</h1>
      <p className="max-w-sm text-muted-foreground">{message}</p>
      <Button render={<Link href="/login" />}>Back to sign in</Button>
    </div>
  );
}
