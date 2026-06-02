# Vallna

A personal growth and self-awareness application. Honest pattern detection through
daily journaling, category tracking, and AI-enriched insight — enriched with the
user's astrological profile.

> _"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."_

This repository is built strictly following the founding reference document:
[`_docs/01_vallna_technical_design_v1_3.md`](./_docs/01_vallna_technical_design_v1_3.md).
That document is the source of truth for all architectural and brand decisions.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript / React |
| UI | Shadcn/UI |
| Styling | Tailwind CSS |
| Backend / DB / Auth | Supabase (PostgreSQL) — _added in Step 2_ |
| LLM | Anthropic Claude API — _added in Step 8_ |
| Email | Resend — _added in Step 9_ |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in values as each build step
is reached. Never commit `.env.local`.

## Database (Supabase)

The full data model (§5) lives in [`supabase/migrations`](./supabase/migrations) — 9
tables, all with Row-Level Security, check constraints, indexes, `updated_at`
triggers, and a trigger that provisions a `public.users` row on signup.

### One-time setup

1. Create a Supabase project in the **EU — Frankfurt (`eu-central-1`)** region (§7.4).
2. From the project's **API settings**, copy the URL and keys into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only — never exposed to the client)
3. Link the CLI and apply the migrations:

```bash
npm run db:link      # supabase link --project-ref <your-ref>
npm run db:push      # applies all migrations to the hosted project
```

Alternatively, paste each file in `supabase/migrations/` (in filename order) into
the Supabase SQL editor.

### Auth providers

In the Supabase dashboard (Authentication → Providers):

1. Enable **Email** (password sign-in).
2. Enable **Google** and add your OAuth client ID/secret from Google Cloud Console.
3. Under **URL configuration**, set:
   - **Site URL:** `http://localhost:3000` (dev) or your Vercel URL (prod)
   - **Redirect URLs:** `http://localhost:3000/auth/callback`, `http://localhost:3000/auth/confirm`, and the same paths on your production domain

The app uses cookie-based sessions via `@supabase/ssr` (§7.2). Protected routes
are gated in `src/middleware.ts`; login/signup live at `/login` and `/signup`.

### Regenerating types

`src/lib/supabase/types.ts` is hand-authored to match the migrations. After any
schema change, regenerate from the linked project:

```bash
npm run db:types
```

### Client usage

| Import | Use in |
| --- | --- |
| `@/lib/supabase/client` | Client Components (anon key, RLS-scoped) |
| `@/lib/supabase/server` | Server Components / Route Handlers / Actions |
| `@/lib/supabase/admin` | Trusted server jobs only — bypasses RLS |

## Onboarding

After sign-in, new users complete a multi-step flow at `/onboarding`:

1. Birth data (date required; time and location optional for deeper personalisation)
2. Three free-form reflection questions (per LLM architecture doc §6.1)
3. Demographic details (gender, age range, country)

Submitting calls `POST /api/onboarding/survey`, which:

- Computes the Dreamspell galactic signature and western sun/moon/rising signs
- Writes `astro_profiles.profile_json` (pre-computed for LLM injection)
- Stores `onboarding_surveys.responses`
- Sets `users.onboarding_complete = true` and `users.timezone`

`self_perception_score` is left null until the LLM onboarding scorer runs in Step 8.

## Journal

The journal lives at `/journal` with date navigation and multiple entries per day.

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/journal` | GET, POST | List entries by `date` or `from`/`to`; create entry |
| `/api/journal/[id]` | PATCH, DELETE | Edit or delete own entry |

Entry text is capped at 20,000 characters in application code. New entries default to today in the user's timezone.

## Category tracking

Daily grading lives at `/tracking` — up to 5 categories per user, grades 1–10 with optional notes.

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/categories` | GET, POST | List active categories; create (max 5) |
| `/api/categories/[id]` | PATCH, DELETE | Edit category; soft-delete (`is_active = false`) |
| `/api/grades` | GET, POST | List grades for a `date`; submit or update grade for a category |

One grade per category per day is enforced in the API (upsert on POST). Removing a category preserves historical grades.

## Report generation (LLM)

Daily reports are generated by a tiered pipeline (LLM architecture doc §5.1):

1. **Tier 1 (Haiku)** — compresses journal + grades into structured summary
2. **Tier 2 (Sonnet)** — produces the user-facing daily report JSON
3. Results stored in `reports` with structured `recommendations` JSON and formatted `content`

Onboarding survey submission runs the **Tier 1 onboarding scorer** when `ANTHROPIC_API_KEY` is set.

### Scheduling

Vercel Cron hits `POST /api/cron/reports/daily` hourly (`vercel.json`). Users whose local time is **23:00** receive that day's report. Secure with:

```http
Authorization: Bearer <CRON_SECRET>
```

Set `CRON_SECRET` in Vercel environment variables alongside `ANTHROPIC_API_KEY`.

### Viewing reports

`/reports` lists generated reports. `/reports/[id]` shows the full text.

### Local testing

```bash
curl -X POST http://localhost:3000/api/cron/reports/daily \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Requires journal entries or grades for the user's local date, and `ANTHROPIC_API_KEY` in `.env.local`.

## Build sequence (MVP)

Per the design document, build in order. **Step 1 — Project scaffold** is complete.

1. ✅ Project scaffold — Next.js + Tailwind + Shadcn
2. ✅ Supabase setup (EU / Frankfurt) + tables with RLS
3. ✅ Authentication (email/password + Google OAuth)
4. ✅ Onboarding survey + astro profile
5. ✅ Journal
6. ✅ Category tracking
7. ✅ LLM layer design (separate design session)
8. ✅ Report generation
9. Notifications
10. Referral + reviews
11. GDPR flows
12. PWA configuration
