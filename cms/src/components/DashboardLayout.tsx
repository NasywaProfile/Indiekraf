import React from 'react';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Layers,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Home,
  Info,
  Navigation,
  Phone,
  MessageSquare,
} from 'lucide-react';
import type { AdminUser, AdminPage } from '../AdminApp';
import DashboardPage from '../pages/DashboardPage';
import BlogManager from '../pages/BlogManager';
import PortfolioManager from '../pages/PortfolioManager';
import ServicesManager from '../pages/ServicesManager';
import PricingManager from '../pages/PricingManager';
import CtaFooterManager from '../pages/CtaFooterManager';
import HomeManager from '../pages/HomeManager';
import AboutManager from '../pages/AboutManager';
import ContactManager from '../pages/ContactManager';
import NavbarManager from '../pages/NavbarManager';
import Logo from '../../../web/src/components/Logo';

interface DashboardLayoutProps {
  user: AdminUser;
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const navItems: { id: AdminPage; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'navbar', label: 'Menu Navigasi', icon: <Navigation className="w-4 h-4" />, desc: 'Kelola Logo & Daftar Menu' },
  { id: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" />, desc: 'Hero, Tentang, Stats, Layanan, Harga & Why Us' },
  { id: 'about', label: 'Tentang Kami', icon: <Info className="w-4 h-4" />, desc: 'Profil, Visi Misi, Tim & Legalitas' },
  { id: 'services', label: 'Layanan', icon: <Layers className="w-4 h-4" />, desc: 'Halaman Khusus Layanan & Pilar' },
  { id: 'pricing', label: 'Daftar Harga', icon: <Tag className="w-4 h-4" />, desc: 'Halaman Khusus Pricelist & Add-ons' },
  { id: 'portfolio', label: 'Portofolio', icon: <FolderOpen className="w-4 h-4" />, desc: 'Kelola Proyek & Karya' },
  { id: 'blog', label: 'Blog & Artikel', icon: <FileText className="w-4 h-4" />, desc: 'Kelola Berita & Artikel' },
  { id: 'contact', label: 'Hubungi Kami', icon: <Phone className="w-4 h-4" />, desc: 'Info Kontak, Alamat & Jam Kerja' },
  { id: 'cta_footer', label: 'CTA & Footer Website', icon: <MessageSquare className="w-4 h-4" />, desc: 'Ajakan Kolaborasi & Footer Website' },
];

function renderPage(page: AdminPage) {
  switch (page) {
    case 'dashboard': return <NavbarManager />;
    case 'home': return <HomeManager />;
    case 'about': return <AboutManager />;
    case 'services': return <ServicesManager />;
    case 'pricing': return <PricingManager />;
    case 'portfolio': return <PortfolioManager />;
    case 'blog': return <BlogManager />;
    case 'contact': return <ContactManager />;
    case 'navbar': return <NavbarManager />;
    case 'cta_footer': return <CtaFooterManager />;
    default: return <NavbarManager />;
  }
}

export default function DashboardLayout({ user, currentPage, onNavigate, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="w-64 bg-[#0A2472] flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
        {/* Brand */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Logo size={24} className="shrink-0 max-h-6 h-6 w-auto" />
            <div>
              <p className="text-blue-200/60 text-[10px] font-semibold uppercase tracking-widest">CMS Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto dark-scrollbar">
          {navItems.map(item => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                currentPage === item.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-blue-200/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className={currentPage === item.id ? 'text-white' : 'text-blue-300/60 group-hover:text-white transition-colors'}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{item.label}</p>
                <p className="text-[10px] text-blue-200/40 group-hover:text-blue-200/60 truncate">{item.desc}</p>
              </div>
              {currentPage === item.id && (
                <ChevronRight className="w-3 h-3 text-white/60" />
              )}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* View website button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-blue-200/60 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Lihat Website
          </a>
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{user.name?.[0] || user.username[0].toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{user.name || user.username}</p>
              <p className="text-blue-200/50 text-[10px] truncate">@{user.username}</p>
            </div>
          </div>
          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-300/70 hover:text-red-300 hover:bg-red-500/10 transition-all text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────── */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">
          {renderPage(currentPage)}
        </div>
      </main>
    </div>
  );
}
