import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    Icon: Instagram,
  },
  {
    label: "X",
    href: "https://x.com/",
    Icon: Twitter,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/",
    Icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    Icon: Youtube,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    Icon: Linkedin,
  },
];

const FloatingSocialLinks = () => {
  return (
    <div className="fixed right-6 bottom-24 z-[60] flex flex-col gap-2">
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${label}`}
          title={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/95 text-foreground shadow-lg shadow-foreground/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocialLinks;
