<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'hero_title_id' => 'Ekosistem Kreatif Digital Indonesia',
            'hero_title_en' => "Indonesia's Digital Creative Ecosystem",
            'hero_subtitle_id' => 'Indiekraf menghadirkan solusi media, studio kreatif, akademi, dan riset untuk mendorong pertumbuhan bisnis Anda di era digital.',
            'hero_subtitle_en' => 'Indiekraf provides media, creative studio, academy, and research solutions to drive your business growth in the digital era.',
            'hero_cta_primary_id' => 'Pelajari Layanan',
            'hero_cta_primary_en' => 'Explore Services',
            'hero_cta_secondary_id' => 'Tentang Kami',
            'hero_cta_secondary_en' => 'About Us',
            'stat_visitors' => '75.000+',
            'stat_followers' => '10.000+',
            'stat_channels' => '10+',
            'stat_reach' => '100.000+',
            'about_tagline_id' => 'Tentang Indiekraf',
            'about_tagline_en' => 'About Indiekraf',
            'about_description_id' => 'Indiekraf adalah ekosistem kreatif digital yang mengintegrasikan media, studio kreatif, akademi nonformal, dan pusat riset untuk mendorong transformasi industri kreatif Indonesia.',
            'about_description_en' => 'Indiekraf is a digital creative ecosystem that integrates media, creative studio, non-formal academy, and research center to drive the transformation of Indonesia\'s creative industry.',
            'contact_email' => 'hello@indiekraf.com',
            'contact_phone' => '+62 812-3456-7890',
            'contact_address' => 'Malang, Jawa Timur, Indonesia',
            'contact_maps_embed' => '',
            'email_destination_newsletter' => 'fikar@indiekraf.com',
            'email_destination_press_release' => 'fikar@indiekraf.com',
            'email_destination_contact' => 'fikar@indiekraf.com',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
    }
}
