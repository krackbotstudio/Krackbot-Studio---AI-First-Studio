import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import type { CmsSectionId } from "@/config/cms";

export type CmsRole = {
  id: string;
  name: string;
  description: string;
  sectionIds: CmsSectionId[];
  createdAt: number;
};

export type CmsProfileRow = {
  userId: string;
  email: string;
  roleId: string | null;
  isSuperAdmin: boolean;
  role?: CmsRole | null;
};

function mapRole(row: Record<string, unknown>): CmsRole {
  return {
    id: row.id as string,
    name: row.name as string,
    description: (row.description as string) ?? "",
    sectionIds: (row.section_ids as string[]) as CmsSectionId[],
    createdAt: new Date(row.created_at as string).getTime(),
  };
}

export async function listRoles(): Promise<CmsRole[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase.from("cms_roles").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => mapRole(r as Record<string, unknown>));
}

export async function createRole(input: Omit<CmsRole, "id" | "createdAt">): Promise<CmsRole> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase
    .from("cms_roles")
    .insert({
      name: input.name,
      description: input.description,
      section_ids: input.sectionIds,
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapRole(data as Record<string, unknown>);
}

export async function updateRole(id: string, patch: Partial<Omit<CmsRole, "id" | "createdAt">>): Promise<CmsRole | undefined> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const row: Record<string, unknown> = {};
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.sectionIds !== undefined) row.section_ids = patch.sectionIds;
  const { data, error } = await supabase.from("cms_roles").update(row).eq("id", id).select("*").maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  return mapRole(data as Record<string, unknown>);
}

export async function deleteRole(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("cms_roles").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export async function getRole(id: string): Promise<CmsRole | undefined> {
  if (!isSupabaseConfigured()) return undefined;
  const { data, error } = await supabase.from("cms_roles").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  return mapRole(data as Record<string, unknown>);
}

export async function listStaffProfiles(): Promise<CmsProfileRow[]> {
  if (!isSupabaseConfigured()) return [];
  const { data: profiles, error } = await supabase
    .from("cms_profiles")
    .select("user_id, email, role_id, is_super_admin")
    .order("email");
  if (error) throw error;
  const roles = await listRoles();
  const roleMap = new Map(roles.map((r) => [r.id, r]));
  return (profiles ?? []).map((p) => {
    const row = p as { user_id: string; email: string; role_id: string | null; is_super_admin: boolean };
    return {
      userId: row.user_id,
      email: row.email,
      roleId: row.role_id,
      isSuperAdmin: row.is_super_admin,
      role: row.role_id ? roleMap.get(row.role_id) ?? null : null,
    };
  });
}

export async function deleteStaffProfile(userId: string): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from("cms_profiles").delete().eq("user_id", userId);
  if (error) throw error;
}

/** Invite a staff user (creates auth user). May end the current session if email auto-confirm is on — sign in again as super admin if needed. */
export async function inviteStaffUser(email: string, password: string, roleId: string): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const { error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        role_id: roleId,
        is_super_admin: false,
      },
    },
  });
  if (error) throw error;
}
