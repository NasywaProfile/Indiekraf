import React, { useState, useEffect, useRef } from 'react';
import { Save, Sparkles, Info, BarChart2, Award, Layers, Tag, CheckCircle2, AlertCircle, Plus, Edit2, Trash2, ArrowUp, ArrowDown, RotateCcw, Upload, X, Loader2, Newspaper, GraduationCap, Globe, ShieldCheck } from 'lucide-react';
import ServicesManager from './ServicesManager';
import PricingManager from './PricingManager';

type HomeTab = 'hero' | 'about_preview' | 'stats' | 'services_header' | 'pricing_crud' | 'why_us';

interface PillarItem {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  link: string;
  order: number;
}

const defaultPillars: PillarItem[] = [
  {
    id: 'media',
    number: '01',
    title: 'Indiekraf Media',
    category: 'Creative Hub & News',
    image: '/gambar.jpg',
    link: '#media',
    order: 1,
  },
  {
    id: 'studio',
    number: '02',
    title: 'Indiekraf Studio',
    category: 'Design & Tech Suite',
    image: '/gambar.jpg',
    link: '#services',
    order: 2,
  },
  {
    id: 'academy',
    number: '03',
    title: 'Indiekraf Academy',
    category: 'Talent Acceleration',
    image: '/gambar.jpg',
    link: '#academy',
    order: 3,
  },
  {
    id: 'insight',
    number: '04',
    title: 'Indiekraf Insight',
    category: 'Data & Market Research',
    image: '/gambar.jpg',
    link: '#insight',
    order: 4,
  },
];

interface AboutPillItem {
  id: string;
  labelId: string;
  labelEn: string;
  iconName: string;
  order: number;
}

const defaultAboutPills: AboutPillItem[] = [
  { id: 'integrated', labelId: 'Solusi Terintegrasi', labelEn: 'Integrated Solutions', iconName: 'Target', order: 1 },
  { id: 'branding', labelId: 'Branding & Identity', labelEn: 'Branding & Identity', iconName: 'ShieldCheck', order: 2 },
  { id: 'datadriven', labelId: 'Pendekatan Berbasis Data', labelEn: 'Data-Driven Approach', iconName: 'Cpu', order: 3 },
  { id: 'trackrecord', labelId: 'Rekam Jejak Terbukti', labelEn: 'Proven Track Record', iconName: 'Zap', order: 4 },
];

const defaultAboutPhotos: string[] = ['/gambar.jpg'];

export default function HomeManager() {
  const [activeTab, setActiveTab] = useState<HomeTab>('hero');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [pillars, setPillars] = useState<PillarItem[]>([]);
  const [aboutPills, setAboutPills] = useState<AboutPillItem[]>([]);
  const [aboutPhotos, setAboutPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal & Form States for Pillar CRUD
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillarIndex, setEditingPillarIndex] = useState<number | null>(null);
  const [formPillarId, setFormPillarId] = useState('');
  const [formPillarNumber, setFormPillarNumber] = useState('');
  const [formPillarTitle, setFormPillarTitle] = useState('');
  const [formPillarCategory, setFormPillarCategory] = useState('');
  const [formPillarImage, setFormPillarImage] = useState('');
  const [formPillarLink, setFormPillarLink] = useState('');
  const [isUploadingPillar, setIsUploadingPillar] = useState(false);
  const pillarFileInputRef = useRef<HTMLInputElement>(null);

  // States for About Photos & About Pills CRUD
  const [isUploadingAboutPhoto, setIsUploadingAboutPhoto] = useState(false);
  const aboutPhotoInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingHeroLeft, setIsUploadingHeroLeft] = useState(false);
  const heroLeftInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingHeroRight, setIsUploadingHeroRight] = useState(false);
  const heroRightInputRef = useRef<HTMLInputElement>(null);
  const [uploadingServicePillarIdx, setUploadingServicePillarIdx] = useState<number | null>(null);
  const [activePillarEditIdx, setActivePillarEditIdx] = useState(0);
  const [isAboutPillModalOpen, setIsAboutPillModalOpen] = useState(false);
  const [editingAboutPillIndex, setEditingAboutPillIndex] = useState<number | null>(null);
  const [formAboutPillId, setFormAboutPillId] = useState('');
  const [formAboutPillLabelId, setFormAboutPillLabelId] = useState('');
  const [formAboutPillLabelEn, setFormAboutPillLabelEn] = useState('');
  const [formAboutPillIconName, setFormAboutPillIconName] = useState('Target');

  // Modal & Form States for Kartu Statistik
  const [statsList, setStatsList] = useState<any[]>([]);
  const [isStatModalOpen, setIsStatModalOpen] = useState(false);
  const [editingStatIndex, setEditingStatIndex] = useState<number | null>(null);
  const [formStatId, setFormStatId] = useState('');
  const [formStatIcon, setFormStatIcon] = useState('Users');
  const [formStatNumber, setFormStatNumber] = useState('');
  const [formStatLabelId, setFormStatLabelId] = useState('');
  const [formStatLabelEn, setFormStatLabelEn] = useState('');

  // Modal & Form States for 6 Poin Keunggulan Why Us
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [editingWhyKey, setEditingWhyKey] = useState<'integrated' | 'datadriven' | 'team' | 'track' | 'partner' | 'pricing' | null>(null);
  const [formWhyCode, setFormWhyCode] = useState('');
  const [formWhyTitleId, setFormWhyTitleId] = useState('');
  const [formWhyTitleEn, setFormWhyTitleEn] = useState('');
  const [formWhyDescId, setFormWhyDescId] = useState('');
  const [formWhyDescEn, setFormWhyDescEn] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        if (data.hero_pillars_list) {
          try {
            const parsed: PillarItem[] = JSON.parse(data.hero_pillars_list);
            parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
            setPillars(parsed);
          } catch (e) {
            setPillars(defaultPillars);
          }
        } else {
          setPillars(defaultPillars);
        }

        if (data.about_pills_list) {
          try {
            const parsed: AboutPillItem[] = JSON.parse(data.about_pills_list);
            parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
            setAboutPills(parsed);
          } catch (e) {
            setAboutPills(defaultAboutPills);
          }
        } else {
          setAboutPills(defaultAboutPills);
        }

        if (data.about_photos_list) {
          try {
            const parsed: string[] = JSON.parse(data.about_photos_list);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setAboutPhotos(parsed);
            } else {
              setAboutPhotos(defaultAboutPhotos);
            }
          } catch (e) {
            setAboutPhotos(defaultAboutPhotos);
          }
        } else if (data.about_image) {
          setAboutPhotos([data.about_image]);
        } else {
          setAboutPhotos(defaultAboutPhotos);
        }

        if (data.stats_list_data) {
          try {
            setStatsList(JSON.parse(data.stats_list_data));
          } catch (e) {
            setStatsList([
              { id: 'visitor', iconName: data['stat_visitor_icon'] ?? 'Users', value: data['stat_visitors'] ?? '75.000+', labelId: data['stats.visitors_id'] ?? data['stats.visitors'] ?? 'Pengunjung Bulanan', labelEn: data['stats.visitors_en'] ?? 'Monthly Visitors' },
              { id: 'follower', iconName: data['stat_follower_icon'] ?? 'TrendingUp', value: data['stat_followers'] ?? '120.000+', labelId: data['stats.followers_id'] ?? data['stats.followers'] ?? 'Pengikut Media Sosial', labelEn: data['stats.followers_en'] ?? 'Social Media Followers' },
              { id: 'channel', iconName: data['stat_channel_icon'] ?? data['stat_channels_icon'] ?? 'Globe', value: data['stat_channels'] ?? '10+', labelId: data['stats.channel_id'] ?? data['stats.channel'] ?? 'Saluran Media Sosial', labelEn: data['stats.channel_en'] ?? 'Social Media Channels' },
              { id: 'reach', iconName: data['stat_reach_icon'] ?? 'Eye', value: data['stat_reach'] ?? '2.5M+', labelId: data['stats.reach_id'] ?? data['stats.reach'] ?? 'Jangkauan & Kunjungan Bulanan', labelEn: data['stats.reach_en'] ?? 'Monthly Reach & Visits' },
            ]);
          }
        } else {
          setStatsList([
            { id: 'visitor', iconName: data['stat_visitor_icon'] ?? 'Users', value: data['stat_visitors'] ?? '75.000+', labelId: data['stats.visitors_id'] ?? data['stats.visitors'] ?? 'Pengunjung Bulanan', labelEn: data['stats.visitors_en'] ?? 'Monthly Visitors' },
            { id: 'follower', iconName: data['stat_follower_icon'] ?? 'TrendingUp', value: data['stat_followers'] ?? '120.000+', labelId: data['stats.followers_id'] ?? data['stats.followers'] ?? 'Pengikut Media Sosial', labelEn: data['stats.followers_en'] ?? 'Social Media Followers' },
            { id: 'channel', iconName: data['stat_channel_icon'] ?? data['stat_channels_icon'] ?? 'Globe', value: data['stat_channels'] ?? '10+', labelId: data['stats.channel_id'] ?? data['stats.channel'] ?? 'Saluran Media Sosial', labelEn: data['stats.channel_en'] ?? 'Social Media Channels' },
            { id: 'reach', iconName: data['stat_reach_icon'] ?? 'Eye', value: data['stat_reach'] ?? '2.5M+', labelId: data['stats.reach_id'] ?? data['stats.reach'] ?? 'Jangkauan & Kunjungan Bulanan', labelEn: data['stats.reach_en'] ?? 'Monthly Reach & Visits' },
          ]);
        }

        setIsLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Gagal memuat pengaturan Beranda' });
        setIsLoading(false);
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e?: React.SyntheticEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('cms_token');
      const payload: Record<string, string> = {
        ...settings,
        hero_pillars_list: JSON.stringify(pillars),
        about_pills_list: JSON.stringify(aboutPills),
        about_photos_list: JSON.stringify(aboutPhotos),
        about_image: aboutPhotos[0] || '/gambar.jpg',
        stats_list_data: JSON.stringify(statsList),
      };
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
      setMessage({ type: 'success', text: 'Pengaturan halaman Beranda berhasil disimpan!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Terjadi kesalahan saat menyimpan pengaturan Beranda' });
    } finally {
      setIsSaving(false);
    }
  };

  // ─── CRUD ACTIONS: HERO PILLARS (MARQUEE) ─────────────────────────────────
  const handleOpenAddPillarModal = () => {
    setEditingPillarIndex(null);
    setFormPillarId('');
    setFormPillarNumber(`0${pillars.length + 1}`.slice(-2));
    setFormPillarTitle('');
    setFormPillarCategory('');
    setFormPillarImage('/gambar.jpg');
    setFormPillarLink('#');
    setIsPillarModalOpen(true);
  };

  const handleOpenEditPillarModal = (index: number) => {
    const item = pillars[index];
    setEditingPillarIndex(index);
    setFormPillarId(item.id || '');
    setFormPillarNumber(item.number || '');
    setFormPillarTitle(item.title || '');
    setFormPillarCategory(item.category || '');
    setFormPillarImage(item.image || '/gambar.jpg');
    setFormPillarLink(item.link || '#');
    setIsPillarModalOpen(true);
  };

  const handleFileUploadPillar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPillar(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      setFormPillarImage(data.url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload foto');
    } finally {
      setIsUploadingPillar(false);
      if (pillarFileInputRef.current) pillarFileInputRef.current.value = '';
    }
  };

  const handleSavePillarModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPillarTitle.trim() || !formPillarCategory.trim()) {
      alert('Harap isi Judul Pilar dan Kategori!');
      return;
    }

    const cleanId = formPillarId.trim() || formPillarTitle.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingPillarIndex === null) {
      const newItem: PillarItem = {
        id: cleanId,
        number: formPillarNumber.trim() || `0${pillars.length + 1}`.slice(-2),
        title: formPillarTitle.trim(),
        category: formPillarCategory.trim(),
        image: formPillarImage.trim() || '/gambar.jpg',
        link: formPillarLink.trim() || '#',
        order: pillars.length + 1
      };
      setPillars([...pillars, newItem]);
    } else {
      const updated = [...pillars];
      updated[editingPillarIndex] = {
        ...updated[editingPillarIndex],
        id: cleanId,
        number: formPillarNumber.trim(),
        title: formPillarTitle.trim(),
        category: formPillarCategory.trim(),
        image: formPillarImage.trim() || '/gambar.jpg',
        link: formPillarLink.trim() || '#'
      };
      setPillars(updated);
    }
    setIsPillarModalOpen(false);
  };

  const handleDeletePillarItem = (index: number) => {
    if (window.confirm(`Hapus kartu pilar "${pillars[index].title}" dari Hero Beranda?`)) {
      const updated = pillars.filter((_, idx) => idx !== index);
      updated.forEach((item, idx) => { item.order = idx + 1; });
      setPillars(updated);
    }
  };

  const handleMovePillarItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === pillars.length - 1) return;

    const updated = [...pillars];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[targetIndex];
    updated[targetIndex] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setPillars(updated);
  };

  const handleResetPillarsDefault = () => {
    if (window.confirm('Kembalikan daftar kartu pilar Hero ke standar (Media, Studio, Academy, Insight)?')) {
      setPillars(defaultPillars);
    }
  };

  const handleUploadServicePillarImg = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingServicePillarIdx(index);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      
      const rawPillars = settings['services_pillars_list'] ? JSON.parse(settings['services_pillars_list']) : [];
      if (rawPillars[index]) {
        rawPillars[index].image_url = data.url;
        handleChange('services_pillars_list', JSON.stringify(rawPillars));
      }
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload gambar');
    } finally {
      setUploadingServicePillarIdx(null);
    }
  };

  // ─── CRUD ACTIONS: ABOUT PHOTOS SLIDER ────────────────────────────────────
  const handleUploadAboutPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAboutPhoto(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      setAboutPhotos([...aboutPhotos, data.url]);
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload foto');
    } finally {
      setIsUploadingAboutPhoto(false);
      if (aboutPhotoInputRef.current) aboutPhotoInputRef.current.value = '';
    }
  };

  const handleUploadHeroLeft = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHeroLeft(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      handleChange('hero_icon_left', data.url);
      handleChange('hero.icon_left', data.url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload icon kiri');
    } finally {
      setIsUploadingHeroLeft(false);
      if (heroLeftInputRef.current) heroLeftInputRef.current.value = '';
    }
  };

  const handleUploadHeroRight = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingHeroRight(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gagal upload');
      handleChange('hero_icon_right', data.url);
      handleChange('hero.icon_right', data.url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload icon kanan');
    } finally {
      setIsUploadingHeroRight(false);
      if (heroRightInputRef.current) heroRightInputRef.current.value = '';
    }
  };

  const handleDeleteAboutPhoto = (index: number) => {
    if (window.confirm('Hapus foto ini dari slider Sekilas Tentang Kami?')) {
      const updated = aboutPhotos.filter((_, idx) => idx !== index);
      setAboutPhotos(updated.length > 0 ? updated : ['/gambar.jpg']);
    }
  };

  const handleMoveAboutPhoto = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === aboutPhotos.length - 1) return;
    const updated = [...aboutPhotos];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[targetIndex];
    updated[targetIndex] = updated[index];
    updated[index] = temp;
    setAboutPhotos(updated);
  };

  // ─── CRUD ACTIONS: ABOUT PILLS BUTTONS (4 BUTTON) ─────────────────────────
  const handleOpenAddAboutPillModal = () => {
    setEditingAboutPillIndex(null);
    setFormAboutPillId('');
    setFormAboutPillLabelId('');
    setFormAboutPillLabelEn('');
    setFormAboutPillIconName('Target');
    setIsAboutPillModalOpen(true);
  };

  const handleOpenEditAboutPillModal = (index: number) => {
    const item = aboutPills[index];
    setEditingAboutPillIndex(index);
    setFormAboutPillId(item.id || '');
    setFormAboutPillLabelId(item.labelId || '');
    setFormAboutPillLabelEn(item.labelEn || '');
    setFormAboutPillIconName(item.iconName || 'Target');
    setIsAboutPillModalOpen(true);
  };

  const handleSaveAboutPillModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAboutPillLabelId.trim() || !formAboutPillLabelEn.trim()) {
      alert('Harap isi Label Bahasa Indonesia dan Bahasa Inggris!');
      return;
    }
    const cleanId = formAboutPillId.trim() || formAboutPillLabelId.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (editingAboutPillIndex === null) {
      const newItem: AboutPillItem = {
        id: cleanId,
        labelId: formAboutPillLabelId.trim(),
        labelEn: formAboutPillLabelEn.trim(),
        iconName: formAboutPillIconName,
        order: aboutPills.length + 1
      };
      setAboutPills([...aboutPills, newItem]);
    } else {
      const updated = [...aboutPills];
      updated[editingAboutPillIndex] = {
        ...updated[editingAboutPillIndex],
        id: cleanId,
        labelId: formAboutPillLabelId.trim(),
        labelEn: formAboutPillLabelEn.trim(),
        iconName: formAboutPillIconName
      };
      setAboutPills(updated);
    }
    setIsAboutPillModalOpen(false);
  };

  const handleDeleteAboutPillItem = (index: number) => {
    if (window.confirm(`Hapus button "${aboutPills[index].labelId}" dari Sekilas Tentang?`)) {
      const updated = aboutPills.filter((_, idx) => idx !== index);
      updated.forEach((item, idx) => { item.order = idx + 1; });
      setAboutPills(updated);
    }
  };

  const handleMoveAboutPillItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === aboutPills.length - 1) return;
    const updated = [...aboutPills];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[targetIndex];
    updated[targetIndex] = updated[index];
    updated[index] = temp;
    updated.forEach((item, idx) => { item.order = idx + 1; });
    setAboutPills(updated);
  };

  const handleResetAboutPills = () => {
    if (window.confirm('Kembalikan 4 button keunggulan ke standar?')) {
      setAboutPills(defaultAboutPills);
    }
  };

  // ─── CRUD ACTIONS: KARTU STATISTIK (POPUP MODAL) ───────────────────────────
  const handleOpenAddStatModal = () => {
    setEditingStatIndex(null);
    setFormStatId(`stat_${Date.now()}`);
    setFormStatIcon('Users');
    setFormStatNumber('');
    setFormStatLabelId('');
    setFormStatLabelEn('');
    setIsStatModalOpen(true);
  };

  const handleOpenEditStatModal = (index: number) => {
    const item = statsList[index];
    setEditingStatIndex(index);
    setFormStatId(item.id || `stat_${Date.now()}`);
    setFormStatIcon(item.iconName || 'Users');
    setFormStatNumber(item.value || '');
    setFormStatLabelId(item.labelId || '');
    setFormStatLabelEn(item.labelEn || '');
    setIsStatModalOpen(true);
  };

  const handleSaveStatModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...statsList];
    const item = {
      id: formStatId || `stat_${Date.now()}`,
      iconName: formStatIcon.trim() || 'Users',
      value: formStatNumber.trim() || '0',
      labelId: formStatLabelId.trim() || 'Label Baru',
      labelEn: formStatLabelEn.trim() || 'New Label',
    };

    if (editingStatIndex !== null) {
      updated[editingStatIndex] = item;
    } else {
      updated.push(item);
    }
    setStatsList(updated);
    setIsStatModalOpen(false);
  };

  const handleDeleteStatItem = (index: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kartu statistik ini?')) {
      const updated = statsList.filter((_, i) => i !== index);
      setStatsList(updated);
    }
  };

  const handleMoveStatItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === statsList.length - 1) return;
    const updated = [...statsList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[targetIndex];
    updated[targetIndex] = updated[index];
    updated[index] = temp;
    setStatsList(updated);
  };

  const handleResetStats = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan kartu statistik ke setelan bawaan (4 kartu)?')) {
      setStatsList([
        { id: 'visitor', iconName: 'Users', value: '75.000+', labelId: 'Pengunjung Bulanan', labelEn: 'Monthly Visitors' },
        { id: 'follower', iconName: 'TrendingUp', value: '120.000+', labelId: 'Pengikut Media Sosial', labelEn: 'Social Media Followers' },
        { id: 'channel', iconName: 'Globe', value: '10+', labelId: 'Saluran Media Sosial', labelEn: 'Social Media Channels' },
        { id: 'reach', iconName: 'Eye', value: '2.5M+', labelId: 'Jangkauan & Kunjungan Bulanan', labelEn: 'Monthly Reach & Visits' },
      ]);
    }
  };

  // ─── CRUD ACTIONS: WHY CHOOSE US FEATURES (POPUP MODAL) ─────────────────────
  const handleOpenEditWhyModal = (key: 'integrated' | 'datadriven' | 'team' | 'track' | 'partner' | 'pricing') => {
    setEditingWhyKey(key);
    if (key === 'integrated') {
      setFormWhyCode('#integrated');
      setFormWhyTitleId(settings['why.feat.integrated.title_id'] || settings['why.feat.integrated.title'] || 'Solusi Terintegrasi');
      setFormWhyTitleEn(settings['why.feat.integrated.title_en'] || 'Integrated Solutions');
      setFormWhyDescId(settings['why.feat.integrated.desc_id'] || settings['why.feat.integrated.desc'] || 'Dari strategi hingga eksekusi — setiap layanan yang Anda butuhkan berada dalam satu ekosistem yang terhubung, dibangun untuk hasil nyata.');
      setFormWhyDescEn(settings['why.feat.integrated.desc_en'] || 'From strategy to execution — every service you need is within one connected ecosystem, built for real results.');
    } else if (key === 'datadriven') {
      setFormWhyCode('#datadriven');
      setFormWhyTitleId(settings['why.feat.datadriven.title_id'] || settings['why.feat.datadriven.title'] || 'Pendekatan Berbasis Data');
      setFormWhyTitleEn(settings['why.feat.datadriven.title_en'] || 'Data-Driven Approach');
      setFormWhyDescId(settings['why.feat.datadriven.desc_id'] || settings['why.feat.datadriven.desc'] || 'Setiap keputusan didukung oleh analisis, memastikan investasi Anda menghasilkan ROI yang terukur dan dapat dilacak.');
      setFormWhyDescEn(settings['why.feat.datadriven.desc_en'] || 'Every decision is backed by analytics, ensuring your investment yields measurable and trackable ROI.');
    } else if (key === 'team') {
      setFormWhyCode('#team');
      setFormWhyTitleId(settings['why.feat.team.title_id'] || settings['why.feat.team.title'] || 'Tim Profesional');
      setFormWhyTitleEn(settings['why.feat.team.title_en'] || 'Professional Team');
      setFormWhyDescId(settings['why.feat.team.desc_id'] || settings['why.feat.team.desc'] || 'Tim berpengalaman di bidang pemasaran digital, desain, pengembangan, dan konsultasi — siap untuk menangani setiap permintaan.');
      setFormWhyDescEn(settings['why.feat.team.desc_en'] || 'An experienced team in digital marketing, design, development, and consulting — ready to handle any requests.');
    } else if (key === 'track') {
      setFormWhyCode('#track');
      setFormWhyTitleId(settings['why.feat.track.title_id'] || settings['why.feat.track.title'] || 'Rekam Jejak Terbukti');
      setFormWhyTitleEn(settings['why.feat.track.title_en'] || 'Proven Track Record');
      setFormWhyDescId(settings['why.feat.track.desc_id'] || settings['why.feat.track.desc'] || 'Mulai dari UKM lokal hingga lembaga pemerintah — klien yang telah tumbuh bersama kami terus kembali.');
      setFormWhyDescEn(settings['why.feat.track.desc_en'] || 'From local SMBs to government agencies — clients who have grown with us keep coming back.');
    } else if (key === 'partner') {
      setFormWhyCode('#partner');
      setFormWhyTitleId(settings['why.feat.partner.title_id'] || settings['why.feat.partner.title'] || 'Partner, Bukan Vendor');
      setFormWhyTitleEn(settings['why.feat.partner.title_en'] || 'Partner, Not Vendor');
      setFormWhyDescId(settings['why.feat.partner.desc_id'] || settings['why.feat.partner.desc'] || 'Bukan sekadar vendor. Kami adalah mitra kreatif yang berkomitmen pada pertumbuhan Bisnis Anda.');
      setFormWhyDescEn(settings['why.feat.partner.desc_en'] || 'Not just a vendor. We are a creative partner committed to your business growth.');
    } else if (key === 'pricing') {
      setFormWhyCode('#pricing');
      setFormWhyTitleId(settings['why.feat.pricing.title_id'] || settings['why.feat.pricing.title'] || 'Harga Transparan');
      setFormWhyTitleEn(settings['why.feat.pricing.title_en'] || 'Transparent Pricing');
      setFormWhyDescId(settings['why.feat.pricing.desc_id'] || settings['why.feat.pricing.desc'] || 'Harga transparan, paket fleksibel — dirancang agar sesuai dengan anggaran Anda.');
      setFormWhyDescEn(settings['why.feat.pricing.desc_en'] || 'Transparent pricing, flexible packages — tailored to fit your budget.');
    }
    setIsWhyModalOpen(true);
  };

  const handleSaveWhyModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWhyKey) return;
    const newSettings = { ...settings };
    const k = editingWhyKey;
    newSettings[`why.feat.${k}.title_id`] = formWhyTitleId.trim();
    newSettings[`why.feat.${k}.title`] = formWhyTitleId.trim();
    newSettings[`why.feat.${k}.title_en`] = formWhyTitleEn.trim();
    newSettings[`why.feat.${k}.desc_id`] = formWhyDescId.trim();
    newSettings[`why.feat.${k}.desc`] = formWhyDescId.trim();
    newSettings[`why.feat.${k}.desc_en`] = formWhyDescEn.trim();
    setSettings(newSettings);
    setIsWhyModalOpen(false);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Memuat data halaman Beranda...</div>;
  }

  return (
    <div className="max-w-6xl space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0A2472]">Kelola Konten Halaman Beranda (Home)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Diurutkan persis sesuai urutan tampilan dari atas ke bawah pada halaman Beranda website Indiekraf.
          </p>
        </div>
      </div>

      {message && activeTab !== 'services_crud' && activeTab !== 'pricing_crud' && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-semibold ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          {message.text}
        </div>
      )}

      {/* Sub-Navigation Tabs strictly ordered 1 to 6 matching web/src/App.tsx homepage layout */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
        <button
          type="button"
          onClick={() => { setActiveTab('hero'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          1. Hero Beranda
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('about_preview'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'about_preview'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Info className="w-4 h-4 text-blue-400" />
          2. Sekilas Tentang Kami
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('stats'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'stats'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          3. Statistik Pencapaian
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('services_header'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'services_header'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-400" />
          4. Section Layanan (Header)
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('pricing_crud'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'pricing_crud'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Tag className="w-4 h-4 text-emerald-400" />
          5. CRUD Daftar Harga (di Beranda)
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('why_us'); setMessage(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
            activeTab === 'why_us'
              ? 'bg-[#0A2472] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Award className="w-4 h-4 text-rose-400" />
          6. Mengapa Memilih Kami
        </button>
      </div>

      {/* Section 1: Hero Banner */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2>1. Hero Beranda (Section Pertama di Beranda)</h2>
            </div>

            {/* Badge / Label Sebelum Judul Utama */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge / Label Atas (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['hero_badge_id'] || settings['hero.badge_id'] || settings['hero.badge'] || 'INDIEKRAF MEDIA & KREATIF'}
                  onChange={e => {
                    handleChange('hero_badge_id', e.target.value);
                    handleChange('hero.badge_id', e.target.value);
                    handleChange('hero.badge', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  placeholder="INDIEKRAF MEDIA & KREATIF"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Badge / Label Atas (English)</label>
                <input
                  type="text"
                  value={settings['hero_badge_en'] || settings['hero.badge_en'] || 'INDIEKRAF MEDIA & CREATIVE'}
                  onChange={e => {
                    handleChange('hero_badge_en', e.target.value);
                    handleChange('hero.badge_en', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  placeholder="INDIEKRAF MEDIA & CREATIVE"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <textarea
                  rows={3}
                  value={settings['hero_title_id'] || ''}
                  onChange={e => handleChange('hero_title_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Kolaborasi Kreatif untuk Mengembangkan Bisnis Anda"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <textarea
                  rows={3}
                  value={settings['hero_title_en'] || ''}
                  onChange={e => handleChange('hero_title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Creative Collaboration to Grow Your Business"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul / Deskripsi (Bahasa Indonesia)</label>
                <textarea
                  rows={3}
                  value={settings['hero_subtitle_id'] || ''}
                  onChange={e => handleChange('hero_subtitle_id', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Indiekraf hadir membantu pertumbuhan ekonomi & industri kreatif..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul / Deskripsi (English)</label>
                <textarea
                  rows={3}
                  value={settings['hero_subtitle_en'] || ''}
                  onChange={e => handleChange('hero_subtitle_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Indiekraf is here to boost economic growth..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-2">
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tombol 1 (ID)</label>
                <input
                  type="text"
                  value={settings['hero_cta_primary_id'] || ''}
                  onChange={e => handleChange('hero_cta_primary_id', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Pelajari Layanan"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tombol 1 (EN)</label>
                <input
                  type="text"
                  value={settings['hero_cta_primary_en'] || ''}
                  onChange={e => handleChange('hero_cta_primary_en', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Explore Services"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Link Tombol 1</label>
                <input
                  type="text"
                  value={settings['hero_cta_primary_link'] || ''}
                  onChange={e => handleChange('hero_cta_primary_link', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="services"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tombol 2 (ID)</label>
                <input
                  type="text"
                  value={settings['hero_cta_secondary_id'] || ''}
                  onChange={e => handleChange('hero_cta_secondary_id', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Tentang Kami"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tombol 2 (EN)</label>
                <input
                  type="text"
                  value={settings['hero_cta_secondary_en'] || ''}
                  onChange={e => handleChange('hero_cta_secondary_en', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="About Us"
                />
              </div>
              <div className="lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Link Tombol 2</label>
                <input
                  type="text"
                  value={settings['hero_cta_secondary_link'] || ''}
                  onChange={e => handleChange('hero_cta_secondary_link', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="about"
                />
              </div>
            </div>

            {/* CRUD Icon Roket & Laptop di Hero Beranda */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-sm font-black text-[#0A2472] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Icon Melayang di Hero (Roket & Laptop)
              </h3>
              <p className="text-xs text-slate-500 -mt-1">
                Anda dapat mengganti icon roket di sebelah kiri dan icon laptop di sebelah kanan Hero Beranda dengan upload gambar baru atau memasukkan URL gambar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Icon Kiri (Roket) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-extrabold text-[#0A2472] uppercase tracking-wider">Icon Kiri (Roket)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={heroLeftInputRef}
                        onChange={handleUploadHeroLeft}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroLeftInputRef.current?.click()}
                        disabled={isUploadingHeroLeft}
                        className="px-3 py-1.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isUploadingHeroLeft ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin text-white" />
                            <span>Upload...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3 h-3 text-white" />
                            <span>Upload Gambar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      <img
                        src={settings['hero_icon_left'] || settings['hero.icon_left'] || '/icon-kiri.png'}
                        alt="Icon Kiri"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={settings['hero_icon_left'] || settings['hero.icon_left'] || '/icon-kiri.png'}
                        onChange={e => {
                          handleChange('hero_icon_left', e.target.value);
                          handleChange('hero.icon_left', e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        placeholder="/icon-kiri.png"
                      />
                    </div>
                  </div>
                </div>

                {/* Icon Kanan (Laptop) */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-extrabold text-[#0A2472] uppercase tracking-wider">Icon Kanan (Laptop)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={heroRightInputRef}
                        onChange={handleUploadHeroRight}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => heroRightInputRef.current?.click()}
                        disabled={isUploadingHeroRight}
                        className="px-3 py-1.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isUploadingHeroRight ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin text-white" />
                            <span>Upload...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3 h-3 text-white" />
                            <span>Upload Gambar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      <img
                        src={settings['hero_icon_right'] || settings['hero.icon_right'] || '/icon-kanan.png'}
                        alt="Icon Kanan"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={settings['hero_icon_right'] || settings['hero.icon_right'] || '/icon-kanan.png'}
                        onChange={e => {
                          handleChange('hero_icon_right', e.target.value);
                          handleChange('hero.icon_right', e.target.value);
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        placeholder="/icon-kanan.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CRUD Marquee / Featured Pillars di bawah tombol 1 dan 2 */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-[#0A2472] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Kartu Pilar / Marquee Layanan Hero Beranda
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kartu animasi (01 - 04) yang berjalan otomatis di bagian bawah Hero Beranda.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetPillarsDefault}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Standar
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddPillarModal}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Kartu
                  </button>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-3.5 w-14">No</th>
                        <th className="py-3 px-3.5">Target Link (#ID / URL)</th>
                        <th className="py-3 px-3.5">Judul Pilar</th>
                        <th className="py-3 px-3.5">Kategori / Subjudul</th>
                        <th className="py-3 px-3.5 w-16">Foto</th>
                        <th className="py-3 px-3.5 text-right w-36">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                      {pillars.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-black text-indigo-600">
                            {item.number || `0${index + 1}`.slice(-2)}
                          </td>
                          <td className="py-3 px-3.5 font-mono font-bold text-indigo-600">
                            {item.link || '#'}
                          </td>
                          <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                            {item.title}
                          </td>
                          <td className="py-3 px-3.5 text-slate-500">
                            {item.category}
                          </td>
                          <td className="py-3 px-3.5">
                            <div className="w-10 h-7 rounded-md overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              <img
                                src={item.image || '/gambar.jpg'}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={e => {
                                  (e.target as HTMLImageElement).src = '/gambar.jpg';
                                }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleMovePillarItem(index, 'up')}
                                disabled={index === 0}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Naik"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMovePillarItem(index, 'down')}
                                disabled={index === pillars.length - 1}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Turun"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenEditPillarModal(index)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePillarItem(index)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {pillars.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            Belum ada kartu pilar layanan. Klik <b>"+ Tambah Kartu"</b> atau <b>"Reset Standar"</b>.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
              {isSaving ? 'Menyimpan...' : 'Simpan Hero Beranda'}
            </button>
          </div>
        </form>
      )}

      {/* Section 2: Sekilas Tentang Kami */}
      {activeTab === 'about_preview' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-8">
            <div>
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Info className="w-5 h-5 text-blue-600" />
                <h2>2. Sekilas Tentang Kami (Section Kedua di Beranda)</h2>
              </div>
            </div>

            {/* Dua Kolom Bahasa Indonesia & Bahasa Inggris */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom Kiri: Bahasa Indonesia */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-sm font-black text-[#0A2472] flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-black">ID</span>
                    Kolom Bahasa Indonesia
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Bagian Tentang (ID)
                  </label>
                  <input
                    type="text"
                    value={settings['about_title_id'] || settings['about.title'] || 'Mendorong Ekosistem Kreatif Indonesia ke Tingkat Dunia'}
                    onChange={e => {
                      handleChange('about_title_id', e.target.value);
                      handleChange('about.title', e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    placeholder="Mendorong Ekosistem Kreatif Indonesia ke Tingkat Dunia"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Paragraf / Deskripsi Lengkap (ID - Paragraf 1 s/d 3 Jadi Satu)
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2 font-medium">
                    💡 Tips: Gunakan <b>2 kali Enter</b> untuk membuat paragraf baru yang rapi.
                  </p>
                  <textarea
                    rows={10}
                    value={settings['about_description_id'] || settings['about.content1'] || ''}
                    onChange={e => {
                      handleChange('about_description_id', e.target.value);
                      handleChange('about.content1', e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white leading-relaxed font-medium text-slate-700"
                    placeholder={`Berdiri sejak tahun 2018, Indiekraf Indonesia merupakan portal media yang menitikberatkan pada ekonomi dan industri kreatif di Indonesia...\n\nTujuan kami adalah menjadi kontributor utama dalam mewujudkan Industri Kreatif sebagai pilar utama dalam ekonomi Indonesia pada tahun 2025...\n\nSelain media saat ini kami juga menawarkan berbagai layanan seperti jasa pengembangan produk, aktivasi program, riset hingga sertifikasi.`}
                  />
                </div>
              </div>

              {/* Kolom Kanan: English */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-sm font-black text-[#0A2472] flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-black">EN</span>
                    Kolom Bahasa Inggris (English)
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Judul Bagian Tentang (EN)
                  </label>
                  <input
                    type="text"
                    value={settings['about_title_en'] || 'Empowering Indonesia\'s Creative Ecosystem to the World Stage'}
                    onChange={e => handleChange('about_title_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                    placeholder="Empowering Indonesia's Creative Ecosystem to the World Stage"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Paragraf / Deskripsi Lengkap (EN - Paragraf 1 s/d 3 Jadi Satu)
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2 font-medium">
                    💡 Tip: Use <b>double Enter</b> to separate clean paragraphs.
                  </p>
                  <textarea
                    rows={10}
                    value={settings['about_description_en'] || ''}
                    onChange={e => handleChange('about_description_en', e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white leading-relaxed font-medium text-slate-700"
                    placeholder={`Established in 2018, Indiekraf Indonesia is a media portal focusing on Indonesia's creative economy and industry...\n\nOur goal is to be a major contributor in realizing the Creative Industry as a main pillar in the Indonesian economy by 2025...\n\nBesides media, we currently also offer various services such as product development, program activation, research, to certification.`}
                  />
                </div>
              </div>
            </div>

            {/* ─── CRUD FOTO SLIDER (BAGIAN KANAN TENTANG KAMI) ─── */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-[#0A2472] flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    CRUD Foto / Gambar Slider Tentang Kami
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Daftar foto/gambar yang berputar otomatis (animasi fade) di kotak kanan section Sekilas Tentang Kami.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={aboutPhotoInputRef}
                    onChange={handleUploadAboutPhoto}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => aboutPhotoInputRef.current?.click()}
                    disabled={isUploadingAboutPhoto}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all disabled:opacity-50"
                  >
                    {isUploadingAboutPhoto ? (
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

              <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-3.5 w-14">No</th>
                        <th className="py-3 px-3.5">Target Link / URL Gambar</th>
                        <th className="py-3 px-3.5 w-24">Preview Foto</th>
                        <th className="py-3 px-3.5 text-right w-36">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                      {aboutPhotos.map((url, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-black text-indigo-600">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-xs font-bold text-indigo-600 break-all">
                            {url}
                          </td>
                          <td className="py-3 px-3.5">
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              <img
                                src={url || '/gambar.jpg'}
                                alt={`About ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={e => {
                                  (e.target as HTMLImageElement).src = '/gambar.jpg';
                                }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleMoveAboutPhoto(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Naik"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveAboutPhoto(idx, 'down')}
                                disabled={idx === aboutPhotos.length - 1}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Turun"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAboutPhoto(idx)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus Foto"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {aboutPhotos.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400">
                            Belum ada foto slider. Klik <b>"Pilih Foto dari Folder PC"</b> untuk menambah foto.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ─── CRUD 4 BUTTON / KEUNGGULAN (DI BAWAH PARAGRAF) ─── */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-[#0A2472] flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    CRUD 4 Button Keunggulan (Di Bawah Teks Paragraf)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tombol indikator keunggulan (seperti Solusi Terintegrasi, Branding & Identity) yang tampil di bawah paragraf.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Kembalikan 4 button ke standar bawaan?')) setAboutPills(defaultAboutPills);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Standar
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddAboutPillModal}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Button
                  </button>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-3.5 w-14">No</th>
                        <th className="py-3 px-3.5 w-24">Ikon</th>
                        <th className="py-3 px-3.5">Label Bahasa Indonesia</th>
                        <th className="py-3 px-3.5">Label English</th>
                        <th className="py-3 px-3.5 text-right w-36">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                      {aboutPills.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-black text-indigo-600">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3.5 font-semibold text-slate-600">
                            <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-bold">
                              {item.iconName || 'Target'}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                            {item.labelId}
                          </td>
                          <td className="py-3 px-3.5 text-slate-600">
                            {item.labelEn}
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleMoveAboutPillItem(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Naik"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveAboutPillItem(idx, 'down')}
                                disabled={idx === aboutPills.length - 1}
                                className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                title="Turun"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenEditAboutPillModal(idx)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Button"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAboutPillItem(idx)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Hapus Button"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {aboutPills.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400">
                            Belum ada button. Klik <b>"+ Tambah Button"</b> atau <b>"Reset Standar"</b>.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
              {isSaving ? 'Menyimpan...' : 'Simpan Sekilas Tentang'}
            </button>
          </div>
        </form>
      )}

      {/* Section 3: Statistik Pencapaian */}
      {activeTab === 'stats' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          {/* Header Section (Judul & Subjudul) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              <h2>3. Statistik Pencapaian & Jangkauan (Section Ketiga di Beranda)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (Bahasa Indonesia)</label>
                <textarea
                  rows={2}
                  value={settings['stats.title_id'] ?? settings['stats.title'] ?? 'Ratusan Bisnis & Institusi Sudah Tumbuh Bersama Kami.'}
                  onChange={e => {
                    handleChange('stats.title_id', e.target.value);
                    handleChange('stats.title', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Ratusan Bisnis & Institusi Sudah Tumbuh Bersama Kami."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama (English)</label>
                <textarea
                  rows={2}
                  value={settings['stats.title_en'] ?? 'Hundreds of Businesses & Institutions Have Grown With Us.'}
                  onChange={e => handleChange('stats.title_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Hundreds of Businesses & Institutions Have Grown With Us."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul / Tagline Badge (Bahasa Indonesia)</label>
                <input
                  type="text"
                  value={settings['stats.badge_id'] ?? settings['stats.badge'] ?? 'DATA JANGKAUAN DAN KREDIBILITAS KAMI'}
                  onChange={e => {
                    handleChange('stats.badge_id', e.target.value);
                    handleChange('stats.badge', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-extrabold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="DATA JANGKAUAN DAN KREDIBILITAS KAMI"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subjudul / Tagline Badge (English)</label>
                <input
                  type="text"
                  value={settings['stats.badge_en'] ?? 'OUR REACH AND CREDIBILITY DATA'}
                  onChange={e => handleChange('stats.badge_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-extrabold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="OUR REACH AND CREDIBILITY DATA"
                />
              </div>
            </div>
          </div>

          {/* Kartu Statistik (Table + Popup Modal) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-[#0A2472]">Kelola Kartu Statistik (Angka & Tulisan Label)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Daftar kartu statistik di Beranda. Klik tombol aksi untuk mengubah, mengurutkan, menambah, atau menghapus kartu.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetStats}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Kembalikan ke standar"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Bawaan
                </button>
                <button
                  type="button"
                  onClick={handleOpenAddStatModal}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Kartu
                </button>
              </div>
            </div>

            <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                      <th className="py-3 px-3.5 w-14">No</th>
                      <th className="py-3 px-3.5">Nama Ikon</th>
                      <th className="py-3 px-3.5 w-32">Angka / Nilai</th>
                      <th className="py-3 px-3.5">Label (Bahasa Indonesia)</th>
                      <th className="py-3 px-3.5">Label (English)</th>
                      <th className="py-3 px-3.5 text-right w-44">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                    {statsList.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3.5 font-black text-indigo-600">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3.5 font-mono font-bold text-indigo-600">
                          {item.iconName}
                        </td>
                        <td className="py-3 px-3.5 font-black text-[#0A2472] text-sm">
                          {item.value}
                        </td>
                        <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                          {item.labelId}
                        </td>
                        <td className="py-3 px-3.5 text-slate-600">
                          {item.labelEn}
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleMoveStatItem(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                              title="Pindahkan Ke Atas"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveStatItem(idx, 'down')}
                              disabled={idx === statsList.length - 1}
                              className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                              title="Pindahkan Ke Bawah"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditStatModal(idx)}
                              className="px-2 py-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                              title="Edit Kartu"
                            >
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteStatItem(idx)}
                              className="px-2 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                              title="Hapus Kartu"
                            >
                              <Trash2 className="w-3 h-3" /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {statsList.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                          Tidak ada kartu statistik. Klik "Tambah Kartu" untuk menambahkan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Description Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-[#0A2472]">Tulisan Keterangan Bawah (Footer Description)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Teks kalimat keterangan yang muncul di bagian paling bawah section statistik pencapaian.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tulisan Keterangan Bawah (Bahasa Indonesia)</label>
                <textarea
                  rows={3}
                  value={settings['stats.bottom_id'] ?? settings['stats.bottom'] ?? 'Dari startup lokal hingga kampus ternama — kami hadir sebagai mitra kreatif yang bisa diandalkan untuk tumbuh.'}
                  onChange={e => {
                    handleChange('stats.bottom_id', e.target.value);
                    handleChange('stats.bottom', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                  placeholder="Dari startup lokal hingga kampus ternama — kami hadir sebagai mitra kreatif yang bisa diandalkan untuk tumbuh."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tulisan Keterangan Bawah (English)</label>
                <textarea
                  rows={3}
                  value={settings['stats.bottom_en'] ?? 'From local startups to top universities — we are your reliable creative partner for growth.'}
                  onChange={e => handleChange('stats.bottom_en', e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                  placeholder="From local startups to top universities — we are your reliable creative partner for growth."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Menyimpan...' : 'Simpan Statistik Pencapaian'}
            </button>
          </div>
        </form>
      )}

      {/* Section 4: Section Layanan Header */}
      {activeTab === 'services_header' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
                <Layers className="w-5 h-5 text-purple-600" />
                <h2>4. Pengaturan Header Layanan (Section Keempat di Beranda)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Bahasa Indonesia */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">Bahasa Indonesia</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Seksi Layanan</label>
                    <input
                      type="text"
                      value={settings['services.title_id'] ?? settings['services.title'] ?? 'Layanan & Ekosistem Kami'}
                      onChange={e => {
                        handleChange('services.title_id', e.target.value);
                        handleChange('services.title', e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Layanan & Ekosistem Kami"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sub-judul / Deskripsi Seksi</label>
                    <textarea
                      rows={4}
                      value={settings['services.subtitle_id'] ?? settings['services.subtitle'] ?? 'Kami menghadirkan empat pilar utama untuk mendukung perjalanan transformasi digital bisnis Anda.'}
                      onChange={e => {
                        handleChange('services.subtitle_id', e.target.value);
                        handleChange('services.subtitle', e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                      placeholder="Kami menghadirkan empat pilar utama..."
                    />
                  </div>
                </div>

                {/* Kolom English */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">English</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Services Section Title</label>
                    <input
                      type="text"
                      value={settings['services.title_en'] ?? 'Our Services & Ecosystem'}
                      onChange={e => handleChange('services.title_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Our Services & Ecosystem"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Section Sub-title / Description</label>
                    <textarea
                      rows={4}
                      value={settings['services.subtitle_en'] ?? 'We present four main pillars to support your business digital transformation journey.'}
                      onChange={e => handleChange('services.subtitle_en', e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                      placeholder="We present four main pillars..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Menyimpan...' : 'Simpan Header Layanan'}
              </button>
            </div>
          </form>

          {/* Section 4a: Pengaturan Gambar & Detail Pilar Layanan (Beranda) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-8 mt-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2.5 text-[#0A2472] font-black text-xl">
                  <div className="p-2 bg-indigo-50 text-[#0A2472] rounded-xl">
                    <Layers className="w-5.5 h-5.5" />
                  </div>
                  <h2>4a. Kelola Konten & Tampilan Pilar Layanan (Beranda)</h2>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1">Konfigurasi visual dan teks untuk setiap pilar layanan utama yang tampil di beranda.</p>
              </div>
            </div>

            {(() => {
              let pillarsList = [];
              if (settings['services_pillars_list']) {
                try {
                  pillarsList = JSON.parse(settings['services_pillars_list']);
                } catch (e) {}
              }
              if (!Array.isArray(pillarsList) || pillarsList.length === 0) {
                return (
                  <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">Belum ada pilar layanan yang dikonfigurasi. Silakan tambahkan pilar layanan terlebih dahulu.</p>
                  </div>
                );
              }

              // Ensure active index is within bounds
              const currentIdx = activePillarEditIdx >= pillarsList.length ? 0 : activePillarEditIdx;
              const pillar = pillarsList[currentIdx] || {};

              // Icon mapping
              const getIconComponent = (iconName: string) => {
                switch(iconName) {
                  case 'Newspaper': return <Newspaper className="w-4 h-4" />;
                  case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
                  case 'BarChart2': return <BarChart2 className="w-4 h-4" />;
                  default: return <Layers className="w-4 h-4" />;
                }
              };

              return (
                <div className="space-y-6">
                  {/* Premium Navigation Tabs */}
                  <div className="flex flex-wrap gap-2.5 bg-slate-50 p-2 rounded-2xl border border-slate-200/50">
                    {pillarsList.map((p: any, idx: number) => {
                      const isActive = currentIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePillarEditIdx(idx)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-[#0A2472] text-white shadow-lg shadow-blue-900/15 scale-[1.02]'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                          }`}
                        >
                          <div className={`p-1 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {getIconComponent(p.icon || 'Layers')}
                          </div>
                          <span>{p.number || `0${idx + 1}`}. {p.title || 'Pilar'}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Pillar Editor Card */}
                  <div className="border border-slate-200/80 rounded-3xl bg-white shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-[#0A2472]/30">{pillar.number || `0${currentIdx + 1}`}</span>
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-base font-extrabold text-[#0A2472]">Mengedit Konten: {pillar.title || 'Tanpa Judul'}</span>
                      </div>
                      <span className="px-3 py-1 bg-indigo-50 text-[#0A2472] text-[10px] font-bold rounded-full border border-indigo-100">Aktif</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      
                      {/* Left Column: Visual and Image */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#0A2472] font-extrabold text-sm border-b border-slate-100 pb-2">
                          <Upload className="w-4 h-4 text-indigo-500" />
                          <h4>1. Gambar & Tag Visual (Kiri)</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gambar Visual Utama</label>
                          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[170px] relative overflow-hidden group bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all duration-300">
                            {pillar.image_url ? (
                              <>
                                <img src={pillar.image_url} alt={pillar.title} className="absolute inset-0 w-full h-full object-cover p-1.5 rounded-2xl" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <label className="cursor-pointer px-3.5 py-2 bg-white text-slate-800 hover:bg-slate-50 font-bold text-[10px] rounded-xl shadow-lg transition-all active:scale-95">
                                    Ganti Gambar
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => handleUploadServicePillarImg(e, currentIdx)}
                                      disabled={uploadingServicePillarIdx === currentIdx}
                                      className="hidden" 
                                    />
                                  </label>
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const rawPillars = [...pillarsList];
                                      rawPillars[currentIdx].image_url = '';
                                      handleChange('services_pillars_list', JSON.stringify(rawPillars));
                                    }} 
                                    className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-xl shadow-lg transition-all active:scale-95"
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="text-center space-y-2">
                                <Upload className="w-7 h-7 text-slate-400 mx-auto" />
                                <span className="text-[11px] text-slate-400 font-medium block">Belum ada gambar</span>
                                <label className="inline-block cursor-pointer px-3 py-1.5 bg-[#0A2472] hover:bg-blue-900 text-white font-bold text-[10px] rounded-lg transition-all">
                                  Upload Gambar
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleUploadServicePillarImg(e, currentIdx)}
                                    disabled={uploadingServicePillarIdx === currentIdx}
                                    className="hidden" 
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <Tag className="w-3 h-3 text-slate-400" />
                              <span>Label Tag Gambar (ID)</span>
                            </label>
                            <input
                              type="text"
                              value={pillar.img_tag_id || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].img_tag_id = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              placeholder="Contoh: PUBLISHING UNTUK KREDIBILITAS BRAND"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <Tag className="w-3 h-3 text-slate-400" />
                              <span>Label Tag Gambar (EN)</span>
                            </label>
                            <input
                              type="text"
                              value={pillar.img_tag_en || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].img_tag_en = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              placeholder="Contoh: PUBLISHING FOR BRAND CREDIBILITY"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <Info className="w-3 h-3 text-slate-400" />
                              <span>Caption Overlay Gambar (ID)</span>
                            </label>
                            <textarea
                              rows={2}
                              value={pillar.img_desc_id || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].img_desc_id = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                              placeholder="Deskripsi singkat di bagian bawah gambar..."
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                              <Info className="w-3 h-3 text-slate-400" />
                              <span>Caption Overlay Gambar (EN)</span>
                            </label>
                            <textarea
                              rows={2}
                              value={pillar.img_desc_en || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].img_desc_en = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                              placeholder="Short description overlay..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Middle Column: Text Details and Target Link */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-[#0A2472] font-extrabold text-sm border-b border-slate-100 pb-2">
                          <Edit2 className="w-4 h-4 text-indigo-500" />
                          <h4>2. Konten Teks & Deskripsi (Kanan)</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Urut</label>
                            <input
                              type="text"
                              value={pillar.number || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].number = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                              placeholder="01"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ikon</label>
                            <select
                              value={pillar.icon || 'Layers'}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].icon = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                            >
                              <option value="Layers">Layers (Studio)</option>
                              <option value="Newspaper">Newspaper (Media)</option>
                              <option value="GraduationCap">GraduationCap (Academy)</option>
                              <option value="BarChart2">BarChart2 (Insight)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul Pilar</label>
                          <input
                            type="text"
                            value={pillar.title || ''}
                            onChange={e => {
                              const rawPillars = [...pillarsList];
                              rawPillars[currentIdx].title = e.target.value;
                              handleChange('services_pillars_list', JSON.stringify(rawPillars));
                            }}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="Indiekraf Media"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Link Target Button</label>
                          <input
                            type="text"
                            value={pillar.link || ''}
                            onChange={e => {
                              const rawPillars = [...pillarsList];
                              rawPillars[currentIdx].link = e.target.value;
                              handleChange('services_pillars_list', JSON.stringify(rawPillars));
                            }}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder="media / studio / academy / insight"
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Pilar (ID)</label>
                            <textarea
                              rows={3.5}
                              value={pillar.description_id || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].description_id = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                              placeholder="Deskripsi pilar utama..."
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Pilar (EN)</label>
                            <textarea
                              rows={3.5}
                              value={pillar.description_en || ''}
                              onChange={e => {
                                const rawPillars = [...pillarsList];
                                rawPillars[currentIdx].description_en = e.target.value;
                                handleChange('services_pillars_list', JSON.stringify(rawPillars));
                              }}
                              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 leading-relaxed"
                              placeholder="Pillar description in English..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Checkbox Sub-Layanan */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2 text-[#0A2472] font-extrabold text-sm">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                            <h4>3. Bullet Items / Sub-Layanan</h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const rawPillars = [...pillarsList];
                              const cards = rawPillars[currentIdx].cards || [];
                              rawPillars[currentIdx].cards = [...cards, { title: 'Layanan Baru', title_en: 'New Service' }];
                              handleChange('services_pillars_list', JSON.stringify(rawPillars));
                            }}
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#0A2472] font-bold text-[10px] rounded-lg transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Item</span>
                          </button>
                        </div>

                        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                          {Array.isArray(pillar.cards) && pillar.cards.length > 0 ? (
                            pillar.cards.map((card: any, cardIdx: number) => (
                              <div key={cardIdx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 relative group transition-all hover:bg-white hover:shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const rawPillars = [...pillarsList];
                                    rawPillars[currentIdx].cards = rawPillars[currentIdx].cards.filter((_: any, ci: number) => ci !== cardIdx);
                                    handleChange('services_pillars_list', JSON.stringify(rawPillars));
                                  }}
                                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors p-1"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                                
                                <div className="space-y-2.5 pr-4">
                                  <div>
                                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Item Title (ID)</label>
                                    <input
                                      type="text"
                                      value={card.title || ''}
                                      onChange={e => {
                                        const rawPillars = [...pillarsList];
                                        rawPillars[currentIdx].cards[cardIdx].title = e.target.value;
                                        handleChange('services_pillars_list', JSON.stringify(rawPillars));
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                                      placeholder="Contoh: Advertisement"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Item Title (EN)</label>
                                    <input
                                      type="text"
                                      value={card.title_en || ''}
                                      onChange={e => {
                                        const rawPillars = [...pillarsList];
                                        rawPillars[currentIdx].cards[cardIdx].title_en = e.target.value;
                                        handleChange('services_pillars_list', JSON.stringify(rawPillars));
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                                      placeholder="Contoh: Advertisement"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center border border-dashed border-slate-200 rounded-xl">
                              <p className="text-xs text-slate-400 italic font-medium">Belum ada bullet item. Klik "+ Tambah Item" untuk memulai.</p>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSave()}
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Menyimpan...' : 'Simpan Seluruh Perubahan Pilar Layanan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 5: CRUD Daftar Harga di Beranda */}
      {activeTab === 'pricing_crud' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Tag className="w-5 h-5 text-emerald-600" />
              <h2>5. CRUD Daftar Harga di Beranda (Section Kelima di Beranda)</h2>
            </div>
            <PricingManager />
          </div>
        </div>
      )}

      {/* Section 6: Mengapa Memilih Kami (Why Choose Us) */}
      {activeTab === 'why_us' && (
        <form onSubmit={handleSave} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#0A2472] font-black text-lg border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-rose-600" />
              <h2>6. Teks & Poin Keunggulan "Mengapa Memilih Kami" (Section Keenam di Beranda)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom ID */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-sm font-black text-[#0A2472] flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-black">ID</span>
                    Kolom Bahasa Indonesia
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama Why Us (ID)</label>
                  <input
                    type="text"
                    value={settings['why.title_id'] || settings['why.title'] || 'Partner Kreatif Tepercaya untuk Pertumbuhan Berkelanjutan'}
                    onChange={e => {
                      handleChange('why.title_id', e.target.value);
                      handleChange('why.title', e.target.value);
                    }}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Singkat Why Us (ID)</label>
                  <textarea
                    rows={2}
                    value={settings['why.subtitle_id'] || settings['why.subtitle'] || 'Partner kolaboratif yang memahami kebutuhan bisnis dan menghasilkan solusi digital yang terukur'}
                    onChange={e => {
                      handleChange('why.subtitle_id', e.target.value);
                      handleChange('why.subtitle', e.target.value);
                    }}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                </div>
              </div>

              {/* Kolom EN */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-sm font-black text-[#0A2472] flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-black">EN</span>
                    Kolom Bahasa Inggris (English)
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Judul Utama Why Us (EN)</label>
                  <input
                    type="text"
                    value={settings['why.title_en'] || 'Trusted Creative Partner for Sustainable Growth'}
                    onChange={e => handleChange('why.title_en', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deskripsi Singkat Why Us (EN)</label>
                  <textarea
                    rows={2}
                    value={settings['why.subtitle_en'] || 'Collaborative partner understanding business needs and delivering measurable digital solutions'}
                    onChange={e => handleChange('why.subtitle_en', e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Poin Keunggulan / Fitur Utama (Table + Popup Modal) */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-[#0A2472] uppercase tracking-wider">Poin Keunggulan / Fitur Utama (ID & EN)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Klik <b className="text-blue-600">Edit</b> untuk mengubah teks judul dan deskripsi poin keunggulan dalam dua bahasa melalui pop-up modal.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-3.5 w-14">No</th>
                        <th className="py-3 px-3.5">Judul Poin (Indonesia)</th>
                        <th className="py-3 px-3.5">Judul Poin (English)</th>
                        <th className="py-3 px-3.5">Deskripsi Singkat</th>
                        <th className="py-3 px-3.5 text-right w-24">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-xs font-medium text-slate-700 bg-white">
                      {[
                        {
                          key: 'integrated' as const,
                          code: '#integrated',
                          titleId: settings['why.feat.integrated.title_id'] || settings['why.feat.integrated.title'] || 'Solusi Terintegrasi',
                          titleEn: settings['why.feat.integrated.title_en'] || 'Integrated Solutions',
                          descId: settings['why.feat.integrated.desc_id'] || settings['why.feat.integrated.desc'] || 'Dari strategi hingga eksekusi — setiap layanan berada dalam satu ekosistem.',
                        },
                        {
                          key: 'datadriven' as const,
                          code: '#datadriven',
                          titleId: settings['why.feat.datadriven.title_id'] || settings['why.feat.datadriven.title'] || 'Pendekatan Berbasis Data',
                          titleEn: settings['why.feat.datadriven.title_en'] || 'Data-Driven Approach',
                          descId: settings['why.feat.datadriven.desc_id'] || settings['why.feat.datadriven.desc'] || 'Setiap keputusan didukung oleh analisis, memastikan ROI terukur.',
                        },
                        {
                          key: 'team' as const,
                          code: '#team',
                          titleId: settings['why.feat.team.title_id'] || settings['why.feat.team.title'] || 'Tim Profesional',
                          titleEn: settings['why.feat.team.title_en'] || 'Professional Team',
                          descId: settings['why.feat.team.desc_id'] || settings['why.feat.team.desc'] || 'Tim berpengalaman di bidang pemasaran digital, desain, dan pengembangan.',
                        },
                        {
                          key: 'track' as const,
                          code: '#track',
                          titleId: settings['why.feat.track.title_id'] || settings['why.feat.track.title'] || 'Rekam Jejak Terbukti',
                          titleEn: settings['why.feat.track.title_en'] || 'Proven Track Record',
                          descId: settings['why.feat.track.desc_id'] || settings['why.feat.track.desc'] || 'Mulai dari UKM lokal hingga lembaga pemerintah — klien tumbuh bersama kami.',
                        },
                        {
                          key: 'partner' as const,
                          code: '#partner',
                          titleId: settings['why.feat.partner.title_id'] || settings['why.feat.partner.title'] || 'Partner, Bukan Vendor',
                          titleEn: settings['why.feat.partner.title_en'] || 'Partner, Not Vendor',
                          descId: settings['why.feat.partner.desc_id'] || settings['why.feat.partner.desc'] || 'Bukan sekadar vendor. Kami adalah mitra kreatif yang berkomitmen.',
                        },
                        {
                          key: 'pricing' as const,
                          code: '#pricing',
                          titleId: settings['why.feat.pricing.title_id'] || settings['why.feat.pricing.title'] || 'Harga Transparan',
                          titleEn: settings['why.feat.pricing.title_en'] || 'Transparent Pricing',
                          descId: settings['why.feat.pricing.desc_id'] || settings['why.feat.pricing.desc'] || 'Harga transparan, paket fleksibel — dirancang agar sesuai dengan anggaran.',
                        },
                      ].map((item, idx) => (
                        <tr key={item.key} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3.5 font-black text-indigo-600">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-3.5 font-bold text-[#0A2472]">
                            {item.titleId}
                          </td>
                          <td className="py-3 px-3.5 text-slate-600 font-medium">
                            {item.titleEn}
                          </td>
                          <td className="py-3 px-3.5 text-slate-500 line-clamp-2 max-w-xs">
                            {item.descId}
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => handleOpenEditWhyModal(item.key)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                              title="Edit Poin Keunggulan (Popup Modal)"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              {isSaving ? 'Menyimpan...' : 'Simpan Mengapa Memilih Kami'}
            </button>
          </div>
        </form>
      )}

      {/* ─── MODAL ADD/EDIT KARTU PILAR HERO ─── */}
      {isPillarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-[#0A2472] flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                {editingPillarIndex === null ? 'Tambah Kartu Pilar Hero' : 'Edit Kartu Pilar Hero'}
              </h3>
              <button
                type="button"
                onClick={() => setIsPillarModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePillarModalItem} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nomor / Badge
                </label>
                <input
                  type="text"
                  required
                  value={formPillarNumber}
                  onChange={e => setFormPillarNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-black text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="01"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Pilar (misal: Indiekraf Media)
                </label>
                <input
                  type="text"
                  required
                  value={formPillarTitle}
                  onChange={e => setFormPillarTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Indiekraf Media"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kategori / Subjudul (misal: Creative Hub & News)
                </label>
                <input
                  type="text"
                  required
                  value={formPillarCategory}
                  onChange={e => setFormPillarCategory(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Creative Hub & News"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Link Tujuan <span className="text-slate-400 font-normal">(misal: #media / /services)</span>
                </label>
                <input
                  type="text"
                  value={formPillarLink}
                  onChange={e => setFormPillarLink(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="#media"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Foto / Gambar Kartu
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={formPillarImage || '/gambar.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = '/gambar.jpg';
                      }}
                    />
                  </div>
                  <input
                    type="file"
                    ref={pillarFileInputRef}
                    onChange={handleFileUploadPillar}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => pillarFileInputRef.current?.click()}
                    disabled={isUploadingPillar}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {isUploadingPillar ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        <span>Mengupload...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-indigo-600" />
                        <span>Pilih Foto dari Folder</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPillarModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Simpan Kartu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL ADD/EDIT KARTU STATISTIK ─── */}
      {isStatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-[#0A2472] text-base flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-600" />
                {editingStatIndex === null ? 'Tambah Kartu Statistik' : 'Edit Kartu Statistik'}
              </h3>
              <button
                type="button"
                onClick={() => setIsStatModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatModalItem} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Pilih Ikon Statistik
                </label>
                <select
                  value={formStatIcon}
                  onChange={e => setFormStatIcon(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Users">Users (👥 Pengunjung / Pengikut)</option>
                  <option value="TrendingUp">TrendingUp (📈 Tren / Grafik)</option>
                  <option value="Globe">Globe (🌐 Saluran / Global)</option>
                  <option value="Eye">Eye (👁️ Jangkauan / Views)</option>
                  <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                  <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                  <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                  <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                  <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                  <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                  <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                  <option value="Lightbulb">Lightbulb (💡 Ide / Insight)</option>
                  <option value="BarChart2">BarChart2 (📊 Diagram Batang)</option>
                  <option value="Heart">Heart (❤️ Mitra / Kepuasan)</option>
                  <option value="GraduationCap">GraduationCap (🎓 Akademi / Edukasi)</option>
                  <option value="Newspaper">Newspaper (📰 Media / Berita)</option>
                  <option value="Layers">Layers (🥞 Studio / Suites)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Angka Statistik
                </label>
                <input
                  type="text"
                  value={formStatNumber}
                  onChange={e => setFormStatNumber(e.target.value)}
                  placeholder="Misal: 75.000+"
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Label Bahasa Indonesia
                </label>
                <input
                  type="text"
                  value={formStatLabelId}
                  onChange={e => setFormStatLabelId(e.target.value)}
                  placeholder="Misal: Pengunjung Bulanan"
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Label English
                </label>
                <input
                  type="text"
                  value={formStatLabelEn}
                  onChange={e => setFormStatLabelEn(e.target.value)}
                  placeholder="Misal: Monthly Visitors"
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStatModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Simpan Kartu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL CRUD: BUTTON KEUNGGULAN ABOUT (4 BUTTON) ─── */}
      {isAboutPillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-[#0A2472] text-base flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-600" />
                {editingAboutPillIndex === null ? 'Tambah Button Keunggulan' : 'Edit Button Keunggulan'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAboutPillModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAboutPillModalItem} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Pilih Ikon Keunggulan
                </label>
                <select
                  value={formAboutPillIconName}
                  onChange={e => setFormAboutPillIconName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Target">Target (🎯 Sasaran / Solusi)</option>
                  <option value="ShieldCheck">ShieldCheck (🛡️ Keamanan / Branding)</option>
                  <option value="Cpu">Cpu (💻 Teknologi / Data Driven)</option>
                  <option value="Zap">Zap (⚡ Kecepatan / Rekam Jejak)</option>
                  <option value="Award">Award (🏆 Penghargaan / Kualitas)</option>
                  <option value="Presentation">Presentation (📊 Strategi / Bisnis)</option>
                  <option value="Sparkles">Sparkles (✨ Inovasi / Kreativitas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Label Bahasa Indonesia
                </label>
                <input
                  type="text"
                  value={formAboutPillLabelId}
                  onChange={e => setFormAboutPillLabelId(e.target.value)}
                  placeholder="Misal: Solusi Terintegrasi"
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Label English
                </label>
                <input
                  type="text"
                  value={formAboutPillLabelEn}
                  onChange={e => setFormAboutPillLabelEn(e.target.value)}
                  placeholder="Misal: Integrated Solutions"
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAboutPillModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Simpan Button
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL EDIT WHY CHOOSE US ─── */}
      {isWhyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-[#0A2472] text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-600" />
                Edit Poin Keunggulan
              </h3>
              <button
                type="button"
                onClick={() => setIsWhyModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWhyModalItem} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Keunggulan (ID)
                </label>
                <input
                  type="text"
                  required
                  value={formWhyTitleId}
                  onChange={e => setFormWhyTitleId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-rose-100 bg-white"
                  placeholder="Solusi Terintegrasi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Keunggulan (EN)
                </label>
                <input
                  type="text"
                  required
                  value={formWhyTitleEn}
                  onChange={e => setFormWhyTitleEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-rose-100 bg-white"
                  placeholder="Integrated Solutions"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deskripsi Keunggulan (ID)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formWhyDescId}
                  onChange={e => setFormWhyDescId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 leading-relaxed bg-white"
                  placeholder="Deskripsi dalam bahasa Indonesia..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deskripsi Keunggulan (EN)
                </label>
                <textarea
                  rows={3}
                  required
                  value={formWhyDescEn}
                  onChange={e => setFormWhyDescEn(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-100 leading-relaxed bg-white"
                  placeholder="Deskripsi dalam bahasa Inggris..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWhyModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0A2472] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
