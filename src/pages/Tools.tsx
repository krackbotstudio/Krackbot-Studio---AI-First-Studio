import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

type Filter = "All" | "Free" | "Paid";

const tools = [
  { name: "ZigZup", desc: "AI-powered project management tool for modern teams. Plan, track, and ship with AI copilot assistance.", tag: "Paid" as const, featured: true },
  { name: "Automation Templates", desc: "Pre-built workflow templates for common business processes.", tag: "Free" as const },
  { name: "AI Prompt Packs", desc: "Curated prompt libraries for marketing, ops, and dev teams.", tag: "Free" as const },
  { name: "AI Workflow Builders", desc: "Visual builders for custom automation pipelines.", tag: "Paid" as const },
  { name: "Mini Business Utilities", desc: "Small tools to solve everyday business problems fast.", tag: "Free" as const },
  { name: "Internal Team Dashboards", desc: "Real-time dashboards for team performance and ops.", tag: "Paid" as const },
  { name: "Audit Checklists", desc: "Comprehensive checklists for system and process audits.", tag: "Free" as const },
  { name: "Custom AI Toolkits", desc: "Bespoke AI tools tailored to your business needs.", tag: "Paid" as const },
];

const filters: Filter[] = ["All", "Free", "Paid"];

const Tools = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const filtered = filter === "All" ? tools : tools.filter((t) => t.tag === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-36 pb-20">
        <div className="section-container">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">Tools & Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Free and premium tools to accelerate your business with AI.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    filter === f
                      ? "bg-foreground text-background"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.05}>
                <div className={`bento-card h-full flex flex-col ${t.featured ? "gradient-border relative overflow-hidden" : ""}`}
                     style={t.featured ? { background: 'linear-gradient(135deg, hsl(262 70% 58% / 0.05), hsl(330 75% 60% / 0.06))' } : {}}>
                  {t.featured && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 w-fit">
                      <Star className="w-3 h-3" /> Featured
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display font-bold text-foreground text-lg">{t.name}</h3>
                    <span className={t.tag === "Free" ? "tag-free" : "tag-paid"}>{t.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{t.desc}</p>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs w-fit">
                    {t.tag === "Free" ? "Use Tool" : "Learn More"}
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Tools;
