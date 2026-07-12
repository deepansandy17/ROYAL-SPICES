import React, { useState } from 'react';
import { Plus, Edit, Trash2, ShieldCheck, ShoppingCart, Calendar, Coffee, PlusCircle, Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { MenuItem, TableReservation, Order } from '../types';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (itemId: string) => void;
  reservations: TableReservation[];
  onUpdateReservation: (resId: string, status: 'Confirmed' | 'Cancelled') => void;
  orders: Order[];
  onUpdateOrder: (orderId: string, status: 'Pending' | 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered') => void;
}

export default function AdminDashboard({
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  reservations,
  onUpdateReservation,
  orders,
  onUpdateOrder,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'menu' | 'reservations' | 'orders'>('menu');

  // New Menu Item Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Veg' | 'Non-Veg' | 'Beverages' | 'Desserts'>('Veg');
  const [cuisine, setCuisine] = useState<'Indian' | 'Chinese' | 'Italian'>('Indian');
  const [subCategory, setSubCategory] = useState('Curries');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(12.99);
  const [image, setImage] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const defaultImage = image.trim() || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600';

    const newItem: MenuItem = {
      id: `custom-item-${Date.now()}`,
      name,
      category,
      cuisine,
      subCategory,
      description,
      price: parseFloat(price.toString()),
      rating: 5.0,
      reviewsCount: 1,
      isVeg: category === 'Veg' || category === 'Beverages' || category === 'Desserts',
      image: defaultImage,
      isAvailable: true,
    };

    onAddMenuItem(newItem);
    alert('Exquisite menu item added successfully!');

    // Reset Form
    setName('');
    setDescription('');
    setPrice(12.99);
    setImage('');
    setSubCategory('Curries');
    setShowAddForm(false);
  };

  return (
    <div id="admin-panel" className="py-24 bg-[#0e0e0e] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/15 pb-6 mb-10">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gold/15 rounded-xl text-gold border border-gold/30">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Royal Spice Concierge Admin
              </h2>
              <p className="text-xs text-white/50">Manage the digital dining experience, menu, orders, and reservations.</p>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-luxury-charcoal/40 p-1 rounded-lg border border-white/5 self-start">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'menu' ? 'bg-gold text-luxury-black font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Coffee className="h-3.5 w-3.5 inline mr-1.5" />
              Menu items
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'reservations' ? 'bg-gold text-luxury-black font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5 inline mr-1.5" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'orders' ? 'bg-gold text-luxury-black font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5 inline mr-1.5" />
              Orders
            </button>
          </div>
        </div>

        {/* TAB 1: MENU ITEMS MANAGER */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Current Kitchen Offering ({menuItems.length} items)
              </h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-gold hover:bg-gold-dark text-luxury-black text-xs font-bold uppercase tracking-wider rounded-lg flex items-center space-x-1 transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Premium Dish</span>
              </button>
            </div>

            {showAddForm && (
              /* Add Dish Form */
              <form onSubmit={handleAddSubmit} className="bg-luxury-charcoal/30 border border-gold/25 p-6 rounded-xl space-y-4 animate-[fade-in_0.3s_ease-out]">
                <h4 className="font-serif text-base font-bold text-gold">Describe New Royal Creation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-white/50 uppercase text-[9px] tracking-wider block">Dish Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Royal Saffron Malai Kofta"
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-white/50 uppercase text-[9px] tracking-wider block">Price ($ USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-white/50 uppercase text-[9px] tracking-wider block">Category Tag *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                    >
                      <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  </div>
                  {/* Cuisine */}
                  <div className="space-y-1">
                    <label className="text-white/50 uppercase text-[9px] tracking-wider block">Cuisine Origin *</label>
                    <select
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value as any)}
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Italian">Italian</option>
                    </select>
                  </div>
                  {/* SubCategory */}
                  <div className="space-y-1">
                    <label className="text-white/50 uppercase text-[9px] tracking-wider block">Sub-Category *</label>
                    <input
                      type="text"
                      required
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      placeholder="e.g. Curries, Biryani, Noodles, Pizza"
                      className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1 text-xs">
                  <label className="text-white/50 uppercase text-[9px] tracking-wider block font-sans">Appetizing Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Dry-roasted whole spices folded into freshly whisked yogurt and cooked over low coals..."
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                {/* Custom Image Unsplash URL */}
                <div className="space-y-1 text-xs">
                  <label className="text-white/50 uppercase text-[9px] tracking-wider block font-sans">Dish Image URL (Leave blank for default)</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold text-luxury-black font-semibold rounded uppercase tracking-wider text-xs"
                  >
                    Publish Dish
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 bg-transparent border border-white/20 text-white rounded uppercase tracking-wider text-xs hover:border-white/40"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* List Table of Menu Items */}
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-luxury-charcoal/60 text-gold uppercase tracking-wider font-display font-bold border-b border-white/10">
                    <th className="p-4">Dish Details</th>
                    <th className="p-4">Cuisine</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">SubCategory</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center space-x-3 min-w-[240px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 object-cover rounded border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-white text-sm">{item.name}</p>
                          <p className="text-[10px] text-white/40 line-clamp-1 max-w-sm">{item.description}</p>
                        </div>
                      </td>
                      <td className="p-4 text-white/80 font-medium">{item.cuisine}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.isVeg ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' : 'bg-rose-950/40 text-rose-400 border border-rose-500/10'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 text-white/60">{item.subCategory}</td>
                      <td className="p-4 font-bold text-white font-display">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you wish to delete "${item.name}" from active kitchen inventory?`)) {
                              onDeleteMenuItem(item.id);
                            }
                          }}
                          className="p-1.5 bg-rose-950/40 border border-rose-900 text-rose-400 hover:bg-rose-900 hover:text-white rounded transition-colors inline-block"
                          title="Delete Item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: RESERVATIONS BOOKING MANAGER */}
        {activeTab === 'reservations' && (
          <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Seating Ledger ({reservations.length} total bookings)
            </h3>

            {reservations.length === 0 ? (
              <p className="text-xs text-white/50 py-8 text-center bg-luxury-charcoal/20 rounded border border-white/5">No tables reserved yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-luxury-charcoal/60 text-gold uppercase tracking-wider font-display font-bold border-b border-white/10">
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Party size</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Special Requests</th>
                      <th className="p-4">Table Assigned</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-white text-xs">{res.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{res.name}</p>
                          <p className="text-[10px] text-white/40">{res.phone}</p>
                          <p className="text-[10px] text-white/40">{res.email}</p>
                        </td>
                        <td className="p-4 font-bold text-white font-display text-center">{res.guestsCount} Ppl</td>
                        <td className="p-4">
                          <p className="text-white font-medium">{res.date}</p>
                          <p className="text-gold font-bold font-mono">{res.time}</p>
                        </td>
                        <td className="p-4 text-white/60 max-w-xs truncate" title={res.specialRequest}>{res.specialRequest || 'None'}</td>
                        <td className="p-4 font-serif font-bold text-gold text-sm text-center">#{res.tableNumber || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            res.status === 'Confirmed' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/10' : 'bg-rose-950/40 text-rose-400 border border-rose-500/10'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {res.status === 'Pending' && (
                              <button
                                onClick={() => onUpdateReservation(res.id, 'Confirmed')}
                                className="p-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-400 hover:text-luxury-black border border-emerald-500/20 rounded transition-colors"
                                title="Approve"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {res.status === 'Confirmed' && (
                              <button
                                onClick={() => onUpdateReservation(res.id, 'Cancelled')}
                                className="p-1 bg-rose-950 text-rose-400 hover:bg-rose-400 hover:text-white border border-rose-500/20 rounded transition-colors"
                                title="Cancel Seating"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {res.status === 'Cancelled' && (
                              <button
                                onClick={() => onUpdateReservation(res.id, 'Confirmed')}
                                className="p-1 bg-luxury-charcoal text-white/40 hover:text-white rounded border border-white/10 transition-colors"
                                title="Restore confirmed status"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-[fade-in_0.3s_ease-out]">
            <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
              Customer Orders Log ({orders.length} orders)
            </h3>

            {orders.length === 0 ? (
              <p className="text-xs text-white/50 py-8 text-center bg-luxury-charcoal/20 rounded border border-white/5">No delivery orders placed yet.</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-luxury-charcoal/60 text-gold uppercase tracking-wider font-display font-bold border-b border-white/10">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items / Feast details</th>
                      <th className="p-4 font-right">Total Fee</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Advance Dispatch Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/5 transition-colors">
                        {/* Order ID */}
                        <td className="p-4 font-mono font-bold text-white text-xs">{order.id}</td>

                        {/* Customer */}
                        <td className="p-4">
                          <p className="font-bold text-white">{order.customerName}</p>
                          <p className="text-[10px] text-white/40">{order.customerPhone}</p>
                          <p className="text-[10px] text-white/40">{order.customerEmail}</p>
                          <p className="text-[10px] text-white/60 max-w-xs italic font-sans" title={order.deliveryAddress}>
                            Deliv: {order.deliveryAddress}
                          </p>
                        </td>

                        {/* Items */}
                        <td className="p-4">
                          <ul className="space-y-1 text-[11px] list-disc pl-4 text-white/80">
                            {order.items.map((i, idx) => (
                              <li key={idx}>
                                {i.quantity}x <strong>{i.name}</strong> (${i.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        </td>

                        {/* Fee */}
                        <td className="p-4 font-bold text-gold font-display">${order.total.toFixed(2)}</td>

                        {/* Status Label */}
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20'
                              : order.status === 'Out for Delivery'
                              ? 'bg-sky-950/50 text-sky-400 border border-sky-500/20'
                              : order.status === 'Preparing'
                              ? 'bg-amber-950/50 text-amber-400 border border-amber-500/20'
                              : 'bg-rose-950/50 text-rose-400 border border-rose-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>

                        {/* Dispatch actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            {order.status === 'Pending' && (
                              <button
                                onClick={() => onUpdateOrder(order.id, 'Preparing')}
                                className="px-3 py-1 bg-amber-500 text-luxury-black font-semibold rounded text-[10px] uppercase hover:bg-amber-400 flex items-center gap-1 transition-colors"
                              >
                                <span>Start Preparing</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}
                            {order.status === 'Preparing' && (
                              <button
                                onClick={() => onUpdateOrder(order.id, 'Out for Delivery')}
                                className="px-3 py-1 bg-sky-500 text-luxury-black font-semibold rounded text-[10px] uppercase hover:bg-sky-400 flex items-center gap-1 transition-colors"
                              >
                                <span>Dispatch Rider</span>
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            )}
                            {order.status === 'Out for Delivery' && (
                              <button
                                onClick={() => onUpdateOrder(order.id, 'Delivered')}
                                className="px-3 py-1 bg-emerald-500 text-luxury-black font-semibold rounded text-[10px] uppercase hover:bg-emerald-400 flex items-center gap-1 transition-colors"
                              >
                                <span>Complete Delivery</span>
                                <Check className="h-3 w-3" />
                              </button>
                            )}
                            {order.status === 'Delivered' && (
                              <span className="text-[10px] text-white/30 italic flex items-center gap-1">
                                <Check className="h-3 w-3 text-emerald-400" />
                                Order Completed
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
