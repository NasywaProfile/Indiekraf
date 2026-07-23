<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($services);
    }

    public function all()
    {
        $services = Service::orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json($services);
    }

    public function show($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        return response()->json($service);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['bullets']) && is_string($data['bullets'])) {
            $data['bullets'] = json_decode($data['bullets'], true);
        }

        $service = Service::create($data);

        return response()->json(['success' => true, 'id' => $service->id]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        $data = $request->all();
        if (isset($data['bullets']) && is_string($data['bullets'])) {
            $data['bullets'] = json_decode($data['bullets'], true);
        }

        $service->update($data);

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        $service->delete();

        return response()->json(['success' => true]);
    }
}
