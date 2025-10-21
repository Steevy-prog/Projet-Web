<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur as User;
use App\Controllers\UtilisateurController as usercon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
     *             @OA\Property(property="id_role", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(response=201, description="User registered successfully"),
     *     @OA\Response(response=400, description="Bad request")
     * )
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateur,email',
            'mot_de_passe' => 'required|string|min:6',
            'telephone' => 'required|string|max:20',
            'localisation' => 'nullable|string|max:255',
            'id_role' => 'nullable|integer',
            'id_parrain' => 'nullable|integer|exists:utilisateur,id_utilisateur',
        ]);

        // Default values for optional columns
        $validated['points_fidelite'] = 0;
        $validated['code_parrainage'] = strtoupper(substr($validated['prenom'], 0, 3)) . rand(1000, 9999);
        $validated['statut_compte'] = 'actif';
        $validated['derniere_connexion'] = now();
        $validated['date_modification'] = now();
        $validated['mot_de_passe'] = Hash::make($validated['mot_de_passe']);

        // Create the user
        $user = User::create($validated);

        // Generate a JWT token
        $token = Auth::login($user);

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'bearer',
        ], 201);
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
     *     @OA\Response(response=200, description="Login successful"),
     *     @OA\Response(response=401, description="Invalid credentials")
     * )
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'mot_de_passe']);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        $user = Auth::user();

        // Persist dernière_connexion without assuming the returned user supports save()
        $identifier = null;
        if (is_object($user) && property_exists($user, 'id_utilisateur')) {
            $identifier = $user->id_utilisateur;
        } elseif (is_array($user) && isset($user['id_utilisateur'])) {
            $identifier = $user['id_utilisateur'];
        }

        if ($identifier) {
            User::where('id_utilisateur', $identifier)->update(['derniere_connexion' => now()]);
        }

        // Ensure the returned user structure contains the updated timestamp
        if (is_object($user)) {
            $user->derniere_connexion = now();
        } elseif (is_array($user)) {
            $user['derniere_connexion'] = now();
        }

        return response()->json([
            'message' => 'Connexion réussie',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => $user,
        ]);
    }
}
