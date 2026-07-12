import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, ChefHat } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '15+', label: 'Years of Heritage', icon: Award },
    { value: '45+', label: 'Exotic Secret Spices', icon: Sparkles },
    { value: '100k+', label: 'Delighted Diners', icon: Heart },
    { value: '4', label: 'Culinary Pavilions', icon: ShieldCheck },
  ];

  const benefits = [
    {
      title: 'Hand-Selected Exotic Spices',
      desc: 'Our spice masters source organic whole cardamom, cinnamon, and Kashmiri chilies directly from traditional farming cooperatives.',
    },
    {
      title: 'Michelin Star-Caliber Chefs',
      desc: 'Led by culinary visionary Chef Rajveer, our team brings decades of combined luxury kitchen experience from Mumbai, Beijing, and Rome.',
    },
    {
      title: 'Pristine Gold Standards',
      desc: 'Double-sanitized state-of-the-art kitchen modules and an unyielding commitment to ultra-hygienic premium sourcing.',
    },
  ];

  return (
    <section id="about-us-section" className="py-24 bg-luxury-black text-white font-sans relative overflow-hidden">
      {/* Absolute Decorative Accent */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-luxury-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
            Our Culinary Legacy
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
            Crafting Gastronomic Royalty Since 2011
          </h2>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[1px] w-16 bg-gold/40"></div>
            <div className="w-2 h-2 bg-gold rotate-45"></div>
            <div className="h-[1px] w-16 bg-gold/40"></div>
          </div>
        </div>

        {/* Story & Chef Intro Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Chef Image & Award Frame */}
          <div className="lg:col-span-5 relative group" id="about-chef-frame">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-gold to-luxury-red opacity-30 blur-lg group-hover:opacity-40 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-gold/30 bg-luxury-charcoal shadow-2xl aspect-square">
              <img
                src="/src/assets/images/royal_chef_portrait_1783834715901.jpg"
                alt="Executive Head Chef Rajveer Malhotra"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Label */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-center">
                <p className="font-serif text-lg font-bold text-gold">Chef Rajveer Malhotra</p>
                <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">Executive Culinary Director</p>
              </div>
            </div>
            {/* Signature Floating Medal */}
            <div className="absolute -top-4 -right-4 bg-luxury-charcoal border border-gold p-3 rounded-xl flex items-center gap-2.5 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="p-1.5 bg-gold/15 rounded-lg text-gold">
                <ChefHat className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-white/50">Award Winner</p>
                <p className="text-[11px] font-bold text-white">Global Taste Master</p>
              </div>
            </div>
          </div>

          {/* Story Narrative & Text */}
          <div className="lg:col-span-7 space-y-6" id="about-story-text">
            <h3 className="font-serif text-2xl font-semibold text-gold">
              "Cooking is not just chemistry; it is a profound heritage of taste passed down through generations."
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              Royal Spice Restaurant was founded with a singular, unyielding vision: to transcend ordinary dining and establish a temple of luxurious culinary craft. Our recipes are sourced from secret heritage archives, marrying royal North-Indian slow-cooking techniques, wok-hei Asian principles, and rustic wood-fired Italian perfection.
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              Every blend of masala is dry-roasted and ground in-house daily. Our signature stocks take up to 24 hours of boiling to release their rich bone and vegetable extracts. At Royal Spice, you are not just a customer; you are our culinary guest of honor, invited to partake in a celebration of the senses.
            </p>

            {/* Sourcing Pledge / Mission statement */}
            <div className="p-5 rounded-xl bg-luxury-charcoal/40 border border-gold/10 flex items-start gap-4">
              <div className="p-2.5 bg-luxury-red/20 text-gold rounded-lg shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Our 100% Organic Sourcing Pledge</h4>
                <p className="text-xs text-white/60">
                  We swear by culinary integrity. Our dairy is organic, beef is grass-fed, seafood is sustainably wild-caught, and zero chemical preservatives or MSG are ever introduced into our items.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" id="about-benefits">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gold/10 bg-luxury-charcoal/20 hover:border-gold/30 hover:bg-luxury-charcoal/40 transition-all duration-300 group"
            >
              <div className="h-8 w-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-luxury-black transition-colors">
                <span className="text-xs font-bold font-display">0{i + 1}</span>
              </div>
              <h4 className="text-base font-semibold text-white group-hover:text-gold transition-colors mb-2">
                {benefit.title}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Counter Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-luxury-charcoal/60 to-luxury-black border border-gold/15 p-8 rounded-2xl text-center" id="about-stats-counter">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div key={i} className="space-y-2">
                <div className="mx-auto h-10 w-10 bg-gold/15 text-gold flex items-center justify-center rounded-full">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gold tracking-tight">{stat.value}</h3>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
