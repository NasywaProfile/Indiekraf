import React from 'react';
import * as LucideIcons from 'lucide-react';
import { statsData } from '../data';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  Users: LucideIcons.Users,
  TrendingUp: LucideIcons.TrendingUp,
  Globe: LucideIcons.Globe,
  Eye: LucideIcons.Eye,
};

function AnimatedNumber({ value }: { value: string }) {
  const numericString = value.replace(/[^0-9]/g, '');
  const target = parseInt(numericString, 10) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const hasDots = value.includes('.');

  const [current, setCurrent] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let observer: IntersectionObserver;
    let animationFrameId: number;

    const startAnimation = () => {
      const duration = 1200; // 1.2 seconds animation duration
      const startTime = performance.now();
      
      // Let's start the animation from 70% of the target value (or 0 if target is small, e.g. 10)
      const startValue = target > 50 ? Math.floor(target * 0.7) : 0;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
        setCurrent(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(update);
        } else {
          setCurrent(target);
        }
      };

      animationFrameId = requestAnimationFrame(update);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect(); // Only animate once when it comes into view
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [target]);

  // Format with Indonesian thousand separator if hasDots is true
  const formatNumber = (num: number) => {
    if (hasDots) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return num.toString();
  };

  return (
    <span ref={elementRef} className="tabular-nums">
      {formatNumber(current)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { style, accent } = useTheme();
  const { t, settings, language } = useLanguage();

  // Accent mapping helper
  const textAccents = {
    blue: 'text-[#0A2472]',
    indigo: 'text-[#0A2472]',
    emerald: 'text-emerald-600',
    amber: 'text-amber-500',
  };

  const bgAccents = {
    blue: 'bg-[#0A2472]/5 text-[#0A2472] group-hover:bg-[#0A2472] group-hover:text-white',
    indigo: 'bg-[#0A2472]/5 text-[#0A2472] group-hover:bg-[#0A2472] group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
  };

  const statsList = React.useMemo(() => {
    if (settings && settings['stats_list_data']) {
      try {
        return JSON.parse(settings['stats_list_data']) as any[];
      } catch (e) {
        console.error('Failed to parse stats_list_data', e);
      }
    }
    // Fallback to legacy structure using statsData mapping
    return statsData.map(stat => {
      const dynamicIconName = stat.id === 'visitor' ? (settings?.['stat_visitor_icon'] || settings?.['stat_visitors_icon'] || stat.iconName) :
                              stat.id === 'follower' ? (settings?.['stat_follower_icon'] || settings?.['stat_followers_icon'] || stat.iconName) :
                              stat.id === 'channel' ? (settings?.['stat_channel_icon'] || settings?.['stat_channels_icon'] || stat.iconName) :
                              stat.id === 'reach' ? (settings?.['stat_reach_icon'] || stat.iconName) : stat.iconName;
      const dynamicVal = stat.id === 'visitor' ? (settings?.['stat_visitors'] || stat.value) :
                         stat.id === 'follower' ? (settings?.['stat_followers'] || stat.value) :
                         stat.id === 'channel' ? (settings?.['stat_channels'] || stat.value) :
                         stat.id === 'reach' ? (settings?.['stat_reach'] || stat.value) : stat.value;
      const labelId = settings?.[`stats.${stat.id}_id`] || settings?.[`stats.${stat.id}`] || stat.label;
      const labelEn = settings?.[`stats.${stat.id}_en`] || stat.label;
      return {
        id: stat.id,
        iconName: dynamicIconName,
        value: dynamicVal,
        labelId,
        labelEn,
      };
    });
  }, [settings]);

  const gridColsClass = statsList.length === 1 ? 'grid-cols-1' :
                        statsList.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
                        statsList.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                        statsList.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' :
                        statsList.length === 5 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' :
                        'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';

  return (
    <section id="stats" className="py-20 md:py-28 bg-white border-y border-slate-100 min-h-screen flex items-center relative overflow-hidden">
      {style === 'mesh' && (
        <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none select-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      )}
      
      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-8" id="stats-header">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
            {t('stats.title')}
          </h2>
          <p className={`mt-2 text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono transition-colors duration-300 ${textAccents[accent]}`}>
            {t('stats.badge')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid ${gridColsClass} gap-3 md:gap-4`} id="stats-grid">
          {statsList.map((stat, i) => {
            const IconComponent = (LucideIcons as any)[stat.iconName] || iconMap[stat.iconName] || LucideIcons.Users;
            const label = language === 'en' ? stat.labelEn : stat.labelId;
            return (
              <motion.div
                key={stat.id || i}
                whileHover={{ y: -4, boxShadow: '0 12px 20px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)' }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[10px] p-3.5 sm:p-4.5 border border-slate-200 shadow-sm transition-all flex flex-col items-center text-center group"
                id={`stat-card-${stat.id}`}
              >
                {/* Rounded Icon */}
                <div className={`w-8.5 h-8.5 rounded-[8px] flex items-center justify-center transition-all duration-300 mb-2.5 shadow-xs ${bgAccents[accent]}`}>
                  <IconComponent className="w-4 h-4" />
                </div>

                {/* Value */}
                <span className="text-xl sm:text-2xl font-sans font-extrabold text-[#0A2472] tracking-tight" id={`stat-val-${stat.id}`}>
                  <AnimatedNumber value={stat.value} />
                </span>

                {/* Label */}
                <span className="mt-0.5 text-[10px] sm:text-xs text-slate-500 font-semibold leading-normal">
                  {label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <div className="mt-8 text-center text-slate-400 text-xs max-w-none md:max-w-4xl mx-auto leading-relaxed whitespace-normal md:whitespace-nowrap overflow-hidden" id="stats-bottom-text">
          {t('stats.bottom')}
        </div>

      </div>
    </section>
  );
}
