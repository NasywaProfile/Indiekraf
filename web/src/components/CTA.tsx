import React from 'react';
import { Mail, MessageCircle, ArrowUpRight, MapPin, Building, Search, Briefcase, Users, Smartphone, BookOpen, PenTool, Layout, Target, Link as LinkIcon, Facebook, Instagram, Twitter, Youtube, Linkedin, MoveRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface CTAProps {
  isCombined?: boolean;
}

const XIcon = ({ className = "w-5 h-5 mr-2" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function CTA({ isCombined = false }: CTAProps) {
  const { style, accent } = useTheme();
  const { t, language, settings } = useLanguage();
  const email = settings?.['cta_email'] || 'fikar@indiekraf.com';
  const whatsappUrl = settings?.['cta_whatsapp_url'] || 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';
  
  const ctaBadge = language === 'id' ? (settings['cta_badge_id'] || t('cta.work')) : (settings['cta_badge_en'] || t('cta.work'));
  const ctaTitle = language === 'id' ? (settings['cta_title_id'] || t('cta.title')) : (settings['cta_title_en'] || t('cta.title'));
  const ctaSub = language === 'id' ? (settings['cta_subtitle_id'] || t('cta.subtitle')) : (settings['cta_subtitle_en'] || t('cta.subtitle'));
  const ctaEmail = language === 'id' ? (settings['cta_email_id'] || email) : (settings['cta_email_en'] || email);
  const ctaWa = language === 'id' ? (settings['cta_wa_id'] || t('cta.whatsapp')) : (settings['cta_wa_en'] || t('cta.whatsapp'));

  const getIcon = (name: string | undefined, defaultIcon: React.ReactNode) => {
    switch(name) {
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 mr-2" />;
      case 'Mail': return <Mail className="w-5 h-5 mr-2" />;
      case 'MapPin': return <MapPin className="w-5 h-5 mr-2" />;
      case 'Building': return <Building className="w-5 h-5 mr-2" />;
      case 'Search': return <Search className="w-5 h-5 mr-2" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 mr-2" />;
      case 'Users': return <Users className="w-5 h-5 mr-2" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 mr-2" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 mr-2" />;
      case 'PenTool': return <PenTool className="w-5 h-5 mr-2" />;
      case 'Layout': return <Layout className="w-5 h-5 mr-2" />;
      case 'Target': return <Target className="w-5 h-5 mr-2" />;
      case 'Link': return <LinkIcon className="w-5 h-5 mr-2" />;
      case 'ArrowUpRight': return <ArrowUpRight className="w-5 h-5 ml-1.5" />;
      case 'Facebook': return <Facebook className="w-5 h-5 mr-2" />;
      case 'Instagram': return <Instagram className="w-5 h-5 mr-2" />;
      case 'Twitter': return <XIcon className="w-5 h-5 mr-2" />;
      case 'X': return <XIcon className="w-5 h-5 mr-2" />;
      case 'Youtube': return <Youtube className="w-5 h-5 mr-2" />;
      case 'Linkedin': return <Linkedin className="w-5 h-5 mr-2" />;
      case 'MoveRight': return <MoveRight className="w-5 h-5 ml-1.5" />;
      case 'ChevronRight': return <ChevronRight className="w-5 h-5 ml-1.5" />;
      default: return defaultIcon;
    }
  };

  // Accent mapping helper
  const bgAccents = {
    blue: 'bg-gradient-to-br from-[#0A2472] via-[#0D2A84] to-[#051547]',
    indigo: 'bg-gradient-to-br from-[#0A2472] via-[#0D2A84] to-[#051547]',
    emerald: 'bg-gradient-to-br from-[#064e3b] via-[#09664e] to-[#032e22]',
    amber: 'bg-gradient-to-br from-[#451a03] via-[#5c2404] to-[#240c01]',
  };

  const textAccents = {
    blue: 'text-[#0A2472]',
    indigo: 'text-[#0A2472]',
    emerald: 'text-[#064e3b]',
    amber: 'text-[#451a03]',
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.15,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section 
      id={isCombined ? undefined : 'contact'} 
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-radial from-slate-50/30 via-white to-white"
    >
      {/* Background Ornament Handler matching Hero */}
      {style === 'dots' && (
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
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
          </svg>
        </div>
      )}

      {style === 'mesh' && (
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none overflow-hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      )}

      {/* Ambient glows for the section itself */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core CTA Box */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className={`relative rounded-[20px] text-center overflow-hidden shadow-2xl p-10 sm:p-14 md:p-16 transition-colors duration-500 ${bgAccents[accent]}`}
          id="cta-container"
        >
          {/* Ambient light blobs inside the container */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none select-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none select-none" />

          {/* Inner content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Tag/Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-1.5 rounded-[20px] text-xs font-semibold bg-white/10 text-white/90 tracking-wide font-sans"
            >
              {ctaBadge}
            </motion.div>

            {/* Headline */}
            <motion.h2 
              variants={itemVariants}
              className="font-sans font-extrabold text-white tracking-tight leading-tight text-2xl sm:text-3xl md:text-4xl"
            >
              {ctaTitle}
            </motion.h2>

            {/* Subtext */}
            <motion.p 
              variants={itemVariants}
              className="text-white/80 leading-relaxed max-w-2xl mx-auto font-medium text-sm sm:text-base"
            >
              {ctaSub}
            </motion.p>

            {/* Buttons Group */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              {/* Email Link Button */}
              <a
                href={settings['cta_email_url'] || `mailto:${email}`}
                className={`w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-50 font-bold rounded-[20px] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer px-6 py-3.5 text-sm ${textAccents[accent]}`}
                id="cta-email-btn"
              >
                <span>{ctaEmail}</span>
                {getIcon(settings['cta_email_icon'], <ArrowUpRight className="w-5 h-5 ml-1.5" />)}
              </a>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/12 hover:bg-white/22 border border-white/35 hover:border-white/50 text-white font-semibold rounded-[20px] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer px-6 py-3.5 text-sm backdrop-blur-sm"
                id="cta-whatsapp-btn"
              >
                {getIcon(settings['cta_wa_icon'], <MessageCircle className="w-5 h-5 mr-2" />)}
                <span>{ctaWa}</span>
              </a>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
