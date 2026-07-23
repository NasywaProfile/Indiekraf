<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($posts);
    }

    public function all()
    {
        $posts = BlogPost::orderBy('created_at', 'desc')->get();

        return response()->json($posts);
    }

    public function show($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $data['author'] = $data['author'] ?? 'Tim Indiekraf';
        $data['author_en'] = $data['author_en'] ?? 'Indiekraf Team';
        $data['is_published'] = $data['is_published'] ?? true;

        $post = BlogPost::create($data);

        return response()->json(['success' => true, 'id' => $post->id]);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $post->update($request->all());

        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['success' => true]);
    }
}
