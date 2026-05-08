import { useCallback, useEffect, useState } from "react";
import { getQuickBuildBySlug } from "@/data/quickAIBuilds";
import {
  listProjects,
  updateProject,
  completeNextStage,
  type QuickProject,
} from "@/lib/quickProjectsApi";
import { useQuickProjectsSync } from "@/hooks/useQuickProjectsSync";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const AdminQuickBuildsPage = () => {
  const [rows, setRows] = useState<QuickProject[]>([]);

  const refresh = useCallback(async () => {
    try {
      const list = await listProjects();
      setRows(list);
    } catch {
      setRows([]);
      toast.error("Could not load projects.");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useQuickProjectsSync(() => void refresh(), true);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Quick AI builds</h1>
      <p className="text-muted-foreground mb-8">Intake queue, SLA, stages, and schedule controls.</p>

      <div className="rounded-2xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No requests yet.
                </TableCell>
              </TableRow>
            )}
            {rows.map((p) => (
              <ProjectRow key={p.id} project={p} onChange={refresh} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function ProjectRow({ project: p, onChange }: { project: QuickProject; onChange: () => Promise<void> }) {
  const svc = getQuickBuildBySlug(p.slug);
  const [urlDraft, setUrlDraft] = useState(p.liveSiteUrl ?? "");

  useEffect(() => {
    setUrlDraft(p.liveSiteUrl ?? "");
  }, [p.id, p.liveSiteUrl]);

  const patch = async (partial: Partial<QuickProject>) => {
    try {
      await updateProject(p.id, partial);
      await onChange();
      toast.success("Updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed.");
    }
  };

  const nextStage = async () => {
    try {
      await completeNextStage(p.id);
      await onChange();
      toast.success("Stage advanced.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not advance stage.");
    }
  };

  return (
    <TableRow>
      <TableCell className="align-top">
        <p className="font-medium">{svc?.name ?? p.slug}</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={p.notes}>
          {p.notes.slice(0, 80)}
          {p.notes.length > 80 ? "…" : ""}
        </p>
      </TableCell>
      <TableCell className="align-top text-sm">
        <div>{p.fullName}</div>
        <div className="text-muted-foreground">{p.email}</div>
      </TableCell>
      <TableCell className="align-top text-sm">{p.slaState}</TableCell>
      <TableCell className="align-top text-sm">{p.schedule}</TableCell>
      <TableCell className="align-top text-right">
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap justify-end gap-1">
            {p.slaState === "none" && (
              <Button
                size="sm"
                variant="secondary"
                className="rounded-lg h-8 text-xs"
                onClick={() => void patch({ slaState: "requested", slaRequestedAt: Date.now() })}
              >
                Request SLA
              </Button>
            )}
            {p.slaState === "approved" && !p.buildStartedAt && (
              <Button size="sm" className="rounded-lg h-8 text-xs" onClick={() => void patch({ buildStartedAt: Date.now() })}>
                Start building
              </Button>
            )}
            {p.buildStartedAt && (
              <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs" onClick={() => void nextStage()}>
                Next stage
              </Button>
            )}
            <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs" onClick={() => void patch({ schedule: "paused", scheduleNote: "Paused by admin" })}>
              Pause
            </Button>
            <Button size="sm" variant="outline" className="rounded-lg h-8 text-xs" onClick={() => void patch({ schedule: "on_hold", scheduleNote: "On hold" })}>
              Hold
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg h-8 text-xs"
              onClick={() => {
                const d = window.prompt("Target date (e.g. 2026-06-01)");
                if (!d) return;
                void patch({ schedule: "rescheduled", rescheduleTargetDate: d, scheduleNote: "Rescheduled" });
              }}
            >
              Reschedule
            </Button>
            {p.schedule !== "active" && (
              <Button
                size="sm"
                variant="ghost"
                className="rounded-lg h-8 text-xs"
                onClick={() => void patch({ schedule: "active", scheduleNote: undefined, rescheduleTargetDate: undefined })}
              >
                Resume
              </Button>
            )}
          </div>
          <div className="flex gap-1 w-full max-w-[220px] justify-end">
            <Input
              className="h-8 text-xs rounded-lg"
              placeholder="Live site URL"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
            />
            <Button size="sm" className="h-8 text-xs rounded-lg shrink-0" onClick={() => void patch({ liveSiteUrl: urlDraft.trim() || undefined })}>
              Save URL
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default AdminQuickBuildsPage;
