import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product, PageId } from '../types';
import ProductCard from './ProductCard';

interface ShopViewProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onSelectProduct: (productId: string) => void;
  initialCollection?: 'men' | 'women' | 'unisex' | null;
  initialSearchQuery?: string;
  onNavigate: (page: PageId) => void;
}

export default function ShopView({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  initialCollection = null,
  initialSearchQuery = '',
  onNavigate
}: ShopViewProps) {
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'men' | 'women' | 'unisex'>(
    initialCollection || 'all'
  );
  const [selectedIntensity, setSelectedIntensity] = useState<'all' | 'Subtle' | 'Moderate' | 'Intense'>('all');
  const [priceRange, setPriceRange] = useState<number>(5000); // Max PKR
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync props when user navigates to specific collections via navbar
  useEffect(() => {
    if (initialCollection) {
      setSelectedCollection(initialCollection);
    } else {
      setSelectedCollection('all');
    }
    setCurrentPage(1);
  }, [initialCollection]);

  // Sync general search query from navbar
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Clear all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCollection('all');
    setSelectedIntensity('all');
    setPriceRange(5000);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.shortDescription.toLowerCase().includes(query) ||
             p.description.toLowerCase().includes(query) ||
             p.notes.top.some(n => n.toLowerCase().includes(query)) ||
             p.notes.heart.some(n => n.toLowerCase().includes(query)) ||
             p.notes.base.some(n => n.toLowerCase().includes(query))
      );
    }

    // Collection filter
    if (selectedCollection !== 'all') {
      result = result.filter(p => p.collection === selectedCollection);
    }

    // Scent Intensity filter
    if (selectedIntensity !== 'all') {
      result = result.filter(p => p.intensity === selectedIntensity);
    }

    // Price range filter
    result = result.filter(p => p.price <= priceRange);

    // Sorting logic
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCollection, selectedIntensity, priceRange, sortBy]);

  // Pagination calculation
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300" id="shop-view-container">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">THE CATALOGUE</span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">
          {selectedCollection === 'men' && "Men's Collection"}
          {selectedCollection === 'women' && "Women's Collection"}
          {selectedCollection === 'unisex' && "Unisex Fragrances"}
          {selectedCollection === 'all' && "All Fragrances"}
        </h1>
        <p className="text-gray-500 text-xs font-sans">
          Discover hand-crafted, long-lasting luxury compositions designed for absolute distinction.
        </p>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      {/* Filter and Search Bar Row */}
      <div className="bg-[#0A0A0A] border border-gold-400/20 rounded-none p-4 sm:p-6 mb-10 flex flex-col gap-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar inside page */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name, notes, or scent..."
              className="w-full bg-black text-xs text-white placeholder-gray-600 pl-10 pr-10 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none font-sans"
              id="shop-search-input"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Filter Toggle button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                showFilters || selectedIntensity !== 'all' || priceRange < 5000
                  ? 'border-gold-400 text-gold-400 bg-gold-400/10'
                  : 'border-gold-400/20 text-gray-400 hover:text-white'
              }`}
              id="shop-filters-toggle-btn"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {(selectedIntensity !== 'all' || priceRange < 5000) && (
                <span className="w-2 h-2 rounded-none bg-gold-400 animate-ping" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-black border border-gold-400/20 rounded-none px-3 py-2.5 text-gray-400">
              <ArrowUpDown className="w-4 h-4 mr-2 text-gold-400" />
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1); }}
                className="bg-transparent text-xs text-white font-bold uppercase tracking-wider outline-none cursor-pointer pr-4 font-sans"
                id="shop-sort-select"
              >
                <option value="popular" className="bg-neutral-950">Sort: Popular</option>
                <option value="price-asc" className="bg-neutral-950">Price: Low-High</option>
                <option value="price-desc" className="bg-neutral-950">Price: High-Low</option>
                <option value="rating" className="bg-neutral-950">Top Rated</option>
              </select>
            </div>

            {/* Clear All shortcut */}
            {(searchQuery || selectedCollection !== 'all' || selectedIntensity !== 'all' || priceRange < 5000) && (
              <button
                onClick={handleResetFilters}
                className="text-[10px] text-gray-500 hover:text-rose-400 uppercase tracking-widest font-bold px-3 py-2"
                id="shop-clear-all-shortcut"
              >
                Reset All
              </button>
            )}

          </div>

        </div>

        {/* Expandable Filter Drawer */}
        {showFilters && (
          <div className="pt-6 border-t border-gold-400/10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top duration-300" id="shop-filters-drawer">
            
            {/* Collection filter */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-display">Collections</h4>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'men', 'women', 'unisex'] as const).map((col) => (
                  <button
                    key={col}
                    onClick={() => { setSelectedCollection(col); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedCollection === col
                        ? 'bg-gold-400 border-gold-400 text-black'
                        : 'border-gold-400/20 text-gray-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    {col === 'all' ? 'All' : col === 'men' ? "Men's" : col === 'women' ? "Women's" : 'Unisex'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scent Intensity filter */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-display">Scent Intensity</h4>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'Subtle', 'Moderate', 'Intense'] as const).map((int) => (
                  <button
                    key={int}
                    onClick={() => { setSelectedIntensity(int); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedIntensity === int
                        ? 'bg-gold-400 border-gold-400 text-black'
                        : 'border-gold-400/20 text-gray-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    {int === 'all' ? 'All' : int}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider font-display">Max Price</h4>
                <span className="text-gold-400 text-xs font-bold font-mono">Rs. {priceRange.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-gold-400 h-1 bg-neutral-900 rounded-none outline-none cursor-pointer"
                id="shop-price-range-slider"
              />
              <div className="flex justify-between text-[9px] text-gray-650 font-mono">
                <span>Rs. 3,000</span>
                <span>Rs. 5,000</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Main Catalog View Grid */}
      {filteredProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
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

          {/* Beautiful Pagination buttons */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 border-t border-gold-400/10 pt-8" id="shop-pagination-bar">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-none text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-gold-400 text-black shadow-md'
                        : 'bg-[#0A0A0A] border border-gold-400/20 text-gray-400 hover:text-white hover:border-gold-400/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="text-center py-24 bg-[#0A0A0A] border border-dashed border-gold-400/20 rounded-none p-8 space-y-4" id="shop-empty-state">
          <Sparkles className="w-12 h-12 text-gold-400 mx-auto opacity-45 animate-pulse" />
          <h3 className="text-white font-display text-lg tracking-wide">No Fragrances Found</h3>
          <p className="text-gray-400 text-xs max-w-sm mx-auto">
            We couldn't find any premium perfumes matching your search or filters. Try removing some filters or adjusting your price slider.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
