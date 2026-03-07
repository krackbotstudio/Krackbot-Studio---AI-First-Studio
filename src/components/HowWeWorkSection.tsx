import FadeIn from "@/components/FadeIn";

const steps = [
  { num: "01", title: "Audit & Strategy", desc: "Deep-dive into your systems, goals, and opportunities." },
  { num: "02", title: "System Architecture", desc: "Design the technical blueprint for your solution." },
  { num: "03", title: "Build & Integrate", desc: "Develop, test, and deploy with AI-powered workflows." },
  { num: "04", title: "Optimize & Scale", desc: "Monitor, iterate, and expand for sustained growth." },
];

const HowWeWorkSection = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <FadeIn>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-14 text-center">How We Work</h2>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.1}>
            <div className="bento-card h-full relative group">
              <span className="font-display text-6xl font-bold text-primary/8 absolute top-4 right-6">{step.num}</span>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary mb-6 font-display">
                {step.num}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWorkSection;
