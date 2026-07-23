<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100)->unique();
            $table->string('name', 200);
            $table->string('name_en', 200)->nullable();
            $table->string('subtitle', 300)->nullable();
            $table->string('subtitle_en', 300)->nullable();
            $table->string('price', 100)->nullable();
            $table->string('price_en', 100)->nullable();
            $table->string('badge', 50)->nullable();
            $table->string('badge_en', 50)->nullable();
            $table->enum('color_theme', ['blue', 'purple', 'pink', 'green'])->default('blue');
            $table->text('bullets')->nullable()->comment('JSON array of bullet points');
            $table->text('bullets_en')->nullable()->comment('JSON array of bullet points in English');
            $table->string('category', 100)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('category_title', 255)->default('');
            $table->string('category_title_en', 255)->default('');
            $table->string('category_subtitle', 255)->default('');
            $table->string('category_subtitle_en', 255)->default('');
            $table->string('category_icon', 50)->default('Target');
            $table->string('btn_text_id', 100)->nullable();
            $table->string('btn_text_en', 100)->nullable();
            $table->string('btn_link', 300)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
