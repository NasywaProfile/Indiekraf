<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 100)->unique();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->text('bullets')->nullable()->comment('JSON array of bullet points');
            $table->string('link_text', 200)->nullable();
            $table->string('link_url', 300)->nullable();
            $table->enum('color_theme', ['blue', 'purple', 'green', 'orange'])->default('blue');
            $table->string('icon_name', 100)->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
