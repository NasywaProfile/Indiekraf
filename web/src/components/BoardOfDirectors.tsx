import React from 'react';
import { motion } from 'motion/react';
import { Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Director {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export const BoardOfDirectors: React.FC = () => {
  const { language } = useLanguage();

  const directors: Director[] = [
    {
      name: 'M. Fikri El-Aziz',
      role: 'Chief Executive Officer',
      image: '/gambar.jpg',
      linkedin: '#'
    },
    {
      name: 'Ahmad Muzaki',
      role: 'Chief Operating Officer',
      image: '/gambar.jpg',
      linkedin: '#'
    },
    {
      name: 'Riza Fauzi',
      role: 'Chief Technology Officer',
      image: '/gambar.jpg',
      linkedin: '#'
    },
    {
      name: 'Siti Aminah',
      role: 'Head of Media Relations',
      image: '/gambar.jpg',
      linkedin: '#'
    }
  ];

  const title = language === 'id' ? 'Dewan Direksi Kami' : 'Our Board of Directors';
  const subtitle = language === 'id' 
    ? 'Dipimpin oleh para profesional berpengalaman yang berdedikasi untuk memajukan ekosistem ekonomi kreatif Indonesia.'
    : 'Led by experienced professionals dedicated to advancing Indonesia\'s creative economy ecosystem.';

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A2472] tracking-tighter"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {directors.map((director, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative aspect-[4/5] rounded-[10px] md:rounded-[10px] overflow-hidden bg-gradient-to-b from-[#A3C9FF] to-[#D5E6FF]">
                {/* Profile Image (clipped to show background around head/shoulders if possible, using standard images for now) */}
                <img 
                  src={director.image} 
                  alt={director.name}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* LinkedIn Icon */}
                <a 
                  href={director.linkedin}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-[10px] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-[#0A2472]"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* Info Overlay (Bottom aligned like reference) */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-black text-lg md:text-xl tracking-tight leading-tight">
                      {director.name}
                    </h3>
                    <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      {director.role}
                    </p>
                  </div>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 rounded-[10px] md:rounded-[10px] border-2 border-white/0 group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
