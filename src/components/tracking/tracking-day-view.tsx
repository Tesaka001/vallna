"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  formatDisplayDate,
  shiftDate,
  todayInTimezone,
} from "@/lib/journal/dates";
import { GRADE_MAX, GRADE_MIN, MAX_TRACKING_CATEGORIES } from "@/lib/tracking/constants";

type Category = {
  id: string;
  name: string;
  emoji: string | null;
  display_order: number;
};

type GradeRecord = {
  id: string;
  category_id: string;
  grade: number;
  note: string | null;
};

type GradeDraft = {
  grade: number | null;
  note: string;
};

export function TrackingDayView({
  timezone,
  initialDate,
}: {
  timezone: string;
  initialDate: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = todayInTimezone(timezone);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [categories, setCategories] = useState<Category[]>([]);
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [drafts, setDrafts] = useState<Record<string, GradeDraft>>({});
  const [loading, setLoading] = useState(true);
  const [savingCategoryId, setSavingCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryEmoji, setNewCategoryEmoji] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [showManage, setShowManage] = useState(false);

  const gradeByCategory = useMemo(() => {
    const map = new Map<string, GradeRecord>();
    for (const grade of grades) {
      map.set(grade.category_id, grade);
    }
    return map;
  }, [grades]);

  const syncUrl = useCallback(
    (date: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", date);
      router.replace(`/tracking?${params.toString()}`);
    },
    [router, searchParams],
  );

  const loadData = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);

    try {
      const [categoriesRes, gradesRes] = await Promise.all([
        fetch("/api/categories"),
        fetch(`/api/grades?date=${encodeURIComponent(date)}`),
      ]);

      const categoriesData = (await categoriesRes.json()) as {
        categories?: Category[];
        error?: string;
      };
      const gradesData = (await gradesRes.json()) as {
        grades?: GradeRecord[];
        error?: string;
      };

      if (!categoriesRes.ok) {
        setError(categoriesData.error ?? "Could not load categories.");
        return;
      }

      if (!gradesRes.ok) {
        setError(gradesData.error ?? "Could not load grades.");
        return;
      }

      const nextCategories = categoriesData.categories ?? [];
      const nextGrades = (gradesData.grades ?? []).map((row) => ({
        id: row.id,
        category_id: row.category_id,
        grade: row.grade,
        note: row.note,
      }));

      setCategories(nextCategories);
      setGrades(nextGrades);

      const nextDrafts: Record<string, GradeDraft> = {};
      for (const category of nextCategories) {
        const existing = nextGrades.find((g) => g.category_id === category.id);
        nextDrafts[category.id] = {
          grade: existing?.grade ?? null,
          note: existing?.note ?? "",
        };
      }
      setDrafts(nextDrafts);
    } catch {
      setError("Could not load tracking data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSelectedDate(initialDate);
    void loadData(initialDate);
  }, [initialDate, loadData]);

  function changeDate(date: string) {
    setSelectedDate(date);
    syncUrl(date);
    void loadData(date);
  }

  function updateDraft(categoryId: string, patch: Partial<GradeDraft>) {
    setDrafts((current) => ({
      ...current,
      [categoryId]: {
        grade: current[categoryId]?.grade ?? null,
        note: current[categoryId]?.note ?? "",
        ...patch,
      },
    }));
  }

  async function saveGrade(categoryId: string) {
    const draft = drafts[categoryId];
    if (!draft?.grade) {
      setError("Choose a grade from 1 to 10.");
      return;
    }

    setSavingCategoryId(categoryId);
    setError(null);

    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: categoryId,
          grade: draft.grade,
          note: draft.note.trim() || null,
          grade_date: selectedDate,
        }),
      });

      const data = (await response.json()) as {
        grade?: GradeRecord;
        error?: string;
      };

      if (!response.ok || !data.grade) {
        setError(data.error ?? "Could not save grade.");
        return;
      }

      setGrades((current) => {
        const without = current.filter((g) => g.category_id !== categoryId);
        return [...without, data.grade!];
      });
    } catch {
      setError("Could not save grade.");
    } finally {
      setSavingCategoryId(null);
    }
  }

  async function addCategory() {
    if (!newCategoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    setAddingCategory(true);
    setError(null);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          emoji: newCategoryEmoji.trim() || null,
        }),
      });

      const data = (await response.json()) as {
        category?: Category;
        error?: string;
      };

      if (!response.ok || !data.category) {
        setError(data.error ?? "Could not add category.");
        return;
      }

      setCategories((current) => [...current, data.category!]);
      setDrafts((current) => ({
        ...current,
        [data.category!.id]: { grade: null, note: "" },
      }));
      setNewCategoryName("");
      setNewCategoryEmoji("");
    } catch {
      setError("Could not add category.");
    } finally {
      setAddingCategory(false);
    }
  }

  async function removeCategory(categoryId: string) {
    if (!window.confirm("Remove this category? Past grades will be kept.")) {
      return;
    }

    setError(null);

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Could not remove category.");
        return;
      }

      setCategories((current) => current.filter((c) => c.id !== categoryId));
      setGrades((current) => current.filter((g) => g.category_id !== categoryId));
      setDrafts((current) => {
        const next = { ...current };
        delete next[categoryId];
        return next;
      });
    } catch {
      setError("Could not remove category.");
    }
  }

  const gradeNumbers = Array.from(
    { length: GRADE_MAX - GRADE_MIN + 1 },
    (_, index) => GRADE_MIN + index,
  );

  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedDate === today ? "Today" : "Tracking"}
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

      {error ? (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Add up to {MAX_TRACKING_CATEGORIES} categories below, then grade each
          one for this day.
        </p>
      ) : (
        <section className="flex flex-col gap-5">
          {categories.map((category) => {
            const draft = drafts[category.id] ?? { grade: null, note: "" };
            const saved = gradeByCategory.get(category.id);

            return (
              <article
                key={category.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="mb-4 flex items-center gap-2">
                  {category.emoji ? (
                    <span aria-hidden="true">{category.emoji}</span>
                  ) : null}
                  <h2 className="font-medium">{category.name}</h2>
                  {saved ? (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Saved
                    </span>
                  ) : null}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {gradeNumbers.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      size="sm"
                      variant={draft.grade === value ? "default" : "outline"}
                      onClick={() => updateDraft(category.id, { grade: value })}
                      disabled={savingCategoryId === category.id}
                    >
                      {value}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor={`note-${category.id}`} className="text-muted-foreground">
                    Note <span className="font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id={`note-${category.id}`}
                    value={draft.note}
                    onChange={(event) =>
                      updateDraft(category.id, { note: event.target.value })
                    }
                    placeholder="What is behind this score?"
                    className="min-h-20 resize-y"
                    disabled={savingCategoryId === category.id}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => saveGrade(category.id)}
                      disabled={savingCategoryId === category.id}
                    >
                      {savingCategoryId === category.id ? "Saving…" : "Save grade"}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <section className="rounded-lg border border-border p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-medium">Your categories</h2>
            <p className="text-sm text-muted-foreground">
              {categories.length} of {MAX_TRACKING_CATEGORIES} in use
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowManage((current) => !current)}
          >
            {showManage ? "Hide" : "Manage"}
          </Button>
        </div>

        {showManage ? (
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <span>
                  {category.emoji ? `${category.emoji} ` : ""}
                  {category.name}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeCategory(category.id)}
                >
                  Remove
                </Button>
              </div>
            ))}

            {categories.length < MAX_TRACKING_CATEGORIES ? (
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    placeholder="Category name"
                    disabled={addingCategory}
                  />
                  <Input
                    value={newCategoryEmoji}
                    onChange={(event) => setNewCategoryEmoji(event.target.value)}
                    placeholder="Emoji (optional)"
                    className="sm:max-w-40"
                    disabled={addingCategory}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={addCategory}
                    disabled={addingCategory}
                  >
                    {addingCategory ? "Adding…" : "Add category"}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Maximum reached. Remove one to add another.
              </p>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
