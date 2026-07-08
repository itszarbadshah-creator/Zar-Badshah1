import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Check, CheckSquare } from 'lucide-react';
import { PageId } from '../types';
import Logo from './Logo';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300" id="about-view-container">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
        <div className="flex justify-center mb-2">
          <Logo variant="emblem" size="md" glow={true} className="h-16 w-16" />
        </div>
        <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">OUR STORY</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">About Zarbadshah</h1>
        <p className="text-gray-400 text-xs font-sans">
          The heritage of royal Pakistani perfumery meets modern European formulation.
        </p>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      {/* Main Grid: Story & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
        
        {/* Left: Beautiful Typography Scent Manifesto */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gold-400/10 border border-gold-400/20 text-gold-400 text-[10px] uppercase font-bold tracking-widest rounded-none">
            ⚜ Established 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-display text-white font-bold leading-tight">
            Crafting Splendid Royal Olfactory Experiences
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed font-sans">
            Zarbadshah Perfumes was born out of a simple yet profound realization: that high-end, long-lasting, royal fragrances should be accessible to perfume enthusiasts in Pakistan without the exorbitant international designer markups. 
          </p>
          <p className="text-gray-400 text-xs leading-relaxed font-sans">
            Our name, <strong>Zarbadshah</strong>, translates to the "Golden Emperor" — a title that guides our entire formulation philosophy. We source absolute top-tier, raw fragrance oils from Grasse, France, and carefully blend them in high-concentration Extraits with organic fixatives. This ensures our perfumes don't just mimic designer scents, but project with majestic power and stay anchored to your attire for 12+ hours.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-[0.15em] rounded-none transition-all duration-200 cursor-pointer"
            >
              Explore Our Fragrances
            </button>
          </div>
        </div>

        {/* Right: Immersive Text block styled like a Luxury Plaquet */}
        <div className="p-8 sm:p-10 bg-[#0A0A0A] border border-gold-400/20 rounded-none relative shadow-2xl space-y-6">
          <div className="absolute top-0 right-10 -translate-y-1/2 w-10 h-10 rounded-none bg-gold-400 text-black flex items-center justify-center font-display font-bold text-xl">
            ⚜
          </div>
          
          <h3 className="text-white font-display text-lg tracking-wider font-semibold">The Zarbadshah Vows</h3>
          
          <ul className="space-y-4 text-xs text-gray-300 font-sans">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white block font-medium">Extraordinary Longevity</strong>
                We formulate with high-concentration perfume compounds, offering a guaranteed 8-12+ hours performance.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white block font-medium">Elegant Italian-Glass Containers</strong>
                Each scent is housed in premium heavyweight glass bottles designed for absolute protection from direct sunlight.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-white block font-medium">Exquisite Customer Care</strong>
                Our team provides custom fragrance guidance directly via WhatsApp to ensure you receive your perfect match.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Brand Values / Production stages */}
      <div className="border-t border-gold-400/10 pt-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">THE PURSUIT OF PERFECTION</span>
          <h2 className="text-2xl font-display text-white font-bold tracking-wider">Our Scent Crafting Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 bg-[#0A0A0A] border border-gold-400/10 hover:border-gold-400/30 rounded-none text-center space-y-3 transition-colors duration-300">
            <span className="text-gold-400 font-display font-bold text-2xl">01</span>
            <h3 className="text-white font-display text-sm font-semibold uppercase tracking-wider">Oil Sourcing</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              We extract and source absolute concrete, precious oud, and jasmin essential oils directly from ethical global supply houses.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="p-6 bg-[#0A0A0A] border border-gold-400/10 hover:border-gold-400/30 rounded-none text-center space-y-3 transition-colors duration-300">
            <span className="text-gold-400 font-display font-bold text-2xl">02</span>
            <h3 className="text-white font-display text-sm font-semibold uppercase tracking-wider">Sartorial Blending</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Meticulous calculations are made in clean rooms, maturing the compositions for weeks to achieve perfect balance and safety.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-[#0A0A0A] border border-gold-400/10 hover:border-gold-400/30 rounded-none text-center space-y-3 transition-colors duration-300">
            <span className="text-gold-400 font-display font-bold text-2xl">03</span>
            <h3 className="text-white font-display text-sm font-semibold uppercase tracking-wider">Magnetic Sealing</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Bottled in heavy frosted glass and secured under signature metallic sprayers, then beautifully boxed in gold-accented packaging.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
