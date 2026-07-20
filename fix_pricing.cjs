const fs = require('fs');
let content = fs.readFileSync('src/components/PricingPage.tsx', 'utf8');

// Undo the replacements that used 'language ===' in pricingData
content = content.replace(/subtitle: language === 'id' \? 'Desain Responsif - Landing Page - E-commerce' : 'Responsive Design - Landing Page - E-commerce'/g, "subtitle: 'Desain Responsif - Landing Page - E-commerce'");
content = content.replace(/subtitle: language === 'id' \? 'Sesi Privat - Analisis Kompetitor - Action Plan' : 'Private Session - Competitor Analysis - Action Plan'/g, "subtitle: 'Sesi Privat - Analisis Kompetitor - Action Plan'");
content = content.replace(/subtitle: language === 'id' \? 'Konsultasi satu jam tatap muka online' : 'One hour online face-to-face consultation'/g, "subtitle: 'Konsultasi satu jam tatap muka online'");
content = content.replace(/subtitle: language === 'id' \? 'Halaman tunggal yang didesain untuk konversi tinggi' : 'Single page designed for high conversion'/g, "subtitle: 'Halaman tunggal yang didesain untuk konversi tinggi'");
content = content.replace(/subtitle: language === 'id' \? 'Website multi-halaman profesional untuk kredibilitas bisnis' : 'Professional multi-page website for business credibility'/g, "subtitle: 'Website multi-halaman profesional untuk kredibilitas bisnis'");
content = content.replace(/subtitle: language === 'id' \? 'Toko online lengkap dengan payment gateway' : 'Complete online store with payment gateway integration'/g, "subtitle: 'Toko online lengkap dengan payment gateway'");
content = content.replace(/subtitle: language === 'id' \? 'Aplikasi web kustom sesuai proses bisnis unik Anda' : 'Custom web app tailored to your unique business processes'/g, "subtitle: 'Aplikasi web kustom sesuai proses bisnis unik Anda'");
content = content.replace(/subtitle: language === 'id' \? 'Pendampingan strategi bisnis selama satu bulan penuh' : 'Full-month business strategy mentoring'/g, "subtitle: 'Pendampingan strategi bisnis selama satu bulan penuh'");
content = content.replace(/subtitle: language === 'id' \? 'Konsultan khusus untuk jajaran direksi & manajemen' : 'Dedicated consultant for boards & management'/g, "subtitle: 'Konsultan khusus untuk jajaran direksi & manajemen'");
content = content.replace(/subtitle: language === 'id' \? 'Penyusunan peta jalan pemasaran digital satu tahun' : 'One-year digital marketing roadmap setup'/g, "subtitle: 'Penyusunan peta jalan pemasaran digital satu tahun'");
content = content.replace(/title: language === 'id' \? 'Website Development' : 'Website Development'/g, "title: 'Website Development'");

fs.writeFileSync('src/components/PricingPage.tsx', content);
