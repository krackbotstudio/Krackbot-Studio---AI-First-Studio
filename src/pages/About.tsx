import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Bot, Cpu, Target, Lightbulb } from "lucide-react";

const values = [
  { icon: Bot, title: "AI-Native", desc: "AI isn't an add-on — it's at the core of how we think, design, and build.", color: "hsl(262 70% 58%)" },
  { icon: Cpu, title: "Systems-Driven", desc: "We engineer interconnected systems, not isolated features.", color: "hsl(330 75% 60%)" },
  { icon: Target, title: "Outcome-Focused", desc: "Every decision is measured by the business impact it delivers.", color: "hsl(15 85% 65%)" },
  { icon: Lightbulb, title: "Product-Minded", desc: "We think like product builders — balancing speed, quality, and UX.", color: "hsl(200 80% 60%)" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-36 pb-20">
      <div className="section-container">
        <FadeIn>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">About Krackbot</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            We're an AI-first engineering studio building intelligent systems that help modern businesses operate faster, smarter, and at lower cost.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mb-16">
            From automation infrastructure to custom AI agents, from SaaS platforms to mobile apps — we use AI at the core of everything we build.
          </p>
        </FadeIn>

        <FadeIn>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">Our DNA</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <div className="bento-card flex gap-5 h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${v.color}12` }}>
                  <v.icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default About;
