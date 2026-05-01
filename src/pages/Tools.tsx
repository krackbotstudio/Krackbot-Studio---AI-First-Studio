import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Status = "Core Product" | "Live" | "Beta" | "In Development" | "Experimental";

interface ProductOrTool {
  name: string;
  desc: string;
  status: Status;
  href?: string;
}

const products: ProductOrTool[] = [
  {
    name: "Diolab",
    desc: "An AI-powered experimentation and product testing platform that helps teams design, test, and validate digital products and ideas faster.",
    status: "Live",
    href: "https://www.diolab.in",
  },
  {
    name: "XGoo",
    desc: "A courier and logistics platform connecting courier service providers, businesses, and delivery agents for seamless parcel management and delivery operations.",
    status: "Live",
    href: "https://www.xgoo.in/",
  },
  {
    name: "Bubbler",
    desc: "A laundry SaaS platform for managing orders, pickups, billing, customer communication, and multi-branch operations from one dashboard.",
    status: "Live",
    href: "https://bubbler.krackbot.com/",
  },
  {
    name: "Acadup",
    desc: "AI-powered education institution management platform designed for schools, colleges, and universities to manage operations, academics, and administration.",
    status: "In Development",
  },
  {
    name: "Tidin",
    desc: "A travel-focused platform designed to help users plan, organize, and manage travel experiences more efficiently.",
    status: "Experimental",
  },
  {
    name: "banaoo.in",
    desc: "A restaurant and hotel management platform that helps hospitality businesses manage operations, orders, and workflows efficiently.",
    status: "Live",
    href: "https://banaoo.in/",
  },
];

const tools: ProductOrTool[] = [
  {
    name: "ZigZup",
    desc: "A project and product management tool built for builders to manage tasks, pipelines, and development workflows.",
    status: "Beta",
  },
  {
    name: "n8n Templates",
    desc: "Ready-to-use automation workflow templates that help businesses quickly deploy automation using n8n.",
    status: "Live",
  },
  {
    name: "AI Workflow Templates",
    desc: "Prebuilt AI automation workflows designed to accelerate the setup of AI-powered systems.",
    status: "Experimental",
  },
  {
    name: "Builder Resources",
    desc: "Guides, templates, and utilities designed to help entrepreneurs build and launch digital products faster.",
    status: "Experimental",
  },
];

const getStatusColor = (status: Status) => {
  switch (status) {
    case "Core Product":
    case "Live":
      return "bg-green-500/10 text-green-600 dark:text-green-500";
    case "Beta":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-500";
    case "In Development":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-500";
    case "Experimental":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-500";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const ProductCard = ({ item }: { item: ProductOrTool }) => (
  <div className="bento-card h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="font-display font-bold text-foreground text-lg">{item.name}</h3>
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(item.status)}`}>
        {item.status}
      </span>
    </div>
    <p className="text-sm text-muted-foreground mb-6 flex-1">{item.desc}</p>
    {item.href ? (
      <a href={item.href} target="_blank" rel="noreferrer" className="w-fit">
        <Button variant="outline" size="sm" className="rounded-xl text-xs w-fit">
          Visit Site
        </Button>
      </a>
    ) : (
      <Button variant="outline" size="sm" className="rounded-xl text-xs w-fit" disabled>
        In Development
      </Button>
    )}
  </div>
);

const Tools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-36 pb-20">
        <div className="section-container">
          
          {/* Products Section */}
          <section className="mb-24">
            <FadeIn>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">Krackbot Products</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                Digital Platforms Built by Krackbot
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.05}>
                  <ProductCard item={p} />
                </FadeIn>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-24">
            <FadeIn>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">Krackbot Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                Tools for Builders and Businesses
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.05}>
                  <ProductCard item={t} />
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <FadeIn>
            <div className="p-8 sm:p-12 rounded-3xl bg-foreground text-background text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-r from-background to-transparent blur-3xl transform -rotate-12" />
                <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] rounded-full bg-gradient-to-l from-background to-transparent blur-3xl transform -rotate-12" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Explore What We Are Building
                </h3>
                <p className="text-lg text-background/80 max-w-2xl mb-8">
                  Krackbot is building products, tools, and AI systems designed to help businesses and builders move faster.
                </p>
                <Link to="/experimentations">
                  <Button size="lg" className="rounded-xl px-8 h-14 text-base font-semibold gap-2 bg-background text-foreground hover:bg-background/90 shadow-lg cursor-pointer">
                    Explore Experiments <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tools;
