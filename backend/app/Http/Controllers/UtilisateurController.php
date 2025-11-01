<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;
use App\Events\UserPointsUpdated;
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/utilisateurs",
     *     summary="Get all utilisateurs except those with id_role = 1",
     *     description="Returns a list of all utilisateurs except those with id_role = 1",
     *     tags={"Utilisateurs"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Utilisateur")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No utilisateur found")
     * )
     */
    public function index()
    {
        // Retrieve all users except where id_role == 1
        $users = Utilisateur::get();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No utilisateur found'], 404);
        }

        // Optionally flatten or map fields here if needed
        // For example, map to include only required fields or rename keys

        $response = $users->map(function($user) {
            return [
                'id_utilisateur'   => $user->id_utilisateur,
                'nom'              => $user->nom,
                'prenom'           => $user->prenom,
                'email'            => $user->email,
                'telephone'        => $user->telephone,
                'localisation'     => $user->localisation,
                'points_fidelite'  => $user->points_fidelite,
                'code_parrainage'  => $user->code_parrainage,
                'id_parrain'       => $user->id_parrain,
                'id_role'          => $user->id_role,
                'date_inscription' => $user->date_inscription,
                'statut_compte'    => $user->statut_compte,
                'derniere_connexion'=> $user->derniere_connexion,
                'date_modification'=> $user->date_modification,
                'jeux_joues'       => $user->jeux_joues ?? 0,
            ];
        });

        return response()->json($response);
    }

    // ... keep your other methods here (create, store, show, edit, update, destroy)...

    /**
     * Example renamed useruser() to getFilteredUsers() — returns limited user data
     */
    public function getFilteredUsers()
    {
        $utilisateurs = Utilisateur::all();

        $response = $utilisateurs->map(function($utilisateur) {
            return [
                'id_utilisateur'  => $utilisateur->id_utilisateur,
                'nom'             => $utilisateur->nom,
                'prenom'          => $utilisateur->prenom,
                'points_fidelite' => $utilisateur->points_fidelite,
                'gamesPlayed'     => $utilisateur->jeux_joues ?? 0,
            ];
        });

        return response()->json($response);
    }

    // Other controller methods...
}
