import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Circle, ArrowLeft, ExternalLink, Clock, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuickBuildBySlug } from "@/data/quickAIBuilds";
import {
  BUILD_STAGES,
  findProjectsByLookup,
  normalizeEmail,
  clientApproveSla,
  canShowBuildProgress,
  type QuickProject,
} from "@/lib/quickProjectsApi";
import { toast } from "sonner";
import { useQuickProjectsSync } from "@/hooks/useQuickProjectsSync";

const TrackQuickBuild = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailParam = searchParams.get("email") ?? "";

  const [emailInput, setEmailInput] = useState(emailParam);
  const [activeEmail, setActiveEmail] = useState(() => (emailParam ? normalizeEmail(emailParam) : ""));
  /** Raw lookup string for API + polling (email or phone as entered). */
  const [lookupKey, setLookupKey] = useState(emailParam.trim());
  const [projects, setProjects] = useState<QuickProject[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refresh = useCallback(async (lookup: string) => {
    try {
      const list = await findProjectsByLookup(lookup);
      setProjects(list);
    } catch {
      setProjects([]);
    }
  }, []);

  useQuickProjectsSync(
    () => {
      if (lookupKey) void refresh(lookupKey);
    },
    Boolean(lookupKey),
  );

  useEffect(() => {
    if (emailParam) {
      const raw = emailParam.trim();
      const n = raw.includes("@") ? normalizeEmail(raw) : raw.replace(/\s+/g, "");
      setEmailInput(emailParam);
      setActiveEmail(n);
      setLookupKey(raw);
      void refresh(raw);
    }
  }, [emailParam, refresh]);

  const loadProjects = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = emailInput.trim();
    if (!raw) {
      toast.error("Enter the email or phone you used on the form.");
      return;
    }
    const n = raw.includes("@") ? normalizeEmail(raw) : raw.replace(/\s+/g, "");
    setActiveEmail(n);
    setLookupKey(raw);
    setSearchParams({ email: raw });
    await refresh(raw);
    const list = await findProjectsByLookup(raw);
    if (list.length === 0) {
      toast.message("No projects found for that email or phone yet.");
    }
  };

  const approveSla = async (project: QuickProject) => {
    try {
      await clientApproveSla(project.id, project.email);
      await refresh(lookupKey || emailInput.trim());
      toast.success("SLA approved. We will start as soon as our team confirms.");
    } catch {
      toast.error("Could not update SLA. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-36 pb-20">
        <div className="section-container max-w-3xl">
          <FadeIn>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to services
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Track your build</h1>
            <p className="text-muted-foreground mb-8">
              Enter the same email or phone number you used on the intake form to see status, SLA approval, and delivery
              progress.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <form onSubmit={loadProjects} className="flex flex-col sm:flex-row gap-3 mb-10">
              <Input
                type="text"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Email or phone number"
                className="rounded-xl flex-1"
                autoComplete="username"
              />
              <Button type="submit" className="rounded-xl shrink-0">
                View my projects
              </Button>
            </form>
          </FadeIn>

          {activeEmail && projects.length === 0 && (
            <p className="text-sm text-muted-foreground mb-6">
              No projects match <span className="font-medium text-foreground">{activeEmail}</span>. Submit a Quick AI Build
              request first, then return here.
            </p>
          )}

          <div className="space-y-4">
            {projects.map((p) => {
              const service = getQuickBuildBySlug(p.slug);
              const open = expandedId === p.id;
              return (
                <FadeIn key={p.id}>
                  <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedId(open ? null : p.id)}
                      className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{service?.name ?? p.slug}</p>
                        <p className="text-xs text-muted-foreground">
                          Requested {new Date(p.submittedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <StatusPill project={p} />
                        <span className="text-muted-foreground">{open ? "Hide" : "Details"}</span>
                      </div>
                    </button>

                    {open && (
                      <div className="border-t border-border/60 p-5 space-y-6 bg-muted/10">
                        <ScheduleBanner project={p} />

                        {p.slaState === "requested" && (
                          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                            <div className="flex gap-2 items-start mb-3">
                              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-foreground">SLA review required</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  We have sent the service-level agreement to your email. Please review and approve it here
                                  so we can schedule your build.
                                </p>
                              </div>
                            </div>
                            {p.slaState !== "approved" && (
                              <Button onClick={() => approveSla(p)} className="rounded-xl">
                                I approve the SLA
                              </Button>
                            )}
                          </div>
                        )}

                        {p.slaState === "none" && (
                          <p className="text-sm text-muted-foreground">
                            Your request is in our queue. We will send an SLA for your review shortly.
                          </p>
                        )}

                        {p.slaState === "approved" && !p.buildStartedAt && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            SLA approved — our team will start the build soon.
                          </div>
                        )}

                        {canShowBuildProgress(p) && (
                          <div>
                            <h3 className="font-display font-semibold text-foreground mb-4">Build progress</h3>
                            <ol className="space-y-3">
                              {(() => {
                                const firstIncomplete = BUILD_STAGES.find((s) => !p.completedStageIds.includes(s.id));
                                return BUILD_STAGES.map((stage) => {
                                const done = p.completedStageIds.includes(stage.id);
                                const next = !done && stage.id === firstIncomplete?.id;
                                return (
                                  <li key={stage.id} className="flex gap-3 items-start">
                                    <span className="mt-0.5 shrink-0">
                                      {done ? (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                          <Check className="w-4 h-4" />
                                        </span>
                                      ) : next ? (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary text-primary">
                                          <Circle className="w-3 h-3 fill-current" />
                                        </span>
                                      ) : (
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground">
                                          <Circle className="w-3 h-3" />
                                        </span>
                                      )}
                                    </span>
                                    <div>
                                      <p className={`font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                                        {done ? stage.doneLabel : stage.label}
                                      </p>
                                      {next && (
                                        <p className="text-xs text-primary mt-0.5">In progress or next up</p>
                                      )}
                                    </div>
                                  </li>
                                );
                              });
                              })()}
                            </ol>
                          </div>
                        )}

                        {p.completedStageIds.includes("deployed") && p.liveSiteUrl && (
                          <div className="pt-2">
                            <p className="text-sm font-medium text-foreground mb-2">Live site</p>
                            <a
                              href={p.liveSiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary font-medium hover:underline break-all"
                            >
                              {p.liveSiteUrl}
                              <ExternalLink className="w-4 h-4 shrink-0" />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

function StatusPill({ project }: { project: QuickProject }) {
  if (project.schedule === "paused") {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-foreground">Paused</span>;
  }
  if (project.schedule === "on_hold") {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/15 text-amber-800 dark:text-amber-200">On hold</span>;
  }
  if (project.schedule === "rescheduled") {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-blue-500/15 text-blue-800 dark:text-blue-200">Rescheduled</span>;
  }
  if (project.completedStageIds.includes("deployed")) {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/15 text-green-800 dark:text-green-200">Deployed</span>;
  }
  if (project.buildStartedAt) {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-primary/15 text-primary">Building</span>;
  }
  if (project.slaState === "approved") {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">SLA approved</span>;
  }
  if (project.slaState === "requested") {
    return <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/15 text-amber-800 dark:text-amber-200">SLA pending</span>;
  }
  return <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">Received</span>;
}

function ScheduleBanner({ project }: { project: QuickProject }) {
  if (project.schedule === "active") return null;
  return (
    <div
      className={`p-4 rounded-xl border text-sm ${
        project.schedule === "on_hold"
          ? "border-amber-500/40 bg-amber-500/5"
          : project.schedule === "rescheduled"
            ? "border-blue-500/40 bg-blue-500/5"
            : "border-border bg-muted/40"
      }`}
    >
      <p className="font-medium text-foreground">
        {project.schedule === "paused" && "This project is paused."}
        {project.schedule === "on_hold" && "This project is on hold."}
        {project.schedule === "rescheduled" && "This project has been rescheduled."}
      </p>
      {project.scheduleNote && <p className="text-muted-foreground mt-1">{project.scheduleNote}</p>}
      {project.rescheduleTargetDate && project.schedule === "rescheduled" && (
        <p className="text-muted-foreground mt-1">Target date: {project.rescheduleTargetDate}</p>
      )}
    </div>
  );
}

export default TrackQuickBuild;
