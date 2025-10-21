<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Commande",
 *     description="API Endpoints for Commande Management"
 * )
 * @OA\Schema(
 *     schema="Commande",
 *     type="object",
 *     required={"id_utilisateur","montant_total"},
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="date_commande", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="montant_total", type="number", example=5000),
 *     @OA\Property(property="points_gagnes", type="integer", example=50),
 *     @OA\Property(property="type_service", type="string", example="livraison"),
 *     @OA\Property(property="heure_arrivee", type="string", format="date-time", example=null),
 *     @OA\Property(property="statut", type="string", example="en_attente"),
 *     @OA\Property(property="numero_commande", type="string", example="CMD123456"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example=null)
 * )
 */

class CommandeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/commandes",
     *     summary="Get all commands",
     *     description="Returns a list of all commands",
     *     tags={"Commandes"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Commande")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No commande found")
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
