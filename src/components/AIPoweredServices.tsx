import { Link } from "react-router-dom";
import { Zap, Paintbrush, Code2, Building2, Bot, FlaskConical, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { quickAIBuildServices } from "@/data/quickAIBuilds";

type TableService = {
  name: string;
  whatWeDeliver: string;
  clientDeliverables: string;
  buildTime: string;
  slug?: string;
};

type ServiceCategory = {
  icon: typeof Zap;
  title: string;
  color: string;
  hasBookCta?: boolean;
  services: TableService[];
};

const categories: ServiceCategory[] = [
  {
    icon: Zap,
    title: "Quick AI Builds",
    color: "hsl(210 100% 60%)",
    hasBookCta: true,
    services: quickAIBuildServices.map((s) => ({
      name: s.name,
      whatWeDeliver: s.whatWeDeliver,
      clientDeliverables: s.clientDeliverables,
      buildTime: String(s.buildTimeMinutes),
      slug: s.slug,
    })),
  },
  {
    icon: Paintbrush,
    title: "AI Design Studio",
    color: "hsl(330 75% 60%)",
    services: [
      { name: "AI UI/UX Product Design", whatWeDeliver: "Product design with user flows", clientDeliverables: "UI screens, UX flows, Figma design files, design documentation", buildTime: "900" },
      { name: "AI Design System Setup", whatWeDeliver: "Scalable design system for products", clientDeliverables: "color system, typography, UI components, design guidelines", buildTime: "800" },
      { name: "AI Landing Page Design", whatWeDeliver: "Conversion focused landing page design", clientDeliverables: "landing page layout, UI sections, responsive design", buildTime: "300" },
      { name: "AI Brand Kit Creation", whatWeDeliver: "Brand identity creation", clientDeliverables: "logo, color palette, typography, brand guideline document", buildTime: "350" },
      { name: "AI Rapid Prototyping", whatWeDeliver: "Idea to prototype", clientDeliverables: "clickable prototype, wireframes, concept screens", buildTime: "400" }
    ]
  },
  {
    icon: Code2,
    title: "AI Development Studio",
    color: "hsl(15 85% 65%)",
    services: [
      { name: "AI MVP Development", whatWeDeliver: "Functional MVP for startups", clientDeliverables: "working web product, core features, deployment", buildTime: "1500" },
      { name: "AI Web App Development", whatWeDeliver: "Full web application", clientDeliverables: "web app, database setup, deployment", buildTime: "2200" },
      { name: "AI SaaS Product Development", whatWeDeliver: "Scalable SaaS platform", clientDeliverables: "SaaS architecture, user dashboard, admin panel", buildTime: "3200" },
      { name: "AI Tool Development", whatWeDeliver: "Custom digital tool", clientDeliverables: "functional tool, UI interface, integrations", buildTime: "900" },
      { name: "AI API Integration", whatWeDeliver: "Integrate AI APIs", clientDeliverables: "API setup, integration features, documentation", buildTime: "500" }
    ]
  },
  {
    icon: Building2,
    title: "AI Systems for Businesses",
    color: "hsl(262 70% 58%)",
    services: [
      { name: "AI Business Automation", whatWeDeliver: "Automate business operations", clientDeliverables: "automation pipelines, integrations, workflow documentation", buildTime: "700" },
      { name: "AI CRM Automation", whatWeDeliver: "AI powered CRM workflows", clientDeliverables: "CRM setup, pipeline automation, reporting dashboards", buildTime: "900" },
      { name: "AI Customer Support System", whatWeDeliver: "AI support chatbot", clientDeliverables: "chatbot system, knowledge base integration", buildTime: "800" },
      { name: "AI Reporting Dashboard", whatWeDeliver: "Business analytics dashboards", clientDeliverables: "dashboards, reporting panels, data visualizations", buildTime: "600" },
      { name: "AI Knowledge Base System", whatWeDeliver: "AI trained knowledge system", clientDeliverables: "AI knowledge base, searchable documentation", buildTime: "500" }
    ]
  },
  {
    icon: Bot,
    title: "AI Agents Studio",
    color: "hsl(200 80% 60%)",
    services: [
      { name: "AI Task Agents", whatWeDeliver: "Agents that perform tasks", clientDeliverables: "configured AI agent, task workflows, usage guide", buildTime: "700" },
      { name: "AI Research Agents", whatWeDeliver: "Automated research assistant", clientDeliverables: "research agent setup, workflow configuration", buildTime: "450" },
      { name: "AI Knowledge Agents", whatWeDeliver: "Agents trained on company knowledge", clientDeliverables: "trained AI agent system, documentation integration", buildTime: "500" },
      { name: "Multi-Agent Systems", whatWeDeliver: "Multiple agents working together", clientDeliverables: "agent orchestration system, automation pipelines", buildTime: "1600" },
      { name: "AI Agent Training", whatWeDeliver: "Training agents for workflows", clientDeliverables: "trained agents, training datasets, usage documentation", buildTime: "600" }
    ]
  },
  {
    icon: FlaskConical,
    title: "AI Labs Setup",
    color: "hsl(280 60% 60%)",
    services: [
      { name: "AI Design Lab Setup", whatWeDeliver: "AI workflows for design teams", clientDeliverables: "AI design workflow setup, tools integration, team guide", buildTime: "1200" },
      { name: "AI Development Lab Setup", whatWeDeliver: "AI coding workflow setup", clientDeliverables: "dev environment, AI tools integration, documentation", buildTime: "1400" },
      { name: "AI Automation Lab Setup", whatWeDeliver: "Automation infrastructure", clientDeliverables: "automation tools setup, workflow templates", buildTime: "1000" },
      { name: "AI Innovation Lab Setup", whatWeDeliver: "AI experimentation environment", clientDeliverables: "experimentation workflows, tools setup, documentation", buildTime: "1500" }
    ]
  }
];

const AIPoweredServices = () => {
  return (
    <section className="py-24 bg-muted/20 border-t border-border/50">
      <div className="section-container">
        
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              AI Powered Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Impactful Digital Solutions. Built Faster.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-20">
          {categories.map((category) => (
            <FadeIn key={category.title} delay={0.1}>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" 
                    style={{ background: `${category.color}15` }}
                  >
                    <category.icon className="w-7 h-7" style={{ color: category.color }} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
                  <div
                    className={
                      category.hasBookCta
                        ? "hidden lg:grid grid-cols-[1.4fr_2fr_2fr_minmax(120px,1fr)_140px] gap-6 p-5 bg-muted/40 border-b border-border/60 text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                        : "hidden lg:grid grid-cols-[1.5fr_2fr_2fr_140px] gap-6 p-5 bg-muted/40 border-b border-border/60 text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                    }
                  >
                    <div>Service</div>
                    <div>What We Deliver</div>
                    <div>Client Deliverables</div>
                    {category.hasBookCta && <div className="text-center lg:text-center">Get started</div>}
                    <div className="text-right">Build Time</div>
                  </div>

                  <div className="divide-y divide-border/60">
                    {category.services.map((service, idx) => (
                      <div 
                        key={idx} 
                        className={
                          category.hasBookCta
                            ? "grid grid-cols-1 lg:grid-cols-[1.4fr_2fr_2fr_minmax(120px,1fr)_140px] gap-4 lg:gap-6 p-5 lg:p-6 items-start lg:items-center hover:bg-muted/20 transition-colors"
                            : "grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_2fr_140px] gap-4 lg:gap-6 p-5 lg:p-6 items-start lg:items-center hover:bg-muted/20 transition-colors"
                        }
                      >
                        <div>
                          <span className="lg:hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Service</span>
                          {service.slug ? (
                            <Link
                              to={`/book/quick-ai/${service.slug}`}
                              className="font-semibold text-foreground text-base hover:text-primary hover:underline underline-offset-2 inline-block text-left"
                            >
                              {service.name}
                            </Link>
                          ) : (
                            <span className="font-semibold text-foreground text-base">{service.name}</span>
                          )}
                        </div>
                        
                        <div>
                          <span className="lg:hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">What We Deliver</span>
                          <span className="text-sm text-foreground/80 leading-relaxed block">{service.whatWeDeliver}</span>
                        </div>
                        
                        <div>
                          <span className="lg:hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Client Deliverables</span>
                          <span className="text-sm text-muted-foreground leading-relaxed block">{service.clientDeliverables}</span>
                        </div>

                        {category.hasBookCta && service.slug && (
                          <div className="pt-2 lg:pt-0 flex lg:justify-center">
                            <span className="lg:hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block w-full">
                              Get started
                            </span>
                            <Button asChild size="sm" className="rounded-xl font-semibold shrink-0">
                              <Link to={`/book/quick-ai/${service.slug}`}>Let&apos;s build</Link>
                            </Button>
                          </div>
                        )}
                        
                        <div className="lg:text-right pt-2 lg:pt-0">
                          <span className="lg:hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">Build Time</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium whitespace-nowrap">
                            <Zap className="w-4 h-4 fill-current" /> {service.buildTime} mins
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-foreground text-background text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-r from-background to-transparent blur-3xl transform -rotate-12" />
              <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-l from-background to-transparent blur-3xl transform -rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Need something custom?
              </h3>
              <p className="text-lg text-background/80 max-w-2xl mb-8">
                We also build custom AI products, automation systems, and digital tools tailored to your business.
              </p>
              <Button size="lg" className="rounded-xl px-8 h-14 text-base font-semibold gap-2 bg-background text-foreground hover:bg-background/90 shadow-lg">
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default AIPoweredServices;
