import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Image as ImageIcon,
  Globe,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Upload,
  X,
  Loader2
} from 'lucide-react';

interface MenuItem {
  id: string;
  labelId: string;
  labelEn: string;
  active: boolean;
  order: number;
}

interface LanguageItem {
  code: string;
  label: string;
  active: boolean;
  order: number;
}

export default function NavbarManager() {
  const [activeTab, setActiveTab] = useState<'logo' | 'menu' | 'language'>('logo');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State for Add / Edit Menu Item
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuIndex, setEditingMenuIndex] = useState<number | null>(null);
  const [formId, setFormId] = useState('');
  const [formLabelId, setFormLabelId] = useState('');
  const [formLabelEn, setFormLabelEn] = useState('');
  const [formMenuActive, setFormMenuActive] = useState(true);

  // Modal State for Add / Edit Language Dropdown Item
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [editingLangIndex, setEditingLangIndex] = useState<number | null>(null);
  const [formLangCode, setFormLangCode] = useState('');
  const [formLangLabel, setFormLangLabel] = useState('');
  const [formLangActive, setFormLangActive] = useState(true);

  const defaultMenuItems: MenuItem[] = [
    { id: 'home', labelId: 'Beranda', labelEn: 'Home', active: true, order: 1 },
    { id: 'about', labelId: 'Tentang Kami', labelEn: 'About Us', active: true, order: 2 },
    { id: 'services', labelId: 'Layanan', labelEn: 'Services', active: true, order: 3 },
    { id: 'pricing', labelId: 'Daftar Harga', labelEn: 'Pricelist', active: true, order: 4 },
    { id: 'portfolio', labelId: 'Portofolio', labelEn: 'Portfolio', active: true, order: 5 },
    { id: 'blog', labelId: 'Blog', labelEn: 'Blog', active: true, order: 6 },
    { id: 'contact', labelId: 'Hubungi Kami', labelEn: 'Contact Us', active: true, order: 7 },
  ];

  const defaultLanguages: LanguageItem[] = [
    { code: 'id', label: '🇮🇩 IND', active: true, order: 1 },
    { code: 'en', label: '🇺🇸 ENG', active: true, order: 2 },
  ];

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);

        // Parse menu items
        if (data.navbar_menu_items) {
          try {
            const parsed: MenuItem[] = JSON.parse(data.navbar_menu_items);
            parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
            setMenuItems(parsed);
          } catch (e) {
            setMenuItems(defaultMenuItems);
          }
        } else {
          setMenuItems(defaultMenuItems);
        }

        // Parse language items
        if (data.navbar_languages) {
          try {
            const parsedLang: LanguageItem[] = JSON.parse(data.navbar_languages);
            parsedLang.sort((a, b) => (a.order || 0) - (b.order || 0));
            setLanguages(parsedLang);
          } catch (e) {
            setLanguages(defaultLanguages);
          }
        } else {
          // Check legacy keys or fallback to default languages
          const idLabel = data['navbar_lang_id_label'] || '🇮🇩 IND';
          const enLabel = data['navbar_lang_en_label'] || '🇺🇸 ENG';
          setLanguages([
            { code: 'id', label: idLabel, active: true, order: 1 },
            { code: 'en', label: enLabel, active: true, order: 2 },
          ]);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan Navigasi dan Logo' });
        setIsLoading(false);
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  // Upload Foto dari Folder
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      
      handleChange('site_logo_url', data.url);
      setMessage({ type: 'success', text: 'Foto logo berhasil diupload dari folder!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Gagal mengupload foto logo' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ─── CRUD ACTIONS: MENU NAVIGASI ─────────────────────────────────────────
  const handleOpenAddMenuModal = () => {
    setEditingMenuIndex(null);
    setFormId('');
    setFormLabelId('');
    setFormLabelEn('');
    setFormMenuActive(true);
    setIsMenuModalOpen(true);
  };

  const handleOpenEditMenuModal = (index: number) => {
    const item = menuItems[index];
    setEditingMenuIndex(index);
    setFormId(item.id);
    setFormLabelId(item.labelId);
    setFormLabelEn(item.labelEn);
    setFormMenuActive(item.active !== false);
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId.trim() || !formLabelId.trim() || !formLabelEn.trim()) {
      alert('Harap isi ID Target, Label Bahasa Indonesia, dan Label English!');
      return;
    }

    const cleanId = formId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    if (editingMenuIndex === null) {
      const newItem: MenuItem = {
        id: cleanId || 'section',
        labelId: formLabelId.trim(),
        labelEn: formLabelEn.trim(),
        active: formMenuActive,
        order: menuItems.length + 1
      };
      setMenuItems([...menuItems, newItem]);
    } else {
      const updated = [...menuItems];
      updated[editingMenuIndex] = {
        ...updated[editingMenuIndex],
        id: cleanId || 'section',
        labelId: formLabelId.trim(),
        labelEn: formLabelEn.trim(),
        active: formMenuActive
      };
      setMenuItems(updated);
    }
    setIsMenuModalOpen(false);
  };

  const handleDeleteMenu = (index: number) => {
    if (window.confirm(`Yakin ingin menghapus menu "${menuItems[index].labelId}"?`)) {
      const filtered = menuItems.filter((_, idx) => idx !== index).map((item, idx) => ({
        ...item,
        order: idx + 1
      }));
      setMenuItems(filtered);
    }
  };

  const handleToggleMenuActive = (index: number) => {
    const updated = [...menuItems];
    updated[index].active = !updated[index].active;
    setMenuItems(updated);
  };

  const handleMoveMenuUp = (index: number) => {
    if (index === 0) return;
    const updated = [...menuItems];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setMenuItems(updated);
  };

  const handleMoveMenuDown = (index: number) => {
    if (index === menuItems.length - 1) return;
    const updated = [...menuItems];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setMenuItems(updated);
  };

  const handleResetMenuDefault = () => {
    if (window.confirm('Kembalikan daftar menu ke standar (Beranda, Tentang Kami, Layanan, Daftar Harga, Portofolio, Blog, Hubungi Kami)?')) {
      setMenuItems(defaultMenuItems);
    }
  };

  // ─── CRUD ACTIONS: DROPDOWN BAHASA ───────────────────────────────────────
  const handleOpenAddLangModal = () => {
    setEditingLangIndex(null);
    setFormLangCode('');
    setFormLangLabel('');
    setFormLangActive(true);
    setIsLangModalOpen(true);
  };

  const handleOpenEditLangModal = (index: number) => {
    const item = languages[index];
    setEditingLangIndex(index);
    setFormLangCode(item.code);
    setFormLangLabel(item.label);
    setFormLangActive(item.active !== false);
    setIsLangModalOpen(true);
  };

  const handleSaveLangModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLangCode.trim() || !formLangLabel.trim()) {
      alert('Harap isi Kode Bahasa dan Label Bahasa!');
      return;
    }

    const cleanCode = formLangCode.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    if (editingLangIndex === null) {
      const newItem: LanguageItem = {
        code: cleanCode || 'lang',
        label: formLangLabel.trim(),
        active: formLangActive,
        order: languages.length + 1
      };
      setLanguages([...languages, newItem]);
    } else {
      const updated = [...languages];
      updated[editingLangIndex] = {
        ...updated[editingLangIndex],
        code: cleanCode || 'lang',
        label: formLangLabel.trim(),
        active: formLangActive
      };
      setLanguages(updated);
    }
    setIsLangModalOpen(false);
  };

  const handleDeleteLang = (index: number) => {
    if (window.confirm(`Yakin ingin menghapus bahasa "${languages[index].label}"?`)) {
      const filtered = languages.filter((_, idx) => idx !== index).map((item, idx) => ({
        ...item,
        order: idx + 1
      }));
      setLanguages(filtered);
    }
  };

  const handleToggleLangActive = (index: number) => {
    const updated = [...languages];
    updated[index].active = !updated[index].active;
    setLanguages(updated);
  };

  const handleMoveLangUp = (index: number) => {
    if (index === 0) return;
    const updated = [...languages];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setLanguages(updated);
  };

  const handleMoveLangDown = (index: number) => {
    if (index === languages.length - 1) return;
    const updated = [...languages];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setLanguages(updated);
  };

  const handleResetLangDefault = () => {
    if (window.confirm('Kembalikan daftar bahasa ke standar (🇮🇩 IND, 🇺🇸 ENG)?')) {
      setLanguages(defaultLanguages);
    }
  };

  // ─── SAVE ALL ────────────────────────────────────────────────────────────
  const handleSaveAll = async (e?: React.SyntheticEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const payload: Record<string, string> = {
      ...settings,
      navbar_menu_items: JSON.stringify(menuItems),
      navbar_languages: JSON.stringify(languages)
    };

    // Backward compatibility for legacy contact & nav keys
    menuItems.forEach(item => {
      payload[`nav.${item.id}_id`] = item.labelId;
      payload[`nav.${item.id}_en`] = item.labelEn;
      if (item.id === 'contact') {
        payload['nav.contact_id'] = item.labelId;
        payload['nav.contact_en'] = item.labelEn;
        payload['nav_contact_target'] = item.id;
      }
    });

    // Backward compatibility for legacy language labels
    languages.forEach(lang => {
      if (lang.code === 'id') payload['navbar_lang_id_label'] = lang.label;
      if (lang.code === 'en') payload['navbar_lang_en_label'] = lang.label;
    });

    try {
      const token = localStorage.getItem('cms_token');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save');
      setSettings(payload);
      setMessage({ type: 'success', text: 'Perubahan Navigasi, Logo, dan Dropdown Bahasa berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan pengaturan' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-500 font-semibold flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#0A2472]" /> Memuat data navigasi & branding...
      </div>
    );
  }

  const logoUrl = settings['site_logo_url'] || '/logo.png';
  const showLangSwitcher = settings['navbar_show_lang_switcher'] !== 'false';

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola Navigasi & Branding</h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur logo, daftar menu navigasi utama, dan opsi bahasa yang tampil di bagian atas website.
          </p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Sub-Navigation Tabs strictly ordered and styled matching HomeManager layout */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        <button
          type="button"
          onClick={() => { setActiveTab('logo'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'logo'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>1. Foto Logo & Teks</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('menu'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'menu'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>2. Daftar Menu Navigasi</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('language'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'language'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>3. Switcher Bahasa & Kontak</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6 animate-in fade-in duration-200">
        {/* ── SECTION 1: LOGO & TULISAN LOGO (IMAGE CRUD) ──────────────── */}
        {activeTab === 'logo' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h2>1. Foto Logo & Tulisan Logo (Header Navigasi)</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Atur file gambar logo serta teks berdampingan yang muncul pada pojok kiri atas Navigasi website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Form Inputs */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Foto / Gambar Logo (Upload dari Folder PC)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        <span>Mengupload...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5 text-white" />
                        <span>Pilih Foto dari Folder PC</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tulisan Logo (Teks Berdampingan)
                </label>
                <input
                  type="text"
                  value={settings['site_logo_text'] || ''}
                  onChange={e => handleChange('site_logo_text', e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-[#0A2472] bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="indiekraf."
                />
              </div>
            </div>

            {/* Right Col: Current Logo Photo Preview */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center text-center">
              <span className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2.5">Preview Foto Logo Aktif</span>
              <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-100 flex items-center justify-center w-20 h-20">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200"><path d="M24 75A45 45 0 0 1 69 30L69 125A45 45 0 0 1 24 170Z" fill="%230A2472"/><path d="M75 75A45 45 0 0 1 120 30L120 125A45 45 0 0 1 75 170Z" fill="%23293ea2"/><path d="M126 52L126 30A45 45 0 0 1 176 75L176 97A45 45 0 0 1 126 52Z" fill="%23364eb7"/><path d="M126 148L126 170A45 45 0 0 1 176 125L176 103A45 45 0 0 1 126 148Z" fill="%235f75cf"/></svg>';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-extrabold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Logo & Branding'}
            </button>
          </div>
        </div>
      )}

        {/* ── SECTION 2: CRUD MENU NAVIGASI (TEXT / LIST CRUD) ──────────── */}
        {activeTab === 'menu' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg">
                <Navigation className="w-5 h-5 text-indigo-600" />
                <h2>2. Daftar Menu Navigasi Utama</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Daftar link navigasi atas yang terhubung ke target section scroll atau halaman di website.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetMenuDefault}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Kembalikan ke Beranda, Tentang, Layanan, Daftar Harga, Portofolio, Blog, Hubungi Kami"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Standar
              </button>
              <button
                type="button"
                onClick={handleOpenAddMenuModal}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Menu
              </button>
            </div>
          </div>

          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-14">No</th>
                    <th className="py-3 px-3.5">Target Link (#ID)</th>
                    <th className="py-3 px-3.5">Label Bahasa Indonesia</th>
                    <th className="py-3 px-3.5">Label English</th>
                    <th className="py-3 px-3.5 w-24">Status</th>
                    <th className="py-3 px-3.5 text-right w-40">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                  {menuItems.map((item, idx) => (
                    <tr key={item.id + idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5 font-black text-indigo-600">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3.5 font-mono font-bold text-indigo-600">
                        #{item.id}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                        {item.labelId}
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">
                        {item.labelEn}
                      </td>
                      <td className="py-3 px-3.5">
                        {item.active === false ? (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold uppercase">Sembunyi</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">Aktif</span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMoveMenuUp(idx)}
                            disabled={idx === 0}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Naik"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveMenuDown(idx)}
                            disabled={idx === menuItems.length - 1}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Turun"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleMenuActive(idx)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              item.active !== false ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-200'
                            }`}
                            title={item.active !== false ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {item.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditMenuModal(idx)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMenu(idx)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {menuItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Belum ada menu navigasi. Klik <b>"+ Tambah Menu"</b> atau <b>"Reset Standar"</b>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-extrabold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Menu Navigasi'}
            </button>
          </div>
        </div>
      )}

        {/* ── SECTION 3: CRUD DROPDOWN BAHASA (TEXT / LIST CRUD) ────────── */}
        {activeTab === 'language' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg">
                <Globe className="w-5 h-5 text-emerald-600" />
                <h2>3. Pilihan Dropdown Bahasa (Language Switcher)</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Daftar bahasa yang dapat dipilih pengunjung pada sudut kanan atas Navigasi website.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetLangDefault}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Kembalikan ke IND & ENG"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Standar
              </button>
              <button
                type="button"
                onClick={handleOpenAddLangModal}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Bahasa
              </button>
            </div>
          </div>

          {/* Toggle Switcher Header */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-[#0A2472]">Tampilkan Dropdown Bahasa di Navbar</span>
            <button
              type="button"
              onClick={() => handleChange('navbar_show_lang_switcher', showLangSwitcher ? 'false' : 'true')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                showLangSwitcher ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {showLangSwitcher ? 'Aktif' : 'Disembunyikan'}
            </button>
          </div>

          <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-14">No</th>
                    <th className="py-3 px-3.5">Kode Bahasa</th>
                    <th className="py-3 px-3.5">Label Tampilan</th>
                    <th className="py-3 px-3.5 w-24">Status</th>
                    <th className="py-3 px-3.5 text-right w-40">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                  {languages.map((lang, idx) => (
                    <tr key={lang.code + idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5 font-black text-indigo-600">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-3.5 font-mono uppercase font-bold text-indigo-600">
                        {lang.code}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                        {lang.label}
                      </td>
                      <td className="py-3 px-3.5">
                        {lang.active === false ? (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold uppercase">Sembunyi</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">Aktif</span>
                        )}
                      </td>
                      <td className="py-3 px-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMoveLangUp(idx)}
                            disabled={idx === 0}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Naik"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveLangDown(idx)}
                            disabled={idx === languages.length - 1}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            title="Turun"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleLangActive(idx)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              lang.active !== false ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-200'
                            }`}
                            title={lang.active !== false ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {lang.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditLangModal(idx)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLang(idx)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {languages.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Belum ada pilihan bahasa. Klik <b>"+ Tambah Bahasa"</b> atau <b>"Reset Standar"</b>.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-extrabold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Switcher Bahasa'}
            </button>
          </div>
        </div>
      )}
      </form>

      {/* ── MODAL ADD / EDIT MENU NAVIGASI ─────────────────────────────────── */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#0A2472] flex items-center gap-2">
                {editingMenuIndex === null ? <Plus className="w-4 h-4 text-indigo-600" /> : <Edit2 className="w-4 h-4 text-indigo-600" />}
                {editingMenuIndex === null ? 'Tambah Menu Navigasi' : 'Edit Menu Navigasi'}
              </h3>
              <button
                type="button"
                onClick={() => setIsMenuModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMenuModalItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ID Target Scroll / Target Link
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-mono text-xs font-bold">#</span>
                  <input
                    type="text"
                    value={formId}
                    onChange={e => setFormId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-r-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="home, about, services, pricing, portfolio, blog, contact"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Label Bahasa Indonesia (ID)
                </label>
                <input
                  type="text"
                  value={formLabelId}
                  onChange={e => setFormLabelId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: Beranda / Hubungi Kami"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Label English (EN)
                </label>
                <input
                  type="text"
                  value={formLabelEn}
                  onChange={e => setFormLabelEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Contoh: Home / Contact Us"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Status Tampilkan</span>
                  <span className="text-[10px] text-slate-400">Tampilkan menu di Navbar?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormMenuActive(!formMenuActive)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    formMenuActive ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {formMenuActive ? 'Aktif' : 'Disembunyikan'}
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#0A2472] hover:bg-blue-900 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingMenuIndex === null ? 'Tambah Menu' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL ADD / EDIT DROPDOWN BAHASA ───────────────────────────────── */}
      {isLangModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#0A2472] flex items-center gap-2">
                {editingLangIndex === null ? <Plus className="w-4 h-4 text-emerald-600" /> : <Edit2 className="w-4 h-4 text-emerald-600" />}
                {editingLangIndex === null ? 'Tambah Pilihan Bahasa' : 'Edit Pilihan Bahasa'}
              </h3>
              <button
                type="button"
                onClick={() => setIsLangModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLangModalItem} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kode Bahasa (Language Code / ID)
                </label>
                <input
                  type="text"
                  value={formLangCode}
                  onChange={e => setFormLangCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-100 uppercase"
                  placeholder="Contoh: ID, EN, JP, AR"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Label Bahasa (Tampilan di Dropdown)
                </label>
                <input
                  type="text"
                  value={formLangLabel}
                  onChange={e => setFormLangLabel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Contoh: 🇮🇩 IND / 🇯🇵 JPN"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Status Tampilkan</span>
                  <span className="text-[10px] text-slate-400">Munculkan pilihan ini di dropdown?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormLangActive(!formLangActive)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    formLangActive ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {formLangActive ? 'Aktif' : 'Disembunyikan'}
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLangModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingLangIndex === null ? 'Tambah Bahasa' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
