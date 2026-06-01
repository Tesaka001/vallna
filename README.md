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

## Build sequence (MVP)

Per the design document, build in order. **Step 1 — Project scaffold** is complete.

1. ✅ Project scaffold — Next.js + Tailwind + Shadcn
2. Supabase setup (EU / Frankfurt) + tables with RLS
3. Authentication (email/password + Google OAuth)
4. Onboarding survey + astro profile
5. Journal
6. Category tracking
7. LLM layer design (separate design session)
8. Report generation
9. Notifications
10. Referral + reviews
11. GDPR flows
12. PWA configuration
