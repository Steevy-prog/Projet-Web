<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Info(
 *     title="My API",
 *     version="1.0.0",
 *     description="API documentation for my Laravel project"
 * )
 *
 *  @OA\Tag(
 *     name="Utilisateur",
 *     description="API Endpoints for Utilisateur Management"
 * )
 *
 * @OA\Schema(
 *     schema="Utilisateur",
 *     type="object",
 *     required={"nom","prenom","email","mot_de_passe","telephone"},
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="nom", type="string", example="Doe"),
 *     @OA\Property(property="prenom", type="string", example="John"),
 *     @OA\Property(property="email", type="string", example="john.doe@example.com"),
 *     @OA\Property(property="mot_de_passe", type="string", example="hashedpassword"),
 *     @OA\Property(property="telephone", type="string", example="+237699999999"),
 *     @OA\Property(property="localisation", type="string", example="Douala, Cameroon"),
 *     @OA\Property(property="points_fidelite", type="integer", example=100),
 *     @OA\Property(property="code_parrainage", type="string", example="ABC123"),
 *     @OA\Property(property="id_parrain", type="integer", example=null),
 *     @OA\Property(property="id_role", type="integer", example=1),
 *     @OA\Property(property="date_inscription", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="statut_compte", type="boolean", example=true),
 *     @OA\Property(property="derniere_connexion", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */

class UtilisateurController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/utilisateurs",
     *     summary="Get all utilisateurs",
     *     description="Returns a list of all utilisateurs",
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
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
