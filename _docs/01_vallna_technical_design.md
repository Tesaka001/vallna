# VALLNA — Technical Design & Architecture

**Version 1.7 | June 2026 | Pre-Build Reference | Confidential**

> *"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."*

| | |
|---|---|
| **Current Phase** | MVP |
| **Build Status** | Pre-development |
| **Document Status** | Confidential |

---

## Document map — read this first

This is the build agent's source of truth — the *what and how* of Vallna. It pairs with two other documents:

- **Brand & Strategy (`00_vallna_strategy.md`)** — the *why*: brand story, thesis, symbolic layer, competitive position, brand voice, product vision. Not needed for routine build steps.
- **LLM Architecture & Prompt Design** — the LLM layer in full: agent hierarchy, system prompts, summarisation pipeline, brand-voice enforcement, cost checkpoints. Required for Steps 7–8.
- **13-Month Dreamspell Calendar Reference** and **Western Astrology Reference** — the personalisation reference data. Required for Step 7.

**Governance on conflict:** on implementation, this document governs. On product intent or brand meaning, the Strategy document governs. On anything the LLM produces (prompts, report output, voice), the LLM Architecture document governs.

**Section numbering note:** section numbers in this document are stable and are referenced by name from other documents (e.g. the LLM Architecture doc points at §5.8 `usage_costs` and the §7 security rules). Numbers 1–10 are preserved across the v1.3 → v1.4 split. Sections 2 and 3.1–3.3 were moved to the Strategy document; their headings remain here as pointers so existing references do not break. Do not renumber without auditing cross-references in the other three documents first.

**Changelog v1.6 → v1.7:**
- Removed a deferred post-MVP item (former §10 row #14) and the §5.8 note that depended on it; renumbered the remaining open-decisions rows to stay sequential. Coordinated with the LLM Architecture doc.
- Adopted version-free naming: this document's filename and all cross-references are now version-free; version lives only in this header and changelog.

**Changelog v1.5 → v1.6:**
- Grading is now embedded on the Journal page rather than a separate surface (§3.4 / §8.1 / Step 5–6). The user grades the current day inline and can edit past days' grades from each day-block. Category *management* (creating/editing the up-to-5 categories) remains its own page.
- Defined the Journal page day-block structure: each block reads entries → that day's grades → daily report (or a quiet "today's reflection arrives tonight" placeholder for the current day). Entries truncate to ~3 lines with a "More" control opening a modal (close X top-right, Close button bottom). Today's block is expanded by default; past blocks are collapsed and Expand to reveal.
- Reports page retained, and the daily report intentionally appears in BOTH the Journal timeline and the Reports page in this version — see §3.4. Flagged as deliberate so it is not deduplicated by mistake.
- `/api/grades` gains an edit path (past-day grades are editable, not create-only).
- Closed the All-entries default-sort open item (resolved: newest day first).
- Adopted the version-free naming convention across the document set: version numbers dropped from filenames and from cross-references; version now lives only in each doc's header and changelog. References to other docs are by name (e.g. "the LLM Architecture doc").

**Changelog v1.4 → v1.5:**
- Journal page (§3.4 / §8.1 / Step 5): added two read views — **This day** (entries for the selected date) and **All entries** (full history, reverse-chronological, paginated). The create-entry box is specified as the persistent primary element at the top of the page; the view switch sits directly below it.
- All-entries list requires a paginated API from the start (keyset on `created_at`); UI "load more" affordance deferred until entry volume requires it. No data-model change — existing `entry_date` and `created_at` columns support both views.
- Added an open-decisions entry logging the All-entries default sort direction.

**Changelog v1.3 → v1.4:**
- Split brand/strategy narrative (former §2 and §3.1–3.3) into `00_vallna_strategy.md`. Headings retained here as pointers.
- Fixed §10 open-decisions table: rows #12 and #13 referenced a non-existent "Section 11" and "Section 12." Those decisions were resolved by creating standalone documents, not sections; references corrected. Duplicate rows #1/#2 cross-linked to their resolved counterparts.
- Version bumped to v1.4, aligning with the dependency reference already stated in the LLM Architecture doc.

---

# 1. Purpose & Scope

This document is the founding technical reference for Vallna. It records every architectural decision made before a line of code was written, the reasoning behind each decision, and the constraints every Claude instance must respect when building this application.

Any Claude instance, developer, or collaborator reading this document should be able to make correct architectural decisions without needing to re-derive them. When in doubt on implementation: this document takes precedence. The product intent and brand reasoning behind these decisions live in the Strategy document (`00_vallna_strategy.md`); read it once for orientation, but it is not required to be loaded for individual build steps.

This document covers:

- Core user flows (the product surface to be built)
- Confirmed tech stack with rationale
- Full data model (all tables, fields, relationships)
- LLM agent hierarchy and cost control strategy (overview; full design in the LLM Architecture document)
- Security and GDPR requirements
- API and service architecture
- Development tooling and workflow
- Open decisions and next steps

# 2. Brand Story & Competitive Positioning

> **Moved.** This material now lives in `00_vallna_strategy.md` (§2 Brand Story, §3 Competitive Positioning, §4 Brand Voice Principles). It is product/brand context, not build input, and is intentionally kept out of build context to reduce noise and cost. Where brand voice must be enforced in AI output (Step 8), the authority is the LLM Architecture & Prompt Design document, §8 and §10 — not this section.

# 3. Product Vision

> **Partially moved.** The product narrative (what the app does, who it is for, the user's internal state — former §3.1–3.3) now lives in `00_vallna_strategy.md` §5. The build-relevant core user flows are retained below as §3.4.

## 3.4 Core user flows (MVP)

- **Auth:** Register via Google OAuth or email/password
- **Onboarding:** Short onboarding survey to capture self-perception + birth data (for astro profile)
- **Journal:** Write multiple timestamped journal entries per day, and grade the day's categories — all on one page. The entry-creation box is the primary, persistent element at the top. Below it the user switches between two read views, **This day** and **All entries** (full history, reverse-chronological, paginated), both built from the same **day-block**: each block shows that day's entries, then its grades, then its daily report.
- **Grading:** Grade up to 5 personal categories (1–10, optional note per grade) on the Journal page. The current day is graded inline; past days can be re-graded from their day-block. Creating and editing the categories themselves is a separate page.
- **Reports:** AI analyses journal + grades at end of day; generates daily, weekly, monthly reports with recommendations. The daily report appears inline in its day-block on the Journal page **and** on the Reports page — this duplication is intentional for this version and must not be deduplicated. Weekly and monthly reports live on the Reports page only.
- **Delivery:** Push notification or email delivery of reports
- **Referral:** Share app link; write app store review

# 4. Confirmed Tech Stack

All decisions below are confirmed and locked for MVP. Rationale is included so future Claude instances understand the constraints and do not propose alternatives without flagging the architectural impact.

| Layer | Technology | Rationale |
| --- | --- | --- |
| Frontend framework | Next.js 14+ (App Router) | Largest ecosystem; best Claude code coverage; handles routing + API routes in one framework; PWA-ready |
| UI language | React | Required by Next.js; widest talent pool for future hiring |
| Component library | Shadcn/UI | Components live in the codebase (not a black box); modifiable; clean aesthetic suitable for target audience |
| Styling | Tailwind CSS | Design changes via config file, not scattered CSS; Claude generates reliable Tailwind; no hardcoded styles |
| Backend / DB / Auth | Supabase (PostgreSQL) | Managed Postgres; built-in auth with Google OAuth; Row-Level Security enforces data isolation at DB layer; EU hosting for GDPR; generous free tier |
| Scheduled jobs | Supabase pg_cron + Edge Functions | Triggers daily/weekly/monthly LLM analysis jobs without external scheduler at MVP scale |
| LLM provider | Anthropic Claude API | Tiered model usage (Haiku / Sonnet / Opus) to control cost; see Section 6 |
| Email | Resend | Clean transactional email; native Next.js integration; GDPR-compliant |
| Push notifications | Web Push API | PWA-native; no native app required; works on Android + iOS 16.4+ |
| Hosting | Vercel | Zero-config Next.js deployment; auto-scaling; preview deployments per branch |
| Payments (future) | Stripe | Industry standard; best documentation; subscription support; not built at MVP but schema is ready |
| Dev environment | Cursor IDE | AI-native editor; GUI interface for non-technical owner; Claude Sonnet integrated |
| App stores | PWA (Progressive Web App) | Single codebase works as web + mobile + store-submittable via PWABuilder; avoids native iOS/Android complexity |

# 5. Data Model

All tables live in Supabase (PostgreSQL). Row-Level Security (RLS) is enabled on every table. No user can ever read another user's data — this is enforced at the database level, not only in application code.

Naming convention: snake_case for all table and column names. UUIDs for all primary keys. `created_at` and `updated_at` timestamps on every table.

## 5.1 users

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) | References auth.users(id) |
| email | text | Unique. From auth provider. |
| display_name | text | User-chosen name |
| subscription_tier | text | Default 'free'. Values: 'free', 'pro', 'premium'. Stripe-ready from day one. |
| onboarding_complete | boolean | False until survey finished |
| notification_preference | text | Values: 'email', 'push', 'both', 'none' |
| timezone | text | IANA timezone string. Required for correct report scheduling. |
| created_at | timestamptz | Auto-set |
| updated_at | timestamptz | Auto-updated via trigger |

## 5.2 astro_profiles

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id). One-to-one. |
| birth_date | date | Required for all astro calculations |
| birth_time | time | Optional — improves accuracy of rising sign |
| birth_location | text | City/country string |
| birth_lat | numeric | Latitude — for precise chart calculation |
| birth_lng | numeric | Longitude |
| sun_sign | text | Western astrology sun sign |
| moon_sign | text |  |
| rising_sign | text | Ascendant — requires birth time |
| dreamspell_kin | integer | 13-month calendar: Kin number (1–260) |
| dreamspell_seal | text | Solar seal name (e.g. Red Cosmic Serpent) |
| dreamspell_tone | integer | Galactic tone (1–13) |
| dreamspell_wavespell | text | Wavespell name |
| profile_json | jsonb | Full computed profile as structured JSON. Injected into LLM prompts as compact block. |
| computed_at | timestamptz | When profile was last computed |

*The astrology and 13-month calendar reference data (Kin meanings, seal descriptions, tone interpretations) is stored in a separate reference database — NOT in the main Supabase user DB. See the 13-Month Dreamspell Calendar Reference and Western Astrology Reference for that data and its `reference_content` schema.*

## 5.3 onboarding_surveys

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| responses | jsonb | Full survey answers as structured JSON |
| self_perception_score | numeric | Derived score: alignment between self-perception and astro profile |
| completed_at | timestamptz |  |

## 5.4 journal_entries

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| content | text | Journal entry text. No length limit at DB level — enforce in application. |
| entry_date | date | Calendar date of entry |
| created_at | timestamptz | Exact timestamp — user-visible |
| updated_at | timestamptz |  |

## 5.5 tracking_categories

User-defined categories for daily grading. MVP limit: 5 per user.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| name | text | Category name (e.g. Mental Clarity, Physical Wellbeing) |
| emoji | text | Optional icon |
| is_active | boolean | Soft delete — never hard delete to preserve historical grades |
| display_order | integer | User-defined sort order |
| created_at | timestamptz |  |

## 5.6 daily_grades

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| category_id | uuid (FK) | References tracking_categories(id) |
| grade | integer | Score 1–10. Enforce range in application AND DB check constraint. |
| note | text | Optional note. Included in LLM analysis. |
| grade_date | date | Calendar date this grade applies to |
| created_at | timestamptz |  |

## 5.7 reports

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| report_type | text | Values: 'daily', 'weekly', 'monthly' |
| period_start | date | First day of the period covered |
| period_end | date | Last day of the period covered |
| content | text | Full generated report text — displayed in app |
| recommendations | jsonb | Structured list of recommendations |
| model_used | text | Which Claude model generated this report |
| tokens_used | integer | Total tokens consumed — for cost tracking |
| generated_at | timestamptz |  |
| delivered_at | timestamptz | Null = not yet delivered |

## 5.8 usage_costs

Every LLM call logs a record here. Instrument cost-per-user from day one.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| operation | text | E.g. 'daily_report', 'monthly_report', 'onboarding_summary' |
| model | text | E.g. 'claude-haiku-4-5', 'claude-sonnet-4-6' |
| input_tokens | integer |  |
| output_tokens | integer |  |
| cost_usd | numeric(10,6) | Calculated at time of call using current model pricing |
| created_at | timestamptz |  |

## 5.9 referrals

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid (PK) |  |
| referrer_user_id | uuid (FK) | User who shared the link |
| referred_email | text | Email of new user |
| referred_user_id | uuid (FK) | Populated when referred user registers. Nullable. |
| created_at | timestamptz |  |
| converted_at | timestamptz | Null = pending |

# 6. LLM Agent Hierarchy & Cost Control

Strategic overview only. The full LLM architecture — system prompts, summarisation pipeline, context budgets, output schemas, brand-voice enforcement — is the **LLM Architecture & Prompt Design** document. It must be read in full before Step 7. See also §10 (open decisions).

## 6.1 Tiered model usage

| Tier | Model | Used for | Frequency |
| --- | --- | --- | --- |
| Tier 1 — Fast | claude-haiku-4-5 | In-app micro-tasks; summarisation of raw journal text before Tier 2 analysis | Per user interaction |
| Tier 2 — Standard | claude-sonnet-4-6 | Daily report generation; weekly summaries | Once per user per day/week |
| Tier 3 — Deep | claude-opus-4-6 or Sonnet extended thinking | Monthly deep analysis only | Once per user per month |

## 6.2 Cost control principles

- **Summarise first:** Never send raw journal text to Tier 2/3. Summarise first with Tier 1. Estimated token reduction: 60–80% at scale.
- **Pre-compute astro context:** Astro profile stored as compact JSON, injected once per prompt. Never re-computed at call time.
- **Instrument everything:** Every LLM call writes to usage_costs. Review Anthropic dashboard weekly.
- **Match model to task:** Match model depth to report type. Never use Opus for daily reports.
- **Batch at scale:** Switch to batch processing during off-peak hours as user base grows.

# 7. Security & GDPR

Security is the highest priority. Journal entries and personal growth records are deeply sensitive. A breach is not just a technical failure — it is a harm to real people.

## 7.1 Data isolation

- **Supabase RLS:** RLS enabled on ALL tables from day one. Users can only access their own rows. Application bugs cannot leak cross-user data.
- **API responses:** Never return user data not explicitly requested by that authenticated user.

## 7.2 Authentication

- Supabase Auth handles all session management. Do not implement custom auth.
- Google OAuth and email/password supported from day one.
- JWT tokens never stored in localStorage. Use Supabase cookie-based session management.
- All routes verify Supabase session server-side in Next.js middleware.

## 7.3 Secrets management

- All API keys in environment variables — NEVER in code.
- Supabase anon key (client-safe) vs service role key (server only, never exposed to client).
- System prompt content is server-side only. Never returned to client. Never logged.
- `.env.local` for development; Vercel environment variables for production. Never committed to git.

## 7.4 GDPR requirements

- **Data residency:** Supabase hosted in EU — Frankfurt region (eu-central-1). Choose at project creation.
- **Right to erasure:** Data export and account deletion must be built before accepting real users.
- **Data minimisation:** Only collect necessary data. Birth time is optional. No location tracking.
- **Processing disclosure:** Journal entries never used to train LLM models. State explicitly in privacy policy.
- **Third-party DPAs:** Resend and Anthropic DPAs must be signed before launch.

## 7.5 What Claude must never do

- Expose LLM system prompt content to any client-side response
- Include user PII in error logs or console output
- Return another user's data in any API response
- Hardcode any secret, API key, or credential in source code
- Skip RLS policies on any new table, even temporary ones
- Store sensitive data in localStorage or sessionStorage

# 8. API Architecture

All API routes live under `/api` in the Next.js App Router. Every route that touches user data verifies the Supabase session before processing. No exceptions.

## 8.1 Route structure (MVP)

| Route | Method | Purpose |
| --- | --- | --- |
| /api/auth/* | Handled by Supabase Auth | Login, logout, OAuth callbacks |
| /api/users/me | GET / PATCH | Read and update own profile |
| /api/onboarding/survey | POST | Submit onboarding survey; trigger astro profile computation |
| /api/journal | GET / POST | GET: list own entries — single day (`date=YYYY-MM-DD`) or full history (`scope=all`), grouped and paginated by day (newest day first; `limit` days per page, `cursor` on date). POST: create new entry. The Journal page composes each day-block from these entries plus that day's grades and daily report (via `/api/grades` and `/api/reports`). |
| /api/journal/[id] | PATCH / DELETE | Edit or delete own entry |
| /api/categories | GET / POST | List own categories; create new (max 5 enforced here) |
| /api/categories/[id] | PATCH / DELETE | Edit or soft-delete own category |
| /api/grades | GET / POST / PATCH | List grades for a date; create or edit a grade (1–10, optional note) for any date, including past days. |
| /api/reports | GET | List own reports by type and date range |
| /api/reports/[id] | GET | Read a single report |
| /api/referrals | POST | Generate referral link for current user |
| /api/account/export | GET | GDPR data export — all user data as JSON |
| /api/account/delete | DELETE | GDPR account deletion — hard delete all user data |

## 8.2 Scheduled jobs (Supabase pg_cron)

| Job | Schedule | Action |
| --- | --- | --- |
| daily_reports | 23:00 per user timezone | Pull day's journal + grades; summarise (Tier 1); generate report (Tier 2); store; trigger notification |
| weekly_reports | Sunday 23:00 | Pull week's data; generate weekly report (Tier 2); store and deliver |
| monthly_reports | Last day of month 23:00 | Pull month's data; generate deep analysis (Tier 3); store and deliver |
| cost_summary | Daily 06:00 UTC | Aggregate usage_costs by user; flag users exceeding cost threshold |

# 9. Development Workflow

## 9.1 Tools

- **Primary build environment:** Cursor IDE with Claude. All code written by Claude within Cursor.
- **Session startup:** This document is the source of truth for implementation. Load it (or the relevant sections) at the start of a build session. The Strategy document is orientation only and need not be loaded per step. For Steps 7–8, also load the LLM Architecture document and the two reference documents.
- **Version control:** GitHub repository. Every feature in its own branch. Main branch = deployable. Never commit directly to main.
- **Vercel deployment:** Automatic on push to main. Preview deployments for every branch.

## 9.2 Build order (MVP sequence)

Build in this order. Do not skip ahead. Each step complete and tested before the next begins.

- **Step 1 — Project scaffold:** Next.js + Tailwind + Shadcn setup; Vercel connected; GitHub repo created. App name: Vallna.
- **Step 2 — Supabase setup:** Project created in EU region (Frankfurt); all tables with RLS policies; auth configured.
- **Step 3 — Authentication:** Email/password and Google OAuth; session middleware; protected routes.
- **Step 4 — Onboarding survey:** Survey UI; astro birth data capture; astro_profiles populated.
- **Step 5 — Journal:** Create, read, edit, delete entries; multiple entries per day. The create-entry box is the primary element, fixed at the top — it must not be displaced by the list. Directly below it, links/buttons switch between two read views: **This day** (the selected date; default) and **All entries** (full history, newest day first). Both render the same **day-block** component: each block shows that day's entries, then its grades, then its daily report. Within a block, truncate each entry to ~3 lines with a **More** control that opens a modal showing the full entry (close X top-right, Close button at the bottom). Today's block is expanded by default; past blocks are collapsed and Expand to reveal. For a day with no report yet (today, before the 23:00 run), show a quiet "today's reflection arrives tonight" placeholder in the report slot. Omit days that have neither entries nor a report. Back the All-entries list with a paginated API from the start (keyset by date, ~14 days/page); defer the UI "load more" affordance until volume requires it. No schema change — `entry_date` and `created_at` drive the views. (The grades section inside each block is wired in Step 6.)
- **Step 6 — Categories & grading:** A separate page to create and manage up to 5 categories. Grading itself lives on the Journal page (per Step 5): the current day is graded inline, and past days are re-graded from their day-block — the grades section sits below the entries within each block. Grading depends on categories existing, so build the category-management page first, then wire the grade section into the day-block.
- **Step 7 — LLM layer design:** SEPARATE DESIGN SESSION REQUIRED before this step — see Section 10 and the LLM Architecture document.
- **Step 8 — Report generation:** Edge functions; pg_cron scheduling; tiered model calls; Vallna brand voice in outputs (enforced per LLM Architecture §10).
- **Step 9 — Notifications:** Resend email; Web Push API; user notification preferences.
- **Step 10 — Referral + reviews:** Referral link generation; app store review prompt.
- **Step 11 — GDPR flows:** Data export; account deletion; privacy policy page.
- **Step 12 — PWA configuration:** Manifest; service worker; app store submission via PWABuilder.

## 9.3 Cost monitoring

- Anthropic API dashboard: review weekly during MVP phase.
- usage_costs table: query weekly — average cost per user, highest-cost operations, trend over time.
- Set a cost alert in Anthropic dashboard for unexpected spikes.
- If cost-per-user exceeds target unit economics, fix LLM architecture before acquiring more users.

# 10. Open Decisions & Next Steps

Explicitly unresolved items. Each requires a dedicated design session before the relevant build step. Items marked RESOLVED are retained for traceability.

| # | Decision | Required before | Notes |
| --- | --- | --- | --- |
| 1 | Astro & 13-month calendar reference database — structure, content, versioning, hosting | Step 7 | **RESOLVED — see #12.** (Original open item; superseded by its resolved counterpart below.) |
| 2 | Full LLM prompt architecture — system prompt templates, context budget per tier, structured output schema, summarisation pipeline, Vallna brand voice enforcement in AI outputs | Step 7 | **RESOLVED — see #13.** (Original open item; superseded by its resolved counterpart below.) |
| 3 | Onboarding survey content — exact questions; scoring algorithm for self-perception vs astro alignment | Step 4 | **RESOLVED** in LLM Architecture §6 (survey design) and §3.2 (scorer prompt). Content decided before survey UI is built. |
| 4 | Trademark filing — EUIPO classes 9 and 42 for Vallna | Before public launch | Engage trademark attorney. Budget EUR 1,000–2,000. EUIPO search complete: name is clean. |
| 5 | Domain and social handles — vallna.com and vallna.app confirmed available. Register immediately. | Now | Domains registered (EuroDNS). Also secure @vallna on Instagram and TikTok — see #11. |
| 6 | Visual design direction — brand identity, colour palette, typography | Step 1 | Should reflect: calm surface, serious depth. Wave quality of the name as a felt design principle, not literal imagery. |
| 7 | Stripe integration design — subscription tiers, pricing, feature gates | Future phase | Schema ready (subscription_tier field). Deferred post-MVP. |
| 8 | Birth chart computation — external astrology API vs in-house library | Step 4 | External API simpler but adds dependency and cost. In-house requires library evaluation. At MVP: Sun + Moon from birth date only (see Western Astro Reference §1). |
| 9 | Proton Mail setup — hello@vallna.com custom domain | Before any public communications | Waiting on EuroDNS verification or transfer to Namecheap. Do not set up email until DNS is stable. |
| 10 | Domain registrar transfer — EuroDNS to Namecheap | Before DNS setup | EuroDNS has known verification bugs and MX record issues. Transfer before setting up Vercel, Supabase, or Proton Mail DNS records. |
| 11 | Social media handles — @vallna on Instagram and TikTok | Before any public mention of the name | Pending EuroDNS resolution. Secure immediately once that is resolved. Also consider @vallna on X and LinkedIn. |
| 12 | Astro & 13-month reference data — structure, content, versioning | Step 7 | **RESOLVED.** Built as standalone reference documents, not as sections of this doc: **13-Month Dreamspell Calendar Reference** and **Western Astrology Reference**. Stored in a separate `reference_content` schema, versioned, content-layered. Supersedes #1. |
| 13 | Full LLM prompt architecture — separate design session | Step 7 | **RESOLVED.** Built as standalone document: **LLM Architecture & Prompt Design**. Covers agent hierarchy, system prompts, summarisation pipeline, context budgets, output schemas, brand-voice enforcement, cost checkpoints. Supersedes #2. |
| 14 | Journal "All entries" default sort direction | Step 5 | **RESOLVED.** Newest day first (reverse-chronological by day). Within each day-block, entries read in the order written, then grades, then the daily report. |

This document is updated at the end of each significant design session. When in doubt on implementation, a Claude instance should consult this document before making any choice.

*End of document — Vallna Technical Design v1.7  |  June 2026*
