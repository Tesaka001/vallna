import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

type ReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportDetailPage({ params }: ReportPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/reports");
  }

  const { data: report } = await supabase
    .from("reports")
    .select(
      "id, report_type, period_start, period_end, content, generated_at",
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-10">
      <div className="flex w-full max-w-2xl flex-col gap-10">
        <AppHeader active="reports" />
        <article className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {report.report_type} · {report.period_start}
            </span>
            <h1 className="text-2xl font-semibold tracking-tight">
              Your report
            </h1>
          </div>

          {report.content ? (
            <div className="whitespace-pre-wrap text-sm leading-7 text-foreground">
              {report.content}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No activity was recorded for this period, so no insight was
              generated.
            </p>
          )}

          <Button render={<Link href="/reports" />} variant="outline">
            Back to reports
          </Button>
        </article>
      </div>
    </div>
  );
}
