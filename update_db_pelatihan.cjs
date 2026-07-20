const mysql = require('mysql2/promise');
require('dotenv').config();

const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';

const newPlans = [
  {
    slug: 'social-media-handling-training',
    name: 'Social Media Handling',
    name_en: 'Social Media Handling',
    subtitle: 'Handling sosial media untuk promosi bisnis anda',
    subtitle_en: 'Social media handling for your business promotion',
    price: 'Rp 5.000.000 / Bulan',
    price_en: 'Rp 5M / Month',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handling sosial media untuk promosi bisnis anda']),
    bullets_en: JSON.stringify(['Social media handling for your business promotion']),
    category: 'Pelatihan',
    sort_order: 1,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'social-media-consulting-training',
    name: 'Social Media Consulting',
    name_en: 'Social Media Consulting',
    subtitle: 'Konsultasi strategi dan positioning sosial media',
    subtitle_en: 'Social media strategy and positioning consulting',
    price: 'Rp 500.000 / Session',
    price_en: 'Rp 500K / Session',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Konsultasi strategi dan positioning sosial media']),
    bullets_en: JSON.stringify(['Social media strategy and positioning consulting']),
    category: 'Pelatihan',
    sort_order: 2,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'content-writer-seo-training',
    name: 'Content Writer & SEO',
    name_en: 'Content Writer & SEO',
    subtitle: 'Handle penulisan artikel / blog / informasi anda dengan standar SEO Google untuk mempermudah indexing website Anda',
    subtitle_en: 'Handle writing articles / blogs / your information with Google SEO standards to facilitate indexing of your website',
    price: 'Rp 1.500.000 / 5 Konten Artikel',
    price_en: 'Rp 1.5M / 5 Article Contents',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle penulisan artikel / blog / informasi anda dengan standar SEO Google untuk mempermudah indexing website Anda']),
    bullets_en: JSON.stringify(['Handle writing articles / blogs / your information with Google SEO standards to facilitate indexing of your website']),
    category: 'Pelatihan',
    sort_order: 3,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'video-reels-content-training',
    name: 'Video Reels / Content',
    name_en: 'Video Reels / Content',
    subtitle: 'Pembuatan konten video dengan durasi singkat',
    subtitle_en: 'Short duration video content creation',
    price: 'Rp 500.000 / Content',
    price_en: 'Rp 500K / Content',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Pembuatan konten video dengan durasi singkat']),
    bullets_en: JSON.stringify(['Short duration video content creation']),
    category: 'Pelatihan',
    sort_order: 4,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'ecommerce-handling-training',
    name: 'E-Commerce Handling',
    name_en: 'E-Commerce Handling',
    subtitle: 'Handle akun e-commerce anda untuk melakukan optimalisasi dan aktivasi bisnis',
    subtitle_en: 'Handle your e-commerce account to optimize and activate business',
    price: 'Rp 5.000.000 / Bulan',
    price_en: 'Rp 5M / Month',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle akun e-commerce anda untuk melakukan optimalisasi dan aktivasi bisnis']),
    bullets_en: JSON.stringify(['Handle your e-commerce account to optimize and activate business']),
    category: 'Pelatihan',
    sort_order: 5,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'live-streaming-zoom-training',
    name: 'Live Streaming & Zoom Meeting',
    name_en: 'Live Streaming & Zoom Meeting',
    subtitle: 'Handle proses live streaming dan zoom meeting account',
    subtitle_en: 'Handle live streaming process and zoom meeting account',
    price: 'Rp 500.000 / Session',
    price_en: 'Rp 500K / Session',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle proses live streaming dan zoom meeting account']),
    bullets_en: JSON.stringify(['Handle live streaming process and zoom meeting account']),
    category: 'Pelatihan',
    sort_order: 6,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  }
];

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db'
  });

  // Delete existing
  await connection.query("DELETE FROM pricing_plans WHERE category = 'Pelatihan'");
  console.log("Deleted old Pelatihan plans");

  // Insert new
  for (const p of newPlans) {
    await connection.query(
      `INSERT INTO pricing_plans 
       (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, is_active, btn_text_id, btn_text_en, btn_link) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.slug, p.name, p.name_en, p.subtitle, p.subtitle_en, p.price, p.price_en, p.badge, p.badge_en, p.color_theme, p.bullets, p.bullets_en, p.category, p.sort_order, p.is_active, p.btn_text_id, p.btn_text_en, p.btn_link]
    );
  }
  console.log("Inserted new Pelatihan plans");
  await connection.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
