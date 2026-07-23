<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'client',
        'title',
        'title_en',
        'category',
        'category_en',
        'description',
        'description_en',
        'type',
        'image_url',
        'sort_order',
        'is_active',
        'btn_text_id',
        'btn_text_en',
        'link_url',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
