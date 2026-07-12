import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Clock, ArrowUp, Send, Check } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0b0b0b] border-t border-gold/15 pt-16 pb-8 text-white/70 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand story & Socials */}
          <div id="footer-col-about" className="space-y-4">
            <h3 className="font-serif text-xl font-bold tracking-widest text-gold">ROYAL SPICE</h3>
            <p className="text-xs leading-relaxed text-white/60">
              Savor the culinary excellence of authentic heritage flavors. We craft each dish using handpicked exotic spices and organic local ingredients under the guidance of Michelin-starred chef artisans.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-gold hover:text-luxury-black transition-colors duration-300 border border-gold/10"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-gold hover:text-luxury-black transition-colors duration-300 border border-gold/10"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-luxury-charcoal hover:bg-gold hover:text-luxury-black transition-colors duration-300 border border-gold/10"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div id="footer-col-links" className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white border-b border-gold/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-gold transition-colors block py-0.5">
                  Home & Specials
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-gold transition-colors block py-0.5">
                  Browse Full Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-gold transition-colors block py-0.5">
                  Our Culinary Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reservation')} className="hover:text-gold transition-colors block py-0.5 font-semibold text-gold/90">
                  Book A Premium Table
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-gold transition-colors block py-0.5">
                  Photo & Vibe Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-gold transition-colors block py-0.5">
                  Get In Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Info */}
          <div id="footer-col-hours" className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white border-b border-gold/10 pb-2">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex justify-between">
                <span>Monday - Thursday:</span>
                <span className="text-white font-medium">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday:</span>
                <span className="text-white font-medium">11:00 AM - 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-medium">12:00 PM - 09:30 PM</span>
              </div>
              <div className="pt-2 flex items-start gap-2 border-t border-white/5 mt-2">
                <Clock className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Happy Hours:</strong> Mon-Thu (4 PM - 7 PM). 20% off on premium mocktails.
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Contact details */}
          <div id="footer-col-newsletter" className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white border-b border-gold/10 pb-2">
              The Royal Gazette
            </h4>
            <p className="text-xs text-white/60">
              Subscribe to unlock chef secrets, weekend offers, and priority tables.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your noble email address..."
                  className="w-full px-3 py-2 pr-10 text-xs bg-luxury-charcoal border border-gold/20 rounded focus:border-gold focus:outline-none text-white font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-gold hover:bg-gold-dark text-luxury-black rounded flex items-center justify-center transition-colors duration-200"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
              {subscribed && (
                <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" /> Success! Enjoy your newsletter discount.
                </p>
              )}
              {error && <p className="text-luxury-red text-[11px] font-medium">{error}</p>}
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} Royal Spice Restaurant. Crafted for an exquisite fine dining experience.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
