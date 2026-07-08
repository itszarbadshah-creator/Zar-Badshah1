import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Phone, Send, Check } from 'lucide-react';

export default function ContactView() {
  
  // Simulated form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const whatsappNumber = '+923001211872';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[\s+]/g, '')}?text=Hello%20Zarbadshah%20Perfumes!%20I'm%20contacting%20you%20from%20your%20website.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      // Clear toast after 5s
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300" id="contact-view-container">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">GET IN TOUCH</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">Contact Concierge</h1>
        <p className="text-gray-400 text-xs font-sans">
          Our fragrance connoisseurs are standing by to guide your selections and address questions.
        </p>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Contact Info Channels (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-display text-white font-semibold">Direct Communication Channels</h2>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Choose your preferred platform. For the absolute fastest response regarding order statuses, custom combinations, or immediate deliveries, connect with us directly on WhatsApp.
            </p>
          </div>

          <div className="space-y-4 font-sans">
            {/* WhatsApp Widget card */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-emerald-950/10 hover:bg-emerald-950/20 border border-emerald-500/20 rounded-none transition-all duration-300 group cursor-pointer"
              id="contact-whatsapp-link"
            >
              <div className="p-3 bg-emerald-600 group-hover:bg-emerald-500 text-white rounded-none transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs uppercase tracking-widest block font-medium group-hover:text-emerald-400 transition-colors">24/7 WhatsApp Scent Line</strong>
                <p className="text-emerald-400 text-sm font-bold font-mono mt-1">+92 300 1211872</p>
                <span className="text-[10px] text-gray-500 mt-1 block">Instant response within minutes for orders and support.</span>
              </div>
            </a>

            {/* Email card */}
            <a 
              href="mailto:itszarbadshah@gmail.com"
              className="flex items-start gap-4 p-5 bg-[#0A0A0A] hover:bg-[#0F0F0F] border border-gold-400/20 rounded-none transition-all duration-300 group cursor-pointer"
              id="contact-email-link"
            >
              <div className="p-3 bg-gold-400/10 text-gold-400 rounded-none group-hover:bg-gold-400/20 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs uppercase tracking-widest block font-medium group-hover:text-gold-400 transition-colors">Official Email</strong>
                <p className="text-gray-400 text-sm font-mono mt-1">itszarbadshah@gmail.com</p>
                <span className="text-[10px] text-gray-500 mt-1 block">Replies within 24 hours. Good for wholesale or business inquiries.</span>
              </div>
            </a>

            {/* Head office location */}
            <div className="flex items-start gap-4 p-5 bg-[#0A0A0A] border border-gold-400/10 rounded-none">
              <div className="p-3 bg-gold-400/10 text-gold-400 rounded-none">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white text-xs uppercase tracking-widest block font-medium">Headquarters</strong>
                <p className="text-gray-400 text-xs mt-1">Lahore & Karachi, Pakistan</p>
                <span className="text-[10px] text-gray-500 mt-1 block">Warehouse and distribution hubs. Closed to walk-in public.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Interactive Form (lg:col-span-7) */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-[#0A0A0A] border border-gold-400/20 rounded-none shadow-2xl relative">
          
          <h3 className="text-white font-display text-lg font-semibold tracking-wider mb-6">Send an Inquiry</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 font-sans" id="contact-inquiry-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asif Raza"
                  className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. asif@gmail.com"
                  className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 03001234567"
                  className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Inquiry Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Order Delivery Status / Scent selection help"
                  className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Message Description</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your comprehensive message here..."
                rows={5}
                className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none resize-none"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-400 hover:bg-gold-300 disabled:bg-neutral-800 disabled:text-gray-500 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-all cursor-pointer flex items-center justify-center gap-2"
                id="contact-form-submit-btn"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {submitSuccess && (
            <div className="absolute inset-0 bg-black/95 rounded-none flex flex-col items-center justify-center p-8 text-center gap-4 animate-in fade-in duration-300" id="contact-success-screen">
              <div className="w-16 h-16 bg-gold-400/10 border border-gold-400/30 text-gold-400 rounded-none flex items-center justify-center animate-pulse">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-white font-display text-lg font-bold tracking-wider">Inquiry Received Splendidly</h4>
              <p className="text-gray-400 text-xs max-w-sm leading-relaxed font-sans">
                Thank you for contacting Zarbadshah Perfumes. A verified fragrance concierge officer has been notified. We will review and reply within 12 hours.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-neutral-900 border border-gold-400/20 text-gold-400 text-[10px] uppercase font-bold tracking-widest hover:border-gold-400 transition-all rounded-none"
              >
                Send Another Message
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
