<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'slug' => 'marketing',
                'name' => 'Pelatihan Digital Marketing',
                'name_en' => 'Digital Marketing Training',
                'subtitle' => 'Workshop & Bootcamp Intensif',
                'subtitle_en' => 'Workshop & Intensive Bootcamp',
                'price' => 'Mulai dari Rp 1JT',
                'price_en' => 'Starting from Rp 1M',
                'badge' => 'POPULER',
                'badge_en' => 'POPULAR',
                'color_theme' => 'blue',
                'bullets' => json_encode(['Materi up-to-date', 'Mentoring interaktif', 'Studi kasus nyata', 'Sertifikat pelatihan']),
                'bullets_en' => json_encode(['Up-to-date material', 'Interactive mentoring', 'Real case studies', 'Training certificate']),
                'category' => 'Pelatihan',
                'sort_order' => 1,
                'category_title' => 'Pelatihan Digital Marketing',
                'category_title_en' => 'Digital Marketing Training',
                'category_subtitle' => 'Workshop - Kelas - Bootcamp Intensif',
                'category_subtitle_en' => 'Workshops - Classes - Intensive Bootcamps',
                'category_icon' => 'GraduationCap',
                'btn_text_id' => 'Hubungi Kami',
                'btn_text_en' => 'Contact Us',
                'btn_link' => '',
            ],
            [
                'slug' => 'branding',
                'name' => 'Branding & Identity',
                'name_en' => 'Branding & Identity',
                'subtitle' => 'Logo, Visual Identity, Brand Guide',
                'subtitle_en' => 'Logo, Visual Identity, Brand Guide',
                'price' => 'Mulai dari Rp 3JT',
                'price_en' => 'Starting from Rp 3M',
                'badge' => 'PREMIUM',
                'badge_en' => 'PREMIUM',
                'color_theme' => 'purple',
                'bullets' => json_encode(['Analisis brand', 'Desain logo premium', 'Palet warna & tipografi', 'Panduan identitas (guideline)']),
                'bullets_en' => json_encode(['Brand analysis', 'Premium logo design', 'Color palette & typography', 'Identity guide (guideline)']),
                'category' => 'Branding',
                'sort_order' => 2,
                'category_title' => 'Branding & Identitas Visual',
                'category_title_en' => 'Branding & Visual Identity',
                'category_subtitle' => 'Logo - Visual Identity - Brand Guideline',
                'category_subtitle_en' => 'Logos - Visual Identities - Brand Guidelines',
                'category_icon' => 'Paintbrush',
                'btn_text_id' => 'Hubungi Kami',
                'btn_text_en' => 'Contact Us',
                'btn_link' => '',
            ],
            [
                'slug' => 'social',
                'name' => 'Social Media Management',
                'name_en' => 'Social Media Management',
                'subtitle' => 'Konten, Strategi, Community',
                'subtitle_en' => 'Content, Strategy, Community',
                'price' => 'Mulai dari Rp 4.5JT',
                'price_en' => 'Starting from Rp 4.5M',
                'badge' => 'BEST VALUE',
                'badge_en' => 'BEST VALUE',
                'color_theme' => 'pink',
                'bullets' => json_encode(['Rencana konten bulanan', 'Desain feed estetik', 'Copywriting & hashtag', 'Laporan performa bulanan']),
                'bullets_en' => json_encode(['Monthly content plan', 'Aesthetic feed design', 'Copywriting & hashtags', 'Monthly performance report']),
                'category' => 'Social Media',
                'sort_order' => 3,
                'category_title' => 'Manajemen Media Sosial',
                'category_title_en' => 'Social Media Management',
                'category_subtitle' => 'Konten Kreatif - Optimasi Media Sosial - Laporan Kinerja Bulanan',
                'category_subtitle_en' => 'Creative Content - Social Media Optimization - Monthly Performance Reports',
                'category_icon' => 'Share2',
                'btn_text_id' => 'Hubungi Kami',
                'btn_text_en' => 'Contact Us',
                'btn_link' => '',
            ],
            [
                'slug' => 'web',
                'name' => 'Website Development',
                'name_en' => 'Website Development',
                'subtitle' => 'Landing Page, Company Profile',
                'subtitle_en' => 'Landing Page, Company Profile',
                'price' => 'Mulai dari Rp 5JT',
                'price_en' => 'Starting from Rp 5M',
                'badge' => 'STARTER',
                'badge_en' => 'STARTER',
                'color_theme' => 'green',
                'bullets' => json_encode(['Desain responsif & modern', 'Optimasi SEO dasar', 'Integrasi formulir/WA', 'Kecepatan akses tinggi']),
                'bullets_en' => json_encode(['Responsive & modern design', 'Basic SEO optimization', 'Form/WA integration', 'High access speed']),
                'category' => 'Website',
                'sort_order' => 4,
                'category_title' => 'Website Development',
                'category_title_en' => 'Website Development',
                'category_subtitle' => 'Desain Responsif - Landing Page - E-commerce',
                'category_subtitle_en' => 'Responsive Design - Landing Pages - E-commerce',
                'category_icon' => 'Globe',
                'btn_text_id' => 'Hubungi Kami',
                'btn_text_en' => 'Contact Us',
                'btn_link' => '',
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::updateOrCreate(
                ['slug' => $plan['slug']],
                $plan
            );
        }
    }
}
