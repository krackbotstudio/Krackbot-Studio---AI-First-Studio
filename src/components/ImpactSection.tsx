import FadeIn from "@/components/FadeIn";
import { Rocket, DollarSign, TrendingUp } from "lucide-react";

const impacts = [
  { icon: Rocket, value: "10x", title: "Faster Builds", desc: "AI-assisted development accelerates execution cycles.", color: "hsl(262 70% 58%)" },
  { icon: DollarSign, value: "70%", title: "Lower Costs", desc: "Lean, automation-driven architecture reduces overhead.", color: "hsl(330 75% 60%)" },
  { icon: TrendingUp, value: "∞", title: "Smarter Ops", desc: "Intelligent systems reduce friction and scale performance.", color: "hsl(15 85% 65%)" },
];

const ImpactSection = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <FadeIn>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-14 text-center">Our Impact</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-4">
        {impacts.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1}>
            <div className="bento-card text-center h-full flex flex-col items-center justify-center py-12">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${item.color}12` }}>
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <span className="font-display text-4xl lg:text-5xl font-bold gradient-text mb-2">{item.value}</span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
