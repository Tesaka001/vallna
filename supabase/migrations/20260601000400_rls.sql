-- Vallna — Step 2: Supabase setup
-- Migration 0400: Row-Level Security + privilege grants
-- Source of truth: _docs/01_vallna_technical_design_v1_3.md §7.1
-- RLS is enabled on ALL tables. No user can ever read another user's data.

-- As of 2026-05-30 new public tables are no longer auto-exposed to the Data API
-- roles, so we grant explicitly. RLS still restricts access to the user's own rows.
grant usage on schema public to anon, authenticated;

-- Enable RLS everywhere ------------------------------------------------------
alter table public.users               enable row level security;
alter table public.astro_profiles      enable row level security;
alter table public.onboarding_surveys  enable row level security;
alter table public.journal_entries     enable row level security;
alter table public.tracking_categories enable row level security;
alter table public.daily_grades        enable row level security;
alter table public.reports             enable row level security;
alter table public.usage_costs         enable row level security;
alter table public.referrals           enable row level security;

-- users ---------------------------------------------------------------------
-- The row's own id is the auth uid.
grant select, insert, update on public.users to authenticated;

create policy "users_select_own" on public.users
  for select using (auth.uid() = id);
create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);
create policy "users_update_own" on public.users
  for update using (auth.uid() = id) with check (auth.uid() = id);
-- No delete policy: account deletion runs server-side (§8.1 /api/account/delete).

-- Helper macro pattern: owner tables keyed by user_id ------------------------

-- astro_profiles
grant select, insert, update, delete on public.astro_profiles to authenticated;
create policy "astro_profiles_select_own" on public.astro_profiles
  for select using (auth.uid() = user_id);
create policy "astro_profiles_insert_own" on public.astro_profiles
  for insert with check (auth.uid() = user_id);
create policy "astro_profiles_update_own" on public.astro_profiles
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "astro_profiles_delete_own" on public.astro_profiles
  for delete using (auth.uid() = user_id);

-- onboarding_surveys
grant select, insert, update, delete on public.onboarding_surveys to authenticated;
create policy "onboarding_surveys_select_own" on public.onboarding_surveys
  for select using (auth.uid() = user_id);
create policy "onboarding_surveys_insert_own" on public.onboarding_surveys
  for insert with check (auth.uid() = user_id);
create policy "onboarding_surveys_update_own" on public.onboarding_surveys
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "onboarding_surveys_delete_own" on public.onboarding_surveys
  for delete using (auth.uid() = user_id);

-- journal_entries
grant select, insert, update, delete on public.journal_entries to authenticated;
create policy "journal_entries_select_own" on public.journal_entries
  for select using (auth.uid() = user_id);
create policy "journal_entries_insert_own" on public.journal_entries
  for insert with check (auth.uid() = user_id);
create policy "journal_entries_update_own" on public.journal_entries
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "journal_entries_delete_own" on public.journal_entries
  for delete using (auth.uid() = user_id);

-- tracking_categories
grant select, insert, update, delete on public.tracking_categories to authenticated;
create policy "tracking_categories_select_own" on public.tracking_categories
  for select using (auth.uid() = user_id);
create policy "tracking_categories_insert_own" on public.tracking_categories
  for insert with check (auth.uid() = user_id);
create policy "tracking_categories_update_own" on public.tracking_categories
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tracking_categories_delete_own" on public.tracking_categories
  for delete using (auth.uid() = user_id);

-- daily_grades
grant select, insert, update, delete on public.daily_grades to authenticated;
create policy "daily_grades_select_own" on public.daily_grades
  for select using (auth.uid() = user_id);
create policy "daily_grades_insert_own" on public.daily_grades
  for insert with check (auth.uid() = user_id);
create policy "daily_grades_update_own" on public.daily_grades
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "daily_grades_delete_own" on public.daily_grades
  for delete using (auth.uid() = user_id);

-- reports — generated server-side; users read their own only.
grant select on public.reports to authenticated;
create policy "reports_select_own" on public.reports
  for select using (auth.uid() = user_id);

-- usage_costs — written server-side (service_role); users read their own only.
grant select on public.usage_costs to authenticated;
create policy "usage_costs_select_own" on public.usage_costs
  for select using (auth.uid() = user_id);

-- referrals — owned by the referrer.
grant select, insert, update, delete on public.referrals to authenticated;
create policy "referrals_select_own" on public.referrals
  for select using (auth.uid() = referrer_user_id);
create policy "referrals_insert_own" on public.referrals
  for insert with check (auth.uid() = referrer_user_id);
create policy "referrals_update_own" on public.referrals
  for update using (auth.uid() = referrer_user_id) with check (auth.uid() = referrer_user_id);
create policy "referrals_delete_own" on public.referrals
  for delete using (auth.uid() = referrer_user_id);
