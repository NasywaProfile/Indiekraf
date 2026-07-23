<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'media',
                'title' => 'Indiekraf Media',
                'description' => 'Portal media ekonomi & industri kreatif Indonesia.',
                'bullets' => json_encode(['Iklan', 'Penempatan Media', 'Siaran Pers']),
                'link_text' => 'Lihat Indiekraf Media →',
                'link_url' => '#media',
                'color_theme' => 'blue',
                'icon_name' => 'Newspaper',
                'sort_order' => 1,
            ],
            [
                'slug' => 'studio',
                'title' => 'Indiekraf Studio',
                'description' => 'Agensi kreatif berbasis proyek untuk transformasi digital.',
                'bullets' => json_encode(['Pemasaran Digital', 'Branding & Desain Grafis', 'Desain UI/UX', 'Pengembangan Web']),
                'link_text' => 'Lihat Indiekraf Studio →',
                'link_url' => '#studio',
                'color_theme' => 'purple',
                'icon_name' => 'Layers',
                'sort_order' => 2,
            ],
            [
                'slug' => 'academy',
                'title' => 'Indiekraf Academy',
                'description' => 'Laboratorium akademik nonformal untuk pengembangan SDM industri kreatif.',
                'bullets' => json_encode(['Aktivasi Program', 'Pelatihan In-house', 'Workshop & Sertifikasi']),
                'link_text' => 'Konsultasi Program Training →',
                'link_url' => '#academy',
                'color_theme' => 'green',
                'icon_name' => 'GraduationCap',
                'sort_order' => 3,
            ],
            [
                'slug' => 'insight',
                'title' => 'Indiekraf Insight Center',
                'description' => 'Riset & pengembangan industri kreatif.',
                'bullets' => json_encode(['Riset Produk', 'Riset Digital', 'Kebijakan Publik', 'Pengembangan Komunitas']),
                'link_text' => 'Diskusikan Kebutuhan Riset →',
                'link_url' => '#insight',
                'color_theme' => 'orange',
                'icon_name' => 'BarChart2',
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}
