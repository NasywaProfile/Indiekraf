import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, ShieldCheck, Cpu, Zap, Presentation, Award, Sparkles, CheckCircle2, Star, Layers, Tag } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const iconMap: Record<string, any> = {
  Target,
  ShieldCheck,
  Cpu,
  Zap,
  Award,
  Presentation,
  Sparkles,
  CheckCircle2,
  Star,
  Layers,
  Tag
};

export default function About() {
  const { style, accent } = useTheme();
  const { t, settings, language } = useLanguage();

  const aboutImages = useMemo(() => {
    if (settings.about_photos_list) {
      try {
        const parsed = JSON.parse(settings.about_photos_list);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    if (settings.about_image) return [settings.about_image];
    return ["/gambar.jpg"];
  }, [settings.about_photos_list, settings.about_image]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [aboutImages.length]);

  const pills = useMemo(() => {
    if (settings.about_pills_list) {
      try {
        const parsed = JSON.parse(settings.about_pills_list);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            label: language === 'en' ? (item.labelEn || item.labelId) : (item.labelId || item.labelEn),
            icon: iconMap[item.iconName] || Target,
            color: "bg-[#0A2472]/5 text-[#0A2472] border-[#0A2472]/15"
          }));
        }
      } catch (e) {}
    }
    return [
      {
        label: t("why.feat.integrated.title"),
        icon: Target,
        color: "bg-[#0A2472]/5 text-[#0A2472] border-[#0A2472]/15",
      },
      {
        label: t("pricing.plan.branding.name"),
        icon: ShieldCheck,
        color: "bg-[#0A2472]/5 text-[#0A2472] border-[#0A2472]/15",
      },
      {
        label: t("why.feat.datadriven.title"),
        icon: Cpu,
        color: "bg-[#0A2472]/5 text-[#0A2472] border-[#0A2472]/15",
      },
      {
        label: t("why.feat.track.title"),
        icon: Zap,
        color: "bg-[#0A2472]/5 text-[#0A2472] border-[#0A2472]/15",
      },
    ];
  }, [settings.about_pills_list, language, t]);

  // Accent mappings for highlights and badges
  const textAccents = {
    blue: "text-[#0A2472]",
    indigo: "text-[#0A2472]",
    emerald: "text-emerald-600",
    amber: "text-amber-500",
  };

  const badgeAccents = {
    blue: "bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]",
    indigo: "bg-[#0A2472]/5 border-[#0A2472]/15 text-[#0A2472]",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
  };

  return (
    <section
      id="about"
      className="py-20 lg:py-0 bg-[#EEF3FF] relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Ornaments based on style */}
      {style === "mesh" && (
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      {style === "glow" && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Text Column */}
          <div
            className="flex flex-col justify-center space-y-6 text-left items-start"
            id="about-text-container"
          >
            {/* Headline */}
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-tight max-w-xl"
              id="about-title"
            >
              {t("about.title")}
            </h2>

            {/* Descriptions */}
            <div
              className="space-y-4 text-[10px] sm:text-xs md:text-[13px] lg:text-sm text-slate-500 leading-relaxed font-medium max-w-xl"
              id="about-descriptions"
            >
              {(() => {
                const desc = t("about.content1");
                if (desc && desc.includes('\n')) {
                  return desc.split(/\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ));
                }
                return (
                  <>
                    <p>{t("about.content1")}</p>
                    {t("about.content2") && <p>{t("about.content2")}</p>}
                    {t("about.content3") && <p>{t("about.content3")}</p>}
                  </>
                );
              })()}
            </div>

            {/* Pills/Tags list */}
            <div
              className="pt-2 flex flex-wrap justify-start gap-2.5 max-w-xl"
              id="about-pills"
            >
              {pills.map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center px-5 py-2.5 rounded-[10px] border font-bold text-[11px] sm:text-xs transition-all duration-300 ${pill.color} shadow-sm`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="uppercase tracking-widest">
                      {pill.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Image Column */}
          <div className="flex justify-center lg:justify-end lg:items-center h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="relative w-full max-w-xl aspect-[5/4] lg:aspect-[4/3] group"
            >
              <div className="absolute inset-0 bg-[#0A2472]/10 rounded-[10px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-full w-full overflow-hidden rounded-[10px] border-[10px] border-white shadow-2xl bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    src={aboutImages[currentImageIndex]}
                    alt="Indiekraf Creative Collaboration"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2472]/30 to-transparent mix-blend-overlay pointer-events-none" />
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#38BDF8] rounded-full blur-[100px] opacity-20 pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0A2472] rounded-full blur-[100px] opacity-15 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
