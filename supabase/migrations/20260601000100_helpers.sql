-- Vallna — Step 2: Supabase setup
-- Migration 0100: extensions and shared helper functions
-- Source of truth: _docs/01_vallna_technical_design_v1_3.md §5

-- gen_random_uuid() lives in pgcrypto; ensure it is available for UUID PKs.
create extension if not exists pgcrypto;

-- Shared trigger function: keeps updated_at current on every UPDATE.
-- Used by all tables (naming convention §5: every table has created_at + updated_at).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
