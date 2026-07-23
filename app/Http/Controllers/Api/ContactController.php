<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'whatsapp' => 'required|string',
            'service' => 'required|string',
            'details' => 'required|string',
        ]);

        $destinationSetting = SiteSetting::where('key', 'email_destination_contact')->first();
        $destinationEmail = ($destinationSetting && $destinationSetting->value)
            ? $destinationSetting->value
            : 'fikar@indiekraf.com';

        Log::info("Brief Kolaborasi diterima dari: {$validated['name']} ({$validated['email']}) -> target: {$destinationEmail}");

        // If mailer host is default / unconfigured, handle gracefully in mock mode
        try {
            if (config('mail.mailers.smtp.host')) {
                Mail::raw(
                    "Halo,\n\nAda pengajuan kolaborasi baru:\nNama: {$validated['name']}\nEmail: {$validated['email']}\nWhatsApp: {$validated['whatsapp']}\nLayanan: {$validated['service']}\nDetail:\n{$validated['details']}",
                    function ($message) use ($destinationEmail, $validated) {
                        $message->to($destinationEmail)
                            ->subject("[Brief Kolaborasi] Pengajuan Kolaborasi Baru dari {$validated['name']}");
                    }
                );
            }
        } catch (\Throwable $e) {
            Log::warning('SMTP send failed: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Brief logged successfully.',
            'data' => $validated,
        ]);
    }
}
