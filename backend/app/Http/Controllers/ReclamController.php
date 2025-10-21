<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Tag(
 *     name="Reclamation",
 *     description="API Endpoints for Reclamation Management"
 * )
 *
 * @OA\Schema(
 *     schema="Reclamation",
 *     type="object",
 *     required={"id_utilisateur","description"},
 *     @OA\Property(property="id_reclamation", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=null),
 *     @OA\Property(property="id_employe_traitement", type="integer", example=null),
 *     @OA\Property(property="description", type="string", example="Problème avec la commande"),
 *     @OA\Property(property="statut", type="string", example="ouverte"),
 *     @OA\Property(property="date_reclamation", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="date_traitement", type="string", format="date-time", example=null),
 *     @OA\Property(property="reponse", type="string", example=null),
 *     @OA\Property(property="priorite", type="string", example="moyenne")
 * )
 */

class ReclamController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/reclamations",
     *     summary="Get all reclamations",
     *     description="Returns a list of all reclamations",
     *     tags={"Reclamations"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Reclamation")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No reclamation found")
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
