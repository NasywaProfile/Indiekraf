import { ServiceCard, StatItem, PricePlan, FeatureItem } from './types';

export const servicesData: ServiceCard[] = [
  {
    id: 'media',
    title: 'Indiekraf Media',
    description: 'Portal media ekonomi & industri kreatif Indonesia.',
    bullets: ['Iklan', 'Penempatan Media', 'Siaran Pers'],
    linkText: 'Lihat Indiekraf Media →',
    linkUrl: '#media',
    colorTheme: 'blue',
    iconName: 'Newspaper',
  },
  {
    id: 'studio',
    title: 'Indiekraf Studio',
    description: 'Agensi kreatif berbasis proyek untuk transformasi digital.',
    bullets: ['Pemasaran Digital', 'Branding & Desain Grafis', 'Desain UI/UX', 'Pengembangan Web'],
    linkText: 'Lihat Indiekraf Studio →',
    linkUrl: '#studio',
    colorTheme: 'purple',
    iconName: 'Layers',
  },
  {
    id: 'academy',
    title: 'Indiekraf Academy',
    description: 'Laboratorium akademik nonformal untuk pengembangan SDM industri kreatif.',
    bullets: ['Aktivasi Program', 'Pelatihan In-house', 'Workshop & Sertifikasi'],
    linkText: 'Konsultasi Program Training →',
    linkUrl: '#academy',
    colorTheme: 'green',
    iconName: 'GraduationCap',
  },
  {
    id: 'insight',
    title: 'Indiekraf Insight Center',
    description: 'Riset & pengembangan industri kreatif.',
    bullets: ['Riset Produk', 'Riset Digital', 'Kebijakan Publik', 'Pengembangan Komunitas'],
    linkText: 'Diskusikan Kebutuhan Riset →',
    linkUrl: '#insight',
    colorTheme: 'orange',
    iconName: 'BarChart2',
  },
];

export const statsData: StatItem[] = [
  {
    id: 'visitor',
    value: '75.000+',
    label: 'Pengunjung Bulanan',
    iconName: 'Users',
  },
  {
    id: 'follower',
    value: '10.000+',
    label: 'Pengikut Media Sosial',
    iconName: 'TrendingUp',
  },
  {
    id: 'channel',
    value: '10+',
    label: 'Saluran Media Sosial',
    iconName: 'Globe',
  },
  {
    id: 'reach',
    value: '100.000+',
    label: 'Jangkauan & Kunjungan Bulanan',
    iconName: 'Eye',
  },
];

export const pricingPlans: PricePlan[] = [
  {
    id: 'marketing',
    name: 'Pelatihan Digital Marketing',
    subtitle: 'Workshop & Bootcamp Intensif',
    price: 'Mulai dari Rp 1JT',
    badge: 'POPULER',
    colorTheme: 'blue',
    bullets: ['Materi up-to-date', 'Mentoring interaktif', 'Studi kasus nyata', 'Sertifikat pelatihan'],
    category: 'Pelatihan'
  },
  {
    id: 'branding',
    name: 'Branding & Identity',
    subtitle: 'Logo, Visual Identity, Brand Guide',
    price: 'Mulai dari Rp 3JT',
    badge: 'PREMIUM',
    colorTheme: 'purple',
    bullets: ['Analisis brand', 'Desain logo premium', 'Palet warna & tipografi', 'Panduan identitas (guideline)'],
    category: 'Branding'
  },
  {
    id: 'social',
    name: 'Social Media Management',
    subtitle: 'Konten, Strategi, Community',
    price: 'Mulai dari Rp 4.5JT',
    badge: 'BEST VALUE',
    colorTheme: 'pink',
    bullets: ['Rencana konten bulanan', 'Desain feed estetik', 'Copywriting & hashtag', 'Laporan performa bulanan'],
    category: 'Social Media'
  },
  {
    id: 'web',
    name: 'Website Development',
    subtitle: 'Landing Page, Company Profile',
    price: 'Mulai dari Rp 5JT',
    badge: 'STARTER',
    colorTheme: 'green',
    bullets: ['Desain responsif & modern', 'Optimasi SEO dasar', 'Integrasi formulir/WA', 'Kecepatan akses tinggi'],
    category: 'Website'
  },
  {
    id: 'content-creation',
    name: 'Content Creation Paket',
    subtitle: 'Video Reels, TikTok & Copywriting',
    price: 'Mulai dari Rp 2.5JT',
    badge: 'POPULER',
    colorTheme: 'blue',
    bullets: ['12 Video pendek/bulan', 'Riset tren & naskah', 'Editing video profesional', 'Voice over & caption'],
    category: 'Content'
  },
  {
    id: 'seo-sem-pack',
    name: 'SEO & SEM Optimization',
    subtitle: 'Google Ads & Rank Improvement',
    price: 'Mulai dari Rp 4JT',
    badge: 'PREMIUM',
    colorTheme: 'purple',
    bullets: ['Riset kata kunci kompetitif', 'Optimasi On-page & Off-page', 'Setup & Optimasi Google Ads', 'Laporan performa bulanan'],
    category: 'SEO & SEM'
  },
  {
    id: 'consulting-strat',
    name: 'Digital Strategy Consulting',
    subtitle: 'Sesi Privat & Rekomendasi Bisnis',
    price: 'Mulai dari Rp 1.5JT',
    badge: 'STARTER',
    colorTheme: 'green',
    bullets: ['Sesi konsultasi 1-on-1', 'Analisis kompetitor mendalam', 'Rencana aksi (action plan) detail', 'Evaluasi performa berkala'],
    category: 'Consulting'
  }
];

export const featuresData: FeatureItem[] = [
  {
    id: 'integrated',
    title: 'Solusi Terintegrasi',
    description: 'Dari strategi hingga eksekusi — setiap layanan yang Anda butuhkan berada dalam satu ekosistem yang terhubung, dibangun untuk hasil nyata.',
    iconName: 'LayoutGrid',
  },
  {
    id: 'data-driven',
    title: 'Pendekatan Berbasis Data',
    description: 'Setiap keputusan didukung oleh analisis, memastikan investasi Anda menghasilkan ROI yang terukur dan dapat dilacak.',
    iconName: 'LineChart',
  },
  {
    id: 'professional-team',
    title: 'Tim Profesional',
    description: 'Tim berpengalaman di bidang pemasaran digital, desain, pengembangan, dan konsultasi — siap untuk menangani setiap permintaan.',
    iconName: 'Users2',
  },
  {
    id: 'proven-track',
    title: 'Rekam Jejak Terbukti',
    description: 'Mulai dari UKM lokal hingga lembaga pemerintah — klien yang telah tumbuh bersama kami terus kembali.',
    iconName: 'Milestone',
  },
  {
    id: 'partner',
    title: 'Partner, Bukan Vendor',
    description: 'Bukan sekadar vendor. Kami adalah mitra kreatif yang berkomitmen pada pertumbuhan Bisnis Anda.',
    iconName: 'Heart',
  },
  {
    id: 'transparent-pricing',
    title: 'Harga Transparan',
    description: 'Harga transparan, paket fleksibel — dirancang agar sesuai dengan anggaran Anda.',
    iconName: 'Tag',
  },
];
