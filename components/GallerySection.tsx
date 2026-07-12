import React, { useState } from 'react';
import { X, ZoomIn, Eye, Image } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Interior' | 'Food' | 'Chef' | 'Events' | 'Customers'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      category: 'Interior',
      title: 'Grand Dining Hall',
      desc: 'Crystal chandeliers and golden accents framing candlelit tables.',
      image: '/src/assets/images/luxury_dining_hero_1783834703080.jpg',
    },
    {
      id: 2,
      category: 'Chef',
      title: 'Our Executive Chef',
      desc: 'Chef Rajveer plating a custom golden saffron dessert.',
      image: '/src/assets/images/royal_chef_portrait_1783834715901.jpg',
    },
    {
      id: 3,
      category: 'Food',
      title: 'Royal Biryani Dum Preparation',
      desc: 'Long-grain rice layered with golden saffron threads and marinated mutton.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      category: 'Interior',
      title: 'The Golden Bar Lounge',
      desc: 'Sip premium craft mojitos and vintage cellars in velvet comfort.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 5,
      category: 'Food',
      title: 'Artisanal Butter Chicken Platter',
      desc: 'Traditional roasted chicken tikka floating in velvety tomato-butter gravy.',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 6,
      category: 'Events',
      title: 'Traditional Sufi Music Night',
      desc: 'Mesmerizing Sufi and sitar performances echoing under warm lights.',
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 7,
      category: 'Customers',
      title: 'Cherished Family Celebrations',
      desc: 'Patrons enjoying a massive custom North-Indian royal thali banquet.',
      image: 'https://images.unsplash.com/photo-1530101121860-af7634ad4cd1?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 8,
      category: 'Food',
      title: 'Exquisite Saffron Sweets',
      desc: 'Freshly baked gulab jamuns steeped in rich cardamon and sugar syrups.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 9,
      category: 'Interior',
      title: 'Secluded Mezzanine Alcove',
      desc: 'The perfect romantic backdrop designed for intimate premium dinners.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    }
  ];

  const categories: ('All' | 'Interior' | 'Food' | 'Chef' | 'Events' | 'Customers')[] = [
    'All',
    'Interior',
    'Food',
    'Chef',
    'Events',
    'Customers',
  ];

  // Filtering list
  const filteredItems = galleryItems.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div id="gallery-container" className="py-24 bg-[#0e0e0e] text-white font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
            Visual Ambience
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
            Our Gallery & Atmosphere
          </h2>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[1px] w-16 bg-gold/40"></div>
            <div className="w-2 h-2 bg-gold rotate-45"></div>
            <div className="h-[1px] w-16 bg-gold/40"></div>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="gallery-category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat}`}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gold text-luxury-black shadow-lg font-bold'
                  : 'bg-luxury-charcoal/40 text-white/75 hover:bg-luxury-charcoal/80 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-luxury-charcoal/20 border border-gold/10 hover:border-gold/30 rounded-xl overflow-hidden transition-all duration-300 relative flex flex-col hover:shadow-xl cursor-pointer"
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Overlay zoom/eye effects */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-11 w-11 rounded-full bg-gold text-luxury-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </div>
                {/* Category small label */}
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase bg-luxury-black/75 text-gold border border-gold/25 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Caption details */}
              <div className="p-5 border-t border-white/5 space-y-1 bg-luxury-charcoal/15">
                <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 font-sans"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowRight') handleNextLightbox();
            if (e.key === 'ArrowLeft') handlePrevLightbox();
          }}
          tabIndex={0}
        >
          {/* Close Handle */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-luxury-charcoal/80 border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Active Image Box */}
          <div className="max-w-4xl max-h-[75vh] relative flex items-center justify-center">
            {/* Prev Image Arrow */}
            <button
              onClick={handlePrevLightbox}
              className="absolute -left-4 sm:-left-12 p-2 bg-luxury-charcoal/60 border border-white/10 text-white hover:text-gold rounded-full transition-colors z-10"
              title="Previous"
            >
              ‹
            </button>

            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-gold/15 shadow-2xl animate-[scale-up_0.3s_ease-out]"
              referrerPolicy="no-referrer"
            />

            {/* Next Image Arrow */}
            <button
              onClick={handleNextLightbox}
              className="absolute -right-4 sm:-right-12 p-2 bg-luxury-charcoal/60 border border-white/10 text-white hover:text-gold rounded-full transition-colors z-10"
              title="Next"
            >
              ›
            </button>
          </div>

          {/* Label Details */}
          <div className="text-center mt-6 max-w-xl space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-gold font-bold bg-gold/15 px-2.5 py-0.5 rounded-full">
              {filteredItems[lightboxIndex].category}
            </span>
            <h4 className="font-serif text-lg font-bold text-white mt-1">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              {filteredItems[lightboxIndex].desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
