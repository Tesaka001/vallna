-- Vallna — Step 2: Supabase setup
-- Migration 0300: indexes and updated_at triggers

-- Indexes on foreign keys and common query paths (date-range lookups, §8.1) ---
create index idx_astro_profiles_user_id      on public.astro_profiles (user_id);
create index idx_onboarding_surveys_user_id  on public.onboarding_surveys (user_id);
create index idx_journal_entries_user_date   on public.journal_entries (user_id, entry_date desc);
create index idx_tracking_categories_user_id on public.tracking_categories (user_id);
create index idx_daily_grades_user_date      on public.daily_grades (user_id, grade_date desc);
create index idx_daily_grades_category_id    on public.daily_grades (category_id);
create index idx_reports_user_type_period    on public.reports (user_id, report_type, period_start desc);
create index idx_usage_costs_user_created    on public.usage_costs (user_id, created_at desc);
create index idx_referrals_referrer          on public.referrals (referrer_user_id);
create index idx_referrals_referred_user     on public.referrals (referred_user_id);

-- Keep updated_at current on every table ------------------------------------
create trigger set_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.astro_profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.onboarding_surveys
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.journal_entries
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.tracking_categories
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.daily_grades
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.reports
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.usage_costs
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.referrals
  for each row execute function public.set_updated_at();
