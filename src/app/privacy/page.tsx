import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-16">
      <article className="flex w-full max-w-2xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground"
          >
            Vallna
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: June 2026 · MVP
          </p>
        </header>

        <div className="flex flex-col gap-8 text-sm leading-7 text-foreground">
          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Overview</h2>
            <p className="text-muted-foreground">
              Vallna is a personal growth application. We collect only what is needed
              to provide journaling, category tracking, AI-generated reports, and
              optional notifications. Your journal and survey responses are sensitive —
              we treat them accordingly.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Data residency</h2>
            <p className="text-muted-foreground">
              Your data is stored in Supabase (PostgreSQL) in the{" "}
              <strong className="font-medium text-foreground">EU — Frankfurt</strong>{" "}
              region (eu-central-1), chosen at project creation for GDPR alignment.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">What we collect</h2>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Account email and display name (from sign-up or OAuth provider)</li>
              <li>Onboarding survey responses and birth data for your astro profile</li>
              <li>Journal entries and daily category grades with optional notes</li>
              <li>AI-generated reports and usage/cost records for LLM operations</li>
              <li>Notification preferences and, if enabled, push subscription endpoints</li>
              <li>Referral attribution when you join through someone&apos;s link</li>
              <li>Timezone for correct report scheduling</li>
            </ul>
            <p className="text-muted-foreground">
              Birth time and location are optional. We do not track your physical
              location beyond what you choose to provide for astrological calculation.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">How we use your data</h2>
            <p className="text-muted-foreground">
              Your journal text and grades are processed by Anthropic&apos;s Claude API
              to generate personal reports and summaries. Processing happens on demand
              when reports are generated — not for advertising or profiling.
            </p>
            <p className="rounded-md border border-border bg-muted/30 px-4 py-3 text-muted-foreground">
              <strong className="font-medium text-foreground">
                Your journal entries are never used to train LLM models.
              </strong>{" "}
              Anthropic&apos;s API processes your content to produce your reports only.
              System prompts and reference content remain server-side and are not
              returned to the client.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Third-party processors</h2>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Supabase</strong> —
                authentication, database, and session management (EU hosting)
              </li>
              <li>
                <strong className="font-medium text-foreground">Anthropic</strong> —
                AI report generation
              </li>
              <li>
                <strong className="font-medium text-foreground">Resend</strong> —
                transactional email when you choose email delivery
              </li>
            </ul>
            <p className="text-muted-foreground">
              Data processing agreements with these providers must be in place before
              public launch.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Security</h2>
            <p className="text-muted-foreground">
              Row-Level Security on every database table ensures users can only access
              their own rows. Sessions use Supabase cookie-based auth — tokens are not
              stored in browser localStorage. API keys and system prompts are kept
              server-side only.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Your rights</h2>
            <p className="text-muted-foreground">
              Under GDPR you have the right to access, export, and erase your personal
              data.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Export</strong> —
                download all your data as JSON from Settings → Download my data, or
                via <code className="text-foreground">GET /api/account/export</code>
              </li>
              <li>
                <strong className="font-medium text-foreground">Erasure</strong> —
                permanently delete your account from Settings, or via{" "}
                <code className="text-foreground">DELETE /api/account/delete</code>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-base font-medium">Contact</h2>
            <p className="text-muted-foreground">
              For privacy requests, contact the Vallna operator at the email address
              published when the app launches publicly.
            </p>
          </section>
        </div>

        <footer className="border-t border-border pt-8">
          <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">
            Back to Vallna
          </Link>
        </footer>
      </article>
    </div>
  );
}
