import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  HelpCircle,
  GraduationCap,
  Paintbrush,
  Share2,
  Video,
  Search,
  Globe,
  MessageSquare,
  Megaphone,
  Layout
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PricingPageProps {
  onBackToHome: () => void;
  onScrollToContact: () => void;
}

interface PlanItem {
  id: string;
  name: string;
  name_en: string;
  subtitle?: string;
  subtitle_en?: string;
  price: string;
  price_en: string;
  badge: 'STARTER' | 'POPULER' | 'PREMIUM' | 'BEST VALUE';
  bullets: string[];
  bullets_en: string[];
}

interface CategorySection {
  id: string;
  categoryName: string;
  title: string;
  title_en: string;
  subtitle: string;
  subtitle_en: string;
  icon: React.ComponentType<any>;
  plans: PlanItem[];
}

const pricingData: CategorySection[] = [
  {
    id: 'advertising-publishing',
    categoryName: 'Advertising & Publishing',
    title: 'Advertising & Publishing',
    title_en: 'Advertising & Publishing',
    subtitle: 'Iklan di Website - Advertorial Berita - Event Publishing - Promosi Bisnis UMKM',
    subtitle_en: 'Website Ads - News Advertorial - Event Publishing - MSME Business Promotion',
    icon: Megaphone,
    plans: [
      {
        id: 'p-web-ads',
        name: 'Iklan di Website',
        name_en: 'Website Advertising',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 500.000 / Bulan',
        price_en: 'Rp 500K / Month',
        badge: 'STARTER',
        bullets: [],
        bullets_en: []
      },
      {
        id: 'p-advertorial-news',
        name: 'Advertorial Berita',
        name_en: 'News Advertorial',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 300.000 / Post',
        price_en: 'Rp 300K / Post',
        badge: 'STARTER',
        bullets: [],
        bullets_en: []
      },
      {
        id: 'p-event-publishing',
        name: 'Event Publishing',
        name_en: 'Event Publishing',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 700.000 / Event',
        price_en: 'Rp 700K / Event',
        badge: 'STARTER',
        bullets: [],
        bullets_en: []
      },
      {
        id: 'p-umkm-promotion',
        name: 'Promosi Bisnis UMKM',
        name_en: 'MSME Business Promotion',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 150.000 / Post',
        price_en: 'Rp 150K / Post',
        badge: 'STARTER',
        bullets: [],
        bullets_en: []
      }
    ]
  },
  {
    id: 'pelatihan',
    categoryName: 'Pelatihan',
    title: 'Pelatihan Digital Marketing',
    title_en: 'Digital Marketing Training',
    subtitle: 'Workshop - Kelas - Bootcamp Intensif',
    subtitle_en: 'Workshops - Classes - Intensive Bootcamps',
    icon: GraduationCap,
    plans: [
      {
        id: 'p-sm-handling',
        name: 'Social Media Handling',
        name_en: 'Social Media Handling',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000 / Bulan',
        price_en: 'Rp 5M / Month',
        badge: 'STARTER',
        bullets: ['Pengelolaan akun media sosial', 'Jadwal posting terstruktur', 'Laporan performa bulanan'],
        bullets_en: ['Social media account management', 'Structured posting schedule', 'Monthly performance report']
      },
      {
        id: 'p-sm-consulting',
        name: 'Social Media Consulting',
        name_en: 'Social Media Consulting',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 500.000 / Session',
        price_en: 'Rp 500K / Session',
        badge: 'STARTER',
        bullets: ['Analisis strategi media sosial', 'Saran positioning merek', 'Rekomendasi konten'],
        bullets_en: ['Social media strategy analysis', 'Brand positioning advice', 'Content recommendations']
      },
      {
        id: 'p-content-seo',
        name: 'Content Writer & SEO',
        name_en: 'Content Writer & SEO',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 1.500.000 / 5 Konten Artikel',
        price_en: 'Rp 1.5M / 5 Article Contents',
        badge: 'STARTER',
        bullets: ['Penulisan artikel & blog', 'Optimasi SEO Google', '5 konten artikel / paket'],
        bullets_en: ['Article & blog writing', 'Google SEO optimization', '5 article contents / package']
      },
      {
        id: 'p-video-reels',
        name: 'Video Reels / Content',
        name_en: 'Video Reels / Content',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 500.000 / Content',
        price_en: 'Rp 500K / Content',
        badge: 'STARTER',
        bullets: ['Produksi video pendek', 'Editing profesional', 'Siap upload ke media sosial'],
        bullets_en: ['Short video production', 'Professional editing', 'Ready to upload to social media']
      },
      {
        id: 'p-ecommerce-handling',
        name: 'E-Commerce Handling',
        name_en: 'E-Commerce Handling',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000 / Bulan',
        price_en: 'Rp 5M / Month',
        badge: 'STARTER',
        bullets: ['Manajemen akun e-commerce', 'Optimalisasi listing produk', 'Aktivasi & promosi bisnis'],
        bullets_en: ['E-commerce account management', 'Product listing optimization', 'Business activation & promotion']
      },
      {
        id: 'p-live-streaming',
        name: 'Live Streaming & Zoom Meeting',
        name_en: 'Live Streaming & Zoom Meeting',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 500.000 / Session',
        price_en: 'Rp 500K / Session',
        badge: 'STARTER',
        bullets: ['Pengaturan sesi live streaming', 'Manajemen akun Zoom Meeting', 'Dukungan teknis sesi'],
        bullets_en: ['Live streaming session setup', 'Zoom Meeting account management', 'Technical session support']
      }
    ]
  },
  {
    id: 'branding',
    categoryName: 'Branding',
    title: 'Branding & Identitas Visual',
    title_en: 'Branding & Visual Identity',
    subtitle: 'Logo - Visual Identity - Brand Guideline',
    subtitle_en: 'Logos - Visual Identities - Brand Guidelines',
    icon: Paintbrush,
    plans: [
      {
        id: 'b-identity-dev',
        name: 'Brand Identity Development',
        name_en: 'Brand Identity Development',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Pembuatan identitas merek lengkap', 'Panduan brand guideline', 'Logo & visual identity'],
        bullets_en: ['Complete brand identity creation', 'Brand guideline development', 'Logo & visual identity']
      },
      {
        id: 'b-key-visual-sm',
        name: 'Key Visual Social Media',
        name_en: 'Key Visual Social Media',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000 / Bulan',
        price_en: 'Rp 5M / Month',
        badge: 'STARTER',
        bullets: ['Desain ilustrasi media sosial', 'Konten visual pemasaran', 'Format siap pakai'],
        bullets_en: ['Social media illustration design', 'Marketing visual content', 'Ready-to-use formats']
      },
      {
        id: 'b-activation-promo',
        name: 'Brand Activation / Promotion Tools',
        name_en: 'Brand Activation / Promotion Tools',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 6.000.000',
        price_en: 'Rp 6M',
        badge: 'STARTER',
        bullets: ['Desain materi promosi', 'Flyer, banner & poster', 'Peningkatan brand awareness'],
        bullets_en: ['Promotional material design', 'Flyers, banners & posters', 'Brand awareness enhancement']
      },
      {
        id: 'b-iconography',
        name: 'Iconography',
        name_en: 'Iconography',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Desain ikon kustom', 'Set simbol merek', 'Format vektor & PNG'],
        bullets_en: ['Custom icon design', 'Brand symbol set', 'Vector & PNG formats']
      },
      {
        id: 'b-packaging-label',
        name: 'Packaging & Label Design',
        name_en: 'Packaging & Label Design',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Desain kemasan produk', 'Label & tag bisnis', 'Siap cetak & produksi'],
        bullets_en: ['Product packaging design', 'Business labels & tags', 'Print-ready & production-ready']
      },
      {
        id: 'b-book-layout',
        name: 'Book & Layout Design',
        name_en: 'Book & Layout Design',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Desain layout publikasi', 'Buku, modul & katalog', 'Siap cetak profesional'],
        bullets_en: ['Publication layout design', 'Books, modules & catalogues', 'Professional print-ready']
      }
    ]
  },
  {
    id: 'ui-ux',
    categoryName: 'UI UX Design',
    title: 'UI UX Design',
    title_en: 'UI UX Design',
    subtitle: 'Desktop - Mobile - Dashboard - Wireframe - UX Audit - Prototyping',
    subtitle_en: 'Desktop - Mobile - Dashboard - Wireframe - UX Audit - Prototyping',
    icon: Layout,
    plans: [
      {
        id: 'p-desktop-web-native-app',
        name: 'Desktop (Web, Native App)',
        name_en: 'Desktop (Web, Native App)',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Desain UI/UX desktop', 'Pengembangan web & native app', 'Pemeliharaan berkala'],
        bullets_en: ['Desktop UI/UX design', 'Web & native app development', 'Regular maintenance']
      },
      {
        id: 'p-mobile-app-responsive-adaptive',
        name: 'Mobile (App, Responsive, Adaptive)',
        name_en: 'Mobile (App, Responsive, Adaptive)',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 10.000.000',
        price_en: 'Rp 10M',
        badge: 'STARTER',
        bullets: ['Desain UI/UX mobile', 'Pengembangan aplikasi mobile', 'Responsive & adaptive'],
        bullets_en: ['Mobile UI/UX design', 'Mobile app development', 'Responsive & adaptive']
      },
      {
        id: 'p-dashboard-design',
        name: 'Dashboard',
        name_en: 'Dashboard',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Desain UI dasbor', 'Visualisasi data interaktif', 'Pemeliharaan berkala'],
        bullets_en: ['Dashboard UI design', 'Interactive data visualization', 'Regular maintenance']
      },
      {
        id: 'p-flow-wireframe',
        name: 'Flow & Wireframe',
        name_en: 'Flow & Wireframe',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Pemetaan alur kerja (flow)', 'Wireframe & prototipe awal', 'Dokumentasi struktur aplikasi'],
        bullets_en: ['Workflow mapping (flow)', 'Wireframe & initial prototype', 'Application structure documentation']
      },
      {
        id: 'p-ux-audit-usability-testing',
        name: 'UX Audit & Usability Testing',
        name_en: 'UX Audit & Usability Testing',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Audit pengalaman pengguna', 'Pengujian kegunaan (usability)', 'Rekomendasi perbaikan UX'],
        bullets_en: ['User experience audit', 'Usability testing', 'UX improvement recommendations']
      },
      {
        id: 'p-prototyping-interaction',
        name: 'Prototyping Interaction',
        name_en: 'Prototyping Interaction',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'STARTER',
        bullets: ['Prototipe interaktif produk', 'Simulasi alur penggunaan', 'Siap untuk uji pengguna'],
        bullets_en: ['Interactive product prototype', 'User flow simulation', 'Ready for user testing']
      }
    ]
  },
  {
    id: 'social-media',
    categoryName: 'Social Media',
    title: 'Social Media Management',
    title_en: 'Social Media Management',
    subtitle: 'Optimasi Feed - Reels - Konten Harian',
    subtitle_en: 'Feed Optimization - Reels - Daily Content',
    icon: Share2,
    plans: [
      {
        id: 's-star',
        name: 'Social Starter',
        name_en: 'Social Starter',
        subtitle: 'Postingan standar untuk keaktifan media sosial',
        subtitle_en: 'Standard postings for social media activity',
        price: 'Rp 1.200.000',
        price_en: 'Rp 1.2M',
        badge: 'STARTER',
        bullets: ['8 Konten feed/bulan', 'Copywriting basic & riset tag', 'Laporan performa standar'],
        bullets_en: ['8 Feed contents/month', 'Basic copywriting & tag research', 'Standard performance report']
      },
      {
        id: 's-grow',
        name: 'Social Growth',
        name_en: 'Social Growth',
        subtitle: 'Konten dinamis gabungan feed & video reels/TikTok',
        subtitle_en: 'Dynamic content combining feeds & video reels/TikTok',
        price: 'Rp 3.000.000',
        price_en: 'Rp 3M',
        badge: 'POPULER',
        bullets: ['15 Konten (Feed/Reels)', 'Riset hashtag & tren harian', 'Admin balas komentar basic', 'Laporan analisis bulanan'],
        bullets_en: ['15 Contents (Feed/Reels)', 'Daily trend & hashtag research', 'Basic comment replies admin', 'Monthly analysis report']
      },
      {
        id: 's-pro',
        name: 'Social Pro',
        name_en: 'Social Pro',
        subtitle: 'Optimasi penuh untuk konversi & interaksi maksimal',
        subtitle_en: 'Full optimization for maximum conversion & interaction',
        price: 'Rp 5.500.000',
        price_en: 'Rp 5.5M',
        badge: 'PREMIUM',
        bullets: ['24 Konten profesional/bulan', 'Video syuting on-site (opsional)', 'Desain visual eksklusif', 'Sesi evaluasi bulanan'],
        bullets_en: ['24 Professional contents/month', 'On-site video shooting (optional)', 'Exclusive visual design', 'Monthly evaluation session']
      },
      {
        id: 's-camp',
        name: 'Social Campaign',
        name_en: 'Social Campaign',
        subtitle: 'Paket lengkap dengan optimasi iklan bersponsor',
        subtitle_en: 'Complete package with sponsored ad optimization',
        price: 'Rp 7.500.000',
        price_en: 'Rp 7.5M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Social Pro', 'Setup & optimasi iklan FB/IG', 'Konten kolaborasi kustom', 'Dashboard monitoring live'],
        bullets_en: ['All Social Pro features', 'FB/IG Ad setup & optimization', 'Custom collaboration content', 'Live monitoring dashboard']
      }
    ]
  },
  {
    id: 'content',
    categoryName: 'Content',
    title: 'Content Creation',
    title_en: 'Content Creation',
    subtitle: 'Video Reels - TikTok - Copywriting',
    subtitle_en: 'Video Reels - TikTok - Copywriting',
    icon: Video,
    plans: [
      {
        id: 'c-basic',
        name: 'Basic Video',
        name_en: 'Basic Video',
        subtitle: 'Video pendek siap pakai untuk pemula',
        subtitle_en: 'Short videos ready to use for beginners',
        price: 'Rp 1.500.000',
        price_en: 'Rp 1.5M',
        badge: 'STARTER',
        bullets: ['4 Video pendek/bulan', 'Editing sederhana', 'Riset naskah basic'],
        bullets_en: ['4 Short videos/month', 'Simple editing', 'Basic script research']
      },
      {
        id: 'c-viral',
        name: 'Viral Content Pack',
        name_en: 'Viral Content Pack',
        subtitle: 'Dirancang khusus mengikuti tren viral terkini',
        subtitle_en: 'Specifically designed to follow current viral trends',
        price: 'Rp 3.200.000',
        price_en: 'Rp 3.2M',
        badge: 'POPULER',
        bullets: ['10 Video pendek/bulan', 'Riset musik tren & efek', 'Voice over pro / talenta', 'Editing visual cinematic'],
        bullets_en: ['10 Short videos/month', 'Trending music & effects research', 'Professional voice-over/talent', 'Cinematic visual editing']
      },
      {
        id: 'c-factory',
        name: 'Content Factory',
        name_en: 'Content Factory',
        subtitle: 'Volume tinggi untuk brand yang agresif berpromosi',
        subtitle_en: 'High volume for brands aggressively promoting',
        price: 'Rp 6.000.000',
        price_en: 'Rp 6M',
        badge: 'PREMIUM',
        bullets: ['20 Video pendek/bulan', 'Sesi brainstorming khusus', 'Desain thumbnail menarik', 'Optimasi deskripsi & SEO'],
        bullets_en: ['20 Short videos/month', 'Special brainstorming session', 'Attractive thumbnail design', 'SEO & description optimization']
      },
      {
        id: 'c-omni',
        name: 'Omnichannel Pack',
        name_en: 'Omnichannel Pack',
        subtitle: 'Distribusi penuh di semua platform video pendek',
        subtitle_en: 'Full distribution across all short video platforms',
        price: 'Rp 8.000.000',
        price_en: 'Rp 8M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Content Factory', 'Posting otomatis terjadwal', 'Adaptasi format multi-platform', 'Analisis retensi penonton'],
        bullets_en: ['All Content Factory features', 'Scheduled auto posting', 'Multi-platform format adaptation', 'Viewer retention analysis']
      }
    ]
  },
  {
    id: 'seo-sem',
    categoryName: 'SEO & SEM',
    title: 'SEO & SEM Optimization',
    title_en: 'SEO & SEM Optimization',
    subtitle: 'Google Ads - Rank Improvement - Traffic',
    subtitle_en: 'Google Ads - Rank Improvement - Traffic',
    icon: Search,
    plans: [
      {
        id: 'seo-local',
        name: 'Local SEO Setup',
        name_en: 'Local SEO Setup',
        subtitle: 'Optimasi pencarian lokal & Google Maps bisnis',
        subtitle_en: 'Local search optimization & Google My Business',
        price: 'Rp 1.800.000',
        price_en: 'Rp 1.8M',
        badge: 'STARTER',
        bullets: ['Setup Google My Business', 'Optimasi kata kunci lokal', '1 artikel SEO/bulan'],
        bullets_en: ['Google My Business setup', 'Local keyword optimization', '1 SEO article/month']
      },
      {
        id: 'seo-organic',
        name: 'Organic Rank Boost',
        name_en: 'Organic Rank Boost',
        subtitle: 'Meningkatkan peringkat kata kunci utama secara organik',
        subtitle_en: 'Increase primary keyword rankings organically',
        price: 'Rp 4.000.000',
        price_en: 'Rp 4M',
        badge: 'POPULER',
        bullets: ['Audit website menyeluruh', 'Optimasi On-page & Off-page', '5 artikel SEO berkualitas', 'Analisis kompetitor mendalam'],
        bullets_en: ['Comprehensive website audit', 'On-page & Off-page optimization', '5 quality SEO articles', 'In-depth competitor analysis']
      },
      {
        id: 'seo-ads',
        name: 'Search Ads Combo',
        name_en: 'Search Ads Combo',
        subtitle: 'Iklan Google berbayar + optimasi SEO organik',
        subtitle_en: 'Paid Google Ads + organic SEO optimization',
        price: 'Rp 7.500.000',
        price_en: 'Rp 7.5M',
        badge: 'PREMIUM',
        bullets: ['Setup Google Ads Campaign', 'Optimasi anggaran iklan harian', 'Laporan konversi detail', 'Maintenance SEO berkala'],
        bullets_en: ['Google Ads Campaign setup', 'Daily ad budget optimization', 'Detailed conversion reports', 'Regular SEO maintenance']
      },
      {
        id: 'seo-enterprise',
        name: 'Enterprise SEO',
        name_en: 'Enterprise SEO',
        subtitle: 'Strategi komprehensif untuk skala besar dan korporat',
        subtitle_en: 'Comprehensive strategy for large scale and corporate',
        price: 'Rp 12.000.000',
        price_en: 'Rp 12M',
        badge: 'BEST VALUE',
        bullets: ['Optimasi website e-commerce', 'Riset ratusan kata kunci', 'Link building berkualitas', 'Prioritas dukungan 24/7'],
        bullets_en: ['E-commerce website optimization', 'Research hundreds of keywords', 'Quality link building', '24/7 priority support']
      }
    ]
  },
  {
    id: 'website',
    categoryName: 'Website',
    title: 'Website Development',
    title_en: 'Website Development',
    subtitle: 'Desain Responsif - Landing Page - E-commerce',
    subtitle_en: 'Responsive Design - Landing Pages - E-commerce',
    icon: Globe,
    plans: [
      {
        id: 'w-landing',
        name: 'Landing Page',
        name_en: 'Landing Page',
        subtitle: 'Halaman tunggal yang didesain untuk konversi tinggi',
        subtitle_en: 'Single page designed for high conversion',
        price: 'Rp 2.500.000',
        price_en: 'Rp 2.5M',
        badge: 'STARTER',
        bullets: ['Desain custom responsif', 'Integrasi tombol WhatsApp', 'Hosting & domain 1 tahun', 'Optimasi kecepatan muat'],
        bullets_en: ['Custom responsive design', 'WhatsApp button integration', '1 year hosting & domain', 'Page load speed optimization']
      },
      {
        id: 'w-compro',
        name: 'Company Profile',
        name_en: 'Company Profile',
        subtitle: 'Website multi-halaman profesional untuk kredibilitas bisnis',
        subtitle_en: 'Professional multi-page website for business credibility',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'POPULER',
        bullets: ['Hingga 5 halaman dinamis', 'Sistem manajemen konten (CMS)', 'Desain visual premium', 'SEO-ready structure'],
        bullets_en: ['Up to 5 dynamic pages', 'Content Management System (CMS)', 'Premium visual design', 'SEO-ready structure']
      },
      {
        id: 'w-ecom',
        name: 'E-Commerce Suite',
        name_en: 'E-Commerce Suite',
        subtitle: 'Toko online lengkap dengan payment gateway',
        subtitle_en: 'Complete online store with payment gateway integration',
        price: 'Rp 9.500.000',
        price_en: 'Rp 9.5M',
        badge: 'PREMIUM',
        bullets: ['Keranjang belanja & checkout', 'Integrasi Midtrans/Xendit', 'Fitur hitung ongkir otomatis', 'Sistem inventaris produk'],
        bullets_en: ['Shopping cart & checkout', 'Midtrans/Xendit integration', 'Automatic shipping calculation', 'Product inventory system']
      },
      {
        id: 'w-custom',
        name: 'Custom Web App',
        name_en: 'Custom Web App',
        subtitle: 'Aplikasi web kustom sesuai proses bisnis unik Anda',
        subtitle_en: 'Custom web app tailored to your unique business processes',
        price: 'Rp 15.000.000+',
        price_en: 'Rp 15M+',
        badge: 'BEST VALUE',
        bullets: ['Desain UI/UX eksklusif', 'Arsitektur database handal', 'Dashboard admin kustom', 'Keamanan tingkat tinggi'],
        bullets_en: ['Exclusive UI/UX design', 'Robust database architecture', 'Custom admin dashboard', 'High level security']
      }
    ]
  },
  {
    id: 'consulting',
    categoryName: 'Consulting',
    title: 'Digital Strategy Consulting',
    title_en: 'Digital Strategy Consulting',
    subtitle: 'Sesi Privat - Analisis Kompetitor - Action Plan',
    subtitle_en: 'Private Sessions - Competitor Analysis - Action Plans',
    icon: MessageSquare,
    plans: [
      {
        id: 'con-star',
        name: 'Sesi Privat',
        name_en: 'Private Session',
        subtitle: 'Konsultasi satu jam tatap muka online',
        subtitle_en: 'One hour online face-to-face consultation',
        price: 'Rp 800.000',
        price_en: 'Rp 800K',
        badge: 'STARTER',
        bullets: ['Sesi tanya jawab 60 menit', 'Saran instan & perbaikan', 'Rekaman sesi konsultasi'],
        bullets_en: ['60-minute Q&A session', "Instant advice & fixes", 'Consultation session recording']
      },
      {
        id: 'con-grow',
        name: 'Business Growth Pack',
        name_en: 'Business Growth Pack',
        subtitle: 'Pendampingan strategi bisnis selama satu bulan penuh',
        subtitle_en: 'Full-month business strategy mentoring',
        price: 'Rp 3.500.000',
        price_en: 'Rp 3.5M',
        badge: 'POPULER',
        bullets: ['3 sesi pertemuan intensif', 'Analisis kompetitor mendalam', 'Dokumen Action Plan detail', 'Evaluasi hasil di akhir bulan'],
        bullets_en: ['3 intensive sessions', 'In-depth competitor analysis', 'Detailed Action Plan document', 'Month-end result evaluation']
      },
      {
        id: 'con-prem',
        name: 'Executive Advisory',
        name_en: 'Executive Advisory',
        subtitle: 'Konsultan khusus untuk jajaran direksi & manajemen',
        subtitle_en: 'Dedicated consultant for boards & management',
        price: 'Rp 8.000.000',
        price_en: 'Rp 8M',
        badge: 'PREMIUM',
        bullets: ['Pendampingan mingguan', 'Audit operasional pemasaran', 'Riset pasar & peluang baru', 'Dukungan chat WhatsApp VIP'],
        bullets_en: ['Weekly advisory support', 'Marketing operational audit', 'Market & new opportunity research', 'VIP WhatsApp chat support']
      },
      {
        id: 'con-annual',
        name: 'Annual Strategy',
        name_en: 'Annual Strategy',
        subtitle: 'Penyusunan peta jalan pemasaran digital satu tahun',
        subtitle_en: 'One-year digital marketing roadmap setup',
        price: 'Rp 20.000.000',
        price_en: 'Rp 20M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Executive Advisory', 'Rencana anggaran tahunan', 'Membantu proses rekrutmen tim', 'Pelatihan tim internal'],
        bullets_en: ['All Executive Advisory features', 'Annual budget planning', 'Assisting team recruitment', 'Internal team training']
      }
    ]
  }
];

const categories = [
  'Semua',
  'Advertising & Publishing',
  'Pelatihan',
  'Branding',
  'UI UX Design',
  'Social Media',
  'Content',
  'SEO & SEM',
  'Website',
  'Consulting'
];

interface PricingSectionProps {
  key?: string;
  section: CategorySection;
  language: string;
  onScrollToContact: () => void;
}

function PricingSection({ section, language, onScrollToContact }: PricingSectionProps) {
  const IconComponent = section.icon;

  return (
    <div
      key={section.id}
      className="py-6 md:py-8 w-full flex flex-col justify-start relative overflow-visible"
      id={`pricing-section-${section.id}`}
    >
      <div className="w-full relative z-10">
        {/* Section Header: Extremely sleek, modern left-aligned heading with no heavy border lines */}
        <div 
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-3 gap-4" 
          id={`pricing-header-${section.id}`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-[10px] bg-white border border-[#0A2472]/10 flex items-center justify-center text-[#0A2472] shrink-0 shadow-3xs hover:rotate-6 transition-transform duration-300">
              <IconComponent className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#2563EB] block mb-0.5">
                {language === 'id' ? section.subtitle : section.subtitle_en}
              </span>
              <h2 className="text-xl sm:text-2xl font-sans font-extrabold text-[#0A2472] tracking-tight">
                {language === 'id' ? section.title : section.title_en}
              </h2>
            </div>
          </div>
        </div>

        {/* 4-Column Card Grid with beautiful spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-4">
          {section.plans.map((plan, planIdx) => {
            const isBestValue = plan.badge === 'BEST VALUE';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.45, delay: planIdx * 0.05, ease: "easeOut" }}
                whileHover={isBestValue 
                  ? { y: -5, scale: 1.015, boxShadow: '0 20px 25px -5px rgba(10, 36, 114, 0.2)' }
                  : { y: -4, scale: 1.015, boxShadow: '0 12px 20px -8px rgba(10, 36, 114, 0.12)' }
                }
                className={isBestValue 
                  ? "bg-gradient-to-b from-[#0A2472] to-[#0d297d] text-white rounded-[10px] p-5 flex flex-col justify-between transition-all duration-300 shadow-xl relative z-10 border-2 border-[#2563EB] h-full hover:z-20" 
                  : "bg-white text-[#0A2472] rounded-[10px] p-5 flex flex-col justify-between transition-all duration-300 shadow-sm border-2 border-[#0A2472] relative h-full hover:shadow-lg hover:z-20"
                }
                id={`pricing-card-${plan.id}`}
              >
                {/* Visual Accent/Glow inside Best Value card */}
                {isBestValue && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
                )}

                {/* Price Display */}
                <div className="text-center mt-2.5 mb-1">
                  <span className={`text-[8px] uppercase font-bold tracking-wider block ${isBestValue ? 'text-white/60' : 'text-slate-400'}`}>
                    {language === 'id' ? 'MULAI DARI' : 'STARTING FROM'}
                  </span>
                  <div className="flex items-baseline justify-center mt-0.5 gap-1 flex-wrap">
                    {(() => {
                      const rawPrice = language === 'id' ? plan.price : plan.price_en;
                      const slashIdx = rawPrice.indexOf('/');
                      if (slashIdx === -1) {
                        return (
                          <span className={`text-2xl sm:text-3xl font-sans font-black tracking-tight ${isBestValue ? 'text-white' : 'text-[#0A2472]'}`}>
                            {rawPrice}
                          </span>
                        );
                      }
                      const amount = rawPrice.slice(0, slashIdx).trim();
                      const unit = rawPrice.slice(slashIdx).trim(); // e.g. "/ Post"
                      return (
                        <>
                          <span className={`text-2xl sm:text-3xl font-sans font-black tracking-tight ${isBestValue ? 'text-white' : 'text-[#0A2472]'}`}>
                            {amount}
                          </span>
                          <span className={`text-[10px] font-semibold ${isBestValue ? 'text-white/70' : 'text-slate-400'}`}>
                            {unit}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="text-center mb-3">
                  <h3 className={`text-xs sm:text-sm font-sans font-extrabold mt-0.5 tracking-tight leading-snug ${isBestValue ? 'text-white' : 'text-[#0A2472]'}`}>
                    {language === 'id' ? plan.name : plan.name_en}
                  </h3>
                  <p className={`mt-0.5 text-[10px] font-medium leading-relaxed min-h-[30px] flex items-center justify-center ${isBestValue ? 'text-white/75' : 'text-slate-500'}`}>
                    {language === 'id' ? plan.subtitle : plan.subtitle_en}
                  </p>
                </div>

                {/* Main Action Button */}
                {plan.btn_link ? (
                  <a
                    href={plan.btn_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-2 px-3.5 rounded-[10px] text-[10px] font-extrabold tracking-wide text-center transition-all duration-300 cursor-pointer ${
                      isBestValue
                        ? 'bg-white text-[#0A2472] hover:bg-slate-50 shadow-md'
                        : 'bg-white border-2 border-[#0A2472] text-[#0A2472] hover:bg-[#EEF3FF]'
                    }`}
                    id={`price-btn-${plan.id}`}
                  >
                    {language === 'id' ? (plan.btn_text_id || 'Hubungi Kami') : (plan.btn_text_en || 'Contact Us')}
                  </a>
                ) : (
                  <button
                    onClick={onScrollToContact}
                    className={`w-full py-2 px-3.5 rounded-[10px] text-[10px] font-extrabold tracking-wide text-center transition-all duration-300 cursor-pointer ${
                      isBestValue
                        ? 'bg-white text-[#0A2472] hover:bg-slate-50 shadow-md'
                        : 'bg-white border-2 border-[#0A2472] text-[#0A2472] hover:bg-[#EEF3FF]'
                    }`}
                    id={`price-btn-${plan.id}`}
                  >
                    {language === 'id' ? (plan.btn_text_id || 'Hubungi Kami') : (plan.btn_text_en || 'Contact Us')}
                  </button>
                )}

                {/* Divider & Feature list */}
                <ul className={`mt-3.5 space-y-1.5 border-t pt-3.5 text-left flex-1 ${isBestValue ? 'border-white/10' : 'border-[#0A2472]/10'}`}>
                  {(language === 'id' ? plan.bullets : plan.bullets_en).map((bullet, idx) => (
                    <li key={idx} className="flex items-start text-[11px] font-medium leading-relaxed">
                      <Check className={`w-3.5 h-3.5 mr-1.5 shrink-0 mt-0.5 ${isBestValue ? 'text-[#2563EB]' : 'text-emerald-500'}`} />
                      <span className={isBestValue ? 'text-white/90' : 'text-slate-600'}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const categoryTranslations: Record<string, { id: string; en: string }> = {
  'Semua': { id: 'Semua', en: 'All' },
  'Advertising & Publishing': { id: 'Advertising & Publishing', en: 'Advertising & Publishing' },
  'Pelatihan': { id: 'Pelatihan', en: 'Training' },
  'Branding': { id: 'Branding', en: 'Branding' },
  'UI UX Design': { id: 'UI UX Design', en: 'UI UX Design' },
  'Social Media': { id: 'Social Media', en: 'Social Media' },
  'Content': { id: 'Content', en: 'Content' },
  'SEO & SEM': { id: 'SEO & SEM', en: 'SEO & SEM' },
  'Website': { id: 'Website', en: 'Website' },
  'Consulting': { id: 'Consulting', en: 'Consulting' }
};

export default function PricingPage({ onBackToHome, onScrollToContact }: PricingPageProps) {
  const { language, settings } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [dbPlans, setDbPlans] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDbPlans(data);
        }
      })
      .catch(() => {});
  }, []);

  let dynamicCategories: any[] = pricingData;
  if (settings['pricing_categories_data']) {
    try {
      const parsed = JSON.parse(settings['pricing_categories_data']);
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
        dynamicCategories = parsed.map((cat: any) => ({
          ...cat,
          icon: (LucideIcons as any)[cat.icon] || LucideIcons.Target,
          plans: []
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }

  const mergedPricingData = dynamicCategories.map(section => {
    const plansForCategory = dbPlans.filter(p => p.category === section.categoryName);
    return {
      ...section,
      plans: plansForCategory.length > 0 ? plansForCategory : section.plans
    };
  });

  const displayCategories = ['Semua', ...dynamicCategories.map(c => c.categoryName)];

  // Filter category sections based on the selected category
  const filteredSections = selectedCategory === 'Semua'
    ? mergedPricingData
    : mergedPricingData.filter(section => section.categoryName === selectedCategory);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const element = document.getElementById('pricing-categories-stack');
    if (element) {
      const yOffset = -120; // perfectly balances the navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // IntersectionObserver to auto-update selected category button as user scrolls through categories in "Semua" mode
  useEffect(() => {
    if (selectedCategory !== 'Semua') return;

    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -55% 0px', // triggers when the section occupies the upper part of viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('pricing-section-', '');
          const matchedSection = pricingData.find((s) => s.id === sectionId) || dynamicCategories.find((s) => s.id === sectionId);
          if (matchedSection) {
            setSelectedCategory(prev => prev === 'Semua' ? 'Semua' : prev);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    pricingData.forEach((section) => {
      const el = document.getElementById(`pricing-section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  return (
    <div className="bg-white min-h-screen relative overflow-visible" id="pricing-page-root">
      {/* Header block with #EEF3FF background */}
      <div className="bg-[#EEF3FF] py-12 md:py-16 relative overflow-hidden" id="pricing-header-banner">
        {/* Background soft ambient graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Title & Subtitle Left-Aligned in Top-Left Corner with sleek word-by-word elegant reveal animation */}
          <div className="text-left max-w-4xl mb-8" key={language}>
            <motion.h1 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight mb-3 leading-tight text-[#0A2472] flex flex-wrap"
              id="pricing-hero-title"
            >
              {(language === 'id' ? (settings['pricing_hero_title_id'] || 'Pilih paket bangun lebih cerdas') : (settings['pricing_hero_title_en'] || 'Pick a plan build smarter')).split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1] 
                      } 
                    }
                  }}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.02,
                    delayChildren: 0.4,
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="text-slate-500 text-xs sm:text-sm md:text-base font-sans font-medium leading-relaxed max-w-2xl flex flex-wrap"
            >
              {(language === 'id' 
                ? (settings['pricing_hero_desc_id'] || 'Pilih paket yang sesuai dengan visi Anda, dirancang untuk solo founder, tim yang berkembang pesat, dan agensi SaaS modern.') 
                : (settings['pricing_hero_desc_en'] || 'Choose a plan that scales with your vision built for solo founders, fast growing teams and modern SaaS agencies.')
              ).split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.5, 
                        ease: [0.16, 1, 0.3, 1] 
                      } 
                    }
                  }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Category Filter Buttons directly below the Title, Left-Aligned */}
          <div className="text-left" id="pricing-category-container">
            <div 
              className="flex flex-wrap items-center justify-start gap-2" 
              id="pricing-category-scroll"
            >
              {displayCategories.map((catName) => {
                const isActive = selectedCategory === catName;
                
                let label = catName;
                if (catName === 'Semua') {
                  label = language === 'id' ? 'Semua' : 'All';
                } else {
                  // Find category object to check translation
                  const catObj = dynamicCategories.find(c => c.categoryName === catName);
                  label = (language === 'id' ? catName : (catObj?.categoryName_en || catName));
                }
                
                return (
                  <button
                    key={catName}
                    onClick={() => handleCategoryClick(catName)}
                    className={`px-4 py-2 rounded-[10px] text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-[#0A2472] text-white border-[#0A2472] shadow-sm shadow-[#0A2472]/20 scale-[1.02] z-10'
                        : 'bg-white text-slate-700 hover:text-[#0A2472] border-slate-200 hover:border-[#0A2472]/30 hover:bg-slate-50'
                    }`}
                    id={`pricing-filter-${catName.toLowerCase().replace(' ', '-')}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing list body with bg-white */}
      <div className="bg-white py-12 md:py-16" id="pricing-list-wrapper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Pricing List Container unified in the same layout with clean fade and layout shift animations */}
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-12 md:space-y-16" 
            id="pricing-categories-stack"
          >
            {filteredSections.map((section) => (
              <PricingSection
                key={section.id}
                section={section}
                language={language}
                onScrollToContact={onScrollToContact}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
