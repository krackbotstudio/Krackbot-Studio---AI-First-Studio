-- Ensure PostgREST roles can reach public tables (RLS still applies).
-- Safe to run if grants already exist.

grant usage on schema public to anon, authenticated;

grant insert on table public.quick_projects to anon;
grant select, insert, update, delete on table public.quick_projects to authenticated;

grant select, insert, update, delete on table public.cms_roles to authenticated;
grant select, insert, update, delete on table public.cms_profiles to authenticated;
