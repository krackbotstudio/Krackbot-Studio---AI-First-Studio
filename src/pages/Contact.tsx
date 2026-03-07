import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Calendar, ArrowUpRight } from "lucide-react";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-36 pb-20">
      <div className="section-container max-w-3xl">
        <FadeIn>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Ready to build smarter systems? Let's talk about your project.
          </p>
        </FadeIn>

        <div className="grid gap-4">
          <FadeIn delay={0.1}>
            <div className="bento-card flex items-center gap-5 group cursor-pointer"
                 style={{ background: 'linear-gradient(135deg, hsl(262 70% 58% / 0.04), hsl(330 75% 60% / 0.04))' }}>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground mb-1">Book a Strategy Call</h3>
                <p className="text-sm text-muted-foreground">30-minute deep-dive into your goals and how AI can accelerate them.</p>
              </div>
              <Button className="rounded-xl shrink-0 gap-1.5 bg-foreground text-background hover:bg-foreground/90">
                Schedule <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bento-card flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground mb-1">Email Us</h3>
                <p className="text-sm text-muted-foreground">hello@krackbot.com — we respond within 24 hours.</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bento-card flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-coral" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground mb-1">Quick Chat</h3>
                <p className="text-sm text-muted-foreground">Reach out on Twitter/X or LinkedIn for a quick conversation.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;
