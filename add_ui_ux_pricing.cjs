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

  // Check if cat-ui-ux already exists
  const exists = categories.some(cat => cat.id === 'cat-ui-ux');
  if (!exists) {
    // Insert after 'Branding'
    const brandingIndex = categories.findIndex(cat => cat.categoryName === 'Branding');
    const newCategory = {
      id: 'cat-ui-ux',
      categoryName: 'UI UX Design',
      categoryName_en: 'UI UX Design',
      title: 'UI UX Design',
      title_en: 'UI UX Design',
      subtitle: 'Desktop - Mobile - Dashboard - Wireframe - UX Audit - Prototyping',
      subtitle_en: 'Desktop - Mobile - Dashboard - Wireframe - UX Audit - Prototyping',
      icon: 'Layout'
    };
    if (brandingIndex !== -1) {
      categories.splice(brandingIndex + 1, 0, newCategory);
    } else {
      categories.push(newCategory);
    }
    const val = JSON.stringify(categories);
    await connection.query('INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?', ['pricing_categories_data', val, val]);
    console.log("Updated categories in site_settings");
  } else {
    console.log("Category cat-ui-ux already exists in site_settings");
  }

  // 2. Insert plans for UI UX Design
  await connection.query("DELETE FROM pricing_plans WHERE category = 'UI UX Design'");
  console.log("Cleared old plans for UI UX Design");

  const newPlans = [
    {
      slug: 'desktop-web-native-app',
      name: 'Desktop (Web, Native App)',
      name_en: 'Desktop (Web, Native App)',
      subtitle: 'Handling desain pengembangan dan pemeliharaan web/aplikasi yang mudah digunakan.',
      subtitle_en: 'Handling the design, development and maintenance of easy-to-use web/apps.',
      price: 'Rp 5.000.000',
      price_en: 'Rp 5M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Handling desain pengembangan dan pemeliharaan web/aplikasi yang mudah digunakan.']),
      bullets_en: JSON.stringify(['Handling the design, development and maintenance of easy-to-use web/apps.']),
      category: 'UI UX Design',
      sort_order: 1,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'mobile-app-responsive-adaptive',
      name: 'Mobile (App, Responsive, Adaptive)',
      name_en: 'Mobile (App, Responsive, Adaptive)',
      subtitle: 'Handling pembuatan mobile app untuk usaha/bisnis anda.',
      subtitle_en: 'Handling mobile app development for your business.',
      price: 'Rp 10.000.000',
      price_en: 'Rp 10M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Handling pembuatan mobile app untuk usaha/bisnis anda.']),
      bullets_en: JSON.stringify(['Handling mobile app development for your business.']),
      category: 'UI UX Design',
      sort_order: 2,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'dashboard-design',
      name: 'Dashboard',
      name_en: 'Dashboard',
      subtitle: 'Handle desain pembuatan dan pemeliharaan dashboard untuk usaha/bisnis anda.',
      subtitle_en: 'Handle the design, creation and maintenance of dashboard for your business.',
      price: 'Rp 5.000.000',
      price_en: 'Rp 5M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Handle desain pembuatan dan pemeliharaan dashboard untuk usaha/bisnis anda.']),
      bullets_en: JSON.stringify(['Handle the design, creation and maintenance of dashboard for your business.']),
      category: 'UI UX Design',
      sort_order: 3,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'flow-wireframe',
      name: 'Flow & Wireframe',
      name_en: 'Flow & Wireframe',
      subtitle: 'Handling pembuatan struktur alur kerja pada aplikasi.',
      subtitle_en: 'Handling the creation of workflow structures in applications.',
      price: 'Rp 5.000.000',
      price_en: 'Rp 5M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Handling pembuatan struktur alur kerja pada aplikasi.']),
      bullets_en: JSON.stringify(['Handling the creation of workflow structures in applications.']),
      category: 'UI UX Design',
      sort_order: 4,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'ux-audit-usability-testing',
      name: 'UX Audit & Usability Testing',
      name_en: 'UX Audit & Usability Testing',
      subtitle: 'Melakukan review dan pengujian terkait user experience terhadap produk.',
      subtitle_en: 'Conduct reviews and testing related to user experience on products.',
      price: 'Rp 5.000.000',
      price_en: 'Rp 5M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Melakukan review dan pengujian terkait user experience terhadap produk.']),
      bullets_en: JSON.stringify(['Conduct reviews and testing related to user experience on products.']),
      category: 'UI UX Design',
      sort_order: 5,
      is_active: 1,
      btn_text_id: '',
      btn_text_en: '',
      btn_link: WA_LINK
    },
    {
      slug: 'prototyping-interaction',
      name: 'Prototyping Interaction',
      name_en: 'Prototyping Interaction',
      subtitle: 'Bentuk realisasi dari prototype sebuah produk agar lebih interaktif.',
      subtitle_en: 'Form of realization of a product prototype to be more interactive.',
      price: 'Rp 5.000.000',
      price_en: 'Rp 5M',
      badge: 'STARTER',
      badge_en: 'STARTER',
      color_theme: 'blue',
      bullets: JSON.stringify(['Bentuk realisasi dari prototype sebuah produk agar lebih interaktif.']),
      bullets_en: JSON.stringify(['Form of realization of a product prototype to be more interactive.']),
      category: 'UI UX Design',
      sort_order: 6,
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
  console.log("Inserted plans for UI UX Design");

  await connection.end();
}

update().catch(console.error);
