<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="Endpoints for user registration and authentication"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","prenom","email","mot_de_passe","telephone"},
     *             @OA\Property(property="nom", type="string", example="Doe"),
     *             @OA\Property(property="prenom", type="string", example="John"),
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="mot_de_passe", type="string", example="password123"),
     *             @OA\Property(property="telephone", type="string", example="+237671234567"),
     *             @OA\Property(property="localisation", type="string", example="Douala"),
     *             @OA\Property(property="id_role", type="integer", example=4),
     *             @OA\Property(property="id_parrain", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="access_token", type="string"),
     *             @OA\Property(property="token_type", type="string"),
     *             @OA\Property(property="expires_in", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function register(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateur,email',
            'mot_de_passe' => 'required|string|min:6|confirmed', // Add confirmed if you want password confirmation
            'telephone' => 'required|string|max:20|unique:utilisateur,telephone',
            'localisation' => 'nullable|string|max:255',
            'id_role' => 'nullable|integer|exists:role,id_role',
            'id_parrain' => 'nullable|integer|exists:utilisateur,id_utilisateur',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Prepare user data
            $userData = [
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'mot_de_passe' => Hash::make($request->mot_de_passe),
                'telephone' => $request->telephone,
                'localisation' => $request->localisation,
                'id_role' => $request->id_role ?? 4, // Default role (Client/Livreur)
                'id_parrain' => $request->id_parrain,
                'points_fidelite' => 0,
                'code_parrainage' => $this->generateParrainageCode($request->prenom),
                'statut_compte' => true,
                'derniere_connexion' => now(),
                'date_modification' => now(),
            ];

            // Create the user
            $user = User::create($userData);

            // If user has a parrain, award points to the parrain
            if ($request->id_parrain) {
                $this->awardParrainagePoints($request->id_parrain);
            }

            // Generate JWT token for the new user
            $token = JWTAuth::fromUser($user);
            $ttl = config('jwt.ttl', 60); // Get TTL from config or default to 60 minutes

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => $ttl * 60, // Convert minutes to seconds
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Login user and return JWT token",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","mot_de_passe"},
     *             @OA\Property(property="email", type="string", example="john@example.com"),
     *             @OA\Property(property="mot_de_passe", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string"),
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="access_token", type="string"),
     *             @OA\Property(property="token_type", type="string"),
     *             @OA\Property(property="expires_in", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Invalid credentials"),
     *     @OA\Response(response=403, description="Account disabled")
     * )
     */
    public function login(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'mot_de_passe' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Find user by email
            $user = User::where('email', $request->email)->first();

            // Check if user exists
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Email '
                ], 401);
            }

            // Check if account is active
            if (!$user->statut_compte) {
                return response()->json([
                    'success' => false,
                    'message' => 'Votre compte a été désactivé. Veuillez contacter l\'administrateur.'
                ], 403);
            }

            // Verify password
            $credentials = [
                'email' => $request->email,
                'password' => $request->mot_de_passe, // Map to 'password'
            ];

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Identifiants invalides'], 401);
            }

            // Generate JWT token
            $token = JWTAuth::fromUser($user);

            // Update last login time
            $user->derniere_connexion = now();
            $user->save();

            // Get TTL from config
            $ttl = config('jwt.ttl', 60);

            // Load relationships if needed
            $user->load('role'); // Assuming you have a role relationship

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => $ttl * 60, // Convert minutes to seconds
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création du token',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la connexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Logout user and invalidate token",
     *     tags={"Authentication"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Logout successful"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function logout(Request $request)
    {
        try {
            // Invalidate the token
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Déconnexion réussie'
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la déconnexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/refresh",
     *     summary="Refresh JWT token",
     *     tags={"Authentication"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Token refreshed successfully"),
     *     @OA\Response(response=401, description="Token invalid")
     * )
     */
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            $ttl = config('jwt.ttl', 60);

            return response()->json([
                'success' => true,
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => $ttl * 60,
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Impossible de rafraîchir le token',
                'error' => $e->getMessage()
            ], 401);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/me",
     *     summary="Get authenticated user details",
     *     tags={"Authentication"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="User details retrieved"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }

            // Load relationships
            $user->load('role');

            return response()->json([
                'success' => true,
                'user' => $user
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token invalide',
                'error' => $e->getMessage()
            ], 401);
        }
    }

    /**
     * Generate a unique parrainage code
     */
    private function generateParrainageCode($prenom)
    {
        do {
            $code = strtoupper(substr($prenom, 0, 3)) . rand(1000, 9999);
        } while (User::where('code_parrainage', $code)->exists());

        return $code;
    }

    /**
     * Award points to parrain when a new user registers with their code
     */
    private function awardParrainagePoints($parrainId, $points = 50)
    {
        try {
            $parrain = User::find($parrainId);
            if ($parrain) {
                $parrain->increment('points_fidelite', $points);
            }
        } catch (\Exception $e) {
            // Log error but don't fail the registration
            Log::error('Error awarding parrainage points: ' . $e->getMessage());
        }
    }
}
