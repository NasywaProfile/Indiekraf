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
import Modal from './Modal';

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
  content?: string;
}

export default function BlogPage({ onBackToHome, onScrollToContact }: BlogPageProps) {
  const { language, settings } = useLanguage();
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Press Release Form States
  const [isPressModalOpen, setIsPressModalOpen] = useState(false);
  const [pressTitle, setPressTitle] = useState('');
  const [pressSubtitle, setPressSubtitle] = useState('');
  const [pressArticle, setPressArticle] = useState('');
  const [pressImage, setPressImage] = useState<File | null>(null);
  const [pressImagePreview, setPressImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            read_more_link: '#',
            image: item.image_url || '/gambar.jpg',
            content: language === 'id' ? (item.content || '') : (item.content_en || item.content || '')
          }));
          setPosts(mappedPosts);
        }
      })
      .catch(() => { });
  }, [language]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleNewsletterSubmit = () => {
    if (!email.trim()) return;

    fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    })
      .then(() => {
        const targetEmail = settings['email_destination_newsletter'] || 'fikar@indiekraf.com';
        const subject = encodeURIComponent('Pendaftaran Newsletter Insight Indiekraf');
        const body = encodeURIComponent(`Halo Tim Indiekraf,\n\nSaya mendaftar untuk berlangganan Insight Terkurasi Indiekraf.\nEmail Saya: ${email}\n\nTerima kasih.`);
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${body}`, '_blank');

        alert(language === 'id' ? 'Pendaftaran berhasil dikirim dan halaman Gmail telah dibuka!' : 'Subscription submitted and Gmail compose window opened!');
        setEmail('');
      })
      .catch(() => {
        alert(language === 'id' ? 'Gagal mengirim email' : 'Failed to submit email');
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPressImage(file);
      setPressImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pressTitle.trim() || !pressSubtitle.trim() || !pressArticle.trim()) {
      alert(language === 'id' ? 'Judul, sub judul, dan artikel wajib diisi' : 'Title, subtitle, and article are required');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (pressImage) {
        const formData = new FormData();
        formData.append('image', pressImage);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          imageUrl = uploadData.url;
        } else {
          console.warn('Upload image failed:', uploadData.error);
          alert(uploadData.error || (language === 'id' ? 'Gagal mengunggah gambar. Pastikan ukuran file < 10MB.' : 'Failed to upload image. Max 10MB.'));
        }
      }

      const response = await fetch('/api/press-release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: pressTitle,
          subtitle: pressSubtitle,
          article: pressArticle,
          imageUrl,
        }),
      });

      const targetEmail = settings['email_destination_press_release'] || 'fikar@indiekraf.com';
      const subject = encodeURIComponent(`[RILIS PERS] ${pressTitle}`);
      
      const imageText = `\n\n📷 LAMPIRAN FOTO / GAMBAR:\n(Silakan lampirkan foto/gambar pendukung Rilis Pers Anda secara langsung melalui ikon tombol klip / paperclip 📎 di bagian bawah jendela Gmail ini)`;
      
      const body = encodeURIComponent(`Halo Tim Indiekraf,\n\nBerikut pengajuan Rilis Pers / Berita dari kami:\n\n• Judul: ${pressTitle}\n• Sub Judul: ${pressSubtitle}${imageText}\n\nIsi Artikel:\n${pressArticle}\n\nTerima kasih.`);
      
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${body}`, '_blank');

      alert(language === 'id' ? 'Rilis pers berhasil dikirim dan halaman Gmail telah dibuka!' : 'Press release submitted and Gmail compose window opened!');
      setPressTitle('');
      setPressSubtitle('');
      setPressArticle('');
      setPressImage(null);
      setPressImagePreview('');
      setIsPressModalOpen(false);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || (language === 'id' ? 'Terjadi kesalahan sistem' : 'A system error occurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (selectedPost) {
    return (
      <div className="w-full bg-white min-h-screen pt-0 pb-20">
        {/* Detail Hero Section */}
        <div className="relative w-full h-[65vh] min-h-[450px] overflow-hidden bg-slate-950 flex flex-col justify-between pt-32 pb-12">
          {/* Background Image overlay */}
          <div className="absolute inset-0 z-0">
            {selectedPost.image ? (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover opacity-50 scale-102"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />
          </div>

          {/* Top Controls Container: Absolute/Flex for top left and top right */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Top Left: Back Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl border border-white/10 backdrop-blur-md transition-all shadow-sm"
            >
              ← Kembali ke Blog
            </button>
            {/* Top Right: Category Button/Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-500/20 text-blue-300 text-[11px] font-black tracking-widest uppercase border border-blue-500/30 backdrop-blur-md shadow-sm">
              {language === 'id' ? selectedPost.category : (selectedPost.category_en || selectedPost.category)}
            </div>
          </div>

          {/* Bottom content: Title and Author */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-md max-w-4xl">
              {selectedPost.title}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl border border-white/10 backdrop-blur-md shadow-sm">
              Oleh: {selectedPost.author}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-lg sm:text-xl text-slate-600 font-semibold leading-relaxed mb-10 border-l-4 border-[#0A2472] pl-6 italic">
            {selectedPost.description}
          </p>

          <article className="prose prose-blue max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6">
            {selectedPost.content ? (
              selectedPost.content.includes('<') && selectedPost.content.includes('>') ? (
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              ) : (
                selectedPost.content.split('\n').map((para, i) => (
                  para.trim() ? <p key={i} className="mb-4">{para}</p> : null
                ))
              )
            ) : (
              <p className="text-slate-400 italic">Artikel ini belum memiliki isi konten lengkap.</p>
            )}
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Filters & Search Section - Minimalist */}
      <section className="w-full pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-b border-slate-100 pb-8">
            <div className="relative w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                placeholder={ct.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium text-[#0A2472] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A2472] transition-all"
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
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPost(filteredPosts[0]);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-xl text-[11px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:bg-[#0A2472] hover:text-white transition-all shadow-sm"
                      >
                        <span>{language === 'id' ? (filteredPosts[0].read_more_id || ct.readMore) : (filteredPosts[0].read_more_en || ct.readMore)}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
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
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedPost(post);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-3 text-[10px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:text-blue-600 transition-colors mt-auto text-left"
                          >
                            <span>{language === 'id' ? (post.read_more_id || ct.readMore) : (post.read_more_en || ct.readMore)}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </button>
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
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedPost(post);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-3 text-[10px] font-black text-[#0A2472] uppercase tracking-[0.2em] group/btn hover:text-blue-600 transition-colors mt-auto text-left"
                            >
                              <span>{language === 'id' ? (post.read_more_id || ct.readMore) : (post.read_more_en || ct.readMore)}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                            </button>
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
                {language === 'id' 
                  ? (settings['blog_newsletter_badge_id'] || ct.newsletterBadge || 'KIRIM INSIGHT')
                  : (settings['blog_newsletter_badge_en'] || ct.newsletterBadge || 'SEND INSIGHT')}
              </div>
              <h2 className="text-2xl font-sans font-extrabold text-[#0A2472] leading-tight mb-6">
                {language === 'id' 
                  ? (settings['blog_newsletter_title_id'] || ct.newsletterTitle || 'Dapatkan Insight Terkurasi Langsung ke Email')
                  : (settings['blog_newsletter_title_en'] || ct.newsletterTitle || 'Get Curated Insights Directly to Your Email')}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10">
                {language === 'id' 
                  ? (settings['blog_newsletter_desc_id'] || 'Rangkuman riset tren industri kreatif, tips bisnis, dan webinar eksklusif yang dikirim setiap hari Selasa pagi tanpa spam.')
                  : (settings['blog_newsletter_desc_en'] || 'Summary of creative industry trend research, business tips, and exclusive webinars sent every Tuesday morning without spam.')}
              </p>
            </div>

            <div className="relative group">
              <input
                type="email"
                placeholder={language === 'id'
                  ? (settings['blog_newsletter_placeholder_id'] || ct.emailPlaceholder || 'Masukkan alamat email aktif...')
                  : (settings['blog_newsletter_placeholder_en'] || ct.emailPlaceholder || 'Enter active email address...')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium text-[#0A2472] focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#0A2472] transition-all" />
              <button
                onClick={handleNewsletterSubmit}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0A2472] text-white rounded-[10px] flex items-center justify-center hover:bg-blue-800 transition-colors active:scale-90"
              >
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
                {language === 'id'
                  ? (settings['blog_press_badge_id'] || settings['blog_press_badge'] || settings.press_badge || ct.pressBadge || 'KONTRIBUSI PERS / PRESS RELEASE')
                  : (settings['blog_press_badge_en'] || settings['blog_press_badge'] || settings.press_badge || ct.pressBadge || 'PRESS CONTRIBUTION / PRESS RELEASE')}
              </div>
              <h2 className="text-2xl font-sans font-extrabold leading-tight mb-6">
                {language === 'id'
                  ? (settings['blog_press_title_id'] || settings['blog_press_title'] || settings.press_title || ct.pressTitle || 'Punya Berita atau Rilis Pers Mengenai Brand / Event Anda?')
                  : (settings['blog_press_title_en'] || settings['blog_press_title'] || settings.press_title || ct.pressTitle || 'Have News or Press Release About Your Brand / Event?')}
              </h2>
              <p className="text-xs text-blue-100/70 leading-relaxed font-medium mb-10">
                {language === 'id'
                  ? (settings['blog_press_desc_id'] || settings['blog_press_desc'] || settings.press_desc || ct.pressDesc || 'Publikasikan artikel, siaran pers, atau profil tokoh industri kreatif Anda di Indiekraf Media untuk menjangkau puluhan ribu pembaca aktif dan meningkatkan SEO kredibilitas merek Anda.')
                  : (settings['blog_press_desc_en'] || settings['blog_press_desc'] || settings.press_desc || ct.pressDesc || 'Publish your article, press release, or creative industry profile on Indiekraf Media to reach tens of thousands of active readers and boost your brand\'s SEO credibility.')}
              </p>
            </div>

            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings['email_destination_press_release'] || 'fikar@indiekraf.com')}&su=${encodeURIComponent(language === 'id' ? '[RILIS PERS] Pengajuan Rilis Pers / Berita' : '[PRESS RELEASE] Press Release Submission')}&body=${encodeURIComponent(language === 'id' ? `Halo Tim Indiekraf,\n\nBerikut pengajuan Rilis Pers / Berita dari kami:\n\n• Judul: [Judul Rilis Pers]\n• Sub Judul: [Sub Judul]\n\n📷 LAMPIRAN FOTO / GAMBAR:\n(Silakan lampirkan foto/gambar pendukung Rilis Pers Anda secara langsung melalui ikon tombol klip / paperclip 📎 di bagian bawah jendela Gmail ini)\n\nIsi Artikel:\n[Isi artikel lengkap...]\n\nTerima kasih.` : `Halo Tim Indiekraf,\n\nHere is our Press Release submission:\n\n• Title: [Press Release Title]\n• Subtitle: [Subtitle / Brief Summary]\n\n📷 ATTACHED PHOTO / IMAGE:\n(Please attach your supporting photo/image directly via the paperclip 📎 button at the bottom of this Gmail window)\n\nArticle Content:\n[Full article content...]\n\nThank you.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full py-4 bg-white text-[#0A2472] text-xs font-extrabold rounded-[10px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center block"
            >
              {language === 'id'
                ? (settings['blog_press_btn_id'] || settings['blog_press_btn'] || settings.press_btn || ct.pressBtn || 'Kirim Rilis Pers Sekarang')
                : (settings['blog_press_btn_en'] || settings['blog_press_btn'] || settings.press_btn || ct.pressBtn || 'Submit Press Release Now')}
            </a>
          </motion.div>
        </div>
      </section>

      <Modal
        isOpen={isPressModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsPressModalOpen(false);
          }
        }}
        title={language === 'id' ? 'Kirim Kontribusi Rilis Pers' : 'Submit Press Release Contribution'}
      >
        <form onSubmit={handlePressSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider">
                {language === 'id' ? 'Judul Rilis Pers' : 'Press Release Title'}
              </label>
              <input
                type="text"
                required
                value={pressTitle}
                onChange={(e) => setPressTitle(e.target.value)}
                placeholder={language === 'id' ? 'Contoh: Peluncuran Produk Baru Indiekraf...' : 'Example: Indiekraf New Product Launch...'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider">
                {language === 'id' ? 'Sub Judul / Ringkasan Singkat' : 'Subtitle / Brief Summary'}
              </label>
              <input
                type="text"
                required
                value={pressSubtitle}
                onChange={(e) => setPressSubtitle(e.target.value)}
                placeholder={language === 'id' ? 'Ringkasan rilis pers dalam satu kalimat...' : 'One-sentence summary of the press release...'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider">
                  {language === 'id' ? 'Gambar Rilis Pers' : 'Press Release Image'}
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-200 border-dashed rounded-[10px] cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-colors relative overflow-hidden group">
                    {pressImagePreview ? (
                      <>
                        <img src={pressImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-bold uppercase tracking-wider">
                          {language === 'id' ? 'Ganti Gambar' : 'Change Image'}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <Sparkles className="w-6 h-6 text-[#0A2472]/40 mb-2 animate-pulse" />
                        <p className="mb-1 text-[10px] text-slate-500 font-semibold">
                          {language === 'id' ? 'Klik untuk unggah gambar' : 'Click to upload image'}
                        </p>
                        <p className="text-[9px] text-slate-400">PNG, JPG, JPEG (Max. 5MB)</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-[10px] text-indigo-600 font-semibold mt-1">
                  {language === 'id' 
                    ? '💡 Catatan: File foto juga dapat dilampirkan langsung di Gmail melalui tombol paperclip.' 
                    : '💡 Note: Image file can also be attached directly in Gmail via the paperclip icon.'}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-[#0A2472] uppercase tracking-wider">
                {language === 'id' ? 'Isi Artikel Lengkap' : 'Full Article Content'}
              </label>
              <textarea
                required
                rows={7}
                value={pressArticle}
                onChange={(e) => setPressArticle(e.target.value)}
                placeholder={language === 'id' ? 'Masukkan seluruh isi konten rilis pers di sini secara mendetail...' : 'Enter the complete body content of your press release here in detail...'}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsPressModalOpen(false)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-[10px] transition-colors duration-200 disabled:opacity-50"
            >
              {language === 'id' ? 'Batal' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#0A2472] hover:bg-blue-800 text-white font-bold text-xs rounded-[10px] transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-blue-900/10 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {language === 'id' ? 'Mengirim...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  {language === 'id' ? 'Kirim Rilis Pers' : 'Submit Press Release'}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
