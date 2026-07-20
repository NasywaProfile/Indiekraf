const mysql = require('mysql2/promise');
require('dotenv').config();

const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';

const newPlans = [
  {
    slug: 'brand-identity-development',
    name: 'Brand Identity Development',
    name_en: 'Brand Identity Development',
    subtitle: 'Handling pembuatan brand identity untuk membangun bisnis anda.',
    subtitle_en: 'Brand identity development handling to build your business.',
    price: 'Rp 5.000.000',
    price_en: 'Rp 5M',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handling pembuatan brand identity untuk membangun bisnis anda.']),
    bullets_en: JSON.stringify(['Brand identity development handling to build your business.']),
    category: 'Branding',
    sort_order: 1,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'key-visual-social-media',
    name: 'Key Visual Social Media',
    name_en: 'Key Visual Social Media',
    subtitle: 'Handle pembuatan illustrasi/gambar sosial media untuk pemasaran usaha/bisnis.',
    subtitle_en: 'Social media illustration/image creation handling for business marketing.',
    price: 'Rp 5.000.000 / Bulan',
    price_en: 'Rp 5M / Month',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle pembuatan illustrasi/gambar sosial media untuk pemasaran usaha/bisnis.']),
    bullets_en: JSON.stringify(['Social media illustration/image creation handling for business marketing.']),
    category: 'Branding',
    sort_order: 2,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'brand-activation-promotion-tools',
    name: 'Brand Activation / Promotion Tools',
    name_en: 'Brand Activation / Promotion Tools',
    subtitle: 'Handle pembuatan alat promosi anda untuk meningkatkan brand bisnis.',
    subtitle_en: 'Promotion tools creation handling to enhance business brand.',
    price: 'Rp 6.000.000',
    price_en: 'Rp 6M',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle pembuatan alat promosi anda untuk meningkatkan brand bisnis.']),
    bullets_en: JSON.stringify(['Promotion tools creation handling to enhance business brand.']),
    category: 'Branding',
    sort_order: 3,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'iconography',
    name: 'Iconography',
    name_en: 'Iconography',
    subtitle: 'Handling pembuatan design icon/ simbol.',
    subtitle_en: 'Icon/symbol design creation handling.',
    price: 'Rp 5.000.000',
    price_en: 'Rp 5M',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handling pembuatan design icon/ simbol.']),
    bullets_en: JSON.stringify(['Icon/symbol design creation handling.']),
    category: 'Branding',
    sort_order: 4,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'packaging-label-design',
    name: 'Packaging & Label Design',
    name_en: 'Packaging & Label Design',
    subtitle: 'Handle design packaging dan label untuk optimalisasi bisnis anda.',
    subtitle_en: 'Packaging and label design handling to optimize your business.',
    price: 'Rp 5.000.000',
    price_en: 'Rp 5M',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle design packaging dan label untuk optimalisasi bisnis anda.']),
    bullets_en: JSON.stringify(['Packaging and label design handling to optimize your business.']),
    category: 'Branding',
    sort_order: 5,
    is_active: 1,
    btn_text_id: '',
    btn_text_en: '',
    btn_link: WA_LINK
  },
  {
    slug: 'book-layout-design',
    name: 'Book & Layout Design',
    name_en: 'Book & Layout Design',
    subtitle: 'Handle pembuatan design layout dan buku untuk usaha/bisnis anda.',
    subtitle_en: 'Layout and book design creation handling for your business.',
    price: 'Rp 5.000.000',
    price_en: 'Rp 5M',
    badge: 'STARTER',
    badge_en: 'STARTER',
    color_theme: 'blue',
    bullets: JSON.stringify(['Handle pembuatan design layout dan buku untuk usaha/bisnis anda.']),
    bullets_en: JSON.stringify(['Layout and book design creation handling for your business.']),
    category: 'Branding',
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
  await connection.query("DELETE FROM pricing_plans WHERE category = 'Branding'");
  console.log("Deleted old Branding plans");

  // Insert new
  for (const p of newPlans) {
    await connection.query(
      `INSERT INTO pricing_plans 
       (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, is_active, btn_text_id, btn_text_en, btn_link) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.slug, p.name, p.name_en, p.subtitle, p.subtitle_en, p.price, p.price_en, p.badge, p.badge_en, p.color_theme, p.bullets, p.bullets_en, p.category, p.sort_order, p.is_active, p.btn_text_id, p.btn_text_en, p.btn_link]
    );
  }
  console.log("Inserted new Branding plans");
  await connection.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
