import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, Key, LogIn, UserPlus } from 'lucide-react';

interface AuthPagesProps {
  onLogin: (user: { name: string; email: string; role: 'user' | 'admin' }) => void;
  onClose: () => void;
}

export default function AuthPages({ onLogin, onClose }: AuthPagesProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handlePresetLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      onLogin({
        name: 'Concierge Administrator',
        email: 'admin@royalspice.com',
        role: 'admin',
      });
    } else {
      onLogin({
        name: 'Prince Harry',
        email: 'harry@palace.com',
        role: 'user',
      });
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill out required fields.');
      return;
    }

    if (activeTab === 'signup' && !name) {
      alert('Please enter your name.');
      return;
    }

    // Standard client side mock signup or login
    onLogin({
      name: name || email.split('@')[0],
      email,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Main card */}
      <div className="relative bg-[#121212] border border-gold/30 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-[scale-up_0.3s_ease-out]">
        {/* Header Title */}
        <div className="text-center space-y-2">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest gold-text-gradient block">
            ROYAL SPICE ACCOUNTS
          </span>
          <p className="text-[11px] text-white/50 uppercase tracking-widest">
            {activeTab === 'login' ? 'Unlock Premium Dining Portal' : 'Register Your Noble Profile'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-luxury-charcoal p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'login' ? 'bg-gold text-luxury-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            <LogIn className="h-3.5 w-3.5 inline mr-1.5" />
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`w-1/2 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'signup' ? 'bg-gold text-luxury-black font-extrabold' : 'text-white/60 hover:text-white'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5 inline mr-1.5" />
            Sign Up
          </button>
        </div>

        {/* Quick Testing Panel (Concierge features bypass!) */}
        <div className="p-4 rounded-xl border border-gold/15 bg-gold/5 space-y-3">
          <p className="text-[10px] uppercase tracking-wider text-gold font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 animate-pulse" />
            Bypass Testing Accounts (Review Mode)
          </p>
          <p className="text-[11px] text-white/50">
            Click to bypass forms and login with specific administrative or user profiles instantly.
          </p>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans font-bold">
            <button
              type="button"
              onClick={() => handlePresetLogin('admin')}
              className="px-2.5 py-1.5 bg-gold text-luxury-black rounded text-center hover:bg-gold-dark transition-colors uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <Key className="h-3 w-3" />
              <span>Login Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handlePresetLogin('user')}
              className="px-2.5 py-1.5 bg-luxury-charcoal text-white border border-white/10 rounded text-center hover:border-gold/50 transition-all uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <User className="h-3 w-3" />
              <span>Login User</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-white/80">
          {activeTab === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-white/40 block">Noble Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
                />
                <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-white/40 block">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@email.com"
                className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
              />
              <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-white/40 block">Security Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-luxury-charcoal border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-gold pl-9 font-sans"
              />
              <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/30" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-luxury-red hover:bg-luxury-red-dark text-white font-bold rounded-lg uppercase tracking-wider transition-all"
          >
            {activeTab === 'login' ? 'Authorize Account Access' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button onClick={onClose} className="text-[10px] uppercase tracking-widest text-white/40 hover:text-gold transition-colors font-semibold">
            Bypass Account Setup / Close
          </button>
        </div>
      </div>
    </div>
  );
}
