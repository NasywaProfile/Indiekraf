<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_items', function (Blueprint $table) {
            $table->id();
            $table->string('year', 10)->nullable();
            $table->string('client', 200)->nullable();
            $table->string('title', 300);
            $table->string('title_en', 300)->nullable();
            $table->string('category', 200)->nullable();
            $table->string('category_en', 200)->nullable();
            $table->text('description')->nullable();
            $table->text('description_en')->nullable();
            $table->enum('type', ['website', 'branding', 'marketing', 'event', 'insight'])->default('website');
            $table->string('image_url', 500)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('btn_text_id', 255)->default('');
            $table->string('btn_text_en', 255)->default('');
            $table->string('link_url', 512)->default('');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
    }
};
