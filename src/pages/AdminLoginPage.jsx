import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, Award, KeyRound } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@goldenelectricals.com');
  const [password, setPassword] = useState('golden123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      // Validate Admin Credentials
      if ((email === 'admin@goldenelectricals.com' || email === 'admin') && (password === 'golden123' || password === 'admin')) {
        sessionStorage.setItem('golden_admin_auth', 'true');
        setIsLoggingIn(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setIsLoggingIn(false);
        setError('Invalid admin credentials. Please use default admin login credentials shown below.');
      }
    }, 600);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-solar-950 via-solar-900 to-solar-800 text-white p-8 text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <img
            src="/logo.png"
            alt="Golden Electricals Logo"
            className="h-12 w-auto object-contain mx-auto bg-white/95 p-2 rounded-xl shadow-md"
          />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-semibold border border-gold-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Authorized Admin Portal</span>
          </div>

          <h1 className="font-heading text-2xl font-extrabold text-white">
            Admin Dashboard Login
          </h1>
          <p className="text-solar-200 text-xs">
            Sign in to view customer solar leads, light bill files, and send quotes.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 pt-2 space-y-5">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium space-y-1">
              <p className="font-bold flex items-center gap-1">
                <span>⚠️ Authentication Error</span>
              </p>
              <p>{error}</p>
            </div>
          )}

          {/* Email / Username Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@goldenelectricals.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-solar-500 focus:border-solar-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 px-6 rounded-xl bg-solar-500 hover:bg-solar-600 text-white font-bold text-sm shadow-lg shadow-solar-500/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <span>{isLoggingIn ? 'Authenticating...' : 'Login to Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Default Credentials Hint Card */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 space-y-1.5 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <KeyRound className="w-4 h-4 text-amber-600" />
              <span>Default Demo Admin Credentials</span>
            </div>
            <p className="text-[11px] text-amber-700">
              <strong>Email:</strong> <code className="bg-white/80 px-1.5 py-0.5 rounded border border-amber-200">admin@goldenelectricals.com</code>
            </p>
            <p className="text-[11px] text-amber-700">
              <strong>Password:</strong> <code className="bg-white/80 px-1.5 py-0.5 rounded border border-amber-200">golden123</code>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
