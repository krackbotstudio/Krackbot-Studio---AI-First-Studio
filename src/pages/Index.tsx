import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import ImpactSection from "@/components/ImpactSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ToolsPreviewSection from "@/components/ToolsPreviewSection";
import LabsSection from "@/components/LabsSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <PillarsSection />
    <ImpactSection />
    <HowWeWorkSection />
    <ToolsPreviewSection />
    <LabsSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
