-- Krackbot: quick_projects + CMS roles/profiles (Supabase Auth)
-- Run via Supabase CLI or SQL Editor. Enable Realtime on quick_projects in Dashboard if needed.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- CMS roles (page-level section ids stored as text[])
-- ---------------------------------------------------------------------------
create table public.cms_roles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  section_ids text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- CMS profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.cms_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  role_id uuid references public.cms_roles (id) on delete set null,
  is_super_admin boolean not null default false
);

create index cms_profiles_email_lower on public.cms_profiles (lower(email));

-- ---------------------------------------------------------------------------
-- Quick AI build projects
-- ---------------------------------------------------------------------------
create table public.quick_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  submitted_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null default '',
  company text not null default '',
  notes text not null default '',
  sla_state text not null default 'none',
  sla_requested_at timestamptz,
  sla_approved_at timestamptz,
  build_started_at timestamptz,
  completed_stage_ids text[] not null default '{}',
  live_site_url text,
  schedule text not null default 'active',
  schedule_note text,
  reschedule_target_date text,
  created_at timestamptz not null default now(),
  constraint quick_projects_sla check (sla_state in ('none', 'requested', 'approved')),
  constraint quick_projects_schedule check (
    schedule in ('active', 'paused', 'on_hold', 'rescheduled')
  )
);

create index quick_projects_email_lower on public.quick_projects (lower(trim(email)));
create index quick_projects_phone_norm on public.quick_projects (replace(phone, ' ', ''));

-- ---------------------------------------------------------------------------
-- Auth trigger: create cms_profile row for every new auth user
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_cms_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.cms_profiles (user_id, email, role_id, is_super_admin)
  values (
    new.id,
    lower(trim(coalesce(new.email, ''))),
    nullif(new.raw_user_meta_data->>'role_id', '')::uuid,
    coalesce((new.raw_user_meta_data->>'is_super_admin')::boolean, false)
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_cms on auth.users;
create trigger on_auth_user_created_cms
  after insert on auth.users
  for each row execute function public.handle_new_cms_user();

-- ---------------------------------------------------------------------------
-- Public / anon RPCs (track page — no auth)
-- ---------------------------------------------------------------------------
create or replace function public.get_quick_projects_by_lookup(p_lookup text)
returns setof public.quick_projects
language sql
security definer
set search_path = public
stable
as $$
  select *
  from public.quick_projects
  where
    lower(trim(email)) = lower(trim(p_lookup))
    or replace(replace(replace(phone, ' ', ''), '-', ''), '+', '') =
        replace(replace(replace(trim(p_lookup), ' ', ''), '-', ''), '+', '');
$$;

grant execute on function public.get_quick_projects_by_lookup(text) to anon, authenticated;

create or replace function public.client_approve_sla(p_project_id uuid, p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.quick_projects
  set
    sla_state = 'approved',
    sla_approved_at = now()
  where
    id = p_project_id
    and lower(trim(email)) = lower(trim(p_email))
    and sla_state = 'requested';
end;
$$;

grant execute on function public.client_approve_sla(uuid, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.cms_roles enable row level security;
alter table public.cms_profiles enable row level security;
alter table public.quick_projects enable row level security;

-- quick_projects: public booking insert; staff manage all; no direct anon select
create policy "quick_projects_anon_insert" on public.quick_projects
  for insert to anon with check (true);

create policy "quick_projects_staff_select" on public.quick_projects
  for select to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid())
  );

create policy "quick_projects_staff_modify" on public.quick_projects
  for update to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid())
  )
  with check (true);

create policy "quick_projects_staff_insert" on public.quick_projects
  for insert to authenticated with check (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid())
  );

-- cms_roles
create policy "cms_roles_read_staff" on public.cms_roles
  for select to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid())
  );

create policy "cms_roles_super_all" on public.cms_roles
  for all to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid() and p.is_super_admin)
  )
  with check (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid() and p.is_super_admin)
  );

-- cms_profiles
create policy "cms_profiles_read" on public.cms_profiles
  for select to authenticated using (
    auth.uid() = user_id
    or exists (select 1 from public.cms_profiles x where x.user_id = auth.uid() and x.is_super_admin)
  );

create policy "cms_profiles_super_insert" on public.cms_profiles
  for insert to authenticated with check (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid() and p.is_super_admin)
  );

create policy "cms_profiles_super_update" on public.cms_profiles
  for update to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid() and p.is_super_admin)
  );

create policy "cms_profiles_super_delete" on public.cms_profiles
  for delete to authenticated using (
    exists (select 1 from public.cms_profiles p where p.user_id = auth.uid() and p.is_super_admin)
  );

-- Realtime (optional; enable in Dashboard → Database → Replication if this fails)
do $$
begin
  alter publication supabase_realtime add table public.quick_projects;
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- After migration: 
-- 1) Authentication → create user krackbotstudio@gmail.com (or your admin email)
-- 2) SQL: update public.cms_profiles set is_super_admin = true where email = 'krackbotstudio@gmail.com';
-- 3) Google Sheets / automation: INSERT into quick_projects using the service_role key (never in frontend).
--    REST: POST https://<project>.supabase.co/rest/v1/quick_projects  with Bearer service_role
-- ---------------------------------------------------------------------------
