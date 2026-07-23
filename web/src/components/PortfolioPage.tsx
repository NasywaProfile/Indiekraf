import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Palette,
  Megaphone,
  Calendar,
  BarChart2,
  Mail,
  MessageCircle,
  Search,
  Layout,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onScrollToContact: () => void;
  onPageProgress: () => void;
}

interface Project {
  id: string;
  client: string;
  client_en?: string;
  title: string;
  title_en?: string;
  category: string;
  category_en?: string;
  description: string;
  description_en?: string;
  type?: string;
  image_url?: string;
  btn_text_id?: string;
  btn_text_en?: string;
  link_url?: string;
}

export default function PortfolioPage({ onBackToHome, onScrollToContact, onPageProgress }: PortfolioPageProps) {
  const { language, settings } = useLanguage();
  const { style } = useTheme();

  const leftIcon = settings['portfolio_hero_image_left'] || '/icon-kiri.png';
  const rightIcon = settings['portfolio_hero_image_right'] || '/icon-kanan.png';

  const floatingIcons = [
    { src: leftIcon, alt: 'Icon Kiri', className: 'top-[50%] -translate-y-[50%] left-[2%] lg:left-[5%]' },
    { src: rightIcon, alt: 'Icon Kanan', className: 'top-[50%] -translate-y-[50%] right-[2%] lg:right-[5%]' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

const defaultFilters = [
  { id: 'website', label_id: 'Website & Web Apps', label_en: 'Website & Web Apps' },
  { id: 'branding', label_id: 'Branding & Identitas', label_en: 'Branding & Identity' },
  { id: 'marketing', label_id: 'Digital Marketing', label_en: 'Digital Marketing' },
  { id: 'event', label_id: 'Event & Academy', label_en: 'Event & Academy' },
  { id: 'insight', label_id: 'Riset & Wawasan', label_en: 'Research & Insights' },
];

let dynamicCategories = defaultFilters;

if (settings['portfolio_categories']) {
  try {
    const parsed = JSON.parse(settings['portfolio_categories']);
    if (Array.isArray(parsed)) {
      dynamicCategories = parsed;
    }
  } catch {}
}

const filters = [
  {
    id: 'all',
    label: language === 'id' ? 'Semua Karya' : 'All Works'
  },
  ...dynamicCategories.map(cat => ({
    id: cat.id,
    label: language === 'id' ? cat.label_id : cat.label_en
  }))
];

  const [projects, setProjects] = useState<Project[]>([]);

  React.useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mappedProjects = data.map((item: any) => ({
            id: item.id.toString(),
            client: item.client || 'Client Name',
            client_en: item.client_en || item.client,
            title: item.title || '',
            title_en: item.title_en || item.title || '',
            category: item.category || 'Category',
            category_en: item.category_en || item.category,
            description: item.description || '',
            description_en: item.description_en || item.description || '',
            type: item.category_id || 'website',
            image_url: item.image_url,
            btn_text_id: item.btn_text_id || '',
            btn_text_en: item.btn_text_en || '',
            link_url: item.link_url || '',
          }));
          setProjects(mappedProjects);
        }
      })
      .catch(() => { });
  }, [language]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  const filteredProjects = projects;

  const t = {
    id: {
      badge: settings['portfolio_hero_badge_id'] || "PORTOFOLIO KAMI",
      title: settings['portfolio_hero_title_id'] || "Karya Kreatif Indiekraf",
      titleHighlight: settings['portfolio_hero_titleHighlight_id'] || "Project & Portofolio",
      subtitle: settings['portfolio_hero_subtitle_id'] || "Menelusuri jejak transformasi digital, perancangan identitas brand eksklusif, riset strategis, serta aktivasi ekosistem kreatif yang telah kami tuntaskan bersama berbagai klien istimewa.",
      ctaTitle: "Ready To Build Something Great?",
      ctaSubtitle: "Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya.",
      viewDetail: "Lihat Detail"
    },
    en: {
      badge: settings['portfolio_hero_badge_en'] || "OUR PORTFOLIO",
      title: settings['portfolio_hero_title_en'] || "Indiekraf Creative Works",
      titleHighlight: settings['portfolio_hero_titleHighlight_en'] || "Project & Portfolio",
      subtitle: settings['portfolio_hero_subtitle_en'] || "Tracing the footsteps of digital transformation, exclusive brand identity design, strategic research, and creative ecosystem activation that we have completed with various special clients.",
      ctaTitle: "Ready To Build Something Great?",
      ctaSubtitle: "Contact Indiekraf Team for Service Consultation, Proposal Request, and Cost Estimation.",
      viewDetail: "View Details"
    }
  };

  const ct = language === 'id' ? t.id : t.en;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
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
          variants={containerVariants}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >

          {/* Pill Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest bg-blue-50 text-[#0A2472] border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span>{ct.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.1] mb-6"
          >
            {ct.title}<br />
            <span className="text-[#1e3a8a]">{ct.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {ct.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Filters & Grid Section */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-[10px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 group flex flex-col h-full"
                >
                  {/* Card Header */}
                  <div className={`p-8 text-white relative h-48 flex flex-col justify-end group-hover:bg-[#071d5a] transition-colors duration-500 overflow-hidden ${!project.image_url ? 'bg-[#0A2472]' : ''}`}>
                    {project.image_url && (
                      <>
                        <img src={project.image_url} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472]/90 to-transparent z-0 group-hover:from-[#0A2472]/95 transition-colors duration-500" />
                      </>
                    )}

                    {!project.image_url && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
                    )}

                    <div className="space-y-1 relative z-10">
                      <span className="text-sm font-bold text-white/80 tracking-wide">
                        {language === 'id' ? project.client : (project.client_en || project.client)}
                      </span>
                      <h3 className="text-xl font-sans font-extrabold leading-tight">
                        {language === 'id' ? (project.title || project.title_en) : (project.title_en || project.title)}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body (White) */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex-1">
                      <p className="text-[11px] font-extrabold text-[#0A2472] uppercase tracking-wider mb-2">
                        {language === 'id' ? project.category : (project.category_en || project.category)}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {language === 'id' ? (project.description || project.description_en) : (project.description_en || project.description)}
                      </p>
                    </div>

                    {project.link_url ? (
                      <a
                        href={project.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 w-full py-3 bg-[#f1f5ff] text-[#4338ca] text-xs font-extrabold rounded-[10px] hover:bg-[#2563eb] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
                      >
                        <span>{language === 'id' ? (project.btn_text_id || ct.viewDetail) : (project.btn_text_en || ct.viewDetail)}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    ) : (
                      <button
                        onClick={onPageProgress}
                        className="mt-8 w-full py-3 bg-[#f1f5ff] text-[#4338ca] text-xs font-extrabold rounded-[10px] hover:bg-[#2563eb] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
                      >
                        <span>{language === 'id' ? (project.btn_text_id || ct.viewDetail) : (project.btn_text_en || ct.viewDetail)}</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
