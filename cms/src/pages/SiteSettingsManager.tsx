import React, { useState, useEffect } from 'react';
import { Save, Settings, Share2, Globe, CheckCircle2, AlertCircle, Upload, MessageCircle, Mail, MapPin, Building, Search, Briefcase, Users, Smartphone, BookOpen, PenTool, Layout, Target, Link, ArrowUpRight, Facebook, Instagram, Twitter, Youtube, Linkedin, MoveRight, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan situs' });
        setIsLoading(false);
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('cms_token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        handleChange('footer_logo', data.url);
      } else {
        alert('Upload gagal');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat upload');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const availableIcons = [
    'MessageCircle', 'Mail', 'MapPin', 'Building', 'Search', 'Briefcase', 'Users', 'Smartphone', 'BookOpen', 'PenTool', 'Layout', 'Target', 'Link', 'ArrowUpRight', 'Facebook', 'Instagram', 'Twitter', 'Youtube', 'Linkedin', 'MoveRight', 'ChevronRight'
  ];

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
      setMessage({ type: 'success', text: 'Pengaturan Situs berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan pengaturan situs' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data Pengaturan Situs...</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola Pengaturan Umum & SEO Situs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur informasi footer, tautan media sosial resmi, serta metadata SEO untuk optimasi mesin pencari.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50"
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* CTA Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h2>Pengaturan Call to Action (CTA)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge / Teks Atas (ID)</label>
              <input type="text" value={settings['cta_badge_id'] ?? 'Mari Bekerja Sama'} onChange={e => handleChange('cta_badge_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge / Teks Atas (EN)</label>
              <input type="text" value={settings['cta_badge_en'] ?? "Let's Work Together"} onChange={e => handleChange('cta_badge_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul (ID)</label>
              <input type="text" value={settings['cta_title_id'] ?? 'Siap Membangun Sesuatu yang Luar Biasa?'} onChange={e => handleChange('cta_title_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul (EN)</label>
              <input type="text" value={settings['cta_title_en'] ?? 'Ready to Build Something Amazing?'} onChange={e => handleChange('cta_title_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul (ID)</label>
              <textarea rows={2} value={settings['cta_subtitle_id'] ?? 'Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya.'} onChange={e => handleChange('cta_subtitle_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul (EN)</label>
              <textarea rows={2} value={settings['cta_subtitle_en'] ?? 'Contact the Indiekraf Team for Service Consultation, Proposal Requests, and Cost Estimation.'} onChange={e => handleChange('cta_subtitle_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Email (ID)</label>
              <input type="text" value={settings['cta_email_id'] ?? 'fikar@indiekraf.com'} onChange={e => handleChange('cta_email_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Email (EN)</label>
              <input type="text" value={settings['cta_email_en'] ?? 'fikar@indiekraf.com'} onChange={e => handleChange('cta_email_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Icon Tombol Email</label>
              <select value={settings['cta_email_icon'] ?? 'ArrowUpRight'} onChange={e => handleChange('cta_email_icon', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100">
                {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Tujuan Email (CTA)</label>
              <input type="text" value={settings['cta_email_url'] ?? ''} onChange={e => handleChange('cta_email_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="mailto:fikar@indiekraf.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WhatsApp (ID)</label>
              <input type="text" value={settings['cta_wa_id'] ?? 'Chat WhatsApp'} onChange={e => handleChange('cta_wa_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WhatsApp (EN)</label>
              <input type="text" value={settings['cta_wa_en'] ?? 'Chat WhatsApp'} onChange={e => handleChange('cta_wa_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Icon Tombol WhatsApp</label>
              <select value={settings['cta_wa_icon'] ?? 'MessageCircle'} onChange={e => handleChange('cta_wa_icon', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100">
                {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL WhatsApp</label>
              <input type="text" value={settings['cta_whatsapp_url'] ?? 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'} onChange={e => handleChange('cta_whatsapp_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </div>

        {/* Footer Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2>Informasi & Deskripsi Footer Website</h2>
          </div>

          <div className="sm:col-span-2 border border-slate-200 rounded-xl p-4 mb-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Logo Footer (Gambar)</label>
            <div className="flex items-center gap-4">
              {settings['footer_logo'] ? (
                <img src={settings['footer_logo']} alt="Footer Logo" className="w-24 h-12 object-contain bg-slate-100 rounded border border-slate-200" />
              ) : (
                <div className="w-24 h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400">Belum ada</span>
                </div>
              )}
              <div>
                <button 
                  type="button" 
                  onClick={() => logoInputRef.current?.click()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
                  disabled={isUploadingLogo}
                >
                  <Upload className="w-4 h-4" />
                  {isUploadingLogo ? 'Mengupload...' : 'Upload Logo'}
                </button>
                <input type="file" accept="image/*" className="hidden" ref={logoInputRef} onChange={handleUploadLogo} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Brand (ID)</label>
              <input type="text" value={settings['footer_brand_id'] ?? 'Indiekraf'} onChange={e => handleChange('footer_brand_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Brand (EN)</label>
              <input type="text" value={settings['footer_brand_en'] ?? 'Indiekraf'} onChange={e => handleChange('footer_brand_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Deskripsi Footer (Bahasa Indonesia)
              </label>
              <textarea
                rows={3}
                value={settings['footer_desc_id'] || settings['footer.desc_id'] || settings['footer.desc'] || ''}
                onChange={e => {
                  handleChange('footer_desc_id', e.target.value);
                  handleChange('footer.desc_id', e.target.value);
                  handleChange('footer.desc', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Berangkat dari pemahaman mendalam terhadap kebutuhan klien, Indiekraf hadir sebagai partner kolaboratif..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Deskripsi Footer (English)
              </label>
              <textarea
                rows={3}
                value={settings['footer_desc_en'] || settings['footer.desc_en'] || ''}
                onChange={e => {
                  handleChange('footer_desc_en', e.target.value);
                  handleChange('footer.desc_en', e.target.value);
                }}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Connecting the creative, media, agency, research, and academy ecosystem in Indonesia..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Layanan (ID)</label>
              <input type="text" value={settings['footer_col_layanan_id'] ?? 'Layanan'} onChange={e => handleChange('footer_col_layanan_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Layanan (EN)</label>
              <input type="text" value={settings['footer_col_layanan_en'] ?? 'Services'} onChange={e => handleChange('footer_col_layanan_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Tautan (ID)</label>
              <input type="text" value={settings['footer_col_links_id'] ?? 'Tautan Langsung'} onChange={e => handleChange('footer_col_links_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Tautan (EN)</label>
              <input type="text" value={settings['footer_col_links_en'] ?? 'Quick Links'} onChange={e => handleChange('footer_col_links_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Kontak (ID)</label>
              <input type="text" value={settings['footer_col_contact_id'] ?? 'Kontak'} onChange={e => handleChange('footer_col_contact_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Kontak (EN)</label>
              <input type="text" value={settings['footer_col_contact_en'] ?? 'Contact'} onChange={e => handleChange('footer_col_contact_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Copyright (ID)</label>
              <input type="text" value={settings['footer_copyright_id'] ?? 'Hak Cipta Dilindungi.'} onChange={e => handleChange('footer_copyright_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Copyright (EN)</label>
              <input type="text" value={settings['footer_copyright_en'] ?? 'All rights reserved.'} onChange={e => handleChange('footer_copyright_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WA (ID)</label>
              <input type="text" value={settings['footer_wa_id'] ?? 'Chat WhatsApp'} onChange={e => handleChange('footer_wa_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WA (EN)</label>
              <input type="text" value={settings['footer_wa_en'] ?? 'Chat WhatsApp'} onChange={e => handleChange('footer_wa_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Icon Tombol WA</label>
              <select value={settings['footer_wa_icon'] ?? 'MessageCircle'} onChange={e => handleChange('footer_wa_icon', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100">
                {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL WhatsApp (Footer)</label>
              <input type="text" value={settings['footer_wa_url'] ?? 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'} onChange={e => handleChange('footer_wa_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Lokasi (ID)</label>
              <input type="text" value={settings['footer_location_id'] ?? 'Malang, Jawa Timur, Indonesia'} onChange={e => handleChange('footer_location_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Lokasi (EN)</label>
              <input type="text" value={settings['footer_location_en'] ?? 'Malang, East Java, Indonesia'} onChange={e => handleChange('footer_location_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </div>

        {/* Social Media Links & Icons */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <Share2 className="w-5 h-5 text-purple-600" />
            <h2>Tautan & Icon Media Sosial</h2>
          </div>

          {[
            { key: 'social_instagram', label: 'Instagram' },
            { key: 'social_facebook', label: 'Facebook' },
            { key: 'social_twitter', label: 'Twitter' },
            { key: 'social_youtube', label: 'YouTube' },
            { key: 'social_linkedin', label: 'LinkedIn' },
          ].map((soc, i) => (
            <div key={soc.key} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-50 last:border-0">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{soc.label} URL</label>
                <input
                  type="text"
                  value={settings[soc.key] || ''}
                  onChange={e => handleChange(soc.key, e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder={`https://${soc.label.toLowerCase()}.com/`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">{soc.label} Icon</label>
                <select 
                  value={settings[`${soc.key}_icon`] || soc.label} 
                  onChange={e => handleChange(`${soc.key}_icon`, e.target.value)} 
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100"
                >
                  {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Metadata Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
            <Settings className="w-5 h-5 text-emerald-600" />
            <h2>SEO & Metadata Website</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul SEO / Title Tag (ID)</label>
              <input
                type="text"
                value={settings['seo_title_id'] || ''}
                onChange={e => handleChange('seo_title_id', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Indiekraf - Ekosistem Kreatif Digital Indonesia"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul SEO / Title Tag (EN)</label>
              <input
                type="text"
                value={settings['seo_title_en'] || ''}
                onChange={e => handleChange('seo_title_en', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Indiekraf - Indonesia's Digital Creative Ecosystem"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Meta Description (ID)</label>
              <textarea
                rows={3}
                value={settings['seo_description_id'] || ''}
                onChange={e => handleChange('seo_description_id', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Indiekraf menghadirkan solusi media, studio kreatif, akademi, dan riset untuk mendorong pertumbuhan bisnis Anda di era digital."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Meta Description (EN)</label>
              <textarea
                rows={3}
                value={settings['seo_description_en'] || ''}
                onChange={e => handleChange('seo_description_en', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Indiekraf provides media, creative studio, academy, and research solutions to drive your business growth."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Meta Keywords (Kata Kunci SEO)</label>
              <input
                type="text"
                value={settings['seo_keywords'] || ''}
                onChange={e => handleChange('seo_keywords', e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="indiekraf, media kreatif, digital agency malang, digital marketing, ui ux design, web development"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
          </button>
        </div>
      </form>
    </div>
  );
}
