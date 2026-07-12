import React from 'react';
import { Heart, Star, Flame, ShoppingCart, Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  key?: string | number;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart?: (itemId: string) => void;
  cartQuantity: number;
  isWishlisted: boolean;
  onToggleWishlist: (itemId: string) => void;
}

export default function MenuCard({
  item,
  onAddToCart,
  onRemoveFromCart,
  cartQuantity,
  isWishlisted,
  onToggleWishlist,
}: MenuCardProps) {
  // Determine customized spice level indicator based on descriptions/name
  const getSpiceLevel = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('chilli') || n.includes('schezwan') || n.includes('dragon') || n.includes('rogan josh') || n.includes('kadai')) {
      return 3;
    }
    if (n.includes('masala') || n.includes('curry') || n.includes('tikka') || n.includes('tadka')) {
      return 2;
    }
    if (n.includes('fried rice') || n.includes('noodle') || n.includes('alfredo')) {
      return 1;
    }
    return 0;
  };

  const spiceLevel = getSpiceLevel(item.name);

  return (
    <div
      id={`menu-card-${item.id}`}
      className="group bg-luxury-charcoal/40 border border-gold/15 hover:border-gold/45 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-[0_4px_30px_rgba(212,175,55,0.08)] transform hover:-translate-y-1 relative"
    >
      {/* Visual Header */}
      <div className="relative aspect-[4/3] overflow-hidden bg-luxury-black shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Veg/Non-Veg & Cuisine Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span
            className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md shadow-sm ${
              item.isVeg
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          <span className="px-2 py-0.5 rounded text-[8px] font-semibold bg-gold/10 text-gold border border-gold/20 tracking-widest uppercase text-center backdrop-blur-md">
            {item.cuisine}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${item.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(item.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-sm ${
            isWishlisted
              ? 'bg-luxury-red/25 border-luxury-red text-rose-500'
              : 'bg-luxury-black/60 border-white/10 text-white/60 hover:text-white hover:bg-luxury-black'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Special tag */}
        {item.isSpecial && (
          <span className="absolute bottom-3 left-3 bg-gold text-luxury-black text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-lg border border-gold-light animate-pulse">
            Chef Special
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        {/* Title, Spice level */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors leading-tight">
              {item.name}
            </h4>
            <div className="text-gold font-display font-bold text-base sm:text-lg shrink-0">
              ${item.price.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs text-white/50">
            {/* SubCategory tag */}
            <span className="text-white/60 font-medium text-[11px]">{item.subCategory}</span>
            <div className="h-2.5 w-[1px] bg-white/10" />
            {/* Spice levels */}
            {spiceLevel > 0 && (
              <div className="flex items-center text-amber-500" title={`Spice Level: ${spiceLevel}/3`}>
                {Array.from({ length: spiceLevel }).map((_, i) => (
                  <Flame key={i} className="h-3 w-3 fill-current shrink-0 -ml-0.5" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 h-8 flex-grow">
          {item.description}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1.5 shrink-0 pt-1">
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(item.rating) ? 'fill-current' : 'text-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-gold font-display">{item.rating}</span>
          <span className="text-[9px] text-white/40">({item.reviewsCount} votes)</span>
        </div>

        {/* Purchase Controls */}
        <div className="pt-2 shrink-0 border-t border-white/5 flex items-center justify-between gap-4">
          {cartQuantity > 0 ? (
            <div className="flex items-center justify-between w-full bg-luxury-charcoal border border-gold/30 rounded-lg p-1">
              <button
                id={`cart-decrease-${item.id}`}
                onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                title="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-extrabold text-gold font-display px-2">{cartQuantity}</span>
              <button
                id={`cart-increase-${item.id}`}
                onClick={() => onAddToCart(item)}
                className="p-1 rounded text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                title="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              id={`add-to-cart-btn-${item.id}`}
              onClick={() => onAddToCart(item)}
              disabled={!item.isAvailable}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all duration-300 font-sans ${
                item.isAvailable
                  ? 'bg-gold hover:bg-gold-dark text-luxury-black shadow-md hover:shadow-lg'
                  : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
              <span>{item.isAvailable ? 'Add to Cart' : 'Sold Out'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
