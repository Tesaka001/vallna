"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ReferralRow = {
  id: string;
  referred_email: string | null;
  referred_user_id: string | null;
  converted_at: string | null;
  created_at: string;
};

type ReferralsPayload = {
  link: string;
  referrals: ReferralRow[];
  stats: { total: number; converted: number };
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ReferralShare() {
  const [payload, setPayload] = useState<ReferralsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareSupported, setShareSupported] = useState(false);

  const loadReferrals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/referrals");
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not load referral link.");
      }

      const data = (await res.json()) as ReferralsPayload;
      setPayload(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load referral link.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setShareSupported(typeof navigator !== "undefined" && "share" in navigator);
    void loadReferrals();
  }, [loadReferrals]);

  async function copyLink() {
    if (!payload?.link) {
      return;
    }

    try {
      await navigator.clipboard.writeText(payload.link);
      setCopyMessage("Link copied.");
    } catch {
      setCopyMessage("Could not copy — select the link and copy manually.");
    }
  }

  async function shareLink() {
    if (!payload?.link || !shareSupported) {
      return;
    }

    try {
      await navigator.share({
        title: "Vallna",
        text: "A truth app for honest pattern detection and growth.",
        url: payload.link,
      });
    } catch {
      // User cancelled share sheet — no error needed.
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-border p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium">Your referral link</h2>
        <p className="text-sm text-muted-foreground">
          Share Vallna with someone who would benefit from honest reflection. When
          they sign up through your link, it is recorded here.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-muted-foreground">Loading your link…</p>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && payload && (
        <>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input readOnly value={payload.link} aria-label="Referral link" />
            <div className="flex shrink-0 gap-2">
              <Button type="button" onClick={() => void copyLink()}>
                Copy link
              </Button>
              {shareSupported && (
                <Button type="button" variant="outline" onClick={() => void shareLink()}>
                  Share
                </Button>
              )}
            </div>
          </div>

          {copyMessage && (
            <p className="text-sm text-muted-foreground">{copyMessage}</p>
          )}

          <div className="rounded-md bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <p>
              {payload.stats.converted === 0
                ? "No one has joined through your link yet."
                : `${payload.stats.converted} ${
                    payload.stats.converted === 1 ? "person has" : "people have"
                  } joined through your link.`}
            </p>
          </div>

          {payload.referrals.length > 0 && (
            <ul className="flex flex-col gap-2 border-t border-border pt-4">
              {payload.referrals.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <span className="text-foreground">
                    {row.referred_email ?? "New member"}
                  </span>
                  <span className="text-muted-foreground">
                    {row.converted_at
                      ? `Joined ${formatDate(row.converted_at)}`
                      : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
