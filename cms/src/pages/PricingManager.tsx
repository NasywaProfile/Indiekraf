import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, LayoutTemplate, Layers } from 'lucide-react';

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
          setPricingCategories(Array.isArray(parsed) ? parsed : []);
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
      
      alert('Pengaturan Berhasil Disimpan!');
    } catch (err) {
      alert('Gagal menyimpan pengaturan.');
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
      if (idx === -1) return prev;
      const nw = [...prev];
      (nw[idx] as any)[field] = val;
      return nw;
    });
  };
  const addCategory = () => setPricingCategories(prev => [...prev, { id: `cat-${Date.now()}`, categoryName: '', categoryName_en: '', title: '', title_en: '', subtitle: '', subtitle_en: '', icon: 'Target' }]);
  const removeCategory = (idx: number) => setPricingCategories(prev => prev.filter((_, i) => i !== idx));

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
    setIsSaving(true);
    try {
      const method = editPlan.id ? 'PUT' : 'POST';
      const url = editPlan.id ? `/api/pricing/${editPlan.id}` : '/api/pricing';
      let cleanPrice = editPlan.price.replace(/^Mulai dari\s+/i, '').replace(/\s*\/paket$/i, '').trim();
      if (!/^Rp/i.test(cleanPrice) && cleanPrice !== '') {
        cleanPrice = 'Rp ' + cleanPrice;
      }
      let cleanPriceEn = (editPlan.price_en || '').replace(/^Starting from\s+/i, '').replace(/\s*\/package$/i, '').trim();
      const planToSave = {
        ...editPlan,
        slug: editPlan.slug || editPlan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `plan-${Date.now()}`,
        color_theme: editPlan.color_theme || 'blue',
        category: editPlan.category || '',
        price: cleanPrice,
        price_en: cleanPriceEn,
        name_en: editPlan.name_en || editPlan.name,
        subtitle_en: editPlan.subtitle_en || editPlan.subtitle,
        badge_en: editPlan.badge_en || editPlan.badge,
        bullets_en: editPlan.bullets_en?.length ? editPlan.bullets_en : editPlan.bullets,
        btn_text_id: editPlan.btn_text_id || '',
        btn_text_en: editPlan.btn_text_en || '',
        btn_link: editPlan.btn_link || ''
      };
      await fetch(url, { method, headers, body: JSON.stringify(planToSave) });
      setShowModal(false);
      fetchPlans();
      alert('Paket Harga Berhasil Disimpan!');
    } catch (err) {
      alert('Gagal menyimpan paket harga. Silakan coba lagi.');
      console.error(err);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus paket harga ini?')) return;
    await fetch(`/api/pricing/${id}`, { method: 'DELETE', headers });
    fetchPlans();
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
                {isSavingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Hero'}
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'plans' && (
        <>
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-6">
          <h2 className="font-bold text-[#0A2472] flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            Kelola Paket Harga
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleSaveSettings}
              disabled={isSavingSettings}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm shadow-emerald-200 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSavingSettings ? 'Menyimpan...' : 'Simpan Header Kategori'}
            </button>
            <button
              onClick={() => openCreate()}
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
          Object.entries(plansByCategory).map(([cat, categoryPlans]) => {
            const catObj = pricingCategories.find(c => c.categoryName === cat);
            return (
            <div key={cat} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0A2472] uppercase tracking-wider">{cat}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">{categoryPlans.length} Paket</span>
                  <button onClick={() => openCreate(cat)} className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                    <Plus className="w-3 h-3" /> Tambah Paket
                  </button>
                </div>
              </div>
              
              {/* CATEGORY HEADER EDITOR */}
              {catObj && (
                <div className="p-6 bg-white border-b border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Kategori (ID)</label>
                      <input value={catObj.title} onChange={e => updateCategoryDetails(cat, 'title', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="Contoh: Pelatihan Digital Marketing" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Kategori (EN)</label>
                      <input value={catObj.title_en} onChange={e => updateCategoryDetails(cat, 'title_en', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="e.g. Digital Marketing Training" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Subjudul (ID)</label>
                      <input value={catObj.subtitle} onChange={e => updateCategoryDetails(cat, 'subtitle', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="Workshop - Kelas - Bootcamp" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Subjudul (EN)</label>
                      <input value={catObj.subtitle_en} onChange={e => updateCategoryDetails(cat, 'subtitle_en', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="Workshop - Classes - Bootcamp" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Ikon (Lucide)</label>
                    <select 
                      value={catObj.icon || 'Target'} 
                      onChange={e => updateCategoryDetails(cat, 'icon', e.target.value)} 
                      className="w-full md:w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      <option value="Target">Target</option>
                      <option value="GraduationCap">GraduationCap (Edukasi/Pelatihan)</option>
                      <option value="Paintbrush">Paintbrush (Desain/Branding)</option>
                      <option value="Share2">Share2 (Sosial Media)</option>
                      <option value="Video">Video (Produksi Konten)</option>
                      <option value="Search">Search (SEO & SEM)</option>
                      <option value="Globe">Globe (Website/Internet)</option>
                      <option value="MessageSquare">MessageSquare (Konsultasi)</option>
                      <option value="Briefcase">Briefcase (Bisnis/Corporate)</option>
                      <option value="TrendingUp">TrendingUp (Marketing/Sales)</option>
                      <option value="Layers">Layers (Studio/Project)</option>
                      <option value="PenTool">PenTool (Desain/UI)</option>
                      <option value="Smartphone">Smartphone (Aplikasi Mobile)</option>
                      <option value="Code">Code (Development)</option>
                      <option value="Camera">Camera (Fotografi)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white border-b border-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paket</th>
                      <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harga</th>
                      <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {categoryPlans.map(plan => (
                      <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#0A2472]">{plan.name}</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">{plan.subtitle}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-bold text-[#0A2472]">{plan.price}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(plan)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(plan.id!)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            );
          })
        )}
      </div>
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Badge (ID)</label>
                  <input value={editPlan.badge || ''} onChange={e => setEditPlan(p => ({ ...p, badge: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Contoh: POPULER" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Badge (EN)</label>
                  <input value={editPlan.badge_en || ''} onChange={e => setEditPlan(p => ({ ...p, badge_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="e.g.: POPULAR" />
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
