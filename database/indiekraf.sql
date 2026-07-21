-- ============================================================
-- Indiekraf CMS Database Schema & Seed Data
-- Database Name: indiekraf_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS `indiekraf_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `indiekraf_db`;

-- ============================================================
-- 1. Table: site_settings (Hero section, stats counters, about details, and mail target configs)
-- ============================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed general configurations, texts, contact info, and form email destinations
INSERT INTO `site_settings` (`key`, `value`) VALUES
('hero_title_id', 'Ekosistem Kreatif Digital Indonesia'),
('hero_title_en', 'Indonesia\'s Digital Creative Ecosystem'),
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
('about_description_en', 'Indiekraf is a digital creative ecosystem that integrates media, creative studio, non-formal academy, and research center to drive the transformation of Indonesia\'s creative industry.'),
('contact_email', 'hello@indiekraf.com'),
('contact_phone', '+62 812-3456-7890'),
('contact_address', 'Malang, Jawa Timur, Indonesia'),
('contact_maps_embed', ''),
('email_destination_newsletter', 'fikar@indiekraf.com'),
('email_destination_press_release', 'fikar@indiekraf.com'),
('email_destination_contact', 'fikar@indiekraf.com')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- ============================================================
-- 2. Table: services (Services details, badges, bullets, and links)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`slug`, `title`, `description`, `bullets`, `link_text`, `link_url`, `color_theme`, `icon_name`, `sort_order`) VALUES
('media', 'Indiekraf Media', 'Portal media ekonomi & industri kreatif Indonesia.', '["Iklan","Penempatan Media","Siaran Pers"]', 'Lihat Indiekraf Media →', '#media', 'blue', 'Newspaper', 1),
('studio', 'Indiekraf Studio', 'Agensi kreatif berbasis proyek untuk transformasi digital.', '["Pemasaran Digital","Branding & Desain Grafis","Desain UI/UX","Pengembangan Web"]', 'Lihat Indiekraf Studio →', '#studio', 'purple', 'Layers', 2),
('academy', 'Indiekraf Academy', 'Laboratorium akademik nonformal untuk pengembangan SDM industri kreatif.', '["Aktivasi Program","Pelatihan In-house","Workshop & Sertifikasi"]', 'Konsultasi Program Training →', '#academy', 'green', 'GraduationCap', 3),
('insight', 'Indiekraf Insight Center', 'Riset & pengembangan industri kreatif.', '["Riset Produk","Riset Digital","Kebijakan Publik","Pengembangan Komunitas"]', 'Diskusikan Kebutuhan Riset →', '#insight', 'orange', 'BarChart2', 4)
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`), `bullets` = VALUES(`bullets`), `link_text` = VALUES(`link_text`), `link_url` = VALUES(`link_url`), `color_theme` = VALUES(`color_theme`), `icon_name` = VALUES(`icon_name`), `sort_order` = VALUES(`sort_order`);

-- ============================================================
-- 3. Table: pricing_plans (Pricing options, category tags, subtitles, prices, badges, and features)
-- ============================================================
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `name_en` VARCHAR(200),
  `subtitle` VARCHAR(300),
  `subtitle_en` VARCHAR(300),
  `price` VARCHAR(100),
  `price_en` VARCHAR(100),
  `badge` VARCHAR(50),
  `badge_en` VARCHAR(50),
  `color_theme` ENUM('blue','purple','pink','green') DEFAULT 'blue',
  `bullets` TEXT COMMENT 'JSON array of bullet points',
  `bullets_en` TEXT COMMENT 'JSON array of bullet points in English',
  `category` VARCHAR(100),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_title` VARCHAR(255) DEFAULT '',
  `category_title_en` VARCHAR(255) DEFAULT '',
  `category_subtitle` VARCHAR(255) DEFAULT '',
  `category_subtitle_en` VARCHAR(255) DEFAULT '',
  `category_icon` VARCHAR(50) DEFAULT 'Target',
  `btn_text_id` VARCHAR(100) DEFAULT NULL,
  `btn_text_en` VARCHAR(100) DEFAULT NULL,
  `btn_link` VARCHAR(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pricing_plans` (`slug`, `name`, `name_en`, `subtitle`, `subtitle_en`, `price`, `price_en`, `badge`, `badge_en`, `color_theme`, `bullets`, `bullets_en`, `category`, `sort_order`, `category_title`, `category_title_en`, `category_subtitle`, `category_subtitle_en`, `category_icon`, `btn_text_id`, `btn_text_en`, `btn_link`) VALUES
('marketing', 'Pelatihan Digital Marketing', 'Digital Marketing Training', 'Workshop & Bootcamp Intensif', 'Workshop & Intensive Bootcamp', 'Mulai dari Rp 1JT', 'Starting from Rp 1M', 'POPULER', 'POPULAR', 'blue', '["Materi up-to-date","Mentoring interaktif","Studi kasus nyata","Sertifikat pelatihan"]', '["Up-to-date material","Interactive mentoring","Real case studies","Training certificate"]', 'Pelatihan', 1, 'Pelatihan Digital Marketing', 'Digital Marketing Training', 'Workshop - Kelas - Bootcamp Intensif', 'Workshops - Classes - Intensive Bootcamps', 'GraduationCap', 'Hubungi Kami', 'Contact Us', ''),
('branding', 'Branding & Identity', 'Branding & Identity', 'Logo, Visual Identity, Brand Guide', 'Logo, Visual Identity, Brand Guide', 'Mulai dari Rp 3JT', 'Starting from Rp 3M', 'PREMIUM', 'PREMIUM', 'purple', '["Analisis brand","Desain logo premium","Palet warna & tipografi","Panduan identitas (guideline)"]', '["Brand analysis","Premium logo design","Color palette & typography","Identity guide (guideline)"]', 'Branding', 2, 'Branding & Identitas Visual', 'Branding & Visual Identity', 'Logo - Visual Identity - Brand Guideline', 'Logos - Visual Identities - Brand Guidelines', 'Paintbrush', 'Hubungi Kami', 'Contact Us', ''),
('social', 'Social Media Management', 'Social Media Management', 'Konten, Strategi, Community', 'Content, Strategy, Community', 'Mulai dari Rp 4.5JT', 'Starting from Rp 4.5M', 'BEST VALUE', 'BEST VALUE', 'pink', '["Rencana konten bulanan","Desain feed estetik","Copywriting & hashtag","Laporan performa bulanan"]', '["Monthly content plan","Aesthetic feed design","Copywriting & hashtags","Monthly performance report"]', 'Social Media', 3, 'Manajemen Media Sosial', 'Social Media Management', 'Konten Kreatif - Optimasi Media Sosial - Laporan Kinerja Bulanan', 'Creative Content - Social Media Optimization - Monthly Performance Reports', 'Share2', 'Hubungi Kami', 'Contact Us', ''),
('web', 'Website Development', 'Website Development', 'Landing Page, Company Profile', 'Landing Page, Company Profile', 'Mulai dari Rp 5JT', 'Starting from Rp 5M', 'STARTER', 'STARTER', 'green', '["Desain responsif & modern","Optimasi SEO dasar","Integrasi formulir/WA","Kecepatan akses tinggi"]', '["Responsive & modern design","Basic SEO optimization","Form/WA integration","High access speed"]', 'Website', 4, 'Website Development', 'Website Development', 'Desain Responsif - Landing Page - E-commerce', 'Responsive Design - Landing Pages - E-commerce', 'Globe', 'Hubungi Kami', 'Contact Us', '')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `name_en` = VALUES(`name_en`), `subtitle` = VALUES(`subtitle`), `subtitle_en` = VALUES(`subtitle_en`), `price` = VALUES(`price`), `price_en` = VALUES(`price_en`), `badge` = VALUES(`badge`), `badge_en` = VALUES(`badge_en`), `bullets` = VALUES(`bullets`), `bullets_en` = VALUES(`bullets_en`), `category_title` = VALUES(`category_title`), `category_title_en` = VALUES(`category_title_en`), `category_subtitle` = VALUES(`category_subtitle`), `category_subtitle_en` = VALUES(`category_subtitle_en`), `category_icon` = VALUES(`category_icon`), `btn_text_id` = VALUES(`btn_text_id`), `btn_text_en` = VALUES(`btn_text_en`), `btn_link` = VALUES(`btn_link`);

-- ============================================================
-- 4. Table: portfolio_items (Portfolio visual client listings)
-- ============================================================
CREATE TABLE IF NOT EXISTS `portfolio_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `year` VARCHAR(10),
  `client` VARCHAR(200),
  `title` VARCHAR(300) NOT NULL,
  `title_en` VARCHAR(300),
  `category` VARCHAR(200),
  `category_en` VARCHAR(200),
  `description` TEXT,
  `description_en` TEXT,
  `type` ENUM('website','branding','marketing','event','insight') DEFAULT 'website',
  `image_url` VARCHAR(500),
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `btn_text_id` VARCHAR(255) NOT NULL DEFAULT '',
  `btn_text_en` VARCHAR(255) NOT NULL DEFAULT '',
  `link_url` VARCHAR(512) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_items` (`year`, `client`, `title`, `title_en`, `category`, `category_en`, `description`, `description_en`, `type`, `sort_order`, `btn_text_id`, `btn_text_en`, `link_url`) VALUES
('2024', 'Pemerintah Kabupaten Malang', 'Website MATIC Malang', 'MATIC Malang Website', 'Government Web Development', 'Government Web Development', 'Sistem informasi manajemen surat keterangan domisili perusahaan Kabupaten Malang.', 'Information management system for company domicile certificates in Malang Regency.', 'website', 1, 'Lihat Project', 'View Project', 'https://matic.malangkab.go.id'),
('2024', 'Pemerintah Kabupaten Malang', 'Website DASTING Malang', 'DASTING Malang Website', 'Government Portal', 'Government Portal', 'Portal data statistik dan informasi Kabupaten Malang.', 'Statistical data and information portal for Malang Regency.', 'website', 2, 'Lihat Project', 'View Project', ''),
('2024', 'Bakaoo Indonesia', 'Website Bakaoo', 'Bakaoo Website', 'E-Commerce Platform', 'E-Commerce Platform', 'Platform e-commerce untuk produk lokal dan UMKM Indonesia.', 'E-commerce platform for local products and Indonesian MSMEs.', 'website', 3, 'Lihat Project', 'View Project', ''),
('2024', 'Bank BNI', 'Key Visual Bank BNI', 'Bank BNI Key Visual', 'Graphic Design & Branding', 'Graphic Design & Branding', 'Design key visual untuk berbagai campaign dan program promosi Bank BNI.', 'Key visual design for various campaigns and promotional programs of Bank BNI.', 'branding', 4, 'Lihat Project', 'View Project', '')
ON DUPLICATE KEY UPDATE `client` = VALUES(`client`), `title` = VALUES(`title`), `title_en` = VALUES(`title_en`), `category` = VALUES(`category`), `category_en` = VALUES(`category_en`), `description` = VALUES(`description`), `description_en` = VALUES(`description_en`), `btn_text_id` = VALUES(`btn_text_id`), `btn_text_en` = VALUES(`btn_text_en`), `link_url` = VALUES(`link_url`);

-- ============================================================
-- 5. Table: blog_posts (Blog articles and detailed contents)
-- ============================================================
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(100),
  `category_en` VARCHAR(100),
  `title` VARCHAR(400) NOT NULL,
  `title_en` VARCHAR(400),
  `description` TEXT,
  `description_en` TEXT,
  `content` LONGTEXT COMMENT 'Full article content (HTML/Markdown)',
  `content_en` LONGTEXT COMMENT 'Full article content in English (HTML/Markdown)',
  `author` VARCHAR(100) DEFAULT 'Tim Indiekraf',
  `author_en` VARCHAR(100) DEFAULT 'Indiekraf Team',
  `type` ENUM('game','tech','design','economy','business','marketing','development') DEFAULT 'marketing',
  `image_url` VARCHAR(500),
  `read_more_id` VARCHAR(100),
  `read_more_en` VARCHAR(100),
  `read_more_link` VARCHAR(500),
  `published_at` DATE,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blog_posts` (`category`, `category_en`, `title`, `title_en`, `description`, `description_en`, `content`, `author`, `author_en`, `type`, `image_url`, `published_at`) VALUES
('DIGITAL MARKETING', 'DIGITAL MARKETING', 'Tren Digital Marketing 2025 yang Wajib Diketahui', '2025 Digital Marketing Trends You Must Know', 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.', 'Learn the latest digital marketing strategies to help your business grow in the digital era.', '<p>Ini adalah isi artikel detail tentang tren pemasaran digital 2025...</p>', 'Tim Indiekraf', 'Indiekraf Team', 'marketing', '/gambar.jpg', '2024-01-12'),
('BRANDING', 'BRANDING', 'Panduan Lengkap Membangun Brand Identity yang Kuat', 'Complete Guide to Building a Strong Brand Identity', 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.', 'Practical steps to create a memorable brand identity.', '<p>Membangun brand identity membutuhkan riset mendalam...</p>', 'Tim Indiekraf', 'Indiekraf Team', 'design', '/gambar.jpg', '2024-01-10')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `title_en` = VALUES(`title_en`), `description` = VALUES(`description`), `description_en` = VALUES(`description_en`), `content` = VALUES(`content`);

-- ============================================================
-- 6. Table: admin_users (CMS Administrator Access Accounts)
-- ============================================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(300) NOT NULL COMMENT 'bcrypt hash',
  `name` VARCHAR(200),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default admin credential: username="indiekraf", password="indiekrafkreatifdanmenyenangkan"
INSERT INTO `admin_users` (`username`, `password_hash`, `name`) VALUES
('indiekraf', '$2a$10$t71YR/InN05tdBDUUb/Mvet5Hc6zlOJ8nAohZU/iX1WWjI3muLKou', 'Indiekraf Creative')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
