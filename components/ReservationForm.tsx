import React, { useState } from 'react';
import { Calendar, Users, Clock, MessageSquare, Utensils, CheckCircle, MapPin, Printer } from 'lucide-react';
import { TableReservation } from '../types';

interface ReservationFormProps {
  onAddReservation: (res: TableReservation) => void;
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
}

export default function ReservationForm({ onAddReservation, currentUser }: ReservationFormProps) {
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [guestsCount, setGuestsCount] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Status state
  const [bookingResult, setBookingResult] = useState<TableReservation | null>(null);

  const tableLocations = [
    'Garden-View Window Alcove',
    'Private Mezzanine Vault',
    'Main Dining Chandelier Lounge',
    'Quiet Fireplace Room',
    'VIP Balcony Pavilion',
  ];

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !date || !time) {
      alert('Please fill in all required fields.');
      return;
    }

    // Generate simulated table properties
    const assignedTableNum = Math.floor(1 + Math.random() * 24);
    const simulatedLocation = tableLocations[Math.floor(Math.random() * tableLocations.length)];

    const newBooking: TableReservation = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      phone,
      email,
      guestsCount,
      date,
      time,
      specialRequest: specialRequest ? `${specialRequest} (${simulatedLocation})` : `Seated at ${simulatedLocation}`,
      status: 'Confirmed',
      tableNumber: assignedTableNum,
      createdAt: new Date().toISOString(),
    };

    onAddReservation(newBooking);
    setBookingResult(newBooking);

    // Clear form
    setName(currentUser?.name || '');
    setPhone('');
    setEmail(currentUser?.email || '');
    setGuestsCount(2);
    setDate('');
    setTime('');
    setSpecialRequest('');
  };

  return (
    <div id="reservation-form-container" className="py-24 bg-[#0e0e0e] text-white font-sans relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold block font-display">
            Exclusive Seating
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white leading-tight">
            Reserve A Premium Dining Table
          </h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Secure your presence in our dining hall. We reserve 40% of our premium tables for direct digital reservation, ensuring priority seating.
          </p>
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="h-[1px] w-16 bg-gold/40"></div>
            <div className="w-2 h-2 bg-gold rotate-45"></div>
            <div className="h-[1px] w-16 bg-gold/40"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Column 1: Info, Guidelines, Location highlights */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold">Dining Guidelines</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                To preserve our intimate and refined fine-dining atmosphere, we kindly request our patrons to observe our legacy code.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-luxury-charcoal border border-gold/20 text-gold rounded-lg shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Dress Code Policy</h4>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    Smart-casual or formal dinner attire. Athletic wear, slippers, or beachwear are not permitted in the Main Hall.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-luxury-charcoal border border-gold/20 text-gold rounded-lg shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Large Celebrations</h4>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    For corporate dining, weddings, or guest lists exceeding 10 noble guests, please use our contact page or ring our concierge team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-luxury-charcoal border border-gold/20 text-gold rounded-lg shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Grace Period</h4>
                  <p className="text-xs text-white/50 leading-relaxed mt-1">
                    Tables are held for up to 15 minutes past the reserved schedule. Please call us if you are delayed.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Table Map Mock */}
            <div className="p-6 rounded-xl border border-gold/10 bg-luxury-charcoal/20 space-y-3">
              <p className="text-[10px] uppercase tracking-wider text-gold font-bold">Lounge Spotlight</p>
              <h4 className="text-xs sm:text-sm font-bold text-white">Private Mezzanine & Garden Pavilions</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Featuring exquisite view panels, velvet seating, separate music channels, and dedicated sommelier service. Automatically assigned based on availability!
              </p>
            </div>
          </div>

          {/* Column 2: Booking Form or Successful Booking Ticket */}
          <div className="lg:col-span-7">
            {bookingResult ? (
              /* Majestic Confirmed Booking Receipt */
              <div className="bg-luxury-charcoal/40 border-2 border-gold/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-[fade-in_0.5s_ease-out]">
                {/* Decorative border cutouts like tickets */}
                <div className="absolute top-1/2 -left-3 h-6 w-6 bg-[#0e0e0e] rounded-full border-r border-gold/40 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 h-6 w-6 bg-[#0e0e0e] rounded-full border-l border-gold/40 -translate-y-1/2" />

                <div className="text-center space-y-2 pb-4 border-b border-white/10">
                  <div className="mx-auto h-12 w-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-2">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Table Reserved & Confirmed</h3>
                  <p className="text-[10px] uppercase tracking-wider text-gold font-bold">Booking ID: {bookingResult.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans py-2">
                  <div className="space-y-1 bg-luxury-black/30 p-3 rounded border border-white/5">
                    <span className="text-white/40 uppercase text-[9px] block">Reserved For</span>
                    <strong className="text-white font-medium text-xs sm:text-sm">{bookingResult.name}</strong>
                  </div>
                  <div className="space-y-1 bg-luxury-black/30 p-3 rounded border border-white/5">
                    <span className="text-white/40 uppercase text-[9px] block">Contact Phone</span>
                    <strong className="text-white font-medium text-xs sm:text-sm">{bookingResult.phone}</strong>
                  </div>
                  <div className="space-y-1 bg-luxury-black/30 p-3 rounded border border-white/5">
                    <span className="text-white/40 uppercase text-[9px] block">Dining Date</span>
                    <strong className="text-gold font-medium text-xs sm:text-sm">{bookingResult.date}</strong>
                  </div>
                  <div className="space-y-1 bg-luxury-black/30 p-3 rounded border border-white/5">
                    <span className="text-white/40 uppercase text-[9px] block">Arrival Time</span>
                    <strong className="text-gold font-medium text-xs sm:text-sm">{bookingResult.time}</strong>
                  </div>
                </div>

                <div className="p-4 bg-gold/5 rounded border border-gold/20 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-gold font-bold uppercase text-[9px] tracking-widest">Assigned Seat</p>
                    <p className="text-white font-serif font-bold text-sm sm:text-base">Table #{bookingResult.tableNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gold font-bold uppercase text-[9px] tracking-widest font-sans">Party Size</p>
                    <p className="text-white font-serif font-bold text-sm sm:text-base">{bookingResult.guestsCount} Guests</p>
                  </div>
                </div>

                <div className="text-xs text-white/60 space-y-1 border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Special Requests / Seating Area</p>
                  <p className="italic text-white/85">"{bookingResult.specialRequest}"</p>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10 text-xs">
                  <button
                    onClick={() => setBookingResult(null)}
                    className="w-full py-2 bg-luxury-charcoal hover:bg-luxury-black border border-white/10 rounded font-semibold text-white transition-colors uppercase tracking-wider"
                  >
                    Reserve Another Table
                  </button>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-4 py-2 bg-gold hover:bg-gold-dark text-luxury-black rounded font-semibold flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                    title="Print Receipt"
                  >
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print</span>
                  </button>
                </div>
              </div>
            ) : (
              /* The Table Reservation Form */
              <form onSubmit={handleReserve} className="bg-luxury-charcoal/20 border border-gold/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@email.com"
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  {/* Guests count */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Number of Guests *</label>
                    <div className="relative">
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num} className="bg-luxury-black">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <Users className="absolute right-3 top-3 h-3.5 w-3.5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Preferred Date *</label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans appearance-none"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute right-3 top-3 h-3.5 w-3.5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Time slot */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Preferred Time *</label>
                    <div className="relative">
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold font-sans appearance-none"
                      >
                        <option value="" disabled className="bg-luxury-black">Select Time Slot</option>
                        {['11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM'].map((slot) => (
                          <option key={slot} value={slot} className="bg-luxury-black">
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock className="absolute right-3 top-3 h-3.5 w-3.5 text-white/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Special requests */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 block font-semibold">Special Request / Occasion</label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Celebrating 5th Wedding Anniversary, allergic to peanuts, prefer a secluded high-back booth..."
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold pl-10 font-sans"
                    />
                    <MessageSquare className="absolute left-3 top-3 h-3.5 w-3.5 text-white/40 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-luxury-red hover:bg-luxury-red-dark text-white font-semibold rounded-lg uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_4px_20px_rgba(139,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(139,0,0,0.5)]"
                >
                  <Utensils className="h-4 w-4" />
                  <span>Secure Seating Reservation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
