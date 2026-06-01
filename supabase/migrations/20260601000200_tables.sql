-- Vallna — Step 2: Supabase setup
-- Migration 0200: all tables
-- Source of truth: _docs/01_vallna_technical_design_v1_3.md §5
-- Conventions: snake_case names, uuid PKs, created_at + updated_at on every table.

-- 5.1 users -----------------------------------------------------------------
-- id mirrors auth.users(id). Populated by the on_auth_user_created trigger.
create table public.users (
  id                      uuid primary key references auth.users (id) on delete cascade,
  email                   text not null unique,
  display_name            text,
  subscription_tier       text not null default 'free'
                            check (subscription_tier in ('free', 'pro', 'premium')),
  onboarding_complete     boolean not null default false,
  notification_preference text not null default 'both'
                            check (notification_preference in ('email', 'push', 'both', 'none')),
  -- IANA timezone string. Required for report scheduling; captured at onboarding.
  timezone                text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- 5.2 astro_profiles --------------------------------------------------------
-- One-to-one with users (user_id unique).
create table public.astro_profiles (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid not null unique references public.users (id) on delete cascade,
  birth_date           date not null,
  birth_time           time,
  birth_location       text,
  birth_lat            numeric,
  birth_lng            numeric,
  sun_sign             text,
  moon_sign            text,
  rising_sign          text,
  dreamspell_kin       integer check (dreamspell_kin between 1 and 260),
  dreamspell_seal      text,
  dreamspell_tone      integer check (dreamspell_tone between 1 and 13),
  dreamspell_wavespell text,
  -- Full computed profile injected into LLM prompts as a compact block.
  profile_json         jsonb,
  computed_at          timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- 5.3 onboarding_surveys ----------------------------------------------------
create table public.onboarding_surveys (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references public.users (id) on delete cascade,
  responses             jsonb,
  -- Derived: alignment between self-perception and astro profile.
  self_perception_score numeric,
  completed_at          timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- 5.4 journal_entries -------------------------------------------------------
create table public.journal_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.users (id) on delete cascade,
  -- No length limit at DB level; enforced in the application.
  content    text not null,
  entry_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5.5 tracking_categories ---------------------------------------------------
-- MVP limit of 5 active categories per user is enforced in the API layer (§8.1).
create table public.tracking_categories (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users (id) on delete cascade,
  name          text not null,
  emoji         text,
  -- Soft delete only — preserve historical grades.
  is_active     boolean not null default true,
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 5.6 daily_grades ----------------------------------------------------------
create table public.daily_grades (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users (id) on delete cascade,
  category_id uuid not null references public.tracking_categories (id) on delete cascade,
  grade       integer not null check (grade between 1 and 10),
  note        text,
  grade_date  date not null default current_date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 5.7 reports ---------------------------------------------------------------
create table public.reports (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users (id) on delete cascade,
  report_type     text not null check (report_type in ('daily', 'weekly', 'monthly')),
  period_start    date not null,
  period_end      date not null,
  content         text,
  recommendations jsonb,
  model_used      text,
  tokens_used     integer,
  generated_at    timestamptz not null default now(),
  delivered_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 5.8 usage_costs -----------------------------------------------------------
-- Written by server-side jobs (service_role). Users may read their own rows.
create table public.usage_costs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users (id) on delete cascade,
  operation     text not null,
  model         text not null,
  input_tokens  integer,
  output_tokens integer,
  cost_usd      numeric(10, 6),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 5.9 referrals -------------------------------------------------------------
create table public.referrals (
  id               uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references public.users (id) on delete cascade,
  referred_email   text,
  referred_user_id uuid references public.users (id) on delete set null,
  converted_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
