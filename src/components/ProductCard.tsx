import React from 'react';
import { Heart, ShoppingBag, Zap, Award } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../data/products';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, selectedSize: string, e: React.MouseEvent) => void;
  onSelect: (productId: string) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelect
}: ProductCardProps) {
  
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      onClick={() => onSelect(product.id)}
      className="group relative bg-[#0A0A0A] border border-gold-400/20 rounded-none overflow-hidden hover:border-gold-400/60 transition-all duration-300 shadow-2xl hover:shadow-[0_12px_32px_rgba(212,175,55,0.1)] flex flex-col h-full cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Badge container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-gold-400 text-black text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-none flex items-center gap-1 shadow-md">
            <Award className="w-3 h-3" /> BESTSELLER
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-rose-950/90 text-rose-200 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-none shadow-md border border-rose-800/30">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => onToggleWishlist(product, e)}
        className="absolute top-3 right-3 z-10 p-2 rounded-none bg-black/80 hover:bg-black/90 border border-gold-400/20 hover:border-gold-400/60 text-gray-400 hover:text-gold-400 transition-all duration-300"
        aria-label="Toggle Wishlist"
        id={`product-card-wishlist-toggle-${product.id}`}
      >
        <Heart className={`w-4 h-4 transition-all duration-300 ${isWishlisted ? 'fill-gold-400 text-gold-400' : ''}`} />
      </button>

      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-black flex items-center justify-center border-b border-gold-400/10">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          id={`product-card-image-${product.id}`}
        />
        {/* Subtle hover overlay shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-[10px] text-gold-400 tracking-[0.2em] uppercase font-semibold font-display">View details & select ⚜</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1">
        {/* Collection details */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gold-400 tracking-[0.2em] font-medium uppercase">
            {product.collection === 'men' ? "Men's Collection" : product.collection === 'women' ? "Women's Collection" : 'Unisex Scent'}
          </span>
          <span className="text-[9px] text-gray-500 tracking-wider font-mono">
            {product.longevity}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-white font-display text-base tracking-wide font-semibold group-hover:text-gold-400 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed flex-1 font-sans">
          {product.shortDescription}
        </p>

        {/* Fragrance Intensity Ribbon */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[9px] text-gray-400 bg-black border border-gold-400/10 px-2 py-0.5 rounded-none font-mono">
            Intensity: {product.intensity}
          </span>
        </div>

        {/* Prices and Action Row */}
        <div className="mt-5 pt-4 border-t border-gold-400/10 flex flex-col gap-3">
          
          {/* Price details */}
          <div className="flex items-baseline justify-between">
            <span className="text-gold-400 font-semibold font-display text-base">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-600 line-through text-xs font-mono ml-2">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Add to Cart */}
            <button
              onClick={(e) => onAddToCart(product, product.sizes[0], e)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-black hover:bg-neutral-900 border border-gold-400/20 hover:border-gold-400/60 text-gray-300 hover:text-white rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              id={`quick-add-${product.id}`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
              <span>Add</span>
            </button>

            {/* Buy Now */}
            <button
              onClick={(e) => onBuyNow(product, product.sizes[0], e)}
              className="flex items-center justify-center gap-1.5 py-2 px-2 bg-gold-400 hover:bg-gold-300 text-black rounded-none text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
              id={`quick-buy-${product.id}`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
