<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SiteSettingSeeder::class,
            ServiceSeeder::class,
            PricingPlanSeeder::class,
            PortfolioItemSeeder::class,
            BlogPostSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
