import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface PageOnProgressProps {
  onBackToPortfolio: () => void;
}

export default function PageOnProgress({ onBackToPortfolio }: PageOnProgressProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-6 select-none"
        >
          🚧
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#0A2472] mb-3 tracking-tight">
          {language === 'id' ? 'Halaman Sedang Dalam Proses' : 'Page In Progress'}
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
          {language === 'id'
            ? 'Konten untuk halaman ini sedang kami siapkan. Silakan kembali lagi nanti!'
            : 'Content for this page is currently being prepared. Please check back soon!'}
        </p>

        {/* Back button */}
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A2472] text-white text-sm font-bold rounded-[10px] hover:bg-[#071d5a] transition-all duration-300 active:scale-95 shadow-sm"
        >
          ← {language === 'id' ? 'Kembali ke Portofolio' : 'Back to Portfolio'}
        </button>
      </motion.div>
    </div>
  );
}
