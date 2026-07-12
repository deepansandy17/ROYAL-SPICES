import React, { useState } from 'react';
import { Star, MessageSquare, Check, User, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Review } from '../types';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewSection({ reviews, onAddReview }: ReviewSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Form State
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Stats calculation
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) {
      alert('Please fill out your name and review details.');
      return;
    }

    const newReview: Review = {
      id: `REV-${Math.floor(100000 + Math.random() * 900000)}`,
      author,
      rating,
      text,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    onAddReview(newReview);
    setIsSubmitted(true);
    setAuthor('');
    setText('');
    setRating(5);

    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
      setActiveIdx(reviews.length); // View the newest review!
    }, 3000);
  };

  return (
    <section id="reviews-section" className="py-24 bg-[#0b0b0b] text-white font-sans relative overflow-hidden">
      {/* Absolute Decorative Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
            What Our Patrons Say About Us
          </h2>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[1px] w-16 bg-gold/40"></div>
            <div className="w-2 h-2 bg-gold rotate-45"></div>
            <div className="h-[1px] w-16 bg-gold/40"></div>
          </div>
        </div>

        {/* Big Reviews Stat Counter & Toggle Form Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-4 bg-luxury-charcoal/30 border border-gold/15 p-6 rounded-2xl text-center space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Google Rating Score</h3>
            <div className="space-y-1">
              <span className="font-display text-5xl sm:text-6xl font-extrabold gold-text-gradient block">{averageRating}</span>
              <div className="flex justify-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(parseFloat(averageRating)) ? 'fill-current' : 'text-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-white/50">Based on {totalReviews} trusted patron submissions</p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full py-2.5 bg-gold hover:bg-gold-dark text-luxury-black text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              {showForm ? 'View Slider Reviews' : 'Write A Review'}
            </button>
          </div>

          <div className="lg:col-span-8">
            {showForm ? (
              /* Review Form */
              <form onSubmit={handleSubmitReview} className="bg-luxury-charcoal/20 border border-gold/10 p-6 sm:p-8 rounded-2xl space-y-4">
                <h3 className="font-serif text-lg font-semibold text-gold">Leave Your Noble Experience</h3>

                {isSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="mx-auto h-12 w-12 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-base font-bold text-white">Review Celebrated!</h4>
                    <p className="text-xs text-white/50">Your testimonial has been cataloged inside our dining archives. Thank you!</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-white/50 block">Your Name</label>
                        <input
                          type="text"
                          required
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Sir Charles Spencer"
                          className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold font-sans"
                        />
                      </div>
                      {/* Stars count */}
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-white/50 block">Your Rating</label>
                        <div className="flex items-center space-x-1 pt-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star className={`h-5 w-5 ${star <= rating ? 'fill-current' : 'text-white/10'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-white/50 block">Review Details</label>
                      <textarea
                        required
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Detail your dining experience, favorite spice blends, or staff hospitality..."
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-gold font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-luxury-red hover:bg-luxury-red-dark text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                    >
                      Publish Testimonial
                    </button>
                  </>
                )}
              </form>
            ) : (
              /* Review Testimonial Slider */
              <div className="relative bg-luxury-charcoal/10 border border-gold/10 p-6 sm:p-10 rounded-2xl space-y-6">
                {/* Large Quote Mark */}
                <Quote className="absolute top-6 right-6 h-12 w-12 text-gold/5 shrink-0 pointer-events-none" />

                <div className="min-h-[140px] flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < reviews[activeIdx].rating ? 'fill-current' : 'text-white/10'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="font-serif italic text-sm sm:text-base text-white/80 leading-relaxed">
                      "{reviews[activeIdx].text}"
                    </p>
                  </div>

                  {/* Author detail */}
                  <div className="flex items-center space-x-3 pt-6 border-t border-white/5 mt-4">
                    <div className="h-8 w-8 rounded-full bg-gold/15 text-gold flex items-center justify-center font-bold text-xs uppercase">
                      {reviews[activeIdx].author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-white">{reviews[activeIdx].author}</p>
                      <p className="text-[10px] text-white/40">{reviews[activeIdx].date} • Verified Patron</p>
                    </div>
                  </div>
                </div>

                {/* Slider controls */}
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded bg-luxury-charcoal text-white/60 hover:text-white border border-white/5 hover:border-gold/30 transition-all"
                    title="Previous Review"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded bg-luxury-charcoal text-white/60 hover:text-white border border-white/5 hover:border-gold/30 transition-all"
                    title="Next Review"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
