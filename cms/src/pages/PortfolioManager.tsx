import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Image, LayoutTemplate, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface PortfolioItem {
  id?: number;
  client: string;
  client_en: string;
  title: string;
  title_en: string;
  category: string;
  category_en: string;
  description: string;
  description_en: string;
  image_url: string;
  sort_order: number;
  is_active: number;
  btn_text_id: string;
  btn_text_en: string;
  link_url: string;
}

const emptyItem: PortfolioItem = {
  client: '',
  client_en: '',
  title: '',
  title_en: '',
  category: '',
  category_en: '',
  description: '',
  description_en: '',
  image_url: '',
  sort_order: 0,
  is_active: 1,
  btn_text_id: '',
  btn_text_en: '',
  link_url: '',
};

// The types will now be dynamically fetched from settings or fallback to these
const defaultPortfolioTypes = [
  { id: 'website', label_id: 'Website & Web Apps', label_en: 'Website & Web Apps' },
  { id: 'branding', label_id: 'Branding & Identitas', label_en: 'Branding & Identity' },
  { id: 'marketing', label_id: 'Digital Marketing', label_en: 'Digital Marketing' },
  { id: 'event', label_id: 'Event & Academy', label_en: 'Event & Academy' },
  { id: 'insight', label_id: 'Riset & Insight', label_en: 'Riset & Insight' },
];

export default function PortfolioManager() {
  const { toast, confirmDialog } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem>(emptyItem);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'hero' | 'plans'>('hero');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [portfolioCategories, setPortfolioCategories] = useState<typeof defaultPortfolioTypes>([]);
  const [uploadingHeroImg, setUploadingHeroImg] = useState<'left' | 'right' | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const token = localStorage.getItem('cms_token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/portfolio/all', { headers });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { }
    setIsLoading(false);
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings', { headers });
      const data = await res.json();
      const obj: Record<string, string> = {};
      if (Array.isArray(data)) {
        data.forEach((s: any) => obj[s.setting_key] = s.setting_value);
      }
      setSettings(obj);
      if (obj['portfolio_categories']) {
        try {
          setPortfolioCategories(JSON.parse(obj['portfolio_categories']));
        } catch { }
      } else {
        setPortfolioCategories(defaultPortfolioTypes);
      }
    } catch { }
  };

  useEffect(() => {
    fetchItems();
    fetchSettings();
  }, []);

  const handleChangeSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    setMessage(null);
    try {
      const keysToSave = [
        'portfolio_hero_badge_id', 'portfolio_hero_badge_en',
        'portfolio_hero_title_id', 'portfolio_hero_title_en',
        'portfolio_hero_titleHighlight_id', 'portfolio_hero_titleHighlight_en',
        'portfolio_hero_subtitle_id', 'portfolio_hero_subtitle_en',
        'portfolio_hero_image_left', 'portfolio_hero_image_right'
      ];
      const payload: Record<string, string> = {};
      for (const key of keysToSave) {
        if (settings[key] !== undefined) {
          payload[key] = settings[key];
        }
      }
      payload['portfolio_categories'] = JSON.stringify(portfolioCategories);

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save settings');

      setMessage({ type: 'success', text: customMsg || 'Pengaturan Portofolio Berhasil Disimpan!' });
      toast.success(customMsg || 'Pengaturan portofolio berhasil disimpan!');
    } catch (err) {
      setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan portofolio.' });
      toast.error('Gagal menyimpan pengaturan portofolio.');
    }
    setIsSavingSettings(false);
  };

  const updateCategory = (idx: number, field: string, val: string) => {
    const newCats = [...portfolioCategories];
    newCats[idx] = { ...newCats[idx], [field]: val };
    setPortfolioCategories(newCats);
  };
  const addCategory = () => setPortfolioCategories([...portfolioCategories, { id: '', label_id: '', label_en: '' }]);
  const removeCategory = (idx: number) => setPortfolioCategories(portfolioCategories.filter((_, i) => i !== idx));

  const compressImageIfNeeded = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/') || file.size <= 1024 * 1024) {
      return file;
    }
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1920;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(newFile);
                } else {
                  resolve(file);
                }
              },
              'image/jpeg',
              0.85
            );
          } else {
            resolve(file);
          }
        };
        img.onerror = () => resolve(file);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const safeUploadImage = async (rawFile: File): Promise<string | null> => {
    const compressedFile = await compressImageIfNeeded(rawFile);
    const formData = new FormData();
    formData.append('image', compressedFile);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) {
      throw new Error(data.error || data.message || `Upload gagal (Status ${res.status})`);
    }
    return data.url;
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroImg(side);
    try {
      const url = await safeUploadImage(file);
      if (url) {
        handleChangeSetting(`portfolio_hero_image_${side}`, url);
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengunggah gambar hero. Silakan coba lagi.');
    } finally {
      setUploadingHeroImg(null);
    }
  };

  const openCreate = () => { setEditItem(emptyItem); setShowModal(true); };
  const openEdit = (item: PortfolioItem) => { setEditItem({ ...item }); setShowModal(true); };

  const handleSave = async () => {
    if (!editItem.title.trim()) {
      toast.warning('Judul proyek wajib diisi!');
      return;
    }
    setIsSaving(true);
    try {
      const method = editItem.id ? 'PUT' : 'POST';
      const url = editItem.id ? `/api/portfolio/${editItem.id}` : '/api/portfolio';
      const itemToSave = {
        ...editItem,
        client: editItem.client || editItem.title || '',
        client_en: editItem.client_en || editItem.client || editItem.title || '',
        title: editItem.title || '',
        title_en: editItem.title_en || editItem.title || '',
        category: editItem.category || '',
        category_en: editItem.category_en || editItem.category || '',
        description: editItem.description || '',
        description_en: editItem.description_en || editItem.description || '',
        type: editItem.type || 'website',
        image_url: editItem.image_url || '',
        btn_text_id: editItem.btn_text_id || '',
        btn_text_en: editItem.btn_text_en || '',
        link_url: editItem.link_url || '',
        sort_order: editItem.sort_order || 0,
        is_active: editItem.is_active ?? 1
      };
      const res = await fetch(url, { method, headers, body: JSON.stringify(itemToSave) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || data.error || `Gagal menyimpan portofolio (Status ${res.status})`);
      }
      setShowModal(false);
      fetchItems();
      toast.success(editItem.id ? 'Data Portofolio Berhasil Diedit!' : 'Data Portofolio Berhasil Disimpan!');
      setMessage({ type: 'success', text: 'Data Portofolio Berhasil Disimpan!' });
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan portofolio.');
      setMessage({ type: 'error', text: err.message || 'Gagal menyimpan portofolio.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      title: 'Hapus Item Portofolio',
      message: 'Apakah Anda yakin ingin menghapus item portofolio ini?',
      confirmText: 'Ya, Hapus',
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE', headers });
          if (res.ok) {
            toast.success('Item portofolio berhasil dihapus!');
            fetchItems();
          } else {
            toast.error('Gagal menghapus item portofolio.');
          }
        } catch (err) {
          toast.error('Gagal menghapus item portofolio.');
        }
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await safeUploadImage(file);
      if (url) {
        setEditItem(p => ({ ...p, image_url: url }));
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengunggah gambar proyek. Silakan coba lagi.');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-[#0A2472]">Kelola Portofolio & Karya</h1>
        <p className="text-sm text-slate-500 mt-1">Atur banner hero, filter kategori, dan daftar galeri portofolio</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-4">
        <button
          onClick={() => { setActiveTab('hero'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
        >
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          1. Hero & Kategori
        </button>
        <button
          onClick={() => { setActiveTab('plans'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${activeTab === 'plans'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          2. Daftar Portofolio
        </button>
      </div>

      {activeTab === 'hero' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Section 1: Hero Banner */}
          <form onSubmit={(e) => handleSaveSettings(e, 'Pengaturan Hero Banner Berhasil Disimpan!')} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <h2>Hero Banner Halaman Portofolio</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_badge_id'] ?? 'PORTOFOLIO KAMI'}
                  onChange={e => handleChangeSetting('portfolio_hero_badge_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge (English)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_badge_en'] ?? 'OUR PORTFOLIO'}
                  onChange={e => handleChangeSetting('portfolio_hero_badge_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_title_id'] ?? 'Karya Kreatif Indiekraf'}
                  onChange={e => handleChangeSetting('portfolio_hero_title_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_title_en'] ?? 'Indiekraf Creative Works'}
                  onChange={e => handleChangeSetting('portfolio_hero_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sorotan Judul (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_titleHighlight_id'] ?? 'Project & Portofolio'}
                  onChange={e => handleChangeSetting('portfolio_hero_titleHighlight_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sorotan Judul (English)</label>
                <input
                  type="text"
                  value={settings['portfolio_hero_titleHighlight_en'] ?? 'Project & Portfolio'}
                  onChange={e => handleChangeSetting('portfolio_hero_titleHighlight_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={settings['portfolio_hero_subtitle_id'] ?? 'Menelusuri jejak transformasi digital, perancangan identitas brand eksklusif, riset strategis, serta aktivasi ekosistem kreatif yang telah kami tuntaskan bersama berbagai klien istimewa.'}
                  onChange={e => handleChangeSetting('portfolio_hero_subtitle_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi (English)</label>
                <textarea
                  rows={2}
                  value={settings['portfolio_hero_subtitle_en'] ?? 'Tracing the footsteps of digital transformation, exclusive brand identity design, strategic research, and creative ecosystem activation that we have completed with various special clients.'}
                  onChange={e => handleChangeSetting('portfolio_hero_subtitle_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Mengambang Kiri (cth: Roket)</label>
                <div className="flex items-center gap-3">
                  {settings['portfolio_hero_image_left'] ? (
                    <img src={settings['portfolio_hero_image_left']} alt="" className="w-16 h-16 rounded-xl object-contain bg-slate-100 p-2" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">?</div>
                  )}
                  <label className="cursor-pointer px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                    {uploadingHeroImg === 'left' ? 'Mengupload...' : 'Pilih Gambar'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleHeroImageUpload(e, 'left')} disabled={uploadingHeroImg !== null} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Mengambang Kanan (cth: Laptop)</label>
                <div className="flex items-center gap-3">
                  {settings['portfolio_hero_image_right'] ? (
                    <img src={settings['portfolio_hero_image_right']} alt="" className="w-16 h-16 rounded-xl object-contain bg-slate-100 p-2" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">?</div>
                  )}
                  <label className="cursor-pointer px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                    {uploadingHeroImg === 'right' ? 'Mengupload...' : 'Pilih Gambar'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleHeroImageUpload(e, 'right')} disabled={uploadingHeroImg !== null} />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>

          {/* Section 2: Categories */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2>Tombol Filter Kategori Karya</h2>
            </div>
            <p className="text-xs text-slate-500">Tambahkan kategori/tipe portofolio yang akan ditampilkan sebagai filter. ID digunakan secara internal untuk tipe proyek.</p>
            <div className="space-y-3">
              {portfolioCategories.map((cat, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    value={cat.id}
                    onChange={e => updateCategory(i, 'id', e.target.value)}
                    className="w-full sm:w-1/4 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={`ID (cth: website)`}
                  />
                  <input
                    value={cat.label_id}
                    onChange={e => updateCategory(i, 'label_id', e.target.value)}
                    className="w-full sm:w-1/4 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={`Label ID (cth: Website & Apps)`}
                  />
                  <input
                    value={cat.label_en}
                    onChange={e => updateCategory(i, 'label_en', e.target.value)}
                    className="flex-1 w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder={`Label EN (cth: Website & Apps)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(i)}
                    className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors shrink-0 cursor-pointer"
                    title="Hapus Kategori"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCategory}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-xl transition-colors mt-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tambah Kategori
              </button>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={(e) => handleSaveSettings(e, 'Pengaturan Filter Kategori Berhasil Disimpan!')}
                disabled={isSavingSettings}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0A2472]">Portofolio</h1>
              <p className="text-slate-400 text-sm mt-1">{items.length} item portofolio</p>
            </div>
            <button
              id="btn-create-portfolio"
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2472] text-white text-xs font-bold rounded-xl hover:bg-[#071d5a] transition-all shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Portofolio Baru
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 text-sm">Memuat data...</div>
            ) : items.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">Belum ada portofolio</div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proyek</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Klien</th>
                    <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-[#0A2472] line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-slate-400">{item.category}</p>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500">{item.client}</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${item.is_active ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                          {item.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(item.id!)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-[#0A2472]">{editItem.id ? 'Edit Portofolio' : 'Portofolio Baru'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Image */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gambar Proyek</label>
                <div className="flex items-center gap-3 flex-wrap">
                  {editItem.image_url && (
                    <img src={editItem.image_url} alt="" className="w-20 h-16 rounded-lg object-cover bg-slate-100" />
                  )}
                  <label className="cursor-pointer px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                    {uploadingImage ? 'Mengupload...' : '📁 Pilih Gambar'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                  <input
                    value={editItem.image_url}
                    onChange={e => setEditItem(p => ({ ...p, image_url: e.target.value }))}
                    className="flex-1 min-w-0 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Atau tempel URL gambar..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Klien (Indonesia)</label>
                  <input value={editItem.client} onChange={e => setEditItem(p => ({ ...p, client: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Nama klien..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Klien (English)</label>
                  <input value={editItem.client_en} onChange={e => setEditItem(p => ({ ...p, client_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Client name..." />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul (Indonesia)</label>
                <input value={editItem.title} onChange={e => setEditItem(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Nama proyek..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul (English)</label>
                <input value={editItem.title_en} onChange={e => setEditItem(p => ({ ...p, title_en: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Project name in English..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Kategori (Indonesia)</label>
                  <input value={editItem.category} onChange={e => setEditItem(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Misal: Website Profil Perusahaan" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Kategori (English)</label>
                  <input value={editItem.category_en} onChange={e => setEditItem(p => ({ ...p, category_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="e.g. Company Profile Website" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi (Indonesia)</label>
                <textarea value={editItem.description} onChange={e => setEditItem(p => ({ ...p, description: e.target.value }))}
                  rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" placeholder="Deskripsi singkat proyek..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi (English)</label>
                <textarea value={editItem.description_en} onChange={e => setEditItem(p => ({ ...p, description_en: e.target.value }))}
                  rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none" placeholder="Short project description in English..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Urutan</label>
                  <input type="number" value={editItem.sort_order} onChange={e => setEditItem(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                  <select value={editItem.is_active} onChange={e => setEditItem(p => ({ ...p, is_active: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option value={1}>Aktif</option>
                    <option value={0}>Nonaktif</option>
                  </select>
                </div>
              </div>

              {/* Button Lihat Detail */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tombol "Lihat Detail"</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (Indonesia)</label>
                    <input
                      value={editItem.btn_text_id}
                      onChange={e => setEditItem(p => ({ ...p, btn_text_id: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="cth: Lihat Detail"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (English)</label>
                    <input
                      value={editItem.btn_text_en}
                      onChange={e => setEditItem(p => ({ ...p, btn_text_en: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g. View Details"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">URL Link (opsional)</label>
                  <input
                    value={editItem.link_url}
                    onChange={e => setEditItem(p => ({ ...p, link_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="https://contoh.com/proyek"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Jika diisi, tombol akan membuka link ini di tab baru.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Batal</button>
              <button id="btn-save-portfolio" onClick={handleSave} disabled={isSaving}
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
