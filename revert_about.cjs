const fs = require('fs');
let content = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');
content = content.replace(
  'projects: language === "id" ? "100+ Proyek" : "100+ Projects"',
  'projects: "100+ Proyek"'
).replace(
  'title: language === "id" ? "Arah Yang Kami Tuju" : "Our Direction"',
  'title: "Arah Yang Kami Tuju"'
).replace(
  'title: language === "id" ? "Apa Yang Kami Impikan" : "What We Dream Of"',
  'title: "Apa Yang Kami Impikan"'
).replace(
  'title: language === "id" ? "Bagaimana Kami Melangkah" : "How We Step Forward"',
  'title: "Bagaimana Kami Melangkah"'
).replace(
  'alert: language === "id" ? "Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi." : "All legal documents are available and fully verifiable for official collaborations."',
  'alert: "Semua dokumen legalitas tersedia dan dapat diverifikasi secara transparan untuk kerja sama resmi."'
).replace(
  'title: language === "id" ? "Pendekatan Kami" : "Our Approach"',
  'title: "Pendekatan Kami"'
).replace(
  'title: language === "id" ? "Siapa Yang Kami Layani?" : "Who We Serve?"',
  'title: "Siapa Yang Kami Layani?"'
);

fs.writeFileSync('src/components/AboutPage.tsx', content);
