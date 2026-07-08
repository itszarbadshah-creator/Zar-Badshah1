import React, { useState } from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Send, Check, Star, ShoppingBag, Truck, CreditCard, Download } from 'lucide-react';
import { Product, PageId } from '../types';
import { HERO_IMAGE, formatPKR, coupons } from '../data/products';
import { downloadHtmlCatalog } from '../utils/htmlExporter';
import ProductCard from './ProductCard';
import Logo from './Logo';

interface HomeViewProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onNavigate: (page: PageId) => void;
  onSelectProduct: (productId: string) => void;
}

export default function HomeView({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onNavigate,
  onSelectProduct
}: HomeViewProps) {
  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);

  const campaigns = [
    {
      id: 'collection',
      title: 'Zarbadshah Collection',
      tagline: 'Discover Your Royalty',
      image: '/assets/images/campaign_collection_1783498452704.jpg',
      description: 'Zarbadshah Perfumes brings you elite, long-lasting fragrances designed with pure obsession. Each blend is formulated using ultra-concentration oils to ensure you carry an aroma of prestige and majesty wherever you go.',
      targetProductId: 'white-oud',
      themeColor: '#D4AF37',
      badge: '⚜ ROYAL ASSORTMENT ⚜',
      notes: ['Oud', 'Saffron', 'Vanilla', 'Rose', 'Caramel']
    },
    {
      id: 'izhaar',
      title: 'Izhaar: Unspoken Emotions',
      tagline: 'Express What Words Cannot',
      image: '/assets/images/perfume_izhaar_1783498426271.jpg',
      description: 'An intimate, deep, and utterly seductive blend of precious cardamoms, pink pepper, black rose, and warm amberwood. Designed to capture unspoken emotions and leave an unforgettable romantic presence.',
      targetProductId: 'izhaar',
      themeColor: '#E2E8F0',
      badge: '✦ NEW LAUNCH ✦',
      notes: ['Cardamom', 'Black Rose', 'Saffron', 'Amberwood']
    },
    {
      id: 'sultan',
      title: 'Sultan: The Scent of Royalty',
      tagline: 'Absolute Power & Majesty',
      image: '/assets/images/campaign_sultan_1783498521001.jpg',
      description: 'A majestic royal blend opening with opulent saffron and warm nutmeg, dry-coating into a rich base of pure agarwood, golden amber, and soft leather. Crafted for those who command the room.',
      targetProductId: 'sultan',
      themeColor: '#3B82F6',
      badge: '⚜ EXECUTIVES\' SELECTION ⚜',
      notes: ['Saffron', 'Nutmeg', 'Agarwood', 'Royal Amber']
    },
    {
      id: 'laila',
      title: 'Laila: The Scent of Royalty',
      tagline: 'A Dreamy, Romantic Bouquet',
      image: '/assets/images/campaign_laila_1783498547131.jpg',
      description: 'Delicate Damask roses and pink peonies combined with velvety peaches and sweet apricots, settling into a powdery, celestial cloud of clean white musk. Ethereal, gentle, and deeply elegant.',
      targetProductId: 'laila',
      themeColor: '#A78BFA',
      badge: '✿ ROMANTIC BEST-SELLER ✿',
      notes: ['Damask Rose', 'Peony', 'Peach', 'White Musk']
    },
    {
      id: 'darshi',
      title: 'Darshi: The Scent of Royalty',
      tagline: 'An Irresistible Gourmand Embrace',
      image: '/assets/images/campaign_darshi_1783498572824.jpg',
      description: 'A seductive ylang-ylang fragrance wrapped in rich Madagascar vanilla, smooth butter caramel, and creamy coconut milk. Warm, delicious, and completely head-turning.',
      targetProductId: 'darshi',
      themeColor: '#F472B6',
      badge: '⚜ CAPTIVATING GOURMAND ⚜',
      notes: ['Vanilla', 'Caramel', 'Coconut Milk', 'Benzoin']
    },
    {
      id: 'majnu',
      title: 'Majnu: The Scent of Royalty',
      tagline: 'Smoky Leather & Passionate Devotion',
      image: '/assets/images/campaign_majnu_1783498599124.jpg',
      description: 'A dense, mysterious fragrance merging smoky Tuscan leather, patchouli, and vibrant pink pepper with a warm amber dry-down. For the confident man who leaves an indelible mark.',
      targetProductId: 'majnu',
      themeColor: '#E2E8F0',
      badge: '✦ CHARISMATIC TRAIL ✦',
      notes: ['Pink Pepper', 'Tuscan Leather', 'Patchouli', 'Amber']
    }
  ];

  // Filter products for Home
  const featuredProducts = products.filter(p => p.isFeatured);

  // Why choose us items
  const whyChooseUs = [
    {
      title: 'Long Lasting Fragrance',
      description: 'Crafted with premium high-concentration fragrance oils that linger beautifully on clothes for up to 12+ hours.',
      icon: Sparkles
    },
    {
      title: 'Premium Quality',
      description: 'Ingredients sourced directly from elite perfume houses, bottled in thick custom glass containers.',
      icon: Award
    },
    {
      title: 'Affordable Luxury',
      description: 'Bringing international royal quality standards directly to you without excessive luxury markups.',
      icon: ShieldCheck
    },
    {
      title: 'Fast Delivery',
      description: 'Dispatching within 24 hours. Enjoy quick and absolute safety with premium bubble wrapped boxes.',
      icon: Truck
    },
    {
      title: 'Secure Shopping',
      description: 'We prioritize your digital safety with verified shopping checkouts and full transparent support.',
      icon: CreditCard
    },
    {
      title: 'Cash on Delivery',
      description: 'Order with absolute peace of mind. Pay directly at your doorstep when your royal scent arrives.',
      icon: Check
    }
  ];

  // Elegant Testimonials
  const reviews = [
    {
      name: 'Major Daniyal Rizwan',
      location: 'Rawalpindi',
      rating: 5,
      text: 'I ordered Sultan and White Oud. To be honest, I was skeptical at first, but the formulation is top-notch. Sultan has a magnificent royal projection. Lasts easily throughout my long duty days.',
      product: 'Sultan'
    },
    {
      name: 'Dr. Amna Shah',
      location: 'Lahore',
      rating: 5,
      text: 'Laila is a gorgeous romantic dream! smelles exactly like fresh dewy pink roses. And Darshi has that gorgeous rich caramel vanilla dry-down that smells highly premium. Excellent client support on WhatsApp!',
      product: 'Laila & Darshi'
    },
    {
      name: 'Zaryab Choudhry',
      location: 'Karachi',
      rating: 5,
      text: 'Dream is the cleanest unisex scent ever! Very refreshing sea salt and woody sage. I wear it daily to the gym and hospital. Packing is top-level. Highly recommended brand in Pakistan!',
      product: 'Dream (Unisex)'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div id="home-view-container" className="animate-in fade-in duration-500">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-black overflow-hidden py-16 md:py-0" id="hero-section">
        
        {/* Background Image with Deep Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Zarbadshah Perfumes Hero"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 scale-105 filter brightness-[0.7] transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Premium Text & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full text-[10px] font-bold tracking-[0.2em] text-gold-400 uppercase">
                ⚜ Premium Fragrances Pakistan ⚜
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
                The Scent <br className="hidden sm:inline" />
                <span className="gold-gradient-text text-shadow-gold">of Royalty</span>
              </h1>
              
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-sans">
                Premium long-lasting fragrances crafted for every personality. Elevate your presence with royal formulations that stay with you all day.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-8 py-3.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                  id="hero-shop-now-btn"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </button>
                
                <button
                  onClick={() => {
                    const target = document.getElementById('featured-categories-section');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-transparent hover:bg-white/5 text-gold-400 hover:text-white border border-gold-400/40 hover:border-white rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
                  id="hero-explore-btn"
                >
                  Explore Collection
                </button>

                <button
                  onClick={() => downloadHtmlCatalog(products, coupons)}
                  className="px-6 py-3.5 bg-gold-400/10 hover:bg-gold-400 hover:text-black text-gold-300 border border-gold-400/30 hover:border-gold-400 rounded-none text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer flex items-center gap-2"
                  id="hero-download-catalog-btn"
                >
                  <Download className="w-4 h-4 animate-bounce" />
                  <span>Download Catalog</span>
                </button>
              </div>
            </div>

            {/* Right Column: Symmetrical Geometric Design Element */}
            <div className="hidden lg:block lg:col-span-5 h-[420px] relative">
              <div className="absolute right-0 bottom-0 w-full h-full bg-[#0F0F0F] border-l border-t border-gold-400/30 flex items-center justify-center p-8">
                <div className="w-full h-full border border-gold-400/10 flex items-center justify-center">
                  <div className="w-56 h-72 bg-gradient-to-t from-[#111111] to-[#222222] rounded-t-full border border-gold-400/40 relative flex flex-col items-center justify-end pb-8 shadow-2xl shadow-gold-400/20">
                    <div className="absolute top-[40%] -translate-y-1/2 flex flex-col items-center w-full px-4">
                      <Logo variant="emblem" size="sm" glow={true} className="h-16 w-16 mb-2" />
                      <span className="text-xs text-gold-400/70 font-display tracking-[0.4em] mb-1">ZARBADSHAH</span>
                      <span className="text-[7px] text-gray-500 tracking-[0.2em] uppercase">Extrait de Parfum</span>
                    </div>
                    <div className="w-12 h-[2px] bg-gold-400 mb-4"></div>
                    <p className="text-[10px] tracking-[0.3em] opacity-40 uppercase font-mono font-semibold">Signature</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. Featured Categories */}
      <section className="py-24 bg-black border-t border-gold-400/10" id="featured-categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">SELECT YOUR VIBE</span>
            <h2 className="text-3xl font-display text-white font-bold tracking-wider">Curated Collections</h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1: Men */}
            <div 
              onClick={() => onNavigate('men')}
              className="group relative h-[380px] bg-[#0A0A0A] border border-gold-400/20 rounded-none overflow-hidden cursor-pointer shadow-2xl hover:border-gold-400/60 transition-all duration-300"
              id="category-card-men"
            >
              <div className="absolute top-6 left-6 font-display text-6xl font-bold text-gold-400/10 z-20 select-none group-hover:text-gold-400/25 transition-all duration-500">01</div>
              <img 
                src={products.find(p => p.id === 'white-oud')?.image || HERO_IMAGE}
                alt="Men's Perfume Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center z-10">
                <span className="text-[10px] text-gold-400 tracking-[0.3em] font-semibold uppercase mb-1">STRENGTH & ROYALTY</span>
                <h3 className="text-white font-display text-xl tracking-wider font-semibold group-hover:text-gold-400 transition-colors duration-200">
                  Men's Collection
                </h3>
                <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed max-w-xs">
                  Intense, deep, and royal scents like White Oud, Majnu, and Sultan.
                </p>
                <span className="mt-4 px-4 py-1.5 bg-gold-400 text-black text-[9px] font-bold tracking-widest uppercase rounded-none group-hover:bg-gold-300 transition-colors">
                  Explore
                </span>
              </div>
            </div>

            {/* Category 2: Women */}
            <div 
              onClick={() => onNavigate('women')}
              className="group relative h-[380px] bg-[#0A0A0A] border border-gold-400/20 rounded-none overflow-hidden cursor-pointer shadow-2xl hover:border-gold-400/60 transition-all duration-300"
              id="category-card-women"
            >
              <div className="absolute top-6 left-6 font-display text-6xl font-bold text-gold-400/10 z-20 select-none group-hover:text-gold-400/25 transition-all duration-500">02</div>
              <img 
                src={products.find(p => p.id === 'laila')?.image || HERO_IMAGE}
                alt="Women's Perfume Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center z-10">
                <span className="text-[10px] text-gold-400 tracking-[0.3em] font-semibold uppercase mb-1">ELEGANCE & GRACE</span>
                <h3 className="text-white font-display text-xl tracking-wider font-semibold group-hover:text-gold-400 transition-colors duration-200">
                  Women's Collection
                </h3>
                <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed max-w-xs">
                  Delicate floral and rich gourmand scents like Laila, Darshi, and Ishq.
                </p>
                <span className="mt-4 px-4 py-1.5 bg-gold-400 text-black text-[9px] font-bold tracking-widest uppercase rounded-none group-hover:bg-gold-300 transition-colors">
                  Explore
                </span>
              </div>
            </div>

            {/* Category 3: Unisex */}
            <div 
              onClick={() => onNavigate('unisex')}
              className="group relative h-[380px] bg-[#0A0A0A] border border-gold-400/20 rounded-none overflow-hidden cursor-pointer shadow-2xl hover:border-gold-400/60 transition-all duration-300"
              id="category-card-unisex"
            >
              <div className="absolute top-6 left-6 font-display text-6xl font-bold text-gold-400/10 z-20 select-none group-hover:text-gold-400/25 transition-all duration-500">03</div>
              <img 
                src={products.find(p => p.id === 'dream')?.image || HERO_IMAGE}
                alt="Unisex Perfume Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center z-10">
                <span className="text-[10px] text-gold-400 tracking-[0.3em] font-semibold uppercase mb-1">FLUID & CELESTIAL</span>
                <h3 className="text-white font-display text-xl tracking-wider font-semibold group-hover:text-gold-400 transition-colors duration-200">
                  Unisex Collection
                </h3>
                <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed max-w-xs">
                  A transcendent fresh marine wood blend crafted to adapt to anyone.
                </p>
                <span className="mt-4 px-4 py-1.5 bg-gold-400 text-black text-[9px] font-bold tracking-widest uppercase rounded-none group-hover:bg-gold-300 transition-colors">
                  Explore
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Royal Campaign Interactive Showcase */}
      <section className="py-24 bg-black border-t border-gold-400/10 relative overflow-hidden" id="royal-campaigns-section">
        {/* Decorative lighting background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0,transparent_75%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">THE SCENT OF ROYALTY</span>
            <h2 className="text-3xl font-display text-white font-bold tracking-wider">Royal Campaigns</h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          {/* Symmetrical Split Interactive Showroom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#070707] border border-gold-400/15 p-6 sm:p-10 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Left Column: Interactive Poster Viewport */}
            <div className="lg:col-span-5 h-[480px] sm:h-[580px] relative overflow-hidden group border border-gold-400/20">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              <img 
                src={campaigns[activeCampaignIdx].image} 
                alt={campaigns[activeCampaignIdx].title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                key={activeCampaignIdx}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3 py-1 bg-black/80 border border-gold-400/40 text-[9px] font-bold tracking-[0.2em] text-gold-400 uppercase font-mono">
                  {campaigns[activeCampaignIdx].badge}
                </span>
              </div>
            </div>

            {/* Right Column: Scent Narrative & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between py-4 space-y-8">
              <div className="space-y-6">
                
                <span className="text-xs text-gold-400/80 font-mono tracking-[0.3em] uppercase block">
                  ⚜ {campaigns[activeCampaignIdx].tagline} ⚜
                </span>
                
                <h3 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-wide">
                  {campaigns[activeCampaignIdx].title}
                </h3>
                
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {campaigns[activeCampaignIdx].description}
                </p>

                {/* Fragrance Composition / Key Notes */}
                <div className="space-y-3 pt-4">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block">Key Composition Notes</span>
                  <div className="flex flex-wrap gap-2.5">
                    {campaigns[activeCampaignIdx].notes.map((note, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 bg-gold-400/5 hover:bg-gold-400/10 border border-gold-400/20 rounded-none text-xs text-gray-300 font-mono tracking-wider transition-colors"
                      >
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gold-400/10">
                <button
                  onClick={() => onSelectProduct(campaigns[activeCampaignIdx].targetProductId)}
                  className="px-8 py-4 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-all duration-300 cursor-pointer text-center"
                >
                  Explore Scent Details
                </button>
                <button
                  onClick={() => {
                    const matchedProd = products.find(p => p.id === campaigns[activeCampaignIdx].targetProductId);
                    if (matchedProd) {
                      onBuyNow(matchedProd, '50ml', { stopPropagation: () => {} } as any);
                    } else {
                      onNavigate('shop');
                    }
                  }}
                  className="px-8 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-gold-400/50 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer text-center"
                >
                  Order This Scent
                </button>
              </div>

            </div>

          </div>

          {/* Horizontal Track Selector */}
          <div className="mt-8">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.25em] mb-4 block text-center font-semibold">Select Campaign Poster to View Stories</span>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gold-400/20 justify-start sm:justify-center">
              {campaigns.map((camp, idx) => (
                <button
                  key={camp.id}
                  onClick={() => setActiveCampaignIdx(idx)}
                  className={`flex-none w-28 sm:w-36 aspect-[3/4] relative overflow-hidden cursor-pointer border transition-all duration-300 ${
                    activeCampaignIdx === idx 
                      ? 'border-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-[1.03] opacity-100' 
                      : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
                  }`}
                  style={{
                    boxShadow: activeCampaignIdx === idx ? `0 0 15px ${camp.themeColor}33` : undefined
                  }}
                >
                  <img 
                    src={camp.image} 
                    alt={camp.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black via-black/80 to-transparent text-left">
                    <p className="text-[8px] text-gold-400 font-mono tracking-widest uppercase font-semibold mb-0.5">Zarbadshah</p>
                    <p className="text-[9px] text-white font-display tracking-tight font-bold truncate">{camp.title.split(':')[0]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="py-24 bg-[#050505] border-t border-gold-500/5" id="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">SELECTED FRAGRANCES</span>
              <h2 className="text-3xl font-display text-white font-bold tracking-wider">Featured Products</h2>
            </div>
            <button 
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold uppercase tracking-[0.15em] text-gold-400 hover:text-white pb-1 border-b border-gold-500/20 hover:border-white transition-all cursor-pointer"
            >
              View Entire Catalog ({products.length} Products) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onSelect={onSelectProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Zarbadshah Perfumes */}
      <section className="py-24 bg-black border-t border-gold-400/10" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-20 space-y-2">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">CRAFTSMANSHIP AT CORE</span>
            <h2 className="text-3xl font-display text-white font-bold tracking-wider">Why Choose Zarbadshah</h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto mt-2">Every aspect of our perfumes is designed with obsession, elegance, and extreme persistence.</p>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whyChooseUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-[#0A0A0A] border border-gold-400/10 hover:border-gold-400/40 rounded-none transition-all duration-300 hover:bg-[#0F0F0F] group"
                  id={`why-card-${index}`}
                >
                  <div className="w-12 h-12 bg-gold-400/5 border border-gold-400/20 group-hover:border-gold-400/40 text-gold-400 rounded-none flex items-center justify-center mb-5 transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-display text-base font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Customer Reviews (Testimonials) */}
      <section className="py-24 bg-[#050505] border-t border-gold-400/10 overflow-hidden" id="customer-reviews-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">HEARD FROM OUR CLIENTS</span>
            <h2 className="text-3xl font-display text-white font-bold tracking-wider">Royal Endorsements</h2>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, index) => (
              <div 
                key={index}
                className="p-8 bg-[#0A0A0A] border border-gold-400/15 rounded-none shadow-2xl flex flex-col justify-between hover:border-gold-400/40 transition-colors duration-300"
                id={`testimonial-card-${index}`}
              >
                <div>
                  <div className="flex items-center gap-1 text-gold-400 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-xs italic leading-relaxed font-sans">
                    "{rev.text}"
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gold-400/10 flex justify-between items-center">
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">{rev.name}</h4>
                    <p className="text-gray-500 text-[10px] mt-0.5">{rev.location}, Pakistan</p>
                  </div>
                  <span className="text-[9px] text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded-none font-mono uppercase border border-gold-400/20">
                    Purchased {rev.product}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Instagram Gallery */}
      <section className="py-24 bg-black border-t border-gold-400/10" id="instagram-gallery-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">FOLLOW OUR JOURNEY</span>
            <h2 className="text-3xl font-display text-white font-bold tracking-wider">Lifestyle Gallery</h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm mx-auto mt-2">Tag <span className="text-gold-400 font-medium font-mono">#ZarbadshahPerfumes</span> on Instagram to join our elegant community.</p>
          </div>

          {/* Grid of perfume visuals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="instagram-photos-grid">
            {products.slice(0, 4).map((p, index) => (
              <div 
                key={index} 
                className="group relative aspect-square bg-[#0A0A0A] overflow-hidden rounded-none border border-gold-400/10 hover:border-gold-400/40 transition-all duration-300"
                id={`ig-photo-item-${index}`}
              >
                <img 
                  src={p.image} 
                  alt={`Zarbadshah Perfume Visual ${index}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-semibold tracking-widest font-display">@zarbadshah_perfumes ⚜</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Newsletter Subscription */}
      <section className="py-24 bg-[#0A0A0A] border-t border-gold-400/10 relative overflow-hidden" id="newsletter-subscription-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.3em]">ROYAL NEWSLETTER</span>
          
          <h2 className="text-2xl sm:text-3xl font-display text-white font-semibold tracking-wider">
            Subscribe For Elite Offers
          </h2>
          
          <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Join the Zarbadshah VIP circle to receive prompt notifications about secret sales, limited batch releases, and exclusive fragrance guidelines.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-black text-xs text-white placeholder-gray-600 px-4 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none flex-1 font-sans"
              required
              id="newsletter-email-input"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              id="newsletter-submit-btn"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>

          {newsletterSuccess && (
            <div className="text-gold-400 text-xs font-semibold animate-pulse mt-2 font-sans" id="newsletter-success-toast">
              ✓ Splendid! You have successfully joined the Zarbadshah VIP newsletter.
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
