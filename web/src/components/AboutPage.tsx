import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Compass, 
  Check, 
  FileText, 
  Lightbulb, 
  Users, 
  Zap, 
  Building, 
  Network, 
  GraduationCap, 
  Heart, 
  Mail, 
  ArrowUpRight, 
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Cpu,
  Award,
  Presentation,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Globe,
  Target,
  Rocket,
  Flag,
  Star
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onBackToHome: () => void;
  onScrollToContact: () => void;
}

export default function AboutPage({ onBackToHome, onScrollToContact }: AboutPageProps) {
  const { language, settings } = useLanguage();

  const serviceImages = [
    "/gambar.jpg",
    "/gambar.jpg",
    "/gambar.jpg",
    "/gambar.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % serviceImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const dynamicClientsList = React.useMemo(() => {
    const defaults = [
      { title_id: 'UMKM & Startup', title_en: 'MSMEs & Startups', desc_id: 'Brand lokal yang ingin tumbuh dan bersaing di era digital', desc_en: 'Local brands looking to grow and compete in the digital era', iconName: 'Briefcase' },
      { title_id: 'Perusahaan & Korporasi (B2B)', title_en: 'Corporates & Enterprises', desc_id: 'Perusahaan yang butuh transformasi digital terstruktur', desc_en: 'Companies requiring structured digital transformation', iconName: 'Building' },
      { title_id: 'Pemerintahan & Non-Profit', title_en: 'Government & Non-Profit', desc_id: 'Dinas dan lembaga yang membutuhkan komunikasi publik yang efektif', desc_en: 'Agencies requiring highly effective public communications', iconName: 'Network' },
      { title_id: 'Institusi Pendidikan', title_en: 'Educational Institutions', desc_id: 'Universitas dan sekolah yang ingin memperkuat brand akademik', desc_en: 'Universities and schools aiming to strengthen academic branding', iconName: 'GraduationCap' },
      { title_id: 'Komunitas Kreatif', title_en: 'Creative Communities', desc_id: 'Organisasi nirlaba dan komunitas kreatif yang ingin berdampak lebih luas', desc_en: 'Non-profits and creative hubs aiming for a broader social impact', iconName: 'Heart' },
    ];
    if (settings['about_clients_list']) {
      try {
        const parsed = JSON.parse(settings['about_clients_list']);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return defaults;
  }, [settings]);

  const t = {
    id: {
      aboutUs: "TENTANG KAMI",
      heroTitle: settings['about_page_title_id'] || settings['about_page_title'] || "Berangkat dari pemahaman,",
      heroTitleHighlight: (settings['about_page_title_id'] || settings['about_page_title']) ? "" : "bukan sekadar eksekusi.",
      heroDesc: settings['about_page_desc_id'] || settings['about_page_desc'] || "Indiekraf adalah creative & digital agency yang hadir sejak 2018 di Malang — membantu bisnis, institusi, dan brand Indonesia tumbuh secara berkelanjutan di era digital.",
      stats: {
        est: settings['about_stat_est_id'] || settings['about_stat_est'] || "Est. 2018",
        location: settings['about_stat_loc_id'] || settings['about_stat_loc'] || "Malang, Jawa Timur",
        projects: settings['about_stat_projects_id'] || settings['about_stat_projects'] || "100+ Proyek",
        clients: settings['about_stat_clients_id'] || settings['about_stat_clients'] || "100+ Klien"
      },
      leadership: {
        tag: "BOARD OF DIRECTORS",
        title: "Tim Kepemimpinan",
        subtitle: "Para profesional kreatif di balik arah strategis Indiekraf Indonesia."
      },
      purpose: {
        tag: settings['about_purpose_tag_id'] || "ARAH & TUJUAN",
        title: settings['about_purpose_title_id'] || "Arah Yang Kami Tuju",
        subtitle: settings['about_purpose_subtitle_id'] || "Panduan strategis dalam menggerakkan ekosistem industri kreatif nasional.",
        visi: {
          tag: settings['about_vision_tag_id'] || "VISI KAMI",
          title: settings['about_vision_title_id'] || "Apa Yang Kami Impikan",
          desc: settings['about_vision_id'] || settings['about_vision'] || "Menjadi landasan utama sebagai sumber informasi independen terkemuka yang menyajikan berbagai info relevan mengenai Ekonomi Kreatif dan sektor pariwisata secara akurat & berdampak."
        },
        misi: {
          tag: settings['about_mission_tag_id'] || "MISI KAMI",
          title: settings['about_mission_title_id'] || "Bagaimana Kami Melangkah",
          bullets: settings['about_mission_id']
            ? settings['about_mission_id'].split('\n').filter(Boolean)
            : [
                "Menghadirkan konten berbasis best practice industri kreatif.",
                "Inovasi platform digital pendukung produktivitas bisnis.",
                "Membangun kemitraan erat bersama komunitas & instansi strategis."
              ]
        }
      },
      legal: {
        tag: "LEGALITAS PERUSAHAAN",
        title: "Beroperasi Secara Resmi & Transparan.",
        desc: "Indiekraf beroperasi sebagai badan usaha resmi yang terdaftar dan di bawah legalitas penuh, sehingga setiap kemitraan berjalan dengan landasan hukum yang kuat dan kepercayaan yang terjaga.",
        alert: "Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi.",
        items: [
          { label: "Badan Hukum", value: "PT (Perseroan Terbatas)" },
          { label: "Nama Legal", value: "PT Indiekraf Indonesia Digital Kreatif" },
          { label: "Nomor Akta", value: "Tersedia untuk kerja sama resmi" },
          { label: "SK Kemenkumham", value: "Terdaftar resmi" },
          { label: "NPWP", value: "Wajib Pajak Terdaftar" },
          { label: "NIB", value: "Nomor Induk Berusaha (NIB)" }
        ]
      },
      howWeWork: {
        tag: "METODE & CARA KERJA",
        title: "Pendekatan Kami",
        subtitle: "Setiap proyek dimulai dari pemahaman mendalam, bukan asumsi. Begini cara kami bekerja.",
        steps: [
          {
            num: "01",
            title: "Business-driven",
            desc: "Setiap keputusan desain dan teknologi selalu dikaitkan dengan tujuan bisnis klien."
          },
          {
            num: "02",
            title: "User-centered",
            desc: "Pengalaman pengguna menjadi inti dari setiap produk yang kami kembangkan."
          },
          {
            num: "03",
            title: "Agile & Adaptive",
            desc: "Fleksibel terhadap perubahan kebutuhan dan cepat beradaptasi dengan dinamika pasar."
          },
          {
            num: "04",
            title: "Quality-oriented",
            desc: "Menjaga standar kualitas tinggi dari sisi desain, performa, dan keberlanjutan sistem."
          }
        ]
      },
      clientsServed: {
        tag: settings['about_client_tag_id'] || "SASARAN & MITRA",
        title: settings['about_client_title_id'] || "Siapa Yang Kami Layani?",
        subtitle: settings['about_client_subtitle_id'] || "Indiekraf hadir untuk berbagai skala bisnis dan jenis institusi — dari startup lokal hingga korporasi nasional.",
        items: dynamicClientsList.map(c => ({
          title: c.title_id || '',
          desc: c.desc_id || '',
          iconName: c.iconName || 'Briefcase'
        }))
      },
      highlights: [
        "Meningkatkan kredibilitas brand",
        "Mengoptimalkan proses bisnis",
        "Memperluas jangkauan pasar",
        "Menghadirkan pengalaman digital"
      ]
    },
    en: {
      aboutUs: "ABOUT US",
      heroTitle: settings['about_page_title_en'] || "Built on deep understanding,",
      heroTitleHighlight: settings['about_page_title_en'] ? "" : "not just execution.",
      heroDesc: settings['about_page_desc_en'] || "Indiekraf is a creative & digital agency based in Malang since 2018 — helping Indonesian businesses, institutions, and brands grow sustainably in the digital era.",
      stats: {
        est: settings['about_stat_est_en'] || "Est. 2018",
        location: settings['about_stat_loc_en'] || "Malang, East Java",
        projects: settings['about_stat_projects_en'] || "100+ Projects",
        clients: settings['about_stat_clients_en'] || "100+ Clients"
      },
      leadership: {
        tag: "BOARD OF DIRECTORS",
        title: "Board of Directors",
        subtitle: "The creative minds steering Indiekraf Indonesia's strategic direction."
      },
      purpose: {
        tag: settings['about_purpose_tag_en'] || "PURPOSE & VALUES",
        title: settings['about_purpose_title_en'] || "Where We Are Headed",
        subtitle: settings['about_purpose_subtitle_en'] || "Strategic guidance in driving the creative industry ecosystem.",
        visi: {
          tag: settings['about_vision_tag_en'] || "OUR VISION",
          title: settings['about_vision_title_en'] || "What We Envision",
          desc: settings['about_vision_en'] || "To become the premier cornerstone and independent information hub delivering accurate, impactful insights on the Creative Economy and tourism sector."
        },
        misi: {
          tag: settings['about_mission_tag_en'] || "OUR MISSION",
          title: settings['about_mission_title_en'] || "How We Step Forward",
          bullets: settings['about_mission_en']
            ? settings['about_mission_en'].split('\n').filter(Boolean)
            : [
                "Delivering content based on creative industry best practices.",
                "Innovative digital platforms supporting business productivity.",
                "Building robust partnerships with communities & strategic institutions."
              ]
        }
      },
      legal: {
        tag: "COMPANY LEGALITY",
        title: "Operating Officially & Transparently.",
        desc: "Indiekraf operates as a fully registered and legal business entity, ensuring every partnership is built on solid legal ground and preserved trust.",
        alert: "All legal documents are available and fully verifiable for official collaborations.",
        items: [
          { label: "Legal Status", value: "PT (Perseroan Terbatas / LLC)" },
          { label: "Legal Name", value: "PT Indiekraf Indonesia Digital Kreatif" },
          { label: "Deed Number", value: "Available for official collaboration" },
          { label: "Ministry Decree", value: "Officially registered" },
          { label: "Tax ID (NPWP)", value: "Registered taxpayer" },
          { label: "Business ID (NIB)", value: "Business Identification Number (NIB)" }
        ]
      },
      howWeWork: {
        tag: "OUR WORKFLOW",
        title: "Our Approach",
        subtitle: "Every project starts with a deep understanding, never assumptions. Here is how we work.",
        steps: [
          {
            num: "01",
            title: "Business-driven",
            desc: "Every design and technology decision is aligned directly with our client's business goals."
          },
          {
            num: "02",
            title: "User-centered",
            desc: "User experience remains at the core of every digital product we develop."
          },
          {
            num: "03",
            title: "Agile & Adaptive",
            desc: "Flexible to evolving needs and quick to pivot in dynamic market environments."
          },
          {
            num: "04",
            title: "Quality-oriented",
            desc: "Upholding high-quality standards in design, performance, and system sustainability."
          }
        ]
      },
      clientsServed: {
        tag: settings['about_client_tag_en'] ?? "PARTNERS & CLIENTS",
        title: settings['about_client_title_en'] ?? "Who We Serve",
        subtitle: settings['about_client_subtitle_en'] ?? "Indiekraf serves various business scales and institutions — from local startups to national corporations.",
        items: dynamicClientsList.map(c => ({
          title: c.title_en || '',
          desc: c.desc_en || '',
          iconName: c.iconName || 'Briefcase'
        }))
      },
      highlights: [
        "Boost brand credibility",
        "Optimize business processes",
        "Expand market reach",
        "Deliver premium digital experiences"
      ]
    }
  };

  const currentT = language === 'id' ? t.id : t.en;

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

  let leadershipList = defaultLeaders;
  if (settings && settings['about_leadership_list']) {
    try {
      const parsed = JSON.parse(settings['about_leadership_list']);
      if (Array.isArray(parsed) && parsed.length > 0) {
        leadershipList = parsed;
      }
    } catch (e) {
      console.error('Error parsing leadership list', e);
    }
  }

  const leadershipTagText = settings?.[`about_leadership_tag_${language}`] ?? settings?.['about_leadership_tag'] ?? currentT.leadership.tag;
  const leadershipTitleText = settings?.[`about_leadership_title_${language}`] ?? settings?.['about_leadership_title'] ?? currentT.leadership.title;
  const leadershipSubtitleText = settings?.[`about_leadership_desc_${language}`] ?? settings?.['about_leadership_desc'] ?? currentT.leadership.subtitle;

  const legalTagText = settings?.[`about_legal_tag_${language}`] ?? currentT.legal.tag;
  const legalTitleText = settings?.[`about_legal_title_${language}`] ?? currentT.legal.title;
  const legalDescText = settings?.[`about_legal_desc_${language}`] ?? currentT.legal.desc;
  const legalAlertText = settings?.[`about_legal_alert_${language}`] ?? currentT.legal.alert;

  const legalLedgerHeader = settings?.[`about_legal_ledger_header_${language}`] ?? "CORPORATE IDENTIFICATION LEDGER";
  const legalLedgerName = settings?.[`about_legal_ledger_name_${language}`] ?? "PT INDIEKRAF INDONESIA DIGITAL KREATIF";
  const legalLedgerBadge = settings?.[`about_legal_ledger_badge_${language}`] ?? "SECURE RECORD";
  const legalLedgerFooterLeft = settings?.[`about_legal_ledger_footer_left_${language}`] ?? "ISSUED BY REPUBLIC OF INDONESIA";
  const legalLedgerFooterRight = settings?.[`about_legal_ledger_footer_right_${language}`] ?? "VERIFICATION HASH: IDX-2018-09";

  const legalTagIcon = settings?.['about_legal_tag_icon'] ?? 'shield-check';
  const legalAlertIcon = settings?.['about_legal_alert_icon'] ?? 'check-circle';
  const legalFooterIcon = settings?.['about_legal_footer_icon'] ?? 'file-text';

  const defaultLegalItems = [
    { label: language === 'id' ? "Legal" : "Legal Status", value: 'Perseroan Terbatas (PT)' },
    { label: language === 'id' ? "Nama Legal" : "Legal Name", value: 'PT. INDIEKRAF INDONESIA DIGITAL KREATIF' },
    { label: language === 'id' ? "Nomor Akta" : "Deed Number", value: language === 'id' ? "Nomor 6 tanggal 14 Juli 2020" : "No. 6 dated July 14, 2020" },
    { label: language === 'id' ? "Notaris" : "Notary", value: 'Mochamad Syafrizal Bashori, SH., MKN.' },
    { label: language === 'id' ? "No. SK Kemenkumham" : "Ministry Decree No.", value: 'AHU-0036931.AH.01.01. TAHUN 2020' },
    { label: language === 'id' ? "Nomor NPWP" : "Tax ID (NPWP)", value: '95.518.163.1-623.000' },
    { label: language === 'id' ? "Nomor Induk Berusaha (NIB)" : "Business ID (NIB)", value: '0220303861845' }
  ];

  let legalItems = defaultLegalItems;
  if (settings && settings['about_legal_list']) {
    try {
      const parsed = JSON.parse(settings['about_legal_list']);
      if (Array.isArray(parsed) && parsed.length > 0) {
        legalItems = parsed.map(item => ({
          label: language === 'id' ? (item.label_id || item.label_en || '') : (item.label_en || item.label_id || ''),
          value: language === 'id' ? (item.value_id || item.value_en || '') : (item.value_en || item.value_id || '')
        }));
      }
    } catch (e) {
      console.error('Error parsing legal list', e);
    }
  }

  const visionTitleText = settings?.[`about_vision_title_${language}`] ?? settings?.['about_vision_title'] ?? currentT.purpose.visi.title;
  const missionTitleText = settings?.[`about_mission_title_${language}`] ?? settings?.['about_mission_title'] ?? currentT.purpose.misi.title;
  const purposeLinkText = settings?.['about_purpose_link_text'] ?? 'indiekraf.com';
  const purposeLinkUrl = settings?.['about_purpose_link_url'] ?? 'https://indiekraf.com';
  const purposeLinkIcon = settings?.['about_purpose_link_icon'] ?? 'globe';

  const visionIcon = settings?.['about_vision_icon'] ?? 'eye';
  const missionIcon = settings?.['about_mission_icon'] ?? 'compass';

  const renderPurposeIcon = () => {
    return renderIcon(purposeLinkIcon, "w-4 h-4 text-[#0A2472]/60 shrink-0");
  };

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'eye': return <Eye className={className} />;
      case 'compass': return <Compass className={className} />;
      case 'target': return <Target className={className} />;
      case 'lightbulb': return <Lightbulb className={className} />;
      case 'flag': return <Flag className={className} />;
      case 'rocket': return <Rocket className={className} />;
      case 'star': return <Star className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'shield-check': return <ShieldCheck className={className} />;
      case 'check-circle': return <CheckCircle2 className={className} />;
      case 'file-text': return <FileText className={className} />;
      // Added new standard 4 Button Keunggulan mappings
      case 'Target': return <Target className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Presentation': return <Presentation className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      default: return <CheckCircle2 className={className} />;
    }
  };



  // Thin standard fade-in transition presets
  const subtleFadeUp = {
    hidden: { opacity: 0, y: 28, scale: 0.99 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerSettings = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // JIKA INGIN MENGGANTI FOTO HERO SECARA MANUAL:
  // 1. Upload file foto Anda (misal: "about-hero.jpg") ke dalam folder '/public/' lewat file explorer di sebelah kiri.
  // 2. Ubah nilai di bawah ini dari URL Unsplash menjadi: "/about-hero.jpg"
  const heroBackgroundImage = settings['about_hero_image'] || "/gambar.jpg";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white min-h-screen relative overflow-x-hidden selection:bg-blue-100 selection:text-blue-950" 
      id="about-page-root"
    >
      
      {/* 1. CINEMATIC FULL-WIDTH HERO HEADER - FULL PAGE & IMMERSIVE */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#0A2472] overflow-hidden text-white py-12 lg:py-0" id="about-hero">
        
        {/* Full-bleed team photo background with deep shadow overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBackgroundImage}
            alt="Indiekraf Collaboration Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none opacity-100 object-center"
          />
          {/* Deep cinematic overlays for absolute readability */}
          <div className="absolute inset-0 bg-[#0A2472]/50" />
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(10,36,114,0.9)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2472]/80 via-[#0A2472]/40 to-transparent" />
          
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerSettings}
            className="max-w-4xl space-y-6 text-left"
          >
            
            {/* Premium Heading with staggered slide-up animation */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-[1.15] text-white"
            >
              {currentT.heroTitle}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-blue-400">
                {currentT.heroTitleHighlight}
              </span>
            </motion.h1>

            {/* Description Narrative with elegant fade-in */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium"
            >
              {currentT.heroDesc}
            </motion.p>

            {/* Metadata Chips - Premium Transparent Capsule Cards with staggered blur entrance */}
            <motion.div 
              variants={staggerSettings}
              className="flex flex-wrap gap-2.5 pt-1"
            >
              {[
                { label: currentT.stats.est, icon: Calendar },
                { label: currentT.stats.location, icon: MapPin },
                { label: currentT.stats.projects, icon: Zap },
                { label: currentT.stats.clients, icon: Users }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        filter: "blur(0px)",
                        transition: { duration: 0.5, ease: "easeOut" } 
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 rounded-[10px] text-xs font-semibold text-white/95 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default shadow-md"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{stat.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. LEADERSHIP & PURPOSE - BALANCED & BORDERLESS CHAPTER */}
      <section className="w-full relative bg-white overflow-hidden py-14 md:py-16 lg:py-20 flex flex-col justify-center" id="about-leaders-purpose">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch w-full">
          
          {/* LEFT: BOARD OF DIRECTORS */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={staggerSettings}
            className="flex flex-col h-full space-y-5"
          >
            <motion.div variants={subtleFadeUp} className="space-y-1.5 lg:min-h-[125px] flex flex-col justify-start">
              <span className="text-xs font-bold tracking-widest text-[#0A2472] uppercase font-mono block">
                {leadershipTagText}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
                {leadershipTitleText}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-lg">
                {leadershipSubtitleText}
              </p>
            </motion.div>

            {/* Profiles - Clean Floating Cards mapped from leadershipList with exact row-aligned height */}
            <div className={`grid gap-5 flex-1 ${leadershipList.length === 2 ? 'grid-rows-2' : 'grid-cols-1'}`}>
              {leadershipList.map((leader: any, index: number) => (
                <motion.div 
                  key={index}
                  variants={subtleFadeUp}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="bg-gradient-to-br from-white to-slate-50/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-[0_4px_24px_rgba(10,36,114,0.03)] border border-slate-200/80 hover:border-[#0A2472]/40 hover:shadow-[0_12px_36px_rgba(10,36,114,0.06)] transition-all duration-300 w-full h-full relative overflow-hidden group"
                >
                  {/* Subtle top decorative border accent */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0A2472] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 sm:gap-5">
                      {/* Avatar / Photo Container - Sleek Circular Border Gradient */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#0A2472]/20 to-[#38BDF8]/20 group-hover:from-[#0A2472] group-hover:to-[#38BDF8] transition-all duration-500 shrink-0 shadow-sm">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 flex items-center justify-center text-[#0A2472] font-sans font-extrabold text-base sm:text-lg relative">
                          <span className="bg-gradient-to-tr from-[#0A2472] to-blue-700 bg-clip-text text-transparent">{leader.initials || (leader.name ? leader.name.substring(0, 2).toUpperCase() : 'LD')}</span>
                          {leader.image && (
                            <img 
                              src={leader.image} 
                              alt={leader.name} 
                              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Header info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold text-[#0A2472] bg-[#0A2472]/5 px-2.5 py-0.5 rounded border border-[#0A2472]/10 uppercase tracking-widest font-mono">
                            {language === 'id' ? (leader.role_id || leader.role_en || 'Leader') : (leader.role_en || leader.role_id || 'Leader')}
                          </span>
                        </div>
                        <h3 className="font-sans font-black text-[#0A2472] text-base sm:text-[17px] leading-snug mt-1.5 break-words group-hover:text-blue-900 transition-colors">
                          {leader.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-blue-500/80 font-bold font-mono tracking-widest uppercase mt-0.5">
                          {language === 'id' ? (leader.subtitle_id || leader.subtitle_en || '') : (leader.subtitle_en || leader.subtitle_id || '')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {leader.email && (
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100/80 text-xs font-semibold text-[#0A2472]/60 hover:text-[#0A2472] transition-colors duration-200 mt-auto">
                      <Mail className="w-3.5 h-3.5 text-[#0A2472]/60 shrink-0" />
                      <a href={`mailto:${leader.email}`} className="hover:underline truncate font-mono text-[11px]">
                        {leader.email}
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: PURPOSE (VISION & MISSION) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={staggerSettings}
            className="flex flex-col h-full space-y-5"
          >
            <motion.div variants={subtleFadeUp} className="space-y-1.5 lg:min-h-[125px] flex flex-col justify-start">
              <span className="text-xs font-bold tracking-widest text-[#0A2472] uppercase font-mono block">
                {currentT.purpose.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
                {currentT.purpose.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-lg">
                {currentT.purpose.subtitle}
              </p>
            </motion.div>

            {/* Purpose Stack with exact same card sizing and height alignment as Leadership */}
            <div className="grid grid-rows-2 gap-5 flex-1">
              
              {/* Vision Card */}
              <motion.div 
                variants={subtleFadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-gradient-to-br from-white to-slate-50/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-[0_4px_24px_rgba(10,36,114,0.03)] border border-slate-200/80 hover:border-[#0A2472]/40 hover:shadow-[0_12px_36px_rgba(10,36,114,0.06)] transition-all duration-300 w-full h-full relative overflow-hidden group"
              >
                {/* Subtle top decorative border accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-sans font-extrabold text-sm shadow-xs border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      {renderIcon(visionIcon, "w-5 h-5")}
                    </div>
                    <span className="text-[9px] font-extrabold text-[#0A2472] bg-[#0A2472]/5 px-2.5 py-0.5 rounded border border-[#0A2472]/10 uppercase tracking-widest font-mono">
                      {currentT.purpose.visi.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-black text-[#0A2472] text-base sm:text-[17px] leading-snug mb-1.5 group-hover:text-blue-900 transition-colors">
                      {visionTitleText}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {currentT.purpose.visi.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100/80 text-xs font-semibold text-[#0A2472]/60 hover:text-[#0A2472] transition-colors duration-200 mt-auto">
                  {renderPurposeIcon()}
                  <a href={purposeLinkUrl} target="_blank" rel="noreferrer" className="hover:underline truncate font-mono text-[11px]">
                    {purposeLinkText}
                  </a>
                </div>
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                variants={subtleFadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="bg-gradient-to-br from-white to-slate-50/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-[0_4px_24px_rgba(10,36,114,0.03)] border border-slate-200/80 hover:border-[#0A2472]/40 hover:shadow-[0_12px_36px_rgba(10,36,114,0.06)] transition-all duration-300 w-full h-full relative overflow-hidden group"
              >
                {/* Subtle top decorative border accent */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-sans font-extrabold text-sm shadow-xs border border-blue-100 group-hover:bg-[#0A2472] group-hover:text-white transition-all duration-300">
                      {renderIcon(missionIcon, "w-5 h-5")}
                    </div>
                    <span className="text-[9px] font-extrabold text-[#0A2472] bg-[#0A2472]/5 px-2.5 py-0.5 rounded border border-[#0A2472]/10 uppercase tracking-widest font-mono">
                      {currentT.purpose.misi.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-black text-[#0A2472] text-base sm:text-[17px] leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                      {missionTitleText}
                    </h3>
                    <ul className="space-y-2">
                      {currentT.purpose.misi.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                          <div className="w-4 h-4 rounded-full bg-blue-50/60 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 text-blue-600">
                            <Check className="w-2.5 h-2.5 font-bold" />
                          </div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100/80 text-xs font-semibold text-[#0A2472]/60 hover:text-[#0A2472] transition-colors duration-200 mt-auto">
                  {renderPurposeIcon()}
                  <a href={purposeLinkUrl} target="_blank" rel="noreferrer" className="hover:underline truncate font-mono text-[11px]">
                    {purposeLinkText}
                  </a>
                </div>
              </motion.div>

            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* 3. LEGALITY SECTION - SIDE-BY-SIDE INTEGRATED DATASHEET */}
      <section className="w-full relative bg-[#EEF3FF] pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-16 lg:pb-20 flex flex-col justify-center" id="about-legal">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            
            {/* Left Narrative with Entrance Animation */}
            <motion.div 
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[10px] sm:text-xs font-bold tracking-widest bg-white text-blue-600 uppercase font-mono shadow-xs border border-blue-200/65 self-start">
                  {renderIcon(legalTagIcon, "w-3.5 h-3.5 text-blue-600")}
                  {legalTagText}
                </div>

                <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
                  {legalTitleText}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-lg">
                  {legalDescText}
                </p>
              </div>

              {/* Verified Security Card with Delayed Fade-in */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-4 bg-white rounded-[10px] flex items-start gap-3 border border-[#0A2472]/30 shadow-xs max-w-lg"
              >
                <div className="w-8 h-8 rounded-[10px] bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                  {renderIcon(legalAlertIcon, "w-4.5 h-4.5")}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider font-mono">STATUS: ACTIVE & VERIFIED</p>
                  <p className="text-[11px] sm:text-xs text-emerald-950 font-semibold leading-relaxed">
                    {legalAlertText}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Structured Corporate Specifications Board with Entrance Animation */}
            <motion.div 
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex"
            >
              <div className="w-full bg-white border border-[#0A2472]/30 rounded-[10px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_30px_rgba(10,36,114,0.02)] hover:border-[#0A2472]/60 transition-all duration-500 relative overflow-hidden group">
                <div className="relative z-10 space-y-6 w-full">
                  {/* Board Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200/80 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{legalLedgerHeader}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0A2472] font-sans">{legalLedgerName}</h4>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-[#0A2472] text-[10px] font-bold font-mono border border-blue-100/50 self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {legalLedgerBadge}
                    </div>
                  </div>

                  {/* Grid of Credentials - 2 Columns Layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {legalItems.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.1 * idx + 0.2, duration: 0.4 }}
                        className="space-y-1.5 py-1 border-b border-slate-100 last:border-0 sm:border-b sm:border-slate-100 sm:last:border-b"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A2472]/40" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                            {item.label}
                          </span>
                        </div>
                        <div className="text-xs sm:text-[13px] text-[#0A2472] font-bold tracking-tight pl-3.5 leading-snug">
                          {item.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Board Footer */}
                <div className="relative z-10 mt-8 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-slate-400 font-mono w-full">
                  <span>{legalLedgerFooterLeft}</span>
                  <span className="text-[#0A2472]/60 font-semibold flex items-center gap-1.5">
                    {renderIcon(legalFooterIcon, "w-3.5 h-3.5 text-[#0A2472]/50")}
                    {legalLedgerFooterRight}
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. METHODOLOGY & APPROACH SECTION */}
      <section className="w-full relative bg-white pt-14 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8 flex flex-col justify-center" id="about-workflow">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 w-full"
        >
          
          {/* Header titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
              {language === 'id' 
                ? (settings['about_approach_title_id'] ?? currentT.howWeWork.title) 
                : (settings['about_approach_title_en'] ?? currentT.howWeWork.title)}
            </h2>
 
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              {language === 'id' 
                ? (settings['about_approach_subtitle_id'] ?? currentT.howWeWork.subtitle) 
                : (settings['about_approach_subtitle_en'] ?? currentT.howWeWork.subtitle)}
            </p>
          </div>
 
          {/* 4 Steps - Borderless Minimal Grid Card with smooth scale-ups */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-120px" }}
            variants={staggerSettings}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentT.howWeWork.steps.map((step, idx) => {
              const stepNum = idx + 1;
              const defaultIcons = ['Lightbulb', 'Sparkles', 'Zap', 'ShieldCheck'];
              const iconName = settings[`about_approach_${stepNum}_icon`] ?? defaultIcons[idx];
              
              const iconMap: Record<string, any> = {
                'Target': Target,
                'ShieldCheck': ShieldCheck,
                'Cpu': Cpu,
                'Zap': Zap,
                'Award': Award,
                'Presentation': Presentation,
                'Sparkles': Sparkles,
                'Lightbulb': Lightbulb
              };
              
              const StepIcon = iconMap[iconName] || Lightbulb;
              const colorClasses = ["bg-[#0A2472]", "bg-[#6366F1]", "bg-[#10B981]", "bg-[#F59E0B]"];
              const colorClass = colorClasses[idx % colorClasses.length];
              
              const stepTitle = language === 'id' 
                ? (settings[`about_approach_${stepNum}_title_id`] ?? step.title) 
                : (settings[`about_approach_${stepNum}_title_en`] ?? step.title);
              const stepDesc = language === 'id' 
                ? (settings[`about_approach_${stepNum}_desc_id`] ?? step.desc) 
                : (settings[`about_approach_${stepNum}_desc_en`] ?? step.desc);
 
              return (
                <motion.div
                  key={idx}
                  variants={subtleFadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="bg-white rounded-[10px] p-6 flex flex-col justify-between space-y-8 shadow-[0_8px_30px_rgba(10,36,114,0.02)] border border-[#0A2472]/30 hover:shadow-[0_20px_40px_rgba(10,36,114,0.06)] transition-all duration-300 cursor-default"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {step.num}
                    </span>
                    <div className={`w-8 h-8 rounded-full ${colorClass} text-white flex items-center justify-center font-bold shadow-xs`}>
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-base text-[#0A2472]">
                      {stepTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                      {stepDesc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </motion.div>
      </section>

      {/* 5. PARTNERS & CLIENTS SEGMENTS */}
      <section className="w-full relative bg-white pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-16 lg:pb-20" id="about-clients">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 w-full"
        >
          
          {/* Header Row at the top */}
          <div className="space-y-3 text-left max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
              {currentT.clientsServed.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              {currentT.clientsServed.subtitle}
            </p>
          </div>

          {/* Clean split layout with 1:1 columns and aligned cards and image heights */}
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-stretch">
            
            {/* Left lists cards */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-120px" }}
              variants={staggerSettings}
              className="space-y-4 flex flex-col justify-between"
              id="clients-segments-list"
            >
              {currentT.clientsServed.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={subtleFadeUp}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="p-5 rounded-[10px] flex items-start gap-4 bg-white border border-[#0A2472]/30 transition-all duration-300 cursor-default flex-1"
                  >
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-blue-50 text-[#0A2472] shadow-none">
                      {renderIcon(item.iconName, "w-5 h-5")}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-bold text-sm text-[#0A2472]">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm leading-relaxed font-medium text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

          </div>

        </motion.div>
      </section>

    </motion.div>
  );
}
