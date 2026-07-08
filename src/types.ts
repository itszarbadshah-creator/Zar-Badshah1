export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  collection: 'men' | 'women' | 'unisex';
  price: number; // in PKR
  originalPrice: number; // for showing sale/discount
  image: string;
  shortDescription: string;
  description: string;
  notes: FragranceNotes;
  sizes: string[]; // e.g., ['50ml', '100ml']
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  intensity: 'Subtle' | 'Moderate' | 'Intense';
  longevity: '4-6 Hours' | '6-8 Hours' | '8-12 Hours' | '12+ Hours';
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export type PageId = 'home' | 'shop' | 'men' | 'women' | 'unisex' | 'about' | 'contact' | 'faqs' | 'product-detail' | 'wishlist' | 'cart' | 'checkout' | 'order-tracking';
