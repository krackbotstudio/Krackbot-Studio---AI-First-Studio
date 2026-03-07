import { Button } from "@/components/ui/button";
import FadeIn from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";

const FinalCTA = () => (
  <section className="py-24 lg:py-32">
    <div className="section-container">
      <FadeIn>
        <div className="bento-card p-12 md:p-20 text-center relative overflow-hidden"
             style={{ background: 'linear-gradient(135deg, hsl(262 70% 58% / 0.05), hsl(330 75% 60% / 0.06), hsl(15 85% 65% / 0.04))' }}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to Build<br />
            <span className="gradient-text">Smarter Systems?</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Let's architect the intelligent systems your business needs to scale.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="rounded-xl px-8 font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90">
              Schedule Strategy Call <ArrowUpRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 font-semibold border-border/60">
              Start Your AI Transformation
            </Button>
          </div>
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-10"
               style={{ background: 'radial-gradient(circle, hsl(262 70% 58%), transparent)' }} />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-10"
               style={{ background: 'radial-gradient(circle, hsl(330 75% 60%), transparent)' }} />
        </div>
      </FadeIn>
    </div>
  </section>
);

export default FinalCTA;
