<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur as User;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;

class OAuthController extends Controller
{
    // Redirect user to Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle callback from Google
    public function handleGoogleCallback(Request $request)
    {
        try {
            // Verify state parameter to prevent CSRF
            if ($request->has('error')) {
                return response()->json(['error' => 'User denied authentication'], 400);
            }

            $googleUser = Socialite::driver('google')->user();

            // Find or create local user
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'nom' => $googleUser->getName(),
                    'mot_de_passe' => bcrypt(str()->random(16))
                ]
            );

            // Generate JWT token
            $token = JWTAuth::fromUser($user);

            // Redirect to frontend with token
            $frontendUrl = config('app.frontend_url', 'http://localhost:5174');
            return redirect()->away("{$frontendUrl}/auth/callback?token={$token}");

        } catch (\Exception $e) {
            return response()->json(['error' => 'Authentication failed', 'message' => $e->getMessage()], 500);
        }
    }
}
