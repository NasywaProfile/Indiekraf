import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface PortfolioProps {
  isModal?: boolean;
}

export default function Portfolio({ isModal = false }: PortfolioProps) {
  const { t, language, settings } = useLanguage();
  const { style } = useTheme();

  const floatingIcons = [
    { src: settings?.portfolio_hero_image_left || '/icon-kiri.png', alt: 'Icon Kiri', className: 'top-32 left-[2%] lg:left-[5%]' },
    { src: settings?.portfolio_hero_image_right || '/icon-kanan.png', alt: 'Icon Kanan', className: 'top-32 right-[2%] lg:right-[5%]' },
  ];


  const [projects, setProjects] = React.useState<any[]>([
    {
      id: 'mcc',
      image_url: '/gambar.jpg',
      category: 'UI/UX DESIGN',
      category_en: 'UI/UX DESIGN',
      title: 'Malang Creative Center',
      title_en: 'Malang Creative Center',
      tag: 'TERBARU',
      tag_en: 'NEW'
    },
    {
      id: 'batu',
      image_url: '/gambar.jpg',
      category: 'BRANDING',
      category_en: 'BRANDING',
      title: 'Pariwisata Kota Batu',
      title_en: 'Batu City Tourism',
      tag: 'POPULER',
      tag_en: 'POPULAR'
    },
    {
      id: 'umkm',
      image_url: '/gambar.jpg',
      category: 'DIGITAL MARKETING',
      category_en: 'DIGITAL MARKETING',
      title: 'UMKM Go Digital',
      title_en: 'UMKM Go Digital',
      tag: 'TERBAIK',
      tag_en: 'BEST'
    },
  ]);

  React.useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const content = (
    <div className={isModal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>
      
      {/* Header */}
      {!isModal && (
        <div className="text-center max-w-3xl mx-auto mb-16" id="portfolio-header">
          <div className="inline-flex items-center px-3 py-1 rounded-[10px] text-xs font-bold bg-[#0A2472]/5 text-[#0A2472] tracking-wider uppercase font-mono mb-4">
            {t('portfolio.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
            {t('portfolio.title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
            {t('portfolio.subtitle')}
          </p>
        </div>
      )}

      {/* Projects Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isModal ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-8`} id="portfolio-grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-slate-50 rounded-[10px] overflow-hidden border border-slate-100 group shadow-xs hover:shadow-xl transition-all duration-300"
              id={`portfolio-project-${i}`}
            >
              {/* Image box */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image_url || project.image || '/gambar.jpg'}
                  alt={language === 'id' ? project.title : (project.title_en || project.title)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <span>{t('portfolio.viewDetail')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                {/* Floating Tag */}
                { (project.tag || project.tag_en) && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-[10px] text-xs font-bold text-[#0A2472] shadow-sm uppercase">
                  {language === 'id' ? project.tag : (project.tag_en || project.tag)}
                </div>
                )}
              </div>

              {/* Text content */}
              <div className="p-6">
                <p className="text-xs font-bold tracking-widest text-[#0A2472] uppercase font-mono mb-2">
                  {language === 'id' ? project.category : (project.category_en || project.category)}
                </p>
                <h3 className="text-sm sm:text-base md:text-lg font-sans font-bold text-[#0A2472] group-hover:text-[#0A2472] transition-colors line-clamp-1">
                  {language === 'id' ? project.title : (project.title_en || project.title)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );

  if (isModal) {
    return content;
  }

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {!isModal && style !== 'clean' && (
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
              className={`absolute w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] ${className}`}
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

      {content}
    </section>
  );
}
