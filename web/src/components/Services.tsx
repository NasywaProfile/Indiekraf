import React from 'react';
import { Newspaper, Layers, GraduationCap, BarChart2, Check, ArrowRight } from 'lucide-react';
import { servicesData } from '../data';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  Newspaper,
  Layers,
  GraduationCap,
  BarChart2,
};

const themeStyles: Record<string, {
  iconBg: string;
  bulletColor: string;
  linkColor: string;
  topBarBg: string;
  glowColor: string;
  glowHex: string;
  borderColor: string;
  accentBg: string;
  textActive: string;
}> = {
  navy: {
    iconBg: 'bg-[#0A2472]/10 text-[#0A2472]',
    bulletColor: 'text-[#0A2472]',
    linkColor: 'text-[#0A2472] hover:text-[#0A2472]/80',
    topBarBg: 'bg-[#0A2472]',
    glowColor: 'from-blue-600/20 to-[#0A2472]/10',
    glowHex: '#0A2472',
    borderColor: 'border-[#0A2472]',
    accentBg: 'bg-[#0A2472]/5',
    textActive: 'text-[#0A2472]',
  },
  ice: {
    iconBg: 'bg-[#2563EB]/10 text-[#2563EB]',
    bulletColor: 'text-[#2563EB]',
    linkColor: 'text-[#2563EB] hover:text-[#2563EB]/80',
    topBarBg: 'bg-[#2563EB]',
    glowColor: 'from-[#2563EB]/20 to-[#0A2472]/10',
    glowHex: '#2563EB',
    borderColor: 'border-[#2563EB]',
    accentBg: 'bg-[#2563EB]/5',
    textActive: 'text-[#2563EB]',
  },
};

interface ServicesProps {
  onScrollTo?: (id: string) => void;
}

export default function Services({ onScrollTo }: ServicesProps) {
  const { style } = useTheme();
  const { t, language, settings } = useLanguage();
  const [activeId, setActiveId] = React.useState('media');

  const servicesList = React.useMemo(() => {
    if (settings && settings['services_pillars_list']) {
      try {
        const parsed = JSON.parse(settings['services_pillars_list']);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any) => ({
            id: p.id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: p.title || '',
            tagline: language === 'id' ? p.tagline_id : (p.tagline_en || p.tagline_id),
            subtitle: language === 'id' ? p.subtitle_id : (p.subtitle_en || p.subtitle_id),
            iconName: p.icon || 'Layers',
            color: p.color || 'blue',
            description: language === 'id' ? p.description_id : (p.description_en || p.description_id),
            linkUrl: p.link ? (p.link.startsWith('#') || p.link.startsWith('/') ? p.link : `https://${p.link}`) : '#',
            bullets: Array.isArray(p.cards) ? p.cards.map((c: any) => language === 'id' ? c.title : (c.title_en || c.title)) : [],
            image_url: p.image_url || '/gambar.jpg',
            btnText: language === 'id' ? `Lihat ${p.title}` : `Explore ${p.title}`,
            img_tag: language === 'id' 
              ? (p.img_tag_id || p.tagline_id) 
              : (p.img_tag_en || p.img_tag_id || p.tagline_en || p.tagline_id),
            img_desc: language === 'id' 
              ? (p.img_desc_id || p.description_id) 
              : (p.img_desc_en || p.img_desc_id || p.description_en || p.description_id),
          }));
        }
      } catch (e) {
        console.error("Failed to parse services_pillars_list", e);
      }
    }
    // Fallback to servicesData from data.ts
    return servicesData.map(s => ({
      id: s.id,
      title: s.title,
      tagline: s.id === 'media' ? (language === 'id' ? 'PUBLISHING UNTUK KREDIBILITAS BRAND' : 'PUBLISHING FOR BRAND CREDIBILITY') :
               s.id === 'studio' ? (language === 'id' ? 'CREATIVE AGENCY BERBASIS PROJECT' : 'PROJECT-BASED CREATIVE AGENCY') :
               s.id === 'academy' ? (language === 'id' ? 'AKADEMI KREATIF UNTUK SDM UNGGUL' : 'CREATIVE ACADEMY FOR EXCELLENT TALENT') :
               (language === 'id' ? 'RISET INDUSTRI KREATIF BERBASIS DATA' : 'DATA-DRIVEN CREATIVE INDUSTRY RESEARCH'),
      subtitle: language === 'id' ? 'LAYANAN INDIEKRAF' : 'INDIEKRAF SERVICES',
      iconName: s.iconName,
      color: s.colorTheme,
      description: s.description,
      linkUrl: s.linkUrl,
      bullets: s.bullets,
      image_url: '/gambar.jpg',
      btnText: s.id === 'media' ? (language === 'id' ? 'Lihat Indiekraf Media' : 'Explore Indiekraf Media') :
               s.id === 'studio' ? (language === 'id' ? 'Lihat Indiekraf Studio' : 'Explore Indiekraf Studio') :
               s.id === 'academy' ? (language === 'id' ? 'Lihat Indiekraf Academy' : 'Explore Indiekraf Academy') :
               (language === 'id' ? 'Lihat Insight Center' : 'Explore Insight Center'),
      img_tag: s.id === 'media' ? (language === 'id' ? 'PORTAL MEDIA & PUBLIKASI' : 'MEDIA PORTAL & PUBLICATION') :
               s.id === 'studio' ? (language === 'id' ? 'STUDIO KREATIF & DEVELOPMENT' : 'CREATIVE STUDIO & DEVELOPMENT') :
               s.id === 'academy' ? (language === 'id' ? 'EDUKASI & WORKSHOP' : 'EDUCATION & WORKSHOP') :
               (language === 'id' ? 'RISET INDUSTRI KREATIF BERBASIS DATA' : 'DATA-DRIVEN CREATIVE INDUSTRY RESEARCH'),
      img_desc: s.id === 'media' ? (language === 'id' ? 'Menjangkau khalayak luas melalui jaringan media partner kami.' : 'Reaching a wide audience through our media partner network.') :
                s.id === 'studio' ? (language === 'id' ? 'Desain identitas brand, UI/UX modern, dan pengembangan website interaktif.' : 'Brand identity design, modern UI/UX, and interactive web development.') :
                s.id === 'academy' ? (language === 'id' ? 'Mencetak SDM profesional melalui program workshop dan kelas bimbingan terarah.' : 'Developing professional talents through workshops and structured guidance classes.') :
                (language === 'id' ? 'Analisis pasar komprehensif untuk merumuskan kebijakan berbasis data terukur.' : 'Comprehensive market analysis to formulate measurable data-driven strategies.'),
    }));
  }, [settings, language]);

  const serviceVisuals = React.useMemo(() => {
    const visuals: Record<string, { image: string; tag: string; description: string }> = {};
    servicesList.forEach((s) => {
      visuals[s.id] = {
        image: s.image_url || '/gambar.jpg',
        tag: s.img_tag || '',
        description: s.img_desc || '',
      };
    });
    return visuals;
  }, [servicesList]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const hasAutoScrolledRef = React.useRef(false);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.98) {
        if (!hasAutoScrolledRef.current) {
          hasAutoScrolledRef.current = true;
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else if (latest < 0.85) {
        hasAutoScrolledRef.current = false;
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Track scrolling items on desktop to update the active sticky visual
  React.useEffect(() => {
    if (servicesList.length === 0) return;
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', // Focused perfectly on the active page section
      threshold: 0.15,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Extracts service ID from the target element ID
          const match = entry.target.id.match(/^service-container-(.+)$/);
          if (match && match[1]) {
            setActiveId(match[1]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each desktop container
    servicesList.forEach((service) => {
      const element = document.getElementById(`service-container-${service.id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [servicesList]);

  const activeIndex = servicesList.findIndex(s => s.id === activeId);
  const activeTheme = activeIndex % 2 === 0 ? themeStyles.navy : themeStyles.ice;

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative min-h-screen flex items-center">
      {/* Background container that safely clips background glow without breaking position: sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Background decorations with dynamic gradient matching active category */}
        {style === 'mesh' && (
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        )}
        
        {/* Active theme glow effect */}
        <div 
          className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: activeTheme?.glowHex || '#0A2472' }}
        />
        <div 
          className="absolute left-10 bottom-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: activeTheme?.glowHex || '#0A2472' }}
        />
      </div>

      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        
        {/* Section Header - Elegant Centered Layout (Mobile/Tablet Only) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 lg:hidden" id="services-header">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight mt-2">
            {t('services.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto font-sans font-medium px-4">
            {t('services.subtitle')}
          </p>
        </div>

        {/* 1. DESKTOP LAYOUT (Sticky side-by-side) */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-start" id="services-desktop-layout">
          
          {/* Left Sticky Column - Header & Image Gallery (Perfect 50/50 with Right Column) */}
          <div className="col-span-6 sticky top-[110px] self-start w-full z-10 space-y-6 pb-6" id="services-sticky-panel">
            {/* Header embedded inside sticky column above the image */}
            <div className="space-y-3 pr-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
                {t('services.title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-sans font-medium">
                {t('services.subtitle')}
              </p>
            </div>

            {/* Sticky Image Card */}
            <div className="relative h-[340px] w-full rounded-[10px] overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={serviceVisuals[activeId]?.image}
                    alt={activeId}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  {/* Elegant overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Pillar Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="text-[10px] font-sans tracking-wider text-white uppercase font-bold bg-[#0A2472] px-3.5 py-2 rounded-[10px] border border-white/10 shadow-sm">
                      {serviceVisuals[activeId]?.tag}
                    </span>
                  </div>

                  {/* Caption description */}
                  <div className="absolute bottom-6 inset-x-6 text-white">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">
                      {serviceVisuals[activeId]?.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Scrolling Column - Clean Typography Content (Balanced 50/50 with Left Column) */}
          <div className="col-span-6 relative" id="services-scrolling-panel" ref={containerRef}>
            {/* Background static vertical track line */}
            <div 
              className="hidden lg:block absolute left-6 top-[118px] bottom-[40px] w-0.5 bg-slate-200/60 rounded-full pointer-events-none" 
              id="services-scroll-track"
            />

            {/* Animated drawing line */}
            <motion.div 
              className="hidden lg:block absolute left-6 top-[118px] bottom-[40px] w-0.5 bg-[#0A2472] rounded-full origin-top pointer-events-none"
              style={{ scaleY }}
              id="services-scroll-line"
            />

            {/* Spacer to push first service content down to align with track line without layout mismatch */}
            <div className="hidden lg:block h-[70px] pointer-events-none" />

            {servicesList.map((service, idx) => {
               const IconComponent = iconMap[service.iconName] || Newspaper;
               const theme = idx % 2 === 0 ? themeStyles.navy : themeStyles.ice;
               const isActive = activeId === service.id;

               return (
                 <div
                   key={service.id}
                   id={`service-container-${service.id}`}
                   className={`flex flex-col justify-start scroll-mt-48 transition-all duration-500 ease-out pl-12 relative h-[428px] pt-12 pb-10 ${
                     isActive 
                       ? 'opacity-100' 
                       : 'opacity-25 hover:opacity-50'
                   }`}
                 >
                   {/* Outer left border wrapper with unified continuous track line and integrated layout */}
                   <div className="transition-all duration-500 flex flex-col justify-start w-full">
                     <div className="space-y-4">
                       {/* Number identifier with custom icon */}
                       <div className="flex items-center space-x-3">
                         <span className={`text-3xl font-sans font-black tracking-wider transition-colors duration-500 ${
                           isActive ? theme.textActive : 'text-slate-300'
                         }`}>
                           {String(idx + 1).padStart(2, '0')}
                         </span>
                         <span className="h-px w-8 bg-slate-200" />
                         <div className={`p-2 rounded-[10px] ${theme.iconBg} flex items-center justify-center shrink-0`}>
                           <IconComponent className="w-4 h-4" />
                         </div>
                       </div>

                       {/* Title */}
                       <h3 className="text-sm sm:text-base md:text-lg font-sans font-extrabold text-[#0A2472] leading-tight">
                         {service.title}
                       </h3>

                       {/* Description */}
                       <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-xl">
                         {service.description}
                       </p>

                       {/* Bullet Points with clean custom card layouts */}
                       <div className="grid grid-cols-2 gap-2 max-w-xl">
                         {service.bullets.map((bullet, index) => (
                           <div 
                             key={index} 
                             className={`flex items-center space-x-2.5 text-xs text-slate-700 font-medium p-2 rounded-[10px] border border-slate-100 transition-all duration-300 ${
                               isActive ? 'bg-white shadow-xs border-slate-200/50' : 'bg-slate-50/50'
                             }`}
                           >
                             <div className={`p-1 rounded-full ${isActive ? theme.iconBg : 'bg-slate-100 text-slate-400'} shrink-0 transition-colors`}>
                               <Check className="w-3 h-3" />
                             </div>
                             <span>{bullet}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })}
          </div>

        </div>

        {/* 2. MOBILE LAYOUT (Responsive Stacked Cards with Beautiful Integrated Images) */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8" id="services-mobile-layout">
          {servicesList.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || Newspaper;
            const theme = idx % 2 === 0 ? themeStyles.navy : themeStyles.ice;
            const visual = serviceVisuals[service.id];

            return (
              <div
                key={service.id}
                className="bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                id={`service-mobile-card-${service.id}`}
              >
                {/* Embed Image Above Content for Mobile */}
                <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={visual?.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[9px] font-sans tracking-wider text-white uppercase font-bold bg-[#0A2472] px-2.5 py-1 rounded">
                      {visual?.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xl font-sans font-black text-white/40 tracking-wider">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm sm:text-base md:text-lg font-sans font-extrabold text-[#0A2472] leading-tight">
                        {service.title}
                      </h3>
                      <div className={`p-2 rounded-[10px] ${theme.iconBg} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">
                      {service.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="grid grid-cols-1 gap-2 mb-6">
                      {service.bullets.map((bullet, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs text-slate-600 font-medium p-2 bg-slate-50/60 rounded-[10px] border border-slate-100/50">
                          <div className={`p-0.5 rounded-full ${theme.iconBg} shrink-0`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


