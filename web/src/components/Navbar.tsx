import React, { useState } from 'react';
import { Menu, X, ArrowRight, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  currentPage: string;
}

export default function Navbar({ onScrollTo, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t, settings } = useLanguage();

  // Dynamic menu items from settings or fallback to standard 7 items
  const defaultNavItems = [
    { id: 'home', labelId: t('nav.home'), labelEn: 'Home', active: true, order: 1 },
    { id: 'about', labelId: t('nav.about'), labelEn: 'About Us', active: true, order: 2 },
    { id: 'services', labelId: t('nav.services'), labelEn: 'Services', active: true, order: 3 },
    { id: 'pricing', labelId: t('nav.pricing'), labelEn: 'Pricelist', active: true, order: 4 },
    { id: 'portfolio', labelId: t('nav.portfolio'), labelEn: 'Portfolio', active: true, order: 5 },
    { id: 'blog', labelId: t('nav.blog'), labelEn: 'Blog', active: true, order: 6 },
    { id: 'contact', labelId: t('nav.contact'), labelEn: 'Contact Us', active: true, order: 7 },
  ];

  let rawItems = defaultNavItems;
  if (settings['navbar_menu_items']) {
    try {
      const parsed = JSON.parse(settings['navbar_menu_items']);
      if (Array.isArray(parsed)) {
        rawItems = parsed;
      }
    } catch (e) {
      rawItems = defaultNavItems;
    }
  }

  // Sort by order
  const allNavItems = (Array.isArray(rawItems) ? rawItems : defaultNavItems)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((item: any) => {
      const legacyIdKey = `nav.${item.id}_id`;
      const legacyEnKey = `nav.${item.id}_en`;
      return {
        id: item.id,
        active: item.active !== false,
        label: language === 'en' 
          ? (item.labelEn || settings[legacyEnKey] || item.labelId || t(`nav.${item.id}`)) 
          : (item.labelId || settings[legacyIdKey] || item.labelEn || t(`nav.${item.id}`))
      };
    });

  const contactTarget = settings['nav_contact_target'] || 'contact';
  const contactItem = allNavItems.find((item: any) => item.id === contactTarget || item.id === 'contact');
  const centerNavItems = allNavItems.filter((item: any) => item.active && item.id !== contactTarget && item.id !== 'contact');

  const contactLabel = contactItem 
    ? contactItem.label 
    : (language === 'en' ? (settings['nav.contact_en'] || t('nav.contact')) : (settings['nav.contact_id'] || t('nav.contact')));
  const showContactBtn = contactItem ? contactItem.active : true;

  // Dynamic languages from settings or fallback to IND & ENG
  const defaultLanguages = [
    { code: 'id', label: settings['navbar_lang_id_label'] || '🇮🇩 IND', active: true, order: 1 },
    { code: 'en', label: settings['navbar_lang_en_label'] || '🇺🇸 ENG', active: true, order: 2 },
  ];

  let rawLanguages = defaultLanguages;
  if (settings['navbar_languages']) {
    try {
      const parsed = JSON.parse(settings['navbar_languages']);
      if (Array.isArray(parsed)) {
        rawLanguages = parsed;
      }
    } catch (e) {
      rawLanguages = defaultLanguages;
    }
  }

  const activeLanguages = rawLanguages
    .filter((l: any) => l.active !== false)
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const currentLangObj = activeLanguages.find((l: any) => l.code === language) || activeLanguages[0] || { code: language, label: language.toUpperCase() };

  const logoText = settings['site_logo_text'] || 'indiekraf.';
  const showLangSwitcher = settings['navbar_show_lang_switcher'] !== 'false' && activeLanguages.length > 0;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          {/* Logo */}
          <div 
            onClick={() => onScrollTo('home')} 
            className="flex items-center cursor-pointer group py-1"
            id="nav-logo"
          >
            <Logo size={28} className="shrink-0 max-h-7 h-7 w-auto hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-5 xl:gap-6">
            {centerNavItems.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => onScrollTo(item.id)}
                  className={`font-sans font-semibold text-sm transition-colors cursor-pointer relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0A2472] after:transition-all after:duration-300 ${currentPage === item.id ? 'text-[#0A2472] after:w-full' : 'text-slate-600 hover:text-[#0A2472] after:w-0 hover:after:w-full'}`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Language Switcher Dropdown & Contact Button */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
            {/* Language Switcher Dropdown */}
            {showLangSwitcher && (
              <div className="relative" id="nav-lang-switcher">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 border border-slate-200/85 rounded-[10px] text-xs font-bold text-[#0A2472] bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                  id="lang-dropdown-trigger"
                >
                  <Globe className="h-4 w-4 text-slate-500" />
                  <span>{currentLangObj.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                    <div className="absolute right-0 mt-2 min-w-[120px] bg-white border border-slate-100 rounded-[10px] shadow-xl py-1.5 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {activeLanguages.map((lang: any) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 transition-colors ${language === lang.code ? 'text-[#0A2472] bg-blue-50/50' : 'text-slate-600'}`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Contact Button */}
            {showContactBtn && (
              <button
                onClick={() => onScrollTo(contactItem ? contactItem.id : contactTarget)}
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-[10px] text-white bg-[#0A2472] hover:bg-blue-900 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-900/10"
                id="nav-contact-btn"
              >
                {contactLabel}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-[10px] text-slate-500 hover:text-[#0A2472] hover:bg-slate-100 focus:outline-hidden transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
              id="nav-mobile-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-100 bg-white"
            id="mobile-menu"
          >
            <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
              {centerNavItems.map((item) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onScrollTo(item.id);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-[10px] text-base font-semibold text-[#0A2472] hover:text-[#0A2472] hover:bg-slate-50 transition-all cursor-pointer"
                    id={`mobile-nav-item-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 pb-2 px-4 border-t border-slate-100 flex flex-col space-y-3">
                {showLangSwitcher && (
                  <div className="flex justify-center items-center bg-slate-100/80 rounded-[10px] p-1 flex-wrap gap-1" id="mobile-nav-lang-switcher">
                    {activeLanguages.map((lang: any) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex-1 min-w-[70px] text-center py-2 text-sm font-bold rounded-[10px] transition-all cursor-pointer ${language === lang.code ? 'bg-white text-[#0A2472] shadow-xs' : 'text-slate-500'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
                
                {showContactBtn && (
                  <button
                    onClick={() => {
                      onScrollTo(contactItem ? contactItem.id : contactTarget);
                      setIsOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-[10px] text-white bg-[#0A2472] hover:bg-blue-900 transition-colors shadow-sm"
                    id="mobile-nav-contact-btn"
                  >
                    {contactLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
