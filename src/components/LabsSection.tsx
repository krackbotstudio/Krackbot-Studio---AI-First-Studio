import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FlaskConical, Cpu, Boxes, ArrowUpRight } from "lucide-react";

const experiments = [
  { icon: FlaskConical, title: "AI Research", desc: "Exploring frontier AI models and novel architectures.", color: "hsl(262 70% 58%)" },
  { icon: Cpu, title: "System Experiments", desc: "Testing new automation patterns and infra designs.", color: "hsl(330 75% 60%)" },
  { icon: Boxes, title: "Prototype Apps", desc: "Building rapid prototypes to validate AI product concepts.", color: "hsl(15 85% 65%)" },
];

const LabsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">Krackbot Labs</h2>
            <p className="text-muted-foreground max-w-lg">We continuously experiment with emerging AI to stay ahead of the curve.</p>
          </div>
          <Link to="/experimentations" className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
            Explore Labs <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-4">
        {experiments.map((exp, i) => (
          <FadeIn key={exp.title} delay={i * 0.1}>
            <div className="bento-card h-full group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${exp.color}12` }}>
                  <exp.icon className="w-6 h-6" style={{ color: exp.color }} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{exp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default LabsSection;
