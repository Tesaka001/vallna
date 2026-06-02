import Link from "next/link";
import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { createClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/reports");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_complete")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const { data: reports } = await supabase
    .from("reports")
    .select(
      "id, report_type, period_start, period_end, content, generated_at",
    )
    .eq("user_id", user.id)
    .order("generated_at", { ascending: false })
    .limit(50);

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-10">
        <AppHeader active="reports" />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Generated each evening from your journal and grades.
            </p>
          </div>

          {!reports?.length ? (
            <p className="text-sm text-muted-foreground">
              No reports yet. Write in your journal or add grades — your first
              daily report arrives after 23:00 in your timezone.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {reports.map((report) => (
                <li key={report.id}>
                  <Link
                    href={`/reports/${report.id}`}
                    className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {report.report_type}
                      </span>
                      <time
                        dateTime={report.generated_at}
                        className="text-xs text-muted-foreground"
                      >
                        {report.period_start}
                      </time>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground">
                      {report.content ?? "No activity recorded for this day."}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
