import React, { useState, useEffect } from 'react';
import { Save, Info, Users, Target, ShieldCheck, Milestone, Layers, CheckCircle2, AlertCircle, Edit2, X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

type AboutTab = 'hero_stats' | 'leadership' | 'purpose' | 'legal' | 'timeline' | 'pillars';

export default function AboutManager() {
  const [activeTab, setActiveTab] = useState<AboutTab>('hero_stats');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal States - 100% Pop-up Modal Editing matching NavbarManager.tsx & HomeManager.tsx
  // 1. Statistik Tentang Kami
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [editingStatKey, setEditingStatKey] = useState<'est' | 'loc' | 'projects' | 'clients' | null>(null);
  const [formStatValueId, setFormStatValueId] = useState('');
  const [formStatValueEn, setFormStatValueEn] = useState('');

  // 2. Visi & Misi (Mission Bullets)
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [editingMissionIndex, setEditingMissionIndex] = useState<number | null>(null);
  const [formMissionTextId, setFormMissionTextId] = useState('');
  const [formMissionTextEn, setFormMissionTextEn] = useState('');

  // 3. Legalitas Perusahaan
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [editingLegalIdx, setEditingLegalIdx] = useState<number | null>(null);
  const [formLegalLabelId, setFormLegalLabelId] = useState('');
  const [formLegalLabelEn, setFormLegalLabelEn] = useState('');
  const [formLegalValueId, setFormLegalValueId] = useState('');
  const [formLegalValueEn, setFormLegalValueEn] = useState('');

  // 4. Timeline Milestone
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [editingTimelineKey, setEditingTimelineKey] = useState<'2018' | '2020' | '2023' | null>(null);
  const [formTimelineDescId, setFormTimelineDescId] = useState('');
  const [formTimelineDescEn, setFormTimelineDescEn] = useState('');

  // 5. Siapa Yang Kami Layani
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClientIdx, setEditingClientIdx] = useState<number | null>(null);
  const [formClientTitleId, setFormClientTitleId] = useState('');
  const [formClientTitleEn, setFormClientTitleEn] = useState('');
  const [formClientDescId, setFormClientDescId] = useState('');
  const [formClientDescEn, setFormClientDescEn] = useState('');
  const [formClientIcon, setFormClientIcon] = useState('');

  // 6. Tim Kepemimpinan (Leadership List)
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  const [editingLeaderIdx, setEditingLeaderIdx] = useState<number | null>(null);
  const [formLeader, setFormLeader] = useState({
    name: '',
    initials: '',
    role_id: '',
    role_en: '',
    subtitle_id: '',
    subtitle_en: '',
    desc_id: '',
    desc_en: '',
    email: '',
    image: ''
  });
  const [uploadingLeaderImage, setUploadingLeaderImage] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan Tentang Kami' });
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
      setMessage({ type: 'success', text: 'Pengaturan halaman Tentang Kami berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan pengaturan Tentang Kami' });
    } finally {
      setIsSaving(false);
    }
  };

  // ─── HANDLERS FOR STATISTIK MODAL ───
  const handleOpenEditStatModal = (key: 'est' | 'loc' | 'projects' | 'clients') => {
    const defaultsId: Record<string, string> = {
      est: 'Est. 2018',
      loc: 'Malang, Jawa Timur',
      projects: '100+ Proyek',
      clients: '100+ Klien',
    };
    const defaultsEn: Record<string, string> = {
      est: 'Est. 2018',
      loc: 'Malang, East Java',
      projects: '100+ Projects',
      clients: '100+ Clients',
    };
    setEditingStatKey(key);
    setFormStatValueId(settings['about_stat_' + key + '_id'] ?? settings['about_stat_' + key] ?? defaultsId[key]);
    setFormStatValueEn(settings['about_stat_' + key + '_en'] ?? defaultsEn[key]);
    setIsStatModalOpen(true);
  };

  const handleSaveStatModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStatKey) return;
    handleChange('about_stat_' + editingStatKey + '_id', formStatValueId);
    handleChange('about_stat_' + editingStatKey, formStatValueId); // maintain backward compatibility
    handleChange('about_stat_' + editingStatKey + '_en', formStatValueEn || formStatValueId);
    setIsStatModalOpen(false);
  };

  // ─── HANDLERS FOR MISSION BULLETS MODAL ───
  const getMissionsListId = () => {
    const raw = settings['about_mission_id'] ?? 'Menghadirkan konten berbasis best practice industri kreatif.\nInovasi platform digital pendukung produktivitas bisnis.\nMembangun kemitraan erat bersama komunitas & instansi strategis.';
    return raw.split('\n').filter(Boolean);
  };

  const getMissionsListEn = () => {
    const raw = settings['about_mission_en'] ?? 'Delivering content based on creative industry best practices.\nInnovative digital platforms supporting business productivity.\nBuilding robust partnerships with communities & strategic institutions.';
    return raw.split('\n').filter(Boolean);
  };

  const handleOpenEditMissionModal = (index: number | null) => {
    const listId = getMissionsListId();
    const listEn = getMissionsListEn();
    if (index !== null) {
      setEditingMissionIndex(index);
      setFormMissionTextId(listId[index] || '');
      setFormMissionTextEn(listEn[index] || '');
    } else {
      setEditingMissionIndex(null);
      setFormMissionTextId('');
      setFormMissionTextEn('');
    }
    setIsMissionModalOpen(true);
  };

  const handleSaveMissionModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    const listId = [...getMissionsListId()];
    const listEn = [...getMissionsListEn()];
    if (editingMissionIndex !== null) {
      listId[editingMissionIndex] = formMissionTextId;
      listEn[editingMissionIndex] = formMissionTextEn || formMissionTextId;
    } else {
      listId.push(formMissionTextId);
      listEn.push(formMissionTextEn || formMissionTextId);
    }
    handleChange('about_mission_id', listId.join('\n'));
    handleChange('about_mission_en', listEn.join('\n'));
    setIsMissionModalOpen(false);
  };

  const handleDeleteMission = (index: number) => {
    if (!confirm('Hapus poin misi ini?')) return;
    const listId = getMissionsListId().filter((_, i) => i !== index);
    const listEn = getMissionsListEn().filter((_, i) => i !== index);
    handleChange('about_mission_id', listId.join('\n'));
    handleChange('about_mission_en', listEn.join('\n'));
  };

  // ─── HANDLERS FOR LEGALITAS MODAL ───
  const getLegalList = () => {
    const defaults = [
      { label_id: 'Legal', label_en: 'Legal Status', value_id: 'Perseroan Terbatas (PT)', value_en: 'Perseroan Terbatas (PT)' },
      { label_id: 'Nama Legal', label_en: 'Legal Name', value_id: 'PT. INDIEKRAF INDONESIA DIGITAL KREATIF', value_en: 'PT. INDIEKRAF INDONESIA DIGITAL KREATIF' },
      { label_id: 'Nomor Akta', label_en: 'Deed Number', value_id: 'Nomor 6 tanggal 14 Juli 2020', value_en: 'No. 6 dated July 14, 2020' },
      { label_id: 'Notaris', label_en: 'Notary', value_id: 'Mochamad Syafrizal Bashori, SH., MKN.', value_en: 'Mochamad Syafrizal Bashori, SH., MKN.' },
      { label_id: 'No. SK Kemenkumham', label_en: 'Ministry Decree No.', value_id: 'AHU-0036931.AH.01.01. TAHUN 2020', value_en: 'AHU-0036931.AH.01.01. TAHUN 2020' },
      { label_id: 'Nomor NPWP', label_en: 'Tax ID (NPWP)', value_id: '95.518.163.1-623.000', value_en: '95.518.163.1-623.000' },
      { label_id: 'Nomor Induk Berusaha (NIB)', label_en: 'Business ID (NIB)', value_id: '0220303861845', value_en: '0220303861845' }
    ];
    if (settings['about_legal_list']) {
      try {
        const parsed = JSON.parse(settings['about_legal_list']);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return defaults;
  };

  const handleOpenAddLegalModal = () => {
    setEditingLegalIdx(null);
    setFormLegalLabelId('');
    setFormLegalLabelEn('');
    setFormLegalValueId('');
    setFormLegalValueEn('');
    setIsLegalModalOpen(true);
  };

  const handleOpenEditLegalModal = (idx: number) => {
    const list = getLegalList();
    const item = list[idx];
    setEditingLegalIdx(idx);
    setFormLegalLabelId(item.label_id || '');
    setFormLegalLabelEn(item.label_en || '');
    setFormLegalValueId(item.value_id || '');
    setFormLegalValueEn(item.value_en || '');
    setIsLegalModalOpen(true);
  };

  const handleSaveLegalModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...getLegalList()];
    const updatedItem = {
      label_id: formLegalLabelId,
      label_en: formLegalLabelEn,
      value_id: formLegalValueId,
      value_en: formLegalValueEn
    };
    if (editingLegalIdx !== null) {
      list[editingLegalIdx] = updatedItem;
    } else {
      list.push(updatedItem);
    }
    handleChange('about_legal_list', JSON.stringify(list));
    setIsLegalModalOpen(false);
  };

  const handleDeleteLegalItem = (idx: number) => {
    if (!confirm('Hapus item legalitas ini?')) return;
    const list = getLegalList().filter((_, i) => i !== idx);
    handleChange('about_legal_list', JSON.stringify(list));
  };

  // ─── HANDLERS FOR TIMELINE MODAL ───
  const handleOpenEditTimelineModal = (key: '2018' | '2020' | '2023') => {
    const defaultsId: Record<string, string> = {
      '2018': 'Indiekraf resmi berdiri sebagai portal berita & wawasan kreatif pertama di Malang.',
      '2020': 'Meluas menjadi digital agency & creative studio untuk merespons kebutuhan digitalisasi bisnis saat pandemi.',
      '2023': 'Mengukuhkan posisi sebagai ekosistem 4 pilar: Media, Studio, Academy, & Research.',
    };
    const defaultsEn: Record<string, string> = {
      '2018': 'Indiekraf was officially founded as the first creative news and insight portal in Malang.',
      '2020': 'Expanded into a digital agency & creative studio to meet business digitization needs during the pandemic.',
      '2023': 'Solidified its position as a 4-pillar ecosystem: Media, Studio, Academy, & Research.',
    };
    setEditingTimelineKey(key);
    setFormTimelineDescId(settings['about_timeline_' + key + '_id'] ?? settings['about_timeline_' + key] ?? defaultsId[key]);
    setFormTimelineDescEn(settings['about_timeline_' + key + '_en'] ?? defaultsEn[key]);
    setIsTimelineModalOpen(true);
  };

  const handleSaveTimelineModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTimelineKey) return;
    handleChange('about_timeline_' + editingTimelineKey + '_id', formTimelineDescId);
    handleChange('about_timeline_' + editingTimelineKey, formTimelineDescId);
    handleChange('about_timeline_' + editingTimelineKey + '_en', formTimelineDescEn || formTimelineDescId);
    setIsTimelineModalOpen(false);
  };

  // ─── HANDLERS FOR SIAPA YANG KAMI LAYANI MODAL ───
  const getClientsList = () => {
    const defaults = [
      { title_id: 'UMKM & Startup', title_en: 'MSMEs & Startups', desc_id: 'Brand lokal yang ingin tumbuh dan bersaing di era digital', desc_en: 'Local brands looking to grow and compete in the digital era', iconName: 'Briefcase' },
      { title_id: 'Perusahaan & Korporasi (B2B)', title_en: 'Corporates & Enterprises', desc_id: 'Perusahaan yang butuh transformasi digital terstruktur', desc_en: 'Companies requiring structured digital transformation', iconName: 'Building' },
      { title_id: 'Pemerintahan & Non-Profit', title_en: 'Government & Non-Profit', desc_id: 'Dinas dan lembaga yang membutuhkan komunikasi publik yang efektif', desc_en: 'Agencies requiring highly effective public communications', iconName: 'Network' },
      { title_id: 'Institusi Pendidikan', title_en: 'Educational Institutions', desc_id: 'Universitas dan sekolah yang ingin memperkuat brand akademik', desc_en: 'Universities and schools aiming to strengthen academic branding', iconName: 'GraduationCap' },
      { title_id: 'Komunitas Kreatif', title_en: 'Creative Communities', desc_id: 'Organisasi nirlaba dan komunitas kreatif yang ingin berdampak lebih luas', desc_en: 'Non-profits and creative hubs aiming for a broader social impact', iconName: 'Heart' },
    ];
    if (!settings['about_clients_list']) return defaults;
    try {
      const parsed = JSON.parse(settings['about_clients_list']);
      return Array.isArray(parsed) ? parsed : defaults;
    } catch {
      return defaults;
    }
  };

  const handleOpenAddClientModal = () => {
    setEditingClientIdx(null);
    setFormClientTitleId('');
    setFormClientTitleEn('');
    setFormClientDescId('');
    setFormClientDescEn('');
    setFormClientIcon('Briefcase');
    setIsClientModalOpen(true);
  };

  const handleOpenEditClientModal = (idx: number) => {
    const list = getClientsList();
    const item = list[idx];
    if (!item) return;
    setEditingClientIdx(idx);
    setFormClientTitleId(item.title_id || '');
    setFormClientTitleEn(item.title_en || '');
    setFormClientDescId(item.desc_id || '');
    setFormClientDescEn(item.desc_en || '');
    setFormClientIcon(item.iconName || 'Briefcase');
    setIsClientModalOpen(true);
  };

  const handleDeleteClient = (idx: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus client ini?')) return;
    const list = getClientsList();
    list.splice(idx, 1);
    handleChange('about_clients_list', JSON.stringify(list));
  };

  const handleSaveClientModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    const list = getClientsList();
    const newItem = {
      title_id: formClientTitleId,
      title_en: formClientTitleEn || formClientTitleId,
      desc_id: formClientDescId,
      desc_en: formClientDescEn || formClientDescId,
      iconName: formClientIcon
    };

    if (editingClientIdx !== null) {
      list[editingClientIdx] = newItem;
    } else {
      list.push(newItem);
    }
    
    handleChange('about_clients_list', JSON.stringify(list));
    setIsClientModalOpen(false);
  };

  // ─── HANDLERS FOR TIM KEPEMIMPINAN MODAL & CRUD ───
  const getLeadershipList = () => {
    const defaultLeaders = [
      {
        name: "M Ziaelfkar Albaba",
        initials: "MZ",
        role_id: "DIRECTOR",
        role_en: "DIRECTOR",
        subtitle_id: "CO-FOUNDER",
        subtitle_en: "CO-FOUNDER",
        desc_id: "Memimpin visi strategis, hubungan kelembagaan, dan pengembangan bisnis Indiekraf Indonesia.",
        desc_en: "Leads the strategic vision, institutional relations, and business development of Indiekraf Indonesia.",
        email: "albab@indiekraf.com",
        image: ""
      },
      {
        name: "Fariz Rizky Wijaya",
        initials: "FR",
        role_id: "CREATIVE",
        role_en: "CREATIVE",
        subtitle_id: "CO-FOUNDER",
        subtitle_en: "CO-FOUNDER",
        desc_id: "Mengelola arah kreatif, strategi brand, dan inovasi layanan digital pada setiap project Indiekraf.",
        desc_en: "Manages creative direction, branding strategy, and digital service innovation for every Indiekraf project.",
        email: "fariz@indiekraf.com",
        image: ""
      }
    ];
    if (!settings['about_leadership_list']) return defaultLeaders;
    try {
      const parsed = JSON.parse(settings['about_leadership_list']);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultLeaders;
    } catch {
      return defaultLeaders;
    }
  };

  const handleOpenAddLeaderModal = () => {
    setEditingLeaderIdx(null);
    setFormLeader({
      name: '',
      initials: '',
      role_id: 'DIRECTOR',
      role_en: 'DIRECTOR',
      subtitle_id: 'CO-FOUNDER',
      subtitle_en: 'CO-FOUNDER',
      desc_id: '',
      desc_en: '',
      email: '',
      image: ''
    });
    setIsLeaderModalOpen(true);
  };

  const handleOpenEditLeaderModal = (idx: number) => {
    const list = getLeadershipList();
    const item = list[idx];
    if (!item) return;
    setEditingLeaderIdx(idx);
    setFormLeader({
      name: item.name || '',
      initials: item.initials || '',
      role_id: item.role_id || '',
      role_en: item.role_en || item.role_id || '',
      subtitle_id: item.subtitle_id || '',
      subtitle_en: item.subtitle_en || item.subtitle_id || '',
      desc_id: item.desc_id || '',
      desc_en: item.desc_en || item.desc_id || '',
      email: item.email || '',
      image: item.image || ''
    });
    setIsLeaderModalOpen(true);
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroImage(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('cms_token')}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        handleChange('about_hero_image', data.url);
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploadingHeroImage(false);
  };

  const handleLeaderImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLeaderImage(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('cms_token')}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setFormLeader(p => ({ ...p, image: data.url }));
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
    setUploadingLeaderImage(false);
  };

  const handleSaveLeaderModal = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...getLeadershipList()];
    const initials = formLeader.initials || (formLeader.name ? formLeader.name.substring(0, 2).toUpperCase() : 'LD');
    const updatedItem = { ...formLeader, initials };
    if (editingLeaderIdx !== null) {
      list[editingLeaderIdx] = updatedItem;
    } else {
      list.push(updatedItem);
    }
    handleChange('about_leadership_list', JSON.stringify(list));
    setIsLeaderModalOpen(false);
  };

  const handleDeleteLeader = (idx: number) => {
    if (!confirm('Hapus anggota tim kepemimpinan ini?')) return;
    const list = [...getLeadershipList()];
    list.splice(idx, 1);
    handleChange('about_leadership_list', JSON.stringify(list));
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data Tentang Kami...</div>;
  }

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola Konten Halaman Tentang Kami (About Us)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Diurutkan persis sesuai urutan tampilan dari atas ke bawah pada halaman Tentang Kami (AboutPage) website Indiekraf.
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

      {/* Sub-Navigation Tabs strictly ordered matching AboutPage.tsx */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        <button
          type="button"
          onClick={() => { setActiveTab('hero_stats'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'hero_stats'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Info className="w-4 h-4 text-blue-400" />
          1. Hero & Statistik
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('leadership'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'leadership'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Users className="w-4 h-4 text-purple-400" />
          2. Tim Kepemimpinan
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('purpose'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'purpose'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Target className="w-4 h-4 text-emerald-400" />
          3. Visi & Misi
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('legal'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'legal'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          4. Legalitas Perusahaan
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('timeline'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'timeline'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Milestone className="w-4 h-4 text-rose-400" />
          5. Pendekatan Kami
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('pillars'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'pillars'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          6. Siapa Yang Kami Layani
        </button>
      </div>

      {/* Tab 1: Hero & Statistik */}
      {activeTab === 'hero_stats' && (
        <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Info className="w-5 h-5 text-blue-600" />
              <h2>1. Hero Banner Halaman Tentang Kami</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['about_page_title_id'] ?? settings['about_page_title'] ?? 'Berangkat dari pemahaman, bukan sekadar eksekusi.'}
                  onChange={e => {
                    handleChange('about_page_title_id', e.target.value);
                    handleChange('about_page_title', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <input
                  type="text"
                  value={settings['about_page_title_en'] ?? 'Rooted in deep understanding, not just execution.'}
                  onChange={e => handleChange('about_page_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Hero (Bahasa Indonesia)</label>
                <textarea
                  rows={3}
                  value={settings['about_page_desc_id'] ?? settings['about_page_desc'] ?? 'Indiekraf adalah creative & digital agency yang hadir sejak 2018 di Malang — membantu bisnis, institusi, dan brand Indonesia tumbuh secara berkelanjutan di era digital.'}
                  onChange={e => {
                    handleChange('about_page_desc_id', e.target.value);
                    handleChange('about_page_desc', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Hero (English)</label>
                <textarea
                  rows={3}
                  value={settings['about_page_desc_en'] ?? 'Indiekraf is a creative & digital agency established in 2018 in Malang — empowering businesses, institutions, and brands to thrive sustainably in the digital era.'}
                  onChange={e => handleChange('about_page_desc_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* CRUD Upload Gambar Hero Tentang Kami */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Gambar Latar / Background Hero Tentang Kami
              </label>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-28 h-16 rounded-xl border-2 border-blue-200 bg-blue-100/50 flex items-center justify-center text-slate-400 overflow-hidden shrink-0 relative shadow-sm">
                  {settings['about_hero_image'] ? (
                    <img src={settings['about_hero_image']} alt="Hero Preview" className="w-full h-full object-cover object-center" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0A2472] border border-slate-200 text-xs font-bold cursor-pointer transition-all shadow-xs">
                      <Upload className="w-4 h-4" />
                      {uploadingHeroImage ? 'Mengupload Gambar...' : 'Upload Gambar Hero Baru'}
                      <input type="file" accept="image/*" onChange={handleHeroImageUpload} disabled={uploadingHeroImage} className="hidden" />
                    </label>
                    {settings['about_hero_image'] && (
                      <button
                        type="button"
                        onClick={() => handleChange('about_hero_image', '')}
                        className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all"
                      >
                        Hapus Gambar
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={settings['about_hero_image'] ?? ''}
                    onChange={e => handleChange('about_hero_image', e.target.value)}
                    placeholder="Atau masukkan URL gambar di sini (misal: /gambar.jpg atau /uploads/...)"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono"
                  />
                  <p className="text-[11px] text-slate-500">
                    Gambar akan ditampilkan sebagai background hero banner utama di bagian paling atas halaman Tentang Kami.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <h2>4 Angka Statistik Tentang Kami</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider w-14 text-center">No</th>
                    <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Label Statistik</th>
                    <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Nilai / Angka (ID / EN)</th>
                    <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider text-right w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">1</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">Tahun Berdiri</td>
                    <td className="py-3.5 px-4 font-black text-[#0A2472]">
                      <div>ID: {settings['about_stat_est_id'] ?? settings['about_stat_est'] ?? 'Est. 2018'}</div>
                      <div className="text-xs font-normal text-slate-400 mt-0.5">EN: {settings['about_stat_est_en'] ?? 'Est. 2018'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEditStatModal('est')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">2</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">Lokasi Kantor</td>
                    <td className="py-3.5 px-4 font-black text-[#0A2472]">
                      <div>ID: {settings['about_stat_loc_id'] ?? settings['about_stat_loc'] ?? 'Malang, Jawa Timur'}</div>
                      <div className="text-xs font-normal text-slate-400 mt-0.5">EN: {settings['about_stat_loc_en'] ?? 'Malang, East Java'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEditStatModal('loc')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">3</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">Total Proyek</td>
                    <td className="py-3.5 px-4 font-black text-[#0A2472]">
                      <div>ID: {settings['about_stat_projects_id'] ?? settings['about_stat_projects'] ?? '100+ Proyek'}</div>
                      <div className="text-xs font-normal text-slate-400 mt-0.5">EN: {settings['about_stat_projects_en'] ?? '100+ Projects'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEditStatModal('projects')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">4</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">Klien Dilayani</td>
                    <td className="py-3.5 px-4 font-black text-[#0A2472]">
                      <div>ID: {settings['about_stat_clients_id'] ?? settings['about_stat_clients'] ?? '100+ Klien'}</div>
                      <div className="text-xs font-normal text-slate-400 mt-0.5">EN: {settings['about_stat_clients_en'] ?? '100+ Clients'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenEditStatModal('clients')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Hero & Statistik'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Tim Kepemimpinan */}
      {activeTab === 'leadership' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Users className="w-5 h-5 text-purple-600" />
              <h2>2. Tim Kepemimpinan (Board of Directors)</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tagline Section (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['about_leadership_tag_id'] ?? settings['about_leadership_tag'] ?? 'BOARD OF DIRECTORS'}
                  onChange={e => {
                    handleChange('about_leadership_tag_id', e.target.value);
                    handleChange('about_leadership_tag', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tagline Section (English)</label>
                <input
                  type="text"
                  value={settings['about_leadership_tag_en'] ?? 'BOARD OF DIRECTORS'}
                  onChange={e => handleChange('about_leadership_tag_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Section (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['about_leadership_title_id'] ?? settings['about_leadership_title'] ?? 'Tim Kepemimpinan'}
                  onChange={e => {
                    handleChange('about_leadership_title_id', e.target.value);
                    handleChange('about_leadership_title', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Section (English)</label>
                <input
                  type="text"
                  value={settings['about_leadership_title_en'] ?? 'Leadership Team'}
                  onChange={e => handleChange('about_leadership_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Singkat (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={settings['about_leadership_desc_id'] ?? settings['about_leadership_desc'] ?? 'Para profesional kreatif di balik arah strategis Indiekraf Indonesia.'}
                  onChange={e => {
                    handleChange('about_leadership_desc_id', e.target.value);
                    handleChange('about_leadership_desc', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Singkat (English)</label>
                <textarea
                  rows={2}
                  value={settings['about_leadership_desc_en'] ?? 'The creative minds driving the strategic vision of Indiekraf Indonesia.'}
                  onChange={e => handleChange('about_leadership_desc_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Tabel Daftar Anggota Tim Kepemimpinan */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-800">Daftar Anggota Tim Kepemimpinan</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelola data profil, foto, jabatan, dan deskripsi anggota tim (Edit via Pop-up Modal).</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddLeaderModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A2472] hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Anggota Tim
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="py-3 px-3 font-black text-xs text-slate-500 uppercase tracking-wider w-12 text-center">No</th>
                      <th className="py-3 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Foto & Nama Lengkap</th>
                      <th className="py-3 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Jabatan & Peran (ID / EN)</th>
                      <th className="py-3 px-4 font-black text-xs text-slate-500 uppercase tracking-wider text-right w-36">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {getLeadershipList().map((leader: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center text-[#0A2472] font-extrabold text-xs shrink-0 overflow-hidden relative shadow-xs">
                              <span>{leader.initials || (leader.name ? leader.name.substring(0, 2).toUpperCase() : 'LD')}</span>
                              {leader.image && (
                                <img src={leader.image} alt={leader.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{leader.name || 'Tanpa Nama'}</div>
                              {leader.email && <div className="text-xs text-slate-500 font-mono mt-0.5">{leader.email}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#0A2472] text-xs uppercase font-mono tracking-wider">
                            ID: {leader.role_id || leader.role_en || '-'} ({leader.subtitle_id || leader.subtitle_en || '-'})
                          </div>
                          <div className="text-xs text-slate-500 font-normal uppercase font-mono tracking-wider mt-0.5">
                            EN: {leader.role_en || leader.role_id || '-'} ({leader.subtitle_en || leader.subtitle_id || '-'})
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEditLeaderModal(idx)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLeader(idx)}
                              className="inline-flex items-center p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Hapus Anggota Tim"
                            >
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
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Tim Kepemimpinan'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Visi & Misi */}
      {activeTab === 'purpose' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Target className="w-5 h-5 text-emerald-600" />
              <h2>3. Visi & Misi (Arah Yang Kami Tuju)</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* KOLOM KIRI: VISI */}
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider">Pengaturan Visi</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Visi (Bahasa Indonesia)</label>
                      <input
                        type="text"
                        value={settings['about_vision_title_id'] ?? 'Apa Yang Kami Impikan'}
                        onChange={e => handleChange('about_vision_title_id', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Visi (English)</label>
                      <input
                        type="text"
                        value={settings['about_vision_title_en'] ?? 'What We Envision'}
                        onChange={e => handleChange('about_vision_title_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Visi</label>
                      <select
                        value={settings['about_vision_icon'] ?? 'eye'}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        onChange={e => handleChange('about_vision_icon', e.target.value)}
                      >
                        <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                        <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                        <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                        <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                        <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                        <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                        <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                        <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Visi Perusahaan (Bahasa Indonesia)</label>
                      <textarea
                        rows={3}
                        value={settings['about_vision_id'] ?? 'Menjadi landasan utama sebagai sumber informasi independen terkemuka yang menyajikan berbagai info relevan mengenai Ekonomi Kreatif dan sektor pariwisata secara akurat & berdampak.'}
                        onChange={e => handleChange('about_vision_id', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Visi Perusahaan (English)</label>
                      <textarea
                        rows={3}
                        value={settings['about_vision_en'] ?? 'To become the premier cornerstone and independent information hub delivering accurate, impactful insights on the Creative Economy and tourism sector.'}
                        onChange={e => handleChange('about_vision_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* KOLOM KANAN: MISI */}
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider">Pengaturan Misi</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Misi (Bahasa Indonesia)</label>
                      <input
                        type="text"
                        value={settings['about_mission_title_id'] ?? 'Bagaimana Kami Melangkah'}
                        onChange={e => handleChange('about_mission_title_id', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Misi (English)</label>
                      <input
                        type="text"
                        value={settings['about_mission_title_en'] ?? 'How We Step Forward'}
                        onChange={e => handleChange('about_mission_title_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Misi</label>
                      <select
                        value={settings['about_mission_icon'] ?? 'compass'}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        onChange={e => handleChange('about_mission_icon', e.target.value)}
                      >
                        <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                        <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                        <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                        <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                        <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                        <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                        <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                        <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                      </select>
                    </div>
                    
                    {/* Daftar Poin Misi */}
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Daftar Poin Misi</label>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOpenEditMissionModal(null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0A2472] rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Tambah Misi
                        </button>
                      </div>

                      <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/80">
                              <th className="py-2 px-3 font-black text-[10px] text-slate-500 uppercase tracking-wider w-8 text-center">No</th>
                              <th className="py-2 px-3 font-black text-[10px] text-slate-500 uppercase tracking-wider">Poin Misi</th>
                              <th className="py-2 px-3 font-black text-[10px] text-slate-500 uppercase tracking-wider text-right w-24">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                            {getMissionsListId().map((mis, idx) => {
                              const misEn = getMissionsListEn()[idx] || mis;
                              return (
                                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                  <td className="py-2 px-3 text-center font-bold text-slate-400 text-xs">{idx + 1}</td>
                                  <td className="py-2 px-3">
                                    <div className="font-bold text-slate-900 text-xs">{mis}</div>
                                    {misEn !== mis && <div className="text-[10px] text-slate-500 font-normal italic mt-0.5">{misEn}</div>}
                                  </td>
                                  <td className="py-2 px-3 text-right">
                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleOpenEditMissionModal(idx)}
                                        className="inline-flex items-center p-1 rounded bg-blue-50 hover:bg-blue-100 text-[#0A2472] transition-colors"
                                        title="Edit"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteMission(idx)}
                                        className="inline-flex items-center p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                                        title="Hapus Misi"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* URL Link Action */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Link Action</label>
                  <input
                    type="text"
                    value={settings['about_purpose_link_text'] ?? 'indiekraf.com'}
                    onChange={e => handleChange('about_purpose_link_text', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Link Action</label>
                  <input
                    type="text"
                    value={settings['about_purpose_link_url'] ?? 'https://indiekraf.com'}
                    onChange={e => handleChange('about_purpose_link_url', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ikon Link Action</label>
                  <select
                    value={settings['about_purpose_link_icon'] ?? 'globe'}
                    onChange={e => handleChange('about_purpose_link_icon', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                    <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                    <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                    <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                    <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                    <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                    <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                    <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Visi & Misi'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Legalitas Perusahaan */}
      {activeTab === 'legal' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h2>4. Legalitas & Badan Hukum Perusahaan</h2>
            </div>

            {/* --- SECTION 1: KONTEN KIRI (TEKS UTAMA) --- */}
            <div className="pt-2">
              <div className="mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-[#0A2472] uppercase tracking-wider">Pengaturan Teks Utama</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">Mengatur teks penjelasan utama, judul, dan status alert di sisi kiri.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kolom 1: ID */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider border-b border-slate-200 pb-2">Bahasa Indonesia</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tag Legalitas & Ikon</label>
                    <div className="flex gap-3">
                      <select
                        value={settings['about_legal_tag_icon'] ?? 'shield-check'}
                        className="w-1/3 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        onChange={e => handleChange('about_legal_tag_icon', e.target.value)}
                      >
                        <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                        <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                        <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                        <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                        <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                        <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                        <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                        <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                      </select>
                      <input
                        type="text"
                        value={settings['about_legal_tag_id'] ?? 'LEGALITAS PERUSAHAAN'}
                        onChange={e => handleChange('about_legal_tag_id', e.target.value)}
                        className="w-2/3 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul</label>
                    <input
                      type="text"
                      value={settings['about_legal_title_id'] ?? 'Beroperasi Secara Resmi & Transparan.'}
                      onChange={e => handleChange('about_legal_title_id', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi</label>
                    <textarea
                      rows={3}
                      value={settings['about_legal_desc_id'] ?? 'Indiekraf beroperasi sebagai badan usaha resmi yang terdaftar dan di bawah legalitas penuh, sehingga setiap kemitraan berjalan dengan landasan hukum yang kuat dan kepercayaan yang terjaga.'}
                      onChange={e => handleChange('about_legal_desc_id', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Teks Status (Alert) & Ikon</label>
                    <div className="flex gap-3">
                      <select
                        value={settings['about_legal_alert_icon'] ?? 'check-circle'}
                        className="w-1/3 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white h-auto"
                        onChange={e => handleChange('about_legal_alert_icon', e.target.value)}
                      >
                        <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                        <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                        <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                        <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                        <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                        <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                        <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                        <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                      </select>
                      <textarea
                        rows={2}
                        value={settings['about_legal_alert_id'] ?? 'Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi.'}
                        onChange={e => handleChange('about_legal_alert_id', e.target.value)}
                        className="w-2/3 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Kolom 2: EN */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider border-b border-slate-200 pb-2">English</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Legal Tag</label>
                    <input
                      type="text"
                      value={settings['about_legal_tag_en'] ?? 'COMPANY LEGALITY'}
                      onChange={e => handleChange('about_legal_tag_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Title</label>
                    <input
                      type="text"
                      value={settings['about_legal_title_en'] ?? 'Operating Officially & Transparently.'}
                      onChange={e => handleChange('about_legal_title_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={settings['about_legal_desc_en'] ?? 'Indiekraf operates as a fully registered and legal business entity, ensuring every partnership is built on solid legal ground and preserved trust.'}
                      onChange={e => handleChange('about_legal_desc_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Status Text (Alert)</label>
                    <textarea
                      rows={2}
                      value={settings['about_legal_alert_en'] ?? 'All legal documents are available and fully verifiable for official collaborations.'}
                      onChange={e => handleChange('about_legal_alert_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                </div>
              </div>


            </div>

            {/* --- SECTION 2: KONTEN KANAN (KARTU LEDGER) --- */}
            <div className="pt-6 mt-6 border-t border-slate-100">
              <div className="mb-5 border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-[#0A2472] uppercase tracking-wider">Pengaturan Kartu Ledger</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">Mengatur teks pada kartu identitas perusahaan di sisi kanan layar.</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kolom 1: ID */}
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50 space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider border-b border-blue-200/50 pb-2">Bahasa Indonesia</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ledger Header</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_header_id'] ?? 'CORPORATE IDENTIFICATION LEDGER'}
                      onChange={e => handleChange('about_legal_ledger_header_id', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Perusahaan (Ledger Name)</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_name_id'] ?? 'PT INDIEKRAF INDONESIA DIGITAL KREATIF'}
                      onChange={e => handleChange('about_legal_ledger_name_id', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_badge_id'] ?? 'SECURE RECORD'}
                      onChange={e => handleChange('about_legal_ledger_badge_id', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Footer Kiri & Ikon</label>
                      <div className="flex gap-2">
                        <select
                          value={settings['about_legal_footer_icon'] ?? 'file-text'}
                          className="w-1/3 px-2 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                          onChange={e => handleChange('about_legal_footer_icon', e.target.value)}
                        >
                          <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                          <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                          <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                          <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                          <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                          <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                          <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                          <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                        </select>
                        <input
                          type="text"
                          value={settings['about_legal_ledger_footer_left_id'] ?? 'ISSUED BY REPUBLIC OF INDONESIA'}
                          onChange={e => handleChange('about_legal_ledger_footer_left_id', e.target.value)}
                          className="w-2/3 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Footer Kanan</label>
                      <input
                        type="text"
                        value={settings['about_legal_ledger_footer_right_id'] ?? 'VERIFICATION HASH: IDX-2018-09'}
                        onChange={e => handleChange('about_legal_ledger_footer_right_id', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Kolom 2: EN */}
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100/50 space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider border-b border-blue-200/50 pb-2">English</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Ledger Header</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_header_en'] ?? 'CORPORATE IDENTIFICATION LEDGER'}
                      onChange={e => handleChange('about_legal_ledger_header_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Company Name (Ledger Name)</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_name_en'] ?? 'PT INDIEKRAF INDONESIA DIGITAL KREATIF'}
                      onChange={e => handleChange('about_legal_ledger_name_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge Text</label>
                    <input
                      type="text"
                      value={settings['about_legal_ledger_badge_en'] ?? 'SECURE RECORD'}
                      onChange={e => handleChange('about_legal_ledger_badge_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Footer Left</label>
                      <input
                        type="text"
                        value={settings['about_legal_ledger_footer_left_en'] ?? 'ISSUED BY REPUBLIC OF INDONESIA'}
                        onChange={e => handleChange('about_legal_ledger_footer_left_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Footer Right</label>
                      <input
                        type="text"
                        value={settings['about_legal_ledger_footer_right_en'] ?? 'VERIFICATION HASH: IDX-2018-09'}
                        onChange={e => handleChange('about_legal_ledger_footer_right_en', e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>


            </div>



            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#0A2472] uppercase tracking-wider">Item Legalitas (Tabel)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelola data label dan keterangan resmi legalitas (Edit via Pop-up Modal).</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddLegalModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A2472] hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Item Legalitas
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider w-14 text-center">No</th>
                      <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Label Legalitas</th>
                      <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider">Keterangan / Nilai Resmi</th>
                      <th className="py-3.5 px-4 font-black text-xs text-slate-500 uppercase tracking-wider text-right w-36">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                    {getLegalList().map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">ID: {item.label_id || item.label_en || '-'}</div>
                          <div className="text-xs font-normal text-slate-500 mt-0.5">EN: {item.label_en || item.label_id || '-'}</div>
                        </td>
                        <td className="py-3.5 px-4 font-black text-[#0A2472]">
                          <div>ID: {item.value_id || item.value_en || '-'}</div>
                          <div className="text-xs font-normal text-slate-400 mt-0.5">EN: {item.value_en || item.value_id || '-'}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditLegalModal(idx)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLegalItem(idx)}
                              className="inline-flex items-center p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Hapus Item Legalitas"
                            >
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
        </div>

        <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Legalitas'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Timeline */}
      {activeTab === 'timeline' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">


          {/* Pengaturan Pendekatan Kami */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Target className="w-5 h-5 text-indigo-600" />
              <h2>Pengaturan Pendekatan Kami (How We Work)</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ID Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-[#0A2472] uppercase tracking-wider border-b border-slate-100 pb-2">Bahasa Indonesia</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Pendekatan</label>
                  <input
                    type="text"
                    value={settings['about_approach_title_id'] ?? 'Pendekatan Kami'}
                    onChange={e => handleChange('about_approach_title_id', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sub Judul Pendekatan</label>
                  <textarea
                    rows={2}
                    value={settings['about_approach_subtitle_id'] ?? 'Setiap proyek dimulai dari pemahaman mendalam, bukan asumsi. Begini cara kami bekerja.'}
                    onChange={e => handleChange('about_approach_subtitle_id', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                
                {[1, 2, 3, 4].map(num => (
                  <div key={`id-${num}`} className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2">Langkah 0{num}</label>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pilih Ikon</label>
                      <select
                        value={settings[`about_approach_${num}_icon`] ?? (num === 1 ? 'Lightbulb' : num === 2 ? 'Sparkles' : num === 3 ? 'Zap' : 'ShieldCheck')}
                        onChange={e => handleChange(`about_approach_${num}_icon`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                        <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                        <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                        <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                        <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                        <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                        <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                        <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Judul Langkah</label>
                      <input
                        type="text"
                        value={settings[`about_approach_${num}_title_id`] ?? (num === 1 ? 'Business-driven' : num === 2 ? 'User-centered' : num === 3 ? 'Agile & Adaptive' : 'Quality-oriented')}
                        onChange={e => handleChange(`about_approach_${num}_title_id`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi Langkah</label>
                      <textarea
                        rows={2}
                        value={settings[`about_approach_${num}_desc_id`] ?? (num === 1 ? 'Setiap keputusan desain dan teknologi selalu dikaitkan dengan tujuan bisnis klien.' : num === 2 ? 'Pengalaman pengguna menjadi inti dari setiap produk yang kami kembangkan.' : num === 3 ? 'Fleksibel terhadap perubahan kebutuhan dan cepat beradaptasi dengan dinamika pasar.' : 'Menjaga standar kualitas tinggi dari sisi desain, performa, dan keberlanjutan sistem.')}
                        onChange={e => handleChange(`about_approach_${num}_desc_id`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* EN Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-[#0A2472] uppercase tracking-wider border-b border-slate-100 pb-2">English</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Approach Title</label>
                  <input
                    type="text"
                    value={settings['about_approach_title_en'] ?? 'Our Approach'}
                    onChange={e => handleChange('about_approach_title_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Approach Subtitle</label>
                  <textarea
                    rows={2}
                    value={settings['about_approach_subtitle_en'] ?? 'Every project starts with a deep understanding, never assumptions. Here is how we work.'}
                    onChange={e => handleChange('about_approach_subtitle_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {[1, 2, 3, 4].map(num => (
                  <div key={`en-${num}`} className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2">Step 0{num}</label>
                    <div className="opacity-0 pointer-events-none select-none" aria-hidden="true">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Spacer</label>
                      <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" disabled><option>Spacer</option></select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Step Title</label>
                      <input
                        type="text"
                        value={settings[`about_approach_${num}_title_en`] ?? (num === 1 ? 'Business-driven' : num === 2 ? 'User-centered' : num === 3 ? 'Agile & Adaptive' : 'Quality-oriented')}
                        onChange={e => handleChange(`about_approach_${num}_title_en`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Step Description</label>
                      <textarea
                        rows={2}
                        value={settings[`about_approach_${num}_desc_en`] ?? (num === 1 ? "Every design and technology decision is aligned directly with our client's business goals." : num === 2 ? 'User experience remains at the core of every digital product we develop.' : num === 3 ? 'Flexible to evolving needs and quick to pivot in dynamic market environments.' : 'Upholding high-quality standards in design, performance, and system sustainability.')}
                        onChange={e => handleChange(`about_approach_${num}_desc_en`, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Pendekatan Kami'}
            </button>
          </div>
        </form>
      )}

      {/* Tab 6: Siapa Yang Kami Layani */}
      {activeTab === 'pillars' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2>6. Pengaturan Siapa Yang Kami Layani</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Section (ID)</label>
                <input
                  type="text"
                  value={settings['about_client_title_id'] ?? 'Siapa Yang Kami Layani?'}
                  onChange={e => handleChange('about_client_title_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Section (EN)</label>
                <input
                  type="text"
                  value={settings['about_client_title_en'] ?? 'Who We Serve'}
                  onChange={e => handleChange('about_client_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Subtitle (ID)</label>
                <textarea
                  rows={2}
                  value={settings['about_client_subtitle_id'] ?? 'Indiekraf hadir untuk berbagai skala bisnis dan jenis institusi — dari startup lokal hingga korporasi nasional.'}
                  onChange={e => handleChange('about_client_subtitle_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Subtitle (EN)</label>
                <textarea
                  rows={2}
                  value={settings['about_client_subtitle_en'] ?? 'Indiekraf serves various business scales and institutions — from local startups to national corporations.'}
                  onChange={e => handleChange('about_client_subtitle_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mt-8">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Daftar Client</h3>
              <button
                type="button"
                onClick={handleOpenAddClientModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Client
              </button>
            </div>

            <div className="space-y-4">
              {getClientsList().map((item, index) => {
                const titleId = item.title_id || '-';
                const descId = item.desc_id || '-';

                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0A2472] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#0A2472]">{titleId}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{descId}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditClientModal(index)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0A2472] font-bold text-xs transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClient(index)}
                        className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Siapa Yang Kami Layani'}
            </button>
          </div>
        </form>
      )}

      {/* ─── 1. POP-UP MODAL STATISTIK ─── */}
      {isStatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#0A2472] font-bold text-sm">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Edit Angka Statistik</h3>
                  <p className="text-[11px] text-slate-500 font-mono">#about_stat_{editingStatKey}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsStatModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveStatModalItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nilai / Angka (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={formStatValueId}
                  onChange={e => setFormStatValueId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nilai / Angka (English)</label>
                <input
                  type="text"
                  value={formStatValueEn}
                  onChange={e => setFormStatValueEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStatModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 2. POP-UP MODAL POIN MISI ─── */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingMissionIndex !== null ? 'Edit Poin Misi' : 'Tambah Poin Misi Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-500">Kelola poin misi (Indonesia & English)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMissionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveMissionModalItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Poin Misi (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={formMissionTextId}
                  onChange={e => setFormMissionTextId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Poin Misi (English - Opsional)</label>
                <textarea
                  rows={2}
                  value={formMissionTextEn}
                  onChange={e => setFormMissionTextEn(e.target.value)}
                  placeholder="Jika kosong, akan otomatis mengikuti teks Bahasa Indonesia..."
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMissionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  Simpan Poin Misi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 3. POP-UP MODAL LEGALITAS ─── */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingLegalIdx !== null ? 'Edit Data Legalitas Resmi' : 'Tambah Data Legalitas Resmi'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {editingLegalIdx !== null ? `#about_legal_item_${editingLegalIdx + 1}` : '#new_legal_item'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLegalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveLegalModalItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Legalitas (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={formLegalLabelId}
                  onChange={e => setFormLegalLabelId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Sektor Usaha"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Label Legalitas (English)</label>
                <input
                  type="text"
                  value={formLegalLabelEn}
                  onChange={e => setFormLegalLabelEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Business Sector"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Keterangan / Nilai Resmi (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={formLegalValueId}
                  onChange={e => setFormLegalValueId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Ekonomi Kreatif & Teknologi"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Keterangan / Nilai Resmi (English)</label>
                <input
                  type="text"
                  value={formLegalValueEn}
                  onChange={e => setFormLegalValueEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="e.g. Creative Economy & Technology"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLegalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  {editingLegalIdx !== null ? 'Simpan Perubahan' : 'Tambah Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. POP-UP MODAL TIMELINE ─── */}
      {isTimelineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm">
                  <Milestone className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Edit Milestone Sejarah</h3>
                  <p className="text-[11px] text-slate-500 font-mono">#about_timeline_{editingTimelineKey}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTimelineModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveTimelineModalItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Perjalanan / Sejarah ({editingTimelineKey}) (ID)</label>
                <textarea
                  rows={3}
                  value={formTimelineDescId}
                  onChange={e => setFormTimelineDescId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Perjalanan / Sejarah ({editingTimelineKey}) (EN)</label>
                <textarea
                  rows={3}
                  value={formTimelineDescEn}
                  onChange={e => setFormTimelineDescEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  Simpan Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 5. POP-UP MODAL SIAPA YANG KAMI LAYANI ─── */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                  <Layers className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Edit Data Client / Mitra</h3>
                  <p className="text-[11px] text-slate-500 font-mono">#about_client_{editingClientIdx}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsClientModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveClientModalItem} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pilih Ikon Client</label>
                <select
                  value={formClientIcon}
                  onChange={e => setFormClientIcon(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Briefcase">Briefcase (Tas Kerja / Bisnis)</option>
                  <option value="Building">Building (Gedung / Korporat)</option>
                  <option value="Network">Network (Jaringan / Pemerintah)</option>
                  <option value="GraduationCap">GraduationCap (Topi Toga / Pendidikan)</option>
                  <option value="Heart">Heart (Hati / Komunitas)</option>
                  <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                  <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                  <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                  <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                  <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                  <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                  <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                  <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Client (ID)</label>
                  <input
                    type="text"
                    value={formClientTitleId}
                    onChange={e => setFormClientTitleId(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Client (EN)</label>
                  <input
                    type="text"
                    value={formClientTitleEn}
                    onChange={e => setFormClientTitleEn(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Client (ID)</label>
                <textarea
                  rows={2}
                  value={formClientDescId}
                  onChange={e => setFormClientDescId(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Client (EN)</label>
                <textarea
                  rows={2}
                  value={formClientDescEn}
                  onChange={e => setFormClientDescEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  Simpan Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 6. POP-UP MODAL TIM KEPEMIMPINAN ─── */}
      {isLeaderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#0A2472] font-bold text-sm">
                  <Users className="w-4 h-4 text-[#0A2472]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {editingLeaderIdx !== null ? 'Edit Anggota Tim Kepemimpinan' : 'Tambah Anggota Tim Kepemimpinan'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {editingLeaderIdx !== null ? `#leadership_item_${editingLeaderIdx + 1}` : '#new_leadership_item'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLeaderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLeaderModal} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formLeader.name}
                    onChange={e => setFormLeader(p => ({ ...p, name: e.target.value }))}
                    placeholder="M Ziaelfkar Albaba"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Kontak</label>
                  <input
                    type="email"
                    value={formLeader.email}
                    onChange={e => setFormLeader(p => ({ ...p, email: e.target.value }))}
                    placeholder="albab@indiekraf.com"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Foto Upload & Preview */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Foto Profil / Avatar Anggota Tim</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-blue-200 bg-blue-100/50 flex items-center justify-center text-[#0A2472] font-extrabold text-base overflow-hidden shrink-0 relative shadow-md">
                    <span>{formLeader.initials || (formLeader.name ? formLeader.name.substring(0, 2).toUpperCase() : 'LD')}</span>
                    {formLeader.image && (
                      <img src={formLeader.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover object-center" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#0A2472] border border-slate-200 text-xs font-bold cursor-pointer transition-all shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        {uploadingLeaderImage ? 'Mengupload Foto...' : 'Upload Foto Baru'}
                        <input type="file" accept="image/*" onChange={handleLeaderImageUpload} disabled={uploadingLeaderImage} className="hidden" />
                      </label>
                      {formLeader.image && (
                        <button
                          type="button"
                          onClick={() => setFormLeader(p => ({ ...p, image: '' }))}
                          className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formLeader.image}
                        onChange={e => setFormLeader(p => ({ ...p, image: e.target.value }))}
                        placeholder="Atau masukkan URL gambar foto di sini (/uploads/...)"
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-600 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Jabatan / Role (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={formLeader.role_id}
                    onChange={e => setFormLeader(p => ({ ...p, role_id: e.target.value }))}
                    placeholder="DIRECTOR / CREATIVE"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Jabatan / Role (English)</label>
                  <input
                    type="text"
                    value={formLeader.role_en}
                    onChange={e => setFormLeader(p => ({ ...p, role_en: e.target.value }))}
                    placeholder="DIRECTOR / CREATIVE"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Label Subtitle / Status (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={formLeader.subtitle_id}
                    onChange={e => setFormLeader(p => ({ ...p, subtitle_id: e.target.value }))}
                    placeholder="CO-FOUNDER"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Label Subtitle / Status (English)</label>
                  <input
                    type="text"
                    value={formLeader.subtitle_en}
                    onChange={e => setFormLeader(p => ({ ...p, subtitle_en: e.target.value }))}
                    placeholder="CO-FOUNDER"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>



              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsLeaderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-bold bg-[#0A2472] text-white hover:bg-blue-900 shadow-md transition-all"
                >
                  Simpan Anggota Tim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
