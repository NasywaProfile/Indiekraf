<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        AdminUser::updateOrCreate(
            ['username' => 'indiekraf'],
            [
                'password_hash' => Hash::make('indiekrafkreatifdanmenyenangkan'),
                'name' => 'Indiekraf Creative',
            ]
        );
    }
}
