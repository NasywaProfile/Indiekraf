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
        if (array_key_exists('is_published', $data)) {
            $data['is_published'] = (bool) $data['is_published'];
        } else {
            $data['is_published'] = true;
        }

        $post = BlogPost::create($data);

        return response()->json(['success' => true, 'id' => $post->id]);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['error' => 'Post not found'], 404);
        }

        $data = $request->all();
        if (array_key_exists('is_published', $data)) {
            $data['is_published'] = (bool) $data['is_published'];
        }

        $post->update($data);

        return response()->json(['success' => true, 'data' => $post]);
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
