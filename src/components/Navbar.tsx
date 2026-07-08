import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart, Search, Download } from 'lucide-react';
import { PageId } from '../types';
import { products, coupons } from '../data/products';
import { downloadHtmlCatalog } from '../utils/htmlExporter';
import Logo from './Logo';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  wishlistCount: number;
  onSearch: (query: string) => void;
}

export default function Navbar({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount,
  onSearch
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate('shop');
      setIsSearchExpanded(false);
    }
  };

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full dark-glass border-b border-gold-500/10 transition-all duration-300" id="main-navigation-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-gold-400 p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-trigger"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo / Brand Name */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
            <Logo variant="horizontal" size="xs" glow={true} className="hover:scale-105 transition-all duration-300" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-3 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
                  activePage === link.id
                    ? 'text-gold-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gold-400" />
                )}
              </button>
            ))}
          </div>

          {/* Action Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Input and Icon */}
            <div className="relative flex items-center">
              {isSearchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 flex items-center bg-black/90 border border-gold-500/30 rounded-md py-1 px-2 w-48 sm:w-64 transition-all duration-300">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium scents..."
                    className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full pr-6 font-sans"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 text-gold-400 hover:text-white" aria-label="Search submit">
                    <Search className="w-4 h-4" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}
                    className="absolute right-8 text-gray-500 hover:text-white text-[9px] font-sans"
                  >
                    ESC
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="text-gray-300 hover:text-gold-400 p-2 transition-all duration-200"
                  aria-label="Expand search"
                  id="navbar-search-btn"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Download Catalog */}
            <button
              onClick={() => downloadHtmlCatalog(products, coupons)}
              className="flex items-center gap-1.5 text-gray-300 hover:text-gold-400 p-2 transition-all duration-200 cursor-pointer border border-gold-500/20 hover:border-gold-500/60 rounded px-2.5 py-1 bg-gold-500/5"
              title="Download Royal HTML Catalog"
              id="navbar-download-catalog-btn"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span className="hidden lg:inline text-[10px] font-bold uppercase tracking-wider">Catalog</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleLinkClick('wishlist')}
              className="relative text-gray-300 hover:text-gold-400 p-2 transition-all duration-200 cursor-pointer"
              aria-label="View wishlist"
              id="navbar-wishlist-btn"
            >
              <Heart className={`w-5 h-5 ${activePage === 'wishlist' ? 'fill-gold-400 text-gold-400' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-gold-500 text-black text-[9px] font-bold rounded-full animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleLinkClick('cart')}
              className="relative text-gray-300 hover:text-gold-400 p-2 transition-all duration-200 cursor-pointer"
              aria-label="View cart"
              id="navbar-cart-btn"
            >
              <ShoppingCart className={`w-5 h-5 ${activePage === 'cart' ? 'text-gold-400' : ''}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-gold-500 text-black text-[9px] font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-gold-500/20 animate-in fade-in duration-300" id="mobile-nav-drawer">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium tracking-[0.1em] uppercase ${
                  activePage === link.id
                    ? 'text-gold-400 bg-gold-500/5 border-l-2 border-gold-500'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Catalog Download Button */}
            <button
              onClick={() => {
                downloadHtmlCatalog(products, coupons);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-md text-sm font-medium tracking-[0.1em] uppercase text-gold-400 hover:text-gold-300 hover:bg-gold-500/5 flex items-center gap-2 border-t border-gold-500/10 mt-2 cursor-pointer"
              id="mobile-nav-link-download-catalog"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download Digital Catalog</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
