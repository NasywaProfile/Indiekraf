import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface BlogProps {
  isModal?: boolean;
}

export default function Blog({ isModal = false }: BlogProps) {
  const { t } = useLanguage();

  const posts = [
    {
      id: 'kreatif',
      image: '/gambar.jpg',
    },
    {
      id: 'branding',
      image: '/gambar.jpg',
    },
    {
      id: 'uiux',
      image: '/gambar.jpg',
    },
  ];

  const content = (
    <div className={isModal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
      
      {/* Header */}
      {!isModal && (
        <div className="text-center max-w-3xl mx-auto mb-16" id="blog-header">
          <div className="inline-flex items-center px-3 py-1 rounded-[10px] text-xs font-bold bg-[#0A2472]/5 text-[#0A2472] tracking-wider uppercase font-mono mb-4">
            {t('blog.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight">
            {t('blog.title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
            {t('blog.subtitle')}
          </p>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-grid">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -8, shadow: "0 25px 50px -12px rgba(10, 36, 114, 0.15)" }}
              className="bg-white rounded-[10px] overflow-hidden border border-[#0A2472]/30 group shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              id={`blog-post-${i}`}
            >
              {/* Image with Picsum seed & referrer policy */}
              <div className="aspect-16/10 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={post.image}
                  alt={t(`blog.post.${post.id}.title`)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Area */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Meta details */}
                <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 mb-3 font-mono uppercase">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    <span>{t(`blog.post.${post.id}.date`)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5" />
                    <span>{t(`blog.post.${post.id}.author`)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-sans font-bold text-[#0A2472] group-hover:text-[#0A2472] transition-colors line-clamp-2 leading-snug">
                  {t(`blog.post.${post.id}.title`)}
                </h3>
                
                <p className="mt-3 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {t(`blog.post.${post.id}.excerpt`)}
                </p>

                {/* Read more action */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex justify-start items-center">
                  <span className="text-sm font-extrabold text-[#0A2472] group-hover:text-[#0A2472]/90 flex items-center transition-colors">
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    );

  if (isModal) {
    return content;
  }

  return (
    <section id="blog" className="pt-12 md:pt-16 pb-20 md:pb-28 bg-slate-50/50">
      {content}
    </section>
  );
}
