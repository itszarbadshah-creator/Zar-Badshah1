import { PageId } from '../types';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#050505] border-t border-gold-500/10 text-gray-400 font-sans mt-auto" id="main-application-footer">
      
      {/* Upper Footer: Value Propositions Summary */}
      <div className="border-b border-gold-500/5 py-8 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-gold-400 mb-2" />
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">100% Authentic Scents</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">Directly sourced premium oils and components crafted for absolute purity.</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-8 h-8 text-gold-400 mb-2" />
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Dedicated Support</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">WhatsApp consultation and instant query resolutions on +92 300 1211872.</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-gold-400 mb-2" />
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider">Pakistan-Wide Shipping</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">Prompt deliveries with absolute safety and secure packaging.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info Column */}
          <div className="space-y-4">
            <div className="flex cursor-pointer" onClick={() => onNavigate('home')}>
              <Logo variant="horizontal" size="xs" glow={false} />
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              The Scent of Royalty. We craft premium-quality, royal, and long-lasting fragrances designed to elevate your unique identity and personal presence.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900/50 hover:bg-gold-500/10 border border-neutral-800 hover:border-gold-500/30 text-gray-400 hover:text-gold-400 rounded-full transition-all duration-300" aria-label="Zarbadshah on Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900/50 hover:bg-gold-500/10 border border-neutral-800 hover:border-gold-500/30 text-gray-400 hover:text-gold-400 rounded-full transition-all duration-300" aria-label="Zarbadshah on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900/50 hover:bg-gold-500/10 border border-neutral-800 hover:border-gold-500/30 text-gray-400 hover:text-gold-400 rounded-full transition-all duration-300" aria-label="Zarbadshah on Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 font-display">
              Quick Navigation
            </h3>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Homepage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Our Catalog (Shop)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  About the Brand
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Help & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 font-display">
              Perfume Collections
            </h3>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('men')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Men's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('women')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Women's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('unisex')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Unisex Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-gold-400 transition-colors duration-200 text-left">
                  Best Selling Scents
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4 font-sans">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 font-display">
              Royal Concierge
            </h3>
            <div className="flex items-start space-x-3 text-xs">
              <Mail className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Email Support</p>
                <a href="mailto:itszarbadshah@gmail.com" className="text-gray-500 hover:text-gold-400 transition-colors">
                  itszarbadshah@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-xs">
              <Phone className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">WhatsApp Hotline</p>
                <a href="https://wa.me/923001211872" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold-400 transition-colors">
                  +92 300 1211872
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-xs">
              <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">HQ Office</p>
                <p className="text-gray-500">Mansehra, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-xs">
              <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Balakot Outlet</p>
                <p className="text-gray-500">Ahsaniya Cash & Carry Balakot, Pakistan</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Footer: Payment Icons and Legal */}
      <div className="bg-[#030303] py-8 border-t border-gold-500/5 text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 tracking-wider">
            © {new Date().getFullYear()} Zarbadshah Perfumes. All Rights Reserved. The Scent of Royalty.
          </p>
          
          {/* Payment Badges Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] text-gray-500 mr-2 font-display uppercase tracking-widest">ACCEPTED PAYMENTS:</span>
            <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[9px] text-gold-400 font-semibold tracking-wider rounded uppercase">Cash On Delivery</div>
            <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[9px] text-emerald-400 font-semibold tracking-wider rounded uppercase">EasyPaisa</div>
            <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[9px] text-rose-500 font-semibold tracking-wider rounded uppercase">JazzCash</div>
            <div className="px-2 py-1 bg-neutral-900 border border-neutral-800 text-[9px] text-blue-400 font-semibold tracking-wider rounded uppercase">Bank Transfer</div>
          </div>
        </div>
      </div>

    </footer>
  );
}
