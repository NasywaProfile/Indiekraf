<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('category', 100)->nullable();
            $table->string('category_en', 100)->nullable();
            $table->string('title', 400);
            $table->string('title_en', 400)->nullable();
            $table->text('description')->nullable();
            $table->text('description_en')->nullable();
            $table->longText('content')->nullable()->comment('Full article content (HTML/Markdown)');
            $table->longText('content_en')->nullable()->comment('Full article content in English (HTML/Markdown)');
            $table->string('author', 100)->default('Tim Indiekraf');
            $table->string('author_en', 100)->default('Indiekraf Team');
            $table->enum('type', ['game', 'tech', 'design', 'economy', 'business', 'marketing', 'development'])->default('marketing');
            $table->string('image_url', 500)->nullable();
            $table->string('read_more_id', 100)->nullable();
            $table->string('read_more_en', 100)->nullable();
            $table->string('read_more_link', 500)->nullable();
            $table->date('published_at')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
