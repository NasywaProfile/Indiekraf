import React, { useState, useEffect } from 'react';
import { Save, Settings, Share2, Globe, CheckCircle2, AlertCircle, Upload, MessageCircle, Mail, MapPin, Building, Search, Briefcase, Users, Smartphone, BookOpen, PenTool, Layout, Target, Link, ArrowUpRight, Facebook, Instagram, Twitter, Youtube, Linkedin, MoveRight, ChevronRight, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

export default function CtaFooterManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Tabs for better UX
  const [activeTab, setActiveTab] = useState<'cta' | 'footer' | 'seo'>('cta');

  // Dynamic Lists State
  const [layananLinks, setLayananLinks] = useState<{id: string, label_id: string, label_en: string, url: string}[]>([]);
  const [quickLinks, setQuickLinks] = useState<{id: string, label_id: string, label_en: string, url: string}[]>([]);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        
        // Parse JSON lists for footer columns
        try {
          if (data['footer_layanan_links']) {
            setLayananLinks(JSON.parse(data['footer_layanan_links']));
          } else {
            setLayananLinks([
              { id: '1', label_id: 'Indiekraf Media', label_en: 'Indiekraf Media', url: 'media' },
              { id: '2', label_id: 'Indiekraf Studio', label_en: 'Indiekraf Studio', url: 'studio' },
              { id: '3', label_id: 'Indiekraf Academy', label_en: 'Indiekraf Academy', url: 'academy' },
              { id: '4', label_id: 'Insight Center', label_en: 'Insight Center', url: 'insight' }
            ]);
          }
        } catch(e) { console.error('Error parsing layanan links', e); }

        try {
          if (data['footer_quick_links']) {
            setQuickLinks(JSON.parse(data['footer_quick_links']));
          } else {
            setQuickLinks([
              { id: '1', label_id: 'Tentang Kami', label_en: 'About Us', url: 'about' },
              { id: '2', label_id: 'Daftar Harga', label_en: 'Pricing', url: 'pricing' },
              { id: '3', label_id: 'Portofolio', label_en: 'Portfolio', url: 'portfolio' },
              { id: '4', label_id: 'Hubungi Kami', label_en: 'Contact', url: 'contact' }
            ]);
          }
        } catch(e) { console.error('Error parsing quick links', e); }
        
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
    
    // Serialize lists back to JSON before saving
    const payloadToSave = { ...settings };
    payloadToSave['footer_layanan_links'] = JSON.stringify(layananLinks);
    payloadToSave['footer_quick_links'] = JSON.stringify(quickLinks);
    
    try {
      const token = localStorage.getItem('cms_token');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payloadToSave)
      });
      if (!res.ok) throw new Error('Failed to save');
      
      setSettings(payloadToSave);
      setMessage({ type: 'success', text: 'Pengaturan CTA & Footer berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan pengaturan situs' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data Pengaturan CTA & Footer...</div>;
  }

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola CTA & Footer Website</h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur Call to Action, Footer, Tautan Sosial, dan SEO dengan mudah.
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
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold animate-in fade-in slide-in-from-top-2 ${
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
          onClick={() => { setActiveTab('cta'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'cta'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Target className="w-4 h-4 text-indigo-400" />
          1. Call to Action (CTA)
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('footer'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'footer'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layout className="w-4 h-4 text-indigo-400" />
          2. Komponen Footer
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('seo'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Globe className="w-4 h-4 text-indigo-400" />
          3. Pengaturan & SEO
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* ======================= TAB: CTA ======================= */}
        {activeTab === 'cta' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* CTA Settings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Target className="w-5 h-5 text-blue-600" />
                <h2>Pengaturan Call to Action (CTA)</h2>
              </div>
              <p className="text-xs text-slate-500 -mt-3">
                Atur bagian ajakan kolaborasi yang tampil di bagian bawah sebelum footer.
              </p>

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
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Link className="w-5 h-5 text-indigo-600" />
                <h2>Tombol Call to Action</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Email (ID)</label>
                  <input type="text" value={settings['cta_email_id'] ?? 'fikar@indiekraf.com'} onChange={e => handleChange('cta_email_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol Email (EN)</label>
                  <input type="text" value={settings['cta_email_en'] ?? 'fikar@indiekraf.com'} onChange={e => handleChange('cta_email_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Tujuan Email (CTA)</label>
                  <input type="text" value={settings['cta_email_url'] ?? ''} onChange={e => handleChange('cta_email_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" placeholder="mailto:fikar@indiekraf.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Icon Tombol Email</label>
                  <select value={settings['cta_email_icon'] ?? 'ArrowUpRight'} onChange={e => handleChange('cta_email_icon', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100">
                    {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WhatsApp (ID)</label>
                  <input type="text" value={settings['cta_whatsapp_id'] ?? 'Chat via WhatsApp'} onChange={e => handleChange('cta_whatsapp_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Tombol WhatsApp (EN)</label>
                  <input type="text" value={settings['cta_whatsapp_en'] ?? 'Chat via WhatsApp'} onChange={e => handleChange('cta_whatsapp_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Tujuan WA (CTA)</label>
                  <input type="text" value={settings['cta_whatsapp_url'] ?? 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'} onChange={e => handleChange('cta_whatsapp_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Icon Tombol WA</label>
                  <select value={settings['cta_whatsapp_icon'] ?? 'MessageCircle'} onChange={e => handleChange('cta_whatsapp_icon', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100">
                    {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: FOOTER ======================= */}
        {activeTab === 'footer' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* 1. Brand Logo & Name */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h2>Identitas Footer</h2>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Logo Footer (Boleh Kosong)</label>
                <div className="flex items-start gap-4">
                  {settings['footer_logo'] ? (
                    <div className="w-20 h-20 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0 flex justify-center items-center p-2 relative group">
                      <img src={settings['footer_logo']} alt="Footer Logo" className="w-full h-full object-contain" />
                      <button type="button" onClick={() => handleChange('footer_logo', '')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input type="file" ref={logoInputRef} onChange={handleUploadLogo} accept="image/*" className="hidden" />
                    <button type="button" onClick={() => logoInputRef.current?.click()} disabled={isUploadingLogo} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      {isUploadingLogo ? 'Mengunggah...' : 'Pilih Gambar Logo'}
                    </button>
                    <p className="text-xs text-slate-500 mt-2">Format: PNG, JPG, atau SVG (Rekomendasi rasio horizontal dan transparan).</p>
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
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Footer (ID)</label>
                  <textarea rows={3} value={settings['footer_desc_id'] ?? 'Berangkat dari pemahaman mendalam terhadap kebutuhan klien, Indiekraf hadir sebagai partner kolaboratif, bukan sekadar vendor.'} onChange={e => handleChange('footer_desc_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Footer (EN)</label>
                  <textarea rows={3} value={settings['footer_desc_en'] ?? 'Connecting the creative, media, agency, research, and academy ecosystem in Indonesia.'} onChange={e => handleChange('footer_desc_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
            </div>

            {/* Social Media Links & Icons (Moved here) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Share2 className="w-5 h-5 text-purple-600" />
                <h2>Tautan Media Sosial</h2>
              </div>
              <p className="text-sm text-slate-500 mb-4">Pilih icon dan tentukan URL untuk media sosial resmi Anda. Kosongkan URL jika tidak ingin menampilkan media sosial tertentu.</p>
              
              <div className="space-y-4">
                {[
                  { name: 'Facebook', key: 'social_facebook', defaultIcon: 'Facebook' },
                  { name: 'Instagram', key: 'social_instagram', defaultIcon: 'Instagram' },
                  { name: 'X', key: 'social_twitter', defaultIcon: 'Twitter' },
                  { name: 'YouTube', key: 'social_youtube', defaultIcon: 'Youtube' },
                  { name: 'LinkedIn', key: 'social_linkedin', defaultIcon: 'Linkedin' }
                ].map((social) => (
                  <div key={social.key} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 items-start sm:items-center transition-all hover:bg-slate-100">
                    <div className="w-32 font-bold text-sm text-slate-700 flex items-center gap-2">
                      {social.name}
                    </div>
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={settings[social.key] || ''}
                          onChange={e => handleChange(social.key, e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                          placeholder={`https://${social.name.toLowerCase()}.com/`}
                        />
                      </div>
                      <div>
                        <select
                          value={settings[`${social.key}_icon`] || social.defaultIcon}
                          onChange={e => handleChange(`${social.key}_icon`, e.target.value)}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                        >
                          {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Layanan & Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Layanan */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col">
                <div className="flex items-center gap-2 text-[#0A2472] font-black text-md border-b border-slate-100 pb-3">
                  <Layout className="w-5 h-5 text-indigo-500" />
                  <h3>Kolom 1 (Layanan)</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Judul Kolom (ID)</label>
                     <input type="text" value={settings['footer_col_layanan_id'] ?? 'Layanan'} onChange={e => handleChange('footer_col_layanan_id', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Judul Kolom (EN)</label>
                     <input type="text" value={settings['footer_col_layanan_en'] ?? 'Services'} onChange={e => handleChange('footer_col_layanan_en', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100" />
                   </div>
                </div>
                <div className="space-y-3 flex-1 overflow-auto pr-1">
                  {layananLinks.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 relative group">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Link #{index+1}</span>
                        <button type="button" onClick={() => setLayananLinks(layananLinks.filter(l => l.id !== item.id))} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">Teks Label (ID)</label>
                        <input type="text" placeholder="Contoh: Layanan Kami" value={item.label_id} onChange={(e) => { const newLinks = [...layananLinks]; newLinks[index].label_id = e.target.value; setLayananLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">Teks Label (EN)</label>
                        <input type="text" placeholder="Contoh: Our Services" value={item.label_en} onChange={(e) => { const newLinks = [...layananLinks]; newLinks[index].label_en = e.target.value; setLayananLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">URL Tujuan atau Section ID</label>
                        <input type="text" placeholder="ID Tujuan (cth: media) / URL Lengkap" value={item.url} onChange={(e) => { const newLinks = [...layananLinks]; newLinks[index].url = e.target.value; setLayananLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border bg-white focus:ring-2 focus:ring-blue-100" />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setLayananLinks([...layananLinks, { id: Date.now().toString(), label_id: 'Label Baru', label_en: 'New Label', url: '' }])} className="w-full py-2 mt-2 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Tautan
                </button>
              </div>

              {/* Tautan Langsung */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col">
                <div className="flex items-center gap-2 text-[#0A2472] font-black text-md border-b border-slate-100 pb-3">
                  <Link className="w-5 h-5 text-purple-500" />
                  <h3>Kolom 2 (Tautan Langsung)</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Judul Kolom (ID)</label>
                     <input type="text" value={settings['footer_col_links_id'] ?? 'Tautan Langsung'} onChange={e => handleChange('footer_col_links_id', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100" />
                   </div>
                   <div>
                     <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Judul Kolom (EN)</label>
                     <input type="text" value={settings['footer_col_links_en'] ?? 'Quick Links'} onChange={e => handleChange('footer_col_links_en', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100" />
                   </div>
                </div>
                <div className="space-y-3 flex-1 overflow-auto pr-1">
                  {quickLinks.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 relative group">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Link #{index+1}</span>
                        <button type="button" onClick={() => setQuickLinks(quickLinks.filter(l => l.id !== item.id))} className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">Teks Label (ID)</label>
                        <input type="text" placeholder="Contoh: Tentang Kami" value={item.label_id} onChange={(e) => { const newLinks = [...quickLinks]; newLinks[index].label_id = e.target.value; setQuickLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">Teks Label (EN)</label>
                        <input type="text" placeholder="Contoh: About Us" value={item.label_en} onChange={(e) => { const newLinks = [...quickLinks]; newLinks[index].label_en = e.target.value; setQuickLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border focus:ring-2 focus:ring-blue-100" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500">URL Tujuan atau Section ID</label>
                        <input type="text" placeholder="ID Tujuan (cth: about) / URL Lengkap" value={item.url} onChange={(e) => { const newLinks = [...quickLinks]; newLinks[index].url = e.target.value; setQuickLinks(newLinks); }} className="w-full px-3 py-1.5 text-sm rounded-lg border-slate-200 border bg-white focus:ring-2 focus:ring-blue-100" />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setQuickLinks([...quickLinks, { id: Date.now().toString(), label_id: 'Label Baru', label_en: 'New Label', url: '' }])} className="w-full py-2 mt-2 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" /> Tambah Tautan
                </button>
              </div>
            </div>

            {/* Kolom Kontak Footer & Info Tambahan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h2>Kolom 3 (Kontak) & Hak Cipta</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Kontak (ID)</label>
                   <input type="text" value={settings['footer_col_contact_id'] ?? 'Kontak'} onChange={e => handleChange('footer_col_contact_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Kolom Kontak (EN)</label>
                   <input type="text" value={settings['footer_col_contact_en'] ?? 'Contact'} onChange={e => handleChange('footer_col_contact_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                
                {/* Teks Informasi Kontak */}
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Informasi Email (Footer)</label>
                   <input type="text" value={settings['footer_contact_email'] ?? 'fikar@indiekraf.com'} onChange={e => handleChange('footer_contact_email', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Informasi WhatsApp (Footer)</label>
                   <input type="text" value={settings['footer_contact_wa'] ?? '+62 823-3757-6338'} onChange={e => handleChange('footer_contact_wa', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Informasi Website URL (Footer)</label>
                   <input type="text" value={settings['footer_contact_web'] ?? 'www.indiekraf.com'} onChange={e => handleChange('footer_contact_web', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div className="hidden sm:block"></div>

                <div className="col-span-1 sm:col-span-2 border-t border-slate-100 pt-6 mt-2">
                  <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-500" /> Tombol Chat WhatsApp (di Kolom Kontak)</h3>
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL WhatsApp (Tujuan)</label>
                  <input type="text" value={settings['footer_wa_url'] ?? 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'} onChange={e => handleChange('footer_wa_url', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="col-span-1 sm:col-span-2 border-t border-slate-100 pt-6 mt-2">
                  <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" /> Bagian Paling Bawah (Bottom Bar)</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Teks Copyright (ID) <span className="text-slate-400 font-normal lowercase">(Tahun akan ditambahkan otomatis)</span>
                  </label>
                  <input type="text" value={settings['footer_copyright_id'] ?? 'Hak Cipta Dilindungi.'} onChange={e => handleChange('footer_copyright_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Teks Copyright (EN) <span className="text-slate-400 font-normal lowercase">(Tahun akan ditambahkan otomatis)</span>
                  </label>
                  <input type="text" value={settings['footer_copyright_en'] ?? 'All rights reserved.'} onChange={e => handleChange('footer_copyright_en', e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100" />
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

            {/* (Social Media block was moved above) */}
          </div>
        )}

      </form>
    </div>
  );
}
