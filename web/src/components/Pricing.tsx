import React from 'react';
import { pricingPlans } from '../data';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const themeStyles = {
  navy: {
    btnBg:
      'bg-[#2563EB] border-2 border-[#2563EB] text-white hover:bg-[#1D4ED8]',
  },
  bestValue: {
    btnBg:
      'bg-[#2563EB] border-2 border-[#2563EB] text-white hover:bg-[#1D4ED8]',
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
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 bg-white min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {style === 'mesh' && (
        <div
          className="absolute inset-0 z-0 opacity-[0.01] pointer-events-none select-none overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      )}

      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-50px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
  className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
              {t('pricing.badge')}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed font-sans font-medium">
              {t('pricing.subtitle')}
            </p>
          </div>

          <button
            onClick={() => onScrollTo('pricing')}
className="inline-flex items-center justify-center self-start md:self-end px-4 py-3 border border-[#0A2472] text-xs font-bold rounded-[10px] bg-[#EEF3FF] text-[#0A2472] hover:bg-[#DCE7FF] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
            {t('pricing.btnAll').replace(' →', '')}

            <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 hover:translate-x-1" />
          </button>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch"
        >
          {plans.slice(0, 4).map((plan, idx) => {

            const isBestValue =
              plan.badge === 'BEST VALUE';

            const theme = isBestValue
              ? themeStyles.bestValue
              : themeStyles.navy;

            return (
              <motion.div
                key={plan.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: 'easeOut',
                }}
                whileHover={
                  isBestValue
                    ? {
                      y: -5,
                      scale: 1.015,
                      boxShadow:
                        '0 20px 25px -5px rgba(10,36,114,.20)',
                    }
                    : {
                      y: -4,
                      scale: 1.015,
                      boxShadow:
                        '0 12px 20px -8px rgba(10,36,114,.12)',
                    }
                }
                className={
                  isBestValue
                    ? 'bg-gradient-to-b from-[#0A2472] to-[#0d297d] text-white rounded-[10px] p-5 flex flex-col transition-all duration-300 shadow-xl relative z-10 border-2 border-[#2563EB] hover:z-20 h-full'
                    : 'bg-white text-[#0A2472] rounded-[10px] p-5 flex flex-col transition-all duration-300 shadow-sm border-2 border-[#0A2472] relative hover:z-20 hover:shadow-lg h-full'
                }
              >
                {isBestValue && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] border-2 border-white text-white text-[9px] font-black px-3 py-0.5 rounded-[10px] uppercase tracking-wider shadow-md whitespace-nowrap z-20">
                    ★ {t('pricing.bestValue')}
                  </div>
                )}

                <div className="text-center pt-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#2563EB]">
                    {isBestValue
                      ? t('pricing.recommended')
                      : language === 'en' && plan.badge_en
                        ? plan.badge_en
                        : plan.badge}
                  </span>
                </div>
                {/* Price Display */}
                <div className="text-center mt-6 mb-4 min-h-[56px] flex flex-col justify-center">
                  <span
                    className={`text-[8px] uppercase font-bold tracking-wider ${isBestValue
                      ? 'text-white/60'
                      : 'text-slate-400'
                      }`}
                  >
                    {t('pricing.starting')}
                  </span>

                  {(() => {
                    const rawPrice =
                      language === 'en'
                        ? (plan.price_en || '')
                        : (plan.price || '');

                    const cleaned = rawPrice.replace(
                      /^(Mulai dari|Starting from)\s+/i,
                      ''
                    );

                    const slashIndex = cleaned.indexOf('/');

                    let amount = cleaned;
                    let unit = '';

                    if (slashIndex !== -1) {
                      amount = cleaned.substring(0, slashIndex).trim();
                      unit = cleaned.substring(slashIndex).trim();
                    }

                    amount = amount.replace(/\s*,-\s*$/, '').trim();
                    return (
                      <>
                        <h3
                          className={`mt-2 text-2xl sm:text-3xl font-black leading-none ${isBestValue
                            ? 'text-white'
                            : 'text-[#0A2472]'
                            }`}
                        >
                          {amount}
                        </h3>

                        {unit && (
                          <span
                            className={`mt-2 text-xs font-semibold ${isBestValue
                              ? 'text-white/70'
                              : 'text-slate-400'
                              }`}
                          >
                            {unit}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Title */}
                <div className="text-center min-h-[44px]">                  <h3
                  className={`text-sm font-extrabold leading-snug ${isBestValue
                    ? 'text-white'
                    : 'text-[#0A2472]'
                    }`}
                >
                  {(language === 'en'
                    ? plan.name_en
                    : plan.name) || ''}
                </h3>

                  <p
                    className={`mt-2 text-[11px] leading-relaxed min-h-[20px] flex items-center justify-center text-center ${isBestValue
                      ? 'text-white/75'
                      : 'text-slate-500'
                      }`}
                  >
                    {language === 'en'
                      ? (plan.subtitle_en || '')
                      : (plan.subtitle || '')}
                  </p>

                </div>

                {/* Button */}
                <a
                  href={
                    settings?.['cta_whatsapp_url'] ||
                    'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 w-full py-3 rounded-[10px] text-[11px] font-bold text-center transition-all duration-200 ${theme.btnBg}`}
                >
                  {language === 'id'
                    ? 'Hubungi Kami'
                    : 'Contact Us'}
                </a>
                {/* Divider & Feature List */}
                <ul
                  className={`mt-4 pt-4 border-t space-y-2 text-left ${isBestValue
                    ? 'border-white/10'
                    : 'border-[#0A2472]/10'
                    }`}
                >
                  {(
                    language === 'en' &&
                      plan.bullets_en &&
                      plan.bullets_en.length > 0
                      ? plan.bullets_en
                      : plan.bullets
                  ).map((bullet: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start text-[11px] leading-relaxed"
                    >
                      <Check
                        className={`w-3.5 h-3.5 mr-2 shrink-0 mt-0.5 ${isBestValue
                          ? 'text-[#2563EB]'
                          : 'text-emerald-500'
                          }`}
                      />

                      <span
                        className={
                          isBestValue
                            ? 'text-white/90'
                            : 'text-slate-600'
                        }
                      >
                        {bullet}
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