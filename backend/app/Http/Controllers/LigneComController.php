<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Tag(
 *     name="LigneCommande",
 *     description="API Endpoints for LigneCommande Management"
 * )
 *
 * @OA\Schema(
 *     schema="LigneCommande",
 *     type="object",
 *     required={"id_commande","id_article","quantite","prix_unitaire"},
 *     @OA\Property(property="id_ligne", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="id_article", type="integer", example=1),
 *     @OA\Property(property="quantite", type="integer", example=2),
 *     @OA\Property(property="prix_unitaire", type="number", example=2500),
 *     @OA\Property(property="sous_total", type="number", example=5000),
 *     @OA\Property(property="commentaire_article", type="string", example="Sans sucre")
 * )
 */

class LigneComController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/ligne_commandes",
     *     summary="Get all lignes commandes",
     *     description="Returns a list of all ligne commandes",
     *     tags={"Promotions"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/LigneCommande")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No ligne commande found")
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
