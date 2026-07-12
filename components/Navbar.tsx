import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Heart, User, ShieldCheck, LogOut, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  currentUser,
  onLogout,
  onOpenAuth,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservation', label: 'Book Table' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-black/95 backdrop-blur-md border-b border-gold/20 py-3 shadow-lg'
          : 'bg-gradient-to-b from-luxury-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            id="nav-logo"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 border border-gold rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-135 bg-luxury-charcoal/80 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <span className="text-gold font-serif text-base -rotate-45 font-bold tracking-tighter">RS</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider gold-text-gradient block leading-none">
                ROYAL SPICE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 block font-display mt-1">
                Luxury Dining
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div id="nav-links-desktop" className="hidden lg:flex space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-2.5 py-2 text-[11px] uppercase tracking-widest font-medium transition-all duration-300 relative group font-sans ${
                  currentTab === link.id
                    ? 'text-gold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-gold transition-transform duration-300 ${
                    currentTab === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
            {currentUser?.role === 'admin' && (
              <button
                id="nav-link-admin"
                onClick={() => handleNavClick('admin')}
                className={`px-2.5 py-2 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 text-amber-400 hover:text-amber-300 flex items-center gap-1 font-sans ${
                  currentTab === 'admin' ? 'underline decoration-amber-400 decoration-2 underline-offset-4' : ''
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Panel
              </button>
            )}
          </div>

          {/* Icon Actions */}
          <div id="nav-actions" className="flex items-center space-x-1 sm:space-x-3">
            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={() => handleNavClick('menu')}
              className="p-2 text-white/80 hover:text-gold relative transition-colors duration-200"
              title="View Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-luxury-red text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-gold/30">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              className="p-2 text-white/80 hover:text-gold relative transition-colors duration-200"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-gold text-luxury-black text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center border border-luxury-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Indicator */}
            {currentUser ? (
              <div className="flex items-center space-x-2 border-l border-white/10 pl-3">
                <div
                  className="hidden md:block text-right cursor-pointer"
                  onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'home')}
                >
                  <p className="text-xs text-gold font-medium font-sans">{currentUser.name}</p>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">{currentUser.role}</p>
                </div>
                <div className="relative group">
                  <button
                    id="profile-dropdown-btn"
                    className="p-1.5 rounded-full bg-luxury-charcoal border border-gold/30 text-gold hover:bg-gold hover:text-luxury-black transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                  </button>
                  {/* Hover dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-luxury-charcoal border border-gold/20 rounded-lg shadow-xl py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="px-4 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                      <p className="text-[10px] text-white/50">{currentUser.email}</p>
                    </div>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-4 py-2 text-xs text-gold hover:bg-white/5 transition-colors"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => handleNavClick('offers')}
                      className="w-full text-left px-4 py-2 text-xs text-white/80 hover:bg-white/5 transition-colors"
                    >
                      My Favorites
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-xs text-luxury-red hover:bg-white/5 flex items-center gap-1 transition-colors border-t border-white/5"
                    >
                      <LogOut className="h-3 w-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                id="login-trigger-btn"
                onClick={onOpenAuth}
                className="hidden sm:flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-gold text-gold text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-luxury-black transition-all duration-300 font-sans"
              >
                <User className="h-3.5 w-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white/80 hover:text-white lg:hidden transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed inset-x-0 top-[73px] bg-luxury-black border-b border-gold/15 transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100 max-h-[85vh] py-6 shadow-2xl overflow-y-auto' : 'opacity-0 max-h-0 py-0 overflow-hidden'
        }`}
      >
        <div className="px-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
                currentTab === link.id
                  ? 'bg-gold/10 text-gold border-l-2 border-gold'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold tracking-wide text-amber-400 bg-amber-400/5 hover:bg-amber-400/10 flex items-center gap-2 border-l-2 border-amber-400 ${
                currentTab === 'admin' ? 'bg-amber-400/10' : ''
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </button>
          )}

          {/* Login for Mobile if not Logged in */}
          {!currentUser ? (
            <div className="pt-4 border-t border-white/10 mt-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gold text-luxury-black text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all"
              >
                <User className="h-4 w-4" />
                <span>Login / Sign Up</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between px-4">
              <div>
                <p className="text-xs font-semibold text-gold">{currentUser.name}</p>
                <p className="text-[10px] text-white/40">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="p-2 text-luxury-red hover:bg-luxury-red/10 rounded-lg flex items-center justify-center transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
