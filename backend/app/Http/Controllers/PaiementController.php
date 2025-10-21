<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Paiement",
 *     description="API Endpoints for Paiement Management"
 * )
 *
 * @OA\Schema(
 *     schema="Paiement",
 *     type="object",
 *     required={"id_commande","montant"},
 *     @OA\Property(property="id_paiement", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="montant", type="number", example=5000),
 *     @OA\Property(property="methode_paiement", type="string", example="carte"),
 *     @OA\Property(property="date_paiement", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="statut_paiement", type="string", example="valide"),
 *     @OA\Property(property="transaction_id", type="string", example="TX123456"),
 *     @OA\Property(property="points_utilises", type="integer", example=50),
 *     @OA\Property(property="montant_points", type="number", example=500),
 *     @OA\Property(property="montant_especes", type="number", example=4500),
 *     @OA\Property(property="reference_paiement", type="string", example="REF123456")
 * )
 */

class PaiementController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/paiements",
     *     summary="Get all paiements",
     *     description="Returns a list of all paiements",
     *     tags={"Paiements"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Paiement")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No paiement found")
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
