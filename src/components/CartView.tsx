import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, Trash2, ArrowRight, Sparkles, Tag, ShieldCheck, Minus, Plus } from 'lucide-react';
import { CartItem, WishlistItem, Product, PageId } from '../types';
import { coupons, formatPKR } from '../data/products';

interface CartViewProps {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  onUpdateCartQuantity: (product: Product, size: string, quantity: number) => void;
  onRemoveFromCart: (product: Product, size: string) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number, e: React.MouseEvent) => void;
  onNavigate: (page: PageId) => void;
  onSelectProduct: (productId: string) => void;
  onCheckoutTrigger: (appliedCoupon: string | null, discountValue: number) => void;
}

export default function CartView({
  cartItems,
  wishlistItems,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onAddToCart,
  onNavigate,
  onSelectProduct,
  onCheckoutTrigger
}: CartViewProps) {
  
  // Coupon input states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupons[0] | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Calculate Subtotal (price varies by size, e.g. 100ml is 1.6x price)
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const sizeMultiplier = item.selectedSize === '100ml' ? 1.6 : 1.0;
      return acc + (item.product.price * sizeMultiplier * item.quantity);
    }, 0);
  }, [cartItems]);

  // Apply discount coupon simulation
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    const code = couponInput.toUpperCase().trim();
    if (!code) return;

    const found = coupons.find(c => c.code === code);
    if (!found) {
      setCouponError('Invalid coupon code. Try ZARBADSHAH10 or WELCOME5.');
      setAppliedCoupon(null);
      return;
    }

    if (subtotal < found.minPurchase) {
      setCouponError(`Min purchase of Rs. ${found.minPurchase.toLocaleString()} required for this coupon.`);
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(found);
    setCouponSuccess(`✓ Coupon ${found.code} applied successfully! (${found.discountPercent}% OFF)`);
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  // Compute discount amount
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
  }, [subtotal, appliedCoupon]);

  const totalAmount = subtotal - discountAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-300" id="cart-view-container">
      
      {/* 1. SHOPPING CART VIEW */}
      <div className="mb-20" id="active-shopping-cart-section">
        <div className="border-b border-gold-400/10 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">YOUR BAG</span>
            <h1 className="text-3xl font-display font-bold text-white tracking-wider">Shopping Cart</h1>
          </div>
          <span className="text-xs text-gray-400 font-sans bg-neutral-900 border border-gold-400/20 px-3 py-1.5 rounded-none">
            {cartItems.length} Scent Items Added
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Itemized list (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const sizeMultiplier = item.selectedSize === '100ml' ? 1.6 : 1.0;
                const itemUnitPrice = Math.round(item.product.price * sizeMultiplier);
                const itemTotalPrice = itemUnitPrice * item.quantity;

                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-4 sm:p-5 bg-[#0A0A0A] border border-gold-400/20 hover:border-gold-400/40 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                    id={`cart-item-row-${item.product.id}-${item.selectedSize}`}
                  >
                    
                    {/* Item details */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-none overflow-hidden border border-gold-400/20 flex-shrink-0 cursor-pointer" onClick={() => onSelectProduct(item.product.id)}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h3 
                          onClick={() => onSelectProduct(item.product.id)}
                          className="text-white font-display text-sm sm:text-base font-semibold hover:text-gold-400 transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                        <span className="text-[10px] text-gold-400 tracking-wider font-mono font-medium block mt-1 uppercase">
                          Size: {item.selectedSize} | {item.product.collection}'s
                        </span>
                        <p className="text-[11px] text-gray-500 mt-1 font-mono">{formatPKR(itemUnitPrice)} each</p>
                      </div>
                    </div>

                    {/* Quantity controls & prices */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gold-400/10">
                      
                      {/* Quantity switcher */}
                      <div className="flex items-center bg-black border border-gold-400/20 rounded-none">
                        <button
                          onClick={() => onUpdateCartQuantity(item.product, item.selectedSize, item.quantity - 1)}
                          className="p-1.5 text-gray-500 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateCartQuantity(item.product, item.selectedSize, item.quantity + 1)}
                          className="p-1.5 text-gray-500 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total price */}
                      <div className="text-right">
                        <p className="text-gold-300 font-bold font-mono text-sm sm:text-base">{formatPKR(itemTotalPrice)}</p>
                      </div>

                      {/* Delete item button */}
                      <button
                        onClick={() => onRemoveFromCart(item.product, item.selectedSize)}
                        className="p-2 text-gray-550 hover:text-rose-400 rounded-none hover:bg-rose-500/5 transition-all"
                        aria-label="Remove item from cart"
                        id={`cart-delete-btn-${item.product.id}-${item.selectedSize}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

            {/* Right side: Receipt Summary & Checkout triggers (lg:col-span-4) */}
            <div className="lg:col-span-4 p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-6">
              
              <h3 className="text-white font-display text-sm font-bold uppercase tracking-wider border-b border-gold-400/10 pb-3">Order Summary</h3>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Cart Subtotal</span>
                  <span className="font-mono text-white font-medium">{formatPKR(subtotal)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Coupon: {appliedCoupon.code} ({appliedCoupon.discountPercent}%)
                    </span>
                    <span className="font-mono font-medium">- {formatPKR(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-400">
                  <span>Packaging & Shipping</span>
                  <span className="text-emerald-400 uppercase font-bold tracking-widest text-[9px]">FREE DELIVERY</span>
                </div>

                <div className="border-t border-gold-400/10 pt-4 flex justify-between text-white font-semibold">
                  <span className="text-sm font-display uppercase tracking-wider">Estimated Total</span>
                  <span className="text-gold-300 font-mono text-base font-bold">{formatPKR(totalAmount)}</span>
                </div>
              </div>

              {/* Coupon input form */}
              <div className="pt-4 border-t border-gold-400/10">
                {appliedCoupon ? (
                  <div className="bg-emerald-950/10 border border-emerald-500/20 p-2.5 rounded-none flex items-center justify-between text-xs text-emerald-400">
                    <span className="font-sans font-medium">Applied: <strong>{appliedCoupon.code}</strong></span>
                    <button onClick={handleRemoveCoupon} className="text-gray-400 hover:text-white uppercase font-bold text-[9px] tracking-wider">Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 font-sans">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="COUPON (WELCOME5)"
                      className="bg-black text-[10px] text-white placeholder-gray-600 px-3 py-2 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none flex-1 font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 border border-gold-400/20 hover:border-gold-400/55 text-gold-300 text-[10px] uppercase font-bold tracking-wider rounded-none transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                
                {couponError && <p className="text-rose-400 text-[10px] mt-2 font-sans">{couponError}</p>}
                {couponSuccess && <p className="text-emerald-400 text-[10px] mt-2 font-sans">{couponSuccess}</p>}
              </div>

              {/* Secure Checkout trigger */}
              <div className="pt-2">
                <button
                  onClick={() => onCheckoutTrigger(appliedCoupon ? appliedCoupon.code : null, discountAmount)}
                  className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  id="cart-checkout-proceed-btn"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex justify-center items-center gap-1.5 text-[9px] text-gray-500 font-mono text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Secure Order Processing • Cash on Delivery</span>
              </div>

            </div>

          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-16 bg-[#0A0A0A] border border-dashed border-gold-400/20 rounded-none p-8 space-y-4" id="cart-empty-state">
            <ShoppingBag className="w-12 h-12 text-gold-400 mx-auto opacity-35 animate-bounce" />
            <h3 className="text-white font-display text-lg tracking-wide">Your Shopping Bag is Empty</h3>
            <p className="text-gray-400 text-xs max-w-sm mx-auto font-sans leading-relaxed">
              Explore our selection of premium, long-lasting fragrances and add your favorite majestic scent to the bag to start your journey.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-2.5 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>

      {/* 2. WISHLIST VIEW */}
      <div id="active-wishlist-section">
        <div className="border-b border-gold-400/10 pb-4 mb-8">
          <h2 className="text-2xl font-display font-bold text-white tracking-wider flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold-400" />
            <span>Scent Wishlist</span>
          </h2>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div 
                key={item.product.id}
                className="group relative bg-[#0A0A0A] border border-gold-400/20 rounded-none overflow-hidden hover:border-gold-400/40 transition-all flex flex-col h-full animate-in fade-in duration-300"
                id={`wishlist-card-${item.product.id}`}
              >
                {/* Delete button from Wishlist */}
                <button
                  onClick={() => onRemoveFromWishlist(item.product)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-none bg-black/85 hover:bg-rose-955 border border-gold-400/20 text-gray-500 hover:text-rose-400 transition-all"
                  aria-label="Remove from wishlist"
                  id={`wishlist-remove-${item.product.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Scent Image */}
                <div className="aspect-square bg-neutral-950 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(item.product.id)}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Scent Info */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[9px] text-gold-400 tracking-[0.2em] font-medium uppercase">{item.product.collection}'s Collection</span>
                  <h3 
                    onClick={() => onSelectProduct(item.product.id)}
                    className="text-white font-display text-sm font-semibold hover:text-gold-300 mt-1 cursor-pointer transition-colors"
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-gold-300 font-mono text-xs font-semibold mt-2">{formatPKR(item.product.price)}</p>

                  <div className="mt-4 pt-3 border-t border-gold-400/10">
                    <button
                      onClick={(e) => {
                        onAddToCart(item.product, item.product.sizes[0], 1, e);
                        onRemoveFromWishlist(item.product);
                      }}
                      className="w-full py-2 bg-neutral-900 hover:bg-gold-400 border border-gold-400/20 hover:border-gold-400 text-gray-300 hover:text-black text-[10px] font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="text-center py-12 bg-[#0A0A0A] border border-dashed border-gold-400/20 rounded-none p-6 text-gray-500" id="wishlist-empty-state">
            <Heart className="w-10 h-10 text-gold-400 mx-auto opacity-20 mb-3" />
            <p className="text-xs font-sans">You haven't earmarked any majestic scents for your wishlist yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
