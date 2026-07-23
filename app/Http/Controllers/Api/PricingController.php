<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    public function index()
    {
        $plans = PricingPlan::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($plans);
    }

    public function all()
    {
        $plans = PricingPlan::orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($plans);
    }

    public function show($id)
    {
        $plan = PricingPlan::find($id);
        if (!$plan) {
            return response()->json(['error' => 'Pricing plan not found'], 404);
        }

        return response()->json($plan);
    }

    private function sanitizePlanData(array $data): array
    {
        if (isset($data['bullets']) && is_string($data['bullets'])) {
            $data['bullets'] = json_decode($data['bullets'], true);
        }
        if (isset($data['bullets_en']) && is_string($data['bullets_en'])) {
            $data['bullets_en'] = json_decode($data['bullets_en'], true);
        }
        if (empty($data['color_theme']) || !in_array($data['color_theme'], ['blue', 'purple', 'pink', 'green'])) {
            $data['color_theme'] = 'blue';
        }

        $data['category_title'] = $data['category_title'] ?? '';
        $data['category_title_en'] = $data['category_title_en'] ?? '';
        $data['category_subtitle'] = $data['category_subtitle'] ?? '';
        $data['category_subtitle_en'] = $data['category_subtitle_en'] ?? '';
        $data['category_icon'] = $data['category_icon'] ?? 'Target';
        $data['subtitle'] = $data['subtitle'] ?? '';
        $data['subtitle_en'] = $data['subtitle_en'] ?? '';
        $data['price'] = $data['price'] ?? '';
        $data['price_en'] = $data['price_en'] ?? '';
        $data['badge'] = $data['badge'] ?? '';
        $data['badge_en'] = $data['badge_en'] ?? '';
        $data['btn_text_id'] = $data['btn_text_id'] ?? '';
        $data['btn_text_en'] = $data['btn_text_en'] ?? '';
        $data['btn_link'] = $data['btn_link'] ?? '';

        return $data;
    }

    public function store(Request $request)
    {
        $data = $this->sanitizePlanData($request->all());
        $plan = PricingPlan::create($data);

        return response()->json(['success' => true, 'id' => $plan->id, 'plan' => $plan]);
    }

    public function update(Request $request, $id)
    {
        $plan = PricingPlan::find($id);
        if (!$plan) {
            return response()->json(['error' => 'Pricing plan not found'], 404);
        }

        $data = $this->sanitizePlanData($request->all());
        $plan->update($data);

        return response()->json(['success' => true, 'plan' => $plan]);
    }

    public function destroy($id)
    {
        $plan = PricingPlan::find($id);
        if (!$plan) {
            return response()->json(['error' => 'Pricing plan not found'], 404);
        }

        $plan->delete();

        return response()->json(['success' => true]);
    }
}
