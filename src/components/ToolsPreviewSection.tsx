import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const freeTools = [
  { name: "Automation Templates", desc: "Pre-built workflow templates for common business processes." },
  { name: "AI Prompt Packs", desc: "Curated prompt libraries for marketing, ops, and dev." },
];

const paidTools = [
  { name: "ZigZup", desc: "AI-powered project management tool for modern teams.", featured: true },
  { name: "AI Workflow Builders", desc: "Visual builders for custom automation pipelines." },
];

const ToolsPreviewSection = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">Products & Tools</h2>
            <p className="text-muted-foreground max-w-lg">Free and premium tools to accelerate your business with AI.</p>
          </div>
          <Link to="/tools" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* ZigZup featured */}
        <FadeIn>
          <div className="bento-card lg:row-span-2 h-full relative overflow-hidden gradient-border"
               style={{ background: 'linear-gradient(135deg, hsl(262 70% 58% / 0.05), hsl(330 75% 60% / 0.08))' }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Star className="w-3 h-3" /> Featured
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">ZigZup</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">AI-powered project management tool for modern teams. Plan, track, and ship with AI copilot assistance.</p>
            <span className="tag-paid">Paid</span>
            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-15"
                 style={{ background: 'radial-gradient(circle, hsl(330 75% 60%), transparent)' }} />
          </div>
        </FadeIn>

        {/* Free tools */}
        {freeTools.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.08}>
            <div className="bento-card h-full">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h4 className="font-display font-bold text-foreground">{t.name}</h4>
                <span className="tag-free">Free</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <Button variant="outline" size="sm" className="rounded-xl text-xs">Use Tool</Button>
            </div>
          </FadeIn>
        ))}

        {/* Paid tool */}
        <FadeIn delay={0.15}>
          <div className="bento-card h-full">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="font-display font-bold text-foreground">{paidTools[1].name}</h4>
              <span className="tag-paid">Paid</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{paidTools[1].desc}</p>
            <Button variant="outline" size="sm" className="rounded-xl text-xs">Learn More</Button>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default ToolsPreviewSection;
