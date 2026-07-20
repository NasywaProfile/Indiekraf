import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useLanguageOptional } from '../context/LanguageContext';

interface LoaderProps {
  onComplete: () => void;
  onStartReveal?: () => void;
}

export default function Loader({ onComplete, onStartReveal }: LoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const langContext = useLanguageOptional();
  const settings = langContext?.settings || {};
  const logoText = settings['site_logo_text'] || 'indiekraf.';
  const loaderSubtext = settings['site_loader_subtext'] || '';

  useEffect(() => {
    // 1. Let the text/logo display for 1.2 seconds, then trigger its exit animation
    const contentTimer = setTimeout(() => {
      setShowContent(false);
    }, 1200);

    // 2. Wait for content exit animation to complete, then trigger split screen sliding and notify parent
    const loaderTimer = setTimeout(() => {
      setShowLoader(false);
      if (onStartReveal) {
        onStartReveal();
      }
    }, 1650);

    // 3. Once split animation is completed, declare loading finished
    const finalTimer = setTimeout(() => {
      onComplete();
    }, 2450);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(loaderTimer);
      clearTimeout(finalTimer);
    };
  }, [onComplete, onStartReveal]);

  const letters = logoText.split("");

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none touch-none bg-transparent"
          exit={{ pointerEvents: 'none' }}
          id="global-loader-container"
        >
          {/* Top panel door */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            id="loader-top-door"
          />
          
          {/* Bottom panel door */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-white"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            id="loader-bottom-door"
          />

          {/* Floating/Glow background element in center */}
          <motion.div
            className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-blue-50/40 via-indigo-50/30 to-purple-50/20 blur-3xl rounded-full"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Centered Branding Content */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-2 px-6 py-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(8px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                id="loader-brand-wrapper"
              >
                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
                  {/* Logo with clean entry transition */}
                  <motion.div 
                    className="flex items-center justify-center shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 15, 
                      delay: 0.05 
                    }}
                  >
                    <Logo size={42} className="w-10 h-10 sm:w-11 sm:h-11" />
                  </motion.div>

                  {/* Indiekraf Text (Staggered character by character) */}
                  <motion.h1 
                    className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight flex items-center select-none"
                    id="loader-brand-title"
                  >
                    {letters.map((char, index) => {
                      // Color logic: primary text is #0A2472, last dot is #5f75cf, or half indigo if matches 'indiekraf.'
                      let color = "#0A2472"; 
                      if (logoText.toLowerCase() === 'indiekraf.') {
                        if (index >= 5 && index < 9) {
                          color = "#364eb7";
                        } else if (index === 9) {
                          color = "#5f75cf";
                        }
                      } else if (char === '.' || index === letters.length - 1) {
                        color = "#364eb7";
                      }

                      return (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, x: 4, filter: 'blur(2px)' }}
                          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                          transition={{
                            duration: 0.35,
                            delay: 0.15 + index * 0.03,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          style={{ color }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </motion.h1>
                </div>

                {/* Optional Loader Subtext / Tagline */}
                {loaderSubtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wider uppercase mt-1 text-center"
                  >
                    {loaderSubtext}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
