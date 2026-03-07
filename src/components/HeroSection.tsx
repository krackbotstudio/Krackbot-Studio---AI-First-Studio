import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { ArrowUpRight, Sparkles, Zap, Bot } from "lucide-react";

const stats = [
  { value: "10x", label: "Faster Delivery" },
  { value: "70%", label: "Cost Reduction" },
  { value: "24/7", label: "AI Operations" },
];

const HeroSection = () => {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (waveRef.current) {
        // Subtle parallax: waves shift down slightly as you scroll
        waveRef.current.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section pt-36 pb-16 lg:pb-24 overflow-hidden relative">

      {/* ── Animated wavy background ──────────────────────────────── */}
      <div
        ref={waveRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Bottom waves */}
        <svg
          viewBox="0 0 2880 500"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="absolute bottom-0 w-[200%] h-[55%]"
        >
          <path
            className="hero-wave-1"
            d="M0,300 C240,240 480,360 720,300 C960,240 1200,360 1440,300 C1680,240 1920,360 2160,300 C2400,240 2640,360 2880,300 L2880,500 L0,500 Z"
            fill="hsl(262 70% 58% / 0.06)"
          />
          <path
            className="hero-wave-2"
            d="M0,330 C360,270 540,390 720,330 C900,270 1080,390 1440,330 C1620,270 1800,390 2160,330 C2340,270 2520,390 2880,330 L2880,500 L0,500 Z"
            fill="hsl(330 75% 60% / 0.05)"
          />
          <path
            className="hero-wave-3"
            d="M0,360 C180,310 360,410 720,360 C900,310 1080,410 1440,360 C1620,310 1800,410 2160,360 C2340,310 2520,410 2880,360 L2880,500 L0,500 Z"
            fill="hsl(15 85% 65% / 0.04)"
          />
        </svg>

        {/* Top waves (flipped) */}
        <svg
          viewBox="0 0 2880 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="absolute top-0 w-[200%] h-[35%]"
          style={{ transform: "scaleY(-1)" }}
        >
          <path
            className="hero-wave-2"
            d="M0,100 C240,50 480,150 720,100 C960,50 1200,150 1440,100 C1680,50 1920,150 2160,100 C2400,50 2640,150 2880,100 L2880,300 L0,300 Z"
            fill="hsl(262 70% 58% / 0.04)"
          />
          <path
            className="hero-wave-3"
            d="M0,130 C360,80 540,180 720,130 C900,80 1080,180 1440,130 C1620,80 1800,180 2160,130 C2340,80 2520,180 2880,130 L2880,300 L0,300 Z"
            fill="hsl(330 75% 60% / 0.03)"
          />
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="section-container relative z-10">

        {/* Badge + Krackbot Studio headline */}
        <FadeIn>
          {/* Small "AI-First Engineering Studio" pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/50 text-xs font-medium text-muted-foreground mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            AI-First Engineering Studio
          </div>

          {/* Krackbot Studio — large, shimmer gradient, glowing */}
          <div className="krackbot-studio-wrap mb-3">
            <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none krackbot-studio-text">
              Krackbot Studio
            </p>
          </div>
        </FadeIn>

        {/* Main headline */}
        <FadeIn delay={0.1}>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-foreground mb-6 max-w-4xl">
            Build Smarter Systems{" "}
            <span className="gradient-text">with AI</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mb-12">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
              We engineer intelligent automation, AI agents, and scalable digital products that help businesses operate faster and smarter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-xl px-7 font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90 text-base">
                Book Strategy Call <ArrowUpRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-7 font-semibold text-base border-border/60" asChild>
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Bento grid */}
        <FadeIn delay={0.25}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {/* Large card */}
            <div className="col-span-2 row-span-2 bento-card relative overflow-hidden min-h-[320px] flex flex-col justify-between"
                 style={{ background: 'linear-gradient(135deg, hsl(262 70% 58% / 0.06), hsl(330 75% 60% / 0.08))' }}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">AI Agents</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  Custom GPT agents, knowledge bots, and AI copilots built for your team.
                </p>
              </div>
              <div className="flex gap-2 mt-6">
                {["GPT-4", "LangChain", "RAG"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-card/60 text-xs font-medium text-muted-foreground border border-border/30">{t}</span>
                ))}
              </div>
              {/* Decorative orb */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full opacity-20"
                   style={{ background: 'radial-gradient(circle, hsl(262 70% 58%), transparent)' }} />
            </div>

            {/* Stat cards */}
            {stats.map((s) => (
              <div key={s.label} className="bento-card flex flex-col justify-center items-center text-center">
                <span className="font-display text-3xl lg:text-4xl font-bold gradient-text mb-1">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
            ))}

            {/* Automation card */}
            <div className="bento-card flex flex-col justify-between"
                 style={{ background: 'linear-gradient(135deg, hsl(15 85% 65% / 0.06), hsl(330 75% 60% / 0.06))' }}>
              <Zap className="w-6 h-6 text-accent mb-3" />
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Automation</h4>
                <p className="text-xs text-muted-foreground">N8N workflows & CRM pipelines</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
