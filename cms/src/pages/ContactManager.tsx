import React, { useState, useEffect, useRef } from 'react';
import { Save, Phone, CheckCircle2, AlertCircle, Upload, LayoutTemplate, MessageSquare, MapPin } from 'lucide-react';

export default function ContactManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'channels' | 'form'>('hero');
  
  const [isUploadingMap, setIsUploadingMap] = useState(false);
  const mapFileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadMap = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingMap(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      setSettings(prev => ({ ...prev, ['contact_maps_image']: data.url }));
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload gambar maps');
    } finally {
      setIsUploadingMap(false);
      if (mapFileInputRef.current) mapFileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan Hubungi Kami' });
        setIsLoading(false);
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('cms_token');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage({ type: 'success', text: 'Informasi Kontak berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan informasi kontak' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data Kontak...</div>;
  }

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola Konten Hubungi Kami (Contact Us)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur alamat email resmi, nomor telepon/WhatsApp, alamat kantor pusat, dan tautan lokasi Peta (Google Maps).
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Sub-Navigation Tabs matching BlogManager & PortfolioManager */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => { setActiveTab('hero'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          1. Header Hero
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('channels'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'channels'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Phone className="w-4 h-4 text-indigo-400" />
          2. Saluran Komunikasi
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('form'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'form'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          3. Formulir & Sosmed
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'hero' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <LayoutTemplate className="w-5 h-5 text-indigo-600" />
              <h2>Konten Hero (Bagian Atas)</h2>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge (ID)</label>
              <input
                type="text"
                value={settings['contact_hero_badge_id'] ?? 'HUBUNGI KAMI'}
                onChange={e => handleChange('contact_hero_badge_id', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="HUBUNGI KAMI"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge (EN)</label>
              <input
                type="text"
                value={settings['contact_hero_badge_en'] ?? 'CONTACT US'}
                onChange={e => handleChange('contact_hero_badge_en', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="CONTACT US"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul (ID)</label>
              <input
                type="text"
                value={settings['contact_hero_title_id'] ?? 'Mari Hubungkan Ide Hebat Anda Dengan Ekosistem Kreatif Kami'}
                onChange={e => handleChange('contact_hero_title_id', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul (EN)</label>
              <input
                type="text"
                value={settings['contact_hero_title_en'] ?? 'Let’s Connect Your Great Ideas With Our Creative Ecosystem'}
                onChange={e => handleChange('contact_hero_title_en', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul (ID)</label>
              <textarea
                rows={3}
                value={settings['contact_hero_subtitle_id'] ?? 'Pintu kami selalu terbuka lebar. Apakah Anda ingin mendevelop website premium, menerbitkan press release bisnis, menyelenggarakan diklat SDM, atau sekadar berdiskusi kopi hangat di Malang Creative Center.'}
                onChange={e => handleChange('contact_hero_subtitle_id', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul (EN)</label>
              <textarea
                rows={3}
                value={settings['contact_hero_subtitle_en'] ?? 'Our doors are always wide open. Whether you want to develop a premium website, publish business press releases, organize HR training, or just have a warm coffee discussion at Malang Creative Center.'}
                onChange={e => handleChange('contact_hero_subtitle_en', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
        )}

        {activeTab === 'channels' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <Phone className="w-5 h-5 text-indigo-600" />
            <h2>Representative Hub & Channels</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Atas (ID)</label>
              <input type="text" value={settings['contact_rep_label_id'] ?? 'REPRESENTATIVE HUB'} onChange={e => handleChange('contact_rep_label_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Atas (EN)</label>
              <input type="text" value={settings['contact_rep_label_en'] ?? 'REPRESENTATIVE HUB'} onChange={e => handleChange('contact_rep_label_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Rep Hub (ID)</label>
              <input type="text" value={settings['contact_rep_title_id'] ?? 'Saluran Komunikasi Resmi'} onChange={e => handleChange('contact_rep_title_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Rep Hub (EN)</label>
              <input type="text" value={settings['contact_rep_title_en'] ?? 'Official Communication Channels'} onChange={e => handleChange('contact_rep_title_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul Rep Hub (ID)</label>
              <textarea rows={2} value={settings['contact_rep_subtitle_id'] ?? 'Pilih metode komunikasi yang paling nyaman bagi Anda. Tim kami siap memberikan layanan prima.'} onChange={e => handleChange('contact_rep_subtitle_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul Rep Hub (EN)</label>
              <textarea rows={2} value={settings['contact_rep_subtitle_en'] ?? 'Choose the communication method most comfortable for you. Our team is ready to provide prime service.'} onChange={e => handleChange('contact_rep_subtitle_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0A2472] mb-4">1. Kantor Pusat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Kantor (ID)</label>
                <input type="text" value={settings['contact_office_label_id'] ?? 'KANTOR PUSAT'} onChange={e => handleChange('contact_office_label_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Kantor (EN)</label>
                <input type="text" value={settings['contact_office_label_en'] ?? 'HEADQUARTERS'} onChange={e => handleChange('contact_office_label_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Kantor</label>
                <input type="text" value={settings['contact_office_name'] ?? 'Telkom AI Center Malang'} onChange={e => handleChange('contact_office_name', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Alamat Lengkap</label>
                <textarea rows={2} value={settings['contact_address'] ?? 'Jl. Jenderal Basuki Rahmat No.7-9, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119'} onChange={e => handleChange('contact_address', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="sm:col-span-2 border border-slate-200 rounded-xl p-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Gambar Maps</label>
                <div className="flex items-center gap-4">
                  {settings['contact_maps_image'] ? (
                    <img src={settings['contact_maps_image']} alt="Maps" className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                      <span className="text-[10px] text-slate-400">Belum ada</span>
                    </div>
                  )}
                  <div>
                    <button 
                      type="button" 
                      onClick={() => mapFileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
                      disabled={isUploadingMap}
                    >
                      <Upload className="w-4 h-4" />
                      {isUploadingMap ? 'Mengupload...' : 'Upload Gambar Maps'}
                    </button>
                    <input type="file" accept="image/*" className="hidden" ref={mapFileInputRef} onChange={handleUploadMap} />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Link Google Maps (URL)</label>
                <input type="text" value={settings['contact_maps_embed'] ?? ''} onChange={e => handleChange('contact_maps_embed', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Kantor</label>
                <select value={settings['contact_office_icon'] || 'MapPin'} onChange={e => handleChange('contact_office_icon', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                  <option value="MapPin">MapPin (Lokasi)</option>
                  <option value="Building">Building (Gedung)</option>
                  <option value="Home">Home (Rumah)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0A2472] mb-4">2. Email Utama</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Email (ID)</label>
                <input type="text" value={settings['contact_email_label_id'] ?? 'EMAIL UTAMA'} onChange={e => handleChange('contact_email_label_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Email (EN)</label>
                <input type="text" value={settings['contact_email_label_en'] ?? 'MAIN EMAIL'} onChange={e => handleChange('contact_email_label_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Alamat Email</label>
                <input type="email" value={settings['contact_email'] ?? 'hello@indiekraf.com'} onChange={e => handleChange('contact_email', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Email</label>
                <select value={settings['contact_email_icon'] || 'Mail'} onChange={e => handleChange('contact_email_icon', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                  <option value="Mail">Mail</option>
                  <option value="Send">Send</option>
                  <option value="Inbox">Inbox</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0A2472] mb-4">3. Waktu Operasional</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Jam (ID)</label>
                <input type="text" value={settings['contact_hours_label_id'] ?? 'WAKTU OPERASIONAL'} onChange={e => handleChange('contact_hours_label_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Jam (EN)</label>
                <input type="text" value={settings['contact_hours_label_en'] ?? 'OPERATIONAL HOURS'} onChange={e => handleChange('contact_hours_label_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Jadwal (ID)</label>
                <input type="text" value={settings['contact_hours_val_id'] ?? 'Senin - Jumat 08:30 WIB - 17:00 WIB'} onChange={e => handleChange('contact_hours_val_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Jadwal (EN)</label>
                <input type="text" value={settings['contact_hours_val_en'] ?? 'Monday - Friday 08:30 WIB - 17:00 WIB'} onChange={e => handleChange('contact_hours_val_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Waktu</label>
                <select value={settings['contact_hours_icon'] || 'Clock'} onChange={e => handleChange('contact_hours_icon', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white">
                  <option value="Clock">Clock (Jam)</option>
                  <option value="Calendar">Calendar (Kalender)</option>
                  <option value="Watch">Watch</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
        )}

        {activeTab === 'form' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h2>Konten Form Konsultasi & Sosial Media</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge Form (ID)</label>
              <input type="text" value={settings['contact_form_badge_id'] ?? 'KONSULTASI'} onChange={e => handleChange('contact_form_badge_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge Form (EN)</label>
              <input type="text" value={settings['contact_form_badge_en'] ?? 'CONSULTATION'} onChange={e => handleChange('contact_form_badge_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Form (ID)</label>
              <input type="text" value={settings['contact_form_title_id'] ?? 'Tulis Kebutuhan Proyek Kreatif Anda'} onChange={e => handleChange('contact_form_title_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Form (EN)</label>
              <input type="text" value={settings['contact_form_title_en'] ?? 'Write Your Creative Project Needs'} onChange={e => handleChange('contact_form_title_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul Form (ID)</label>
              <textarea rows={2} value={settings['contact_form_sub_id'] ?? 'Isi brief singkat di bawah ini, dan koordinator spesialis dari pilar layanan yang relevan akan merespons dalam waktu kurang dari 4 jam kerja.'} onChange={e => handleChange('contact_form_sub_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul Form (EN)</label>
              <textarea rows={2} value={settings['contact_form_sub_en'] ?? 'Fill in the brief below, and a specialist coordinator from the relevant service pillar will respond in less than 4 working hours.'} onChange={e => handleChange('contact_form_sub_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            {/* Tambahan Form Input Labels */}
            <div className="sm:col-span-2 mt-4"><h3 className="text-sm font-bold text-[#0A2472]">Label & Placeholder (Formulir)</h3></div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Nama (ID)</label>
              <input type="text" value={settings['contact_form_label_name_id'] ?? 'NAMA LENGKAP ANDA'} onChange={e => handleChange('contact_form_label_name_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Nama (EN)</label>
              <input type="text" value={settings['contact_form_label_name_en'] ?? 'YOUR FULL NAME'} onChange={e => handleChange('contact_form_label_name_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Nama (ID)</label>
              <input type="text" value={settings['contact_form_placeholder_name_id'] ?? 'Masukkan nama...'} onChange={e => handleChange('contact_form_placeholder_name_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Nama (EN)</label>
              <input type="text" value={settings['contact_form_placeholder_name_en'] ?? 'Enter name...'} onChange={e => handleChange('contact_form_placeholder_name_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Email (ID)</label>
              <input type="text" value={settings['contact_form_label_email_id'] ?? 'ALAMAT EMAIL AKTIF'} onChange={e => handleChange('contact_form_label_email_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Email (EN)</label>
              <input type="text" value={settings['contact_form_label_email_en'] ?? 'ACTIVE EMAIL ADDRESS'} onChange={e => handleChange('contact_form_label_email_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Email (ID)</label>
              <input type="text" value={settings['contact_form_placeholder_email_id'] ?? 'nama@perusahaan.com'} onChange={e => handleChange('contact_form_placeholder_email_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder Email (EN)</label>
              <input type="text" value={settings['contact_form_placeholder_email_en'] ?? 'name@company.com'} onChange={e => handleChange('contact_form_placeholder_email_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label WhatsApp (ID)</label>
              <input type="text" value={settings['contact_form_label_wa_id'] ?? 'NOMOR WHATSAPP'} onChange={e => handleChange('contact_form_label_wa_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label WhatsApp (EN)</label>
              <input type="text" value={settings['contact_form_label_wa_en'] ?? 'WHATSAPP NUMBER'} onChange={e => handleChange('contact_form_label_wa_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder WhatsApp (ID)</label>
              <input type="text" value={settings['contact_form_placeholder_wa_id'] ?? 'Contoh: 08123456789'} onChange={e => handleChange('contact_form_placeholder_wa_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Placeholder WhatsApp (EN)</label>
              <input type="text" value={settings['contact_form_placeholder_wa_en'] ?? 'E.g.: +628123456789'} onChange={e => handleChange('contact_form_placeholder_wa_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Layanan (ID)</label>
              <input type="text" value={settings['contact_form_label_service_id'] ?? 'LAYANAN YANG DIINGINKAN'} onChange={e => handleChange('contact_form_label_service_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Layanan (EN)</label>
              <input type="text" value={settings['contact_form_label_service_en'] ?? 'DESIRED SERVICE'} onChange={e => handleChange('contact_form_label_service_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Detail (ID)</label>
              <input type="text" value={settings['contact_form_label_detail_id'] ?? 'DETAIL RENCANA / PERTANYAAN PROYEK'} onChange={e => handleChange('contact_form_label_detail_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Detail (EN)</label>
              <input type="text" value={settings['contact_form_label_detail_en'] ?? 'PROJECT PLAN DETAILS / QUESTIONS'} onChange={e => handleChange('contact_form_label_detail_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="sm:col-span-2 border-t border-slate-100 pt-6">
              <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider mb-2">Pengaturan Email Penerima Brief</label>
              <p className="text-xs text-slate-500 mb-4">Tentukan alamat email penerima untuk kiriman formulir brief kolaborasi.</p>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email Penerima "Kirim Brief Kolaborasi"</label>
                <input
                  type="email"
                  value={settings['email_destination_contact'] ?? 'fikar@indiekraf.com'}
                  onChange={e => handleChange('email_destination_contact', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="fikar@indiekraf.com"
                />
              </div>
            </div>

            <div className="sm:col-span-2 mt-4"><h3 className="text-sm font-bold text-[#0A2472]">Opsi Layanan (Dropdown)</h3></div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 1 (ID)</label>
              <input type="text" value={settings['contact_service_1_id'] ?? 'Indiekraf Media (Publishing & Ads)'} onChange={e => handleChange('contact_service_1_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 1 (EN)</label>
              <input type="text" value={settings['contact_service_1_en'] ?? 'Indiekraf Media (Publishing & Ads)'} onChange={e => handleChange('contact_service_1_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 2 (ID)</label>
              <input type="text" value={settings['contact_service_2_id'] ?? 'Indiekraf Studio (Website & Branding)'} onChange={e => handleChange('contact_service_2_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 2 (EN)</label>
              <input type="text" value={settings['contact_service_2_en'] ?? 'Indiekraf Studio (Website & Branding)'} onChange={e => handleChange('contact_service_2_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 3 (ID)</label>
              <input type="text" value={settings['contact_service_3_id'] ?? 'Indiekraf Academy (Training & SDM)'} onChange={e => handleChange('contact_service_3_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 3 (EN)</label>
              <input type="text" value={settings['contact_service_3_en'] ?? 'Indiekraf Academy (Training & HR)'} onChange={e => handleChange('contact_service_3_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 4 (ID)</label>
              <input type="text" value={settings['contact_service_4_id'] ?? 'Indiekraf Insight (Research & Data)'} onChange={e => handleChange('contact_service_4_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Layanan 4 (EN)</label>
              <input type="text" value={settings['contact_service_4_en'] ?? 'Indiekraf Insight (Research & Data)'} onChange={e => handleChange('contact_service_4_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Submit (ID)</label>
              <input type="text" value={settings['contact_form_btn_id'] ?? 'Kirim Formulir Brief Kolaborasi'} onChange={e => handleChange('contact_form_btn_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Submit (EN)</label>
              <input type="text" value={settings['contact_form_btn_en'] ?? 'Send Collaboration Brief Form'} onChange={e => handleChange('contact_form_btn_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Sosial Media (ID)</label>
              <input type="text" value={settings['contact_social_label_id'] ?? 'MEDIA SOSIAL KAMI'} onChange={e => handleChange('contact_social_label_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Sosial Media (EN)</label>
              <input type="text" value={settings['contact_social_label_en'] ?? 'OUR SOCIAL MEDIA'} onChange={e => handleChange('contact_social_label_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Sosial Media (ID)</label>
              <input type="text" value={settings['contact_social_sub_id'] ?? 'Ikuti perkembangan ekosistem industri kreatif terbaru setiap harinya.'} onChange={e => handleChange('contact_social_sub_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Sosial Media (EN)</label>
              <input type="text" value={settings['contact_social_sub_en'] ?? 'Follow the latest developments of the creative industry ecosystem every day.'} onChange={e => handleChange('contact_social_sub_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
        )}
      </form>
    </div>
  );
}
