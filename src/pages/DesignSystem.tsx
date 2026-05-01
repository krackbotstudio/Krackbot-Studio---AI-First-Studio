import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Download,
  Palette,
  Type,
  Boxes,
  Sparkles,
  Shapes,
  LucideIcon,
  WandSparkles,
  CircleDot,
  Square,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";

type ColorToken = {
  id: string;
  label: string;
  variable: string;
  hsl: string;
  hex: string;
};

type GradientToken = {
  id: string;
  name: string;
  css: string;
};

type TypographyToken = {
  id: string;
  styleName: string;
  fontFamily: string;
  weight: string;
  size: string;
  lineHeight: string;
  letterSpacing: string;
  usage: string;
};

const colorTokens: ColorToken[] = [
  { id: "primary", label: "Primary Violet", variable: "--primary", hsl: "hsl(262 70% 58%)", hex: "#7B4AE2" },
  { id: "accent", label: "Accent Pink", variable: "--accent", hsl: "hsl(330 75% 60%)", hex: "#E64D94" },
  { id: "coral", label: "Coral", variable: "--coral", hsl: "hsl(15 85% 65%)", hex: "#F26D5A" },
  { id: "sky", label: "Sky", variable: "--sky", hsl: "hsl(200 80% 60%)", hex: "#47B3EB" },
  { id: "success", label: "Success Green", variable: "--success", hsl: "hsl(152 60% 42%)", hex: "#2BAA6F" },
  { id: "warning", label: "Warning", variable: "--warning", hsl: "hsl(38 92% 50%)", hex: "#F5A206" },
  { id: "foreground", label: "Foreground", variable: "--foreground", hsl: "hsl(240 20% 8%)", hex: "#101018" },
  { id: "background", label: "Background", variable: "--background", hsl: "hsl(240 10% 96%)", hex: "#F3F3F7" },
  { id: "muted", label: "Muted", variable: "--muted", hsl: "hsl(240 8% 94%)", hex: "#EFEEF2" },
];

const gradientTokens: GradientToken[] = [
  {
    id: "brand-spectrum",
    name: "Brand Spectrum",
    css: "linear-gradient(135deg, hsl(262 70% 58%), hsl(330 75% 60%), hsl(15 85% 65%))",
  },
  {
    id: "surface-glow",
    name: "Surface Glow",
    css: "linear-gradient(135deg, hsl(262 70% 58% / 0.08), hsl(330 75% 60% / 0.08))",
  },
  {
    id: "depth-border",
    name: "Depth Border",
    css: "linear-gradient(135deg, hsl(262 70% 58% / 0.3), hsl(330 75% 60% / 0.3))",
  },
];

const typographyTokens: TypographyToken[] = [
  {
    id: "display-h1",
    styleName: "Display H1",
    fontFamily: "Space Grotesk",
    weight: "700",
    size: "64px",
    lineHeight: "1.05",
    letterSpacing: "-0.03em",
    usage: "Hero titles and major section headlines",
  },
  {
    id: "heading-h2",
    styleName: "Heading H2",
    fontFamily: "Space Grotesk",
    weight: "700",
    size: "44px",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
    usage: "Section headings and feature blocks",
  },
  {
    id: "body-lg",
    styleName: "Body Large",
    fontFamily: "Inter",
    weight: "500",
    size: "20px",
    lineHeight: "1.6",
    letterSpacing: "0em",
    usage: "Lead paragraphs and intro copy",
  },
  {
    id: "body-md",
    styleName: "Body Medium",
    fontFamily: "Inter",
    weight: "400",
    size: "16px",
    lineHeight: "1.6",
    letterSpacing: "0em",
    usage: "Default paragraph copy",
  },
  {
    id: "label-sm",
    styleName: "Label Small",
    fontFamily: "Inter",
    weight: "600",
    size: "12px",
    lineHeight: "1.3",
    letterSpacing: "0.04em",
    usage: "Tags, metadata, and status chips",
  },
];

const iconTokens: { id: string; name: string; Icon: LucideIcon }[] = [
  { id: "sparkles", name: "Sparkles", Icon: Sparkles },
  { id: "wand", name: "WandSparkles", Icon: WandSparkles },
  { id: "circle-dot", name: "CircleDot", Icon: CircleDot },
  { id: "square", name: "Square", Icon: Square },
];

const componentTokens = ["Button", "Card", "Badge", "Input", "Dialog", "Tabs", "Accordion", "Tooltip"];

const graphicalTokens = [
  { title: "Radius", value: "16px", token: "--radius: 1rem" },
  { title: "Card Border", value: "1px", token: "border-border/40" },
  { title: "Glass Blur", value: "24px", token: "backdrop-blur-2xl" },
  { title: "Hover Lift", value: "translateY(-4px)", token: "hover-lift" },
  { title: "Shadow", value: "xl soft violet glow", token: "shadow-primary/5" },
];

const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
};

const DesignSystem = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const sideNavSections = [
    { id: "overview", label: "Overview" },
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "gradients", label: "Gradients" },
    { id: "icons", label: "Icons" },
    { id: "graphics", label: "Graphical Elements" },
  ];

  const typographyKitContent = useMemo(
    () =>
      [
        "/* The Paradox Design System - Typography Kit */",
        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');",
        "",
        ":root {",
        "  --font-body: 'Inter', system-ui, -apple-system, sans-serif;",
        "  --font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;",
        "}",
        "",
        "/* Recommended text styles */",
        ".type-display-h1 { font-family: var(--font-display); font-size: 64px; line-height: 1.05; font-weight: 700; letter-spacing: -0.03em; }",
        ".type-heading-h2 { font-family: var(--font-display); font-size: 44px; line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }",
        ".type-body-lg { font-family: var(--font-body); font-size: 20px; line-height: 1.6; font-weight: 500; letter-spacing: 0; }",
        ".type-body-md { font-family: var(--font-body); font-size: 16px; line-height: 1.6; font-weight: 400; letter-spacing: 0; }",
        ".type-label-sm { font-family: var(--font-body); font-size: 12px; line-height: 1.3; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }",
      ].join("\n"),
    [],
  );

  const copyValue = async (tokenId: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedToken(tokenId);
    window.setTimeout(() => setCopiedToken(null), 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-[260px,1fr] gap-6">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-4 shadow-lg shadow-foreground/5">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-4">Foundations</p>
                <nav className="space-y-1.5">
                  {sideNavSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg px-3 py-2 transition-colors"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-8">
              <FadeIn>
                <section
                  id="overview"
                  className="rounded-3xl border border-border/50 p-6 sm:p-8 lg:p-10 bg-[radial-gradient(circle_at_top_left,hsl(262_70%_58%_/_0.16),transparent_40%),radial-gradient(circle_at_top_right,hsl(330_75%_60%_/_0.18),transparent_45%),hsl(var(--card))] shadow-xl shadow-primary/5"
                >
                  <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 items-start">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-3">Paradox System</p>
                      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-4 leading-[1.05]">
                        Explore The Paradox Design System
                      </h1>
                      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                        Ship consistent interfaces with production-ready tokens, typography packs, component standards, and graphical rules.
                      </p>
                      <div className="mt-6 flex gap-3 flex-wrap">
                        <Button
                          size="sm"
                          className="rounded-xl gap-2 bg-foreground text-background hover:bg-foreground/90"
                          onClick={() => downloadFile("the-paradox-typography-kit.css", typographyKitContent)}
                        >
                          <Download className="h-4 w-4" /> Download Typography Kit
                        </Button>
                        <a
                          href="#colors"
                          className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-foreground bg-secondary hover:bg-secondary/70 transition-colors"
                        >
                          View Tokens
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3 py-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Search design tokens</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-border/50 bg-card p-3">
                          <p className="text-xs text-muted-foreground mb-1">Token Library</p>
                          <p className="text-sm font-medium text-foreground">128 Tokens</p>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-card p-3">
                          <p className="text-xs text-muted-foreground mb-1">Components</p>
                          <p className="text-sm font-medium text-foreground">42 Variants</p>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-card p-3">
                          <p className="text-xs text-muted-foreground mb-1">Typography</p>
                          <p className="text-sm font-medium text-foreground">2 Families</p>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-card p-3">
                          <p className="text-xs text-muted-foreground mb-1">Icon Set</p>
                          <p className="text-sm font-medium text-foreground">Lucide</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </FadeIn>

              <section id="colors">
                <FadeIn>
                  <div className="flex items-center gap-2 mb-5">
                    <Palette className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-3xl text-foreground">Colors</h2>
                  </div>
                </FadeIn>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {colorTokens.map((token, index) => (
                    <FadeIn key={token.id} delay={index * 0.04}>
                      <article className="bento-card">
                        <div className="h-20 w-full rounded-lg border border-border/60 mb-4" style={{ background: token.hex }} />
                        <h3 className="font-display text-base text-foreground mb-1">{token.label}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{token.variable}</p>
                        <div className="space-y-2 text-sm">
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2 flex items-center justify-between gap-2">
                            <span className="font-mono text-xs text-foreground">{token.hex}</span>
                            <button
                              onClick={() => copyValue(`${token.id}-hex`, token.hex)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Copy ${token.label} hex`}
                            >
                              {copiedToken === `${token.id}-hex` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2 flex items-center justify-between gap-2">
                            <span className="font-mono text-xs text-foreground">{token.hsl}</span>
                            <button
                              onClick={() => copyValue(`${token.id}-hsl`, token.hsl)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Copy ${token.label} hsl`}
                            >
                              {copiedToken === `${token.id}-hsl` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </article>
                    </FadeIn>
                  ))}
                </div>
              </section>

              <section id="typography">
                <FadeIn>
                  <div className="flex items-center gap-2 mb-5">
                    <Type className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-3xl text-foreground">Typography</h2>
                  </div>
                </FadeIn>
                <div className="grid xl:grid-cols-2 gap-4">
                  {typographyTokens.map((token, index) => (
                    <FadeIn key={token.id} delay={index * 0.05}>
                      <article className="bento-card">
                        <h3 className="font-display text-xl text-foreground mb-3">{token.styleName}</h3>
                        <p className="text-muted-foreground mb-4">{token.usage}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground mb-1">Font Family</p>
                            <p className="font-medium text-foreground">{token.fontFamily}</p>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground mb-1">Weight</p>
                            <p className="font-medium text-foreground">{token.weight}</p>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground mb-1">Size</p>
                            <p className="font-medium text-foreground">{token.size}</p>
                          </div>
                          <div className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2">
                            <p className="text-xs text-muted-foreground mb-1">Line Height</p>
                            <p className="font-medium text-foreground">{token.lineHeight}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl gap-2"
                          onClick={() =>
                            downloadFile(
                              `the-paradox-${token.id}.css`,
                              [
                                `/* ${token.styleName} */`,
                                `.type-${token.id} {`,
                                `  font-family: '${token.fontFamily}', system-ui, sans-serif;`,
                                `  font-weight: ${token.weight};`,
                                `  font-size: ${token.size};`,
                                `  line-height: ${token.lineHeight};`,
                                `  letter-spacing: ${token.letterSpacing};`,
                                "}",
                              ].join("\n"),
                            )
                          }
                        >
                          <Download className="h-4 w-4" /> Download Style CSS
                        </Button>
                      </article>
                    </FadeIn>
                  ))}
                </div>
                <FadeIn delay={0.2}>
                  <div className="mt-5 flex gap-4 flex-wrap">
                    <a
                      href="https://fonts.google.com/specimen/Space+Grotesk"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:text-primary/80 hover:underline"
                    >
                      Download Space Grotesk
                    </a>
                    <a
                      href="https://fonts.google.com/specimen/Inter"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:text-primary/80 hover:underline"
                    >
                      Download Inter
                    </a>
                  </div>
                </FadeIn>
              </section>

              <section id="components" className="grid xl:grid-cols-2 gap-4">
                <FadeIn>
                  <article className="bento-card h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Boxes className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-2xl text-foreground">Components</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">Reusable blocks built for speed, consistency, and predictable interaction behavior.</p>
                    <div className="flex flex-wrap gap-2">
                      {componentTokens.map((component) => (
                        <span key={component} className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                          {component}
                        </span>
                      ))}
                    </div>
                  </article>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <article id="gradients" className="bento-card h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-2xl text-foreground">Gradients</h2>
                    </div>
                    <div className="space-y-4">
                      {gradientTokens.map((gradient) => (
                        <div key={gradient.id} className="rounded-xl border border-border/50 bg-muted/40 p-3">
                          <div className="h-16 rounded-lg mb-3" style={{ background: gradient.css }} />
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm text-foreground">{gradient.name}</p>
                            <button
                              onClick={() => copyValue(`${gradient.id}-css`, gradient.css)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`Copy ${gradient.name} CSS`}
                            >
                              {copiedToken === `${gradient.id}-css` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </div>
                          <p className="text-xs font-mono text-muted-foreground mt-2 break-all">{gradient.css}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </FadeIn>
              </section>

              <section className="grid xl:grid-cols-2 gap-4">
                <FadeIn>
                  <article id="graphics" className="bento-card h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Shapes className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-2xl text-foreground">Graphical Elements</h2>
                    </div>
                    <div className="space-y-3">
                      {graphicalTokens.map((token) => (
                        <div key={token.title} className="flex items-center justify-between border border-border/50 bg-muted/40 rounded-lg px-3 py-2.5">
                          <div>
                            <p className="text-sm font-medium text-foreground">{token.title}</p>
                            <p className="text-xs text-muted-foreground">{token.token}</p>
                          </div>
                          <p className="text-sm font-semibold text-foreground">{token.value}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <article id="icons" className="bento-card h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-2xl text-foreground">Iconography</h2>
                    </div>
                    <p className="text-muted-foreground mb-5">Icon system uses clean, rounded Lucide line icons. Click to copy token names.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {iconTokens.map(({ id, name, Icon }) => (
                        <button
                          key={id}
                          className="rounded-xl border border-border/50 bg-muted/40 p-4 text-left hover:border-primary/40 transition-colors"
                          onClick={() => copyValue(`${id}-name`, name)}
                        >
                          <Icon className="h-5 w-5 mb-2 text-primary" />
                          <p className="text-sm font-medium text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">Click to copy icon name</p>
                        </button>
                      ))}
                    </div>
                  </article>
                </FadeIn>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DesignSystem;
