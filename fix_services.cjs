const fs = require('fs');
let content = fs.readFileSync('src/components/ServicesPage.tsx', 'utf8');

const tDefinitionStr = `  const t = {
    id: {
      backBtn: "Kembali ke Beranda",
      badge: "INDIEKRAF MEDIA & KREATIF | LAYANAN",
      title: "Layanan Terbaik untuk",
      titleHighlight: "Pertumbuhan Bisnis Anda",
      subtitle:
        "Kami mengintegrasikan riset data, pengembangan SDM unggul, agensi kreatif modern, dan penerbitan media tepercaya untuk menghadirkan solusi transformasi bisnis yang berkelanjutan.",
      contactBtn: "HUBUNGI TERKAIT INI",
      footerPartner: "Kemitraan Indiekraf",
      footerPartnerDesc: "MALANG, JAWA TIMUR - EST. 2018",
    },
    en: {
      backBtn: "Back to Home",
      badge: "INDIEKRAF MEDIA & CREATIVE | SERVICES",
      title: "Best Services for",
      titleHighlight: "Your Business Growth",
      subtitle:
        "We integrate data research, superior HR development, modern creative agencies, and trusted media publishing to deliver sustainable business transformation solutions.",
      contactBtn: "CONTACT ABOUT THIS",
      footerPartner: "Indiekraf Partnership",
      footerPartnerDesc: "MALANG, EAST JAVA - EST. 2018",
    }
  };`;

content = content.replace(`          <motion.div 
            variants={cardEntrance}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest bg-blue-50 text-[#0A2472] border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span>SERVICES KAMI</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={cardEntrance}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.1] mb-6"
          >
            Layanan Terbaik untuk<br />
            <span className="text-[#1e3a8a]">Pertumbuhan Bisnis Anda</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={cardEntrance}
            className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Kami mengintegrasikan riset data, pengembangan SDM unggul, agensi kreatif modern, dan penerbitan media tepercaya untuk menghadirkan solusi transformasi bisnis yang berkelanjutan.
          </motion.p>`, `          <motion.div 
            variants={cardEntrance}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-[10px] font-bold tracking-widest bg-blue-50 text-[#0A2472] border border-blue-100 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A2472] animate-pulse" />
            <span>{t[language as keyof typeof t].badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={cardEntrance}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold text-[#0A2472] tracking-tight leading-[1.1] mb-6"
          >
            {t[language as keyof typeof t].title}<br />
            <span className="text-[#1e3a8a]">{t[language as keyof typeof t].titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={cardEntrance}
            className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {t[language as keyof typeof t].subtitle}
          </motion.p>`);

fs.writeFileSync('src/components/ServicesPage.tsx', content);
console.log("ServicesPage hardcoded strings updated.");
