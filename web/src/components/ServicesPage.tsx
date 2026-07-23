import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  Newspaper,
  Layers,
  GraduationCap,
  BarChart2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Megaphone,
  Share2,
  FileText,
  Smartphone,
  Globe,
  Palette,
  Layout,
  Briefcase,
  Users,
  Award,
  Compass,
  TrendingUp,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

interface ServicesPageProps {
  onBackToHome: () => void;
  onScrollToContact: () => void;
}

// Handcrafted SVG line-art icons that match the home hero:
const RocketCraneIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-10 h-10 md:w-11 md:h-11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="rocketBody3D"
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="40%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
      <linearGradient
        id="rocketWingLeft"
        x1="20"
        y1="50"
        x2="50"
        y2="80"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient
        id="rocketWingRight"
        x1="50"
        y1="50"
        x2="80"
        y2="80"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient
        id="fire3D"
        x1="50"
        y1="65"
        x2="50"
        y2="95"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </linearGradient>
      <filter id="glow3D" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <ellipse
      cx="50"
      cy="85"
      rx="18"
      ry="6"
      fill="black"
      fillOpacity="0.12"
      filter="blur(1px)"
    />
    <path
      d="M44 65 Q50 95 50 95 Q50 95 56 65 Z"
      fill="url(#fire3D)"
      filter="url(#glow3D)"
    />
    <path d="M47 65 Q50 85 50 85 Q50 85 53 65 Z" fill="#fff" opacity="0.8" />
    <path d="M30 65 L44 55 L44 65 Z" fill="#4338ca" />
    <path d="M26 68 L44 55 L30 65 Z" fill="url(#rocketWingLeft)" />
    <path d="M70 65 L56 55 L56 65 Z" fill="#1e1b4b" />
    <path d="M74 68 L56 55 L70 65 Z" fill="url(#rocketWingRight)" />
    <path d="M50 12 C40 25 40 55 42 66 L50 66 Z" fill="#312e81" />
    <path d="M50 12 C60 25 60 55 58 66 L50 66 Z" fill="url(#rocketBody3D)" />
    <path d="M50 12 C45 18 43 25 43 28 L50 28 Z" fill="#db2777" />
    <path d="M50 12 C55 18 57 25 57 28 L50 28 Z" fill="#f472b6" />
    <circle cx="50" cy="40" r="7" fill="#1e1b4b" />
    <circle cx="50" cy="40" r="6" fill="#38bdf8" />
    <path
      d="M47 37 A 4 4 0 0 1 53 37"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const BulbGearIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-10 h-10 md:w-11 md:h-11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="bulbGlass3D"
        cx="45%"
        cy="40%"
        r="55%"
        fx="45%"
        fy="40%"
      >
        <stop offset="0%" stopColor="#fff" />
        <stop offset="35%" stopColor="#fbbf24" />
        <stop offset="85%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
      <linearGradient
        id="bulbBase3D"
        x1="40"
        y1="65"
        x2="60"
        y2="85"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <filter id="bulbGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <ellipse
      cx="50"
      cy="88"
      rx="14"
      ry="4"
      fill="black"
      fillOpacity="0.1"
      filter="blur(1px)"
    />
    <circle
      cx="50"
      cy="42"
      r="32"
      stroke="#fef08a"
      strokeWidth="1.5"
      strokeDasharray="4 8"
      opacity="0.7"
      filter="url(#bulbGlow)"
    />
    <rect x="42" y="65" width="16" height="5" rx="2" fill="url(#bulbBase3D)" />
    <rect x="44" y="70" width="12" height="4" rx="2" fill="#475569" />
    <rect x="42" y="74" width="16" height="5" rx="2" fill="url(#bulbBase3D)" />
    <path d="M46 79 L54 79 L52 83 L48 83 Z" fill="#1e293b" />
    <path
      d="M50 16 C32 16, 28 36, 32 48 C34 54, 42 59, 42 65 L58 65 C58 59, 66 54, 68 48 C72 36, 68 16, 50 16 Z"
      fill="url(#bulbGlass3D)"
      stroke="#b45309"
      strokeWidth="1.5"
      filter="url(#bulbGlow)"
    />
    <circle
      cx="50"
      cy="40"
      r="9"
      fill="#10b981"
      fillOpacity="0.2"
      stroke="#10b981"
      strokeWidth="1.2"
    />
    <circle cx="50" cy="40" r="5" fill="#34d399" />
    <path
      d="M50 28 L50 32 M50 48 L50 52 M38 40 L42 40 M58 40 L62 40 M42 32 L45 35 M58 48 L55 45 M42 48 L45 45 M58 32 L55 35"
      stroke="#10b981"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="50" cy="40" r="2" fill="#fff" />
    <path
      d="M36 32 C34 38, 36 44, 38 46"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

function ServiceSectionItem({
  service,
  t,
  language,
  handleContactService,
}: any) {
  const { scrollYProgress } = useScroll({
    target: service.ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={service.ref} className="pt-4 first:pt-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 pt-12 border-t border-slate-100 first:border-0 first:pt-0"
      >
        {/* Left Header Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-32 self-start lg:pr-10 xl:pr-16">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-[10px] ${service.accentColor} shrink-0`}
              >
                {service.icon}
              </div>
              <div className="flex flex-col pt-0.5">
                <p className="text-[9px] font-bold tracking-widest uppercase text-slate-900 leading-tight mb-1">
                  {service.tagline}
                </p>
                <p className="text-[8px] font-semibold tracking-widest uppercase text-slate-500">
                  {service.subtitle || (language === "id" ? "LAYANAN INDIEKRAF" : "INDIEKRAF SERVICES")}
                </p>
              </div>
            </div>
            <h2 className="text-3xl font-display font-extrabold text-[#0A2472] tracking-tight">
              {service.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {service.description}
            </p>
            <div>
              <a
                href={`https://${service.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-slate-300 rounded-[10px] text-[11px] font-semibold text-slate-700 bg-white transition-all duration-300 shadow-sm group"
              >
                <span>{service.link}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>
        {/* Right Content Grid */}
        <div className="lg:col-span-8 lg:pl-10 xl:pl-16 relative">
          {/* Static Background Line */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-slate-200/80" />

          {/* Animated Scroll Line */}
          <motion.div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-[3px] -ml-[1px] bg-[#0A2472] rounded-full origin-top"
            style={{ scaleY }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {service.cards.map((card: any, cardIdx: number) => (
              <motion.div
                key={cardIdx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: cardIdx * 0.1,
                  ease: "easeOut",
                }}
                className="bg-white rounded-[10px] p-6 lg:p-7 border border-slate-200 hover:border-[#0A2472]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-[15px] text-[#0A2472] leading-snug">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  )}
                  {"list" in card && card.list && (
                    <ul className="space-y-2 text-xs text-slate-500 font-medium">
                      {card.list.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function ServicesPage({
  onBackToHome,
  onScrollToContact,
}: ServicesPageProps) {
  const { language, settings } = useLanguage();
  const { style, accent } = useTheme();

  // Refs for smooth scrolling to sections
  const mediaRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const academyRef = useRef<HTMLDivElement>(null);
  const insightRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactService = (serviceName: string, category: string) => {
    // Scroll to contact form
    onScrollToContact();

    // Set a small delay to let scroll finish, then we can pre-fill or focus if possible
    // We can also trigger WhatsApp directly with prefilled text
    const message =
      language === "id"
        ? `Halo Indiekraf, saya tertarik dengan layanan ${serviceName} di bagian Indiekraf ${category}. Boleh minta info lebih lanjut?`
        : `Hello Indiekraf, I am interested in the ${serviceName} service under Indiekraf ${category}. Could I get more information?`;

    // Store message in localStorage so CTA component can read it if needed
    localStorage.setItem("prefilled_service_message", message);

    // Dispatch custom event so CTA or other components can update
    const event = new CustomEvent("select_service_contact", {
      detail: { message },
    });
    window.dispatchEvent(event);
  };

  const pageEntrance = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardEntrance = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const t = {
    id: {
      backBtn: "Kembali ke Beranda",
      badge: settings['services_hero_badge_id'] ?? "INDIEKRAF MEDIA & KREATIF | LAYANAN",
      title: settings['services_hero_title_id'] ?? "Layanan Terbaik untuk",
      titleHighlight: settings['services_hero_titleHighlight_id'] ?? "Pertumbuhan Bisnis Anda",
      subtitle: settings['services_hero_subtitle_id'] ?? "Kami mengintegrasikan riset data, pengembangan SDM unggul, agensi kreatif modern, dan penerbitan media tepercaya untuk menghadirkan solusi transformasi bisnis yang berkelanjutan.",
      contactBtn: "HUBUNGI TERKAIT INI",
      footerPartner: "Kemitraan Indiekraf",
      footerPartnerDesc: "MALANG, JAWA TIMUR - EST. 2018",
    },
    en: {
      backBtn: "Back to Home",
      badge: settings['services_hero_badge_en'] ?? "INDIEKRAF MEDIA & CREATIVE | SERVICES",
      title: settings['services_hero_title_en'] ?? "The Best Services for",
      titleHighlight: settings['services_hero_titleHighlight_en'] ?? "Your Business Growth",
      subtitle: settings['services_hero_subtitle_en'] ?? "We integrate data research, outstanding talent development, modern creative agency, and trusted media publishing to deliver sustainable business transformation solutions.",
      contactBtn: "CONTACT ABOUT THIS",
      footerPartner: "Indiekraf Partnerships",
      footerPartnerDesc: "MALANG, EAST JAVA - EST. 2018",
    },
  };

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

  const getRefForTarget = (target: string) => {
    switch (target) {
      case 'media': return mediaRef;
      case 'studio': return studioRef;
      case 'academy': return academyRef;
      case 'insight': return insightRef;
      default: return null;
    }
  };

  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Newspaper': return <Newspaper className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'BarChart2': return <BarChart2 className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      default: return <Layers className={className} />;
    }
  };

  // Services Data for Sticky Cards
  const defaultServicesData = [
    {
      id: "media",
      ref: mediaRef,
      title: "Indiekraf Media",
      tagline:
        language === "id"
          ? "PUBLISHING UNTUK KREDIBILITAS BRAND"
          : "PUBLISHING FOR BRAND CREDIBILITY",
      icon: <Newspaper className="w-5 h-5" />,
      color: "purple",
      description:
        language === "id"
          ? "Portal media ekonomi dan industri kreatif terkemuka di Indonesia dengan jangkauan pembaca yang luas dan tertarget. Bantu brand Anda tampil di media kredibel."
          : "Leading creative economy & industry media portal in Indonesia with a wide and targeted readership. Help your brand gain high-level credibility and visibility.",
      link: "www.indiekraf.com",
      accentColor: "bg-purple-50 text-purple-600",
      borderHover: "hover:border-purple-600/30",
      shadowHover: "hover:shadow-purple-500/5",
      textAccent: "group-hover:text-purple-600",
      cards: [
        {
          title: "Advertisement",
          icon: <Megaphone className="w-5 h-5" />,
          description:
            language === "id"
              ? "Pemasangan banner strategis dan penempatan konten promosi di situs web utama Indiekraf."
              : "Strategic banner placements and promotional contents on the main Indiekraf website.",
        },
        {
          title: "Media Placement",
          icon: <Share2 className="w-5 h-5" />,
          description:
            language === "id"
              ? "Publikasi artikel review, profil bisnis, dan press release terintegrasi di platform media kami."
              : "Publication of review articles, business profiles, and press releases integrated on our media platform.",
        },
        {
          title: "Press Release",
          icon: <FileText className="w-5 h-5" />,
          description:
            language === "id"
              ? "Distribusi berita resmi perkembangan perusahaan, peluncuran produk baru, dan rilis pers ke publik."
              : "Distribution of official company updates, new product launches, and press releases to the public.",
        },
      ],
    },
    {
      id: "studio",
      ref: studioRef,
      title: "Indiekraf Studio",
      tagline:
        language === "id"
          ? "CREATIVE AGENCY BERBASIS PROJECT"
          : "PROJECT-BASED CREATIVE AGENCY",
      icon: <Layers className="w-5 h-5" />,
      color: "blue",
      description:
        language === "id"
          ? "Layanan kreatif lengkap berorientasi hasil untuk menyukseskan transformasi digital bisnis Anda, mulai dari pembentukan brand hingga pengembangan teknologi canggih."
          : "Full creative result-oriented solutions designed to guide your business's digital transformation journey, from brand strategy development to cutting-edge tech integration.",
      link: "www.indiekraf.com",
      accentColor: "bg-blue-50 text-blue-600",
      borderHover: "hover:border-blue-600/30",
      shadowHover: "hover:shadow-blue-500/5",
      textAccent: "group-hover:text-blue-600",
      cards: [
        {
          title: "Digital Marketing",
          icon: <TrendingUp className="w-5 h-5" />,
          list: [
            "Social Media Management",
            "Content Creation & SEO",
            "E-Commerce Handling",
          ],
        },
        {
          title: "Branding & Graphic Design",
          icon: <Palette className="w-5 h-5" />,
          list: ["Brand Identity", "Key Visual Design", "Packaging & Label"],
        },
        {
          title: "UI/UX Design",
          icon: <Layout className="w-5 h-5" />,
          list: [
            "Website & Mobile App Design",
            "Dashboard Design",
            "UX Audit & Testing",
          ],
        },
        {
          title: "Web Development",
          icon: <Globe className="w-5 h-5" />,
          list: [
            "Company Profile",
            "E-Commerce Website",
            "Custom Web Application",
          ],
        },
        {
          title: "Apps Development",
          icon: <Smartphone className="w-5 h-5" />,
          list: ["Android Native", "iOS Native", "Hybrid Mobile Apps"],
        },
      ],
    },
    {
      id: "academy",
      ref: academyRef,
      title: "Indiekraf Academy",
      tagline:
        language === "id"
          ? "AKADEMI KREATIF UNTUK SDM UNGGUL"
          : "CREATIVE ACADEMY FOR EXCELLENT TALENT",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "orange",
      description:
        language === "id"
          ? "Laboratorium akademik nonformal untuk mencetak talenta unggul industri kreatif Indonesia melalui kurikulum adaptif berbasis kebutuhan industri nyata."
          : "Nonformal academic laboratory designed to foster outstanding creative industry talents in Indonesia through industry-aligned, adaptive curriculums.",
      link: "www.indiekraf.com",
      accentColor: "bg-orange-50 text-orange-600",
      borderHover: "hover:border-orange-600/30",
      shadowHover: "hover:shadow-orange-500/5",
      textAccent: "group-hover:text-orange-600",
      cards: [
        {
          title: "Program Activation",
          icon: <Sparkles className="w-5 h-5" />,
          description:
            language === "id"
              ? "Penyelenggaraan event kreatif, bazaar, kompetisi, festival, & pameran berskala regional dan nasional."
              : "Creation and execution of creative events, bazaars, competitions, festivals, & high-impact exhibitions.",
        },
        {
          title: "In House Training",
          icon: <Briefcase className="w-5 h-5" />,
          description:
            language === "id"
              ? "Penyusunan kurikulum pelatihan dan pembinaan customized sesuai target transformasi kompetensi internal perusahaan."
              : "Customized internal corporate competency training and workforce upskilling programs aligned to business objectives.",
        },
        {
          title: language === "id" ? "Praktisi Mengajar" : "Practitioner Teaching",
          icon: <Users className="w-5 h-5" />,
          description:
            language === "id"
              ? "Sesi kuliah tamu, pendampingan, mentorship, & kelas pemateri ahli dari ekosistem kreatif langsung ke institusi."
              : "Guest lectures, academic panels, specialized mentoring, and expert speaker alignment for educational institutes.",
        },
        {
          title: language === "id" ? "Creative Tour" : "Creative Tour",
          icon: <Compass className="w-5 h-5" />,
          description:
            language === "id"
              ? "Kunjungan edukatif terarah langsung ke sentra industri, studio agensi kreatif, dan digital hub penunjang riset mandiri."
              : "Interactive exposure tours directly to major creative centers, industry leaders, and tech ecosystems.",
        },
        {
          title: "Internship Program",
          icon: <Award className="w-5 h-5" />,
          description:
            language === "id"
              ? "Fasilitasi program magang industri intensif bersertifikat untuk siswa, mahasiswa, dan guru pembimbing vokasi."
              : "Facilitating structured certified apprenticeship programs for students, academics, and vocational educators.",
        },
        {
          title: language === "id" ? "Sertifikasi BNSP" : "BNSP Certification",
          icon: <ClipboardList className="w-5 h-5" />,
          description:
            language === "id"
              ? "Workshop persiapan, pembekalan materi kompetensi profesi, dan fasilitasi uji kompetensi bersertifikat BNSP."
              : "Preparation workshops, competency mapping, and official coordination for BNSP professional certification.",
        },
      ],
    },
    {
      id: "insight",
      ref: insightRef,
      title: "Indiekraf Insight Center",
      tagline:
        language === "id"
          ? "RISET INDUSTRI KREATIF BERBASIS DATA"
          : "DATA-DRIVEN CREATIVE INDUSTRY RESEARCH",
      icon: <BarChart2 className="w-5 h-5" />,
      color: "emerald",
      description:
        language === "id"
          ? "Pusat riset strategis penyedia data primer komprehensif ekonomi kreatif dan pariwisata guna penyusunan strategi bisnis dan perumusan kebijakan publik yang akurat."
          : "A strategic market intelligence center providing primary creative sector insights, enabling accurate digital transformation strategies and policy formations.",
      link: "www.indiekraf.com",
      accentColor: "bg-emerald-50 text-emerald-600",
      borderHover: "hover:border-emerald-600/30",
      shadowHover: "hover:shadow-emerald-500/5",
      textAccent: "group-hover:text-emerald-600",
      cards: [
        {
          title: language === "id" ? "Riset Produk & Digital" : "Product & Digital Research",
          icon: <BarChart2 className="w-5 h-5" />,
          description:
            language === "id"
              ? "Analisis segmentasi pasar, pemetaan target perilaku pengguna (user research), kelayakan pasar, & pengembangan blueprint digital produk."
              : "Comprehensive market segmentation analysis, target user research mapping, feasibility analysis, & digital product blueprinting.",
        },
        {
          title: language === "id" ? "Kebijakan Publik" : "Public Policy",
          icon: <FileText className="w-5 h-5" />,
          description:
            language === "id"
              ? "Penyusunan naskah akademik riset kebijakan, pemetaan dampak makro-mikro industri, & formulasi policy research untuk pemerintah / institusi."
              : "Academic policy writing, mapping industry impact assessments, and formulating data-driven research for governments or key agencies.",
        },
        {
          title: language === "id" ? "Pengembangan Komunitas" : "Community Development",
          icon: <Users className="w-5 h-5" />,
          description:
            language === "id"
              ? "Studi pola kolaborasi, pemetaan simpul komunitas pelaku kreatif lokal, & perumusan rancangan strategi pertumbuhan ekosistem berkelanjutan."
              : "Mapping structural networks, organizing local community collaborations, & formulating frameworks for sustainable sector growth.",
        },
        {
          title: language === "id" ? "Kota Kreatif" : "Creative City",
          icon: <MapPin className="w-5 h-5" />,
          description:
            language === "id"
              ? "Penyusunan peta jalan (roadmap) daerah kreatif, analisis potensi ekonomi lokal, & pendampingan sertifikasi kota kreatif skala nasional."
              : "Consulting roadmaps for local creative cities, analyzing local development indices, and assisting in regional certification processes.",
        },
      ],
    },
  ];

  const getDynamicServices = () => {
    if (settings['services_pillars_list']) {
      try {
        const parsed = JSON.parse(settings['services_pillars_list']);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any) => ({
            id: p.id || 'media',
            ref: getRefForTarget(p.id),
            title: p.title || '',
            tagline: (language === 'id' ? p.tagline_id : (p.tagline_en || p.tagline_id)) || p.img_tag_id || p.img_tag_en || p.title || 'LAYANAN INDIEKRAF',
            subtitle: (language === 'id' ? p.subtitle_id : (p.subtitle_en || p.subtitle_id)) || p.img_tag_id || p.img_tag_en || p.title || 'LAYANAN INDIEKRAF',
            icon: renderIcon(p.icon || 'Layers', 'w-5 h-5'),
            color: p.color || 'blue',
            description: language === 'id' ? p.description_id : (p.description_en || p.description_id),
            link: p.link || 'www.indiekraf.com',
            accentColor: `bg-${p.color}-50 text-${p.color}-600`,
            borderHover: `hover:border-${p.color}-600/30`,
            shadowHover: `hover:shadow-${p.color}-500/5`,
            textAccent: `group-hover:text-${p.color}-600`,
            image_url: p.image_url || '/gambar.jpg',
            cards: Array.isArray(p.cards) ? p.cards.map((c: any) => ({
              title: language === 'id' ? c.title : (c.title_en || c.title),
              title_en: c.title_en || c.title,
              description: language === 'id' ? c.description_id : (c.description_en || c.description_id),
              list: Array.isArray(c.list) ? c.list : undefined
            })) : []
          }));
        }
      } catch (e) {}
    }
    return defaultServicesData;
  };

  const servicesData = getDynamicServices();

  const overviewCards = servicesData.map((s: any) => ({
    id: s.id,
    title: s.id === "insight" ? "Insight" : s.title.replace("Indiekraf ", ""),
    subtitle: (s.tagline ? String(s.tagline).split(" ")[0] : (s.title || "Layanan")) + " & more",
    icon: () => s.icon,
    color: s.color,
    bgClass: `bg-${s.color === "emerald" ? "emerald" : s.color}-50/75 border-${s.color === "emerald" ? "emerald" : s.color}-100 hover:border-${s.color === "emerald" ? "emerald" : s.color}-300 hover:bg-${s.color === "emerald" ? "emerald" : s.color}-50`,
    iconClass: `bg-${s.color === "emerald" ? "emerald" : s.color}-100 text-${s.color === "emerald" ? "emerald" : s.color}-600`,
    ref: s.ref,
    badgeColor:
      s.color === "emerald"
        ? "bg-emerald-500"
        : s.color === "purple"
          ? "bg-purple-500"
          : s.color === "blue"
            ? "bg-blue-500"
            : "bg-orange-500",
  }));

  const badgeStyles = {
    blue: "bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]",
    indigo: "bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]",
    emerald: "bg-emerald-50/70 border-emerald-100/80 text-emerald-600",
    amber: "bg-amber-50/70 border-amber-100/80 text-amber-700",
  };

  const floatingIcons = [
    { src: settings['services_hero_image_left'] || '/icon-kiri.png', alt: 'Icon Kiri', className: 'top-[50%] -translate-y-[50%] left-[2%] lg:left-[5%]' },
    { src: settings['services_hero_image_right'] || '/icon-kanan.png', alt: 'Icon Kanan', className: 'top-[50%] -translate-y-[50%] right-[2%] lg:right-[5%]' },
  ];


  return (
    <div className="w-full bg-white relative">
      {/* 1. Header Section */}
      <section className="w-full pt-20 pb-16 bg-white relative overflow-hidden">
        {style !== 'clean' && (
          <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{ perspective: '1000px' }}>
            {floatingIcons.map(({ src, alt, className }, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -20, 0],
                  rotateX: [0, 10, 0],
                  rotateY: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 1.5
                }}
                className={`absolute w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] ${className}`}
              >
                <img 
                  src={src} 
                  alt={alt} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          
          {/* Pill Badge */}
          <motion.div 
            variants={cardEntrance}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest bg-blue-50 text-[#0A2472] border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span>{t[language as keyof typeof t].badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={cardEntrance}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.1] mb-6"
          >
            {t[language as keyof typeof t].title}<br />
            <span className="text-[#1e3a8a]">{t[language as keyof typeof t].titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={cardEntrance}
            className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {t[language as keyof typeof t].subtitle}
          </motion.p>
          


        </motion.div>
      </section>

      {/* 2. Services Navigation Pills */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {getDynamicButtons().map((btn: any, idx: number) => {
              const targetRef = getRefForTarget(btn.target);
              return (
                <div 
                  key={idx}
                  onClick={() => targetRef && scrollToSection(targetRef)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[10px] bg-white border border-slate-200 shadow-sm text-xs font-bold text-${btn.color}-700 hover:shadow-md hover:border-${btn.color}-300 transition-all cursor-pointer`}
                >
                   {renderIcon(btn.icon, `w-4 h-4 text-${btn.color}-600`)}
                   <span>{btn.title}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Service Cards list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 mb-24">
        {servicesData.map((service, idx) => (
          <ServiceSectionItem
            key={service.id}
            service={service}
            t={t}
            language={language}
            handleContactService={handleContactService}
          />
        ))}
      </div>
    </div>
  );
}
