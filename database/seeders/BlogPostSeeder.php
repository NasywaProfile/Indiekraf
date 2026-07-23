<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'category' => 'DIGITAL MARKETING',
                'category_en' => 'DIGITAL MARKETING',
                'title' => 'Tren Digital Marketing 2025 yang Wajib Diketahui',
                'title_en' => '2025 Digital Marketing Trends You Must Know',
                'description' => 'Pelajari strategi digital marketing terkini yang dapat membantu bisnis Anda tumbuh di era digital.',
                'description_en' => 'Learn the latest digital marketing strategies to help your business grow in the digital era.',
                'content' => '<p>Ini adalah isi artikel detail tentang tren pemasaran digital 2025...</p>',
                'author' => 'Tim Indiekraf',
                'author_en' => 'Indiekraf Team',
                'type' => 'marketing',
                'image_url' => '/gambar.jpg',
                'published_at' => '2024-01-12',
                'is_published' => true,
            ],
            [
                'category' => 'BRANDING',
                'category_en' => 'BRANDING',
                'title' => 'Panduan Lengkap Membangun Brand Identity yang Kuat',
                'title_en' => 'Complete Guide to Building a Strong Brand Identity',
                'description' => 'Langkah-langkah praktis untuk menciptakan identitas brand yang memorable.',
                'description_en' => 'Practical steps to create a memorable brand identity.',
                'content' => '<p>Membangun brand identity membutuhkan riset mendalam...</p>',
                'author' => 'Tim Indiekraf',
                'author_en' => 'Indiekraf Team',
                'type' => 'design',
                'image_url' => '/gambar.jpg',
                'published_at' => '2024-01-10',
                'is_published' => true,
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }
    }
}
