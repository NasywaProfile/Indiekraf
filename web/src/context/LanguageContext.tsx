import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageType = 'id' | 'en';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
  settings: Record<string, string>;
  refreshSettings: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<LanguageType, Record<string, string>> = {
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Kami',
    'nav.services': 'Layanan',
    'nav.pricing': 'Daftar Harga',
    'nav.portfolio': 'Portofolio',
    'nav.blog': 'Blog',
    'nav.contact': 'Hubungi Kami',

    // Hero
    'hero.badge': 'INDIEKRAF MEDIA & KREATIF',
    'hero.title': 'Kolaborasi Kreatif untuk Mengembangkan Bisnis Anda',
    'hero.subtitle': 'Indiekraf hadir membantu pertumbuhan ekonomi & industri kreatif di Indonesia melalui media terintegrasi, agensi kreatif berbasis proyek, riset, dan pelatihan SDM profesional.',
    'hero.btnConsult': 'Konsultasi Gratis',
    'hero.btnLearn': 'Pelajari Layanan',
    'hero.btnPrimary': 'Pelajari Layanan',
    'hero.btnSecondary': 'Tentang Kami',

    // About
    'about.badge': 'Tentang Indiekraf',
    'about.title': 'Mendorong Ekosistem Kreatif Indonesia ke Tingkat Dunia',
    'about.content1': 'Berdiri sejak tahun 2018, Indiekraf Indonesia merupakan portal media yang menitikberatkan pada ekonomi dan industri kreatif di Indonesia. Kami hadir secara independen dan berperan sebagai penyambung informasi penting dalam menggambarkan perkembangan ekonomi dan industri kreatif, mencakup pelaku utama, acara, tips & trik, opini, pengembangan komunitas, edukasi, hingga kebijakan publik.',
    'about.content2': 'Tujuan kami adalah menjadi kontributor utama dalam mewujudkan Industri Kreatif sebagai pilar utama dalam ekonomi Indonesia pada tahun 2025, serta menjadi rujukan dalam sumber informasi terkait industri kreatif di Indonesia.',
    'about.content3': 'Selain media saat ini kami juga menawarkan berbagai layanan seperti jasa pengembangan produk, aktivasi program, riset hingga sertifikasi.',

    // Stats
    'stats.title': 'Ratusan Bisnis & Institusi Sudah Tumbuh Bersama Kami.',
    'stats.badge': 'Data Jangkauan dan Kredibilitas Kami',
    'stats.visitor': 'Pengunjung Bulanan',
    'stats.follower': 'Pengikut Media Sosial',
    'stats.channel': 'Saluran Media Sosial',
    'stats.reach': 'Jangkauan & Kunjungan Bulanan',
    'stats.bottom': 'Dari startup lokal hingga kampus ternama — kami hadir sebagai mitra kreatif yang bisa diandalkan untuk tumbuh.',

    // Services
    'services.title': 'Layanan & Ekosistem Kami',
    'services.subtitle': 'Kami menghadirkan empat pilar utama untuk mendukung perjalanan transformasi digital bisnis Anda.',
    'services.media.desc': 'Portal media ekonomi & industri kreatif Indonesia.',
    'services.media.bullet1': 'Iklan',
    'services.media.bullet2': 'Penempatan Media',
    'services.media.bullet3': 'Siaran Pers',
    'services.media.btn': 'Lihat Indiekraf Media →',
    'services.studio.desc': 'Agensi kreatif berbasis proyek untuk transformasi digital.',
    'services.studio.bullet1': 'Pemasaran Digital',
    'services.studio.bullet2': 'Branding & Desain Grafis',
    'services.studio.bullet3': 'Desain UI/UX',
    'services.studio.bullet4': 'Pengembangan Web',
    'services.studio.btn': 'Lihat Indiekraf Studio →',
    'services.academy.desc': 'Laboratorium akademik nonformal untuk pengembangan SDM industri kreatif.',
    'services.academy.bullet1': 'Aktivasi Program',
    'services.academy.bullet2': 'Pelatihan In-house',
    'services.academy.bullet3': 'Workshop & Sertifikasi',
    'services.academy.btn': 'Konsultasi Program Training →',
    'services.insight.desc': 'Riset & pengembangan industri kreatif.',
    'services.insight.bullet1': 'Riset Produk',
    'services.insight.bullet2': 'Riset Digital',
    'services.insight.bullet3': 'Kebijakan Publik',
    'services.insight.bullet4': 'Pengembangan Komunitas',
    'services.insight.btn': 'Diskusikan Kebutuhan Riset →',

    // Pricing
    'pricing.badge': 'Harga Paket Layanan',
    'pricing.subtitle': 'Harga transparan, hasil nyata. Pilih paket yang sesuai kebutuhan bisnis Anda.',
    'pricing.btnAll': 'Lihat Harga Lengkap →',
    'pricing.bestValue': 'BEST VALUE',
    'pricing.recommended': 'RECOMMENDED',
    'pricing.starting': 'Mulai Dari',
    'pricing.perPackage': '/paket',
    'pricing.btnDetail': 'Lihat Detail',
    'pricing.plan.marketing.name': 'Pelatihan Digital Marketing',
    'pricing.plan.marketing.sub': 'Workshop & Bootcamp Intensif',
    'pricing.plan.marketing.price': 'Rp 1JT',
    'pricing.plan.marketing.b1': 'Materi up-to-date',
    'pricing.plan.marketing.b2': 'Mentoring interaktif',
    'pricing.plan.marketing.b3': 'Studi kasus nyata',
    'pricing.plan.marketing.b4': 'Sertifikat pelatihan',
    'pricing.plan.branding.name': 'Branding & Identity',
    'pricing.plan.branding.sub': 'Logo, Visual Identity, Brand Guide',
    'pricing.plan.branding.price': 'Rp 3JT',
    'pricing.plan.branding.b1': 'Analisis brand',
    'pricing.plan.branding.b2': 'Desain logo premium',
    'pricing.plan.branding.b3': 'Palet warna & tipografi',
    'pricing.plan.branding.b4': 'Panduan identitas (guideline)',
    'pricing.plan.social.name': 'Social Media Management',
    'pricing.plan.social.sub': 'Konten, Strategi, Community',
    'pricing.plan.social.price': 'Rp 4.5JT',
    'pricing.plan.social.b1': 'Rencana konten bulanan',
    'pricing.plan.social.b2': 'Desain feed estetik',
    'pricing.plan.social.b3': 'Copywriting & hashtag',
    'pricing.plan.social.b4': 'Laporan performa bulanan',
    'pricing.plan.web.name': 'Website Development',
    'pricing.plan.web.sub': 'Landing Page, Company Profile',
    'pricing.plan.web.price': 'Rp 5JT',
    'pricing.plan.web.b1': 'Desain responsif & modern',
    'pricing.plan.web.b2': 'Optimasi SEO dasar',
    'pricing.plan.web.b3': 'Integrasi formulir/WA',
    'pricing.plan.web.b4': 'Kecepatan akses tinggi',
    'pricing.plan.content-creation.name': 'Content Creation Paket',
    'pricing.plan.content-creation.sub': 'Video Reels, TikTok & Copywriting',
    'pricing.plan.content-creation.price': 'Rp 2.5JT',
    'pricing.plan.content-creation.b1': '12 Video pendek/bulan',
    'pricing.plan.content-creation.b2': 'Riset tren & naskah',
    'pricing.plan.content-creation.b3': 'Editing video profesional',
    'pricing.plan.content-creation.b4': 'Voice over & caption',
    'pricing.plan.seo-sem-pack.name': 'SEO & SEM Optimization',
    'pricing.plan.seo-sem-pack.sub': 'Google Ads & Rank Improvement',
    'pricing.plan.seo-sem-pack.price': 'Rp 4JT',
    'pricing.plan.seo-sem-pack.b1': 'Riset kata kunci kompetitif',
    'pricing.plan.seo-sem-pack.b2': 'Optimasi On-page & Off-page',
    'pricing.plan.seo-sem-pack.b3': 'Setup & Optimasi Google Ads',
    'pricing.plan.seo-sem-pack.b4': 'Laporan performa bulanan',
    'pricing.plan.consulting-strat.name': 'Digital Strategy Consulting',
    'pricing.plan.consulting-strat.sub': 'Sesi Privat & Rekomendasi Bisnis',
    'pricing.plan.consulting-strat.price': 'Rp 1.5JT',
    'pricing.plan.consulting-strat.b1': 'Sesi konsultasi 1-on-1',
    'pricing.plan.consulting-strat.b2': 'Analisis kompetitor mendalam',
    'pricing.plan.consulting-strat.b3': 'Rencana aksi (action plan) detail',
    'pricing.plan.consulting-strat.b4': 'Evaluasi performa berkala',

    // Portfolio
    'portfolio.badge': 'Portofolio Kami',
    'portfolio.title': 'Karya Terbaik Kami',
    'portfolio.subtitle': 'Menghasilkan solusi digital berdampak tinggi untuk brand, pemerintah, dan komunitas kreatif.',
    'portfolio.viewDetail': 'Lihat Detail',
    'portfolio.project.mcc.title': 'Portal Malang Creative Center',
    'portfolio.project.mcc.category': 'Pengembangan Website',
    'portfolio.project.mcc.tag': 'Teknologi & Seni',
    'portfolio.project.batu.title': 'Kampanye Pariwisata Kota Batu',
    'portfolio.project.batu.category': 'Pemasaran Digital',
    'portfolio.project.batu.tag': 'Strategi',
    'portfolio.project.umkm.title': 'Identitas UMKM Go Digital',
    'portfolio.project.umkm.category': 'Desain & Identitas Merek',
    'portfolio.project.umkm.tag': 'Desain',

    // Blog
    'blog.badge': 'Blog & Berita',
    'blog.title': 'Kabar Terbaru Indiekraf',
    'blog.subtitle': 'Ikuti wawasan terbaru seputar industri kreatif, tips marketing, teknologi, dan kegiatan tim kami.',
    'blog.readMore': 'Baca Selengkapnya',
    'blog.post.kreatif.title': 'Perkembangan Industri Kreatif di Malang Raya Tahun 2026',
    'blog.post.kreatif.excerpt': 'Melihat peluang besar dan tantangan baru bagi para pelaku ekonomi kreatif di Malang Raya.',
    'blog.post.kreatif.date': '02 Jul 2026',
    'blog.post.kreatif.author': 'Tim Redaksi',
    'blog.post.branding.title': 'Pentingnya Branding & Identity yang Konsisten Bagi Startup',
    'blog.post.branding.excerpt': 'Bagaimana identitas visual yang solid membantu startup Anda tampil menonjol di pasar yang kompetitif.',
    'blog.post.branding.date': '28 Jun 2026',
    'blog.post.branding.author': 'Spesialis Brand',
    'blog.post.uiux.title': 'Tren Desain UI/UX Terbaru untuk Website Interaktif',
    'blog.post.uiux.excerpt': 'Panduan lengkap menerapkan tren desain terbaru demi meningkatkan konversi pengguna.',
    'blog.post.uiux.date': '15 Jun 2026',
    'blog.post.uiux.author': 'Pimpinan Studio',

    // Why Choose Us
    'why.title': 'Partner Kreatif Tepercaya untuk Pertumbuhan Berkelanjutan',
    'why.subtitle': 'Partner kolaboratif yang memahami kebutuhan bisnis dan menghasilkan solusi digital yang terukur',
    'why.feat.integrated.title': 'Solusi Terintegrasi',
    'why.feat.integrated.desc': 'Dari strategi hingga eksekusi — setiap layanan yang Anda butuhkan berada dalam satu ekosistem yang terhubung, dibangun untuk hasil nyata.',
    'why.feat.datadriven.title': 'Pendekatan Berbasis Data',
    'why.feat.datadriven.desc': 'Setiap keputusan didukung oleh analisis, memastikan investasi Anda menghasilkan ROI yang terukur dan dapat dilacak.',
    'why.feat.team.title': 'Tim Profesional',
    'why.feat.team.desc': 'Tim berpengalaman di bidang pemasaran digital, desain, pengembangan, dan konsultasi — siap untuk menangani setiap permintaan.',
    'why.feat.track.title': 'Rekam Jejak Terbukti',
    'why.feat.track.desc': 'Mulai dari UKM lokal hingga lembaga pemerintah — klien yang telah tumbuh bersama kami terus kembali.',
    'why.feat.partner.title': 'Partner, Bukan Vendor',
    'why.feat.partner.desc': 'Bukan sekadar vendor. Kami adalah mitra kreatif yang berkomitmen pada pertumbuhan Bisnis Anda.',
    'why.feat.pricing.title': 'Harga Transparan',
    'why.feat.pricing.desc': 'Harga transparan, paket fleksibel — dirancang agar sesuai dengan anggaran Anda.',

    // CTA
    'cta.work': 'Mari Bekerja Sama',
    'cta.title': 'Siap Membangun Sesuatu yang Luar Biasa?',
    'cta.subtitle': 'Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya.',
    'cta.whatsapp': 'Chat WhatsApp',

    // Footer
    'footer.desc': 'Menghubungkan ekosistem kreatif, media, agensi, riset, dan akademi di Indonesia.',
    'footer.links': 'Tautan Langsung',
    'footer.pillars': 'Pilar Indiekraf',
    'footer.contact': 'Kontak',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.pricing': 'Pricelist',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',

    // Hero
    'hero.badge': 'INDIEKRAF MEDIA & CREATIVE',
    'hero.title': 'Creative Collaboration to Grow Your Business',
    'hero.subtitle': 'Indiekraf is here to help grow the creative economy & industry in Indonesia through integrated media, project-based creative agency, research, and professional HR training.',
    'hero.btnConsult': 'Free Consultation',
    'hero.btnLearn': 'Learn Services',
    'hero.btnPrimary': 'Explore Services',
    'hero.btnSecondary': 'About Us',

    // About
    'about.badge': 'About Indiekraf',
    'about.title': "Empowering Indonesia's Creative Ecosystem to the World Stage",
    'about.content1': "Established in 2018, Indiekraf Indonesia is a media portal focusing on Indonesia's creative economy and industry. We exist independently and act as a vital information bridge describing the development of the creative economy and industry, covering key players, events, tips & tricks, opinions, community development, education, to public policy.",
    'about.content2': "Our goal is to be a major contributor in realizing the Creative Industry as a main pillar in the Indonesian economy by 2025, and to become a reference point for information sources related to the creative industry in Indonesia.",
    'about.content3': "Besides media, we currently also offer various services such as product development, program activation, research, to certification.",

    // Stats
    'stats.title': 'Hundreds of Businesses & Institutions Have Grown With Us.',
    'stats.badge': 'Our Reach and Credibility Data',
    'stats.visitor': 'Monthly Visitors',
    'stats.follower': 'Social Media Followers',
    'stats.channel': 'Social Media Channels',
    'stats.reach': 'Monthly Reach & Visits',
    'stats.bottom': 'From local startups to top universities — we are your reliable creative partner for growth.',

    // Services
    'services.title': 'Our Services & Ecosystem',
    'services.subtitle': 'We present four main pillars to support your business\'s digital transformation journey.',
    'services.media.desc': 'Indonesian creative industry & economy media portal.',
    'services.media.bullet1': 'Advertising',
    'services.media.bullet2': 'Media Placement',
    'services.media.bullet3': 'Press Release',
    'services.media.btn': 'Visit Indiekraf Media →',
    'services.studio.desc': 'Project-based creative agency for digital transformation.',
    'services.studio.bullet1': 'Digital Marketing',
    'services.studio.bullet2': 'Branding & Graphic Design',
    'services.studio.bullet3': 'UI/UX Design',
    'services.studio.bullet4': 'Web Development',
    'services.studio.btn': 'Visit Indiekraf Studio →',
    'services.academy.desc': 'Nonformal academic laboratory for creative industry talent development.',
    'services.academy.bullet1': 'Program Activation',
    'services.academy.bullet2': 'In-house Training',
    'services.academy.bullet3': 'Workshops & Certifications',
    'services.academy.btn': 'Consult Training Program →',
    'services.insight.desc': 'Research & development for creative industries.',
    'services.insight.bullet1': 'Product Research',
    'services.insight.bullet2': 'Digital Research',
    'services.insight.bullet3': 'Public Policy',
    'services.insight.bullet4': 'Community Development',
    'services.insight.btn': 'Discuss Research Needs →',

    // Pricing
    'pricing.badge': 'Service Packages Pricing',
    'pricing.subtitle': 'Transparent pricing, real results. Choose the package that suits your business needs.',
    'pricing.btnAll': 'View Full Price List →',
    'pricing.bestValue': 'BEST VALUE',
    'pricing.recommended': 'RECOMMENDED',
    'pricing.starting': 'Starting From',
    'pricing.perPackage': '/package',
    'pricing.btnDetail': 'View Details',
    'pricing.plan.marketing.name': 'Digital Marketing Training',
    'pricing.plan.marketing.sub': 'Intensive Workshop & Bootcamp',
    'pricing.plan.marketing.price': 'Rp 1M',
    'pricing.plan.marketing.b1': 'Up-to-date material',
    'pricing.plan.marketing.b2': 'Interactive mentoring',
    'pricing.plan.marketing.b3': 'Real-world case studies',
    'pricing.plan.marketing.b4': 'Training certificate',
    'pricing.plan.branding.name': 'Branding & Identity',
    'pricing.plan.branding.sub': 'Logo, Visual Identity, Brand Guide',
    'pricing.plan.branding.price': 'Rp 3M',
    'pricing.plan.branding.b1': 'Brand analysis',
    'pricing.plan.branding.b2': 'Premium logo design',
    'pricing.plan.branding.b3': 'Color palette & typography',
    'pricing.plan.branding.b4': 'Brand identity guideline',
    'pricing.plan.social.name': 'Social Media Management',
    'pricing.plan.social.sub': 'Content, Strategy, Community',
    'pricing.plan.social.price': 'Rp 4.5M',
    'pricing.plan.social.b1': 'Monthly content plan',
    'pricing.plan.social.b2': 'Aesthetic feed design',
    'pricing.plan.social.b3': 'Copywriting & hashtags',
    'pricing.plan.social.b4': 'Monthly performance report',
    'pricing.plan.web.name': 'Website Development',
    'pricing.plan.web.sub': 'Landing Page, Company Profile',
    'pricing.plan.web.price': 'Rp 5M',
    'pricing.plan.web.b1': 'Responsive & modern design',
    'pricing.plan.web.b2': 'Basic SEO optimization',
    'pricing.plan.web.b3': 'Form/WA integration',
    'pricing.plan.web.b4': 'High loading speed',
    'pricing.plan.content-creation.name': 'Content Creation Package',
    'pricing.plan.content-creation.sub': 'Video Reels, TikTok & Copywriting',
    'pricing.plan.content-creation.price': 'Rp 2.5M',
    'pricing.plan.content-creation.b1': '12 Short videos/month',
    'pricing.plan.content-creation.b2': 'Trend research & scriptwriting',
    'pricing.plan.content-creation.b3': 'Professional video editing',
    'pricing.plan.content-creation.b4': 'Voice over & captions',
    'pricing.plan.seo-sem-pack.name': 'SEO & SEM Optimization',
    'pricing.plan.seo-sem-pack.sub': 'Google Ads & Rank Improvement',
    'pricing.plan.seo-sem-pack.price': 'Rp 4M',
    'pricing.plan.seo-sem-pack.b1': 'Competitive keyword research',
    'pricing.plan.seo-sem-pack.b2': 'On-page & Off-page optimization',
    'pricing.plan.seo-sem-pack.b3': 'Google Ads Setup & Optimization',
    'pricing.plan.seo-sem-pack.b4': 'Monthly performance report',
    'pricing.plan.consulting-strat.name': 'Digital Strategy Consulting',
    'pricing.plan.consulting-strat.sub': 'Private Session & Business Roadmap',
    'pricing.plan.consulting-strat.price': 'Rp 1.5M',
    'pricing.plan.consulting-strat.b1': '1-on-1 Consulting Session',
    'pricing.plan.consulting-strat.b2': 'In-depth competitor analysis',
    'pricing.plan.consulting-strat.b3': 'Detailed action plan',
    'pricing.plan.consulting-strat.b4': 'Regular performance evaluation',

    // Portfolio
    'portfolio.badge': 'Our Portfolio',
    'portfolio.title': 'Our Best Work',
    'portfolio.subtitle': 'Delivering high-impact digital solutions for brands, governments, and creative communities.',
    'portfolio.viewDetail': 'View Details',
    'portfolio.project.mcc.title': 'Malang Creative Center Portal',
    'portfolio.project.mcc.category': 'Web Development',
    'portfolio.project.mcc.tag': 'Tech & Art',
    'portfolio.project.batu.title': 'Batu Tourism Brand Campaign',
    'portfolio.project.batu.category': 'Digital Marketing',
    'portfolio.project.batu.tag': 'Strategy',
    'portfolio.project.umkm.title': 'UMKM Go Digital Identity',
    'portfolio.project.umkm.category': 'Branding & Identity',
    'portfolio.project.umkm.tag': 'Design',

    // Blog
    'blog.badge': 'Blog & News',
    'blog.title': 'Indiekraf Latest Updates',
    'blog.subtitle': 'Follow the latest insights on the creative industry, marketing tips, tech, and team activities.',
    'blog.readMore': 'Read More',
    'blog.post.kreatif.title': 'Creative Industry Evolution in Malang Raya 2026',
    'blog.post.kreatif.excerpt': 'Analyzing major opportunities and fresh challenges for creative economy actors in Malang.',
    'blog.post.kreatif.date': 'Jul 02, 2026',
    'blog.post.kreatif.author': 'Editorial Team',
    'blog.post.branding.title': 'The Crucial Value of Consistent Branding for Startups',
    'blog.post.branding.excerpt': 'How a robust visual identity empowers your startup to stand out in a hyper-competitive market.',
    'blog.post.branding.date': 'Jun 28, 2026',
    'blog.post.branding.author': 'Brand Specialist',
    'blog.post.uiux.title': 'Latest UI/UX Design Trends for Interactive Websites',
    'blog.post.uiux.excerpt': 'A comprehensive guide to adopting top design trends for maximizing user conversion.',
    'blog.post.uiux.date': 'Jun 15, 2026',
    'blog.post.uiux.author': 'Studio Lead',

    // Why Choose Us
    'why.title': 'Trusted Creative Partner for Sustainable Growth',
    'why.subtitle': 'Collaborative partner understanding business needs and delivering measurable digital solutions',
    'why.feat.integrated.title': 'Integrated Solutions',
    'why.feat.integrated.desc': 'From strategy to execution — every service you need is within one connected ecosystem, built for real results.',
    'why.feat.datadriven.title': 'Data-Driven Approach',
    'why.feat.datadriven.desc': 'Every decision is backed by analytics, ensuring your investment yields measurable and trackable ROI.',
    'why.feat.team.title': 'Professional Team',
    'why.feat.team.desc': 'An experienced team in digital marketing, design, development, and consulting — ready to handle any requests.',
    'why.feat.track.title': 'Proven Track Record',
    'why.feat.track.desc': 'From local SMBs to government agencies — clients who have grown with us keep coming back.',
    'why.feat.partner.title': 'Partner, Not Vendor',
    'why.feat.partner.desc': 'Not just a vendor. We are a creative partner committed to your business growth.',
    'why.feat.pricing.title': 'Transparent Pricing',
    'why.feat.pricing.desc': 'Transparent pricing, flexible packages — tailored to fit your budget.',

    // CTA
    'cta.work': "Let's work together",
    'cta.title': 'Ready To Build Something Great?',
    'cta.subtitle': 'Contact Indiekraf Team for Service Consultation, Proposal Requests, and Cost Estimates.',
    'cta.whatsapp': 'Chat WhatsApp',

    // Footer
    'footer.desc': 'Connecting the creative, media, agency, research, and academy ecosystem in Indonesia.',
    'footer.links': 'Quick Links',
    'footer.pillars': 'Indiekraf Pillars',
    'footer.contact': 'Contact',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLangState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('indiekraf-lang');
    return (saved as LanguageType) || 'id';
  });
  const [settings, setSettings] = useState<Record<string, string>>({});

  const refreshSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Gagal memuat pengaturan:', err);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLangState(lang);
    localStorage.setItem('indiekraf-lang', lang);
  };

  const t = (key: string): string => {
    const langKey = (language || 'id').toLowerCase() as LanguageType;
    
    // 1. Cek langsung key dengan suffix bahasa (misal nav.home_id atau hero.title_id)
    if (settings[`${key}_${langKey}`]) {
      return settings[`${key}_${langKey}`];
    }
    // 2. Cek langsung key tanpa suffix
    if (settings[key]) {
      return settings[key];
    }
    // 3. Mapping legacy/spesifik untuk pengaturan dari CMS
    if (key === 'hero.badge' && settings[`hero_badge_${langKey}`]) return settings[`hero_badge_${langKey}`];
    if (key === 'hero.title' && settings[`hero_title_${langKey}`]) return settings[`hero_title_${langKey}`];
    if (key === 'hero.subtitle' && settings[`hero_subtitle_${langKey}`]) return settings[`hero_subtitle_${langKey}`];
    if (key === 'hero.btnPrimary' && settings[`hero_cta_primary_${langKey}`]) return settings[`hero_cta_primary_${langKey}`];
    if (key === 'hero.btnSecondary' && settings[`hero_cta_secondary_${langKey}`]) return settings[`hero_cta_secondary_${langKey}`];
    if (key === 'hero.btnConsult' && settings[`hero_cta_primary_${langKey}`]) return settings[`hero_cta_primary_${langKey}`];
    if (key === 'hero.btnLearn' && settings[`hero_cta_secondary_${langKey}`]) return settings[`hero_cta_secondary_${langKey}`];
    if (key === 'about.badge' && settings[`about_tagline_${langKey}`]) return settings[`about_tagline_${langKey}`];
    if (key === 'about.title' && settings[`about_title_${langKey}`]) return settings[`about_title_${langKey}`];
    if (key === 'about.content1' && settings[`about_description_${langKey}`]) return settings[`about_description_${langKey}`];
    if (key === 'cta.work' && settings[`cta_work_${langKey}`]) return settings[`cta_work_${langKey}`];
    if (key === 'cta.title' && settings[`cta_title_${langKey}`]) return settings[`cta_title_${langKey}`];
    if (key === 'cta.subtitle' && settings[`cta_subtitle_${langKey}`]) return settings[`cta_subtitle_${langKey}`];
    if (key === 'cta.whatsapp' && settings[`cta_whatsapp_${langKey}`]) return settings[`cta_whatsapp_${langKey}`];
    if (key === 'footer.desc' && settings[`footer_desc_${langKey}`]) return settings[`footer_desc_${langKey}`];

    // 4. Fallback ke dictionary statis
    const currentDict = translations[langKey] || translations['id'];
    return currentDict[key] || translations['id'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, settings, refreshSettings }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useLanguageOptional() {
  return useContext(LanguageContext);
}
