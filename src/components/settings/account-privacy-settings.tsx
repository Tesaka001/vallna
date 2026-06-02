"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DELETE_CONFIRMATION = "DELETE";

export function AccountPrivacySettings() {
  const router = useRouter();
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function downloadExport() {
    setExporting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/account/export");
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Export failed.");
      }

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition");
      const filenameMatch = disposition?.match(/filename="([^"]+)"/);
      const filename = filenameMatch?.[1] ?? "vallna-export.json";

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);

      setMessage("Your data export has been downloaded.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  }

  async function deleteAccount() {
    if (confirmation !== DELETE_CONFIRMATION) {
      setError(`Type ${DELETE_CONFIRMATION} to confirm.`);
      return;
    }

    setDeleting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation: DELETE_CONFIRMATION }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Could not delete account.");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete account.");
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 rounded-lg border border-border p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium">Your data</h2>
          <p className="text-sm text-muted-foreground">
            Download a copy of everything Vallna stores about you — profile, journal,
            grades, reports, and related records. See the{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              privacy policy
            </Link>{" "}
            for how we process your information.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => void downloadExport()}
          disabled={exporting}
        >
          {exporting ? "Preparing export…" : "Download my data"}
        </Button>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-destructive/30 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium text-destructive">Delete account</h2>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This cannot be
            undone. Journal entries, reports, and your astro profile will be removed.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="delete-confirmation">
            Type <span className="font-mono">{DELETE_CONFIRMATION}</span> to confirm
          </Label>
          <Input
            id="delete-confirmation"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
            disabled={deleting}
          />
        </div>

        <Button
          type="button"
          variant="destructive"
          onClick={() => void deleteAccount()}
          disabled={deleting || confirmation !== DELETE_CONFIRMATION}
        >
          {deleting ? "Deleting…" : "Delete my account permanently"}
        </Button>
      </section>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
