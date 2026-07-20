import pool from './db';
const cats = [
  { id: 'cat-pelatihan', categoryName: 'Pelatihan', categoryName_en: 'Training', title: 'Pelatihan Digital Marketing', title_en: 'Digital Marketing Training', subtitle: 'Workshop - Kelas - Bootcamp Intensif', subtitle_en: 'Workshops - Classes - Intensive Bootcamps', icon: 'GraduationCap' },
  { id: 'cat-branding', categoryName: 'Branding', categoryName_en: 'Branding', title: 'Branding & Identitas Visual', title_en: 'Branding & Visual Identity', subtitle: 'Logo - Visual Identity - Brand Guideline', subtitle_en: 'Logos - Visual Identities - Brand Guidelines', icon: 'Paintbrush' },
  { id: 'cat-social-media', categoryName: 'Social Media', categoryName_en: 'Social Media', title: 'Manajemen Sosial Media', title_en: 'Social Media Management', subtitle: 'Content - Engagement - Analytics', subtitle_en: 'Content - Engagement - Analytics', icon: 'Share2' },
  { id: 'cat-content', categoryName: 'Content', categoryName_en: 'Content', title: 'Produksi Konten', title_en: 'Content Production', subtitle: 'Video - Foto - Copywriting', subtitle_en: 'Video - Photo - Copywriting', icon: 'Video' },
  { id: 'cat-seo-sem', categoryName: 'SEO & SEM', categoryName_en: 'SEO & SEM', title: 'Search Engine Optimization', title_en: 'Search Engine Optimization', subtitle: 'On-Page - Off-Page - Ads', subtitle_en: 'On-Page - Off-Page - Ads', icon: 'Search' },
  { id: 'cat-website', categoryName: 'Website', categoryName_en: 'Website', title: 'Website Development', title_en: 'Website Development', subtitle: 'Company Profile - E-Commerce - Custom Web', subtitle_en: 'Company Profile - E-Commerce - Custom Web', icon: 'Globe' },
  { id: 'cat-consulting', categoryName: 'Consulting', categoryName_en: 'Consulting', title: 'Digital Strategy Consulting', title_en: 'Digital Strategy Consulting', subtitle: 'Audit - Strategy - Optimization', subtitle_en: 'Audit - Strategy - Optimization', icon: 'MessageSquare' }
];
const val = JSON.stringify(cats);
pool.query('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?', ['pricing_categories_data', val, val]).then(() => {
  console.log('Categories seeded!');
  process.exit(0);
});
