import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Workflow, Bot, Globe, Smartphone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Workflow,
    title: "Automation Systems",
    problem: "Manual processes slow down teams, increase errors, and limit scalability.",
    solution: "End-to-end automation using N8N, CRM integrations, and custom pipelines that run operations on autopilot.",
    outcome: "70% reduction in manual tasks, faster lead response, seamless cross-platform workflows.",
    color: "hsl(262 70% 58%)",
  },
  {
    icon: Bot,
    title: "AI Agents",
    problem: "Teams spend hours on repetitive knowledge work that could be handled by intelligent systems.",
    solution: "Custom GPT agents, knowledge bots, and AI copilots built on retrieval-augmented architectures.",
    outcome: "Instant answers, 24/7 availability, smarter teams powered by AI assistants.",
    color: "hsl(330 75% 60%)",
  },
  {
    icon: Globe,
    title: "Web App Development",
    problem: "Off-the-shelf tools don't fit your unique business logic, and custom dev is slow and expensive.",
    solution: "SaaS platforms, admin dashboards, marketplaces, and portals with modern stacks and AI-accelerated dev.",
    outcome: "Production-ready apps in weeks, not months — with clean architecture built to scale.",
    color: "hsl(15 85% 65%)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    problem: "Mobile presence is critical, but building quality apps across platforms drains resources.",
    solution: "Cross-platform mobile apps with Flutter and React Native, from MVP to full-scale deployment.",
    outcome: "Beautiful, performant mobile apps that reach users on every device.",
    color: "hsl(200 80% 60%)",
  },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-36 pb-20">
      <div className="section-container">
        <FadeIn>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            End-to-end engineering services powered by AI — from strategy to deployment.
          </p>
        </FadeIn>

        <div className="space-y-4">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="bento-card">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${s.color}12` }}>
                    <s.icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground pt-2">{s.title}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { label: "Problem", text: s.problem },
                    { label: "Solution", text: s.solution },
                    { label: "Outcome", text: s.outcome },
                  ].map((col) => (
                    <div key={col.label} className="bg-muted/40 rounded-2xl p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">{col.label}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{col.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-16">
            <Button size="lg" className="rounded-xl px-8 font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90">
              Book Strategy Call <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
    <Footer />
  </div>
);

export default Services;
