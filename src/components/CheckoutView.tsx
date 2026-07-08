import React, { useState, useMemo } from 'react';
import { CreditCard, Truck, MessageSquare, Check, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { CartItem, Product, PageId } from '../types';
import { formatPKR } from '../data/products';
import Logo from './Logo';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedCouponCode: string | null;
  discountAmount: number;
  onClearCart: () => void;
  onNavigate: (page: PageId) => void;
  onSetOrderTrackingReference: (orderRef: string, orderDetails: any) => void;
}

export default function CheckoutView({
  cartItems,
  appliedCouponCode,
  discountAmount,
  onClearCart,
  onNavigate,
  onSetOrderTrackingReference
}: CheckoutViewProps) {
  
  // Billing form states
  const [billingName, setBillingName] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  
  // Payment methods selection
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'easypaisa' | 'jazzcash' | 'bank_transfer'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);

  // Math totals
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const sizeMultiplier = item.selectedSize === '100ml' ? 1.6 : 1.0;
      return acc + (item.product.price * sizeMultiplier * item.quantity);
    }, 0);
  }, [cartItems]);

  const finalTotal = subtotal - discountAmount;

  // Handle Order Placement
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingName || !billingPhone || !billingAddress || !billingCity) return;
    
    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Generate unique royal order reference
      const orderRef = 'ZP-' + Math.floor(10000 + Math.random() * 90000);
      
      const orderDetails = {
        orderId: orderRef,
        items: cartItems.map(item => ({
          name: item.product.name,
          size: item.selectedSize,
          quantity: item.quantity,
          price: Math.round(item.product.price * (item.selectedSize === '100ml' ? 1.6 : 1.0))
        })),
        customerName: billingName,
        phone: billingPhone,
        address: `${billingAddress}, ${billingCity}`,
        email: billingEmail,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        discount: discountAmount,
        total: finalTotal,
        date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Order Received'
      };

      setCreatedOrder(orderDetails);
      setIsSubmitting(false);
      
      // Save order detail in order tracking parent state
      onSetOrderTrackingReference(orderRef, orderDetails);

    }, 1500);
  };

  // Compose text-formatted order receipt for WhatsApp integration
  const handleWhatsAppRedirect = () => {
    if (!createdOrder) return;

    const phoneNumber = '+923001211872';
    
    // Formatting Receipt String
    let itemsText = '';
    createdOrder.items.forEach((item: any, i: number) => {
      itemsText += `${i + 1}. ${item.name} (${item.size}) x${item.quantity} - Rs. ${item.price.toLocaleString()}\n`;
    });

    const paymentLabel = 
      createdOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 
      createdOrder.paymentMethod === 'easypaisa' ? 'EasyPaisa Mobile' : 
      createdOrder.paymentMethod === 'jazzcash' ? 'JazzCash Mobile' : 'Bank Transfer';

    const message = 
`⚜ *ZARBADSHAH PERFUMES ORDER* ⚜
Reference: *${createdOrder.orderId}*
Date: ${createdOrder.date}

*CUSTOMER DETAILS:*
Name: ${createdOrder.customerName}
Phone: ${createdOrder.phone}
Address: ${createdOrder.address}

*FRAGRANCES ORDERED:*
${itemsText}
Subtotal: Rs. ${createdOrder.subtotal.toLocaleString()}
Discount: Rs. ${createdOrder.discount.toLocaleString()}
*Grand Total:* *Rs. ${createdOrder.total.toLocaleString()}*

*Payment Method:* ${paymentLabel}

Please verify my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber.replace(/[\s+]/g, '')}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleFinishAndClear = () => {
    onClearCart();
    onNavigate('order-tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-300" id="checkout-view-container">
      
      {!createdOrder ? (
        /* ACTIVE CHECKOUT FORM */
        <div>
          
          <div className="border-b border-gold-400/10 pb-6 mb-10 text-center sm:text-left">
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">SECURE GATEWAY</span>
            <h1 className="text-3xl font-display font-bold text-white tracking-wider">Checkout</h1>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto sm:mx-0 mt-4" />
          </div>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left side: Form fields & payment (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8 font-sans">
              
              {/* Billing Info Group */}
              <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-6">
                <h3 className="text-white font-display text-base font-bold tracking-wider flex items-center gap-2 border-b border-gold-400/10 pb-3">
                  <Truck className="w-5 h-5 text-gold-400" />
                  <span>1. Shipping & Billing Details</span>
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Recipient Full Name *</label>
                    <input
                      type="text"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      placeholder="e.g. Zain Ul Abideen"
                      className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value)}
                        placeholder="e.g. 03001234567"
                        className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                        required
                      />
                      <span className="text-[9px] text-gray-500 block">Crucial for delivery coordination and verification.</span>
                    </div>

                    {/* Email address */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        placeholder="e.g. zain@gmail.com"
                        className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Shipping Address */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Street Address *</label>
                      <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="House / Apartment #, Street Name, Area Name"
                        className="w-full bg-black text-xs text-white placeholder-gray-600 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                        required
                      />
                    </div>

                    {/* City selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">City *</label>
                      <input
                        type="text"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        placeholder="e.g. Lahore, Karachi"
                        className="w-full bg-black text-xs text-white placeholder-gray-650 px-3.5 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none"
                        required
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Payment Methods Group */}
              <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-6">
                <h3 className="text-white font-display text-base font-bold tracking-wider flex items-center gap-2 border-b border-gold-400/10 pb-3">
                  <CreditCard className="w-5 h-5 text-gold-400" />
                  <span>2. Select Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* COD */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border rounded-none cursor-pointer flex flex-col justify-between h-28 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                        : 'border-gold-400/20 bg-black hover:border-gold-400/50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider">Cash on Delivery</span>
                      <input type="radio" checked={paymentMethod === 'cod'} onChange={() => {}} className="accent-gold-450" />
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Pay directly in cash to the courier representative when your royal fragrances arrive at your doorstep.
                    </p>
                  </label>

                  {/* EasyPaisa */}
                  <label 
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-4 border rounded-none cursor-pointer flex flex-col justify-between h-28 transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                        : 'border-gold-400/20 bg-black hover:border-gold-400/50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">EasyPaisa Mobile</span>
                      <input type="radio" checked={paymentMethod === 'easypaisa'} onChange={() => {}} className="accent-gold-450" />
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Transfer directly to our corporate EasyPaisa mobile account prior to delivery. Details shown on success page.
                    </p>
                  </label>

                  {/* JazzCash */}
                  <label 
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-4 border rounded-none cursor-pointer flex flex-col justify-between h-28 transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                        : 'border-gold-400/20 bg-black hover:border-gold-400/50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-500">JazzCash Mobile</span>
                      <input type="radio" checked={paymentMethod === 'jazzcash'} onChange={() => {}} className="accent-gold-450" />
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Transfer directly to our corporate JazzCash mobile account. Safe and instant digital payment.
                    </p>
                  </label>

                  {/* Bank Transfer */}
                  <label 
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-4 border rounded-none cursor-pointer flex flex-col justify-between h-28 transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                        : 'border-gold-400/20 bg-black hover:border-gold-400/50 text-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-sans">Bank Transfer</span>
                      <input type="radio" checked={paymentMethod === 'bank_transfer'} onChange={() => {}} className="accent-gold-450" />
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Transfer through online banking (HBL/Alfalah) directly to our bank ledger account. Swift and secure.
                    </p>
                  </label>
                </div>

                {/* Simulated Bank/Mobile details if selected */}
                {paymentMethod !== 'cod' && (
                  <div className="p-4 bg-black border border-gold-400/20 rounded-none text-xs text-gray-400 leading-relaxed space-y-2 animate-in slide-in-from-top-2">
                    <span className="text-gold-400 text-[10px] font-bold uppercase tracking-wider block">⚜ CORPORATE ACCOUNT DETAILS FOR TRANSFERS:</span>
                    {paymentMethod === 'easypaisa' && (
                      <p>Title: <strong>Zarbadshah Perfumes</strong><br />EasyPaisa Mobile Account Number: <strong>0344-1211053</strong></p>
                    )}
                    {paymentMethod === 'jazzcash' && (
                      <p>Title: <strong>Zarbadshah Perfumes</strong><br />JazzCash Account Number: <strong>0300-1211872</strong></p>
                    )}
                    {paymentMethod === 'bank_transfer' && (
                      <p>Bank: <strong>Habib Bank Limited (HBL)</strong><br />Account Title: <strong>Zarbadshah Perfumes Corporate</strong><br />Account Number: <strong>1234-56789012-03</strong><br />IBAN: <strong>PK21 HABB 1234 5678 9012 03</strong></p>
                    )}
                    <span className="text-[9px] text-gray-600 block mt-1">Please take a screenshot of your transfer receipt and send it to our WhatsApp after order placement for instant verification!</span>
                  </div>
                )}

              </div>

            </div>

            {/* Right side: Itemized receipt review & submit trigger (lg:col-span-5) */}
            <div className="lg:col-span-5 p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-6 font-sans">
              
              <h3 className="text-white font-display text-sm font-bold uppercase tracking-wider border-b border-gold-400/10 pb-3">Review Order</h3>
              
              {/* Simple scrollbox listing items */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const sizeMultiplier = item.selectedSize === '100ml' ? 1.6 : 1.0;
                  const itemPrice = Math.round(item.product.price * sizeMultiplier);
                  return (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-none overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.product.name}</p>
                          <span className="text-[9px] text-gray-500 uppercase">{item.selectedSize} | x{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono text-gold-300 font-bold">{formatPKR(itemPrice * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Totals panel */}
              <div className="border-t border-gold-400/10 pt-4 space-y-3 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-white font-medium">{formatPKR(subtotal)}</span>
                </div>
                
                {appliedCouponCode && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> Coupon: {appliedCouponCode}
                    </span>
                    <span className="font-mono font-medium">- {formatPKR(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-400">
                  <span>Standard Shipping</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px]">FREE</span>
                </div>

                <div className="border-t border-gold-400/10 pt-4 flex justify-between text-white font-bold text-sm sm:text-base">
                  <span className="font-display uppercase tracking-wider">Order Total</span>
                  <span className="text-gold-300 font-mono font-bold">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {/* Place order Trigger button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold-400 hover:bg-gold-300 disabled:bg-neutral-800 disabled:text-gray-500 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  id="checkout-place-order-btn"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Place Secure Order</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-gray-500 text-center leading-relaxed font-sans">
                By placing your order, you agree to our 7-day hassle-free exchange policy. No credit card required.
              </p>

            </div>

          </form>

        </div>
      ) : (
        /* SUCCESS ORDER SCREEN */
        <div className="max-w-xl mx-auto p-8 sm:p-10 bg-[#0A0A0A] border border-gold-400/20 rounded-none shadow-2xl text-center space-y-6 font-sans relative" id="checkout-success-container">
          
          <div className="relative inline-block mb-4 animate-bounce">
            <div className="w-20 h-20 bg-gold-400/10 border border-gold-400/30 rounded-none flex items-center justify-center mx-auto relative">
              <Logo variant="emblem" size="xs" className="h-12 w-12" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-1 border border-black shadow-lg">
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
              </div>
            </div>
          </div>

          <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.3em] block">SPLENDID CHOICE!</span>
          
          <h2 className="text-2xl sm:text-3xl font-display text-white font-bold tracking-wider">
            Your Scent Order is Registered!
          </h2>

          <div className="bg-black/60 border border-gold-400/20 p-5 rounded-none text-xs text-gray-300 text-left space-y-3 font-sans">
            <p className="flex justify-between border-b border-gold-400/10 pb-2">
              <span className="text-gray-500 font-medium">Order Reference:</span>
              <strong className="text-white font-mono text-sm">{createdOrder.orderId}</strong>
            </p>
            <p className="flex justify-between border-b border-gold-400/10 pb-2">
              <span className="text-gray-500 font-medium">Recipient Name:</span>
              <span className="text-white font-medium">{createdOrder.customerName}</span>
            </p>
            <p className="flex justify-between border-b border-gold-400/10 pb-2">
              <span className="text-gray-500 font-medium">Grand Total:</span>
              <strong className="text-gold-300 font-mono text-sm">{formatPKR(createdOrder.total)}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500 font-medium">Estimated Arrival:</span>
              <span className="text-white font-medium">In 2 - 4 Working Days</span>
            </p>
          </div>

          {/* Prompt regarding manual WhatsApp click */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-none text-xs text-emerald-400 leading-relaxed space-y-2 text-left">
            <span className="font-semibold block text-[11px] uppercase tracking-wider text-white flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>FINALIZATION WITH WHATSAPP (RECOMMENDED)</span>
            </span>
            <p className="text-[11px] text-gray-300">
              In Pakistan, we highly recommend clicking the WhatsApp button below to instantly transmit your order receipt to our hotline <strong>(+92 300 1211872)</strong>. This guarantees priority verification and immediate next-day dispatch!
            </p>
          </div>

          {/* Action Row buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            
            {/* WhatsApp receipt submission */}
            <button
              onClick={handleWhatsAppRedirect}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-550 text-white text-xs font-bold uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer flex-1"
              id="checkout-whatsapp-redirect-btn"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit on WhatsApp</span>
            </button>

            {/* In-app Tracking panel */}
            <button
              onClick={handleFinishAndClear}
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-gold-400/20 hover:border-gold-400 text-gold-300 text-xs font-bold uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer flex-1"
              id="checkout-finish-and-track-btn"
            >
              <Truck className="w-4 h-4" />
              <span>Track Royal Order</span>
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
