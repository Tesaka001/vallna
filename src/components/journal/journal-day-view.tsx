"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDisplayDate,
  formatEntryTime,
  shiftDate,
  todayInTimezone,
} from "@/lib/journal/dates";

type JournalEntry = {
  id: string;
  content: string;
  entry_date: string;
  created_at: string;
  updated_at: string;
};

export function JournalDayView({
  timezone,
  initialDate,
}: {
  timezone: string;
  initialDate: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");

  const today = todayInTimezone(timezone);

  const syncUrl = useCallback(
    (date: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", date);
      router.replace(`/journal?${params.toString()}`);
    },
    [router, searchParams],
  );

  const loadEntries = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/journal?date=${encodeURIComponent(date)}`);
      const data = (await response.json()) as {
        entries?: JournalEntry[];
        error?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Could not load entries.");
        setEntries([]);
        return;
      }

      setEntries(data.entries ?? []);
    } catch {
      setError("Could not load entries.");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSelectedDate(initialDate);
    void loadEntries(initialDate);
  }, [initialDate, loadEntries]);

  function changeDate(date: string) {
    setSelectedDate(date);
    setEditingId(null);
    syncUrl(date);
    void loadEntries(date);
  }

  async function createEntry() {
    if (!draft.trim()) {
      setError("Write something before saving.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: draft,
          entry_date: selectedDate,
        }),
      });

      const data = (await response.json()) as {
        entry?: JournalEntry;
        error?: string;
      };

      if (!response.ok || !data.entry) {
        setError(data.error ?? "Could not save entry.");
        return;
      }

      setDraft("");
      setEntries((current) => [...current, data.entry!]);
    } catch {
      setError("Could not save entry.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit(id: string) {
    if (!editDraft.trim()) {
      setError("Entry text cannot be empty.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/journal/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editDraft }),
      });

      const data = (await response.json()) as {
        entry?: JournalEntry;
        error?: string;
      };

      if (!response.ok || !data.entry) {
        setError(data.error ?? "Could not update entry.");
        return;
      }

      setEntries((current) =>
        current.map((entry) => (entry.id === id ? data.entry! : entry)),
      );
      setEditingId(null);
      setEditDraft("");
    } catch {
      setError("Could not update entry.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry(id: string) {
    if (!window.confirm("Delete this entry? This cannot be undone.")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/journal/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not delete entry.");
        return;
      }

      setEntries((current) => current.filter((entry) => entry.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditDraft("");
      }
    } catch {
      setError("Could not delete entry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedDate === today ? "Today" : "Journal"}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {formatDisplayDate(selectedDate)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => changeDate(shiftDate(selectedDate, -1))}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={selectedDate === today}
              onClick={() => changeDate(today)}
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={selectedDate >= today}
              onClick={() => changeDate(shiftDate(selectedDate, 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write what is actually true right now…"
          className="min-h-36 resize-y"
          disabled={saving}
        />
        <div className="flex justify-end">
          <Button type="button" onClick={createEntry} disabled={saving}>
            {saving ? "Saving…" : "Add entry"}
          </Button>
        </div>
      </section>

      {error ? (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <section className="flex flex-col gap-4">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading entries…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No entries for this day yet.
          </p>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <time
                  dateTime={entry.created_at}
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {formatEntryTime(entry.created_at, timezone)}
                </time>
                <div className="flex items-center gap-2">
                  {editingId === entry.id ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => saveEdit(entry.id)}
                        disabled={saving}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditDraft("");
                        }}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(entry.id);
                          setEditDraft(entry.content);
                        }}
                        disabled={saving}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteEntry(entry.id)}
                        disabled={saving}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingId === entry.id ? (
                <Textarea
                  value={editDraft}
                  onChange={(event) => setEditDraft(event.target.value)}
                  className="min-h-28 resize-y"
                  disabled={saving}
                />
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                  {entry.content}
                </p>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
