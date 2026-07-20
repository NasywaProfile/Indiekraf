import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Clock, 
  Instagram, 
  Linkedin, 
  Send, 
  ArrowUpRight, 
  MessageSquare,
  Sparkles,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  Building,
  Home,
  Inbox,
  Calendar,
  Watch
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


export const ContactPage: React.FC = () => {
  const { language, settings } = useLanguage();
  const [selectedService, setSelectedService] = useState('');

  const t = {
    id: {
      badge: 'HUBUNGI KAMI',
      title: 'Mari Hubungkan Ide Hebat Anda',
      titleHighlight: 'Dengan Ekosistem Kreatif Kami',
      subtitle: 'Pintu kami selalu terbuka lebar. Apakah Anda ingin mendevelop website premium, menerbitkan press release bisnis, menyelenggarakan diklat SDM, atau sekadar berdiskusi kopi hangat di Malang Creative Center.',
      repTitle: 'Saluran Komunikasi Resmi',
      repSubtitle: 'Pilih metode komunikasi yang paling nyaman bagi Anda. Tim kami siap memberikan layanan prima.',
      office: 'KANTOR PUSAT',
      officeName: 'Telkom AI Center Malang',
      officeAddr: 'Jl. Jenderal Basuki Rahmat No.7-9, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119',
      directions: 'Buka Petunjuk Arah',
      emailLabel: 'EMAIL UTAMA',
      hoursLabel: 'WAKTU OPERASIONAL',
      hoursValue: 'Senin - Jumat 08:30 WIB - 17:00 WIB',
      socialLabel: 'MEDIA SOSIAL KAMI',
      socialSub: 'Ikuti perkembangan ekosistem industri kreatif terbaru setiap harinya.',
      formBadge: 'KONSULTASI',
      formTitle: 'Tulis Kebutuhan Proyek Kreatif Anda',
      formSub: 'Isi brief singkat di bawah ini, dan koordinator spesialis dari pilar layanan yang relevan akan merespons dalam waktu kurang dari 4 jam kerja.',
      labelName: 'NAMA LENGKAP ANDA',
      labelEmail: 'ALAMAT EMAIL AKTIF',
      labelWa: 'NOMOR WHATSAPP',
      labelService: 'LAYANAN YANG DIINGINKAN',
      labelDetail: 'DETAIL RENCANA / PERTANYAAN PROYEK',
      placeholderName: 'Masukkan nama...',
      placeholderEmail: 'nama@perusahaan.com',
      placeholderWa: 'Contoh: 08123456789',
      submitBtn: 'Kirim Formulir Brief Kolaborasi',
      bottomBadge: "Let's work together",
      bottomTitle: 'Ready To Build Something Great?',
      bottomSub: 'Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya.',
      waBtn: 'Chat WhatsApp'
    },
    en: {
      badge: 'CONTACT US',
      title: 'Let’s Connect Your Great Ideas',
      titleHighlight: 'With Our Creative Ecosystem',
      subtitle: 'Our doors are always wide open. Whether you want to develop a premium website, publish business press releases, organize HR training, or just have a warm coffee discussion at Malang Creative Center.',
      repTitle: 'Official Communication Channels',
      repSubtitle: 'Choose the communication method most comfortable for you. Our team is ready to provide prime service.',
      office: 'HEADQUARTERS',
      officeName: 'Telkom AI Center Malang',
      officeAddr: 'Jl. Jenderal Basuki Rahmat No.7-9, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119',
      directions: 'Open Directions',
      emailLabel: 'MAIN EMAIL',
      hoursLabel: 'OPERATIONAL HOURS',
      hoursValue: 'Monday - Friday 08:30 WIB - 17:00 WIB',
      socialLabel: 'OUR SOCIAL MEDIA',
      socialSub: 'Follow the latest developments of the creative industry ecosystem every day.',
      formBadge: 'CONSULTATION',
      formTitle: 'Write Your Creative Project Needs',
      formSub: 'Fill in the brief below, and a specialist coordinator from the relevant service pillar will respond in less than 4 working hours.',
      labelName: 'YOUR FULL NAME',
      labelEmail: 'ACTIVE EMAIL ADDRESS',
      labelWa: 'WHATSAPP NUMBER',
      labelService: 'DESIRED SERVICE',
      labelDetail: 'PROJECT DETAILS / INQUIRIES',
      placeholderName: 'Enter name...',
      placeholderEmail: 'name@company.com',
      placeholderWa: 'Example: 08123456789',
      submitBtn: 'Submit Collaboration Brief Form',
      bottomBadge: "Let's work together",
      bottomTitle: 'Ready To Build Something Great?',
      bottomSub: 'Contact the Indiekraf Team for Service Consultation, Proposal Requests, and Cost Estimation.',
      waBtn: 'Chat WhatsApp'
    }
  };

  const current = t[language as keyof typeof t];

  const mapPosition = { lat: -7.9581746, lng: 112.6069905 }; // Telkom AI Center Malang

  const services = language === 'id' ? [
    settings['contact_service_1_id'] || 'Indiekraf Media (Publishing & Ads)',
    settings['contact_service_2_id'] || 'Indiekraf Studio (Website & Branding)',
    settings['contact_service_3_id'] || 'Indiekraf Academy (Training & SDM)',
    settings['contact_service_4_id'] || 'Indiekraf Insight (Research & Data)'
  ] : [
    settings['contact_service_1_en'] || 'Indiekraf Media (Publishing & Ads)',
    settings['contact_service_2_en'] || 'Indiekraf Studio (Website & Branding)',
    settings['contact_service_3_en'] || 'Indiekraf Academy (Training & HR)',
    settings['contact_service_4_en'] || 'Indiekraf Insight (Research & Data)'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const ctaContainerVariants = {
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

  // Extracted values from CMS with fallbacks
  const contactBadge = language === 'id' 
    ? (settings['contact_hero_badge_id'] || current.badge)
    : (settings['contact_hero_badge_en'] || current.badge);

  const contactTitle = language === 'id'
    ? (settings['contact_hero_title_id'] || current.title + ' ' + current.titleHighlight)
    : (settings['contact_hero_title_en'] || current.title + ' ' + current.titleHighlight);

  const contactSubtitle = language === 'id'
    ? (settings['contact_hero_subtitle_id'] || current.subtitle)
    : (settings['contact_hero_subtitle_en'] || current.subtitle);

  const repLabel = language === 'id' ? (settings['contact_rep_label_id'] || "REPRESENTATIVE HUB") : (settings['contact_rep_label_en'] || "REPRESENTATIVE HUB");
  const repTitle = language === 'id' ? (settings['contact_rep_title_id'] || current.repTitle) : (settings['contact_rep_title_en'] || current.repTitle);
  const repSubtitle = language === 'id' ? (settings['contact_rep_subtitle_id'] || current.repSubtitle) : (settings['contact_rep_subtitle_en'] || current.repSubtitle);
  
  const officeLabel = language === 'id' ? (settings['contact_office_label_id'] || current.office) : (settings['contact_office_label_en'] || current.office);
  const officeName = settings['contact_office_name'] || current.officeName;
  const officeAddr = settings['contact_address'] || current.officeAddr;
  const mapsEmbed = settings['contact_maps_embed'] || "https://www.google.com/maps/search/telkom+ai+center+malang/@-7.9581746,112.6069905,13.55z?entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D";
  
  const emailLabel = language === 'id' ? (settings['contact_email_label_id'] || current.emailLabel) : (settings['contact_email_label_en'] || current.emailLabel);
  const emailVal = settings['contact_email'] || 'hello@indiekraf.com';
  
  const hoursLabel = language === 'id' ? (settings['contact_hours_label_id'] || current.hoursLabel) : (settings['contact_hours_label_en'] || current.hoursLabel);
  const hoursVal = language === 'id' ? (settings['contact_hours_val_id'] || current.hoursValue) : (settings['contact_hours_val_en'] || current.hoursValue);
  
  const formBadge = language === 'id' ? (settings['contact_form_badge_id'] || current.formBadge) : (settings['contact_form_badge_en'] || current.formBadge);
  const formTitle = language === 'id' ? (settings['contact_form_title_id'] || current.formTitle) : (settings['contact_form_title_en'] || current.formTitle);
  const formSub = language === 'id' ? (settings['contact_form_sub_id'] || current.formSub) : (settings['contact_form_sub_en'] || current.formSub);
  
  const socialLabel = language === 'id' ? (settings['contact_social_label_id'] || current.socialLabel) : (settings['contact_social_label_en'] || current.socialLabel);
  const socialSub = language === 'id' ? (settings['contact_social_sub_id'] || current.socialSub) : (settings['contact_social_sub_en'] || current.socialSub);

  const mapsImage = settings['contact_maps_image'] || "/maps.png";
  const formLabelName = language === 'id' ? (settings['contact_form_label_name_id'] || current.labelName) : (settings['contact_form_label_name_en'] || current.labelName);
  const formPlaceholderName = language === 'id' ? (settings['contact_form_placeholder_name_id'] || current.placeholderName) : (settings['contact_form_placeholder_name_en'] || current.placeholderName);
  const formLabelEmail = language === 'id' ? (settings['contact_form_label_email_id'] || current.labelEmail) : (settings['contact_form_label_email_en'] || current.labelEmail);
  const formPlaceholderEmail = language === 'id' ? (settings['contact_form_placeholder_email_id'] || current.placeholderEmail) : (settings['contact_form_placeholder_email_en'] || current.placeholderEmail);
  const formLabelWa = language === 'id' ? (settings['contact_form_label_wa_id'] || current.labelWa) : (settings['contact_form_label_wa_en'] || current.labelWa);
  const formPlaceholderWa = language === 'id' ? (settings['contact_form_placeholder_wa_id'] || current.placeholderWa) : (settings['contact_form_placeholder_wa_en'] || current.placeholderWa);
  const formLabelService = language === 'id' ? (settings['contact_form_label_service_id'] || current.labelService) : (settings['contact_form_label_service_en'] || current.labelService);
  const formLabelDetail = language === 'id' ? (settings['contact_form_label_detail_id'] || current.labelDetail) : (settings['contact_form_label_detail_en'] || current.labelDetail);
  const formBtn = language === 'id' ? (settings['contact_form_btn_id'] || current.submitBtn) : (settings['contact_form_btn_en'] || current.submitBtn);

  const getIcon = (name: string | undefined, defaultIcon: React.ReactNode, type: 'office' | 'email' | 'hours') => {
    switch(name) {
      case 'Building': return <Building className="w-6 h-6 text-blue-600" />;
      case 'Home': return <Home className="w-6 h-6 text-blue-600" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-blue-600" />;
      case 'Mail': return <Mail className="w-5 h-5 text-blue-600" />;
      case 'Send': return <Send className="w-5 h-5 text-blue-600" />;
      case 'Inbox': return <Inbox className="w-5 h-5 text-blue-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'Watch': return <Watch className="w-5 h-5 text-orange-600" />;
      default: return defaultIcon;
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen overflow-x-hidden font-sans">
      {/* 1. Header Section */}
      <section 
        className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-center items-center overflow-hidden bg-white"
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block" style={{ perspective: '1000px' }}>
          {[
            { src: '/icon-kiri.png', alt: 'Icon Kiri', className: 'top-[35%] left-[5%] lg:left-[10%]' },
            { src: '/icon-kanan.png', alt: 'Icon Kanan', className: 'top-[30%] right-[5%] lg:right-[10%]' }
          ].map(({ src, alt, className }, index) => (
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

        {/* Main Copy Wrapper */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
          className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 relative z-20 text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full mb-6 text-xs font-bold border transition-colors duration-300 bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span className="tracking-widest uppercase">{contactBadge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black text-[#0A2472] tracking-tight leading-[1.15] max-w-4xl mx-auto"
          >
            {contactTitle}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium opacity-90"
          >
            {contactSubtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side: Info Channels */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 flex flex-col justify-between h-full"
        >
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-widest text-blue-600 uppercase">{repLabel}</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2472] tracking-tight">{repTitle}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">{repSubtitle}</p>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {/* Office Card with Map */}
            <motion.div variants={itemVariants} className="bg-white p-2 rounded-[10px] border border-[#0A2472]/30 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              {/* Map Section */}
              <div className="w-full h-48 rounded-[10px] overflow-hidden mb-4 relative bg-slate-100">
                <img src={mapsImage} alt="Telkom AI Center Malang Map" className="w-full h-full object-cover" />
                
                {/* Floating Directions Label */}
                <div className="absolute bottom-3 right-3 z-10">
                  <a 
                    href={mapsEmbed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-[10px] shadow-lg text-[10px] font-black text-[#0A2472] uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {current.directions}
                  </a>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-[10px] flex items-center justify-center shrink-0">
                    {getIcon(settings['contact_office_icon'], <MapPin className="w-6 h-6 text-blue-600" />, 'office')}
                  </div>
                  <div className="space-y-1">
                    <div>
                      <p className="text-[9px] font-black text-blue-500 tracking-widest uppercase mb-0.5">{officeLabel}</p>
                      <h3 className="font-bold text-[#0A2472]">{officeName}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {officeAddr}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Card */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-[10px] border border-[#0A2472]/30 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-[10px] flex items-center justify-center mb-4">
                  {getIcon(settings['contact_email_icon'], <Mail className="w-5 h-5 text-blue-600" />, 'email')}
                </div>
                <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1">{emailLabel}</p>
                <p className="text-xs font-bold text-[#0A2472]">{emailVal}</p>
              </motion.div>

              {/* Hours Card */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-[10px] border border-[#0A2472]/30 shadow-sm">
                <div className="w-10 h-10 bg-orange-50 rounded-[10px] flex items-center justify-center mb-4">
                  {getIcon(settings['contact_hours_icon'], <Clock className="w-5 h-5 text-orange-600" />, 'hours')}
                </div>
                <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-1">{hoursLabel}</p>
                <p className="text-[10px] font-bold text-[#0A2472] leading-tight">
                  {hoursVal}
                </p>
              </motion.div>
            </div>

            
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-10 rounded-[10px] border border-[#0A2472]/30 shadow-xl shadow-blue-900/5 flex flex-col justify-center h-full"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest mb-4">
              {formBadge}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2472] tracking-tight mb-3">
              {formTitle}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {formSub}
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#0A2472] tracking-widest">{formLabelName}</label>
                <input 
                  type="text" 
                  placeholder={formPlaceholderName}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#0A2472] tracking-widest">{formLabelEmail}</label>
                <input 
                  type="email" 
                  placeholder={formPlaceholderEmail}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#0A2472] tracking-widest">{formLabelWa}</label>
                <input 
                  type="text" 
                  placeholder={formPlaceholderWa}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-[#0A2472] tracking-widest">{formLabelService}</label>
                <div className="relative">
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{language === 'id' ? 'Pilih layanan...' : 'Select service...'}</option>
                    {services.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#0A2472] tracking-widest">{formLabelDetail}</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium resize-none"
              />
            </div>

            <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] font-black text-sm tracking-wide shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {formBtn}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Social Media Card - Full Width */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-16">
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#0A2472] p-8 rounded-[10px] border border-[#0A2472]/30 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-black tracking-widest text-white/70 uppercase mb-1">{socialLabel}</p>
              <p className="text-sm text-white/90 font-medium">{socialSub}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://instagram.com/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[10px] text-sm font-bold text-white transition-colors border border-white/10">
                <Instagram className="w-4 h-4" />
                @indiekraf
              </a>
              <a href="https://linkedin.com/company/indiekraf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[10px] text-sm font-bold text-white transition-colors border border-white/10">
                <Linkedin className="w-4 h-4" />
                Indiekraf
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      </div>
);
};
