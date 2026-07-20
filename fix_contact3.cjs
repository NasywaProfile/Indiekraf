const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');
content = content.replace(
  'Email Kami',
  '{language === "id" ? "Email Kami" : "Email Us"}'
).replace(
  'fikar@indiekraf.com',
  'fikar@indiekraf.com'
).replace(
  'Tim kami segera merespons 1x24 jam kerja.',
  '{language === "id" ? "Tim kami segera merespons 1x24 jam kerja." : "Our team will respond within 1x24 business hours."}'
).replace(
  'WhatsApp Langsung',
  '{language === "id" ? "WhatsApp Langsung" : "Direct WhatsApp"}'
).replace(
  'Klik chat untuk ngobrol instan dan nyaman.',
  '{language === "id" ? "Klik chat untuk ngobrol instan dan nyaman." : "Click chat for instant and comfortable talk."}'
).replace(
  'Atau Gunakan Form Resmi',
  '{language === "id" ? "Atau Gunakan Form Resmi" : "Or Use Official Form"}'
).replace(
  'Isi kebutuhan spesifik Anda di bawah ini',
  '{language === "id" ? "Isi kebutuhan spesifik Anda di bawah ini" : "Fill your specific needs below"}'
).replace(
  'Nama Lengkap / Instansi',
  '{language === "id" ? "Nama Lengkap / Instansi" : "Full Name / Institution"}'
).replace(
  'Masukkan nama lengkap atau instansi Anda',
  '{language === "id" ? "Masukkan nama lengkap atau instansi Anda" : "Enter your full name or institution"}'
).replace(
  'Alamat Email',
  '{language === "id" ? "Alamat Email" : "Email Address"}'
).replace(
  'Masukkan alamat email aktif',
  '{language === "id" ? "Masukkan alamat email aktif" : "Enter an active email address"}'
).replace(
  'Topik & Tujuan Pesan',
  '{language === "id" ? "Topik & Tujuan Pesan" : "Topic & Message Purpose"}'
).replace(
  'Ceritakan detail project, goals, atau pertanyaan Anda...',
  '{language === "id" ? "Ceritakan detail project, goals, atau pertanyaan Anda..." : "Tell us your project details, goals, or questions..."}'
).replace(
  'Kirim Pesan Sekarang',
  '{language === "id" ? "Kirim Pesan Sekarang" : "Send Message Now"}'
);
fs.writeFileSync('src/components/ContactPage.tsx', content);
