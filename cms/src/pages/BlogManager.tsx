import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Image, LayoutTemplate, Layers } from 'lucide-react';

interface BlogPost {
  id?: number;
  category: string;
  category_en: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  content: string;
  content_en: string;
  author: string;
  author_en: string;
  image_url: string;
  read_more_id: string;
  read_more_en: string;
  read_more_link: string;
  is_published: number;
}

const emptyItem: BlogPost = {
  category: '',
  category_en: '',
  title: '',
  title_en: '',
  description: '',
  description_en: '',
  content: '',
  content_en: '',
  author: 'Tim Indiekraf',
  author_en: 'Indiekraf Team',
  image_url: '',
  read_more_id: '',
  read_more_en: '',
  read_more_link: '',
  is_published: 1,
};

// The types will now be dynamically fetched from settings or fallback to these
const defaultBlogTypes = [
  { id: 'game', label_id: 'Industri Game', label_en: 'Game Industry' },
  { id: 'tech', label_id: 'Tech & Startup', label_en: 'Tech & Startup' },
  { id: 'design', label_id: 'Desain & Branding', label_en: 'Design & Branding' },
  { id: 'economy', label_id: 'Ekonomi Kreatif', label_en: 'Creative Economy' },
  { id: 'business', label_id: 'Tips & Bisnis', label_en: 'Tips & Business' },
];

export default function BlogManager() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost>(emptyItem);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'hero' | 'plans'>('hero');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [blogCategories, setBlogCategories] = useState<typeof defaultBlogTypes>([]);
  const [uploadingHeroImg, setUploadingHeroImg] = useState<'left' | 'right' | null>(null);

  const token = localStorage.getItem('cms_token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/blog/all', { headers });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {}
    setIsLoading(false);
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings', { headers });
      const data = await res.json();
      let obj: Record<string, string> = {};
      if (Array.isArray(data)) {
        data.forEach((s: any) => obj[s.setting_key] = s.setting_value);
      } else if (data && typeof data === 'object') {
        obj = { ...data };
      }
      setSettings(obj);
      if (obj['blog_categories']) {
        try {
          setBlogCategories(JSON.parse(obj['blog_categories']));
        } catch {}
      } else {
        setBlogCategories(defaultBlogTypes);
      }
    } catch {}
  };

  useEffect(() => { 
    fetchItems();
    fetchSettings();
  }, []);

  const handleChangeSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const keysToSave = [
        'blog_searchPlaceholder_id', 'blog_searchPlaceholder_en',
        'email_destination_newsletter', 'email_destination_press_release'
      ];
      const payload: Record<string, string> = {};
      for (const key of keysToSave) {
        if (settings[key] !== undefined) {
          payload[key] = settings[key];
        }
      }
      payload['blog_categories'] = JSON.stringify(blogCategories);
      
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save settings');
      
      alert('Pengaturan Kategori & Pencarian Berhasil Disimpan!');
    } catch (err) {
      alert('Gagal menyimpan pengaturan.');
    }
    setIsSavingSettings(false);
  };

  const updateCategory = (idx: number, field: string, val: string) => {
    const newCats = [...blogCategories];
    newCats[idx] = { ...newCats[idx], [field]: val };
    setBlogCategories(newCats);
  };
  const addCategory = () => setBlogCategories([...blogCategories, { id: '', label_id: '', label_en: '' }]);
  const removeCategory = (idx: number) => setBlogCategories(blogCategories.filter((_, i) => i !== idx));

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroImg(side);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        handleChangeSetting(`blog_hero_image_${side}`, data.url);
      }
    } catch {}
    setUploadingHeroImg(null);
  };

  const openCreate = () => { setEditItem(emptyItem); setShowModal(true); };
  const openEdit = (item: BlogPost) => { setEditItem({ ...item }); setShowModal(true); };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const method = editItem.id ? 'PUT' : 'POST';
      const url = editItem.id ? `/api/blog/${editItem.id}` : '/api/blog';
      await fetch(url, { method, headers, body: JSON.stringify(editItem) });
      setShowModal(false);
      fetchItems();
    } catch {}
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus item portofolio ini?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE', headers });
    fetchItems();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) setEditItem(p => ({ ...p, image_url: data.url }));
    } catch {}
    setUploadingImage(false);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-4">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          1. Kategori & Filter
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
          2. Daftar Artikel
        </button>
      </div>

      {activeTab === 'hero' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <h2>Kategori & Pencarian Artikel</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Pencarian (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['blog_searchPlaceholder_id'] ?? 'Cari topik, judul artikel, atau kata kunci...'}
                  onChange={e => handleChangeSetting('blog_searchPlaceholder_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Pencarian (English)</label>
                <input
                  type="text"
                  value={settings['blog_searchPlaceholder_en'] ?? 'Search topics, article titles, or keywords...'}
                  onChange={e => handleChangeSetting('blog_searchPlaceholder_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2 border-t border-slate-100 pt-6">
                <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider mb-2">Pengaturan Email Penerima Formulir Blog</label>
                <p className="text-xs text-slate-500 mb-4">Tentukan alamat email penerima untuk pendaftaran Insight/Newsletter dan pengajuan Kontribusi Rilis Pers.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email Penerima "Kirim Insight" (Newsletter)</label>
                    <input
                      type="email"
                      value={settings['email_destination_newsletter'] ?? 'fikar@indiekraf.com'}
                      onChange={e => handleChangeSetting('email_destination_newsletter', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="fikar@indiekraf.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email Penerima "Kirim Rilis Pers Sekarang"</label>
                    <input
                      type="email"
                      value={settings['email_destination_press_release'] ?? 'fikar@indiekraf.com'}
                      onChange={e => handleChangeSetting('email_destination_press_release', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="fikar@indiekraf.com"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="md:col-span-2 border-t border-slate-100 pt-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tombol Filter Kategori Artikel</label>
                <p className="text-xs text-slate-500 mb-4">Tambahkan kategori/tipe portofolio yang akan ditampilkan sebagai filter. ID digunakan secara internal untuk tipe proyek.</p>
                <div className="space-y-3">
                  {blogCategories.map((cat, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                      <input 
                        value={cat.label_id} 
                        onChange={e => updateCategory(i, 'label_id', e.target.value)}
                        className="w-full sm:w-1/2 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100" 
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
                        className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors shrink-0"
                        title="Hapus Kategori"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={addCategory} 
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-xl transition-colors mt-2"
                  >
                    <Plus className="w-4 h-4" /> Tambah Kategori
                  </button>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSavingSettings}
                className="flex items-center gap-2 px-6 py-3 bg-[#0A2472] text-white text-sm font-bold rounded-xl hover:bg-[#071d5a] transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSavingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Kategori'}
              </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'plans' && (
        <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0A2472]">Artikel</h1>
          <p className="text-slate-400 text-sm mt-1">{items.length} item portofolio</p>
        </div>
        <button
          id="btn-create-blog"
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0A2472] text-white text-xs font-bold rounded-xl hover:bg-[#071d5a] transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Artikel Baru
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
                <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Judul</th>

                <th className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Penulis</th>
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

                  <td className="px-4 py-4 text-xs text-slate-500">{item.author || 'Tim Indiekraf'}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${item.is_published ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                      {item.is_published ? 'Aktif' : 'Nonaktif'}
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
              <h2 className="font-extrabold text-[#0A2472]">{editItem.id ? 'Edit Artikel' : 'Artikel Baru'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Image */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gambar Judul</label>
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
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (Indonesia)</label>
                  <input value={editItem.read_more_id} onChange={e => setEditItem(p => ({ ...p, read_more_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Baca Selengkapnya" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Teks Tombol (English)</label>
                  <input value={editItem.read_more_en} onChange={e => setEditItem(p => ({ ...p, read_more_en: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="Read More" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Isi Artikel / Konten Lengkap (Indonesia)</label>
                <textarea value={editItem.content || ''} onChange={e => setEditItem(p => ({ ...p, content: e.target.value }))}
                  rows={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 font-mono" placeholder="Tulis isi artikel lengkap dalam Bahasa Indonesia..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Isi Artikel / Konten Lengkap (English)</label>
                <textarea value={editItem.content_en || ''} onChange={e => setEditItem(p => ({ ...p, content_en: e.target.value }))}
                  rows={6} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 font-mono" placeholder="Write full article content in English..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                  <select value={editItem.is_published} onChange={e => setEditItem(p => ({ ...p, is_published: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <option value={1}>Terbit</option>
                    <option value={0}>Draft</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50">Batal</button>
              <button id="btn-save-blog" onClick={handleSave} disabled={isSaving}
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
