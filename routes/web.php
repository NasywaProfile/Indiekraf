<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes for Indiekraf Website & CMS
|--------------------------------------------------------------------------
*/

// Serve uploads directly
Route::get('/uploads/{file}', function ($file) {
    $path = public_path('uploads/' . $file);
    if (!File::exists($path)) {
        $path = storage_path('app/public/uploads/' . $file);
    }
    if (File::exists($path)) {
        return response()->file($path);
    }
    abort(404);
});
Route::get('/storage/uploads/{file}', function ($file) {
    $path = public_path('uploads/' . $file);
    if (!File::exists($path)) {
        $path = storage_path('app/public/uploads/' . $file);
    }
    if (File::exists($path)) {
        return response()->file($path);
    }
    abort(404);
});

// Serve compiled Vite assets in dist/assets
Route::get('/assets/{file}', function ($file) {
    $path = base_path('dist/assets/' . $file);
    if (!File::exists($path)) {
        $path = public_path('dist/assets/' . $file);
    }
    if (File::exists($path)) {
        $mime = 'text/plain';
        if (str_ends_with($file, '.css')) $mime = 'text/css';
        if (str_ends_with($file, '.js')) $mime = 'application/javascript';
        return response()->file($path, ['Content-Type' => $mime]);
    }
    abort(404);
});

// Serve CMS Admin SPA (/cms and /admin)
$serveCms = function () {
    $paths = [
        base_path('dist/cms/index.html'),
        public_path('dist/cms/index.html'),
        public_path('cms/index.html'),
        base_path('dist/admin.html'),
        public_path('admin.html'),
        base_path('cms/index.html'),
    ];
    foreach ($paths as $path) {
        if (File::exists($path) && is_file($path)) {
            return response(File::get($path), 200, ['Content-Type' => 'text/html']);
        }
    }
    return response('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Indiekraf CMS</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>Sistem sedang memperbarui aset...</h2><p>Silakan muat ulang halaman ini dalam beberapa detik.</p></body></html>', 503, ['Content-Type' => 'text/html']);
};

Route::get('/cms/{any?}', $serveCms)->where('any', '.*');
Route::get('/admin/{any?}', $serveCms)->where('any', '.*');

// Serve Main Website SPA
Route::get('/{any?}', function () {
    $path = base_path('dist/web/index.html');
    if (!File::exists($path)) {
        $path = public_path('dist/web/index.html');
    }
    if (!File::exists($path)) {
        $path = base_path('web/index.html');
    }
    if (File::exists($path) && is_file($path)) {
        return response(File::get($path), 200, ['Content-Type' => 'text/html']);
    }
    return response('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Indiekraf</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>Sistem sedang memperbarui aset...</h2><p>Silakan muat ulang halaman ini dalam beberapa detik.</p></body></html>', 503, ['Content-Type' => 'text/html']);
})->where('any', '.*');
