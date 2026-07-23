import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import type { AdminUser } from '../AdminApp';

interface LoginPageProps {
  onLogin: (token: string, user: AdminUser) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const contentType = res.headers.get('content-type') || '';
      let data: any = {};
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        throw new Error(`Server status ${res.status}`);
      }
      if (!res.ok) {
        setError(data.error || 'Login gagal');
        return;
      }
      onLogin(data.token, data.user);
    } catch {
      setError('Tidak dapat terhubung ke server. Pastikan server berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2472] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6 shadow-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Indiekraf CMS
          </h1>
          <p className="text-blue-200/70 text-sm font-medium">
            Admin Panel — Kelola Konten Website
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="text"
                id="admin-username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="Masukkan username..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300/50 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password..."
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-red-200 text-sm font-medium">
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="admin-login-btn"
              disabled={isLoading}
              className="w-full py-3.5 bg-white text-[#0A2472] font-extrabold text-sm rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-[#0A2472]/30 border-t-[#0A2472] rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
