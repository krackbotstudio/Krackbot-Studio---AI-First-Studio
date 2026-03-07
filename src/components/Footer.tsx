import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/40">
    <div className="section-container py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <img src="/logos/krackbot-logo-black.png" alt="Krackbot Logo" className="h-12 w-auto dark:hidden" />
            <img src="/logos/krackbot-logo-white.png" alt="Krackbot Logo" className="h-12 w-auto hidden dark:block" />
            <span className="font-display text-lg font-bold text-foreground">Krackbot</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-first engineering studio building intelligent systems for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Products</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tools</Link>
            <Link to="/experimentations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Labs</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
          <div className="flex flex-col gap-2.5">
            <span className="text-sm text-muted-foreground">hello@krackbot.com</span>
            <span className="text-sm text-muted-foreground">Twitter / X</span>
            <span className="text-sm text-muted-foreground">LinkedIn</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border/40 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Krackbot. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
