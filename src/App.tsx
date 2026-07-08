import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId, Product, CartItem, WishlistItem } from './types';
import { products } from './data/products';

// Import our modular pages/views
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import FaqView from './components/FaqView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderTrackingView from './components/OrderTrackingView';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Filtering & Search states transferred to Shop
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<'men' | 'women' | 'unisex' | null>(null);

  // Cart & Wishlist State (loaded from localStorage on mount)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  
  // Checkout & Coupon context state
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  
  // Order tracking persistence state
  const [trackingReference, setTrackingReference] = useState<string>('');
  const [savedOrderDetails, setSavedOrderDetails] = useState<any | null>(null);

  // Recently Viewed Scent Items state
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Initialize storage items
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('zarbadshah_cart');
      const storedWish = localStorage.getItem('zarbadshah_wishlist');
      const storedRecent = localStorage.getItem('zarbadshah_recent');

      if (storedCart) setCartItems(JSON.parse(storedCart));
      if (storedWish) setWishlistIds(JSON.parse(storedWish));
      
      if (storedRecent) {
        const ids: string[] = JSON.parse(storedRecent);
        const mapped = ids
          .map(id => products.find(p => p.id === id))
          .filter((p): p is Product => !!p);
        setRecentlyViewed(mapped);
      }
    } catch (e) {
      console.error('Failed to load local storage configurations', e);
    }
  }, []);

  // Sync states to storage on edits
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('zarbadshah_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWish: string[]) => {
    localStorage.setItem('zarbadshah_wishlist', JSON.stringify(updatedWish));
  };

  // Navigating routing helper
  const handleNavigate = (page: PageId) => {
    // Reset secondary filters unless clicking collection links
    if (page === 'men' || page === 'women' || page === 'unisex') {
      setSelectedCollection(page);
      setActivePage('shop');
    } else {
      setSelectedCollection(null);
      setSearchQuery('');
      setActivePage(page);
    }
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handling click on a specific product
  const handleSelectProduct = (productId: string) => {
    if (productId) {
      setSelectedProductId(productId);
      setActivePage('product-detail');
    } else {
      setSelectedProductId(null);
      setActivePage('shop');
    }
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (wishlistIds.includes(product.id)) {
      updated = wishlistIds.filter(id => id !== product.id);
    } else {
      updated = [...wishlistIds, product.id];
    }
    setWishlistIds(updated);
    saveWishlistToStorage(updated);
  };

  const handleRemoveFromWishlist = (product: Product) => {
    const updated = wishlistIds.filter(id => id !== product.id);
    setWishlistIds(updated);
    saveWishlistToStorage(updated);
  };

  // Cart actions
  const handleAddToCart = (product: Product, selectedSize: string, quantity: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = [...prev];
        updated[existingIdx].quantity += quantity;
      } else {
        updated = [...prev, { product, selectedSize, quantity }];
      }

      saveCartToStorage(updated);
      return updated;
    });

    // Navigate to Cart immediately to review purchase
    setActivePage('cart');
  };

  const handleBuyNow = (product: Product, selectedSize: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Add to cart first
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = [...prev];
        updated[existingIdx].quantity = Math.max(updated[existingIdx].quantity, 1);
      } else {
        updated = [...prev, { product, selectedSize, quantity: 1 }];
      }

      saveCartToStorage(updated);
      return updated;
    });

    // Navigate directly to checkout
    setActivePage('checkout');
  };

  const handleUpdateCartQuantity = (product: Product, size: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(product, size);
      return;
    }

    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.product.id === product.id && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      });
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const updated = prev.filter(
        item => !(item.product.id === product.id && item.selectedSize === size)
      );
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    saveCartToStorage([]);
    setAppliedCouponCode(null);
    setDiscountAmount(0);
  };

  // Coupon handling from Cart to Checkout
  const handleCheckoutTrigger = (couponCode: string | null, discountVal: number) => {
    setAppliedCouponCode(couponCode);
    setDiscountAmount(discountVal);
    setActivePage('checkout');
  };

  // Order tracking setups on successful checkout submission
  const handleSetOrderTrackingReference = (orderRef: string, orderDetails: any) => {
    setTrackingReference(orderRef);
    setSavedOrderDetails(orderDetails);
  };

  // Registering recently viewed items
  const handleAddRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8); // Store last 8 items
      
      const ids = updated.map(p => p.id);
      localStorage.setItem('zarbadshah_recent', JSON.stringify(ids));
      return updated;
    });
  };

  const handleNavbarSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCollection(null);
    setActivePage('shop');
  };

  // Map product IDs to full WishlistItem representation
  const wishlistItems: WishlistItem[] = wishlistIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p)
    .map(product => ({ product }));

  // Dynamic route dispatcher
  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomeView
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(prod, sz, ev) => handleAddToCart(prod, sz, 1, ev)}
            onBuyNow={handleBuyNow}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
      case 'shop':
        return (
          <ShopView
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(prod, sz, ev) => handleAddToCart(prod, sz, 1, ev)}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            initialCollection={selectedCollection}
            initialSearchQuery={searchQuery}
            onNavigate={handleNavigate}
          />
        );
      case 'product-detail':
        const matchedProduct = products.find(p => p.id === selectedProductId) || products[0];
        return (
          <ProductDetailView
            product={matchedProduct}
            allProducts={products}
            wishlistIds={wishlistIds}
            recentlyViewed={recentlyViewed}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onAddRecentlyViewed={handleAddRecentlyViewed}
          />
        );
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView />;
      case 'faqs':
        return <FaqView />;
      case 'wishlist':
      case 'cart':
        return (
          <CartView
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onCheckoutTrigger={handleCheckoutTrigger}
          />
        );
      case 'checkout':
        return (
          <CheckoutView
            cartItems={cartItems}
            appliedCouponCode={appliedCouponCode}
            discountAmount={discountAmount}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onSetOrderTrackingReference={handleSetOrderTrackingReference}
          />
        );
      case 'order-tracking':
        return (
          <OrderTrackingView
            initialOrderRef={trackingReference}
            savedOrderDetails={savedOrderDetails}
          />
        );
      default:
        return (
          <HomeView
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(prod, sz, ev) => handleAddToCart(prod, sz, 1, ev)}
            onBuyNow={handleBuyNow}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        );
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-gold-500/30 selection:text-white" id="zarbadshah-application-shell">
      
      {/* Premium Translucent Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onSearch={handleNavbarSearch}
      />

      {/* Main Screen Content with micro fade animations on route shifts */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (selectedProductId || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            id="scent-main-stage"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent floating WhatsApp chat trigger */}
      <WhatsAppButton />

      {/* Scent Footer information panel */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
