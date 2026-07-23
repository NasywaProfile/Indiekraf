import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, LayoutTemplate, Layers, Image as ImageIcon } from 'lucide-react';


const COLOR_THEMES = ['blue', 'purple', 'green', 'orange'];

export default function ServicesManager() {
    const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
    
  const token = localStorage.getItem('cms_token');
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const [activeTab, setActiveTab] = useState<'hero' | 'services'>('hero');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [uploadingLeftImg, setUploadingLeftImg] = useState(false);
  const [uploadingRightImg, setUploadingRightImg] = useState(false);
  const [isUploadingPillarImg, setIsUploadingPillarImg] = useState(false);
  const handleUploadPillarImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPillarImg(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('cms_token');
    try {
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: formData 
      });
      if (res.ok) {
        const data = await res.json();
        updatePillarField('image_url', data.url);
      }
    } catch (err) {
      console.error(err);
    }
    setIsUploadingPillarImg(false);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, key: string, setUploading: (val: boolean) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/upload', { 
        method: 'POST', 
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: formData 
      });
      if (res.ok) {
        const data = await res.json();
        handleChangeSetting(key, data.url);
      }
    } catch (err) {}
    setUploading(false);
  };

  
  // Pillar Modal CRUD
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillarIndex, setEditingPillarIndex] = useState<number | null>(null);
  const [formPillar, setFormPillar] = useState<any>({});

  const getDynamicPillars = () => {
    if (settings['services_pillars_list']) {
      try {
        const parsed = JSON.parse(settings['services_pillars_list']);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  };

  const handleOpenPillarModal = (idx?: number) => {
    const pillars = getDynamicPillars();
    if (idx !== undefined) {
      setEditingPillarIndex(idx);
      setFormPillar(JSON.parse(JSON.stringify(pillars[idx])));
    } else {
      setEditingPillarIndex(null);
      setFormPillar({
        id: '', title: '', tagline_id: '', tagline_en: '', icon: 'Layers', color: 'blue',
        description_id: '', description_en: '', link: 'www.indiekraf.com', cards: [], image_url: '',
        img_tag_id: '', img_tag_en: '', img_desc_id: '', img_desc_en: ''
      });
    }
    setIsPillarModalOpen(true);
  };

  const handleSavePillar = (e: React.FormEvent) => {
    e.preventDefault();
    const pillars = getDynamicPillars();
    
    const pillarToSave = { ...formPillar };
    if (!pillarToSave.id && pillarToSave.title) {
      pillarToSave.id = pillarToSave.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (editingPillarIndex !== null) {
      pillars[editingPillarIndex] = pillarToSave;
    } else {
      pillars.push(pillarToSave);
    }
    handleChangeSetting('services_pillars_list', JSON.stringify(pillars));
    setIsPillarModalOpen(false);
  };

  const handleDeletePillar = (idx: number) => {
    if(!window.confirm('Hapus pilar layanan ini?')) return;
    const pillars = getDynamicPillars();
    pillars.splice(idx, 1);
    handleChangeSetting('services_pillars_list', JSON.stringify(pillars));
  };

  const updatePillarField = (field: string, val: any) => {
    setFormPillar((p: any) => ({ ...p, [field]: val }));
  };

  const addCardToPillar = () => {
    setFormPillar((p: any) => {
      const cards = p.cards || [];
      return { ...p, cards: [...cards, { title: '', title_en: '', icon: 'Layers', description_id: '', description_en: '', list: [] }] };
    });
  };

  const updateCardInPillar = (cIdx: number, field: string, val: any) => {
    setFormPillar((p: any) => {
      const cards = [...(p.cards || [])];
      cards[cIdx] = { ...cards[cIdx], [field]: val };
      return { ...p, cards };
    });
  };

  const removeCardFromPillar = (cIdx: number) => {
    setFormPillar((p: any) => {
      const cards = p.cards.filter((_: any, i: number) => i !== cIdx);
      return { ...p, cards };
    });
  };

  // Hero Buttons CRUD
  const [isBtnModalOpen, setIsBtnModalOpen] = useState(false);
  const [editingBtnIndex, setEditingBtnIndex] = useState<number | null>(null);
  const [formBtnTitle, setFormBtnTitle] = useState('');
  const [formBtnIcon, setFormBtnIcon] = useState('Newspaper');
  const [formBtnColor, setFormBtnColor] = useState('purple');
  const [formBtnTarget, setFormBtnTarget] = useState('media');

  const getDynamicButtons = () => {
    const defaults = [
      { title: "Indiekraf Media", icon: "Newspaper", color: "purple", target: "media" },
      { title: "Indiekraf Studio", icon: "Layers", color: "blue", target: "studio" },
      { title: "Indiekraf Academy", icon: "GraduationCap", color: "orange", target: "academy" },
      { title: "Indiekraf Insight Center", icon: "BarChart2", color: "emerald", target: "insight" }
    ];
    if (settings['services_hero_buttons']) {
      try {
        const parsed = JSON.parse(settings['services_hero_buttons']);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return defaults;
  };

  const handleOpenBtnModal = (idx?: number) => {
    const btns = getDynamicButtons();
    if (idx !== undefined) {
      setEditingBtnIndex(idx);
      setFormBtnTitle(btns[idx].title);
      setFormBtnIcon(btns[idx].icon);
      setFormBtnColor(btns[idx].color);
      setFormBtnTarget(btns[idx].target);
    } else {
      setEditingBtnIndex(null);
      setFormBtnTitle('');
      setFormBtnIcon('Newspaper');
      setFormBtnColor('purple');
      setFormBtnTarget('media');
    }
    setIsBtnModalOpen(true);
  };

  const handleSaveBtn = (e: React.FormEvent) => {
    e.preventDefault();
    const btns = getDynamicButtons();
    const newBtn = { title: formBtnTitle, icon: formBtnIcon, color: formBtnColor, target: formBtnTarget };
    if (editingBtnIndex !== null) {
      btns[editingBtnIndex] = newBtn;
    } else {
      btns.push(newBtn);
    }
    handleChangeSetting('services_hero_buttons', JSON.stringify(btns));
    setIsBtnModalOpen(false);
  };

  const handleDeleteBtn = (idx: number) => {
    if(!window.confirm('Hapus button ini?')) return;
    const btns = getDynamicButtons();
    btns.splice(idx, 1);
    handleChangeSetting('services_hero_buttons', JSON.stringify(btns));
  };

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const resSettings = await fetch('/api/settings', { headers });
      const settingsData = await resSettings.json();
      setSettings(settingsData);
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleChangeSetting = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setMessage(null);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage({ type: 'success', text: 'Pengaturan Header Layanan berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan' });
    }
    setIsSavingSettings(false);
  };

  
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472] tracking-tight">Manajemen Layanan</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Atur konten header dan daftar pilar layanan utama</p>
        </div>
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={isSavingSettings}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {isSavingSettings ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border flex items-center justify-between animate-in fade-in zoom-in duration-200 ${
          message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="p-1 hover:bg-black/5 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          1. Header Halaman Layanan
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeTab === 'services'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          2. Daftar Pilar Layanan
        </button>
      </div>

      {/* Tab 1: Hero Header */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <h2>1. Hero Banner Halaman Layanan</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge/Tag (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={settings['services_hero_badge_id'] ?? 'INDIEKRAF MEDIA & KREATIF | LAYANAN'}
                    onChange={e => handleChangeSetting('services_hero_badge_id', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge/Tag (English)</label>
                  <input
                    type="text"
                    value={settings['services_hero_badge_en'] ?? 'INDIEKRAF MEDIA & CREATIVE | SERVICES'}
                    onChange={e => handleChangeSetting('services_hero_badge_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['services_hero_title_id'] ?? 'Layanan Terbaik untuk'}
                  onChange={e => handleChangeSetting('services_hero_title_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <input
                  type="text"
                  value={settings['services_hero_title_en'] ?? 'The Best Services for'}
                  onChange={e => handleChangeSetting('services_hero_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sorotan Judul (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['services_hero_titleHighlight_id'] ?? 'Pertumbuhan Bisnis Anda'}
                  onChange={e => handleChangeSetting('services_hero_titleHighlight_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sorotan Judul (English)</label>
                <input
                  type="text"
                  value={settings['services_hero_titleHighlight_en'] ?? 'Your Business Growth'}
                  onChange={e => handleChangeSetting('services_hero_titleHighlight_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Hero (Bahasa Indonesia)</label>
                  <textarea
                    rows={3}
                    value={settings['services_hero_subtitle_id'] ?? 'Kami mengintegrasikan riset data, pengembangan SDM unggul, agensi kreatif modern, dan penerbitan media tepercaya untuk menghadirkan solusi transformasi bisnis yang berkelanjutan.'}
                    onChange={e => handleChangeSetting('services_hero_subtitle_id', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Hero (English)</label>
                  <textarea
                    rows={3}
                    value={settings['services_hero_subtitle_en'] ?? 'We integrate data research, outstanding talent development, modern creative agency, and trusted media publishing to deliver sustainable business transformation solutions.'}
                    onChange={e => handleChangeSetting('services_hero_subtitle_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Hero Images Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <h2>Gambar Hero Halaman Layanan</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gambar Kiri (Roket) */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Gambar Kiri (Roket dsb)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
                  {settings['services_hero_image_left'] ? (
                    <img src={settings['services_hero_image_left']} alt="Kiri Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-3 rounded-lg shadow-sm">
                    <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs rounded-lg transition-colors">
                      {uploadingLeftImg ? 'Mengupload...' : 'Upload Gambar'}
                      <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, 'services_hero_image_left', setUploadingLeftImg)} disabled={uploadingLeftImg} className="hidden" />
                    </label>
                    {settings['services_hero_image_left'] && (
                      <button type="button" onClick={() => handleChangeSetting('services_hero_image_left', '')} className="text-[10px] text-red-500 hover:text-red-600 font-bold">Hapus Gambar</button>
                    )}
                  </div>
                </div>
              </div>

              {/* Gambar Kanan (Laptop) */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Gambar Kanan (Laptop dsb)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
                  {settings['services_hero_image_right'] ? (
                    <img src={settings['services_hero_image_right']} alt="Kanan Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-3 rounded-lg shadow-sm">
                    <label className="cursor-pointer flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs rounded-lg transition-colors">
                      {uploadingRightImg ? 'Mengupload...' : 'Upload Gambar'}
                      <input type="file" accept="image/*" onChange={(e) => handleUploadImage(e, 'services_hero_image_right', setUploadingRightImg)} disabled={uploadingRightImg} className="hidden" />
                    </label>
                    {settings['services_hero_image_right'] && (
                      <button type="button" onClick={() => handleChangeSetting('services_hero_image_right', '')} className="text-[10px] text-red-500 hover:text-red-600 font-bold">Hapus Gambar</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Button List Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg">
                <LayoutTemplate className="w-5 h-5 text-indigo-600" />
                <h2>2. Navigasi Button (Bawah Hero)</h2>
              </div>
              <button
                type="button"
                onClick={() => handleOpenBtnModal()}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                Tambah Button
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getDynamicButtons().map((btn: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 relative group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${btn.color}-100 text-${btn.color}-600`}>
                      <span className="text-xs font-bold">{btn.icon.substring(0, 1)}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{btn.title}</h4>
                      <p className="text-[10px] text-slate-500">Target: {btn.target}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => handleOpenBtnModal(i)} className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-md hover:text-blue-600">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => handleDeleteBtn(i)} className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-md hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingSettings}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSavingSettings ? 'Menyimpan...' : 'Simpan Header Layanan'}
            </button>
          </div>
        </form>
      )}

            {/* Tab 2: Pilar Layanan */}
      {activeTab === 'services' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <div>
              <span className="text-sm font-bold text-[#0A2472]">Daftar Pilar Layanan Utama</span>
              <p className="text-xs text-slate-500 mt-0.5">Pilar layanan aktif yang ditampilkan langsung di Beranda & Halaman Layanan.</p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenPillarModal()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0A2472] text-white text-xs font-bold rounded-xl hover:bg-[#071d5a] transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Tambah Pilar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {getDynamicPillars().map((p: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${p.color}-100 text-${p.color}-600`}>
                       <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0A2472] text-sm">{p.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{p.tagline_id} | {p.tagline_en}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button type="button" onClick={() => handleOpenPillarModal(idx)} className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => handleDeletePillar(idx)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  <span className="font-bold">{(p.cards || []).length} Sub-Cards</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSavingSettings}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSavingSettings ? 'Menyimpan...' : 'Simpan Pilar Layanan'}
            </button>
          </div>
        </form>
      )}

      {/* Pillar Modal */}
      {isPillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-[#0A2472]">{editingPillarIndex !== null ? 'Edit Pilar Layanan' : 'Tambah Pilar Layanan'}</h2>
              <button onClick={() => setIsPillarModalOpen(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-4 h-4 text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Pilar</label>
                  <input value={formPillar.title || ''} onChange={e => updatePillarField('title', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Warna Tema</label>
                  <select value={formPillar.color || 'blue'} onChange={e => updatePillarField('color', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm">
                    {COLOR_THEMES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gambar Banner / Ilustrasi Layanan (Kiri/Desktop)</label>
                  <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                      <img
                        src={formPillar.image_url || '/gambar.jpg'}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={e => {
                          (e.target as HTMLImageElement).src = '/gambar.jpg';
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadPillarImage}
                        disabled={isUploadingPillarImg}
                        className="text-xs text-slate-500 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400">Rekomendasi ukuran aspek rasio gambar landscape, maksimal 5MB.</p>
                    </div>
                    {formPillar.image_url && (
                      <button
                        type="button"
                        onClick={() => updatePillarField('image_url', '')}
                        className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Hapus Gambar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Label Tag Gambar (Bahasa Indonesia)</label>
                  <input
                    value={formPillar.img_tag_id || ''}
                    onChange={e => updatePillarField('img_tag_id', e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    placeholder="Contoh: RISET INDUSTRI KREATIF BERBASIS DATA"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Label Tag Gambar (English)</label>
                  <input
                    value={formPillar.img_tag_en || ''}
                    onChange={e => updatePillarField('img_tag_en', e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    placeholder="Contoh: DATA-DRIVEN CREATIVE INDUSTRY RESEARCH"
                  />
                </div>
              </div>



              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi (ID)</label>
                  <textarea rows={3} value={formPillar.description_id || ''} onChange={e => updatePillarField('description_id', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi (EN)</label>
                  <textarea rows={3} value={formPillar.description_en || ''} onChange={e => updatePillarField('description_en', e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm" />
                </div>
              </div>

              {/* Cards CRUD */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-widest">Sub-Cards Layanan</label>
                  <button type="button" onClick={addCardToPillar} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">
                    <Plus className="w-3 h-3" /> Tambah Card
                  </button>
                </div>
                <div className="space-y-4">
                  {(formPillar.cards || []).map((card: any, cIdx: number) => (
                    <div key={cIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                      <button type="button" onClick={() => removeCardFromPillar(cIdx)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-6">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Judul Card (ID)</label>
                          <input value={card.title || ''} onChange={e => updateCardInPillar(cIdx, 'title', e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Judul Card (EN)</label>
                          <input value={card.title_en || ''} onChange={e => updateCardInPillar(cIdx, 'title_en', e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Deskripsi (ID)</label>
                          <textarea rows={2} value={card.description_id || ''} onChange={e => updateCardInPillar(cIdx, 'description_id', e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Deskripsi (EN)</label>
                          <textarea rows={2} value={card.description_en || ''} onChange={e => updateCardInPillar(cIdx, 'description_en', e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button type="button" onClick={() => setIsPillarModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Batal</button>
              <button type="button" onClick={handleSavePillar} className="px-5 py-2.5 text-sm font-bold text-white bg-[#0A2472] hover:bg-blue-900 rounded-xl transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" /> Terapkan (Jangan Lupa Simpan!)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
