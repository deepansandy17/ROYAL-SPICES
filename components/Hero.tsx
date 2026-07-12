import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, ShoppingCart, Utensils } from 'lucide-react';

interface HeroProps {
  onNavigate: (tabId: string) => void;
  onOpenCart: () => void;
}

export default function Hero({ onNavigate, onOpenCart }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: '/src/assets/images/luxury_dining_hero_1783834703080.jpg',
      tagline: 'A SYMPHONY OF SPICES & LUXURY',
      title: 'Experience the Taste of Authentic Flavors',
      description: 'Step into a sanctuary of premium fine dining where heritage recipes meet modern gastronomy. Every plate tells an exquisite story.',
    },
    {
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920',
      tagline: 'CRAFTED BY CULINARY MAESTROS',
      title: 'The Art of Exquisite Culinary Plating',
      description: 'We slow-cook, smoke, and masterfully season premium cuts and organic farm-to-table greens to curate a meal beyond comparison.',
    },
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920',
      tagline: 'MEMORABLE ROYAL ENCOUNTERS',
      title: 'Dine in an Atmosphere of Luxury',
      description: 'Whether celebrating a cherished milestone or sharing a romantic candlelit dinner, immerse in an environment of royal hospitality.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div id="hero-banner-root" className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Background Images with Fade Transition */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeSlide === idx ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt="Royal Spice Ambience"
            className="w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Elegant Radial Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />

      {/* Floating Animated Geometric Frame */}
      <div className="absolute top-1/2 left-12 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block -translate-y-1/2" />
      <div className="absolute bottom-12 left-1/2 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block -translate-x-1/2" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-left pt-16">
        <div className="max-w-3xl space-y-6">
          {/* Animated Tagline */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gold font-display">
              {slides[activeSlide].tagline}
            </span>
          </div>

          {/* Majestic Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6.5xl font-bold text-white leading-none tracking-tight">
            {slides[activeSlide].title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Authentic' || word === 'Exquisite' || word === 'Luxury' ? 'gold-text-gradient block sm:inline' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Appetizing Subtext */}
          <p className="text-sm sm:text-lg text-white/70 font-sans font-light max-w-2xl leading-relaxed">
            {slides[activeSlide].description}
          </p>

          {/* CTA Buttons - View Menu, Reserve a Table, Order Online */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            {/* CTA 1: View Menu */}
            <button
              id="hero-cta-menu"
              onClick={() => onNavigate('menu')}
              className="px-6 py-3.5 bg-luxury-red hover:bg-luxury-red-dark text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 shadow-[0_4px_20px_rgba(139,0,0,0.4)] hover:shadow-[0_4px_25px_rgba(139,0,0,0.6)] group transform hover:-translate-y-0.5"
            >
              <Utensils className="h-4 w-4" />
              <span>Explore Our Menu</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: Reserve a Table */}
            <button
              id="hero-cta-reserve"
              onClick={() => onNavigate('reservation')}
              className="px-6 py-3.5 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-luxury-black rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              <span>Reserve a Table</span>
            </button>

            {/* CTA 3: Order Online */}
            <button
              id="hero-cta-order"
              onClick={() => {
                onNavigate('menu');
                // Open order interface or scroll directly down
              }}
              className="px-6 py-3.5 bg-luxury-charcoal hover:bg-luxury-charcoal/80 text-white border border-white/15 hover:border-gold/50 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 text-gold" />
              <span>Order Delivery Online</span>
            </button>
          </div>

          {/* Customer Trust Highlight */}
          <div className="pt-8 border-t border-white/5 flex items-center space-x-8 text-xs text-white/50">
            <div>
              <p className="text-white font-bold text-lg font-display">4.9 ★</p>
              <p className="text-[10px] uppercase tracking-wider">Over 1,200+ Reviews</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <p className="text-white font-bold text-lg font-display">100%</p>
              <p className="text-[10px] uppercase tracking-wider">Hygiene Certified</p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div>
              <p className="text-white font-bold text-lg font-display">30 mins</p>
              <p className="text-[10px] uppercase tracking-wider">Express Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 flex space-x-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === idx ? 'w-8 bg-gold' : 'w-2 bg-white/30'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Styled inline keyframes for slow zoom background */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
