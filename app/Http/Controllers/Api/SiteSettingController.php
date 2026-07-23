<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function index()
    {
        $rows = SiteSetting::all();
        $settings = [];
        foreach ($rows as $row) {
            $settings[$row->key] = $row->value;
        }

        return response()->json($settings);
    }

    public function updateSingle(Request $request, string $key)
    {
        $value = $request->input('value');
        SiteSetting::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );

        return response()->json(['success' => true]);
    }

    public function updateBulk(Request $request)
    {
        $settings = $request->all();
        $updatedCount = 0;

        foreach ($settings as $key => $value) {
            if (is_string($key)) {
                SiteSetting::updateOrCreate(
                    ['key' => $key],
                    ['value' => is_array($value) ? json_encode($value) : $value]
                );
                $updatedCount++;
            }
        }

        return response()->json(['success' => true, 'updated' => $updatedCount]);
    }
}
