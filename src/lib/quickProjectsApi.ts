import { supabase, isSupabaseConfigured, getSupabaseConfigIssue } from "@/lib/supabaseClient";
import type { QuickAIBuildSlug } from "@/data/quickAIBuilds";
import { getNextStageId, type BuildStageId, type QuickProject, type ProjectSchedule, type SlaState } from "@/lib/quickProjectTypes";
export type { QuickProject, BuildStageId } from "@/lib/quickProjectTypes";
export { BUILD_STAGES, getNextStageId, canShowBuildProgress, isStageDone } from "@/lib/quickProjectTypes";

function mapRow(row: Record<string, unknown>): QuickProject {
  return {
    id: row.id as string,
    slug: row.slug as QuickAIBuildSlug,
    submittedAt: new Date(row.submitted_at as string).getTime(),
    fullName: row.full_name as string,
    email: row.email as string,
    phone: (row.phone as string) ?? "",
    company: (row.company as string) ?? "",
    notes: (row.notes as string) ?? "",
    slaState: row.sla_state as SlaState,
    slaRequestedAt: row.sla_requested_at ? new Date(row.sla_requested_at as string).getTime() : undefined,
    slaApprovedAt: row.sla_approved_at ? new Date(row.sla_approved_at as string).getTime() : undefined,
    buildStartedAt: row.build_started_at ? new Date(row.build_started_at as string).getTime() : null,
    completedStageIds: (row.completed_stage_ids as string[]) as BuildStageId[],
    liveSiteUrl: (row.live_site_url as string) ?? undefined,
    schedule: row.schedule as ProjectSchedule,
    scheduleNote: (row.schedule_note as string) ?? undefined,
    rescheduleTargetDate: (row.reschedule_target_date as string) ?? undefined,
  };
}

function patchToDb(patch: Partial<QuickProject>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (patch.slaState !== undefined) out.sla_state = patch.slaState;
  if (patch.slaRequestedAt !== undefined) out.sla_requested_at = new Date(patch.slaRequestedAt).toISOString();
  if (patch.slaApprovedAt !== undefined) out.sla_approved_at = new Date(patch.slaApprovedAt).toISOString();
  if (patch.buildStartedAt !== undefined) {
    out.build_started_at = patch.buildStartedAt == null ? null : new Date(patch.buildStartedAt).toISOString();
  }
  if (patch.completedStageIds !== undefined) out.completed_stage_ids = patch.completedStageIds;
  if (patch.liveSiteUrl !== undefined) out.live_site_url = patch.liveSiteUrl ?? null;
  if (patch.schedule !== undefined) out.schedule = patch.schedule;
  if (patch.scheduleNote !== undefined) out.schedule_note = patch.scheduleNote ?? null;
  if (patch.rescheduleTargetDate !== undefined) out.reschedule_target_date = patch.rescheduleTargetDate ?? null;
  return out;
}

export async function listProjects(): Promise<QuickProject[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("quick_projects")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => mapRow(r as Record<string, unknown>));
}

export async function findProjectsByLookup(lookup: string): Promise<QuickProject[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase.rpc("get_quick_projects_by_lookup", {
    p_lookup: lookup.trim(),
  });
  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  return rows.map(mapRow);
}

export async function findProjectById(id: string): Promise<QuickProject | undefined> {
  if (!isSupabaseConfigured()) return undefined;
  const { data, error } = await supabase.from("quick_projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  return mapRow(data as Record<string, unknown>);
}

export async function createProject(
  input: Omit<QuickProject, "id" | "completedStageIds" | "slaState" | "schedule" | "buildStartedAt">,
): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error(getSupabaseConfigIssue() ?? "Supabase is not configured.");
  const row = {
    slug: input.slug,
    submitted_at: new Date(input.submittedAt).toISOString(),
    full_name: input.fullName,
    email: input.email.trim(),
    phone: input.phone,
    company: input.company ?? "",
    notes: input.notes,
    sla_state: "none" as const,
    build_started_at: null,
    completed_stage_ids: [] as string[],
    schedule: "active" as const,
  };
  // Do not chain .select() here: anon RLS allows insert on quick_projects but not select on the new row,
  // so INSERT ... RETURNING would fail for unauthenticated bookings.
  const { error } = await supabase.from("quick_projects").insert(row);
  if (error) throw error;
}

export async function updateProject(id: string, patch: Partial<QuickProject>): Promise<QuickProject | undefined> {
  if (!isSupabaseConfigured()) throw new Error(getSupabaseConfigIssue() ?? "Supabase is not configured.");
  const db = patchToDb(patch);
  if (Object.keys(db).length === 0) return findProjectById(id);
  const { data, error } = await supabase.from("quick_projects").update(db).eq("id", id).select("*").maybeSingle();
  if (error) throw error;
  if (!data) return undefined;
  return mapRow(data as Record<string, unknown>);
}

export async function clientApproveSla(projectId: string, clientEmail: string): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error(getSupabaseConfigIssue() ?? "Supabase is not configured.");
  const { error } = await supabase.rpc("client_approve_sla", {
    p_project_id: projectId,
    p_email: clientEmail.trim(),
  });
  if (error) throw error;
}

export async function completeNextStage(id: string): Promise<QuickProject | undefined> {
  const p = await findProjectById(id);
  if (!p) return undefined;
  const next = getNextStageId(p);
  if (!next) return p;
  return updateProject(id, { completedStageIds: [...p.completedStageIds, next] });
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
