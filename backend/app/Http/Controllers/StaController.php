<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 *
 *@OA\Tag(
 *     name="Statistiques",
 *     description="API Endpoints for Statistiques Management"
 * )
 *
 * @OA\Schema(
 *     schema="Statistique",
 *     type="object",
 *     required={"id_utilisateur"},
 *     @OA\Property(property="id_statistique", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="total_commandes", type="integer", example=10),
 *     @OA\Property(property="total_depense", type="number", example=50000),
 *     @OA\Property(property="total_points_gagnes", type="integer", example=500),
 *     @OA\Property(property="total_points_utilises", type="integer", example=100),
 *     @OA\Property(property="total_parrainages", type="integer", example=3),
 *     @OA\Property(property="note_moyenne", type="number", example=4.5),
 *     @OA\Property(property="derniere_mise_a_jour", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */

class StaController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/statistiques",
     *     summary="Get all statistiques",
     *     description="Returns a list of all statistiques",
     *     tags={"Statistiques"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Statistique")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No statistiques found")
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
