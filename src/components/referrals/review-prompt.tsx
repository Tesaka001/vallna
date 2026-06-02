"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { StoreLinks } from "@/lib/referrals/stores";

const DISMISS_KEY = "vallna_review_prompt_dismissed";

type ReviewPromptProps = {
  storeLinks: StoreLinks;
  variant?: "page" | "banner";
};

export function ReviewPrompt({
  storeLinks,
  variant = "page",
}: ReviewPromptProps) {
  const [dismissed, setDismissed] = useState(false);
  const hasLinks = Boolean(storeLinks.appStore || storeLinks.playStore);

  useEffect(() => {
    if (variant === "banner") {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
    }
  }, [variant]);

  function dismiss() {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  if (variant === "banner" && dismissed) {
    return null;
  }

  const containerClass =
    variant === "banner"
      ? "flex flex-col gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"
      : "flex flex-col gap-4 rounded-lg border border-border p-6";

  return (
    <section className={containerClass}>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">
          {variant === "banner" ? "Enjoying Vallna?" : "Leave a review"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {hasLinks
            ? "If Vallna has helped you stay honest with yourself, a short app store review helps others find it."
            : "When Vallna is listed on the App Store and Google Play (Step 12), a short review helps others find honest growth tools like this one. Store links will appear here once the PWA is published."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {storeLinks.appStore && (
          <Button render={<a href={storeLinks.appStore} target="_blank" rel="noopener noreferrer" />}>
            Review on App Store
          </Button>
        )}
        {storeLinks.playStore && (
          <Button
            render={<a href={storeLinks.playStore} target="_blank" rel="noopener noreferrer" />}
            variant={storeLinks.appStore ? "outline" : "default"}
          >
            Review on Google Play
          </Button>
        )}
        {variant === "banner" && (
          <Button type="button" variant="ghost" size="sm" onClick={dismiss}>
            Not now
          </Button>
        )}
      </div>
    </section>
  );
}
