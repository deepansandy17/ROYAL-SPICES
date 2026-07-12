import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Ticket,
  Percent,
  CheckCircle,
  Copy,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  PhoneCall,
  ArrowUp,
  Heart,
  ChevronRight,
  Clock,
  ShieldCheck,
  UtensilsCrossed,
  Info
} from 'lucide-react';
import { MenuItem, CartItem, TableReservation, Order, Review } from './types';
import { MENU_ITEMS } from './data/menu';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import MenuCard from './components/MenuCard';
import CartDrawer from './components/CartDrawer';
import ReservationForm from './components/ReservationForm';
import ReviewSection from './components/ReviewSection';
import GallerySection from './components/GallerySection';
import AdminDashboard from './components/AdminDashboard';
import AuthPages from './components/AuthPages';
import OrderTracking from './components/OrderTracking';

// PRE-LOADED MOCK REVIEWS FOR IMMERSIVE UX
const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Lady Clarissa Pemberton',
    rating: 5,
    text: 'A transcendent culinary experience! The Butter Chicken has a velvety depth I have never encountered outside of New Delhi. Absolute perfection.',
    date: 'Jun 12, 2026',
  },
  {
    id: 'rev-2',
    author: 'George Vance',
    rating: 5,
    text: 'Stunning luxury interiors paired with Michelin-caliber cuisine. The Paneer Butter Masala melted like butter. Saffron sweets are spectacular!',
    date: 'Jul 04, 2026',
  },
  {
    id: 'rev-3',
    author: 'Lord Arthur Pendleton',
    rating: 5,
    text: 'Secured a private mezzanine window alcove for our wedding anniversary. The service was impeccable, and the assigned table #12 had gorgeous candlelight. A 10/10 masterclass.',
    date: 'Jul 10, 2026',
  }
];

// PRE-LOADED MOCK RESERVATIONS FOR ADMIN
const INITIAL_RESERVATIONS: TableReservation[] = [
  {
    id: 'RES-993821',
    name: 'Duke of Buckingham',
    phone: '+44 7911 123456',
    email: 'duke@palace.co.uk',
    guestsCount: 6,
    date: '2026-07-15',
    time: '07:30 PM',
    specialRequest: 'Anniversary rose pedals scattered on table (Private Mezzanine Vault)',
    status: 'Confirmed',
    tableNumber: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: 'RES-993822',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 019-2834',
    email: 'sarah.j@email.com',
    guestsCount: 2,
    date: '2026-07-12',
    time: '01:00 PM',
    specialRequest: 'Seated at Quiet Fireplace Room',
    status: 'Confirmed',
    tableNumber: 4,
    createdAt: new Date().toISOString()
  }
];

// PRE-LOADED MOCK ORDERS FOR TRACKING & ADMIN
const INITIAL_ORDERS: Order[] = [
  {
    id: 'RS-100421',
    customerName: 'Marcus Aurelius',
    customerPhone: '+1 (555) 432-1098',
    customerEmail: 'marcus@philosophy.org',
    deliveryAddress: 'Temple Garden Villa 18, Rome heights',
    items: [
      { menuItemId: 'ind-nv-3', name: 'Butter Chicken', quantity: 2, price: 17.99, isVeg: false },
      { menuItemId: 'ind-veg-8', name: 'Garlic Naan', quantity: 3, price: 3.99, isVeg: true },
      { menuItemId: 'bev-2', name: 'Mango Lassi', quantity: 2, price: 4.99, isVeg: true }
    ],
    subtotal: 55.93,
    gst: 10.07,
    deliveryCharge: 0.00, // Waived above $50
    total: 66.00,
    status: 'Preparing',
    createdAt: new Date().toISOString()
  },
  {
    id: 'RS-100422',
    customerName: 'Empress Wu Zetian',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'wu@dynasty.cn',
    deliveryAddress: 'Royal Pagoda Court, Imperial Lane 1',
    items: [
      { menuItemId: 'chi-nv-3', name: 'Chilli Chicken', quantity: 1, price: 14.99, isVeg: false },
      { menuItemId: 'chi-veg-2', name: 'Veg Noodles', quantity: 2, price: 11.99, isVeg: true },
      { menuItemId: 'des-3', name: 'New York Cheesecake', quantity: 1, price: 9.99, isVeg: true }
    ],
    subtotal: 48.96,
    gst: 8.81,
    deliveryCharge: 5.00,
    total: 62.77,
    couponApplied: 'ROYAL20',
    status: 'Out for Delivery',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  // Navigation Routing Tab State ('home' | 'menu' | 'offers' | 'about' | 'gallery' | 'reservation' | 'contact' | 'admin' | 'tracking')
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Shared Data States
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);

  // Cart Local Persistence State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('royal_spice_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist Local Persistence State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('royal_spice_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Active User Account Authentication
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'user' | 'admin' } | null>(() => {
    const saved = localStorage.getItem('royal_spice_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Bookings state
  const [reservations, setReservations] = useState<TableReservation[]>(() => {
    const saved = localStorage.getItem('royal_spice_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('royal_spice_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('royal_spice_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // UI Control states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Filters inside Menu page
  const [menuSearch, setMenuSearch] = useState('');
  const [menuType, setMenuType] = useState<'All' | 'Veg' | 'Non-Veg' | 'Beverages' | 'Desserts'>('All');
  const [menuCuisine, setMenuCuisine] = useState<'All' | 'Indian' | 'Chinese' | 'Italian'>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [menuSpecialFilter, setMenuSpecialFilter] = useState(false);

  // Contact Form feedback
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState(false);

  // Newsletter email state (Top bar banner / sticky)
  const [hasDismissedPromo, setHasDismissedPromo] = useState(false);

  // Copy coupon codes visual feedback
  const [copiedCoupon, setCopiedCoupon] = useState('');

  // Local Storage synchronizers
  useEffect(() => {
    localStorage.setItem('royal_spice_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('royal_spice_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('royal_spice_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('royal_spice_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('royal_spice_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('royal_spice_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('royal_spice_user');
    }
  }, [currentUser]);

  // Back to Top Button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync hash links if accessed directly in review
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validTabs = ['home', 'menu', 'offers', 'about', 'gallery', 'reservation', 'contact', 'admin', 'tracking'];
      if (validTabs.includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash(); // initial trigger
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync window hash when state-tab updates
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    window.location.hash = `#/${tabId}`;
  };

  // CART MUTATIONS
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id);
      if (existing) {
        return prev.map((i) => (i.menuItemId === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { menuItemId: item.id, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.menuItemId === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.menuItemId === itemId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.menuItemId !== itemId);
    });
  };

  const handleClearCart = () => setCart([]);

  // WISHLIST MUTATIONS
  const handleToggleWishlist = (itemId: string) => {
    setWishlist((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  // AUTH MUTATIONS
  const handleLogin = (user: { name: string; email: string; role: 'user' | 'admin' }) => {
    setCurrentUser(user);
    // Sync Name/Email into reservation form automatically
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleTabChange('home');
  };

  // ADMIN METHODS
  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleUpdateReservation = (resId: string, status: 'Confirmed' | 'Cancelled') => {
    setReservations((prev) =>
      prev.map((res) => (res.id === resId ? { ...res, status } : res))
    );
  };

  const handleUpdateOrder = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // GUEST RESERVATION & ORDER CREATION HANDLERS
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Redirect to track page
    setCurrentTab('tracking');
    window.location.hash = '#/tracking';
  };

  const handleAddReservation = (newBooking: TableReservation) => {
    setReservations((prev) => [newBooking, ...prev]);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [...prev, newReview]);
  };

  // Scroll to Top action
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy coupon codes helper
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  // Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Please fill out all fields of the message.');
      return;
    }
    setContactStatus(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setContactStatus(false), 5000);
  };

  // Unique subcategories for filtering
  const subCategories = ['All', ...new Set(menuItems.map((item) => item.subCategory))];

  // Filtering Menu list
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          item.subCategory.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesType = menuType === 'All' ? true : item.category === menuType;
    const matchesCuisine = menuCuisine === 'All' ? true : item.cuisine === menuCuisine;
    const matchesSub = selectedSubCategory === 'All' ? true : item.subCategory === selectedSubCategory;
    const matchesSpecial = menuSpecialFilter ? item.isSpecial : true;

    return matchesSearch && matchesType && matchesCuisine && matchesSub && matchesSpecial;
  });

  return (
    <div className="min-h-screen bg-luxury-black text-white/90 selection:bg-gold selection:text-luxury-black font-sans relative flex flex-col justify-between">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      {!hasDismissedPromo && (
        <div id="top-announcement-banner" className="bg-gradient-to-r from-luxury-red to-luxury-red-dark text-white text-[11px] font-bold py-2.5 px-4 text-center relative z-[60] flex items-center justify-center gap-2 border-b border-gold/15">
          <span className="animate-pulse">✨</span>
          <span>GRAND INAUGURATION BANQUET: USE CODE <strong className="text-gold uppercase tracking-wider font-mono bg-luxury-black/40 px-2 py-0.5 rounded border border-gold/25">ROYAL20</strong> FOR 20% OFF ALL DISHES! FREE COURIER FOR FEASTS OVER $50.</span>
          <button
            onClick={() => setHasDismissedPromo(true)}
            className="text-white/60 hover:text-white font-bold ml-4 text-xs px-1.5 focus:outline-none"
            title="Dismiss Announcement"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 3. PRIMARY PAGE ROUTER BODY */}
      <main className="flex-grow pt-[73px]">
        {/* ================= TAB 1: HOME ================= */}
        {currentTab === 'home' && (
          <div className="space-y-0 animate-[fade-in_0.5s_ease-out]">
            {/* Full-Screen Hero Banner */}
            <Hero onNavigate={handleTabChange} onOpenCart={() => setIsCartOpen(true)} />

            {/* About Story summary section */}
            <AboutSection />

            {/* Categorized Food Specials Highlights */}
            <section className="py-24 bg-gradient-to-b from-luxury-black to-[#0b0b0b] relative border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
                    Chef Signatures
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
                    Today's Gastronomic Masterpieces
                  </h2>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                    Savor our highly coveted house treasures, cooked with precision and crowned with rare cold-pressed saffron threads.
                  </p>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="h-[1px] w-16 bg-gold/40"></div>
                    <div className="w-2 h-2 bg-gold rotate-45"></div>
                    <div className="h-[1px] w-16 bg-gold/40"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {menuItems.filter(i => i.isSpecial).slice(0, 3).map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      onRemoveFromCart={handleRemoveFromCart}
                      cartQuantity={cart.find((c) => c.menuItemId === item.id)?.quantity || 0}
                      isWishlisted={wishlist.includes(item.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>

                <div className="text-center pt-12">
                  <button
                    onClick={() => handleTabChange('menu')}
                    className="px-8 py-3 bg-transparent border border-gold hover:bg-gold hover:text-luxury-black text-gold text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300"
                  >
                    Browse Full 30+ Dish Menu
                  </button>
                </div>
              </div>
            </section>

            {/* Reviews list slider */}
            <ReviewSection reviews={reviews} onAddReview={handleAddReview} />
          </div>
        )}

        {/* ================= TAB 2: OUR MENU ================= */}
        {currentTab === 'menu' && (
          <div className="py-16 animate-[fade-in_0.4s_ease-out]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Header Title */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
                  Culinaires Royalty
                </span>
                <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
                  The Royal Spice Ledger
                </h2>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Browse through Indian slow-cooked claypots, sizzled Chinese woks, and rustic fire-baked Italian recipes. Filter by dietary types, cuisine origin, or search keyword.
                </p>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                  <div className="w-2 h-2 bg-gold rotate-45"></div>
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                </div>
              </div>

              {/* SEARCH & FILTERS BOX */}
              <div className="bg-luxury-charcoal/20 border border-gold/15 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-xs">
                {/* Search query */}
                <div className="space-y-1.5 md:col-span-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block font-semibold">Search Dish or Keyword</label>
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="e.g. Butter Chicken, Paneer, Naan..."
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold font-sans"
                  />
                </div>

                {/* Filter Diet Type */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block font-semibold">Diet Type</label>
                  <select
                    value={menuType}
                    onChange={(e) => setMenuType(e.target.value as any)}
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold font-sans"
                  >
                    <option value="All">All Diets</option>
                    <option value="Veg">Veg Selection</option>
                    <option value="Non-Veg">Non-Veg Feast</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Sweet Desserts</option>
                  </select>
                </div>

                {/* Filter Cuisine Origin */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block font-semibold">Cuisine Origin</label>
                  <select
                    value={menuCuisine}
                    onChange={(e) => setMenuCuisine(e.target.value as any)}
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold font-sans"
                  >
                    <option value="All">All Cuisines</option>
                    <option value="Indian">Indian Heritage</option>
                    <option value="Chinese">Sichuan Chinese</option>
                    <option value="Italian">Rustic Italian</option>
                  </select>
                </div>

                {/* SubCategory select */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block font-semibold">Sub Category</label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold font-sans"
                  >
                    {subCategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub === 'All' ? 'All Sub-Categories' : sub}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Specials Switch */}
                <div className="md:col-span-2 flex items-center justify-between border border-white/10 bg-luxury-charcoal/40 rounded px-3 py-2">
                  <span className="text-[11px] text-white/60">Chef Signatures</span>
                  <input
                    type="checkbox"
                    checked={menuSpecialFilter}
                    onChange={(e) => setMenuSpecialFilter(e.target.checked)}
                    className="accent-gold h-4 w-4 rounded"
                  />
                </div>
              </div>

              {/* SEARCH RESULTS COUNT */}
              <div className="flex justify-between items-center text-xs text-white/40">
                <p>Displaying {filteredMenuItems.length} premium creations</p>
                {(menuSearch || menuType !== 'All' || menuCuisine !== 'All' || selectedSubCategory !== 'All' || menuSpecialFilter) && (
                  <button
                    onClick={() => {
                      setMenuSearch('');
                      setMenuType('All');
                      setMenuCuisine('All');
                      setSelectedSubCategory('All');
                      setMenuSpecialFilter(false);
                    }}
                    className="text-gold hover:underline font-bold"
                  >
                    Reset Filter Queries
                  </button>
                )}
              </div>

              {/* DISH CARDS GRID */}
              {filteredMenuItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full border border-gold/10 flex items-center justify-center bg-luxury-charcoal/20 text-gold/35">
                    <Info className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">No royal spice matched your query</h4>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">Try typing another keyword, choosing a different cuisine origin, or resetting active selectors.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMenuItems.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      onRemoveFromCart={handleRemoveFromCart}
                      cartQuantity={cart.find((c) => c.menuItemId === item.id)?.quantity || 0}
                      isWishlisted={wishlist.includes(item.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SPECIAL OFFERS ================= */}
        {currentTab === 'offers' && (
          <div className="py-16 animate-[fade-in_0.4s_ease-out]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* Header Title */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
                  Feasts & Treasures
                </span>
                <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
                  Premium Deals & Vouchers
                </h2>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Redeem luxury discounts, celebratory festival coupons, and combo pairings crafted to elevate your banquet size.
                </p>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                  <div className="w-2 h-2 bg-gold rotate-45"></div>
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                </div>
              </div>

              {/* OFFERS VOUCHERS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Offer Card 1: Today's Special Saffron Combo */}
                <div className="border border-gold/20 bg-luxury-charcoal/20 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-gold/50 transition-colors">
                  <div className="absolute top-4 right-4 bg-luxury-red text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    Saffron Deal
                  </div>
                  <Percent className="h-10 w-10 text-gold" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">Paneer Butter Masala + Butter Naan</h3>
                    <p className="text-xs text-white/50">Purchase our classic cottage-cheese curry paired with hot-baked leavened claypot butter naan and claim flat 15% discount automatically!</p>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Bundled Value</span>
                      <strong className="text-gold text-lg">$16.50 <span className="text-xs line-through text-white/30">$19.48</span></strong>
                    </div>
                    <button
                      onClick={() => {
                        const pm = menuItems.find(i => i.id === 'ind-veg-1');
                        const bn = menuItems.find(i => i.id === 'ind-veg-7');
                        if (pm) handleAddToCart(pm);
                        if (bn) handleAddToCart(bn);
                        alert('Combo Saffron items added to your shopping bag!');
                      }}
                      className="px-3 py-1.5 bg-gold hover:bg-gold-dark text-luxury-black text-[10px] font-bold uppercase tracking-wider rounded"
                    >
                      Apply Deal
                    </button>
                  </div>
                </div>

                {/* Offer Card 2: Festival Promo Coupon */}
                <div className="border border-gold/20 bg-luxury-charcoal/20 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-gold/50 transition-colors">
                  <div className="absolute top-4 right-4 bg-emerald-950/60 text-emerald-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Grand Promo
                  </div>
                  <Ticket className="h-10 w-10 text-gold animate-bounce" style={{ animationDuration: '3s' }} />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">20% Flat Discount</h3>
                    <p className="text-xs text-white/50">Our premiere inaugural coupon. Enjoy flat 20% discount on all orders placed via digital cart. Simply copy code and apply in checkout drawer.</p>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Voucher Code</span>
                      <strong className="text-white font-mono text-sm tracking-wider uppercase bg-luxury-charcoal px-2 py-0.5 rounded border border-white/15">ROYAL20</strong>
                    </div>
                    <button
                      onClick={() => handleCopyCoupon('ROYAL20')}
                      className="px-3 py-1.5 bg-transparent border border-gold hover:bg-gold hover:text-luxury-black text-gold text-[10px] font-bold uppercase tracking-wider rounded transition-all"
                    >
                      {copiedCoupon === 'ROYAL20' ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                </div>

                {/* Offer Card 3: Free Mint Mojito pairing */}
                <div className="border border-gold/20 bg-luxury-charcoal/20 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-gold/50 transition-colors">
                  <div className="absolute top-4 right-4 bg-luxury-red text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    BOGO Deal
                  </div>
                  <Sparkles className="h-10 w-10 text-gold" />
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">Margherita Pizza + Mint Mojito</h3>
                    <p className="text-xs text-white/50">Order our hand-stretched, wood-fired Margherita Pizza topped with buffalo mozzarella, and claim a fresh cooling Mint Mojito completely free!</p>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block">Bundled Value</span>
                      <strong className="text-gold text-lg">$14.99 <span className="text-xs line-through text-white/30">$20.98</span></strong>
                    </div>
                    <button
                      onClick={() => {
                        const mp = menuItems.find(i => i.id === 'ita-1');
                        const mm = menuItems.find(i => i.id === 'bev-1');
                        if (mp) handleAddToCart(mp);
                        if (mm) handleAddToCart(mm);
                        alert('BOGO Margherita + Mojito added to your shopping bag!');
                      }}
                      className="px-3 py-1.5 bg-gold hover:bg-gold-dark text-luxury-black text-[10px] font-bold uppercase tracking-wider rounded"
                    >
                      Apply Deal
                    </button>
                  </div>
                </div>
              </div>

              {/* Wishlist / Favorites Subsection */}
              <div className="border border-gold/15 rounded-2xl bg-luxury-charcoal/10 p-8 space-y-6">
                <div className="flex items-center space-x-3 text-gold">
                  <Heart className="h-6 w-6 fill-current animate-pulse" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">Your Noble Favorites ({wishlist.length})</h3>
                </div>
                <p className="text-xs text-white/50 max-w-2xl leading-relaxed">
                  These are the exquisite creations you bookmarked inside our dining records. Head to the full menu and tap the heart icon on any card to catalog your favorites.
                </p>

                {wishlist.length === 0 ? (
                  <div className="p-6 text-center text-xs text-white/30 bg-luxury-charcoal/20 border border-white/5 rounded-xl">
                    You have not bookmarked any dishes yet. Browse our menu to begin your culinary curation.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {menuItems.filter(i => wishlist.includes(i.id)).map((item) => (
                      <div key={item.id} className="p-3 bg-luxury-charcoal rounded-xl border border-white/5 flex gap-3 items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded" referrerPolicy="no-referrer" />
                          <div>
                            <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-gold font-display font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="p-1.5 bg-gold text-luxury-black text-[10px] rounded hover:bg-gold-dark font-extrabold"
                          title="Add to bag"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: ABOUT US ================= */}
        {currentTab === 'about' && (
          <div className="animate-[fade-in_0.4s_ease-out]">
            <AboutSection />
          </div>
        )}

        {/* ================= TAB 5: GALLERY ================= */}
        {currentTab === 'gallery' && (
          <div className="animate-[fade-in_0.4s_ease-out]">
            <GallerySection />
          </div>
        )}

        {/* ================= TAB 6: BOOK TABLE ================= */}
        {currentTab === 'reservation' && (
          <div className="animate-[fade-in_0.4s_ease-out]">
            <ReservationForm onAddReservation={handleAddReservation} currentUser={currentUser} />
          </div>
        )}

        {/* ================= TAB 7: CONTACT US ================= */}
        {currentTab === 'contact' && (
          <div className="py-16 animate-[fade-in_0.4s_ease-out]" id="contact-us-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* Header Title */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
                  Concierge Service
                </span>
                <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
                  Reach Our Dining Pavilions
                </h2>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                  <div className="w-2 h-2 bg-gold rotate-45"></div>
                  <div className="h-[1px] w-16 bg-gold/40"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Column 1: Info */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold">Dining Headquarters</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Visit us at our central castle plaza or ring our dedicated reservations hotline to configure personalized seating layouts.
                    </p>
                  </div>

                  <div className="space-y-6 text-xs text-white/70">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Castle Pavilion Plaza</strong>
                        <p className="text-white/50 leading-relaxed mt-1">404 Golden Citadel Avenue, West Wing, Suite 800, New York, NY 10012</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Concierge Line</strong>
                        <p className="text-white/50 leading-relaxed mt-1">+1 (800) ROYAL-SPICE</p>
                        <p className="text-white/50 leading-relaxed">+1 (555) 019-2834 (Concierge Mobile)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-semibold">Electronic Mail</strong>
                        <p className="text-white/50 leading-relaxed mt-1">dining@royalspice.com</p>
                        <p className="text-white/50 leading-relaxed">events@royalspice.com (Custom Gatherings)</p>
                      </div>
                    </div>
                  </div>

                  {/* Social hours detail */}
                  <div className="p-6 rounded-xl border border-gold/10 bg-luxury-charcoal/20 space-y-2">
                    <h4 className="font-bold text-white text-xs">WhatsApp Direct Chat</h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Chat directly with our dining host to modify bookings, claim active carry-out orders, or request specific chef spices. Available 24/7.
                    </p>
                    <a
                      href="https://wa.me/15550192834"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-luxury-black font-extrabold text-[10px] rounded uppercase mt-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Column 2: Interactive Contact Message Form */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleContactSubmit} className="bg-luxury-charcoal/20 border border-gold/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                    <h3 className="font-serif text-lg font-bold text-gold">Draft An Electronic Dispatch</h3>

                    {contactStatus ? (
                      <div className="py-12 text-center space-y-4">
                        <div className="mx-auto h-12 w-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 animate-ping" />
                        </div>
                        <h4 className="font-serif text-base font-bold text-white">Message Dispatched!</h4>
                        <p className="text-xs text-white/50 max-w-xs mx-auto">Your message has been processed by our digital concierge. We shall contact you shortly.</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Your Full Name *</label>
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="Julius Caesar"
                              className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="caesar@senate.it"
                              className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 font-sans text-xs">
                          <label className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold">Message Body *</label>
                          <textarea
                            required
                            rows={4}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Detail your corporate banquet size, allergic details, or custom thali requests..."
                            className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-white focus:outline-none focus:border-gold"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-gold hover:bg-gold-dark text-luxury-black font-semibold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center space-x-1.5 transition-all duration-300"
                        >
                          <Send className="h-4 w-4" />
                          <span>Transmit Message</span>
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 8: ADMIN DASHBOARD ================= */}
        {currentTab === 'admin' && currentUser?.role === 'admin' && (
          <div className="animate-[fade-in_0.4s_ease-out]">
            <AdminDashboard
              menuItems={menuItems}
              onAddMenuItem={handleAddMenuItem}
              onUpdateMenuItem={(item) => setMenuItems(prev => prev.map(i => i.id === item.id ? item : i))}
              onDeleteMenuItem={handleDeleteMenuItem}
              reservations={reservations}
              onUpdateReservation={handleUpdateReservation}
              orders={orders}
              onUpdateOrder={handleUpdateOrder}
            />
          </div>
        )}

        {/* ================= TAB 9: LIVE ORDER TRACKING ================= */}
        {currentTab === 'tracking' && (
          <div className="animate-[fade-in_0.4s_ease-out]">
            <OrderTracking orders={orders} />
          </div>
        )}
      </main>

      {/* 4. FOOTER SECTION */}
      <Footer setCurrentTab={handleTabChange} />

      {/* 5. SHOPPING CART SLIDE-OUT DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        menuItems={menuItems}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
      />

      {/* 6. AUTHENTICATION (LOGIN / SIGNUP) MODAL DIALOG */}
      {isAuthOpen && (
        <AuthPages
          onLogin={handleLogin}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

      {/* 7. FLOATING SYSTEM BUTTONS - WhatsApp, Call, Back to Top */}
      <div id="floating-social-concierge" className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-40">
        {/* Call Now */}
        <a
          href="tel:+1800ROYALSPICE"
          className="p-3 bg-gold text-luxury-black rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:bg-gold-light hover:scale-110 transition-all flex items-center justify-center border border-gold-light shrink-0"
          title="Dial Concierge"
        >
          <PhoneCall className="h-5 w-5" />
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/15550192834"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-emerald-500 text-white rounded-full shadow-[0_4px_15px_rgba(16,185,129,0.4)] hover:bg-emerald-600 hover:scale-110 transition-all flex items-center justify-center border border-emerald-400 shrink-0"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="h-5 w-5" />
        </a>

        {/* Order Tracker Sticky shortcut badge */}
        <button
          onClick={() => handleTabChange('tracking')}
          className="p-3 bg-luxury-charcoal text-gold rounded-full border border-gold/30 hover:border-gold shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:scale-110 transition-all flex items-center justify-center shrink-0"
          title="Track Active Dispatch"
        >
          <Clock className="h-5 w-5" />
        </button>

        {/* Back to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-luxury-black border border-gold text-gold rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:bg-gold hover:text-luxury-black hover:scale-110 transition-all flex items-center justify-center shrink-0 animate-[fade-in_0.3s_ease-out]"
            title="Scribe to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
