-- ============================================================
-- Indiekraf CMS Database Schema
-- Import file ini melalui phpMyAdmin di XAMPP
-- ============================================================

CREATE DATABASE IF NOT EXISTS `indiekraf_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `indiekraf_db`;

-- ============================================================
-- Table: site_settings (Hero, Stats, About text)
-- ============================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `site_settings` (`key`, `value`) VALUES
('hero_title_id', 'Ekosistem Kreatif Digital Indonesia'),
('hero_title_en', 'Indonesia''s Digital Creative Ecosystem'),
('hero_subtitle_id', 'Indiekraf menghadirkan solusi media, studio kreatif, akademi, dan riset untuk mendorong pertumbuhan bisnis Anda di era digital.'),
('hero_subtitle_en', 'Indiekraf provides media, creative studio, academy, and research solutions to drive your business growth in the digital era.'),
('hero_cta_primary_id', 'Pelajari Layanan'),
('hero_cta_primary_en', 'Explore Services'),
('hero_cta_secondary_id', 'Tentang Kami'),
('hero_cta_secondary_en', 'About Us'),
('stat_visitors', '75.000+'),
('stat_followers', '10.000+'),
('stat_channels', '10+'),
('stat_reach', '100.000+'),
('about_tagline_id', 'Tentang Indiekraf'),
('about_tagline_en', 'About Indiekraf'),
('about_description_id', 'Indiekraf adalah ekosistem kreatif digital yang mengintegrasikan media, studio kreatif, akademi nonformal, dan pusat riset untuk mendorong transformasi industri kreatif Indonesia.'),
('about_description_en', 'Indiekraf is a digital creative ecosystem that integrates media, creative studio, non-formal academy, and research center to drive the transformation of Indonesia''s creative industry.'),
('contact_email', 'hello@indiekraf.com'),
('contact_phone', '+62 812-3456-7890'),
('contact_address', 'Malang, Jawa Timur, Indonesia'),
('contact_maps_embed', '');

-- ============================================================
-- Table: services (Layanan Indiekraf)
-- ============================================================
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT,
  `bullets` TEXT COMMENT 'JSON array of bullet points',
  `link_text` VARCHAR(200),
  `link_url` VARCHAR(300),
  `color_theme` ENUM('blue','purple','green','orange') DEFAULT 'blue',
  `icon_name` VARCHAR(100),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `services` (`slug`, `title`, `description`, `bullets`, `link_text`, `link_url`, `color_theme`, `icon_name`, `sort_order`) VALUES
('media', 'Indiekraf Media', 'Portal media ekonomi & industri kreatif Indonesia.', '["Iklan","Penempatan Media","Siaran Pers"]', 'Lihat Indiekraf Media →', '#media', 'blue', 'Newspaper', 1),
('studio', 'Indiekraf Studio', 'Agensi kreatif berbasis proyek untuk transformasi digital.', '["Pemasaran Digital","Branding & Desain Grafis","Desain UI/UX","Pengembangan Web"]', 'Lihat Indiekraf Studio →', '#studio', 'purple', 'Layers', 2),
('academy', 'Indiekraf Academy', 'Laboratorium akademik nonformal untuk pengembangan SDM industri kreatif.', '["Aktivasi Program","Pelatihan In-house","Workshop & Sertifikasi"]', 'Konsultasi Program Training →', '#academy', 'green', 'GraduationCap', 3),
('insight', 'Indiekraf Insight Center', 'Riset & pengembangan industri kreatif.', '["Riset Produk","Riset Digital","Kebijakan Publik","Pengembangan Komunitas"]', 'Diskusikan Kebutuhan Riset →', '#insight', 'orange', 'BarChart2', 4);

-- ============================================================
-- Table: pricing_plans (Paket Harga)
-- ============================================================
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `subtitle` VARCHAR(300),
  `price` VARCHAR(100),
  `badge` VARCHAR(50),
  `color_theme` ENUM('blue','purple','pink','green') DEFAULT 'blue',
  `bullets` TEXT COMMENT 'JSON array of bullet points',
  `category` VARCHAR(100),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pricing_plans` (`slug`, `name`, `subtitle`, `price`, `badge`, `color_theme`, `bullets`, `category`, `sort_order`) VALUES
('marketing', 'Pelatihan Digital Marketing', 'Workshop & Bootcamp Intensif', 'Mulai dari Rp 1JT', 'POPULER', 'blue', '["Materi up-to-date","Mentoring interaktif","Studi kasus nyata","Sertifikat pelatihan"]', 'Pelatihan', 1),
('branding', 'Branding & Identity', 'Logo, Visual Identity, Brand Guide', 'Mulai dari Rp 3JT', 'PREMIUM', 'purple', '["Analisis brand","Desain logo premium","Palet warna & tipografi","Panduan identitas (guideline)"]', 'Branding', 2),
('social', 'Social Media Management', 'Konten, Strategi, Community', 'Mulai dari Rp 4.5JT', 'BEST VALUE', 'pink', '["Rencana konten bulanan","Desain feed estetik","Copywriting & hashtag","Laporan performa bulanan"]', 'Social Media', 3),
('web', 'Website Development', 'Landing Page, Company Profile', 'Mulai dari Rp 5JT', 'STARTER', 'green', '["Desain responsif & modern","Optimasi SEO dasar","Integrasi formulir/WA","Kecepatan akses tinggi"]', 'Website', 4),
('content-creation', 'Content Creation Paket', 'Video Reels, TikTok & Copywriting', 'Mulai dari Rp 2.5JT', 'POPULER', 'blue', '["12 Video pendek/bulan","Riset tren & naskah","Editing video profesional","Voice over & caption"]', 'Content', 5),
('seo-sem-pack', 'SEO & SEM Optimization', 'Google Ads & Rank Improvement', 'Mulai dari Rp 4JT', 'PREMIUM', 'purple', '["Riset kata kunci kompetitif","Optimasi On-page & Off-page","Setup & Optimasi Google Ads","Laporan performa bulanan"]', 'SEO & SEM', 6),
('consulting-strat', 'Digital Strategy Consulting', 'Sesi Privat & Rekomendasi Bisnis', 'Mulai dari Rp 1.5JT', 'STARTER', 'green', '["Sesi konsultasi 1-on-1","Analisis kompetitor mendalam","Rencana aksi (action plan) detail","Evaluasi performa berkala"]', 'Consulting', 7);

-- ============================================================
-- Table: portfolio_items (Portofolio)
-- ============================================================
CREATE TABLE IF NOT EXISTS `portfolio_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `year` VARCHAR(10),
  `client` VARCHAR(200),
  `title` VARCHAR(300) NOT NULL,
  `title_en` VARCHAR(300),
  `category` VARCHAR(200),
  `description` TEXT,
  `description_en` TEXT,
  `type` ENUM('website','branding','marketing','event','insight') DEFAULT 'website',
  `image_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `portfolio_items` (`year`, `client`, `title`, `title_en`, `category`, `description`, `description_en`, `type`, `sort_order`) VALUES
('2024', 'Pemerintah Kabupaten Malang', 'Website MATIC Malang', 'MATIC Malang Website', 'Government Web Development', 'Sistem informasi manajemen surat keterangan domisili perusahaan Kabupaten Malang.', 'Information management system for company domicile certificates in Malang Regency.', 'website', 1),
('2024', 'Pemerintah Kabupaten Malang', 'Website DASTING Malang', 'DASTING Malang Website', 'Government Portal', 'Portal data statistik dan informasi Kabupaten Malang.', 'Statistical data and information portal for Malang Regency.', 'website', 2),
('2024', 'Bakaoo Indonesia', 'Website Bakaoo', 'Bakaoo Website', 'E-Commerce Platform', 'Platform e-commerce untuk produk lokal dan UMKM Indonesia.', 'E-commerce platform for local products and Indonesian MSMEs.', 'website', 3),
('2024', 'Bank BNI', 'Key Visual Bank BNI', 'Bank BNI Key Visual', 'Graphic Design & Branding', 'Design key visual untuk berbagai campaign dan program promosi Bank BNI.', 'Key visual design for various campaigns and promotional programs of Bank BNI.', 'branding', 4),
('2024', 'Perumda Tirta Kanjuruhan', 'Dashboard Evaluasi Perumda Tirta Kanjuruhan', 'Perumda Tirta Kanjuruhan Evaluation Dashboard', 'Dashboard & Data Visualization', 'Dashboard evaluasi dan kinerja untuk monitoring operasional Perumda Tirta Kanjuruhan.', 'Evaluation and performance dashboard for operational monitoring of Perumda Tirta Kanjuruhan.', 'insight', 5),
('2026', 'Perumda Tirta Kanjuruhan', 'Website MATWeb E-Perbaikan Tirta Kanjuruhan IC Malang', 'MATWeb E-Perbaikan Tirta Kanjuruhan IC Malang Website', 'Web Application', 'Sistem aplikasi web untuk manajemen dan tracking perbaikan infrastruktur Perumda Tirta Kanjuruhan.', 'Web application system for infrastructure repair management and tracking for Perumda Tirta Kanjuruhan.', 'website', 6),
('2024', 'Kleefstra Jewels', 'Kleefstra Jewels', 'Kleefstra Jewels', 'Luxury Brand Website', 'Website e-commerce premium untuk brand perhiasan internasional.', 'Premium e-commerce website for an international jewelry brand.', 'website', 7),
('2024', 'FEB Universitas Brawijaya', 'Social Media Handling FEB UB', 'FEB UB Social Media Handling', 'Social Media Management', 'Pengelolaan sosial media Department Manajemen Fakultas Ekonomi & Bisnis Universitas Brawijaya.', 'Social media management for the Management Department, Faculty of Economics & Business, Universitas Brawijaya.', 'marketing', 8),
('2024', 'Syngenta', 'Key Visual Syngenta', 'Syngenta Key Visual', 'Graphic Design & Branding', 'Design key visual untuk campaign dan aktivitas marketing brand agribisnis multinasional Syngenta.', 'Key visual design for campaigns and marketing activities of multinational agribusiness brand Syngenta.', 'branding', 9);

-- ============================================================
-- Table: blog_posts (Artikel Blog)
-- ============================================================
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(100),
  `title` VARCHAR(400) NOT NULL,
  `title_en` VARCHAR(400),
  `description` TEXT,
  `description_en` TEXT,
  `content` LONGTEXT COMMENT 'Full article content (HTML/Markdown)',
  `author` VARCHAR(100) DEFAULT 'Tim Indiekraf',
  `author_en` VARCHAR(100) DEFAULT 'Indiekraf Team',
  `type` ENUM('game','tech','design','economy','business','marketing','development') DEFAULT 'marketing',
  `image_url` VARCHAR(500),
  `published_at` DATE,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `blog_posts` (`category`, `title`, `title_en`, `description`, `description_en`, `author`, `author_en`, `type`, `image_url`, `published_at`) VALUES
('DIGITAL MARKETING', 'Tren Digital Marketing 2025 yang Wajib Diketahui', '2025 Digital Marketing Trends You Must Know', 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.', 'Learn the latest digital marketing strategies to help your business grow in the digital era.', 'Tim Indiekraf', 'Indiekraf Team', 'marketing', '/gambar.jpg', '2024-01-12'),
('BRANDING', 'Panduan Lengkap Membangun Brand Identity yang Kuat', 'Complete Guide to Building a Strong Brand Identity', 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.', 'Practical steps to create a memorable brand identity.', 'Tim Indiekraf', 'Indiekraf Team', 'design', '/gambar.jpg', '2024-01-10'),
('UI/UX DESIGN', 'UI/UX Design: Prinsip Dasar untuk Pemula', 'UI/UX Design: Basic Principles for Beginners', 'Memahami fundamental UI/UX design untuk menciptakan pengalaman pengguna optimal.', 'Understanding fundamental UI/UX design to create optimal user experiences.', 'Tim Indiekraf', 'Indiekraf Team', 'design', '/gambar.jpg', '2024-01-08'),
('WEB DEVELOPMENT', 'Cara Mengoptimalkan Website untuk SEO', 'How to Optimize Your Website for SEO', 'Tips dan trik meningkatkan peringkat website Anda di mesin pencari Google.', 'Tips and tricks to improve your website ranking on Google search engine.', 'Tim Indiekraf', 'Indiekraf Team', 'development', '/gambar.jpg', '2024-01-05'),
('SOCIAL MEDIA', 'Social Media Marketing: Strategi Konten yang Efektif', 'Social Media Marketing: Effective Content Strategy', 'Panduan membuat konten social media yang engaging dan meningkatkan awareness.', 'Guide to creating engaging social media content and increasing awareness.', 'Tim Indiekraf', 'Indiekraf Team', 'marketing', '/gambar.jpg', '2024-01-03'),
('BUSINESS INSIGHT', 'Pentingnya Riset Pasar dalam Pengembangan Produk', 'The Importance of Market Research in Product Development', 'Mengapa riset pasar menjadi kunci kesuksesan dalam meluncurkan produk baru.', 'Why market research is key to success when launching new products.', 'Tim Indiekraf', 'Indiekraf Team', 'business', '/gambar.jpg', '2024-01-01');

-- ============================================================
-- Table: admin_users (Akun Admin CMS)
-- ============================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(300) NOT NULL COMMENT 'bcrypt hash',
  `name` VARCHAR(200),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default: username=admin, password=indiekraf2024
-- (Di-generate ulang oleh server saat pertama kali dijalankan jika tabel kosong)
-- Password hash untuk "indiekraf2024":
INSERT INTO `admin_users` (`username`, `password_hash`, `name`) VALUES
('admin', '$2b$10$rOzJqfTz0z6z6z6z6z6z6OeKkKkKkKkKkKkKkKkKkKkKkKkKkKkK', 'Administrator');
-- CATATAN: Jalankan `npm run init-admin` untuk generate hash yang benar
