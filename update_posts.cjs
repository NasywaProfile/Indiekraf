const fs = require('fs');

// Portfolio Page
let portfolioContent = fs.readFileSync('src/components/PortfolioPage.tsx', 'utf8');

// Replace Projects Array items
portfolioContent = portfolioContent.replace(
  "title: 'Website MATIC Malang',",
  "title: language === 'id' ? 'Website MATIC Malang' : 'MATIC Malang Website',"
).replace(
  "description: 'Sistem informasi manajemen surat keterangan domisili perusahaan Kabupaten Malang.',",
  "description: language === 'id' ? 'Sistem informasi manajemen surat keterangan domisili perusahaan Kabupaten Malang.' : 'Information management system for company domicile certificates in Malang Regency.',"
).replace(
  "title: 'Website DASTING Malang',",
  "title: language === 'id' ? 'Website DASTING Malang' : 'DASTING Malang Website',"
).replace(
  "description: 'Portal data statistik dan informasi Kabupaten Malang.',",
  "description: language === 'id' ? 'Portal data statistik dan informasi Kabupaten Malang.' : 'Statistical data and information portal for Malang Regency.',"
).replace(
  "title: 'Website Bakaoo',",
  "title: language === 'id' ? 'Website Bakaoo' : 'Bakaoo Website',"
).replace(
  "description: 'Platform e-commerce untuk produk lokal dan UMKM Indonesia.',",
  "description: language === 'id' ? 'Platform e-commerce untuk produk lokal dan UMKM Indonesia.' : 'E-commerce platform for local products and Indonesian MSMEs.',"
).replace(
  "title: 'Key Visual Bank BNI',",
  "title: language === 'id' ? 'Key Visual Bank BNI' : 'Bank BNI Key Visual',"
).replace(
  "description: 'Design key visual untuk berbagai campaign dan program promosi Bank BNI.',",
  "description: language === 'id' ? 'Design key visual untuk berbagai campaign dan program promosi Bank BNI.' : 'Key visual design for various campaigns and promotional programs of Bank BNI.',"
).replace(
  "title: 'Dashboard Evaluasi Perumda Tirta Kanjuruhan',",
  "title: language === 'id' ? 'Dashboard Evaluasi Perumda Tirta Kanjuruhan' : 'Perumda Tirta Kanjuruhan Evaluation Dashboard',"
).replace(
  "description: 'Dashboard evaluasi dan kinerja untuk monitoring operasional Perumda Tirta Kanjuruhan.',",
  "description: language === 'id' ? 'Dashboard evaluasi dan kinerja untuk monitoring operasional Perumda Tirta Kanjuruhan.' : 'Evaluation and performance dashboard for operational monitoring of Perumda Tirta Kanjuruhan.',"
).replace(
  "title: 'Website MATWeb E-Perbaikan Tirta Kanjuruhan IC Malang',",
  "title: language === 'id' ? 'Website MATWeb E-Perbaikan Tirta Kanjuruhan IC Malang' : 'MATWeb E-Perbaikan Tirta Kanjuruhan IC Malang Website',"
).replace(
  "description: 'Sistem aplikasi web untuk manajemen dan tracking perbaikan infrastruktur Perumda Tirta Kanjuruhan.',",
  "description: language === 'id' ? 'Sistem aplikasi web untuk manajemen dan tracking perbaikan infrastruktur Perumda Tirta Kanjuruhan.' : 'Web application system for infrastructure repair management and tracking for Perumda Tirta Kanjuruhan.',"
).replace(
  "description: 'Website e-commerce premium untuk brand perhiasan internasional.',",
  "description: language === 'id' ? 'Website e-commerce premium untuk brand perhiasan internasional.' : 'Premium e-commerce website for an international jewelry brand.',"
).replace(
  "title: 'Social Media Handling FEB UB',",
  "title: language === 'id' ? 'Social Media Handling FEB UB' : 'FEB UB Social Media Handling',"
).replace(
  "description: 'Pengelolaan sosial media Department Manajemen Fakultas Ekonomi & Bisnis Universitas Brawijaya.',",
  "description: language === 'id' ? 'Pengelolaan sosial media Department Manajemen Fakultas Ekonomi & Bisnis Universitas Brawijaya.' : 'Social media management for the Management Department, Faculty of Economics & Business, Universitas Brawijaya.',"
).replace(
  "title: 'Key Visual Syngenta',",
  "title: language === 'id' ? 'Key Visual Syngenta' : 'Syngenta Key Visual',"
).replace(
  "description: 'Design key visual untuk campaign dan aktivitas marketing brand agribisnis multinasional Syngenta.',",
  "description: language === 'id' ? 'Design key visual untuk campaign dan aktivitas marketing brand agribisnis multinasional Syngenta.' : 'Key visual design for campaigns and marketing activities of multinational agribusiness brand Syngenta.',"
);

fs.writeFileSync('src/components/PortfolioPage.tsx', portfolioContent);

// Blog Page
let blogContent = fs.readFileSync('src/components/BlogPage.tsx', 'utf8');
blogContent = blogContent.replace(
  "title: 'Tren Digital Marketing 2025 yang Wajib Diketahui',",
  "title: language === 'id' ? 'Tren Digital Marketing 2025 yang Wajib Diketahui' : '2025 Digital Marketing Trends You Must Know',"
).replace(
  "description: 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.',",
  "description: language === 'id' ? 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.' : 'Learn the latest digital marketing strategies to help your business grow in the digital era.',"
).replace(
  "title: 'Panduan Lengkap Membangun Brand Identity yang Kuat',",
  "title: language === 'id' ? 'Panduan Lengkap Membangun Brand Identity yang Kuat' : 'Complete Guide to Building a Strong Brand Identity',"
).replace(
  "description: 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.',",
  "description: language === 'id' ? 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.' : 'Practical steps to create a memorable brand identity.',"
).replace(
  "title: 'UI/UX Design: Prinsip Dasar untuk Pemula',",
  "title: language === 'id' ? 'UI/UX Design: Prinsip Dasar untuk Pemula' : 'UI/UX Design: Basic Principles for Beginners',"
).replace(
  "description: 'Memahami fundamental UI/UX design untuk menciptakan pengalaman pengguna optimal.',",
  "description: language === 'id' ? 'Memahami fundamental UI/UX design untuk menciptakan pengalaman pengguna optimal.' : 'Understanding fundamental UI/UX design to create optimal user experiences.',"
).replace(
  "title: 'Cara Mengoptimalkan Website untuk SEO',",
  "title: language === 'id' ? 'Cara Mengoptimalkan Website untuk SEO' : 'How to Optimize Your Website for SEO',"
).replace(
  "description: 'Tips dan trik meningkatkan peringkat website Anda di mesin pencari Google.',",
  "description: language === 'id' ? 'Tips dan trik meningkatkan peringkat website Anda di mesin pencari Google.' : 'Tips and tricks to improve your website ranking on Google search engine.',"
).replace(
  "title: 'Social Media Marketing: Strategi Konten yang Efektif',",
  "title: language === 'id' ? 'Social Media Marketing: Strategi Konten yang Efektif' : 'Social Media Marketing: Effective Content Strategy',"
).replace(
  "description: 'Panduan membuat konten social media yang engaging dan meningkatkan awareness.',",
  "description: language === 'id' ? 'Panduan membuat konten social media yang engaging dan meningkatkan awareness.' : 'Guide to creating engaging social media content and increasing awareness.',"
).replace(
  "title: 'Pentingnya Riset Pasar dalam Pengembangan Produk',",
  "title: language === 'id' ? 'Pentingnya Riset Pasar dalam Pengembangan Produk' : 'The Importance of Market Research in Product Development',"
).replace(
  "description: 'Mengapa riset pasar menjadi kunci kesuksesan dalam meluncurkan produk baru.',",
  "description: language === 'id' ? 'Mengapa riset pasar menjadi kunci kesuksesan dalam meluncurkan produk baru.' : 'Why market research is key to success when launching new products.',"
);

fs.writeFileSync('src/components/BlogPage.tsx', blogContent);

