<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = AdminUser::where('username', $request->username)->first();

        if (!$user) {
            return response()->json(['error' => 'Username atau password salah'], 401);
        }

        $isValid = password_verify($request->password, $user->password_hash);
        if (!$isValid) {
            try {
                $isValid = Hash::check($request->password, $user->password_hash);
            } catch (\Throwable $e) {
                $isValid = false;
            }
        }

        if (!$isValid) {
            return response()->json(['error' => 'Username atau password salah'], 401);
        }

        $token = $user->createToken('cms-auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
            ],
        ]);
    }

    public function verify(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['valid' => false], 401);
        }

        if ($user = $request->user()) {
            return response()->json([
                'valid' => true,
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'name' => $user->name,
                ],
            ]);
        }

        return response()->json(['valid' => false], 401);
    }
}
