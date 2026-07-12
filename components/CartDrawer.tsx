import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, Sparkles, MapPin, Phone, User, Mail, Ticket, ArrowLeft, CheckCircle } from 'lucide-react';
import { CartItem, MenuItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  menuItems,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onPlaceOrder,
  currentUser,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Checkout Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [recentOrderId, setRecentOrderId] = useState('');

  if (!isOpen) return null;

  // Resolve cart items with menu details
  const cartWithDetails = cart.map((item) => {
    const details = menuItems.find((m) => m.id === item.menuItemId);
    return {
      ...item,
      details,
    };
  }).filter((item) => item.details !== undefined) as (CartItem & { details: MenuItem })[];

  // Math Calculations
  const subtotal = cartWithDetails.reduce((sum, item) => sum + item.details.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const gst = subtotalAfterDiscount * 0.18; // 18% GST
  const deliveryCharge = subtotalAfterDiscount > 50 || subtotalAfterDiscount === 0 ? 0 : 5.00; // Waived above $50
  const total = subtotalAfterDiscount > 0 ? subtotalAfterDiscount + gst + deliveryCharge : 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = couponCode.trim().toUpperCase();
    if (normalized === 'ROYAL20') {
      setDiscountPercent(20);
      setAppliedCoupon('ROYAL20');
      setCouponError('');
    } else if (normalized === 'WELCOME10') {
      setDiscountPercent(10);
      setAppliedCoupon('WELCOME10');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "ROYAL20" or "WELCOME10".');
    }
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setAppliedCoupon('');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    // Generate a beautiful, unique tracking Order ID
    const customOrderId = `RS-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: customOrderId,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      deliveryAddress: address,
      items: cartWithDetails.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.details.name,
        quantity: item.quantity,
        price: item.details.price,
        isVeg: item.details.isVeg,
      })),
      subtotal,
      gst,
      deliveryCharge,
      total,
      couponApplied: appliedCoupon || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onPlaceOrder(newOrder);
    setRecentOrderId(customOrderId);
    setStep('success');
    onClearCart();
  };

  const handleResetDrawer = () => {
    setStep('cart');
    setName(currentUser?.name || '');
    setPhone('');
    setEmail(currentUser?.email || '');
    setAddress('');
    setInstructions('');
    handleRemoveCoupon();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={handleResetDrawer} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-gold/15 flex flex-col h-full shadow-2xl relative">
          {/* Header */}
          <div className="p-6 border-b border-gold/15 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gold">
              <ShoppingBag className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider">
                {step === 'cart' ? 'Your Shopping Bag' : step === 'checkout' ? 'Exquisite Checkout' : 'Order Celebrated'}
              </h3>
            </div>
            <button
              onClick={handleResetDrawer}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart View Step */}
          {step === 'cart' && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {cartWithDetails.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="p-4 bg-luxury-charcoal rounded-full border border-gold/10 text-white/30">
                    <ShoppingBag className="h-12 w-12" />
                  </div>
                  <p className="font-serif text-lg text-white font-semibold">Your bag is empty</p>
                  <p className="text-xs text-white/50 max-w-xs leading-relaxed">
                    Savor the authentic legacy of Royal Spice. Head to our menu and add delicious hand-roasted dishes to your feast.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 rounded bg-gold text-luxury-black font-semibold uppercase tracking-wider text-xs hover:bg-gold-dark transition-colors"
                  >
                    Browse Dishes
                  </button>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartWithDetails.map((item) => (
                      <div
                        key={item.menuItemId}
                        className="flex gap-4 bg-luxury-charcoal/30 p-3 rounded-lg border border-white/5 relative group"
                      >
                        {/* Image Thumbnail */}
                        <img
                          src={item.details.image}
                          alt={item.details.name}
                          className="w-16 h-16 object-cover rounded-md border border-white/10 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        {/* Details */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs sm:text-sm font-semibold text-white leading-tight">
                              {item.details.name}
                            </h4>
                            <span className="text-xs font-bold text-gold shrink-0">
                              ${(item.details.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/40">{item.details.subCategory}</p>

                          {/* Adjust Quantity Controls */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1.5 border border-white/10 rounded px-1.5 py-0.5 bg-luxury-black">
                              <button
                                onClick={() => onRemoveFromCart(item.menuItemId)}
                                className="text-white/40 hover:text-white text-[10px] px-1"
                              >
                                -
                              </button>
                              <span className="text-xs text-gold font-bold font-display px-1.5">{item.quantity}</span>
                              <button
                                onClick={() => onAddToCart(item.details)}
                                className="text-white/40 hover:text-white text-[10px] px-1"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                // Full remove
                                for (let i = 0; i < item.quantity; i++) {
                                  onRemoveFromCart(item.menuItemId);
                                }
                              }}
                              className="text-white/30 hover:text-rose-500 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary / Calculation Box */}
                  <div className="p-6 bg-[#0b0b0b] border-t border-gold/15 space-y-4 shrink-0">
                    {/* Coupon System */}
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code (ROYAL20)"
                          className="w-full bg-luxury-charcoal border border-gold/20 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold uppercase"
                        />
                        <Ticket className="absolute right-2.5 top-2 h-3.5 w-3.5 text-white/30" />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-gold hover:bg-gold-dark text-luxury-black font-semibold rounded text-xs transition-colors"
                      >
                        Apply
                      </button>
                    </form>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-[11px] bg-gold/10 border border-gold/25 p-2 rounded text-gold">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                          Coupon <strong>{appliedCoupon}</strong> Applied ({discountPercent}% Off)
                        </span>
                        <button onClick={handleRemoveCoupon} className="text-white hover:text-rose-500 font-bold text-xs px-1">
                          ✕
                        </button>
                      </div>
                    )}
                    {couponError && <p className="text-luxury-red text-[10px]">{couponError}</p>}

                    {/* Cost Breakdown */}
                    <div className="space-y-1.5 text-xs border-b border-white/5 pb-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Cart Subtotal</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-gold">
                          <span>Luxury Discount</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/60">GST (18% flat rate)</span>
                        <span className="text-white">${gst.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Delivery Service Charge</span>
                        <span className="text-white">
                          {deliveryCharge === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span> : `$${deliveryCharge.toFixed(2)}`}
                        </span>
                      </div>
                      {deliveryCharge > 0 && (
                        <p className="text-[10px] text-white/30 text-right">Add ${(50 - subtotalAfterDiscount).toFixed(2)} more for Free Delivery</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-1 font-serif text-base font-bold text-white">
                      <span>Total Amount</span>
                      <span className="gold-text-gradient text-lg">${total.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full py-3 bg-luxury-red hover:bg-luxury-red-dark text-white font-semibold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-luxury-red/25"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Proceed to Checkout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Checkout Form Step */}
          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="flex items-center space-x-1.5 text-xs text-gold hover:underline mb-4"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Return to Shopping Bag</span>
                </button>

                <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white border-b border-white/5 pb-2">
                  Delivery Details
                </h4>

                <div className="space-y-3.5 text-xs text-white/80">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-white/40 block">Your Noble Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Emperor Augustus"
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
                      />
                      <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-white/40 block">Contact Phone Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
                      />
                      <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-white/40 block">Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="augustus@palace.com"
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
                      />
                      <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-white/40 block">Delivery Address *</label>
                    <div className="relative">
                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Pristine Villa 42, Golden Heights, West Hill"
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
                    </div>
                  </div>

                  {/* Cooking/Delivery Instructions */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-white/40 block">Cooking / Rider Instructions</label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Please make the Paneer extra tender, leave at security gate."
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Cost Summary & Place Order */}
              <div className="p-6 bg-[#0b0b0b] border-t border-gold/15 space-y-4 shrink-0">
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>Placing Order For</span>
                  <span className="text-white font-bold">{cartWithDetails.length} items</span>
                </div>
                <div className="flex justify-between items-center text-base font-bold text-white">
                  <span>Total (Inc. Taxes & Delivery)</span>
                  <span className="gold-text-gradient">${total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold hover:bg-gold-dark text-luxury-black font-bold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Authorize Royal Feast (${total.toFixed(2)})</span>
                </button>
              </div>
            </form>
          )}

          {/* Success step */}
          {step === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 overflow-y-auto">
              <div className="p-4 bg-emerald-950/40 rounded-full border border-emerald-500/30 text-emerald-400 animate-bounce">
                <CheckCircle className="h-14 w-14" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">Culinary Order Dispatched!</h4>
                <p className="text-gold font-mono font-bold tracking-widest text-sm bg-luxury-charcoal px-3 py-1.5 rounded border border-gold/20 inline-block">
                  Order ID: {recentOrderId}
                </p>
              </div>
              <p className="text-xs text-white/60 max-w-xs leading-relaxed">
                Your order is currently registered in our royal ledger. Our master chefs have dry-roasted the spices and are preparing your meal.
              </p>
              <div className="p-4 bg-luxury-charcoal/50 rounded-lg border border-white/5 text-left w-full space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-white/40 block">Estimated Delivery</p>
                <p className="text-xs text-white font-semibold">30 - 45 Minutes (Express Hot Delivery)</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-1/4 animate-[progress_3s_infinite]" />
                </div>
              </div>

              <div className="space-y-2 w-full pt-4">
                <button
                  onClick={() => {
                    handleResetDrawer();
                    // Go to Order tracking page
                    setName('');
                  }}
                  className="w-full py-2.5 bg-gold text-luxury-black font-semibold uppercase tracking-wider text-xs rounded transition-colors"
                >
                  Track Live Progress
                </button>
                <button
                  onClick={handleResetDrawer}
                  className="w-full py-2.5 bg-transparent border border-white/20 hover:border-gold/50 text-white font-semibold uppercase tracking-wider text-xs rounded transition-all"
                >
                  Continue Dining
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
