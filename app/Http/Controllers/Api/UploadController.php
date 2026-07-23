<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|image|max:10240',
        ], [
            'image.required' => 'File gambar tidak ditemukan dalam permintaan.',
            'image.file' => 'Ukuran file gambar melebihi batas maksimal upload server PHP (2MB).',
            'image.image' => 'File yang diunggah harus berupa format gambar (JPG, PNG, WEBP, GIF).',
            'image.max' => 'Ukuran file gambar tidak boleh lebih dari 10MB.',
            'image.uploaded' => 'Ukuran file gambar terlalu besar (Melebihi batas upload 2MB server PHP).',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->first('image') ?: 'File gambar tidak valid atau ukuran terlalu besar.'
            ], 422);
        }

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $file = $request->file('image');
            $ext = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'png');
            $filename = time() . '-' . uniqid() . '.' . $ext;

            $file->storeAs('uploads', $filename, 'public');

            $publicUploadsDir = public_path('uploads');
            if (!file_exists($publicUploadsDir)) {
                @mkdir($publicUploadsDir, 0777, true);
            }
            @copy(storage_path('app/public/uploads/' . $filename), $publicUploadsDir . '/' . $filename);

            $url = '/uploads/' . $filename;

            return response()->json([
                'success' => true,
                'url' => $url,
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'File gambar tidak dapat dibaca atau melebihi batas upload PHP server.'
        ], 400);
    }
}
