-- Vallna — Step 2: Supabase setup
-- Migration 0500: provision a public.users row when an auth user is created
-- Source of truth: _docs/01_vallna_technical_design_v1_3.md §5.1, §7.2

-- Runs as SECURITY DEFINER with an empty search_path, so every object is
-- schema-qualified. display_name is seeded from OAuth metadata when present.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
