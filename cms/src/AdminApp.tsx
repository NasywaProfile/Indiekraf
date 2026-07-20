import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';

export interface AdminUser {
  id: number;
  username: string;
  name: string;
}

export type AdminPage = 
  | 'dashboard'
  | 'home'
  | 'about'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'blog'
  | 'contact'
  | 'navbar'
  | 'settings'
  | 'cta_footer';

export default function AdminApp() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<AdminPage>('navbar');

  // Check existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    // Verify token
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid) setUser(data.user);
      })
      .catch(() => localStorage.removeItem('cms_token'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = (token: string, userData: AdminUser) => {
    localStorage.setItem('cms_token', token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A2472] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      user={user}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    />
  );
}
