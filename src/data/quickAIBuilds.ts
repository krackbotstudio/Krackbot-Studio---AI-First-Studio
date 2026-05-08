export type QuickAIBuildSlug =
  | "ai-landing-page"
  | "ai-automation-setup"
  | "ai-chatbot-setup"
  | "ai-internal-tool";

export type QuickAIBuildService = {
  slug: QuickAIBuildSlug;
  name: string;
  whatWeDeliver: string;
  clientDeliverables: string;
  buildTimeMinutes: number;
};

export const quickAIBuildServices: QuickAIBuildService[] = [
  {
    slug: "ai-landing-page",
    name: "AI Landing Page",
    whatWeDeliver: "High converting landing page design and development",
    clientDeliverables: "1 responsive landing page, copy sections, basic SEO setup, deployment",
    buildTimeMinutes: 300,
  },
  {
    slug: "ai-automation-setup",
    name: "AI Automation Setup",
    whatWeDeliver: "Automate a workflow in your business",
    clientDeliverables: "1 automation workflow, integration setup, documentation",
    buildTimeMinutes: 400,
  },
  {
    slug: "ai-chatbot-setup",
    name: "AI Chatbot Setup",
    whatWeDeliver: "AI chatbot trained on business information",
    clientDeliverables: "chatbot setup, training data integration, embed code for website",
    buildTimeMinutes: 350,
  },
  {
    slug: "ai-internal-tool",
    name: "AI Internal Tool (Intranet System)",
    whatWeDeliver: "Custom tool for internal workflow",
    clientDeliverables: "working internal tool, UI interface, database connection",
    buildTimeMinutes: 500,
  },
];

export function getQuickBuildBySlug(slug: string | undefined): QuickAIBuildService | undefined {
  if (!slug) return undefined;
  return quickAIBuildServices.find((s) => s.slug === slug);
}
