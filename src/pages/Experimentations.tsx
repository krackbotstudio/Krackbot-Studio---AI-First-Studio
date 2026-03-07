import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

const experiments = [
  {
    title: "Multi-Agent Orchestration",
    concept: "Coordinated AI agents that collaborate on complex business tasks.",
    objective: "Test multi-agent communication and task delegation patterns.",
    status: "Prototype" as const,
    stack: ["LangChain", "GPT-4", "Redis", "Python"],
  },
  {
    title: "Voice-to-Workflow Engine",
    concept: "Convert voice instructions into automated business workflows.",
    objective: "Reduce setup time for automation by 90% through natural language.",
    status: "Testing" as const,
    stack: ["Whisper", "N8N", "FastAPI", "React"],
  },
  {
    title: "AI Code Review Agent",
    concept: "Automated code review assistant that catches bugs and suggests improvements.",
    objective: "Improve code quality while reducing review bottlenecks.",
    status: "Live" as const,
    stack: ["GPT-4", "GitHub API", "TypeScript"],
  },
  {
    title: "Predictive Lead Scoring",
    concept: "ML model that predicts lead conversion probability from CRM data.",
    objective: "Help sales teams focus on high-value prospects.",
    status: "Prototype" as const,
    stack: ["scikit-learn", "Supabase", "React"],
  },
  {
    title: "Document Intelligence Pipeline",
    concept: "Extract structured data from unstructured business documents.",
    objective: "Automate data entry and document processing workflows.",
    status: "Testing" as const,
    stack: ["GPT-4 Vision", "Tesseract", "PostgreSQL"],
  },
  {
    title: "Real-Time Sentiment Dashboard",
    concept: "Live sentiment analysis of customer interactions across channels.",
    objective: "Enable proactive customer experience management.",
    status: "Live" as const,
    stack: ["Transformers", "WebSocket", "D3.js"],
  },
];

const statusStyles = {
  Prototype: "bg-warning/10 text-warning",
  Testing: "bg-primary/10 text-primary",
  Live: "bg-success/10 text-success",
};

const Experimentations = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-36 pb-20">
      <div className="section-container">
        <FadeIn>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">Krackbot Labs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16">
            Our innovation lab — where we test new AI models, automation patterns, and product concepts before they go live.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          {experiments.map((exp, i) => (
            <FadeIn key={exp.title} delay={i * 0.05}>
              <div className="bento-card h-full">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{exp.title}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[exp.status]}`}>
                    {exp.status}
                  </span>
                </div>
                <div className="space-y-3 mb-5">
                  <div className="bg-muted/40 rounded-xl p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">Concept</span>
                    <p className="text-sm text-muted-foreground">{exp.concept}</p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-1">Objective</span>
                    <p className="text-sm text-muted-foreground">{exp.objective}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-muted/60 text-xs font-medium text-muted-foreground">
                      {tech}
                    </span>
                  ))}
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

export default Experimentations;
