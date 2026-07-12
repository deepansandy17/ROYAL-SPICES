import React, { useState } from 'react';
import { Search, MapPin, Phone, ShieldCheck, CheckCircle2, Truck, Sparkles, Clock, Map } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  orders: Order[];
}

export default function OrderTracking({ orders }: OrderTrackingProps) {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg('Please enter an Order ID.');
      return;
    }

    const order = orders.find((o) => o.id === cleanId);
    if (order) {
      setFoundOrder(order);
      setErrorMsg('');
    } else {
      setFoundOrder(null);
      setErrorMsg(`No active order found with ID "${cleanId}". Try "RS-100421" or "RS-100422".`);
    }
  };

  const handleLoadMock = (order: Order) => {
    setFoundOrder(order);
    setSearchId(order.id);
    setErrorMsg('');
  };

  // Stepper helper
  const getStepProgress = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Received':
        return 1;
      case 'Preparing':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = foundOrder ? getStepProgress(foundOrder.status) : 1;

  const timelineSteps = [
    { title: 'Order Received', desc: 'Scribes logged the feast recipe', icon: CheckCircle2 },
    { title: 'Preparing Feast', desc: 'Master chefs roasting the exotic spices', icon: Clock },
    { title: 'Out For Delivery', desc: 'Royal rider galloping to your coordinates', icon: Truck },
    { title: 'Delivered', desc: 'Feast laid out in pristine warm state', icon: ShieldCheck },
  ];

  return (
    <div id="order-tracking-container" className="py-24 bg-[#0e0e0e] text-white font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-luxury-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block">
            Express Sourcing
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
            Live Order Tracking
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Witness the real-time preparation of your culinary order. Enter your Order ID below or select an active dispatch to monitor progress.
          </p>
          <div className="h-[2px] w-16 bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Search and Active order selector list */}
          <div className="lg:col-span-5 space-y-8">
            {/* Search Input Box */}
            <form onSubmit={handleSearch} className="bg-luxury-charcoal/30 border border-gold/15 p-6 rounded-xl space-y-4">
              <label className="text-[10px] uppercase tracking-wider text-gold font-bold block">Enter Order Reference</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="e.g. RS-100421"
                  className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold pr-10 uppercase font-mono font-bold tracking-wider"
                />
                <button type="submit" className="absolute right-2 top-2 p-1 bg-gold hover:bg-gold-dark text-luxury-black rounded transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {errorMsg && <p className="text-luxury-red text-[10px]">{errorMsg}</p>}
            </form>

            {/* List Active Mock Orders */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-wider text-white/50 block font-bold">Your Active Dispatches</h4>
              <div className="space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => handleLoadMock(o)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      foundOrder?.id === o.id
                        ? 'bg-gold/10 border-gold/50 shadow-md'
                        : 'bg-luxury-charcoal/20 border-white/5 hover:border-gold/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">{o.id}</span>
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          o.status === 'Delivered' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-gold'
                        }`}>
                          {o.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">{o.customerName} • {o.items.length} dishes</p>
                    </div>
                    <span className="font-display font-extrabold text-gold text-xs">${o.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Order Tracker visual timeline, Detailed receipt, Mock map */}
          <div className="lg:col-span-7">
            {foundOrder ? (
              <div className="space-y-8 animate-[fade-in_0.4s_ease-out]" id="order-visual-tracking">
                {/* Visual Timeline Stepper */}
                <div className="bg-luxury-charcoal/20 border border-gold/15 p-6 rounded-2xl">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold">Active Tracking Status</span>
                      <h4 className="font-serif text-lg font-bold text-white mt-0.5">Order ID: {foundOrder.id}</h4>
                    </div>
                    <span className="text-xs text-white/40">Estimated: 30-45 mins</span>
                  </div>

                  {/* Vertical / Horizontal stepper */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                    {/* Horizontal connector line for MD+ screens */}
                    <div className="absolute top-5 left-10 right-10 h-[2px] bg-white/10 hidden md:block z-0" />

                    {timelineSteps.map((step, idx) => {
                      const IconComponent = step.icon;
                      const isCompleted = idx + 1 <= currentStep;
                      const isActive = idx + 1 === currentStep;

                      return (
                        <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center relative z-10">
                          {/* Circular Badge Icon */}
                          <div
                            className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? 'bg-gold border-gold text-luxury-black scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : isCompleted
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                                : 'bg-luxury-black border-white/10 text-white/30'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>

                          <div className="space-y-0.5">
                            <h5 className={`text-xs font-bold font-sans ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                              {step.title}
                            </h5>
                            <p className="text-[10px] text-white/50 leading-tight max-w-[150px] mx-auto md:block hidden">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Receipt Details Box */}
                <div className="bg-luxury-charcoal/20 border border-gold/10 p-6 rounded-2xl text-xs space-y-4">
                  <h4 className="font-serif text-sm font-semibold uppercase text-gold border-b border-white/10 pb-2">
                    Gourmet Feast Summary
                  </h4>

                  <div className="space-y-2 border-b border-white/5 pb-3">
                    {foundOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-white/80">
                        <span>{item.quantity}x <strong>{item.name}</strong></span>
                        <span className="font-display font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 font-sans border-b border-white/5 pb-3 text-white/60">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">${foundOrder.subtotal.toFixed(2)}</span>
                    </div>
                    {foundOrder.couponApplied && (
                      <div className="flex justify-between text-gold">
                        <span>Discount Applied ({foundOrder.couponApplied})</span>
                        <span>-${(foundOrder.subtotal * 0.20).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>GST (18% flat rate)</span>
                      <span className="text-white">${foundOrder.gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rider service fee</span>
                      <span className="text-white">
                        {foundOrder.deliveryCharge === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span> : `$${foundOrder.deliveryCharge.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1 text-sm font-bold text-white">
                    <span>Grand Total Paid</span>
                    <span className="gold-text-gradient font-display font-extrabold text-base">${foundOrder.total.toFixed(2)}</span>
                  </div>

                  {/* Delivery Location information */}
                  <div className="p-3 bg-luxury-black/30 rounded border border-white/5 text-[11px] space-y-2 text-white/70">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Coordinate Address:</strong> {foundOrder.deliveryAddress}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 border-t border-white/5 pt-2 mt-2">
                      <Phone className="h-4 w-4 text-gold shrink-0" />
                      <span>
                        <strong className="text-white font-sans">Contact phone:</strong> {foundOrder.customerPhone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mock GPS Map Route */}
                <div className="bg-luxury-charcoal/20 border border-gold/10 rounded-2xl overflow-hidden h-52 relative group">
                  {/* Background Mock Map Canvas */}
                  <div className="absolute inset-0 bg-[#161616] flex items-center justify-center pointer-events-none">
                    {/* SVG Mock Map Grid */}
                    <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1,5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      {/* Abstract route line */}
                      <path d="M 50 150 Q 150 50 250 160 T 450 80" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeDasharray="4,8" />
                      {/* Animated dash array pulse */}
                      <circle cx="250" cy="160" r="8" fill="#8B0000" stroke="#D4AF37" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Top bar info */}
                  <div className="absolute top-4 inset-x-4 flex justify-between items-center backdrop-blur-md bg-luxury-black/65 px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-[10px] uppercase font-bold text-white flex items-center gap-1">
                      <Map className="h-3.5 w-3.5 text-gold" /> GPS Route Dispatcher
                    </span>
                    <span className="text-[9px] bg-gold text-luxury-black uppercase tracking-widest px-2 py-0.5 rounded font-extrabold">Active</span>
                  </div>

                  {/* Bottom bar rider status */}
                  <div className="absolute bottom-4 inset-x-4 backdrop-blur-md bg-luxury-black/80 p-3 rounded-lg border border-white/5 flex justify-between items-center text-xs">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Rider Assigned</p>
                      <p className="font-bold text-white font-serif">Ahmad Bilal (Royal Courier)</p>
                    </div>
                    <a
                      href="tel:+15550192834"
                      className="px-3 py-1 bg-gold text-luxury-black font-extrabold uppercase text-[10px] rounded hover:bg-gold-dark transition-all flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" /> Dial
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 border border-white/5 rounded-2xl h-80 bg-luxury-charcoal/10">
                <div className="p-4 bg-luxury-charcoal rounded-full border border-gold/10 text-white/20">
                  <Truck className="h-10 w-10 animate-pulse" />
                </div>
                <p className="font-serif text-lg text-white font-semibold">Select an Order to Track</p>
                <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                  Enter your order reference inside the search console or tap any of your active dispatches to view live GPS status.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
