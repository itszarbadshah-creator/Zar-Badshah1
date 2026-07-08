import React, { useState, useEffect } from 'react';
import { Truck, Check, Package, MapPin, Search, Calendar, ShieldAlert } from 'lucide-react';
import { formatPKR } from '../data/products';

interface OrderTrackingViewProps {
  initialOrderRef: string;
  savedOrderDetails: any | null;
}

export default function OrderTrackingView({
  initialOrderRef,
  savedOrderDetails
}: OrderTrackingViewProps) {
  
  const [searchRef, setSearchRef] = useState(initialOrderRef || '');
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [searchError, setSearchError] = useState('');

  // Default simulated past orders so users can play with tracking even without completing a new purchase!
  const mockOrders: Record<string, any> = {
    'ZP-78241': {
      orderId: 'ZP-78241',
      items: [
        { name: 'White Oud', size: '50ml', quantity: 1, price: 3850 },
        { name: 'Dream', size: '100ml', quantity: 1, price: 6000 }
      ],
      customerName: 'Ahmad Bilal',
      phone: '03331234567',
      address: 'Phase 5, DHA, Lahore',
      paymentMethod: 'cod',
      subtotal: 9850,
      discount: 1000,
      total: 8850,
      date: 'July 05, 2026',
      status: 'In Transit',
      courier: 'Leopards Courier',
      trackingNo: 'LEO-9824112'
    },
    'ZP-10492': {
      orderId: 'ZP-10492',
      items: [
        { name: 'Laila', size: '50ml', quantity: 1, price: 3450 }
      ],
      customerName: 'Ayesha Malik',
      phone: '03217654321',
      address: 'Clifton Block 4, Karachi',
      paymentMethod: 'easypaisa',
      subtotal: 3450,
      discount: 0,
      total: 3450,
      date: 'July 02, 2026',
      status: 'Delivered',
      courier: 'TCS Pakistan',
      trackingNo: 'TCS-1049288'
    }
  };

  useEffect(() => {
    if (savedOrderDetails) {
      setActiveOrder(savedOrderDetails);
      setSearchRef(savedOrderDetails.orderId);
    } else if (initialOrderRef && mockOrders[initialOrderRef]) {
      setActiveOrder(mockOrders[initialOrderRef]);
    }
  }, [initialOrderRef, savedOrderDetails]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setActiveOrder(null);

    const ref = searchRef.toUpperCase().trim();
    if (!ref) return;

    if (savedOrderDetails && savedOrderDetails.orderId === ref) {
      setActiveOrder(savedOrderDetails);
    } else if (mockOrders[ref]) {
      setActiveOrder(mockOrders[ref]);
    } else {
      setSearchError('Order reference not found. Try testing with ZP-78241 or ZP-10492.');
    }
  };

  // Helper to get active step index
  const getActiveStepIndex = (status: string): number => {
    switch (status) {
      case 'Order Received': return 0;
      case 'Processed': return 1;
      case 'In Transit': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  // Timeline step descriptions
  const steps = [
    { title: 'Order Registered', desc: 'Scent request received and queued for compilation.' },
    { title: 'Formulation Verified', desc: 'Liquids checked, packaged in thick frosted glass.' },
    { title: 'Dispatched (Logistics)', desc: 'Handed over securely to elite courier partners.' },
    { title: 'Delivered', desc: 'Parcel received elegantly at your doorstep.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-300" id="order-tracking-view-container">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-[10px] text-gold-400 font-bold uppercase tracking-[0.35em] block">MONITOR DISPATCH</span>
        <h1 className="text-3xl font-display font-bold text-white tracking-wider">Royal Order Tracking</h1>
        <p className="text-gray-500 text-xs font-sans">
          Enter your unique order identifier (e.g., ZP-78241) to monitor packaging, formulation, and dispatch progress.
        </p>
        <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4" />
      </div>

      {/* Search Input Card */}
      <div className="bg-[#0A0A0A] border border-gold-400/20 rounded-none p-6 mb-10 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2 font-sans">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              placeholder="ZP-78241 or ZP-10492"
              className="w-full bg-black text-xs text-white placeholder-gray-600 pl-10 pr-4 py-3 rounded-none border border-gold-400/20 focus:border-gold-400/50 outline-none uppercase font-mono"
              required
              id="order-tracking-input"
            />
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-gold-400 hover:bg-gold-300 text-black text-xs font-bold uppercase tracking-widest rounded-none transition-colors cursor-pointer"
            id="order-tracking-search-submit"
          >
            Track
          </button>
        </form>

        {searchError && (
          <p className="text-rose-400 text-[10px] mt-3 text-center font-sans">{searchError}</p>
        )}

        {!activeOrder && !searchError && (
          <p className="text-gray-550 text-[10px] mt-3 text-center font-sans">
            Quick demo references: <strong className="text-gold-400">ZP-78241</strong> (In Transit) or <strong className="text-gold-400">ZP-10492</strong> (Delivered).
          </p>
        )}
      </div>

      {/* ACTIVE ORDER SUMMARY AND STATUS TRACKER DISPLAY */}
      {activeOrder && (
        <div className="space-y-8 animate-in fade-in duration-300" id="order-tracking-details-panel">
          
          {/* Summary Banner */}
          <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left font-sans">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Active Reference</span>
              <p className="text-white font-mono font-bold text-sm">{activeOrder.orderId}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Current Scent Status</span>
              <p className="text-gold-400 font-bold text-sm uppercase tracking-wide">{activeOrder.status}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Courier / Dispatch Partner</span>
              <p className="text-white font-semibold text-sm">
                {activeOrder.courier || 'Pending Logistics Assignment'}
              </p>
              {activeOrder.trackingNo && (
                <span className="text-[10px] text-gray-500 font-mono">No: {activeOrder.trackingNo}</span>
              )}
            </div>
          </div>

          {/* Glowing Milestones Timeline */}
          <div className="bg-[#0A0A0A] border border-gold-400/20 p-8 rounded-none relative overflow-hidden">
            <h3 className="text-white font-display text-sm font-bold uppercase tracking-wider mb-8">Dissemination Milestones</h3>
            
            <div className="relative font-sans space-y-8 pl-8 border-l border-gold-400/20" id="tracking-timeline-milestones">
              {steps.map((step, idx) => {
                const activeIndex = getActiveStepIndex(activeOrder.status);
                const isCompleted = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div key={idx} className="relative" id={`timeline-step-${idx}`}>
                    {/* Node Dot icon indicator */}
                    <div className={`absolute -left-[41px] top-0.5 w-6 h-6 rounded-none flex items-center justify-center border transition-all ${
                      isCompleted 
                        ? 'bg-gold-400 border-gold-400 text-black shadow-[0_0_12px_rgba(212,175,55,0.4)]' 
                        : 'bg-black border-gold-400/20 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="text-[9px] font-bold font-mono">{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Title & Desc */}
                    <div className="space-y-1 text-left">
                      <h4 className={`text-xs sm:text-sm font-bold tracking-wide uppercase transition-colors ${
                        isCurrent ? 'text-gold-400 font-extrabold' : isCompleted ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.title} {isCurrent && '⚜ (Current Phase)'}
                      </h4>
                      <p className={`text-xs leading-relaxed max-w-xl transition-colors ${
                        isCompleted ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Purchased Items List */}
          <div className="p-6 bg-[#0A0A0A] border border-gold-400/20 rounded-none space-y-4 font-sans text-xs">
            <h3 className="text-white font-display text-sm font-bold uppercase tracking-wider border-b border-gold-400/15 pb-3">Scent Items Packed</h3>
            
            <div className="space-y-3">
              {activeOrder.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <p className="text-white font-medium">{item.name}</p>
                    <span className="text-[9px] text-gray-550 uppercase">Size: {item.size} | Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono text-gray-400 font-bold">{formatPKR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gold-400/15 pt-4 flex justify-between text-white font-semibold text-xs">
              <span>Grand Total</span>
              <span className="text-gold-300 font-mono font-bold">{formatPKR(activeOrder.total)}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
