<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\PressReleaseController;
use App\Http\Controllers\Api\PricingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes for Indiekraf CMS & Website
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/verify', [AuthController::class, 'verify']);

// Site Settings
Route::get('/settings', [SiteSettingController::class, 'index']);
Route::put('/settings', [SiteSettingController::class, 'updateBulk']);
Route::put('/settings/{key}', [SiteSettingController::class, 'updateSingle']);

// Services
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/all', [ServiceController::class, 'all']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

// Pricing Plans
Route::get('/pricing', [PricingController::class, 'index']);
Route::get('/pricing/all', [PricingController::class, 'all']);
Route::get('/pricing/{id}', [PricingController::class, 'show']);
Route::post('/pricing', [PricingController::class, 'store']);
Route::put('/pricing/{id}', [PricingController::class, 'update']);
Route::delete('/pricing/{id}', [PricingController::class, 'destroy']);

// Portfolio
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/all', [PortfolioController::class, 'all']);
Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);
Route::post('/portfolio', [PortfolioController::class, 'store']);
Route::put('/portfolio/{id}', [PortfolioController::class, 'update']);
Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy']);

// Blog Posts
Route::get('/blog', [BlogController::class, 'index']);
Route::get('/blog/all', [BlogController::class, 'all']);
Route::get('/blog/{id}', [BlogController::class, 'show']);
Route::post('/blog', [BlogController::class, 'store']);
Route::put('/blog/{id}', [BlogController::class, 'update']);
Route::delete('/blog/{id}', [BlogController::class, 'destroy']);

// Submissions
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/newsletter', [NewsletterController::class, 'store']);
Route::post('/press-release', [PressReleaseController::class, 'store']);

// Uploads
Route::post('/upload', [UploadController::class, 'store']);
