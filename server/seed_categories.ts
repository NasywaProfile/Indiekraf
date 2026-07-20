import pool from './db.js';

const pricingData = [
  {
    id: 'pelatihan',
    categoryName: 'Pelatihan',
    categoryName_en: 'Training',
    title: 'Pelatihan Digital Marketing',
    title_en: 'Digital Marketing Training',
    subtitle: 'Workshop - Kelas - Bootcamp Intensif',
    subtitle_en: 'Workshops - Classes - Intensive Bootcamps',
    icon: 'GraduationCap',
  },
  {
    id: 'branding',
    categoryName: 'Branding',
    categoryName_en: 'Branding',
    title: 'Branding & Identitas Visual',
    title_en: 'Branding & Visual Identity',
    subtitle: 'Logo - Visual Identity - Brand Guideline',
    subtitle_en: 'Logos - Visual Identities - Brand Guidelines',
    icon: 'Paintbrush',
  },
  {
    id: 'social-media',
    categoryName: 'Social Media',
    categoryName_en: 'Social Media',
    title: 'Social Media Management',
    title_en: 'Social Media Management',
    subtitle: 'Optimasi Feed - Reels - Konten Harian',
    subtitle_en: 'Feed Optimization - Reels - Daily Content',
    icon: 'Share2',
  },
  {
    id: 'content',
    categoryName: 'Content',
    categoryName_en: 'Content',
    title: 'Content Creation',
    title_en: 'Content Creation',
    subtitle: 'Video Reels - TikTok - Copywriting',
    subtitle_en: 'Video Reels - TikTok - Copywriting',
    icon: 'Video',
  },
  {
    id: 'seo-sem',
    categoryName: 'SEO & SEM',
    categoryName_en: 'SEO & SEM',
    title: 'SEO & SEM Optimization',
    title_en: 'SEO & SEM Optimization',
    subtitle: 'Google Ads - Rank Improvement - Traffic',
    subtitle_en: 'Google Ads - Rank Improvement - Traffic',
    icon: 'Search',
  },
  {
    id: 'website',
    categoryName: 'Website',
    categoryName_en: 'Website',
    title: 'Website Development',
    title_en: 'Website Development',
    subtitle: 'Desain Responsif - Landing Page - E-commerce',
    subtitle_en: 'Responsive Design - Landing Pages - E-commerce',
    icon: 'Globe',
  },
  {
    id: 'consulting',
    categoryName: 'Consulting',
    categoryName_en: 'Consulting',
    title: 'Digital Strategy Consulting',
    title_en: 'Digital Strategy Consulting',
    subtitle: 'Sesi Privat - Analisis Kompetitor - Action Plan',
    subtitle_en: 'Private Sessions - Competitor Analysis - Action Plans',
    icon: 'MessageSquare',
  }
];

async function seedCategories() {
  try {
    const value = JSON.stringify(pricingData);
    await pool.query(
      `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?`,
      ['pricing_categories_data', value, value]
    );
    console.log('Categories seeded successfully!');
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

seedCategories();
