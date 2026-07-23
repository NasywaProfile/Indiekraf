<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'name_en',
        'subtitle',
        'subtitle_en',
        'price',
        'price_en',
        'badge',
        'badge_en',
        'color_theme',
        'bullets',
        'bullets_en',
        'category',
        'sort_order',
        'is_active',
        'category_title',
        'category_title_en',
        'category_subtitle',
        'category_subtitle_en',
        'category_icon',
        'btn_text_id',
        'btn_text_en',
        'btn_link',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'bullets' => 'array',
        'bullets_en' => 'array',
    ];
}
