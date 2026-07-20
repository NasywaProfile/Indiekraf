import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  Send, 
  ChevronRight,
  Clock,
  User,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlogPageProps {
  onBackToHome: () => void;
  onScrollToContact: () => void;
}

interface BlogPost {
  id: string;
  category: string;
  category_en?: string;
  title: string;
  description: string;
  author: string;
  read_more_id?: string;
  read_more_en?: string;
  read_more_link?: string;
  image: string;
}

export default function BlogPage({ onBackToHome, onScrollToContact }: BlogPageProps) {
  const { language, settings } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTranslations: Record<string, { id: string, en: string }> = {
    'Industri Game': { id: 'Industri Game', en: 'Game Industry' },
    'Tech & Startup': { id: 'Tech & Startup', en: 'Tech & Startup' },
    'Desain & Branding': { id: 'Desain & Branding', en: 'Design & Branding' },
    'Ekonomi Kreatif': { id: 'Ekonomi Kreatif', en: 'Creative Economy' }
  };
  let categories = [
    { id: 'all', label: language === 'id' ? 'Semua Artikel' : 'All Articles', label_id: 'Semua Artikel', label_en: 'All Articles' },
    { id: 'game', label: language === 'id' ? 'Industri Game' : 'Game Industry', label_id: 'Industri Game', label_en: 'Game Industry' },
    { id: 'tech', label: 'Tech & Startup', label_id: 'Tech & Startup', label_en: 'Tech & Startup' },
    { id: 'design', label: language === 'id' ? 'Desain & Branding' : 'Design & Branding', label_id: 'Desain & Branding', label_en: 'Design & Branding' },
    { id: 'economy', label: language === 'id' ? 'Ekonomi Kreatif' : 'Creative Economy', label_id: 'Ekonomi Kreatif', label_en: 'Creative Economy' },
    { id: 'business', label: 'Tips & Bisnis', label_id: 'Tips & Bisnis', label_en: 'Tips & Business' },
  ];

  if (settings['blog_categories']) {
    try {
      const parsedCats = JSON.parse(settings['blog_categories']);
      categories = [
        { id: 'all', label: language === 'id' ? 'Semua Artikel' : 'All Articles', label_id: 'Semua Artikel', label_en: 'All Articles' },
        ...parsedCats.map((c: any) => ({
          id: c.label_id || c.id || Math.random().toString(),
          label: language === 'id' ? c.label_id : c.label_en,
          label_id: c.label_id,
          label_en: c.label_en
        }))
      ];
    } catch {}
  }

  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      category: 'DIGITAL MARKETING',
      category_en: 'DIGITAL MARKETING',
      title: language === 'id' ? 'Tren Digital Marketing 2025 yang Wajib Diketahui' : '2025 Digital Marketing Trends You Must Know',
      description: language === 'id' ? 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.' : 'Learn the latest digital marketing strategies to help your business grow in the digital era.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Selengkapnya',
      read_more_en: 'Read More',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    },
    {
      id: '2',
      category: 'BRANDING',
      category_en: 'BRANDING',
      title: language === 'id' ? 'Panduan Lengkap Membangun Brand Identity yang Kuat' : 'Complete Guide to Building a Strong Brand Identity',
      description: language === 'id' ? 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.' : 'Practical steps to create a memorable brand identity.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Baca',
      read_more_en: 'Read',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    },
    {
      id: '3',
      category: 'UI/UX DESIGN',
      category_en: 'UI/UX DESIGN',
      title: language === 'id' ? 'UI/UX Design: Prinsip Dasar untuk Pemula' : 'UI/UX Design: Basic Principles for Beginners',
      description: language === 'id' ? 'Memahami fundamental UI/UX design untuk menciptakan pengalaman pengguna optimal.' : 'Understanding fundamental UI/UX design to create optimal user experiences.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Baca Artikel',
      read_more_en: 'Read Article',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    },
    {
      id: '4',
      category: 'WEB DEVELOPMENT',
      category_en: 'WEB DEVELOPMENT',
      title: language === 'id' ? 'Cara Mengoptimalkan Website untuk SEO' : 'How to Optimize Your Website for SEO',
      description: language === 'id' ? 'Tips dan trik meningkatkan peringkat website Anda di mesin pencari Google.' : 'Tips and tricks to improve your website ranking on Google search engine.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Kunjungi',
      read_more_en: 'Visit',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    },
    {
      id: '5',
      category: 'SOCIAL MEDIA',
      category_en: 'SOCIAL MEDIA',
      title: language === 'id' ? 'Social Media Marketing: Strategi Konten yang Efektif' : 'Social Media Marketing: Effective Content Strategy',
      description: language === 'id' ? 'Panduan membuat konten social media yang engaging dan meningkatkan awareness.' : 'Guide to creating engaging social media content and increasing awareness.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Detail',
      read_more_en: 'Details',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    },
    {
      id: '6',
      category: 'BUSINESS INSIGHT',
      category_en: 'BUSINESS INSIGHT',
      title: language === 'id' ? 'Pentingnya Riset Pasar dalam Pengembangan Produk' : 'The Importance of Market Research in Product Development',
      description: language === 'id' ? 'Mengapa riset pasar menjadi kunci kesuksesan dalam meluncurkan produk baru.' : 'Why market research is key to success when launching new products.',
      author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team',
      read_more_id: 'Lihat',
      read_more_en: 'View',
      read_more_link: 'https://indiekraf.com',
      image: '/gambar.jpg'
    }
  ]);

  React.useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mappedPosts = data.map((item: any) => ({
            id: item.id.toString(),
            category: item.category || 'CATEGORY',
            category_en: item.category_en || item.category || 'CATEGORY',
            title: language === 'id' ? item.title : (item.title_en || item.title),
            description: language === 'id' ? item.description : (item.description_en || item.description),
            author: item.author || 'Tim Indiekraf',
            read_more_id: item.read_more || 'Baca',
            read_more_en: item.read_more_en || 'Read',
            read_more_link: item.link || '#',
            image: item.image_url || '/gambar.jpg'
          }));
          setPosts(mappedPosts);
        }
      })
      .catch(() => {});
  }, [language]);

  const selectedCat = categories.find(c => c.id === activeFilter);

  const filteredPosts = posts.filter(post => {
    let matchesFilter = false;
    if (activeFilter === 'all') {
      matchesFilter = true;
    } else if (selectedCat) {
      const matchId = (post.category || '').toLowerCase().includes((selectedCat.label_id || '').toLowerCase());
      const matchEn = (post.category_en || '').toLowerCase().includes((selectedCat.label_en || '').toLowerCase());
      matchesFilter = matchId || matchEn;
    } else {
      matchesFilter = (post.category || '').toLowerCase().includes(activeFilter.toLowerCase()) || 
                      (post.category_en || '').toLowerCase().includes(activeFilter.toLowerCase());
    }

    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const t = {
    id: {
      badge: settings.blog_hero_badge_id || "INDIEKRAF INSIGHT & BERITA",
      title: settings.blog_hero_title_id || "Katalog Artikel, Riset & Inspirasi Ekosistem Kreatif",
      subtitle: settings.blog_hero_subtitle_id || "Temukan berita industri digital terbaru, analisis trend ekonomi kreatif, tips praktis pertumbuhan bisnis, serta ulasan mendalam komunitas lokal di Indonesia.",
      searchPlaceholder: settings.blog_searchPlaceholder_id || "Cari topik, judul artikel, atau kata kunci...",
      readMore: "Baca Selengkapnya",
      newsletterTitle: "Dapatkan Insight Terkurasi Langsung ke Email",
      newsletterDesc: "Ringkasan riset tren industri kreatif, tips bisnis, dan info webinar eksklusif yang dikirim setiap Selasa pagi. Tanpa spam.",
      newsletterBadge: "KIRIM INSIGHT",
      emailPlaceholder: "Masukkan alamat email aktif...",
      pressTitle: "Punya Berita atau Rilis Pers Mengenai Brand / Event Anda?",
      pressBadge: "KONTRIBUSI PERS / PRESS RELEASE",
      pressDesc: "Publikasikan artikel, siaran pers, atau profil tokoh industri kreatif Anda di Indiekraf Media untuk menjangkau puluhan ribu pembaca aktif dan meningkatkan SEO kredibilitas merek Anda.",
      pressBtn: "Kirim Rilis Pers Sekarang"
    },
    en: {
      badge: settings.blog_hero_badge_en || "INDIEKRAF INSIGHT & NEWS",
      title: settings.blog_hero_title_en || "Article Catalog, Research & Creative Ecosystem Inspiration",
      subtitle: settings.blog_hero_subtitle_en || "Discover the latest digital industry news, creative economy trend analysis, practical business growth tips, and in-depth reviews of local communities in Indonesia.",
      searchPlaceholder: settings.blog_searchPlaceholder_en || "Search topics, article titles, or keywords...",
      readMore: "Read More",
      newsletterTitle: "Get Curated Insights Directly to Your Email",
      newsletterDesc: "Summary of creative industry trend research, business tips, and exclusive webinars sent every Tuesday morning with no spam.",
      newsletterBadge: "SEND INSIGHT",
      emailPlaceholder: "Enter your active email address...",
      pressTitle: "Have News or Press Release About Your Brand / Event?",
      pressBadge: "PRESS CONTRIBUTION / PRESS RELEASE",
      pressDesc: "Publish your articles, press releases, or creative industry figure profiles on Indiekraf Media to reach tens of thousands of active readers and improve your brand's SEO credibility.",
      pressBtn: "Submit Press Release Now"
    }
  };

  const ct = language === 'id' ? t.id : t.en;

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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Filters & Search Section - Minimalist */}
      <section className="w-full pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                    activeFilter === cat.id
                      ? 'bg-[#0A2472] text-white border-[#0A2472]'
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="relative group max-w-xs w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text"
                placeholder={ct.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-[10px] text-[11px] font-medium text-[#0A2472] focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* Article Bento Layout */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Featured Article (Left - Vertical) */}
                  <motion.div
                    key={filteredPosts[0].id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8 }}
                    className="lg:col-span-7 bg-white rounded-[10px] p-6 border border-[#0A2472]/30 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-[10px] mb-8 bg-[#0A2472] flex items-center justify-center">
                      {filteredPosts[0].image ? (
                        <img 
                          src={filteredPosts[0].image} 
                          alt={filteredPosts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Sparkles className="w-12 h-12 text-white/20" />
                      )}
                    </div>
                    <div className="px-2">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-[10px] bg-white border border-slate-100 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm">
                        {language === 'id' ? filteredPosts[0].category : (filteredPosts[0].category_en || filteredPosts[0].category)}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-sans font-extrabold text-[#0A2472] leading-[1.1] mb-6 group-hover:text-[#0A2472]/80 transition-colors">
                        {filteredPosts[0].title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 max-w-2xl">
                        {filteredPosts[0].description}
                      </p>
                      <a 
                        href={filteredPosts[0].read_more_link || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-xl text-[11px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:bg-[#0A2472] hover:text-white transition-all shadow-sm"
                      >
                        <span>{language === 'id' ? (filteredPosts[0].read_more_id || ct.readMore) : (filteredPosts[0].read_more_en || ct.readMore)}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Secondary Articles (Right - Horizontal Stack) */}
                  <div className="lg:col-span-5 flex flex-col gap-8">
                    {filteredPosts.slice(1, 3).map((post) => (
                      <motion.div
                        key={post.id}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -8 }}
                        className="bg-white rounded-[10px] p-6 border border-[#0A2472]/30 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col sm:flex-row gap-6 h-full"
                      >
                        <div className="w-full sm:w-44 lg:w-48 h-44 sm:h-auto shrink-0 overflow-hidden rounded-[10px] bg-[#0A2472] flex items-center justify-center">
                          {post.image ? (
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Sparkles className="w-8 h-8 text-white/20" />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="inline-flex items-center px-3 py-1 rounded-[10px] bg-white border border-slate-100 text-blue-600 text-[9px] font-bold tracking-widest uppercase mb-4 shadow-sm w-fit">
                            {language === 'id' ? post.category : (post.category_en || post.category)}
                          </div>
                          <h3 className="text-xl font-sans font-extrabold text-[#0A2472] leading-tight mb-3 group-hover:text-[#0A2472]/80 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-[12px] text-slate-500 leading-relaxed font-medium mb-5 line-clamp-2">
                            {post.description}
                          </p>
                          <a 
                            href={post.read_more_link || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 text-[10px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:text-blue-600 transition-colors mt-auto"
                          >
                            <span>{language === 'id' ? (post.read_more_id || ct.readMore) : (post.read_more_en || ct.readMore)}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional Articles Grid */}
                  {filteredPosts.length > 3 && (
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                      {filteredPosts.slice(3).map((post) => (
                        <motion.div
                          key={post.id}
                          layout
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ y: -8 }}
                          className="bg-white rounded-[10px] p-6 border border-[#0A2472]/30 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
                        >
                          <div className="aspect-video overflow-hidden rounded-[10px] mb-6 bg-[#0A2472] flex items-center justify-center">
                            {post.image ? (
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <Sparkles className="w-10 h-10 text-white/20" />
                            )}
                          </div>
                          <div className="px-1 flex-1 flex flex-col">
                            <div className="inline-flex items-center px-3 py-1 rounded-[10px] bg-white border border-slate-100 text-blue-600 text-[9px] font-bold tracking-widest uppercase mb-4 shadow-sm w-fit">
                              {language === 'id' ? post.category : (post.category_en || post.category)}
                            </div>
                            <h3 className="text-xl font-sans font-extrabold text-[#0A2472] leading-tight mb-4 group-hover:text-[#0A2472]/80 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-[12px] text-slate-500 leading-relaxed font-medium mb-8 flex-1 line-clamp-3">
                              {post.description}
                            </p>
                            <a 
                              href={post.read_more_link || '#'}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-3 text-[10px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:text-blue-600 transition-colors mt-auto"
                            >
                              <span>{language === 'id' ? (post.read_more_id || ct.readMore) : (post.read_more_en || ct.readMore)}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-6">
                    <Search className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-medium tracking-wide">TIDAK ADA ARTIKEL DITEMUKAN</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Newsletter & Press Release Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Newsletter Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-10 rounded-[10px] bg-white border border-[#0A2472]/30 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-[10px] bg-blue-50 text-[#0A2472] text-[10px] font-bold tracking-widest border border-blue-100 mb-6 uppercase">
                {ct.newsletterBadge}
              </div>
              <h2 className="text-2xl font-sans font-extrabold text-[#0A2472] leading-tight mb-6">
                {ct.newsletterTitle}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10">
                Rangkuman riset tren industri kreatif, tips bisnis, dan webinar eksklusif yang dikirim setiap hari Selasa pagi tanpa spam.
              </p>
            </div>
            
            <div className="relative group">
              <input 
                type="email"
                placeholder={ct.emailPlaceholder}
                className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium text-[#0A2472] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0A2472] transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0A2472] text-white rounded-[10px] flex items-center justify-center hover:bg-blue-800 transition-colors active:scale-90">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Press Release Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="p-10 rounded-[10px] bg-[#0A2472] text-white relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-[10px] bg-white/10 text-white text-[10px] font-bold tracking-widest border border-white/20 mb-6 uppercase">
                {settings.press_badge || ct.pressBadge}
              </div>
              <h2 className="text-2xl font-sans font-extrabold leading-tight mb-6">
                {settings.press_title || ct.pressTitle}
              </h2>
              <p className="text-xs text-blue-100/70 leading-relaxed font-medium mb-10">
                {settings.press_desc || ct.pressDesc}
              </p>
            </div>

            <button className="relative z-10 w-full py-4 bg-white text-[#0A2472] text-xs font-extrabold rounded-[10px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {settings.press_btn || ct.pressBtn}
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
