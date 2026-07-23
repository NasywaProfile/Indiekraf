<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
        ]);

        $destinationSetting = SiteSetting::where('key', 'email_destination_newsletter')->first();
        $destinationEmail = ($destinationSetting && $destinationSetting->value)
            ? $destinationSetting->value
            : 'fikar@indiekraf.com';

        Log::info("Newsletter subscription from: {$validated['email']} -> target: {$destinationEmail}");

        return response()->json([
            'success' => true,
            'message' => 'Newsletter subscription received.',
        ]);
    }
}
