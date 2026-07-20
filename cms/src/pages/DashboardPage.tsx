import React, { useEffect, useState } from 'react';
import { FileText, FolderOpen, Layers, Tag, TrendingUp, Clock } from 'lucide-react';

interface Stats {
  blog: number;
  portfolio: number;
  services: number;
  pricing: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ blog: 0, portfolio: 0, services: 0, pricing: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch('/api/blog/all', { headers }).then(r => r.json()),
      fetch('/api/portfolio/all', { headers }).then(r => r.json()),
      fetch('/api/services/all', { headers }).then(r => r.json()),
      fetch('/api/pricing/all', { headers }).then(r => r.json()),
    ])
      .then(([blog, portfolio, services, pricing]) => {
        setStats({
          blog: Array.isArray(blog) ? blog.length : 0,
          portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          pricing: Array.isArray(pricing) ? pricing.length : 0,
        });
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const cards = [
    { label: 'Artikel Blog', value: stats.blog, icon: <FileText className="w-5 h-5" />, color: 'bg-blue-500', light: 'bg-blue-50' },
    { label: 'Item Portofolio', value: stats.portfolio, icon: <FolderOpen className="w-5 h-5" />, color: 'bg-indigo-500', light: 'bg-indigo-50' },
    { label: 'Layanan Aktif', value: stats.services, icon: <Layers className="w-5 h-5" />, color: 'bg-purple-500', light: 'bg-purple-50' },
    { label: 'Paket Harga', value: stats.pricing, icon: <Tag className="w-5 h-5" />, color: 'bg-sky-500', light: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0A2472] tracking-tight">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1 font-medium">Selamat datang di Indiekraf CMS Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${card.light} mb-4`}>
              <span className={`${card.color.replace('bg-', 'text-')}`}>{card.icon}</span>
            </div>
            <div className="text-3xl font-extrabold text-[#0A2472] mb-1">
              {isLoading ? <span className="w-8 h-6 bg-slate-100 rounded animate-pulse inline-block" /> : card.value}
            </div>
            <p className="text-slate-400 text-xs font-semibold">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-5 h-5 text-[#0A2472]" />
            <h2 className="font-extrabold text-[#0A2472] text-sm">Aksi Cepat</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: '+ Artikel Baru', hint: 'Tambah konten blog', page: 'blog' },
              { label: '+ Portofolio Baru', hint: 'Tambah karya / proyek', page: 'portfolio' },
              { label: 'Edit Paket Harga', hint: 'Update pricing plan', page: 'pricing' },
              { label: 'Pengaturan Website', hint: 'Hero text, stats, kontak', page: 'settings' },
            ].map(item => (
              <a
                key={item.label}
                href={`#${item.page}`}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-[#0A2472] transition-all group cursor-pointer"
              >
                <div>
                  <p className="text-sm font-bold text-[#0A2472]">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.hint}</p>
                </div>
                <span className="text-slate-300 group-hover:text-[#0A2472] transition-colors">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-[#0A2472] rounded-2xl p-6 shadow-sm text-white">
          <div className="flex items-center gap-3 mb-5">
            <Clock className="w-5 h-5 text-blue-200" />
            <h2 className="font-extrabold text-sm">Info CMS</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
              <p className="text-blue-100/80 text-xs leading-relaxed">Semua perubahan yang Anda simpan di sini akan <strong className="text-white">langsung tampil</strong> di website publik.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
              <p className="text-blue-100/80 text-xs leading-relaxed">Upload gambar maksimal <strong className="text-white">5MB</strong>. Format: JPG, PNG, WebP.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1.5 flex-shrink-0" />
              <p className="text-blue-100/80 text-xs leading-relaxed">Gunakan menu <strong className="text-white">Pengaturan</strong> untuk mengubah teks hero, statistik, dan informasi kontak.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 mt-1.5 flex-shrink-0" />
              <p className="text-blue-100/80 text-xs leading-relaxed">Status database: <strong className="text-green-300">Terhubung ✓</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
