export const BUILD_STAGES = [
  { id: "concept" as const, label: "Concept", doneLabel: "Concept done" },
  { id: "design" as const, label: "Design", doneLabel: "Design done" },
  { id: "development" as const, label: "Development", doneLabel: "Development done" },
  { id: "domain" as const, label: "Domain connection", doneLabel: "Domain connected" },
  { id: "hosting" as const, label: "Hosting", doneLabel: "Hosting done" },
  { id: "deployed" as const, label: "Deployed", doneLabel: "Deployed" },
] as const;

export type BuildStageId = (typeof BUILD_STAGES)[number]["id"];

export type SlaState = "none" | "requested" | "approved";

export type ProjectSchedule = "active" | "paused" | "on_hold" | "rescheduled";

import type { QuickAIBuildSlug } from "@/data/quickAIBuilds";

export type QuickProject = {
  id: string;
  slug: QuickAIBuildSlug;
  submittedAt: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  slaState: SlaState;
  slaRequestedAt?: number;
  slaApprovedAt?: number;
  buildStartedAt?: number | null;
  completedStageIds: BuildStageId[];
  liveSiteUrl?: string;
  schedule: ProjectSchedule;
  scheduleNote?: string;
  rescheduleTargetDate?: string;
};

export function isStageDone(project: QuickProject, stageId: BuildStageId): boolean {
  return project.completedStageIds.includes(stageId);
}

export function getNextStageId(project: QuickProject): BuildStageId | null {
  for (const s of BUILD_STAGES) {
    if (!project.completedStageIds.includes(s.id)) return s.id;
  }
  return null;
}

export function canShowBuildProgress(project: QuickProject): boolean {
  return project.buildStartedAt != null && project.slaState === "approved";
}
