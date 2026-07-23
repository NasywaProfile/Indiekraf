<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'category_en',
        'title',
        'title_en',
        'description',
        'description_en',
        'content',
        'content_en',
        'author',
        'author_en',
        'type',
        'image_url',
        'read_more_id',
        'read_more_en',
        'read_more_link',
        'published_at',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'date',
    ];
}
