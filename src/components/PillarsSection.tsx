import FadeIn from "@/components/FadeIn";
import { Workflow, Bot, Globe, Smartphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Workflow,
    title: "Automation Systems",
    desc: "End-to-end workflow automation with N8N, CRM integrations, and intelligent pipelines.",
    items: ["N8N workflows", "CRM automation", "Lead pipelines", "WhatsApp & email"],
    color: "hsl(262 70% 58%)",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Custom GPT agents, knowledge bots, and AI copilots tailored to your business data.",
    items: ["Custom GPT agents", "Knowledge bots", "AI copilots", "RAG systems"],
    color: "hsl(330 75% 60%)",
  },
  {
    icon: Globe,
    title: "Web Applications",
    desc: "SaaS platforms, admin dashboards, and custom portals built with modern stacks.",
    items: ["SaaS platforms", "Admin dashboards", "Marketplaces", "Custom portals"],
    color: "hsl(15 85% 65%)",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform mobile apps with Flutter and React Native, from MVP to launch.",
    items: ["Flutter / React Native", "AI-powered apps", "MVP to scale", "App Store deploy"],
    color: "hsl(200 80% 60%)",
  },
];

const PillarsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">What We Do ↘</h2>
            <p className="text-muted-foreground max-w-lg">Four pillars of intelligent engineering powering modern businesses.</p>
          </div>
          <Link to="/services" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
            All Services <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-4">
        {pillars.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="bento-card h-full group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${p.color}15` }}>
                  <p.icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.items.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-lg bg-muted/60 text-xs font-medium text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default PillarsSection;
