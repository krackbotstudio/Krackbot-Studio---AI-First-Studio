import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Tools from "./pages/Tools";
import Experimentations from "./pages/Experimentations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DesignSystem from "./pages/DesignSystem";
import NotFound from "./pages/NotFound";
import WhatsAppChatButton from "./components/WhatsAppChatButton";
import FloatingSocialLinks from "./components/FloatingSocialLinks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/experimentations" element={<Experimentations />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingSocialLinks />
        <WhatsAppChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
