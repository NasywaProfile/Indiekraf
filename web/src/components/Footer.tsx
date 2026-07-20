import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle, Mail, MapPin, Building, Search, Briefcase, Users, Smartphone, BookOpen, PenTool, Layout, Target, Link as LinkIcon, ArrowUpRight, MoveRight, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onScrollTo: (id: string) => void;
  isCombined?: boolean;
}

export default function Footer({ onScrollTo, isCombined = false }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t, language, settings } = useLanguage();

  const getIcon = (name: string | undefined, defaultIcon: React.ReactNode) => {
    switch(name) {
      case 'MessageCircle': return <MessageCircle className="w-4 h-4" />;
      case 'Mail': return <Mail className="w-4 h-4" />;
      case 'MapPin': return <MapPin className="w-4 h-4" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Search': return <Search className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Target': return <Target className="w-4 h-4" />;
      case 'Link': return <LinkIcon className="w-4 h-4" />;
      case 'ArrowUpRight': return <ArrowUpRight className="w-4 h-4" />;
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'Youtube': return <Youtube className="w-4 h-4" />;
      case 'Linkedin': return <Linkedin className="w-4 h-4" />;
      case 'MoveRight': return <MoveRight className="w-4 h-4" />;
      case 'ChevronRight': return <ChevronRight className="w-4 h-4" />;
      default: return defaultIcon;
    }
  };

  const socialLinks = [
    { key: 'social_facebook', defaultIcon: <Facebook className="w-3.5 h-3.5" />, url: settings['social_facebook'] || 'https://facebook.com/indiekraf', label: 'Facebook' },
    { key: 'social_instagram', defaultIcon: <Instagram className="w-3.5 h-3.5" />, url: settings['social_instagram'] || 'https://instagram.com/indiekraf', label: 'Instagram' },
    { key: 'social_twitter', defaultIcon: <Twitter className="w-3.5 h-3.5" />, url: settings['social_twitter'] || 'https://x.com/indiekraf', label: 'X' },
    { key: 'social_youtube', defaultIcon: <Youtube className="w-3.5 h-3.5" />, url: settings['social_youtube'] || 'https://youtube.com/@indiekraf', label: 'YouTube' },
    { key: 'social_linkedin', defaultIcon: <Linkedin className="w-3.5 h-3.5" />, url: settings['social_linkedin'] || 'https://linkedin.com/company/indiekraf', label: 'LinkedIn' },
  ];

  const brandName = language === 'id' ? (settings['footer_brand_id'] || 'Indiekraf') : (settings['footer_brand_en'] || 'Indiekraf');
  const footerDesc = language === 'id' ? (settings['footer_desc_id'] || settings['footer.desc_id'] || settings['footer.desc'] || 'Berangkat dari pemahaman mendalam terhadap kebutuhan klien, Indiekraf hadir sebagai partner kolaboratif, bukan sekadar vendor.') : (settings['footer_desc_en'] || settings['footer.desc_en'] || 'Connecting the creative, media, agency, research, and academy ecosystem in Indonesia.');
  
  const titleLayanan = language === 'id' ? (settings['footer_col_layanan_id'] || t('nav.services')) : (settings['footer_col_layanan_en'] || t('nav.services'));
  const titleLinks = language === 'id' ? (settings['footer_col_links_id'] || t('footer.links')) : (settings['footer_col_links_en'] || t('footer.links'));
  const titleContact = language === 'id' ? (settings['footer_col_contact_id'] || t('footer.contact')) : (settings['footer_col_contact_en'] || t('footer.contact'));
  
  const footerCopyright = language === 'id' ? (settings['footer_copyright_id'] || 'Hak Cipta Dilindungi.') : (settings['footer_copyright_en'] || 'All rights reserved.');
  const footerLocation = language === 'id' ? (settings['footer_location_id'] || 'Malang, Jawa Timur, Indonesia') : (settings['footer_location_en'] || 'Malang, East Java, Indonesia');

  let layananLinks = [
    { label: 'Indiekraf Media', url: 'media' },
    { label: 'Indiekraf Studio', url: 'studio' },
    { label: 'Indiekraf Academy', url: 'academy' },
    { label: 'Insight Center', url: 'insight' },
  ];

  try {
    if (settings['footer_layanan_links']) {
      const parsed = JSON.parse(settings['footer_layanan_links']);
      layananLinks = parsed.map((item: any) => ({
        label: language === 'id' ? item.label_id : item.label_en,
        url: item.url
      }));
    }
  } catch (e) { console.error(e); }

  let quickLinks = [
    { label: t('nav.about'), url: 'about' },
    { label: t('nav.pricing'), url: 'pricing' },
    { label: t('nav.portfolio'), url: 'portfolio' },
    { label: t('nav.contact'), url: 'contact' },
  ];

  try {
    if (settings['footer_quick_links']) {
      const parsed = JSON.parse(settings['footer_quick_links']);
      quickLinks = parsed.map((item: any) => ({
        label: language === 'id' ? item.label_id : item.label_en,
        url: item.url
      }));
    }
  } catch (e) { console.error(e); }

  const footerContactEmail = settings['footer_contact_email'] || 'fikar@indiekraf.com';
  const footerContactWa = settings['footer_contact_wa'] || '+62 823-3757-6338';
  const footerContactWeb = settings['footer_contact_web'] || 'www.indiekraf.com';

  return (
    <footer id="footer" className="relative overflow-hidden bg-white border-t border-slate-200/60 pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12 text-[#0A2472]">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footers Top columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left" id="footer-top-columns">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start space-y-4 max-w-sm" id="footer-col-brand">
            <div 
              onClick={() => onScrollTo('home')} 
              className="flex items-center space-x-2 cursor-pointer group inline-flex font-sans"
            >
              {settings['footer_logo'] ? (
                <img src={settings['footer_logo']} alt="Footer Logo" className="h-8 object-contain shrink-0 hover:scale-105 transition-transform" />
              ) : (
                <Logo size={28} className="shrink-0 hover:scale-105 transition-transform" />
              )}
              <span className="font-sans font-black text-xl text-[#0A2472] tracking-tight">
                {brandName}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-500 font-medium text-left">
              {footerDesc}
            </p>

            {/* Social Icons list */}
            <div className="flex items-center space-x-3 pt-1">
              {socialLinks.map(({ key, defaultIcon, url, label }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[10px] bg-white hover:bg-[#0A2472] border border-slate-200/60 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-300 shadow-sm"
                  aria-label={label}
                  id={`footer-social-${label.toLowerCase()}`}
                >
                  <span className="w-3.5 h-3.5 flex items-center justify-center">
                    {getIcon(settings[`${key}_icon`], defaultIcon)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Group of Layanan, Quick Links, and Kontak */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6" id="footer-col-links-group">
            
            {/* Column 2: Layanan */}
            <div className="flex flex-col items-start space-y-4" id="footer-col-layanan">
              <h4 className="text-[#0A2472] text-sm font-bold tracking-wider font-sans">
                {titleLayanan}
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500 text-left">
                {layananLinks.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith('http') ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer text-left inline-flex"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => onScrollTo(link.url)}
                        className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer text-left inline-flex"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="flex flex-col items-start space-y-4" id="footer-col-links">
              <h4 className="text-[#0A2472] text-sm font-bold tracking-wider font-sans">
                {titleLinks}
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500 text-left">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith('http') ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer text-left inline-flex"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => onScrollTo(link.url)}
                        className="hover:text-blue-600 hover:translate-x-1 transition-all cursor-pointer text-left inline-flex"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact info */}
            <div className="flex flex-col items-start space-y-4" id="footer-col-contact">
              <h4 className="text-[#0A2472] text-sm font-bold tracking-wider font-sans">
                {titleContact}
              </h4>
              <ul className="space-y-2.5 text-sm font-medium text-slate-500 text-left">
                <li>
                  <span className="text-slate-500">Email: {footerContactEmail}</span>
                </li>
                <li>
                  <span className="text-slate-500">WhatsApp: {footerContactWa}</span>
                </li>
                <li>
                  <span className="text-slate-500">Website: {footerContactWeb}</span>
                </li>
              </ul>

              <div className="pt-2">
                <a
                  href={settings['footer_wa_url'] || 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5"
                  id="footer-whatsapp-btn"
                >
                  {getIcon(settings['footer_wa_icon'], <MessageCircle className="w-4 h-4 mr-2" />)}
                  {language === 'id' ? (settings['footer_wa_id'] || 'Chat WhatsApp') : (settings['footer_wa_en'] || 'Chat WhatsApp')}
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Footers bottom separator & copyrights */}
        <div className="border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold mt-12 pt-6 text-slate-400" id="footer-bottom-row">
          <p>© {currentYear} {footerCopyright}</p>
          <div className="flex items-center">
            <span>{footerLocation}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
