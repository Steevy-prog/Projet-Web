<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Tag(
 *     name="Livraison",
 *     description="API Endpoints for Livraison Management"
 * )
 *
 * @OA\Schema(
 *     schema="Livraison",
 *     type="object",
 *     required={"id_commande","adresse_livraison"},
 *     @OA\Property(property="id_livraison", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="adresse_livraison", type="string", example="123 Rue de Douala"),
 *     @OA\Property(property="heure_livraison", type="string", format="date-time", example=null),
 *     @OA\Property(property="statut_livraison", type="string", example="en_preparation"),
 *     @OA\Property(property="latitude", type="number", example=4.05),
 *     @OA\Property(property="longitude", type="number", example=9.70),
 *     @OA\Property(property="instructions_livraison", type="string", example="Sonner à l'interphone"),
 *     @OA\Property(property="id_livreur", type="integer", example=null),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example=null)
 * )
 */

class LivController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/livraisons",
     *     summary="Get all livraisons",
     *     description="Returns a list of all livraisons",
     *     tags={"Livraisons"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Livraison")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No livraison found")
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
