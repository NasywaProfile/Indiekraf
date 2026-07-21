import React, { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import WhyChooseUs from './components/WhyChooseUs';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Loader from './components/Loader';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';
import BlogPage from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import PageOnProgress from './components/PageOnProgress';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Error Boundary to prevent blank screen on runtime errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh', background: '#f8fafc',
          fontFamily: 'system-ui, sans-serif', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ color: '#0A2472', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Terjadi kesalahan saat memuat halaman
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px' }}>
            {this.state.error?.message || 'Unknown error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem', background: '#0A2472', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem'
            }}
          >
            🔄 Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function AppContent() {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'about' | 'services' | 'portfolio' | 'blog' | 'contact' | 'progress'>('home');
  const { t } = useLanguage();

  const handleScrollTo = (rawId: string) => {
    const id = rawId.replace('#', '');
    if (id === 'portfolio') {
      setCurrentPage('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'blog') {
      setCurrentPage('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'pricing') {
      setCurrentPage('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'services') {
      setCurrentPage('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'about') {
      setCurrentPage('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'contact') {
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return;
    }

    const targetId = id === 'contact' ? 'contact' : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  React.useEffect(() => {
    if (isInitialLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInitialLoading]);

  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Wait briefly for React components to be fully mounted and styled
        setTimeout(() => {
          handleScrollTo(hash);
        }, 150);
      }
    };

    // Run on mount
    handleHashScroll();

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashScroll);
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0A2472] antialiased font-sans flex flex-col relative" id="app-root">
      {/* Initial Split Screen Loader */}
      {isInitialLoading && (
        <Loader 
          onComplete={() => setIsInitialLoading(false)} 
          onStartReveal={() => setIsRevealed(true)}
        />
      )}

      {/* Main page content wrapper with cinematic zoom/blur entrance */}
      <motion.div
        animate={isAnimationComplete ? {} : {
          scale: isRevealed ? 1 : 0.97,
          filter: isRevealed ? 'blur(0px)' : 'blur(5px)',
          opacity: isRevealed ? 1 : 0.8,
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1], // cinematic smooth ease-out
        }}
        onAnimationComplete={() => {
          if (isRevealed) {
            setIsAnimationComplete(true);
          }
        }}
        style={isAnimationComplete ? { filter: 'none', transform: 'none' } : undefined}
        className="min-h-screen flex flex-col w-full"
      >
        {/* Navigation */}
        <Navbar onScrollTo={handleScrollTo} currentPage={currentPage} />

        {/* Main Sections flow */}
        <main className="flex-1">
          {currentPage === 'home' ? (
            <>
              {/* Section 1: Hero (Beranda) */}
              <Hero onScrollTo={handleScrollTo} />

              {/* Section 2: Tentang Kami (About) */}
              <About />

              {/* Section 3: Ratusan Bisnis (Stats) */}
              <Stats />

              {/* Section 4: Solusi Kami (Services) */}
              <Services onScrollTo={handleScrollTo} />

              {/* Section 5: Harga Paket (Pricing) */}
              <Pricing onScrollTo={handleScrollTo} />

              {/* Section 6: Mengapa Memilih Kami (Why Choose Us) */}
              <WhyChooseUs />

              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'pricing' ? (
            <>
              <PricingPage 
                onBackToHome={() => handleScrollTo('home')} 
                onScrollToContact={() => handleScrollTo('contact')} 
              />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'services' ? (
            <>
              <ServicesPage 
                onBackToHome={() => handleScrollTo('home')} 
                onScrollToContact={() => handleScrollTo('contact')} 
              />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'blog' ? (
            <>
              <BlogPage 
                onBackToHome={() => handleScrollTo('home')} 
                onScrollToContact={() => handleScrollTo('contact')} 
              />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'portfolio' ? (
            <>
              <PortfolioPage 
                onBackToHome={() => handleScrollTo('home')} 
                onScrollToContact={() => handleScrollTo('contact')} 
                onPageProgress={() => setCurrentPage('progress')}
              />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'contact' ? (
            <>
              <ContactPage />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact-cta" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          ) : currentPage === 'progress' ? (
            <PageOnProgress onBackToPortfolio={() => setCurrentPage('portfolio')} />
          ) : (
            <>
              <AboutPage 
                onBackToHome={() => handleScrollTo('home')} 
                onScrollToContact={() => handleScrollTo('contact')} 
              />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          )}

          {/* Footer */}
          <div className="relative z-30 bg-[#0A2472]">
            <Footer onScrollTo={handleScrollTo} isCombined={false} />
          </div>
        </main>
      </motion.div>

      {/* Portfolio Modal */}
      <Modal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        title={t('portfolio.title')}
      >
        <Portfolio isModal={true} />
      </Modal>

      {/* Blog Modal */}
      <Modal
        isOpen={isBlogOpen}
        onClose={() => setIsBlogOpen(false)}
        title={t('blog.title')}
      >
        <Blog isModal={true} />
      </Modal>
    </div>
  );
}

