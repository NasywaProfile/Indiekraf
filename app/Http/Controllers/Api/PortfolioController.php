<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $items = PortfolioItem::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($items);
    }

    public function all()
    {
        $items = PortfolioItem::orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($items);
    }

    public function show($id)
    {
        $item = PortfolioItem::find($id);
        if (!$item) {
            return response()->json(['error' => 'Portfolio item not found'], 404);
        }

        return response()->json($item);
    }

    private function sanitizePortfolioData(array $data): array
    {
        $data['year'] = $data['year'] ?? '';
        $data['client'] = $data['client'] ?? '';
        $data['client_en'] = $data['client_en'] ?? ($data['client'] ?? '');
        $data['title'] = $data['title'] ?? '';
        $data['title_en'] = $data['title_en'] ?? ($data['title'] ?? '');
        $data['category'] = $data['category'] ?? '';
        $data['category_en'] = $data['category_en'] ?? ($data['category'] ?? '');
        $data['description'] = $data['description'] ?? '';
        $data['description_en'] = $data['description_en'] ?? ($data['description'] ?? '');

        $validTypes = ['website', 'branding', 'marketing', 'event', 'insight'];
        $data['type'] = (!empty($data['type']) && in_array($data['type'], $validTypes)) ? $data['type'] : 'website';

        $data['image_url'] = $data['image_url'] ?? '';
        $data['btn_text_id'] = $data['btn_text_id'] ?? '';
        $data['btn_text_en'] = $data['btn_text_en'] ?? '';
        $data['link_url'] = $data['link_url'] ?? '';
        $data['sort_order'] = (int)($data['sort_order'] ?? 0);
        $data['is_active'] = isset($data['is_active']) ? (int)$data['is_active'] : 1;

        return $data;
    }

    public function store(Request $request)
    {
        $data = $this->sanitizePortfolioData($request->all());
        $item = PortfolioItem::create($data);

        return response()->json(['success' => true, 'id' => $item->id, 'item' => $item]);
    }

    public function update(Request $request, $id)
    {
        $item = PortfolioItem::find($id);
        if (!$item) {
            return response()->json(['error' => 'Portfolio item not found'], 404);
        }

        $data = $this->sanitizePortfolioData($request->all());
        $item->update($data);

        return response()->json(['success' => true, 'item' => $item]);
    }

    public function destroy($id)
    {
        $item = PortfolioItem::find($id);
        if (!$item) {
            return response()->json(['error' => 'Portfolio item not found'], 404);
        }

        $item->delete();

        return response()->json(['success' => true]);
    }
}
