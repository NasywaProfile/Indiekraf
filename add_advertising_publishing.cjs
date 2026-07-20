const mysql = require('mysql2/promise');
require('dotenv').config();

const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';

async function update() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db'
  });

  // 1. Fetch current categories
  const [rows] = await connection.query("SELECT * FROM site_settings WHERE `key` = 'pricing_categories_data'");
  let categories = [];
  if (rows[0] && rows[0].value) {
    try {
      categories = JSON.parse(rows[0].value);
    } catch (e) {
      console.error(e);
    }
  }

  // Check if cat-advertising-publishing already exists
  const exists = categories.some(cat => cat.id === 'cat-advertising-publishing');
  if (!exists) {
    // Insert at the beginning of categories list
    categories.unshift({
      id: 'cat-advertising-publishing',
      categoryName: 'Advertising & Publishing',
      categoryName_en: 'Advertising & Publishing',
      title: 'Advertising & Publishing',
      title_en: 'Advertising & Publishing',
      subtitle: 'Iklan di Website - Advertorial Berita - Event Publishing - Promosi Bisnis UMKM',
      subtitle_en: 'Website Ads - News Advertorial - Event Publishing - MSME Business Promotion',
      icon: 'Megaphone'
    });
    const val = JSON.stringify(categories);
    await connection.query('INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?', ['pricing_categories_data', val, val]);
    console.log("Updated categories in site_settings");
  } else {
    console.log("Category already exists in site_settings");
  }

  // 2. Insert plans for Advertising & Publishing
  // Delete existing to avoid duplicates
  await connection.query("DELETE FROM pricing_plans WHERE category = 'Advertising & Publishing'");
  console.log("Cleared old plans for Advertising & Publishing");

  const newPlans = [
    {
      slug: 'iklan-di-website',
      name: 'Iklan di Website',
      name_en: 'Website Advertising',
      subtitle: 'Kami pasang Konten anda di Website indiekraf.com',
      subtitle_en: 'We place your Content on the indiekraf.com Website',
      price: 'Rp 500.000 / Bulan',
      price_en: 'Rp 500K / Month',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Kami pasang Konten anda di Website indiekraf.com']),
      bullets_en: JSON.stringify(['We place your Content on the indiekraf.com Website']),
      category: 'Advertising & Publishing',
      sort_order: 1,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'advertorial-berita',
      name: 'Advertorial Berita',
      name_en: 'News Advertorial',
      subtitle: 'Kami publish berita / artikel anda di Website Indiekraf.com',
      subtitle_en: 'We publish your news / articles on the Indiekraf.com Website',
      price: 'Rp 300.000 / Post',
      price_en: 'Rp 300K / Post',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Kami publish berita / artikel anda di Website Indiekraf.com']),
      bullets_en: JSON.stringify(['We publish your news / articles on the Indiekraf.com Website']),
      category: 'Advertising & Publishing',
      sort_order: 2,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'event-publishing',
      name: 'Event Publishing',
      name_en: 'Event Publishing',
      subtitle: 'Kami publish event anda di Website dan Seluruh Sosial Media Indiekraf Indonesia',
      subtitle_en: 'We publish your event on the Website and All Social Media of Indiekraf Indonesia',
      price: 'Rp 700.000 / Event',
      price_en: 'Rp 700K / Event',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Kami publish event anda di Website dan Seluruh Sosial Media Indiekraf Indonesia']),
      bullets_en: JSON.stringify(['We publish your event on the Website and All Social Media of Indiekraf Indonesia']),
      category: 'Advertising & Publishing',
      sort_order: 3,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'promosi-bisnis-umkm',
      name: 'Promosi Bisnis UMKM',
      name_en: 'MSME Business Promotion',
      subtitle: 'Untuk kamu pelaku UMKM dan Ekonomi Kreatif dapatkan Harga Khusus untuk di Highlight di Web Indiekraf dan Sosial Media Indiekraf',
      subtitle_en: 'For MSME and Creative Economy players, get Special Prices to be Highlighted on Indiekraf Web and Indiekraf Social Media',
      price: 'Rp 150.000 / Post',
      price_en: 'Rp 150K / Post',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Untuk kamu pelaku UMKM dan Ekonomi Kreatif dapatkan Harga Khusus untuk di Highlight di Web Indiekraf dan Sosial Media Indiekraf']),
      bullets_en: JSON.stringify(['For MSME and Creative Economy players, get Special Prices to be Highlighted on Indiekraf Web and Indiekraf Social Media']),
      category: 'Advertising & Publishing',
      sort_order: 4,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    }
  ];

  for (const p of newPlans) {
    await connection.query(
      `INSERT INTO pricing_plans 
       (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, is_active, btn_text_id, btn_text_en, btn_link) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.slug, p.name, p.name_en, p.subtitle, p.subtitle_en, p.price, p.price_en, p.badge, p.badge_en, p.color_theme, p.bullets, p.bullets_en, p.category, p.sort_order, p.is_active, p.btn_text_id, p.btn_text_en, p.btn_link]
    );
  }
  console.log("Inserted plans for Advertising & Publishing");

  await connection.end();
}

update().catch(console.error);
