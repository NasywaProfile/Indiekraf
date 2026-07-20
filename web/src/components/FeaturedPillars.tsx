import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const mockupData = [
  {
    id: 'media',
    number: '01',
    title: 'Indiekraf Media',
    category: 'Creative Hub & News',
    image: '/gambar.jpg',
    link: '#media',
  },
  {
    id: 'studio',
    number: '02',
    title: 'Indiekraf Studio',
    category: 'Design & Tech Suite',
    image: '/gambar.jpg',
    link: '#services',
  },
  {
    id: 'academy',
    number: '03',
    title: 'Indiekraf Academy',
    category: 'Talent Acceleration',
    image: '/gambar.jpg',
    link: '#academy',
  },
  {
    id: 'insight',
    number: '04',
    title: 'Indiekraf Insight',
    category: 'Data & Market Research',
    image: '/gambar.jpg',
    link: '#insight',
  },
];

export default function FeaturedPillars() {
  const { style } = useTheme();
  const { settings } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const positionRef = useRef(0);

  const pillarsData = useMemo(() => {
    if (settings && settings.hero_pillars_list) {
      try {
        const parsed = JSON.parse(settings.hero_pillars_list);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        }
      } catch (e) {
        // fallback
      }
    }
    return mockupData;
  }, [settings]);

  const duplicatedData = useMemo(() => [...pillarsData, ...pillarsData], [pillarsData]);

  // Brand-aligned colors matching the logo
  const logoBlueGrad = 'from-[#182b8a]/20 via-[#293ea2]/40 to-[#102a54]/95';
  const logoBorderAccent = 'group-hover:border-[#364eb7]/50 group-hover:shadow-2xl group-hover:shadow-[#182b8a]/20';
  const logoLineColor = 'bg-[#364eb7]';

  // High performance pixel-precise animation loop with absolutely zero jump shifts
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      if (trackRef.current) {
        const delta = time - lastTime;
        lastTime = time;

        // Base scroll velocity in pixels per millisecond
        const baseSpeed = 0.055; 
        const speedMultiplier = isHovered ? 0.2 : 1.0; // Smooth 80% slowdown on hover

        positionRef.current -= baseSpeed * delta * speedMultiplier;

        // Loop seamlessly once half the content passes
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current += halfWidth;
        }

        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      } else {
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      e.preventDefault();
      const targetId = link.replace('#', '');
      
      // Check if target is a services pillar and scroll to the services section container
      const targetPillars = ['media', 'studio', 'academy', 'insight'];
      const isServicesPillar = targetPillars.includes(targetId);
      const elementId = isServicesPillar ? 'services' : targetId;
      
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (!link.startsWith('http://') && !link.startsWith('https://')) {
      e.preventDefault();
      window.open(`https://${link}`, '_blank');
    }
  };

  return (
    <div 
      className="w-full relative z-30 select-none overflow-hidden py-1 bg-transparent" 
      id="pillars"
    >
      {/* Background brand blue glowing aura (if glow theme is active) */}
      {style === 'glow' && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/5 rounded-full blur-[130px]" />
        </div>
      )}

      {/* Full viewport-width seamless slider container */}
      <div className="w-full relative z-10 overflow-hidden px-4">
        {/* Soft elegant gradient blur overlays on left & right sides, fading out at the boundaries */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Dynamic track animated via requestAnimationFrame */}
        <div 
          ref={trackRef}
          className="flex items-center gap-6"
          style={{ width: 'max-content', willChange: 'transform' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedData.map((item, index) => {
            return (
              <a
                href={item.link}
                onClick={(e) => handleClick(e, item.link)}
                key={`${item.id}-${index}`}
                className="group block relative w-[175px] sm:w-[215px] md:w-[250px] lg:w-[265px] h-[115px] sm:h-[140px] md:h-[155px] lg:h-[160px] shrink-0"
                id={`pillar-card-${item.id}-${index}`}
              >
                {/* 
                  GOLDEN CAROUSEL HOVER PATTERN:
                  Outer anchor remains 100% static in dimensions and bounds.
                  Only this inner wrapper div performs the scale transition on hover.
                  This guarantees that hit-testing is robust and never triggers adjacent-card zoom bugs!
                */}
                <div 
                  className={`w-full h-full rounded-[10px] overflow-hidden border border-slate-100 bg-white relative shadow-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl ${logoBorderAccent}`}
                >
                  {/* Mockup Image Container */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    {/* Subtle, beautiful gradient overlay matching brand logo colors */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${logoBlueGrad} mix-blend-multiply opacity-95 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/0 transition-colors duration-300" />
                  </div>

                  {/* Content aligned simple & minimal at bottom left */}
                  <div className="absolute inset-0 z-10 p-3.5 sm:p-4 flex flex-col justify-between pointer-events-none">
                    {/* Top row with modern tag number */}
                    <div className="flex justify-end">
                      <span className="text-[10px] font-mono font-extrabold text-white/35 tracking-widest group-hover:text-white/70 transition-colors duration-300">
                        {item.number}
                      </span>
                    </div>

                    {/* Bottom row: Text aligned bottom-left */}
                    <div className="text-left">
                      {/* Tiny Brand Color Accent Line */}
                      <div className={`w-5 h-0.5 rounded-full mb-2 transition-all duration-300 group-hover:w-8 ${logoLineColor}`} />
                      
                      <span className="text-[8px] font-bold text-white/50 tracking-wider uppercase font-mono block">
                        {item.category}
                      </span>
                      
                      <h4 className="text-xs sm:text-sm font-sans font-bold text-white tracking-tight leading-tight mt-0.5 flex items-center gap-1">
                        {item.title}
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-white" />
                      </h4>
                    </div>
                  </div>

                  {/* High-quality hover light reflection outline */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-[10px] transition-colors duration-300 pointer-events-none" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
