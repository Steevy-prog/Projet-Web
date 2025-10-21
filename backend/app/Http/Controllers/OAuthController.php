<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur as User;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    //redirect user to Facebook
    public function redirectToFacebook(){
        return Socialite::driver('facebook')->redirect();
    }
    // Redirect user to Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

     public function handleFacebookCallback(Request $request)
    {
        try {
            // Verify state parameter to prevent CSRF
            if ($request->has('error')) {
                return response()->json(['error' => 'User denied authentication'], 400);
            }

            $facebookUser = Socialite::driver('facebook')->user();


            // Find or create local user
            $user = User::firstOrCreate(
                ['email' => $facebookUser->getEmail()],
                [
                    'nom' => $facebookUser->getName(),
                    'mot_de_passe' => bcrypt(str()->random(16))
                ]
            );

            // Generate JWT token
            $token = JWTAuth::fromUser($user);

            // Redirect to frontend with token
            $frontendUrl = config('app.frontend_url', 'http://localhost:5174');
            return redirect()->away("{$frontendUrl}?token={$token}");

        } catch (\Exception $e) {
            return response()->json(['error' => 'Authentication failed', 'message' => $e->getMessage()], 500);
        }
    }
// Handle callback from Google
        public function handleGoogleCallback(Request $request)
        {
    try {
        Log::info('🔵 Step 1: Callback received', ['params' => $request->all()]);

        if ($request->has('error')) {
            Log::warning('🟡 Step 1 Failed: User denied');
            return response()->json(['error' => 'User denied authentication'], 400);
        }

        Log::info('🔵 Step 2: Attempting to get Google user');
        $googleUser = Socialite::driver('google')->stateless()->user();
        Log::info('✅ Step 2: Google user retrieved', ['email' => $googleUser->getEmail()]);

        Log::info('🔵 Step 3: Processing name');
        $fullName = $googleUser->getName();
        $parts = explode(' ', trim($fullName), 2);
        $prenom = $parts[0];
        $nom = $parts[1] ?? $parts[0];
        Log::info('✅ Step 3: Name processed', ['prenom' => $prenom, 'nom' => $nom]);

        Log::info('🔵 Step 4: Creating/finding user in database');
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'prenom' => $prenom,
                'telephone' => '0000000000',
                'nom' => $nom,
                'mot_de_passe' => bcrypt(Str::random(16))
            ]
        );
        Log::info('✅ Step 4: User created/found', ['user_id' => $user->id]);

        Log::info('🔵 Step 5: Generating JWT token');
        $token = JWTAuth::fromUser($user);
        Log::info('✅ Step 5: Token generated');

        $frontendUrl = config('app.frontend_url', 'http://localhost:5174');
        Log::info('✅ Step 6: Redirecting to frontend');

        return redirect()->away("{$frontendUrl}?token={$token}");

    } catch (\Exception $e) {
        Log::error('❌ EXCEPTION CAUGHT', [
            'message' => $e->getMessage(),
            'code' => $e->getCode(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'class' => get_class($e),
            'previous' => $e->getPrevious() ? $e->getPrevious()->getMessage() : null,
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'error' => 'Authentication failed',
            'message' => $e->getMessage(),
            'class' => get_class($e), // Shows exception type
            'previous' => $e->getPrevious() ? $e->getPrevious()->getMessage() : null
        ], 500);
    }
}
public function handleGoogleCallback2()
{
    try {
        $googleUser = Socialite::driver('google')->user();
        return response()->json([
            'name' => $googleUser->getName(),
            'email' => $googleUser->getEmail(),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Authentication failed',
            'message' => $e->__toString(),
        ], 500);
    }
}
}
