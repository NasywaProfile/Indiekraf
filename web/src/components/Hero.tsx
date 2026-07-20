import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import FeaturedPillars from './FeaturedPillars';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

// Handcrafted SVG line-art icons that match the mockup perfectly:
const NetworkNodesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-14 md:h-14 text-slate-700" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="50" cy="50" r="14" strokeDasharray="3 3" />
    <circle cx="50" cy="50" r="8" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
    <line x1="50" y1="22" x2="50" y2="36" strokeDasharray="2 2" />
    <line x1="22" y1="50" x2="36" y2="50" strokeDasharray="2 2" />
    <line x1="50" y1="64" x2="50" y2="78" strokeDasharray="2 2" />
    <line x1="64" y1="50" x2="78" y2="50" strokeDasharray="2 2" />
    <circle cx="50" cy="18" r="4.5" fill="white" />
    <circle cx="18" cy="50" r="4.5" fill="white" />
    <circle cx="50" cy="82" r="4.5" fill="white" />
    <circle cx="82" cy="50" r="4.5" fill="white" />
    <path d="M30 30 L40 40 M70 70 L60 60 M30 70 L40 60 M70 30 L60 40" strokeDasharray="2 2" />
    <circle cx="30" cy="30" r="2" fill="currentColor" />
    <circle cx="70" cy="70" r="2" fill="currentColor" />
  </svg>
);

const RocketCraneIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-11 md:h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Metallic gradient for the main body */}
      <linearGradient id="rocketBody3D" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="40%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
      {/* Wing left gradient */}
      <linearGradient id="rocketWingLeft" x1="20" y1="50" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      {/* Wing right gradient */}
      <linearGradient id="rocketWingRight" x1="50" y1="50" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      {/* Fire gradient */}
      <linearGradient id="fire3D" x1="50" y1="65" x2="50" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </linearGradient>
      <filter id="glow3D" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* 3D Shadow Plate beneath the Rocket */}
    <ellipse cx="50" cy="85" rx="18" ry="6" fill="black" fillOpacity="0.12" filter="blur(1px)" />

    {/* Fire jet (layered 3D fire) */}
    <path d="M44 65 Q50 95 50 95 Q50 95 56 65 Z" fill="url(#fire3D)" filter="url(#glow3D)" />
    <path d="M47 65 Q50 85 50 85 Q50 85 53 65 Z" fill="#fff" opacity="0.8" />

    {/* Isometric/3D Rocket Fins / Wings (drawn behind body) */}
    {/* Left Fin with extrusion/depth */}
    <path d="M30 65 L44 55 L44 65 Z" fill="#4338ca" />
    <path d="M26 68 L44 55 L30 65 Z" fill="url(#rocketWingLeft)" />
    
    {/* Right Fin with extrusion/depth */}
    <path d="M70 65 L56 55 L56 65 Z" fill="#1e1b4b" />
    <path d="M74 68 L56 55 L70 65 Z" fill="url(#rocketWingRight)" />

    {/* Main 3D Rocket Body */}
    {/* Back/shadow side */}
    <path d="M50 12 C40 25 40 55 42 66 L50 66 Z" fill="#312e81" />
    {/* Front/light side */}
    <path d="M50 12 C60 25 60 55 58 66 L50 66 Z" fill="url(#rocketBody3D)" />

    {/* Nose cone 3D detail */}
    <path d="M50 12 C45 18 43 25 43 28 L50 28 Z" fill="#db2777" />
    <path d="M50 12 C55 18 57 25 57 28 L50 28 Z" fill="#f472b6" />

    {/* 3D Port Hole (Glass bubble with shine) */}
    <circle cx="50" cy="40" r="7" fill="#1e1b4b" />
    <circle cx="50" cy="40" r="6" fill="#38bdf8" />
    <path d="M47 37 A 4 4 0 0 1 53 37" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const BulbGearIcon = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-11 md:h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Gold gradient for 3D bulb glass */}
      <radialGradient id="bulbGlass3D" cx="45%" cy="40%" r="55%" fx="45%" fy="40%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="35%" stopColor="#fbbf24" />
        <stop offset="85%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
      {/* Metallic gradient for the base */}
      <linearGradient id="bulbBase3D" x1="40" y1="65" x2="60" y2="85" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      {/* Glow filter */}
      <filter id="bulbGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* 3D Shadow Plate */}
    <ellipse cx="50" cy="88" rx="14" ry="4" fill="black" fillOpacity="0.1" filter="blur(1px)" />

    {/* Outer glowing energy rings/rays behind */}
    <circle cx="50" cy="42" r="32" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.7" filter="url(#bulbGlow)" />

    {/* Metallic 3D base of bulb */}
    {/* Extruded layers of screw thread */}
    <rect x="42" y="65" width="16" height="5" rx="2" fill="url(#bulbBase3D)" />
    <rect x="44" y="70" width="12" height="4" rx="2" fill="#475569" />
    <rect x="42" y="74" width="16" height="5" rx="2" fill="url(#bulbBase3D)" />
    <path d="M46 79 L54 79 L52 83 L48 83 Z" fill="#1e293b" />

    {/* Bulb Glass Body with 3D gradient shading */}
    <path d="M50 16 
             C32 16, 28 36, 32 48 
             C34 54, 42 59, 42 65 
             L58 65 
             C58 59, 66 54, 68 48 
             C72 36, 68 16, 50 16 Z" 
          fill="url(#bulbGlass3D)" 
          stroke="#b45309" 
          strokeWidth="1.5"
          filter="url(#bulbGlow)" />

    {/* Internal 3D Filament - Glowing Gear */}
    <circle cx="50" cy="40" r="9" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.2" />
    <circle cx="50" cy="40" r="5" fill="#34d399" />
    {/* Small teeth of the gear */}
    <path d="M50 28 L50 32 M50 48 L50 52 M38 40 L42 40 M58 40 L62 40 M42 32 L45 35 M58 48 L55 45 M42 48 L45 45 M58 32 L55 35" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="50" cy="40" r="2" fill="#fff" />

    {/* 3D Highlight sheen on bulb glass */}
    <path d="M36 32 C34 38, 36 44, 38 46" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default function Hero({ onScrollTo }: HeroProps) {
  const { style, accent } = useTheme();
  const { t, settings } = useLanguage();

  // Floating custom icons configuration (positioned safely on sides, hidden on mobile)
  const floatingIcons = [
    { src: settings['hero_icon_left'] || settings['hero.icon_left'] || '/icon-kiri.png', alt: 'Icon Kiri (Roket)', className: 'top-[20%] left-[3%] lg:left-[6%]' },
    { src: settings['hero_icon_right'] || settings['hero.icon_right'] || '/icon-kanan.png', alt: 'Icon Kanan (Laptop)', className: 'top-[18%] right-[3%] lg:right-[6%]' },
  ];

  // Dynamic Styles Lookup Maps
  const accentGradients = {
    blue: 'from-[#0A2472] via-[#0A2472] to-[#0A2472]',
    indigo: 'from-[#0A2472] via-[#0A2472] to-[#0A2472]',
    emerald: 'from-emerald-600 via-teal-600 to-cyan-600',
    amber: 'from-amber-500 via-orange-500 to-rose-500',
  };

  const primaryBtnColors = {
    blue: 'bg-[#0A2472] hover:bg-[#0A2472]/90 text-white',
    indigo: 'bg-[#0A2472] hover:bg-[#0A2472]/90 text-white',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    amber: 'bg-amber-500 hover:bg-amber-600 text-white',
  };

  const badgeStyles = {
    blue: 'bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]',
    indigo: 'bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]',
    emerald: 'bg-emerald-50/70 border-emerald-100/80 text-emerald-600',
    amber: 'bg-amber-50/70 border-amber-100/80 text-amber-700',
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="home" 
      // Elite single page section matching user design requirements with optimized heights and paddings
      className="relative pt-6 pb-10 lg:pt-8 lg:pb-16 lg:h-[calc(100vh-80px)] lg:min-h-[530px] lg:max-h-[810px] flex flex-col justify-between items-center overflow-hidden bg-radial from-slate-50/30 via-white to-white"
    >
      {/* Background Ornament Handler */}
      {style === 'dots' && (
        <div className="absolute inset-0 z-0 opacity-15 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <svg
            className="w-full max-w-5xl h-auto"
            viewBox="0 0 1000 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 180 C80 180, 100 200, 150 190 S200 170, 250 185 S300 210, 350 200 S400 160, 480 180 S550 220, 620 200 S700 170, 780 190 S850 220, 950 200"
              stroke="rgba(24, 43, 138, 0.2)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <path
              d="M80 230 C120 220, 180 240, 220 225 S280 190, 340 210 S420 250, 500 230 S600 190, 700 215 S800 240, 900 220"
              stroke="rgba(54, 78, 183, 0.12)"
              strokeWidth="2"
            />
            <circle cx="150" cy="190" r="4" fill="#182b8a" />
            <circle cx="340" cy="210" r="5" fill="#364eb7" />
            <circle cx="500" cy="230" r="4" fill="#10b981" />
            <circle cx="700" cy="215" r="4" fill="#f59e0b" />
            <circle cx="850" cy="220" r="6" fill="#ec4899" />
          </svg>
        </div>
      )}

      {style === 'mesh' && (
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none select-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {style === 'glow' && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[15%] right-[20%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Floating Decorative 3D Images */}
      {style !== 'clean' && (
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block" style={{ perspective: '1000px' }}>
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
              id={`floating-icon-${index}`}
            >
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Copy Wrapper - takes upper center space dynamically */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={staggerContainer}
        className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 relative z-20 text-center pt-3 sm:pt-4 lg:pt-6 pb-2"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-[10px] mb-2 text-[9px] sm:text-[10px] md:text-xs font-semibold border transition-colors duration-300 ${badgeStyles[accent]}`}
          id="hero-badge"
        >
          <Sparkles className="w-3 h-3 text-current" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.2] max-w-3xl mx-auto"
          id="hero-headline"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="mt-3 text-[10px] sm:text-xs md:text-[13px] text-slate-500 max-w-xl mx-auto leading-relaxed font-normal opacity-90"
          id="hero-subheading"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-row gap-3.5 justify-center items-center w-full max-w-xs sm:max-w-md mx-auto"
          id="hero-buttons"
        >
          <button
            onClick={() => onScrollTo(settings['hero_cta_primary_link'] || 'services')}
            className={`w-auto inline-flex items-center justify-center px-6 py-2.5 text-xs sm:text-sm md:text-base font-extrabold rounded-[10px] shadow-lg shadow-[#0A2472]/15 hover:shadow-xl hover:shadow-[#0A2472]/20 transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${primaryBtnColors[accent]}`}
            id="hero-cta-primary"
          >
            {t('hero.btnPrimary')}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onScrollTo(settings['hero_cta_secondary_link'] || 'about')}
            className="w-auto inline-flex items-center justify-center px-6 py-2.5 text-xs sm:text-sm md:text-base font-bold rounded-[10px] text-[#0A2472] bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            id="hero-cta-secondary"
          >
            {t('hero.btnSecondary')}
          </button>
        </motion.div>
      </motion.div>

      {/* FeaturedPillars infinite marquee embedded directly inside the Hero container at bottom */}
      <div className="relative z-30 w-full mt-6 sm:mt-8 lg:mt-10">
        <FeaturedPillars />
      </div>

      {/* Hero Bottom Curved Divider */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}
