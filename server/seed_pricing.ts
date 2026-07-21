import pool from './db.js';

const pricingData = [
  {
    categoryName: 'Pelatihan',
    color: 'blue',
    plans: [
      {
        id: 'p-dasar',
        name: 'Digital Marketing Dasar',
        name_en: 'Basic Digital Marketing',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 1.000.000',
        price_en: 'Rp 1M',
        badge: 'STARTER',
        bullets: ['Materi PDF', 'Studi kasus nyata', 'Sertifikat digital'],
        bullets_en: ['PDF Materials', 'Real-world case studies', 'Digital certificate']
      },
      {
        id: 'p-inter',
        name: 'Intermediate Class',
        name_en: 'Intermediate Class',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 2.400.000',
        price_en: 'Rp 2.4M',
        badge: 'POPULER',
        bullets: ['Praktik langsung', 'Template iklan premium', 'Akses komunitas diskusi'],
        bullets_en: ['Hands-on practical training', 'Premium ad templates', 'Discussion community access']
      },
      {
        id: 'p-adv',
        name: 'Advanced Mastery',
        name_en: 'Advanced Mastery',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'PREMIUM',
        bullets: ['Proyek nyata industri', 'Mentoring 1-on-1 eksklusif', 'Sertifikat keahlian profesional'],
        bullets_en: ['Real-world industry project', 'Exclusive 1-on-1 mentoring', 'Professional skill certificate']
      },
      {
        id: 'p-boot',
        name: 'Bootcamp Intensif',
        name_en: 'Intensive Bootcamp',
        subtitle: '',
        subtitle_en: '',
        price: 'Rp 7.000.000',
        price_en: 'Rp 7M',
        badge: 'BEST VALUE',
        bullets: ['Full kurikulum lengkap', 'Simulasi kampanye berbayar', 'Bimbingan karir & portofolio', 'Afterclass support lifetime'],
        bullets_en: ['Complete curriculum', 'Paid campaign simulation', 'Career & portfolio guidance', 'Lifetime afterclass support']
      }
    ]
  },
  {
    categoryName: 'Branding',
    color: 'purple',
    plans: [
      {
        id: 'b-star',
        name: 'Brand Starter',
        name_en: 'Brand Starter',
        subtitle: 'Logo profesional + palet warna + tipografi dasar',
        subtitle_en: 'Professional logo + color palette + basic typography',
        price: 'Rp 1.500.000',
        price_en: 'Rp 1.5M',
        badge: 'STARTER',
        bullets: ['2 Pilihan desain logo', 'Revisi hingga 3x', 'Format file lengkap (PNG, PDF)'],
        bullets_en: ['2 Logo design options', 'Up to 3x revisions', 'Complete formats (PNG, PDF)']
      },
      {
        id: 'b-ident',
        name: 'Brand Identity Pack',
        name_en: 'Brand Identity Pack',
        subtitle: 'Logo + identitas visual lengkap: kartu nama, kop surat, stempel',
        subtitle_en: 'Logo + complete visual identity: business card, letterhead, stamp',
        price: 'Rp 3.500.000',
        price_en: 'Rp 3.5M',
        badge: 'POPULER',
        bullets: ['3 Pilihan desain logo', 'Brand Guidelines Mini', 'Desain Kartu Nama & Kop', 'Revisi hingga 5x'],
        bullets_en: ['3 Logo design options', 'Mini Brand Guidelines', 'Business Card & Letterhead', 'Up to 5x revisions']
      },
      {
        id: 'b-full',
        name: 'Full Brand System',
        name_en: 'Full Brand System',
        subtitle: 'Brand identity menyeluruh + brand guideline + aset digital',
        subtitle_en: 'Comprehensive brand identity + brand guideline + digital assets',
        price: 'Rp 5.500.000',
        price_en: 'Rp 5.5M',
        badge: 'PREMIUM',
        bullets: ['Desain logo lengkap & filosofi', 'Brand Guideline Book detail', 'Kop surat, Amplop, ID Card', 'Aset media sosial template'],
        bullets_en: ['Complete logo design & philosophy', 'Detailed Brand Guideline Book', 'Letterhead, Envelope, ID Card', 'Social media assets templates']
      },
      {
        id: 'b-rebrand',
        name: 'Brand Rebranding',
        name_en: 'Brand Rebranding',
        subtitle: 'Audit brand existing + rekonstruksi identitas visual baru',
        subtitle_en: 'Existing brand audit + reconstruction of new visual identity',
        price: 'Rp 4.500.000',
        price_en: 'Rp 4.5M',
        badge: 'BEST VALUE',
        bullets: ['Analisis brand lama & kompetitor', 'Re-desain logo modern', 'Panduan visual baru komprehensif', 'Konsultasi strategi brand'],
        bullets_en: ['Old brand & competitor analysis', 'Modern logo re-design', 'Comprehensive new visual guide', 'Brand strategy consulting']
      }
    ]
  },
  {
    categoryName: 'Social Media',
    color: 'pink',
    plans: [
      {
        id: 's-star',
        name: 'Social Starter',
        name_en: 'Social Starter',
        subtitle: 'Postingan standar untuk keaktifan media sosial',
        subtitle_en: 'Standard postings for social media activity',
        price: 'Rp 1.200.000',
        price_en: 'Rp 1.2M',
        badge: 'STARTER',
        bullets: ['8 Konten feed/bulan', 'Copywriting basic & riset tag', 'Laporan performa standar'],
        bullets_en: ['8 Feed contents/month', 'Basic copywriting & tag research', 'Standard performance report']
      },
      {
        id: 's-grow',
        name: 'Social Growth',
        name_en: 'Social Growth',
        subtitle: 'Konten dinamis gabungan feed & video reels/TikTok',
        subtitle_en: 'Dynamic content combining feeds & video reels/TikTok',
        price: 'Rp 3.000.000',
        price_en: 'Rp 3M',
        badge: 'POPULER',
        bullets: ['15 Konten (Feed/Reels)', 'Riset hashtag & tren harian', 'Admin balas komentar basic', 'Laporan analisis bulanan'],
        bullets_en: ['15 Contents (Feed/Reels)', 'Daily trend & hashtag research', 'Basic comment replies admin', 'Monthly analysis report']
      },
      {
        id: 's-pro',
        name: 'Social Pro',
        name_en: 'Social Pro',
        subtitle: 'Optimasi penuh untuk konversi & interaksi maksimal',
        subtitle_en: 'Full optimization for maximum conversion & interaction',
        price: 'Rp 5.500.000',
        price_en: 'Rp 5.5M',
        badge: 'PREMIUM',
        bullets: ['24 Konten profesional/bulan', 'Video syuting on-site (opsional)', 'Desain visual eksklusif', 'Sesi evaluasi bulanan'],
        bullets_en: ['24 Professional contents/month', 'On-site video shooting (optional)', 'Exclusive visual design', 'Monthly evaluation session']
      },
      {
        id: 's-camp',
        name: 'Social Campaign',
        name_en: 'Social Campaign',
        subtitle: 'Paket lengkap dengan optimasi iklan bersponsor',
        subtitle_en: 'Complete package with sponsored ad optimization',
        price: 'Rp 7.500.000',
        price_en: 'Rp 7.5M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Social Pro', 'Setup & optimasi iklan FB/IG', 'Konten kolaborasi kustom', 'Dashboard monitoring live'],
        bullets_en: ['All Social Pro features', 'FB/IG Ad setup & optimization', 'Custom collaboration content', 'Live monitoring dashboard']
      }
    ]
  },
  {
    categoryName: 'Content',
    color: 'green',
    plans: [
      {
        id: 'c-basic',
        name: 'Basic Video',
        name_en: 'Basic Video',
        subtitle: 'Video pendek siap pakai untuk pemula',
        subtitle_en: 'Short videos ready to use for beginners',
        price: 'Rp 1.500.000',
        price_en: 'Rp 1.5M',
        badge: 'STARTER',
        bullets: ['4 Video pendek/bulan', 'Editing sederhana', 'Riset naskah basic'],
        bullets_en: ['4 Short videos/month', 'Simple editing', 'Basic script research']
      },
      {
        id: 'c-viral',
        name: 'Viral Content Pack',
        name_en: 'Viral Content Pack',
        subtitle: 'Dirancang khusus mengikuti tren viral terkini',
        subtitle_en: 'Specifically designed to follow current viral trends',
        price: 'Rp 3.200.000',
        price_en: 'Rp 3.2M',
        badge: 'POPULER',
        bullets: ['10 Video pendek/bulan', 'Riset musik tren & efek', 'Voice over pro / talenta', 'Editing visual cinematic'],
        bullets_en: ['10 Short videos/month', 'Trending music & effects research', 'Professional voice-over/talent', 'Cinematic visual editing']
      },
      {
        id: 'c-factory',
        name: 'Content Factory',
        name_en: 'Content Factory',
        subtitle: 'Volume tinggi untuk brand yang agresif berpromosi',
        subtitle_en: 'High volume for brands aggressively promoting',
        price: 'Rp 6.000.000',
        price_en: 'Rp 6M',
        badge: 'PREMIUM',
        bullets: ['20 Video pendek/bulan', 'Sesi brainstorming khusus', 'Desain thumbnail menarik', 'Optimasi deskripsi & SEO'],
        bullets_en: ['20 Short videos/month', 'Special brainstorming session', 'Attractive thumbnail design', 'SEO & description optimization']
      },
      {
        id: 'c-omni',
        name: 'Omnichannel Pack',
        name_en: 'Omnichannel Pack',
        subtitle: 'Distribusi penuh di semua platform video pendek',
        subtitle_en: 'Full distribution across all short video platforms',
        price: 'Rp 8.000.000',
        price_en: 'Rp 8M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Content Factory', 'Posting otomatis terjadwal', 'Adaptasi format multi-platform', 'Analisis retensi penonton'],
        bullets_en: ['All Content Factory features', 'Scheduled auto posting', 'Multi-platform format adaptation', 'Viewer retention analysis']
      }
    ]
  },
  {
    categoryName: 'SEO & SEM',
    color: 'blue',
    plans: [
      {
        id: 'seo-local',
        name: 'Local SEO Setup',
        name_en: 'Local SEO Setup',
        subtitle: 'Optimasi pencarian lokal & Google Maps bisnis',
        subtitle_en: 'Local search optimization & Google My Business',
        price: 'Rp 1.800.000',
        price_en: 'Rp 1.8M',
        badge: 'STARTER',
        bullets: ['Setup Google My Business', 'Optimasi kata kunci lokal', '1 artikel SEO/bulan'],
        bullets_en: ['Google My Business setup', 'Local keyword optimization', '1 SEO article/month']
      },
      {
        id: 'seo-organic',
        name: 'Organic Rank Boost',
        name_en: 'Organic Rank Boost',
        subtitle: 'Meningkatkan peringkat kata kunci utama secara organik',
        subtitle_en: 'Increase primary keyword rankings organically',
        price: 'Rp 4.000.000',
        price_en: 'Rp 4M',
        badge: 'POPULER',
        bullets: ['Audit website menyeluruh', 'Optimasi On-page & Off-page', '5 artikel SEO berkualitas', 'Analisis kompetitor mendalam'],
        bullets_en: ['Comprehensive website audit', 'On-page & Off-page optimization', '5 quality SEO articles', 'In-depth competitor analysis']
      },
      {
        id: 'seo-ads',
        name: 'Search Ads Combo',
        name_en: 'Search Ads Combo',
        subtitle: 'Iklan Google berbayar + optimasi SEO organik',
        subtitle_en: 'Paid Google Ads + organic SEO optimization',
        price: 'Rp 7.500.000',
        price_en: 'Rp 7.5M',
        badge: 'PREMIUM',
        bullets: ['Setup Google Ads Campaign', 'Optimasi anggaran iklan harian', 'Laporan konversi detail', 'Maintenance SEO berkala'],
        bullets_en: ['Google Ads Campaign setup', 'Daily ad budget optimization', 'Detailed conversion reports', 'Regular SEO maintenance']
      },
      {
        id: 'seo-enterprise',
        name: 'Enterprise SEO',
        name_en: 'Enterprise SEO',
        subtitle: 'Strategi komprehensif untuk skala besar dan korporat',
        subtitle_en: 'Comprehensive strategy for large scale and corporate',
        price: 'Rp 12.000.000',
        price_en: 'Rp 12M',
        badge: 'BEST VALUE',
        bullets: ['Optimasi website e-commerce', 'Riset ratusan kata kunci', 'Link building berkualitas', 'Prioritas dukungan 24/7'],
        bullets_en: ['E-commerce website optimization', 'Research hundreds of keywords', 'Quality link building', '24/7 priority support']
      }
    ]
  },
  {
    categoryName: 'Website',
    color: 'purple',
    plans: [
      {
        id: 'w-landing',
        name: 'Landing Page',
        name_en: 'Landing Page',
        subtitle: 'Halaman tunggal yang didesain untuk konversi tinggi',
        subtitle_en: 'Single page designed for high conversion',
        price: 'Rp 2.500.000',
        price_en: 'Rp 2.5M',
        badge: 'STARTER',
        bullets: ['Desain custom responsif', 'Integrasi tombol WhatsApp', 'Hosting & domain 1 tahun', 'Optimasi kecepatan muat'],
        bullets_en: ['Custom responsive design', 'WhatsApp button integration', '1 year hosting & domain', 'Page load speed optimization']
      },
      {
        id: 'w-compro',
        name: 'Company Profile',
        name_en: 'Company Profile',
        subtitle: 'Website multi-halaman profesional untuk kredibilitas bisnis',
        subtitle_en: 'Professional multi-page website for business credibility',
        price: 'Rp 5.000.000',
        price_en: 'Rp 5M',
        badge: 'POPULER',
        bullets: ['Hingga 5 halaman dinamis', 'Sistem manajemen konten (CMS)', 'Desain visual premium', 'SEO-ready structure'],
        bullets_en: ['Up to 5 dynamic pages', 'Content Management System (CMS)', 'Premium visual design', 'SEO-ready structure']
      },
      {
        id: 'w-ecom',
        name: 'E-Commerce Suite',
        name_en: 'E-Commerce Suite',
        subtitle: 'Toko online lengkap dengan payment gateway',
        subtitle_en: 'Complete online store with payment gateway integration',
        price: 'Rp 9.500.000',
        price_en: 'Rp 9.5M',
        badge: 'PREMIUM',
        bullets: ['Keranjang belanja & checkout', 'Integrasi Midtrans/Xendit', 'Fitur hitung ongkir otomatis', 'Sistem inventaris produk'],
        bullets_en: ['Shopping cart & checkout', 'Midtrans/Xendit integration', 'Automatic shipping calculation', 'Product inventory system']
      },
      {
        id: 'w-custom',
        name: 'Custom Web App',
        name_en: 'Custom Web App',
        subtitle: 'Aplikasi web kustom sesuai proses bisnis unik Anda',
        subtitle_en: 'Custom web app tailored to your unique business processes',
        price: 'Rp 15.000.000+',
        price_en: 'Rp 15M+',
        badge: 'BEST VALUE',
        bullets: ['Desain UI/UX eksklusif', 'Arsitektur database handal', 'Dashboard admin kustom', 'Keamanan tingkat tinggi'],
        bullets_en: ['Exclusive UI/UX design', 'Robust database architecture', 'Custom admin dashboard', 'High level security']
      }
    ]
  },
  {
    categoryName: 'Consulting',
    color: 'pink',
    plans: [
      {
        id: 'con-star',
        name: 'Sesi Privat',
        name_en: 'Private Session',
        subtitle: 'Konsultasi satu jam tatap muka online',
        subtitle_en: 'One hour online face-to-face consultation',
        price: 'Rp 800.000',
        price_en: 'Rp 800K',
        badge: 'STARTER',
        bullets: ['Sesi tanya jawab 60 menit', 'Saran instan & perbaikan', 'Rekaman sesi konsultasi'],
        bullets_en: ['60-minute Q&A session', "Instant advice & fixes", 'Consultation session recording']
      },
      {
        id: 'con-grow',
        name: 'Business Growth Pack',
        name_en: 'Business Growth Pack',
        subtitle: 'Pendampingan strategi bisnis selama satu bulan penuh',
        subtitle_en: 'Full-month business strategy mentoring',
        price: 'Rp 3.500.000',
        price_en: 'Rp 3.5M',
        badge: 'POPULER',
        bullets: ['3 sesi pertemuan intensif', 'Analisis kompetitor mendalam', 'Dokumen Action Plan detail', 'Evaluasi hasil di akhir bulan'],
        bullets_en: ['3 intensive sessions', 'In-depth competitor analysis', 'Detailed Action Plan document', 'Month-end result evaluation']
      },
      {
        id: 'con-prem',
        name: 'Executive Advisory',
        name_en: 'Executive Advisory',
        subtitle: 'Konsultan khusus untuk jajaran direksi & manajemen',
        subtitle_en: 'Dedicated consultant for boards & management',
        price: 'Rp 8.000.000',
        price_en: 'Rp 8M',
        badge: 'PREMIUM',
        bullets: ['Pendampingan mingguan', 'Audit operasional pemasaran', 'Riset pasar & peluang baru', 'Dukungan chat WhatsApp VIP'],
        bullets_en: ['Weekly advisory support', 'Marketing operational audit', 'Market & new opportunity research', 'VIP WhatsApp chat support']
      },
      {
        id: 'con-annual',
        name: 'Annual Strategy',
        name_en: 'Annual Strategy',
        subtitle: 'Penyusunan peta jalan pemasaran digital satu tahun',
        subtitle_en: 'One-year digital marketing roadmap setup',
        price: 'Rp 20.000.000',
        price_en: 'Rp 20M',
        badge: 'BEST VALUE',
        bullets: ['Semua fitur Executive Advisory', 'Rencana anggaran tahunan', 'Membantu proses rekrutmen tim', 'Pelatihan tim internal'],
        bullets_en: ['All Executive Advisory features', 'Annual budget planning', 'Assisting team recruitment', 'Internal team training']
      }
    ]
  }
];

async function seed() {
  try {
    console.log('Clearing old pricing_plans...');
    await pool.query('DELETE FROM pricing_plans');

    let sortOrder = 1;
    for (const category of pricingData) {
      for (const plan of category.plans) {
        
        let badge_en = 'STARTER';
        if (plan.badge === 'POPULER') badge_en = 'POPULAR';
        if (plan.badge === 'PREMIUM') badge_en = 'PREMIUM';
        if (plan.badge === 'BEST VALUE') badge_en = 'BEST VALUE';

        let cleanPrice = plan.price.replace(/^Mulai dari\s+/i, '').replace(/\s*\/paket$/i, '').trim();
        if (!/^Rp/i.test(cleanPrice) && cleanPrice !== '') cleanPrice = 'Rp ' + cleanPrice;

        let cleanPriceEn = (plan.price_en || '').replace(/^Starting from\s+/i, '').replace(/\s*\/package$/i, '').trim();

        await pool.query(
          `INSERT INTO pricing_plans 
          (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            plan.id,
            plan.name,
            plan.name_en,
            plan.subtitle || '',
            plan.subtitle_en || '',
            cleanPrice,
            cleanPriceEn,
            plan.badge,
            badge_en,
            category.color,
            JSON.stringify(plan.bullets),
            JSON.stringify(plan.bullets_en),
            category.categoryName,
            sortOrder++
          ]
        );
      }
    }
    console.log('Seeding pricing_plans successful!');
  } catch (err) {
    console.error('Error seeding:', err);
  }
  process.exit(0);
}

seed();
