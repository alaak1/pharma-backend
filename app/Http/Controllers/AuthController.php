<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required',
                'last_name'  => 'required',
                'phone'      => 'required',
                'role'       => 'required|in:admin,support,regular',
                'email'      => 'required|email|unique:users,email',
                'password'   => 'required|min:6',
            ]);

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
                'phone'      => $request->phone,
                'role'       => $request->role,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'User registered successfully',
                'user'    => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Registration failed',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email'    => 'required|email',
                'password' => 'required'
            ]);

            $user = User::getUserByEmail($request->email);

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            $token = $user->createToken('api_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token'   => $token,
                'user'    => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Login failed',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if (! $request->user()) {
                return response()->json([
                    'error' => 'Token invalid or missing'
                ], 401);
            }

            // Delete only the current token (proper API behavior)
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logged out successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Logout failed',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
