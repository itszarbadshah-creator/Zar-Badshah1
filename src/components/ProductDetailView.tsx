import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Zap, Minus, Plus, Star, Award, ShieldCheck, ChevronRight, MessageSquare, CornerDownRight } from 'lucide-react';
import { Product, Review } from '../types';
import { formatPKR } from '../data/products';
import ProductCard from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  wishlistIds: string[];
  recentlyViewed: Product[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, selectedSize: string, quantity: number, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onSelectProduct: (productId: string) => void;
  onAddRecentlyViewed: (product: Product) => void;
}

export default function ProductDetailView({
  product,
  allProducts,
  wishlistIds,
  recentlyViewed,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onAddRecentlyViewed
}: ProductDetailViewProps) {
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'reviews'>('description');
  
  // Custom reviews submission simulation state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Scroll to top and add to recently viewed on load
  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setReviewsList(product.reviews);
    setReviewSuccess(false);
    onAddRecentlyViewed(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Toggle favorite helper
  const isWishlisted = wishlistIds.includes(product.id);

  // Filter related products (same collection, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3);

  // Handle local reviews simulation submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const addedReview: Review = {
        id: 'new-rev-' + Date.now(),
        author: newReviewAuthor,
        rating: newReviewRating,
        comment: newReviewComment,
        date: 'Today'
      };
      setReviewsList(prev => [addedReview, ...prev]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setNewReviewRating(5);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-300" id={`product-detail-view-${product.id}`}>
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-sans">
        <span className="hover:text-gold-400 cursor-pointer" onClick={() => onSelectProduct('')}>Shop</span>
        <ChevronRight className="w-3 h-3" />
        <span className="capitalize text-gray-400">{product.collection}'s Collection</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gold-400 font-semibold">{product.name}</span>
      </div>

      {/* Main Showcase Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Product Image Display Stage */}
        <div className="space-y-4">
          <div className="relative bg-black border border-gold-400/20 rounded-none overflow-hidden aspect-square flex items-center justify-center shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              id="product-detail-hero-image"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-gold-400 text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none shadow-lg">
                ★ Best Seller
              </span>
            )}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-rose-950 text-rose-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none shadow-lg border border-rose-500/20">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          
          {/* Subtle details about scent bottles */}
          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono px-1">
            <span>⚜ Genuine Formulation</span>
            <span>Bottle: Thick Luxury Frosted Glass</span>
            <span>Origin: Artisanal Craft</span>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Trigger Panel */}
        <div className="space-y-6">
          
          {/* Collection name & rating block */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gold-400 tracking-[0.25em] font-semibold uppercase">
              {product.collection === 'men' ? "Men's Scent" : product.collection === 'women' ? "Women's Scent" : 'Unisex Scent'}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-neutral-800'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-bold ml-1">({product.rating} / 5)</span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-wider">
            {product.name}
          </h1>

          {/* Scent Attribute Quick Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 bg-[#0A0A0A] border border-gold-400/20 text-[10px] text-gray-400 rounded-none font-mono">
              Intensity: <strong className="text-white">{product.intensity}</strong>
            </span>
            <span className="px-2.5 py-1 bg-[#0A0A0A] border border-gold-400/20 text-[10px] text-gray-400 rounded-none font-mono">
              Longevity: <strong className="text-white">{product.longevity}</strong>
            </span>
          </div>

          {/* Prices Row */}
          <div className="flex items-baseline gap-4 py-3 border-y border-gold-400/20">
            <span className="text-gold-300 font-display font-bold text-2xl sm:text-3xl">
              {formatPKR(product.price * (selectedSize === '100ml' ? 1.6 : 1.0))}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-600 line-through text-base font-mono">
                {formatPKR(product.originalPrice * (selectedSize === '100ml' ? 1.6 : 1.0))}
              </span>
            )}
            <span className="text-[10px] text-gray-500 italic ml-1">
              (Price varies for {selectedSize})
            </span>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block">Available Sizes:</span>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest rounded-none border uppercase transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-gold-400 border-gold-400 text-black shadow-lg'
                      : 'border-gold-400/20 text-gray-400 hover:text-white hover:border-gold-400/50 bg-[#0A0A0A]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="space-y-3 pt-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block">Quantity:</span>
            <div className="inline-flex items-center bg-[#0A0A0A] border border-gold-400/20 rounded-none">
              <button
                onClick={handleDecrement}
                className="p-2.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Decrement quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-xs font-bold text-white font-mono">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-2.5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Increment quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            
            {/* Add to Cart button */}
            <button
              onClick={(e) => onAddToCart(product, selectedSize, quantity, e)}
              className="flex items-center justify-center gap-2 py-4 px-6 bg-[#0A0A0A] hover:bg-neutral-900 border border-gold-400/20 hover:border-gold-400/50 text-white rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
              id="product-detail-add-to-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" />
              <span>Add to Cart</span>
            </button>

            {/* Buy Now / Quick Checkout */}
            <button
              onClick={(e) => onBuyNow(product, selectedSize, e)}
              className="flex items-center justify-center gap-2 py-4 px-6 bg-gold-400 hover:bg-gold-300 text-black rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg"
              id="product-detail-buy-now-btn"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>

          </div>

          {/* Wishlist Shortcut & Trust Signals */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold-400/25">
            <button
              onClick={(e) => onToggleWishlist(product, e)}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-gold-400 transition-colors font-sans cursor-pointer"
              id="product-detail-wishlist-toggle"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold-450 text-gold-400' : ''}`} />
              <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
            </button>
            
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>COD / EasyPaisa / JazzCash</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Section (Description, Fragrance Notes, Reviews) */}
      <div className="mt-20 border-b border-gold-500/10 flex justify-center sm:justify-start gap-4 sm:gap-8 overflow-x-auto pb-0">
        {(['description', 'notes', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] relative transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab ? 'text-gold-400' : 'text-gray-500 hover:text-white'
            }`}
            id={`tab-trigger-${tab}`}
          >
            {tab === 'description' && 'About Scent'}
            {tab === 'notes' && 'Fragrance Notes ⚜'}
            {tab === 'reviews' && `Customer Reviews (${reviewsList.length})`}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panel Content Stage */}
      <div className="py-8 min-h-[220px]" id="tab-panel-container">
        
        {/* Description Panel */}
        {activeTab === 'description' && (
          <div className="space-y-4 max-w-3xl animate-in fade-in duration-300">
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-500/5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-gold-400" />
                <span>Excellent projection during the first 3 hours.</span>
              </div>
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-gold-400" />
                <span>Designed for high heat and humid climates.</span>
              </div>
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-gold-400" />
                <span>Supplied with custom magnetic gift outer boxes.</span>
              </div>
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-gold-400" />
                <span>100% cruelty-free, skin-safe cosmetic base.</span>
              </div>
            </div>
          </div>
        )}

        {/* Fragrance Notes Panel */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300" id="fragrance-notes-panel">
            
            {/* Top Notes */}
            <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-3">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">INITIAL IMPACT</span>
              <h4 className="text-white font-display text-sm font-bold uppercase tracking-widest border-b border-gold-400/10 pb-2">Top Notes</h4>
              <ul className="space-y-2 text-xs text-gray-400 list-disc list-inside">
                {product.notes.top.map(note => (
                  <li key={note} className="font-sans">{note}</li>
                ))}
              </ul>
              <p className="text-[10px] text-gray-500 pt-2 italic">Evaporates within the first 15-30 minutes, opening the scent sequence.</p>
            </div>

            {/* Heart Notes */}
            <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-3">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">THE SOUL</span>
              <h4 className="text-white font-display text-sm font-bold uppercase tracking-widest border-b border-gold-400/10 pb-2">Heart Notes</h4>
              <ul className="space-y-2 text-xs text-gray-400 list-disc list-inside">
                {product.notes.heart.map(note => (
                  <li key={note} className="font-sans">{note}</li>
                ))}
              </ul>
              <p className="text-[10px] text-gray-500 pt-2 italic">Develops over 2-3 hours, representing the core identity of the fragrance.</p>
            </div>

            {/* Base Notes */}
            <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-3">
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider block">THE COLD DRY DOWN</span>
              <h4 className="text-white font-display text-sm font-bold uppercase tracking-widest border-b border-gold-400/10 pb-2">Base Notes</h4>
              <ul className="space-y-2 text-xs text-gray-400 list-disc list-inside">
                {product.notes.base.map(note => (
                  <li key={note} className="font-sans">{note}</li>
                ))}
              </ul>
              <p className="text-[10px] text-gray-500 pt-2 italic">The most persistent compounds that stay anchored on fabrics for 12+ hours.</p>
            </div>

          </div>
        )}

        {/* Reviews Panel */}
        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in duration-300" id="reviews-panel">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              
              {/* Existing Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-5 bg-[#0A0A0A] border border-gold-400/15 rounded-none space-y-2 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-bold uppercase tracking-wider">{rev.author}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex text-gold-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-gold-400 text-gold-400' : 'text-neutral-800'}`} />
                      ))}
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed font-sans">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Custom Review Form */}
              <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-4 shadow-xl">
                <h4 className="text-white font-display text-sm font-bold uppercase tracking-wider">Leave a Review</h4>
                
                <form onSubmit={handleReviewSubmit} className="space-y-3 font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Your Name</label>
                    <input
                      type="text"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Zainab Bibi"
                      className="w-full bg-black text-xs text-white placeholder-gray-600 px-3 py-2 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Rating Score</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full bg-black text-xs text-white px-3 py-2 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Comments</label>
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Tell us what you smell..."
                      rows={3}
                      className="w-full bg-black text-xs text-white placeholder-gray-600 px-3 py-2 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-gold-400 hover:bg-gold-300 text-black text-[10px] font-bold uppercase tracking-widest rounded-none transition-colors cursor-pointer"
                  >
                    Submit Scent Review
                  </button>
                </form>

                {reviewSuccess && (
                  <p className="text-emerald-400 text-xs text-center font-semibold animate-pulse">
                    ✓ Splendid! Your verification review is simulated successfully.
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Related Products Panel */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-gold-500/5 pt-16">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">YOU MAY ALSO ADORE</span>
            <h2 className="text-2xl font-display text-white font-bold tracking-wider">Related Scents</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlistIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={(prod, sz, ev) => onAddToCart(prod, sz, 1, ev)}
                onBuyNow={onBuyNow}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products Panel */}
      {recentlyViewed.length > 1 && (
        <section className="mt-24 border-t border-gold-400/10 pt-16">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">YOUR RECENT EXPLORATIONS</span>
            <h2 className="text-2xl font-display text-white font-bold tracking-wider">Recently Viewed</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
            {recentlyViewed
              .filter(p => p.id !== product.id)
              .slice(0, 5)
              .map(p => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="group cursor-pointer bg-[#0A0A0A] hover:bg-[#121212] border border-gold-400/10 hover:border-gold-400/30 p-3 rounded-none transition-all"
                  id={`recent-view-card-${p.id}`}
                >
                  <div className="aspect-square bg-black overflow-hidden rounded-none mb-3">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <h4 className="text-white text-xs font-semibold tracking-wide font-display group-hover:text-gold-400 transition-colors">{p.name}</h4>
                  <p className="text-gold-400 text-[10px] font-mono mt-1">{formatPKR(p.price)}</p>
                </div>
              ))}
          </div>
        </section>
      )}

    </div>
  );
}
