import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, LayoutTemplate, Layers, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export interface PricingPlan {
  id?: number;
  slug: string;
  name: string;
  name_en?: string;
  subtitle: string;
  subtitle_en?: string;
  price: string;
  price_en?: string;
  badge: string;
  badge_en?: string;
  color_theme: 'blue' | 'indigo' | 'slate';
  bullets: string[];
  bullets_en?: string[];
  category: string;
  category_title?: string;
  category_title_en?: string;
  category_subtitle?: string;
  category_subtitle_en?: string;
  category_icon?: string;
  sort_order: number;
  is_active?: number;
  btn_text_id?: string;
  btn_text_en?: string;
  btn_link?: string;
  price_suffix_id?: string;
  price_suffix_en?: string;
}

const emptyPlan: PricingPlan = {
  slug: '',
  name: '',
  name_en: '',
  subtitle: '',
  subtitle_en: '',
  price: '',
  price_en: '',
  badge: '',
  badge_en: '',
  color_theme: 'blue',
  bullets: [''],
  bullets_en: [''],
  category: '',
  sort_order: 0,
  is_active: 1,
  btn_text_id: '',
  btn_text_en: '',
  btn_link: '',
};

const COLOR_THEMES = ['blue', 'purple', 'pink', 'green'];

export interface PricingCategory {
  id: string;
  categoryName: string;
  categoryName_en: string;
  title: string;
  title_en: string;
  subtitle: string;
  subtitle_en: string;
  icon: string;
}

export default function PricingManager() {
  const { toast, confirmDialog } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState<PricingPlan>(emptyPlan);
  const [isSaving, setIsSaving] = useState(false);

  const token = localStorage.getItem('cms_token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/pricing/all', { headers });
      const data = await res.json();
      setPlans(Array.isArray(data) ? data : []);
    } catch {}
    setIsLoading(false);
  };

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [pricingCategories, setPricingCategories] = useState<PricingCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'hero' | 'plans'>('hero');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings', { headers });
      const data = await res.json();
      setSettings(data);
      if (data['pricing_categories_data']) {
        try {
          const parsed = JSON.parse(data['pricing_categories_data']);
          const cats = Array.isArray(parsed) ? parsed : [];
          setPricingCategories(cats);
          if (cats.length > 0 && !selectedCategory) {
            setSelectedCategory(cats[0].categoryName);
          }
        } catch {}
      } else {
        setPricingCategories([]);
      }
    } catch {}
  };

  useEffect(() => { 
    fetchPlans(); 
    fetchSettings(); 
  }, []);

  const handleChangeSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const keysToSave = ['pricing_hero_title_id', 'pricing_hero_title_en', 'pricing_hero_desc_id', 'pricing_hero_desc_en'];
      const payload: Record<string, string> = {};
      for (const key of keysToSave) {
        if (settings[key] !== undefined) {
          payload[key] = settings[key];
        }
      }
      payload['pricing_categories_data'] = JSON.stringify(pricingCategories);
      
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save settings');
      
      toast.success('Pengaturan berhasil disimpan!');
    } catch (err) {
      toast.error('Gagal menyimpan pengaturan.');
    }
    setIsSavingSettings(false);
  };

  const updateCategoryName = (idx: number, val: string, isEn = false) => {
    setPricingCategories(prev => {
      const nw = [...prev];
      if (isEn) {
        nw[idx].categoryName_en = val;
      } else {
        nw[idx].categoryName = val;
      }
      return nw;
    });
  };
  const updateCategoryDetails = (catName: string, field: string, val: string) => {
    setPricingCategories(prev => {
      const idx = prev.findIndex(c => c.categoryName === catName);
      const nw = [...prev];
      if (idx === -1) {
        nw.push({
          id: `cat-${Date.now()}`,
          categoryName: catName,
          categoryName_en: catName,
          title: '',
          title_en: '',
          subtitle: '',
          subtitle_en: '',
          icon: 'Megaphone',
          [field]: val
        } as any);
      } else {
        (nw[idx] as any)[field] = val;
      }
      return nw;
    });
  };

  const createAdvertisingCategory = () => {
    setPricingCategories(prev => {
      if (prev.some(c => c.categoryName === 'Advertising & Publishing')) return prev;
      return [
        ...prev,
        {
          id: `cat-${Date.now()}`,
          categoryName: 'Advertising & Publishing',
          categoryName_en: 'Advertising & Publishing',
          title: 'Advertising & Publishing',
          title_en: 'Advertising & Publishing',
          subtitle: 'Layanan iklan dan publikasi',
          subtitle_en: 'Advertising and publishing services',
          icon: 'Megaphone'
        }
      ];
    });
  };

  const addCategory = () => {
    const newCat: PricingCategory = {
      id: `cat-${Date.now()}`,
      categoryName: '',
      categoryName_en: '',
      title: '',
      title_en: '',
      subtitle: '',
      subtitle_en: '',
      icon: 'Target'
    };
    setPricingCategories(prev => [...prev, newCat]);
  };
  
  const removeCategory = (idx: number) => {
    setPricingCategories(prev => {
      const nw = prev.filter((_, i) => i !== idx);
      if (selectedCategory === prev[idx].categoryName && nw.length > 0) {
        setSelectedCategory(nw[0].categoryName);
      } else if (nw.length === 0) {
        setSelectedCategory('');
      }
      return nw;
    });
  };

  const openCreate = (cat: string = '') => { setEditPlan({...emptyPlan, category: cat}); setShowModal(true); };
  const openEdit = (p: PricingPlan) => {
    setEditPlan({
      ...p,
      price: (p.price || '').replace(/^Mulai dari\s+/i, '').replace(/\s*\/paket$/i, '').trim(),
      price_en: (p.price_en || '').replace(/^Starting from\s+/i, '').replace(/\s*\/package$/i, '').trim(),
      bullets: Array.isArray(p.bullets) ? p.bullets : [],
      bullets_en: Array.isArray(p.bullets_en) ? p.bullets_en : []
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editPlan.name.trim()) {
      toast.warning('Nama paket wajib diisi!');
      return;
    }
    setIsSaving(true);
    try {
      const method = editPlan.id ? 'PUT' : 'POST';
      const url = editPlan.id ? `/api/pricing/${editPlan.id}` : '/api/pricing';
      let cleanPrice = (editPlan.price || '').replace(/^Mulai dari\s+/i, '').replace(/\s*\/paket$/i, '').trim();
      if (!/^Rp/i.test(cleanPrice) && cleanPrice !== '') {
        cleanPrice = 'Rp ' + cleanPrice;
      }
      let cleanPriceEn = (editPlan.price_en || '').replace(/^Starting from\s+/i, '').replace(/\s*\/package$/i, '').trim();
      
      const validColors = ['blue', 'purple', 'pink', 'green'];
      const safeColor = validColors.includes(editPlan.color_theme) ? editPlan.color_theme : 'blue';

      const planToSave = {
        ...editPlan,
        slug: editPlan.slug || editPlan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `plan-${Date.now()}`,
        color_theme: safeColor,
        category: editPlan.category || selectedCategory || '',
        category_title: editPlan.category_title || '',
        category_title_en: editPlan.category_title_en || '',
        category_subtitle: editPlan.category_subtitle || '',
        category_subtitle_en: editPlan.category_subtitle_en || '',
        category_icon: editPlan.category_icon || 'Target',
        subtitle: editPlan.subtitle || '',
        subtitle_en: editPlan.subtitle_en || editPlan.subtitle || '',
        badge: editPlan.badge || '',
        badge_en: editPlan.badge_en || editPlan.badge || '',
        price: cleanPrice,
        price_en: cleanPriceEn,
        name_en: editPlan.name_en || editPlan.name,
        bullets: (editPlan.bullets || []).filter(b => b.trim() !== ''),
        bullets_en: (editPlan.bullets_en || []).filter(b => b.trim() !== ''),
        btn_text_id: editPlan.btn_text_id || '',
        btn_text_en: editPlan.btn_text_en || '',
        btn_link: editPlan.btn_link || ''
      };
      
      const res = await fetch(url, { method, headers, body: JSON.stringify(planToSave) });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        throw new Error(data.message || data.error || `Gagal menyimpan paket harga (HTTP ${res.status})`);
      }

      setShowModal(false);
      await fetchPlans();
      toast.success(editPlan.id ? 'Paket harga berhasil diedit!' : 'Paket harga berhasil disimpan!');
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan paket harga. Silakan coba lagi.');
      console.error('Error saving plan:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      title: 'Hapus Paket Harga',
      message: 'Apakah Anda yakin ingin menghapus paket harga ini?',
      confirmText: 'Ya, Hapus',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/pricing/${id}`, { method: 'DELETE', headers });
          if (res.ok) {
            toast.success('Paket harga berhasil dihapus!');
            fetchPlans();
          } else {
            toast.error('Gagal menghapus paket harga.');
          }
        } catch (err: any) {
          toast.error('Gagal menghapus paket harga.');
        }
      }
    });
  };

  const updateBullet = (idx: number, val: string, isEn = false) => {
    setEditPlan(p => {
      if (isEn) {
        const bullets_en = [...(p.bullets_en || [])];
        bullets_en[idx] = val;
        return { ...p, bullets_en };
      } else {
        const bullets = [...(p.bullets || [])];
        bullets[idx] = val;
        return { ...p, bullets };
      }
    });
  };

  const addBullet = (isEn = false) => setEditPlan(p => isEn ? { ...p, bullets_en: [...(p.bullets_en || []), ''] } : { ...p, bullets: [...(p.bullets || []), ''] });
  const removeBullet = (idx: number, isEn = false) => setEditPlan(p => isEn ? { ...p, bullets_en: (p.bullets_en || []).filter((_, i) => i !== idx) } : { ...p, bullets: (p.bullets || []).filter((_, i) => i !== idx) });

  const plansByCategory = plans.reduce((acc, plan) => {
    const cat = plan.category || 'Tanpa Kategori';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(plan);
    return acc;
  }, {} as Record<string, PricingPlan[]>);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-[#0A2472]">Kelola Daftar Harga & Paket</h1>
        <p className="text-sm text-slate-500 mt-1">Atur banner hero, kategori, dan rincian paket layanan</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/60 pb-4">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          1. Hero Banner
        </button>
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'plans'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          2. Daftar Paket Harga
        </button>
      </div>

      {activeTab === 'hero' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <h2>Hero Banner Halaman Daftar Harga</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['pricing_hero_title_id'] ?? 'Pilih paket bangun lebih cerdas'}
                  onChange={e => handleChangeSetting('pricing_hero_title_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <input
                  type="text"
                  value={settings['pricing_hero_title_en'] ?? 'Pick a plan build smarter'}
                  onChange={e => handleChangeSetting('pricing_hero_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={settings['pricing_hero_desc_id'] ?? 'Pilih paket yang sesuai dengan visi Anda, dirancang untuk solo founder, tim yang berkembang pesat, dan agensi SaaS modern.'}
                  onChange={e => handleChangeSetting('pricing_hero_desc_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi (English)</label>
                <textarea
                  rows={2}
                  value={settings['pricing_hero_desc_en'] ?? 'Choose a plan that scales with your vision built for solo founders, fast growing teams and modern SaaS agencies.'}
                  onChange={e => handleChangeSetting('pricing_hero_desc_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            {/* Categories */}
            <div className="border-t border-slate-100 pt-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tombol Kategori Paket</label>
              <p className="text-xs text-slate-500 mb-4">Kelola nama tombol kategori untuk filter di halaman daftar harga.</p>
              <div className="space-y-3">
                {pricingCategories.map((cat, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-2">
                    <input 
                      value={cat.categoryName} 
                      onChange={e => updateCategoryName(i, e.target.value)} 
                      placeholder="Nama ID (misal: Pelatihan)"
                      className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
                    />
                    <input 
                      value={cat.categoryName_en} 
                      onChange={e => updateCategoryName(i, e.target.value, true)} 
                      placeholder="Nama EN (misal: Training)"
                      className="flex-1 w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
                    />
                    <button type="button" onClick={() => removeCategory(i)} className="p-2.5 rounded-xl hover:bg-red-50 text-slate-300 hover:text-red-400 border border-transparent hover:border-red-100 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addCategory} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 mt-2 bg-blue-50/50 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Kategori
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="flex items-center gap-2 px-6 py-3 bg-[#0A2472] text-white text-sm font-bold rounded-xl hover:bg-[#071d5a] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'plans' && (
        <>
        {/* Category Management Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6">
          <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            Pengaturan Kategori
          </h3>
          <div className="space-y-3">
            {pricingCategories.map((cat, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex-1 w-full space-y-2 sm:space-y-0 sm:flex sm:gap-3 sm:items-center">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Nama Kategori (ID)</p>
                    <input 
                      value={cat.categoryName} 
                      onChange={e => {
                        const oldName = cat.categoryName;
                        const newName = e.target.value;
                        setPricingCategories(prev => {
                          const nw = [...prev];
                          nw[i].categoryName = newName;
                          return nw;
                        });
                        if (selectedCategory === oldName) {
                          setSelectedCategory(newName);
                        }
                      }} 
                      placeholder="Misal: Pelatihan"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Nama Kategori (EN)</p>
                    <input 
                      value={cat.categoryName_en} 
                      onChange={e => setPricingCategories(prev => {
                        const nw = [...prev];
                        nw[i].categoryName_en = e.target.value;
                        return nw;
                      })} 
                      placeholder="e.g. Training"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCategory(cat.categoryName)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                      selectedCategory === cat.categoryName
                        ? 'bg-[#0A2472] text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    Kelola
                  </button>
                  <button 
                    onClick={() => removeCategory(i)}
                    className="p-2.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 border border-transparent hover:border-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => {
                addCategory();
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 mt-2 bg-blue-50/50 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Tambah Kategori Baru
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={isSavingSettings}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

        {/* Pricing Packages Section */}
        {selectedCategory ? (
          <>
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-6">
              <h2 className="font-bold text-[#0A2472] flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Kelola Paket Harga - {selectedCategory}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => openCreate(selectedCategory)}
                  className="px-4 py-2 bg-[#0A2472] hover:bg-[#0A2472]/90 text-white rounded-xl text-sm font-bold shadow-sm shadow-blue-900/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Paket Baru
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400 text-sm">Memuat data...</div>
              ) : (
                (() => {
                  const categoryPlans = plansByCategory[selectedCategory] || [];
                  const catObj = pricingCategories.find(c => c.categoryName === selectedCategory);
                  const categoryHeader = catObj || {
                    id: `cat-${selectedCategory}`,
                    categoryName: selectedCategory,
                    categoryName_en: selectedCategory,
                    title: selectedCategory,
                    title_en: selectedCategory,
                    subtitle: '',
                    subtitle_en: '',
                    icon: 'Target'
                  };
                  
                  return (
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <LayoutTemplate className="w-4 h-4 text-indigo-500" />
                          Pengaturan Header Kategori
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Kategori (ID)</label>
                            <input
                              value={categoryHeader.title}
                              onChange={e => updateCategoryDetails(selectedCategory, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                              placeholder="Contoh: Pelatihan"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Kategori (EN)</label>
                            <input
                              value={categoryHeader.title_en}
                              onChange={e => updateCategoryDetails(selectedCategory, 'title_en', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                              placeholder="e.g. Training"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Subjudul (ID)</label>
                            <input
                              value={categoryHeader.subtitle}
                              onChange={e => updateCategoryDetails(selectedCategory, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                              placeholder="Deskripsi kategori"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Subjudul (EN)</label>
                            <input
                              value={categoryHeader.subtitle_en}
                              onChange={e => updateCategoryDetails(selectedCategory, 'subtitle_en', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                              placeholder="Category description"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ikon (Lucide)</label>
                          <select
                            value={categoryHeader.icon || 'Target'}
                            onChange={e => updateCategoryDetails(selectedCategory, 'icon', e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 bg-white"
                          >
                            <option value="Target">Target</option>
                            <option value="Megaphone">Megaphone (Advertising)</option>
                            <option value="Share2">Share2 (Sosial Media)</option>
                            <option value="Video">Video (Produksi Konten)</option>
                            <option value="Search">Search (SEO & SEM)</option>
                            <option value="Globe">Globe (Website/Internet)</option>
                            <option value="MessageSquare">MessageSquare (Konsultasi)</option>
                            <option value="TrendingUp">TrendingUp (Marketing/Sales)</option>
                            <option value="Zap">Zap (Aktivasi)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider mb-4">Daftar Paket ({categoryPlans.length} paket)</h3>
                        {categoryPlans.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
                            <p className="text-slate-400 text-sm mb-4">Belum ada paket untuk kategori ini</p>
                            <button
                              onClick={() => openCreate(selectedCategory)}
                              className="px-4 py-2 bg-[#0A2472] hover:bg-[#0A2472]/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 mx-auto"
                            >
                              <Plus className="w-4 h-4" />
                              Buat Paket Pertama
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryPlans.map(plan => (
                              <div key={plan.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all overflow-hidden flex flex-col">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100 px-4 py-4">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1">
                                      <h4 className="text-sm font-bold text-[#0A2472] line-clamp-2">{plan.name}</h4>
                                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{plan.subtitle}</p>
                                    </div>
                                    {plan.badge && (
                                      <span className="text-[10px] font-bold text-white bg-[#0A2472] px-2 py-1 rounded-md whitespace-nowrap flex-shrink-0">
                                        {plan.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="px-4 py-4 flex-1">
                                  <div className="mb-3">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Harga</p>
                                    <p className="text-lg font-bold text-[#0A2472]">{plan.price}</p>
                                  </div>
                                  {(() => {
                                    const bulletsArr = Array.isArray(plan.bullets)
                                      ? plan.bullets
                                      : (typeof plan.bullets === 'string' ? (() => { try { const p = JSON.parse(plan.bullets); return Array.isArray(p) ? p : []; } catch { return []; } })() : []);
                                    return bulletsArr.length > 0 && (
                                      <div className="mb-3">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fitur</p>
                                        <ul className="space-y-1.5">
                                          {bulletsArr.slice(0, 3).map((bullet: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2">
                                              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                              <span className="text-[11px] text-slate-600 line-clamp-2">{bullet}</span>
                                            </li>
                                          ))}
                                          {bulletsArr.length > 3 && (
                                            <li className="text-[10px] text-slate-400 italic">+{bulletsArr.length - 3} fitur lainnya</li>
                                          )}
                                        </ul>
                                      </div>
                                    );
                                  })()}
                                </div>

                                <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/50 flex items-center justify-between gap-2">
                                  <button
                                    onClick={() => openEdit(plan)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors text-[11px] font-bold"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(plan.id!)}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors text-[11px] font-bold"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <p className="text-slate-400 text-sm mb-4">Belum ada kategori. Buat kategori baru untuk mulai mengelola paket harga.</p>
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-[#0A2472] hover:bg-[#0A2472]/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Buat Kategori Baru
            </button>
          </div>
        )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-[#0A2472]">{editPlan.id ? 'Edit Paket' : 'Paket Baru'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Paket (ID)</label>
                  <input value={editPlan.name || ''} onChange={e => setEditPlan(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Nama paket..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Paket (EN)</label>
                  <input value={editPlan.name_en || ''} onChange={e => setEditPlan(p => ({ ...p, name_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Plan name..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Harga (Nominal ID)</label>
                  <input value={editPlan.price || ''} onChange={e => setEditPlan(p => ({ ...p, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Contoh: 1JT / Rp 2.5JT" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Harga (Nominal EN)</label>
                  <input value={editPlan.price_en || ''} onChange={e => setEditPlan(p => ({ ...p, price_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="e.g.: 1M / $100" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (ID)</label>
                  <input value={editPlan.btn_text_id || ''} onChange={e => setEditPlan(p => ({ ...p, btn_text_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Default: Hubungi Kami" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (EN)</label>
                  <input value={editPlan.btn_text_en || ''} onChange={e => setEditPlan(p => ({ ...p, btn_text_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Default: Contact Us" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Link Tombol Target (Kosongkan jika ingin scroll ke form contact)</label>
                  <input value={editPlan.btn_link || ''} onChange={e => setEditPlan(p => ({ ...p, btn_link: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="e.g.: https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0" />
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Fitur Paket (ID)</label>
                  <div className="space-y-2">
                    {(editPlan.bullets || []).map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={b} onChange={e => updateBullet(i, e.target.value, false)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder={`Fitur ID ${i + 1}...`} />
                        <button type="button" onClick={() => removeBullet(i, false)} className="p-2 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addBullet(false)} className="text-xs font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Tambah Fitur ID
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Fitur Paket (EN)</label>
                  <div className="space-y-2">
                    {(editPlan.bullets_en || []).map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={b} onChange={e => updateBullet(i, e.target.value, true)}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder={`Feature EN ${i + 1}...`} />
                        <button type="button" onClick={() => removeBullet(i, true)} className="p-2 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addBullet(true)} className="text-xs font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Tambah Fitur EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Batal</button>
              <button id="btn-save-plan" onClick={handleSave} disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A2472] text-white text-xs font-bold rounded-xl hover:bg-[#071d5a] transition-all disabled:opacity-60">
                <Save className="w-3.5 h-3.5" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
