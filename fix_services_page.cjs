const fs = require('fs');
let content = fs.readFileSync('src/components/ServicesPage.tsx', 'utf8');

const replacements = {
  'title: "Praktisi Mengajar"': 'title: language === "id" ? "Praktisi Mengajar" : "Practitioner Teaching"',
  'title: "Creative Tour"': 'title: language === "id" ? "Creative Tour" : "Creative Tour"',
  'title: "Sertifikasi BNSP"': 'title: language === "id" ? "Sertifikasi BNSP" : "BNSP Certification"',
  'title: "Riset Produk & Digital"': 'title: language === "id" ? "Riset Produk & Digital" : "Product & Digital Research"',
  'title: "Kebijakan Publik"': 'title: language === "id" ? "Kebijakan Publik" : "Public Policy"',
  'title: "Pengembangan Komunitas"': 'title: language === "id" ? "Pengembangan Komunitas" : "Community Development"',
  'title: "Kota Kreatif"': 'title: language === "id" ? "Kota Kreatif" : "Creative City"'
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.replace(key, value);
}

fs.writeFileSync('src/components/ServicesPage.tsx', content);
