<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PressReleaseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'article' => 'nullable|string',
            'imageUrl' => 'nullable|string',
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'details' => 'nullable|string',
        ]);

        $destinationSetting = SiteSetting::where('key', 'email_destination_press_release')->first();
        $destinationEmail = ($destinationSetting && $destinationSetting->value)
            ? $destinationSetting->value
            : 'fikar@indiekraf.com';

        $title = $validated['title'] ?? $validated['name'] ?? 'Pengajuan Rilis Pers';
        Log::info("Press Release submission: {$title} -> target: {$destinationEmail}");

        return response()->json([
            'success' => true,
            'message' => 'Press release submission received.',
        ]);
    }
}
