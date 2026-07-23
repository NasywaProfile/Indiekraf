<?php

namespace Database\Seeders;

use App\Models\PortfolioItem;
use Illuminate\Database\Seeder;

class PortfolioItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'year' => '2024',
                'client' => 'Pemerintah Kabupaten Malang',
                'title' => 'Website MATIC Malang',
                'title_en' => 'MATIC Malang Website',
                'category' => 'Government Web Development',
                'category_en' => 'Government Web Development',
                'description' => 'Sistem informasi manajemen surat keterangan domisili perusahaan Kabupaten Malang.',
                'description_en' => 'Information management system for company domicile certificates in Malang Regency.',
                'type' => 'website',
                'sort_order' => 1,
                'btn_text_id' => 'Lihat Project',
                'btn_text_en' => 'View Project',
                'link_url' => 'https://matic.malangkab.go.id',
            ],
            [
                'year' => '2024',
                'client' => 'Pemerintah Kabupaten Malang',
                'title' => 'Website DASTING Malang',
                'title_en' => 'DASTING Malang Website',
                'category' => 'Government Portal',
                'category_en' => 'Government Portal',
                'description' => 'Portal data statistik dan informasi Kabupaten Malang.',
                'description_en' => 'Statistical data and information portal for Malang Regency.',
                'type' => 'website',
                'sort_order' => 2,
                'btn_text_id' => 'Lihat Project',
                'btn_text_en' => 'View Project',
                'link_url' => '',
            ],
            [
                'year' => '2024',
                'client' => 'Bakaoo Indonesia',
                'title' => 'Website Bakaoo',
                'title_en' => 'Bakaoo Website',
                'category' => 'E-Commerce Platform',
                'category_en' => 'E-Commerce Platform',
                'description' => 'Platform e-commerce untuk produk lokal dan UMKM Indonesia.',
                'description_en' => 'E-commerce platform for local products and Indonesian MSMEs.',
                'type' => 'website',
                'sort_order' => 3,
                'btn_text_id' => 'Lihat Project',
                'btn_text_en' => 'View Project',
                'link_url' => '',
            ],
            [
                'year' => '2024',
                'client' => 'Bank BNI',
                'title' => 'Key Visual Bank BNI',
                'title_en' => 'Bank BNI Key Visual',
                'category' => 'Graphic Design & Branding',
                'category_en' => 'Graphic Design & Branding',
                'description' => 'Design key visual untuk berbagai campaign dan program promosi Bank BNI.',
                'description_en' => 'Key visual design for various campaigns and promotional programs of Bank BNI.',
                'type' => 'branding',
                'sort_order' => 4,
                'btn_text_id' => 'Lihat Project',
                'btn_text_en' => 'View Project',
                'link_url' => '',
            ],
        ];

        foreach ($items as $item) {
            PortfolioItem::create($item);
        }
    }
}
