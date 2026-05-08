-- Fix "infinite recursion detected in policy for relation cms_profiles".
-- SECURITY DEFINER alone does not bypass RLS for the invoker's queries in PostgreSQL.
-- Helpers use SET LOCAL row_security = off (executed as definer) so checks do not recurse.

create or replace function public.cms_auth_is_staff()
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  perform set_config('row_security', 'off', true);
  return exists (
    select 1
    from public.cms_profiles p
    where p.user_id = auth.uid()
  );
end;
$$;

create or replace function public.cms_auth_is_super_admin()
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
begin
  perform set_config('row_security', 'off', true);
  return exists (
    select 1
    from public.cms_profiles p
    where p.user_id = auth.uid()
      and p.is_super_admin is true
  );
end;
$$;

revoke all on function public.cms_auth_is_staff() from public;
revoke all on function public.cms_auth_is_super_admin() from public;
grant execute on function public.cms_auth_is_staff() to authenticated;
grant execute on function public.cms_auth_is_super_admin() to authenticated;

-- quick_projects
drop policy if exists "quick_projects_staff_select" on public.quick_projects;
drop policy if exists "quick_projects_staff_modify" on public.quick_projects;
drop policy if exists "quick_projects_staff_insert" on public.quick_projects;

create policy "quick_projects_staff_select" on public.quick_projects
  for select to authenticated using (public.cms_auth_is_staff());

create policy "quick_projects_staff_modify" on public.quick_projects
  for update to authenticated
  using (public.cms_auth_is_staff())
  with check (true);

create policy "quick_projects_staff_insert" on public.quick_projects
  for insert to authenticated with check (public.cms_auth_is_staff());

-- cms_roles
drop policy if exists "cms_roles_read_staff" on public.cms_roles;
drop policy if exists "cms_roles_super_all" on public.cms_roles;

create policy "cms_roles_read_staff" on public.cms_roles
  for select to authenticated using (public.cms_auth_is_staff());

create policy "cms_roles_super_all" on public.cms_roles
  for all to authenticated
  using (public.cms_auth_is_super_admin())
  with check (public.cms_auth_is_super_admin());

-- cms_profiles
drop policy if exists "cms_profiles_read" on public.cms_profiles;
drop policy if exists "cms_profiles_super_insert" on public.cms_profiles;
drop policy if exists "cms_profiles_super_update" on public.cms_profiles;
drop policy if exists "cms_profiles_super_delete" on public.cms_profiles;

create policy "cms_profiles_read" on public.cms_profiles
  for select to authenticated using (
    auth.uid() = user_id
    or public.cms_auth_is_super_admin()
  );

create policy "cms_profiles_super_insert" on public.cms_profiles
  for insert to authenticated with check (public.cms_auth_is_super_admin());

create policy "cms_profiles_super_update" on public.cms_profiles
  for update to authenticated
  using (public.cms_auth_is_super_admin())
  with check (public.cms_auth_is_super_admin());

create policy "cms_profiles_super_delete" on public.cms_profiles
  for delete to authenticated using (public.cms_auth_is_super_admin());
