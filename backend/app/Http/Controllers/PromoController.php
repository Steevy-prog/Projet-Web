<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;

/**
 *
 *@OA\Tag(
 *     name="Promotions",
 *     description="API Endpoints for Promotions Management"
 * )
 *
 * @OA\Schema(
 *     schema="Promotion",
 *     type="object",
 *     required={"titre","date_debut","date_fin"},
 *     @OA\Property(property="id_promotion", type="integer", example=1),
 *     @OA\Property(property="titre", type="string", example="Promotion spéciale Halloween"),
 *     @OA\Property(property="description", type="string", example="Réduction de 20% sur tous les articles sélectionnés"),
 *     @OA\Property(property="reduction", type="number", format="float", example=20.0),
 *     @OA\Property(property="montant_reduction", type="number", format="float", example=1500.50),
 *     @OA\Property(property="date_debut", type="string", format="date-time", example="2025-10-25T10:00:00Z"),
 *     @OA\Property(property="date_fin", type="string", format="date-time", example="2025-10-31T23:59:59Z"),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/images/promo_halloween.jpg"),
 *     @OA\Property(property="active", type="boolean", example=true),
 *     @OA\Property(property="code_promo", type="string", example="HALLOWEEN20"),
 *     @OA\Property(property="nombre_utilisations", type="integer", example=0),
 *     @OA\Property(property="limite_utilisations", type="integer", example=100),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */

class PromoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/promotions",
     *     summary="Get all promotions",
     *     description="Returns a list of all promotions",
     *     tags={"Promotions"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Promotion")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No promotion found")
     * )
     */
    public function index()
    {
        $promotions = Promotion::all();
        return response()->json($promotions);
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
