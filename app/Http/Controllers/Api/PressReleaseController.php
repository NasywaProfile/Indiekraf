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
            'name' => 'required|string',
            'email' => 'required|email',
            'details' => 'required|string',
        ]);

        $destinationSetting = SiteSetting::where('key', 'email_destination_press_release')->first();
        $destinationEmail = ($destinationSetting && $destinationSetting->value)
            ? $destinationSetting->value
            : 'fikar@indiekraf.com';

        Log::info("Press Release submission from: {$validated['name']} ({$validated['email']}) -> target: {$destinationEmail}");

        return response()->json([
            'success' => true,
            'message' => 'Press release submission received.',
        ]);
    }
}
