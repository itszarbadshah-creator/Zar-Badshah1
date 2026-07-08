import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqView() {
  
  const faqs: FaqItem[] = [
    {
      id: 'delivery-time',
      question: 'What is the delivery time across Pakistan?',
      answer: 'For major cities like Lahore, Karachi, Islamabad, and Rawalpindi, delivery typically takes 2 to 3 working days. For other towns and remote regions, please allow 3 to 5 working days. All parcels are fully tracked and dispatched in secure premium bubble-wrapped boxes to prevent damage.'
    },
    {
      id: 'payment-methods',
      question: 'Which payment methods do you support?',
      answer: 'We support Cash on Delivery (COD) as our primary payment method for absolute peace of mind. We also support digital transfers through EasyPaisa, JazzCash, and direct Bank Transfers. Instructions for digital transfers are provided during the checkout flow.'
    },
    {
      id: 'order-tracking',
      question: 'How do I track my active order?',
      answer: 'Once your order is processed, we send a tracking reference and direct URL link to your email and phone number. You can also enter your order reference (e.g., ZP-1049) in our real-time Order Tracking Panel at any time to monitor dispatch status and estimated arrival times.'
    },
    {
      id: 'returns-exchanges',
      question: 'What is your return and exchange policy?',
      answer: 'We offer a hassle-free 7-day exchange policy. If you receive a damaged bottle, or if the scent does not match your expectations, you can return it to our warehouse. To be eligible for exchange, the bottle must be at least 95% full and in its original premium box.'
    },
    {
      id: 'authenticity',
      question: 'Are your fragrances authentic and safe for skin?',
      answer: 'Absolutely. Zarbadshah Perfumes are formulated in-house using premium oils sourced directly from elite European fragrance hubs. Our concentrations are of Extrait de Parfum strength, using 100% cosmetic-grade, non-irritant, skin-safe solvents that comply with international safety regulations.'
    },
    {
      id: 'projection-longevity',
      question: 'How do I maximize the projection and longevity of the perfume?',
      answer: 'For maximum projection, spray on pulse points (wrists, sides of neck, behind ears). For maximum longevity, spray on fabric (collars, sleeves, chest area). Scent molecules attach securely to fabric fibers, easily lasting 12+ hours.'
    }
  ];

  // Accordion open tracker state
  const [openFaqId, setOpenFaqId] = useState<string | null>('delivery-time');

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300" id="faq-view-container">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">HELP & INFORMATION</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">Frequently Asked</h1>
        <p className="text-gray-400 text-xs font-sans">
          Find prompt answers to essential queries about ordering, payments, and our fragrance engineering.
        </p>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      {/* Accordion List */}
      <div className="space-y-4 font-sans" id="faq-accordion-list">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div 
              key={faq.id}
              className="bg-[#0A0A0A] border border-gold-400/20 hover:border-gold-400/40 rounded-none overflow-hidden transition-all duration-300 shadow-2xl"
              id={`faq-item-${faq.id}`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left text-white hover:text-gold-400 font-medium text-xs sm:text-sm tracking-wide transition-colors outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>{faq.question}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gold-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-5 pb-6 pt-1 text-gray-300 text-xs leading-relaxed border-t border-gold-400/10 font-sans animate-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick WhatsApp Redirect Banner */}
      <div className="mt-16 p-8 bg-[#0A0A0A] border border-gold-400/25 rounded-none text-center space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0,transparent_100%)] pointer-events-none" />
        <h3 className="text-white font-display text-base tracking-wider font-semibold">Still Have Questions?</h3>
        <p className="text-gray-400 text-xs max-w-sm mx-auto leading-relaxed font-sans">
          Our fragrance specialists are available on WhatsApp to answer detailed questions about formulations, shipping, or payments in real-time.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/923001211872?text=Hi%20Zarbadshah%20Perfumes!%20I've%20read%20your%20FAQ%20page%20but%20have%20an%20additional%20question..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-none transition-colors"
          >
            Chat Live on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
}
