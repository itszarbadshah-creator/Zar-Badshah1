import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '+923001211872';
  const welcomeMessage = encodeURIComponent("Hello Zarbadshah Perfumes! I am interested in exploring your luxury fragrance collections.");
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[\s+]/g, '')}?text=${welcomeMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-110 group cursor-pointer"
      title="Chat with Zarbadshah on WhatsApp"
      id="whatsapp-floating-trigger"
    >
      <span className="absolute right-16 bg-black/90 text-gold-300 text-xs py-1.5 px-3 rounded-md border border-gold-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans">
        WhatsApp Chat (+92 300 1211872)
      </span>
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
