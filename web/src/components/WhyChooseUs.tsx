import React from 'react';
import { LayoutGrid, LineChart, Users2, Milestone, Heart, Tag } from 'lucide-react';
import { featuresData } from '../data';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutGrid,
  LineChart,
  Users2,
  Milestone,
  Heart,
  Tag,
};

const iconColors = {
  integrated: 'bg-[#0A2472]/5 text-[#0A2472]',
  'data-driven': 'bg-purple-50 text-purple-600',
  'professional-team': 'bg-emerald-50 text-emerald-600',
  'proven-track': 'bg-amber-50 text-amber-600',
  partner: 'bg-pink-50 text-pink-600',
  'transparent-pricing': 'bg-[#0A2472]/5 text-[#0A2472]',
};

const keyMap: Record<string, string> = {
  'integrated': 'integrated',
  'data-driven': 'datadriven',
  'professional-team': 'team',
  'proven-track': 'track',
  'partner': 'partner',
  'transparent-pricing': 'pricing',
};

export default function WhyChooseUs() {
  const { style, accent } = useTheme();
  const { t } = useLanguage();

  const textAccents = {
    blue: 'bg-[#0A2472]/5 text-[#0A2472]',
    indigo: 'bg-[#0A2472]/5 text-[#0A2472]',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <section id="why-choose-us" className="py-20 md:py-28 bg-[#EEF3FF] relative overflow-hidden min-h-screen flex items-center">
      
      {/* Background graphic elements */}
      {style === 'mesh' && (
        <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none select-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      )}
      {style === 'glow' && (
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial from-blue-50/20 to-transparent pointer-events-none" />
      )}

      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10" id="why-header">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
            {t('why.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
            {t('why.subtitle') || 'Partner kolaboratif yang memahami kebutuhan bisnis dan menghasilkan solusi digital yang terukur'}
          </p>
        </div>

        {/* Feature Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="why-grid">
          {featuresData.map((feature, idx) => {
            const IconComponent = iconMap[feature.iconName] || LayoutGrid;
            const colorClass = iconColors[feature.id as keyof typeof iconColors] || 'bg-blue-50 text-blue-600';
            const translationId = keyMap[feature.id] || 'integrated';

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                whileHover={{ y: -5, scale: 1.015, boxShadow: '0 20px 25px -5px rgba(10, 36, 114, 0.08)' }}
                className="bg-white rounded-[10px] p-5 sm:p-6 border-2 border-[#0A2472]/12 hover:border-[#0A2472]/30 flex flex-col items-start hover:shadow-xl transition-all duration-300 group"
                id={`why-card-${feature.id}`}
              >
                {/* Feature Icon */}
                <div className={`p-2.5 rounded-[10px] ${colorClass} flex items-center justify-center mb-3.5 transition-transform duration-500 group-hover:rotate-6`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base md:text-lg font-sans font-bold text-[#0A2472] tracking-tight">
                  {t(`why.feat.${translationId}.title`)}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                  {t(`why.feat.${translationId}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
