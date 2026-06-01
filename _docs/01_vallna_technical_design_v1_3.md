# VALLNA — Technical Design & Architecture
**Version 1.3 | June 2026 | Pre-Build Reference | Confidential**

> *"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."*

| | |
|---|---|
| **Current Phase** | MVP |
| **Build Status** | Pre-development |
| **Document Status** | Confidential |

---

**VALLNA**

Technical Design & Architecture Document

Version 1.3  |  June 2026  |  Pre-Build Reference

*"The poison transforms to cure. The wound raised up becomes the healing. This is what Vallna is."*

**Current Phase:** MVP

**Build Status:** Pre-development

**Document Status:** Confidential

**Name Status:** Confirmed — vallna.com and vallna.app registered (EuroDNS — transfer to Namecheap pending). EUIPO filing pending. @vallna Instagram and TikTok: to be secured once EuroDNS resolves. Proton Mail setup pending DNS stability.

# 1. Purpose ** & ** Scope

This document is the founding technical reference for Vallna — a personal growth and self-awareness application. It records every architectural decision made before a line of code was written, the reasoning behind each decision, and the constraints every Claude instance must respect when building this application.

Any Claude instance, developer, or collaborator reading this document should be able to make correct architectural decisions without needing to re-derive them. When in doubt: this document takes precedence.

This document covers:

Brand story, name origin, competitive positioning, and product thesis

Product vision and user profile

Confirmed tech stack with rationale

Full data model (all tables, fields, relationships)

API and service architecture

LLM agent hierarchy and cost control strategy

Security and GDPR requirements

Development tooling and workflow

Open decisions and next steps

# 2. Brand Story ** & ** Competitive Positioning

## 2.1 The name

Vallna is a constructed word, built from sound rather than derived from a single root — and that is intentional. It was designed to carry the phonosemantic quality of the verbs that describe what users do inside it: journaling, awakening, grounding, clearing, becoming.

Say those words out loud. They share a quality: forward motion, no hard stop, the word keeps moving after you have finished saying it. They feel like process, not object. Like something happening to you while you do it.

Vallna was built to carry that same quality. The V launches cleanly. The double-l creates just enough weight without stopping the flow — a speed bump, not a wall. The open -na landing keeps moving after the word ends. Two syllables. No hard stop anywhere.

Underneath the construction, val carries wave in Catalan, Occitan, and traces through Romance languages. A journal entry is a wave. A pattern detected over weeks is a wave. The reports show the waves of a life in motion. Users will not know this consciously. They will feel it.

## 2.2 The naming journey

The name was arrived at through an extensive process that considered and eliminated: Innara, Innori, Innora (store conflicts or trademark blocks), Pharava (etymologically rich but three syllables, difficult to memorise), Vexa, Miren, Sova, Drava, Sera, Awra (all taken on EUIPO or Play Store), Volna (taken as brand), Wallna, and others. Vallna emerged from a phonosemantic brief: two syllables, flowing consonants, open vowel ending, sounds like process not object. It cleared every check — EUIPO, Play Store, .com, .app.

This history matters. If the name is ever questioned internally, the answer is: it was earned, not chosen quickly.

## 2.3 The thesis

*"You need to get to know your enemy in order to defeat it. You can only personally grow if you truthfully detect your issues, false beliefs, and negative patterns. Bring the ugly out in order to resolve it and disintegrate it. The poison transforms to cure."*

This is not a comfort app. It is a truth app. The distinction matters and it is the entire competitive position.

Most wellness applications operate on the comfort end of the spectrum: gratitude journals, affirmations, gentle streaks, positive reinforcement. They help users feel better. Vallna helps users see more clearly — which sometimes feels uncomfortable before it feels better. The assumption is that users who genuinely want to grow are capable of tolerating honest contact with their own patterns. That they are hungry for it, because the comfort apps have not delivered the change they were promised.

## 2.4 The symbolic layer

The pharmakon concept — the Greek word that holds poison, medicine, and scapegoat simultaneously — underlies the entire product philosophy. The same substance that harms, heals, depending entirely on the relationship you have with it. The caduceus. The Rod of Asclepius. The bronze Nehushtan that Moses raised in the desert: anyone bitten by serpents who looked upon the bronze serpent was healed. The image of the thing that harms, elevated and looked at directly, becomes the cure.

The serpent symbolism runs deeper: in virtually every human tradition the serpent represents liminality (living at thresholds), cyclical renewal through shedding, dangerous wisdom, and the union of opposites. The shed skin is the most precise image of what honest journaling produces over time — the user becomes something new by releasing what they were.

This symbolic layer should inform onboarding language, report tone, visual design direction, and the metaphors used in AI-generated content. It should never be stated explicitly or made into a gimmick. It should be felt.

The wave quality in the name Vallna connects to this directly. Waves shed. Waves transform. Waves carry things to shore that were hidden in deep water.

## 2.5 Competitive landscape

| **Category** | **Examples** | **What they offer** | **What they avoid** |
| --- | --- | --- | --- |
| Meditation | Calm, Headspace | Relaxation, sleep, stress reduction | Confrontation with patterns; personal shadow |
| Gratitude / positivity | Reflectly, Daylio | Positive reframing, mood logging | Honest assessment of negative patterns |
| Habit tracking | Habitica, Streaks | Behavioural consistency, gamification | Why habits fail; root cause analysis |
| Generic journaling | Day One, Journey | Free-form writing, memory keeping | AI analysis; pattern recognition; accountability |
| Astrology apps | Co-Star, The Pattern | Astrological profiles, daily readings | Integration with actual behaviour data; journaling |
| Vallna | — | Honest pattern detection, shadow integration, AI-enriched insight, astrological depth | Comfort without truth; validation without growth |

## 2.6 The specific gap Vallna fills

No app currently combines:

Honest, AI-driven pattern analysis that names what is actually happening — not just what the user wants to hear

Integration of Western astrology and the 13-month Dreamspell calendar as a personalisation layer for recommendations

Daily journaling and category grading as the raw data source for AI insight

A philosophical position that treats discomfort as the mechanism of growth, not a problem to be soothed

## 2.7 What Vallna is not

Not a therapy replacement — it does not diagnose, treat, or counsel. It reflects and recommends.

Not a positivity platform — it will name negative patterns when they are present in user data.

Not an astrology app — astrology is context for insight, not the product itself.

Not a habit tracker — it is concerned with awareness and alignment, not behavioural gamification.

## 2.8 Brand voice principles

**Honest:** The app does not flatter. It reflects.

**Respectful:** It does not lecture or moralize. It presents patterns and trusts the user to act.

**Precise:** Precise, meaningful language — not wellness jargon or motivational filler.

**Mature:** Holds complexity without resolving it artificially. Growth is not linear. The app knows this.

**Calm:** Simple surface, serious depth. The UI is calm and uncluttered. What happens beneath is sophisticated.

# 3. Product Vision

## 3.1 What the app does

Vallna helps users develop greater self-awareness, accountability, and alignment with their intuition through structured daily journaling, mood and category tracking, and AI-generated personal insights. Insights are enriched with the user's astrological profile — drawn from both Western astrology and the 13-month Dreamspell/Law of Time calendar — to produce recommendations that are both personally calibrated and honestly delivered.

## 3.2 Who it is for

**Primary:** Women, 30+ years old, Western markets

**Psychographic:** Interested in personal growth, spirituality, self-development — not technical. Has tried other wellness apps and found them too superficial. Ready for something more honest.

**Expectation:** The app must feel simple, calm, and intuitive. Complexity is hidden, never shown.

**Device:** Mobile-first. Most users will access primarily from smartphone.

## 3.3 The user's internal state

When a user opens Vallna, she is hoping to find clarity, to understand, to grow, to awaken. She comes in hoping. She leaves — over weeks and months of honest use — more awake. The app is the passage between those two states. Every design decision, every AI output, every piece of copy should serve that passage.

## 3.4 Core user flows (MVP)

**Auth:** Register via Google OAuth or email/password

**Onboarding:** Short onboarding survey to capture self-perception + birth data (for astro profile)

**Journal:** Write multiple timestamped journal entries per day

**Grading:** Assign grades (1-10) to up to 5 personal categories per day, with optional note per grade

**Reports:** AI analyses journal + grades at end of day; generates daily, weekly, monthly reports with recommendations

**Delivery:** Push notification or email delivery of reports

**Referral:** Share app link; write app store review

# 4. Confirmed Tech Stack

All decisions below are confirmed and locked for MVP. Rationale is included so future Claude instances understand the constraints and do not propose alternatives without flagging the architectural impact.

| **Layer** | **Technology** | **Rationale** |
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

Naming convention: snake_case for all table and column names. UUIDs for all primary keys. created_at and updated_at timestamps on every table.

## 5.1 users

| **Column** | **Type** | **Notes** |
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

| **Column** | **Type** | **Notes** |
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
| dreamspell_kin | integer | 13-month calendar: Kin number (1-260) |
| dreamspell_seal | text | Solar seal name (e.g. Red Cosmic Serpent) |
| dreamspell_tone | integer | Galactic tone (1-13) |
| dreamspell_wavespell | text | Wavespell name |
| profile_json | jsonb | Full computed profile as structured JSON. Injected into LLM prompts as compact block. |
| computed_at | timestamptz | When profile was last computed |

*The astrology and 13-month calendar reference data (Kin meanings, seal descriptions, tone interpretations) will be stored in a separate reference database — NOT in the main Supabase user DB. Flagged as a separate design step before building the LLM prompt layer.*

## 5.3 onboarding_surveys

| **Column** | **Type** | **Notes** |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| responses | jsonb | Full survey answers as structured JSON |
| self_perception_score | numeric | Derived score: alignment between self-perception and astro profile |
| completed_at | timestamptz |  |

## 5.4 journal_entries

| **Column** | **Type** | **Notes** |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| content | text | Journal entry text. No length limit at DB level — enforce in application. |
| entry_date | date | Calendar date of entry |
| created_at | timestamptz | Exact timestamp — user-visible |
| updated_at | timestamptz |  |

## 5.5 tracking_categories

User-defined categories for daily grading. MVP limit: 5 per user.

| **Column** | **Type** | **Notes** |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| name | text | Category name (e.g. Mental Clarity, Physical Wellbeing) |
| emoji | text | Optional icon |
| is_active | boolean | Soft delete — never hard delete to preserve historical grades |
| display_order | integer | User-defined sort order |
| created_at | timestamptz |  |

## 5.6 daily_grades

| **Column** | **Type** | **Notes** |
| --- | --- | --- |
| id | uuid (PK) |  |
| user_id | uuid (FK) | References users(id) |
| category_id | uuid (FK) | References tracking_categories(id) |
| grade | integer | Score 1-10. Enforce range in application AND DB check constraint. |
| note | text | Optional note. Included in LLM analysis. |
| grade_date | date | Calendar date this grade applies to |
| created_at | timestamptz |  |

## 5.7 reports

| **Column** | **Type** | **Notes** |
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

| **Column** | **Type** | **Notes** |
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

| **Column** | **Type** | **Notes** |
| --- | --- | --- |
| id | uuid (PK) |  |
| referrer_user_id | uuid (FK) | User who shared the link |
| referred_email | text | Email of new user |
| referred_user_id | uuid (FK) | Populated when referred user registers. Nullable. |
| created_at | timestamptz |  |
| converted_at | timestamptz | Null = pending |

# 6. LLM Agent Hierarchy ** & ** Cost Control

Strategic overview only. Full LLM architecture is a separate design step — see Section 10.

## 6.1 Tiered model usage

| **Tier** | **Model** | **Used for** | **Frequency** |
| --- | --- | --- | --- |
| Tier 1 — Fast | claude-haiku-4-5 | In-app micro-tasks; summarisation of raw journal text before Tier 2 analysis | Per user interaction |
| Tier 2 — Standard | claude-sonnet-4-6 | Daily report generation; weekly summaries | Once per user per day/week |
| Tier 3 — Deep | claude-opus-4-6 or Sonnet extended thinking | Monthly deep analysis only | Once per user per month |

## 6.2 Cost control principles

**Summarise first:** Never send raw journal text to Tier 2/3. Summarise first with Tier 1. Estimated token reduction: 60-80% at scale.

**Pre-compute astro context:** Astro profile stored as compact JSON, injected once per prompt. Never re-computed at call time.

**Instrument everything:** Every LLM call writes to usage_costs. Review Anthropic dashboard weekly.

**Match model to task:** Match model depth to report type. Never use Opus for daily reports.

**Batch at scale:** Switch to batch processing during off-peak hours as user base grows.

# 7. Security ** & ** GDPR

Security is the highest priority. Journal entries and personal growth records are deeply sensitive. A breach is not just a technical failure — it is a harm to real people.

## 7.1 Data isolation

**Supabase RLS:** RLS enabled on ALL tables from day one. Users can only access their own rows. Application bugs cannot leak cross-user data.

**API responses:** Never return user data not explicitly requested by that authenticated user.

## 7.2 Authentication

Supabase Auth handles all session management. Do not implement custom auth.

Google OAuth and email/password supported from day one.

JWT tokens never stored in localStorage. Use Supabase cookie-based session management.

All routes verify Supabase session server-side in Next.js middleware.

## 7.3 Secrets management

All API keys in environment variables — NEVER in code.

Supabase anon key (client-safe) vs service role key (server only, never exposed to client).

System prompt content is server-side only. Never returned to client. Never logged.

.env.local for development; Vercel environment variables for production. Never committed to git.

## 7.4 GDPR requirements

**Data residency:** Supabase hosted in EU — Frankfurt region (eu-central-1). Choose at project creation.

**Right to erasure:** Data export and account deletion must be built before accepting real users.

**Data minimisation:** Only collect necessary data. Birth time is optional. No location tracking.

**Processing disclosure:** Journal entries never used to train LLM models. State explicitly in privacy policy.

**Third-party DPAs:** Resend and Anthropic DPAs must be signed before launch.

## 7.5 What Claude must never do

Expose LLM system prompt content to any client-side response

Include user PII in error logs or console output

Return another user's data in any API response

Hardcode any secret, API key, or credential in source code

Skip RLS policies on any new table, even temporary ones

Store sensitive data in localStorage or sessionStorage

# 8. API Architecture

All API routes live under /api in the Next.js App Router. Every route that touches user data verifies the Supabase session before processing. No exceptions.

## 8.1 Route structure (MVP)

| **Route** | **Method** | **Purpose** |
| --- | --- | --- |
| /api/auth/* | Handled by Supabase Auth | Login, logout, OAuth callbacks |
| /api/users/me | GET / PATCH | Read and update own profile |
| /api/onboarding/survey | POST | Submit onboarding survey; trigger astro profile computation |
| /api/journal | GET / POST | List entries for a date range; create new entry |
| /api/journal/[id] | PATCH / DELETE | Edit or delete own entry |
| /api/categories | GET / POST | List own categories; create new (max 5 enforced here) |
| /api/categories/[id] | PATCH / DELETE | Edit or soft-delete own category |
| /api/grades | GET / POST | List grades for a date; submit a grade with optional note |
| /api/reports | GET | List own reports by type and date range |
| /api/reports/[id] | GET | Read a single report |
| /api/referrals | POST | Generate referral link for current user |
| /api/account/export | GET | GDPR data export — all user data as JSON |
| /api/account/delete | DELETE | GDPR account deletion — hard delete all user data |

## 8.2 Scheduled jobs (Supabase pg_cron)

| **Job** | **Schedule** | **Action** |
| --- | --- | --- |
| daily_reports | 23:00 per user timezone | Pull day's journal + grades; summarise (Tier 1); generate report (Tier 2); store; trigger notification |
| weekly_reports | Sunday 23:00 | Pull week's data; generate weekly report (Tier 2); store and deliver |
| monthly_reports | Last day of month 23:00 | Pull month's data; generate deep analysis (Tier 3); store and deliver |
| cost_summary | Daily 06:00 UTC | Aggregate usage_costs by user; flag users exceeding cost threshold |

# 9. Development Workflow

## 9.1 Tools

**Primary build environment:** Cursor IDE with Claude Sonnet. All code written by Claude within Cursor.

**Session startup:** This document is the source of truth. Share it with Claude at the start of every Cursor session.

**Version control:** GitHub repository. Every feature in its own branch. Main branch = deployable. Never commit directly to main.

**Vercel deployment:** Automatic on push to main. Preview deployments for every branch.

## 9.2 Build order (MVP sequence)

Build in this order. Do not skip ahead. Each step complete and tested before the next begins.

**Step 1: Project scaffold — **Next.js + Tailwind + Shadcn setup; Vercel connected; GitHub repo created. App name: Vallna.

**Step 2: Supabase setup — **Project created in EU region (Frankfurt); all tables with RLS policies; auth configured

**Step 3: Authentication — **Email/password and Google OAuth; session middleware; protected routes

**Step 4: Onboarding survey — **Survey UI; astro birth data capture; astro_profiles populated

**Step 5: Journal — **Create, read, edit, delete entries; date navigation; multiple entries per day

**Step 6: Category tracking — **Create/manage up to 5 categories; grade entry with note; daily view

**Step 7: LLM layer design — **SEPARATE DESIGN SESSION REQUIRED before this step — see Section 10

**Step 8: Report generation — **Edge functions; pg_cron scheduling; tiered model calls; Vallna brand voice in outputs

**Step 9: Notifications — **Resend email; Web Push API; user notification preferences

**Step 10: Referral + reviews — **Referral link generation; app store review prompt

**Step 11: GDPR flows — **Data export; account deletion; privacy policy page

**Step 12: PWA configuration — **Manifest; service worker; app store submission via PWABuilder

## 9.3 Cost monitoring

Anthropic API dashboard: review weekly during MVP phase.

usage_costs table: query weekly — average cost per user, highest-cost operations, trend over time.

Set a cost alert in Anthropic dashboard for unexpected spikes.

If cost-per-user exceeds target unit economics, fix LLM architecture before acquiring more users.

# 10. Open Decisions ** & ** Next Steps

Explicitly unresolved items. Each requires a dedicated design session before the relevant build step.

| **#  | Decision** | **Required before** | **Notes** |
| --- | --- | --- | --- |
| 1 | Astro & 13-month calendar reference database — structure, content, versioning, hosting | Step 7 | Separate design session. Same Supabase project vs separate DB; static vs updateable; who maintains astro data. |
| 2 | Full LLM prompt architecture — system prompt templates, context budget per tier, structured output schema, summarisation pipeline, Vallna brand voice enforcement in AI outputs | Step 7 | Separate design session. Must be complete before any report generation code is written. |
| 3 | Onboarding survey content — exact questions; scoring algorithm for self-perception vs astro alignment | Step 4 | Content decision. Must be decided before survey UI is built. |
| 4 | Trademark filing — EUIPO classes 9 and 42 for Vallna | Before public launch | Engage trademark attorney. Budget EUR 1,000-2,000. EUIPO search complete: name is clean. |
| 5 | Domain and social handles — vallna.com and vallna.app confirmed available. Register immediately. | Now | Also secure @vallna on Instagram and TikTok. |
| 6 | Visual design direction — brand identity, colour palette, typography | Step 1 | Should reflect: calm surface, serious depth. Wave quality of the name as a felt design principle, not literal imagery. |
| 7 | Stripe integration design — subscription tiers, pricing, feature gates | Future phase | Schema ready (subscription_tier field). Deferred post-MVP. |
| 8 | Birth chart computation — external astrology API vs in-house library | Step 4 | External API simpler but adds dependency and cost. In-house requires library evaluation. |
| 9 | Proton Mail setup — hello@vallna.com custom domain | Before any public communications | Waiting on EuroDNS verification or transfer to Namecheap. Do not set up email until DNS is stable. |
| 10 | Domain registrar transfer — EuroDNS to Namecheap | Before DNS setup | EuroDNS has known verification bugs and MX record issues. Transfer before setting up Vercel, Supabase, or Proton Mail DNS records. |
| 11 | Social media handles — @vallna on Instagram and TikTok | Before any public mention of the name | Pending EuroDNS resolution. Secure immediately once that is resolved. Also consider @vallna on X and LinkedIn. |
| 12 | Astro DB structure — separate design session | Step 7 | COMPLETED in design session — see Section 11 (added in v1.3) |
| 13 | LLM prompt architecture — separate design session | Step 7 | COMPLETED in design session — see Section 12 (added in v1.3) |

This document is updated at the end of each significant design session. It is the source of truth for all architectural and brand decisions. When in doubt, a Claude instance should consult this document before making any choice.

End of document — Vallna Technical Design v1.3  |  June 2026
