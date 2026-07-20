const fs = require('fs');
let content = fs.readFileSync('src/components/BlogPage.tsx', 'utf8');

const tDefinitionStr = `  const t = {
    id: {
      badge: "INDIEKRAF INSIGHT & BERITA",
      title: "Katalog Artikel, Riset & Inspirasi Ekosistem Kreatif",
      subtitle: "Temukan berita industri digital terbaru, analisis trend ekonomi kreatif, tips praktis pertumbuhan bisnis, serta ulasan mendalam komunitas lokal di Indonesia.",
      searchPlaceholder: "Cari topik, judul artikel, atau kata kunci...",
      featuredCategory: "TRAINING",
      featuredTitle: "Workshop Digital Marketing: Tingkatkan Skill Marketing Anda",
      featuredDesc: "Industri kreatif membutuhkan penyelarasan berkelanjutan antara riset pasar, integrasi teknologi mutakhir, serta pembinaan kompetensi SDM di era modern.",
      featuredBody: "Ulasan ini membedah bagaimana elemen pentahelix (pemerintah, swasta, komunitas, akademisi, dan media) bersinergi harmonis di Kota Malang untuk mempercepat lahirnya kekayaan intelektual global...",
      readMore: "Baca Selengkapnya",
      newsletterTitle: "Dapatkan Insight Terkurasi Langsung ke Email",
      newsletterBadge: "KIRIM INSIGHT",
      emailPlaceholder: "Masukkan alamat email aktif...",
      pressTitle: "Punya Berita atau Rilis Pers Mengenai Brand / Event Anda?",
      pressBadge: "KONTRIBUSI PERS / PRESS RELEASE",
      pressDesc: "Publikasikan artikel, siaran pers, atau profil tokoh industri kreatif Anda di Indiekraf Media untuk menjangkau puluhan ribu pembaca aktif dan meningkatkan SEO kredibilitas merek Anda.",
      pressBtn: "Kirim Rilis Pers Sekarang"
    },
    en: {
      badge: "INDIEKRAF INSIGHT & NEWS",
      title: "Article Catalog, Research & Creative Ecosystem Inspiration",
      subtitle: "Discover the latest digital industry news, creative economy trend analysis, practical business growth tips, and in-depth reviews of local communities in Indonesia.",
      searchPlaceholder: "Search topics, article titles, or keywords...",
      featuredCategory: "TRAINING",
      featuredTitle: "Digital Marketing Workshop: Level Up Your Marketing Skills",
      featuredDesc: "The creative industry requires continuous alignment between market research, cutting-edge technology integration, and HR competency development in the modern era.",
      featuredBody: "This review dissects how pentahelix elements (government, private sector, community, academia, and media) synergize harmoniously in Malang City to accelerate the birth of global intellectual property...",
      readMore: "Read More",
      newsletterTitle: "Get Curated Insights Directly to Your Email",
      newsletterBadge: "SEND INSIGHT",
      emailPlaceholder: "Enter your active email address...",
      pressTitle: "Have News or Press Release About Your Brand / Event?",
      pressBadge: "PRESS CONTRIBUTION / PRESS RELEASE",
      pressDesc: "Publish your articles, press releases, or creative industry figure profiles on Indiekraf Media to reach tens of thousands of active readers and improve your brand's SEO credibility.",
      pressBtn: "Submit Press Release Now"
    }
  };`;

const newTDef = `  const t = {
    id: {
      badge: "INDIEKRAF INSIGHT & BERITA",
      title: "Katalog Artikel, Riset & Inspirasi Ekosistem Kreatif",
      subtitle: "Temukan berita industri digital terbaru, analisis trend ekonomi kreatif, tips praktis pertumbuhan bisnis, serta ulasan mendalam komunitas lokal di Indonesia.",
      searchPlaceholder: "Cari topik, judul artikel, atau kata kunci...",
      featuredCategory: "TRAINING",
      featuredTitle: "Workshop Digital Marketing: Tingkatkan Skill Marketing Anda",
      featuredDesc: "Industri kreatif membutuhkan penyelarasan berkelanjutan antara riset pasar, integrasi teknologi mutakhir, serta pembinaan kompetensi SDM di era modern.",
      featuredBody: "Ulasan ini membedah bagaimana elemen pentahelix (pemerintah, swasta, komunitas, akademisi, dan media) bersinergi harmonis di Kota Malang untuk mempercepat lahirnya kekayaan intelektual global...",
      readMore: "Baca Selengkapnya",
      newsletterTitle: "Dapatkan Insight Terkurasi Langsung ke Email",
      newsletterDesc: "Rangkuman riset tren industri kreatif, tips bisnis, dan webinar eksklusif yang dikirim setiap hari Selasa pagi tanpa spam.",
      newsletterBadge: "KIRIM INSIGHT",
      emailPlaceholder: "Masukkan alamat email aktif...",
      pressTitle: "Punya Berita atau Rilis Pers Mengenai Brand / Event Anda?",
      pressBadge: "KONTRIBUSI PERS / PRESS RELEASE",
      pressDesc: "Publikasikan artikel, siaran pers, atau profil tokoh industri kreatif Anda di Indiekraf Media untuk menjangkau puluhan ribu pembaca aktif dan meningkatkan SEO kredibilitas merek Anda.",
      pressBtn: "Kirim Rilis Pers Sekarang"
    },
    en: {
      badge: "INDIEKRAF INSIGHT & NEWS",
      title: "Article Catalog, Research & Creative Ecosystem Inspiration",
      subtitle: "Discover the latest digital industry news, creative economy trend analysis, practical business growth tips, and in-depth reviews of local communities in Indonesia.",
      searchPlaceholder: "Search topics, article titles, or keywords...",
      featuredCategory: "TRAINING",
      featuredTitle: "Digital Marketing Workshop: Level Up Your Marketing Skills",
      featuredDesc: "The creative industry requires continuous alignment between market research, cutting-edge technology integration, and HR competency development in the modern era.",
      featuredBody: "This review dissects how pentahelix elements (government, private sector, community, academia, and media) synergize harmoniously in Malang City to accelerate the birth of global intellectual property...",
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
  };`;

content = content.replace(tDefinitionStr, newTDef);

content = content.replace(
  `Rangkuman riset tren industri kreatif, tips bisnis, dan webinar eksklusif yang dikirim setiap hari Selasa pagi tanpa spam.`,
  `{ct.newsletterDesc}`
);

fs.writeFileSync('src/components/BlogPage.tsx', content);
console.log("BlogPage updated.");
