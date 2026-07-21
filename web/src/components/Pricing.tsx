import React from 'react';
import { pricingPlans } from '../data';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const themeStyles = {
  navy: {
    textColor: 'text-[#0A2472]',
    labelColor: 'text-slate-400',
    btnBg: 'bg-white border-2 border-[#0A2472] text-[#0A2472] hover:bg-[#EEF3FF]',
  },
  bestValue: {
    textColor: 'text-white',
    labelColor: 'text-white/70',
    btnBg: 'bg-white text-[#0A2472] hover:bg-slate-50 shadow-md',
  },
};

interface PricingProps {
  onScrollTo: (id: string) => void;
}

export default function Pricing({ onScrollTo }: PricingProps) {
  const { style } = useTheme();
  const { t, language, settings } = useLanguage();
  const [plans, setPlans] = React.useState<any[]>(pricingPlans);

  React.useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white min-h-screen flex flex-col justify-center relative overflow-hidden">
      {style === 'mesh' && (
        <div className="absolute inset-0 z-0 opacity-[0.01] pointer-events-none select-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      )}

      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full relative z-10">
        
        {/* Header Block with top button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4" 
          id="pricing-header-block"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
              {t('pricing.badge')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed font-sans font-medium">
              {t('pricing.subtitle')}
            </p>
          </div>
          
          <div className="shrink-0">
            <button
              onClick={() => onScrollTo('pricing')}
              className="inline-flex items-center justify-center px-4 py-2 border border-[#0A2472] text-xs font-bold rounded-[10px] bg-[#EEF3FF] text-[#0A2472] hover:bg-[#DCE7FF] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              id="pricing-full-btn"
            >
              {t('pricing.btnAll').replace(' →', '')}
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" id="pricing-grid">
          {plans.slice(0, 4).map((plan, idx) => {
            const isBestValue = plan.badge === 'BEST VALUE';
            const theme = isBestValue ? themeStyles.bestValue : themeStyles.navy;
            
            return (
              <motion.div
                key={plan.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                whileHover={isBestValue 
                  ? { y: -5, scale: 1.015, boxShadow: '0 20px 25px -5px rgba(10, 36, 114, 0.2)' }
                  : { y: -4, scale: 1.015, boxShadow: '0 12px 20px -8px rgba(10, 36, 114, 0.12)' }
                }
                className={isBestValue 
                  ? "bg-gradient-to-b from-[#0A2472] to-[#0d297d] text-white rounded-[10px] p-5 flex flex-col justify-between transition-all duration-300 shadow-xl relative z-10 border-2 border-[#2563EB] hover:z-20" 
                  : "bg-white text-[#0A2472] rounded-[10px] p-5 flex flex-col justify-between transition-all duration-300 shadow-sm border-2 border-[#0A2472] relative hover:z-20 hover:shadow-lg"
                }
                id={`price-card-${plan.id}`}
              >
                {/* Floating Stroke Badge for Best Value */}
                {isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] border-2 border-white text-white text-[9px] font-black px-3 py-0.5 rounded-[10px] uppercase tracking-wider shadow-md whitespace-nowrap z-20">
                    ★ {t('pricing.bestValue')}
                  </div>
                )}

                {/* Top Section: Category */}
                <div className="text-center relative pt-0.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#2563EB]">
                    {isBestValue ? t('pricing.recommended') : (language === 'en' && plan.badge_en ? plan.badge_en : plan.badge)}
                  </span>
                </div>

                {/* Price Display */}
                <div className="text-center mt-2.5 mb-1">
                  <span className={`text-[8px] uppercase font-bold tracking-wider block ${isBestValue ? 'text-white/60' : 'text-slate-400'}`}>
                    {t('pricing.starting')}
                  </span>
                  <div className="flex items-baseline justify-center mt-0.5 gap-0.5">
                    <span className={`text-2xl sm:text-3xl font-sans font-black tracking-tight ${isBestValue ? 'text-white' : 'text-[#0A2472]'}`}>
                      {((language === 'en' && plan.price_en ? plan.price_en : plan.price) || t(`pricing.plan.${plan.id}.price`)).replace(/^(Mulai dari|Starting from)\s+/i, '').replace(/\s*\/(paket|package)$/i, '')}
                    </span>
                    <span className={`text-[10px] font-semibold ${isBestValue ? 'text-white/70' : 'text-slate-400'}`}>
                      {t('pricing.perPackage')}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="text-center mb-3">
                  <h3 className={`text-xs sm:text-sm font-sans font-extrabold mt-0.5 tracking-tight leading-snug ${isBestValue ? 'text-white' : 'text-[#0A2472]'}`}>
                    {(language === 'en' && plan.name_en ? plan.name_en : plan.name) || t(`pricing.plan.${plan.id}.name`)}
                  </h3>
                  <p className={`mt-0.5 text-[10px] font-medium leading-relaxed min-h-[30px] flex items-center justify-center ${isBestValue ? 'text-white/75' : 'text-slate-500'}`}>
                    {(language === 'en' && plan.subtitle_en ? plan.subtitle_en : plan.subtitle) || t(`pricing.plan.${plan.id}.sub`)}
                  </p>
                </div>

                {/* Main Action Button */}
                <a
                  href={settings?.['cta_whatsapp_url'] || 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-3.5 rounded-[10px] text-[10px] font-extrabold tracking-wide text-center transition-all duration-200 cursor-pointer ${theme.btnBg}`}
                  id={`price-btn-${plan.id}`}
                >
                  {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                </a>

                {/* Divider & Feature list */}
                <ul className={`mt-3.5 space-y-1.5 border-t pt-3.5 text-left flex-1 ${isBestValue ? 'border-white/10' : 'border-[#0A2472]/10'}`}>
                  {(language === 'en' && plan.bullets_en && plan.bullets_en.length > 0 ? plan.bullets_en : plan.bullets).map((bullet: string, index: number) => (
                    <li key={index} className="flex items-start text-[11px] font-medium leading-relaxed">
                      <Check className={`w-3 h-3 mr-1.5 shrink-0 mt-0.5 ${isBestValue ? 'text-[#2563EB]' : 'text-emerald-500'}`} />
                      <span className={isBestValue ? 'text-white/90' : 'text-slate-600'}>
                        {bullet || t(`pricing.plan.${plan.id}.b${index + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
