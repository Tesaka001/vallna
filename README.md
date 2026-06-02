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

## Build sequence (MVP)

Per the design document, build in order. **Step 1 — Project scaffold** is complete.

1. ✅ Project scaffold — Next.js + Tailwind + Shadcn
2. ✅ Supabase setup (EU / Frankfurt) + tables with RLS
3. ✅ Authentication (email/password + Google OAuth)
4. Onboarding survey + astro profile
5. Journal
6. Category tracking
7. LLM layer design (separate design session)
8. Report generation
9. Notifications
10. Referral + reviews
11. GDPR flows
12. PWA configuration
