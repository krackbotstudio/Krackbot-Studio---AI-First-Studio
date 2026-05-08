import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917331120200";
const DEFAULT_TEXT = "Hi Krackbot Studio, I would like to know more about your services.";

const WhatsAppChatButton = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_TEXT)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Krackbot on WhatsApp"
      className="fixed bottom-6 right-6 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe57]"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp Chat
    </a>
  );
};

export default WhatsAppChatButton;
