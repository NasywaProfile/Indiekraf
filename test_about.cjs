const fs = require('fs');
let content = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');
content = content.replace(
  'projects: "100+ Proyek"',
  'projects: language === "id" ? "100+ Proyek" : "100+ Projects"'
).replace(
  'title: "Arah Yang Kami Tuju"',
  'title: language === "id" ? "Arah Yang Kami Tuju" : "Our Direction"'
).replace(
  'title: "Apa Yang Kami Impikan"',
  'title: language === "id" ? "Apa Yang Kami Impikan" : "What We Dream Of"'
).replace(
  'title: "Bagaimana Kami Melangkah"',
  'title: language === "id" ? "Bagaimana Kami Melangkah" : "How We Step Forward"'
).replace(
  'alert: "Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi."',
  'alert: language === "id" ? "Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi." : "All legal documents are available and fully verifiable for official collaborations."'
).replace(
  'title: "Pendekatan Kami"',
  'title: language === "id" ? "Pendekatan Kami" : "Our Approach"'
).replace(
  'title: "Siapa Yang Kami Layani?"',
  'title: language === "id" ? "Siapa Yang Kami Layani?" : "Who We Serve?"'
).replace(
  'ctaSubtitle: "Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya."',
  'ctaSubtitle: language === "id" ? "Hubungi Tim Indiekraf Untuk Konsultasi Layanan, Request Proposal, dan Estimasi Biaya." : "Contact Indiekraf Team for Service Consultation, Proposal Request, and Cost Estimation."'
);

fs.writeFileSync('src/components/AboutPage.tsx', content);
