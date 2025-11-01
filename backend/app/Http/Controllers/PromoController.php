<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 *
 * @OA\Tag(
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
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Promotion"))
     *     ),
     *     @OA\Response(response=404, description="No promotion found")
     * )
     */
    public function index()
    {
        $promotions = Promotion::all();

        if ($promotions->isEmpty()) {
            return response()->json(['message' => 'No promotions found'], 404);
        }

        return response()->json($promotions, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/promotions",
     *     summary="Create a new promotion",
     *     tags={"Promotions"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Promotion")
     *     ),
     *     @OA\Response(response=201, description="Promotion created successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'reduction' => 'nullable|numeric|min:0',
            'montant_reduction' => 'nullable|numeric|min:0',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'image_url' => 'nullable|string',
            'active' => 'boolean',
            'code_promo' => 'nullable|string|max:50|unique:promotions,code_promo',
            'limite_utilisations' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $promotion = Promotion::create($validator->validated());

        return response()->json(['message' => 'Promotion created successfully', 'promotion' => $promotion], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/promotions/{id}",
     *     summary="Get a specific promotion",
     *     tags={"Promotions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Promotion ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Promotion found"),
     *     @OA\Response(response=404, description="Promotion not found")
     * )
     */
    public function show(string $id)
    {
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return response()->json(['message' => 'Promotion not found'], 404);
        }

        return response()->json($promotion, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/promotions/{id}",
     *     summary="Update an existing promotion",
     *     tags={"Promotions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Promotion ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Promotion")),
     *     @OA\Response(response=200, description="Promotion updated successfully"),
     *     @OA\Response(response=404, description="Promotion not found"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function update(Request $request, string $id)
    {
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return response()->json(['message' => 'Promotion not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'reduction' => 'nullable|numeric|min:0',
            'montant_reduction' => 'nullable|numeric|min:0',
            'date_debut' => 'nullable|date',
            'date_fin' => 'nullable|date|after:date_debut',
            'image_url' => 'nullable|string',
            'active' => 'boolean',
            'code_promo' => 'nullable|string|max:50|unique:promotions,code_promo,' . $promotion->id_promotion . ',id_promotion',
            'limite_utilisations' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $promotion->update($validator->validated());

        return response()->json(['message' => 'Promotion updated successfully', 'promotion' => $promotion], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/promotions/{id}",
     *     summary="Delete a promotion",
     *     tags={"Promotions"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Promotion ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Promotion deleted successfully"),
     *     @OA\Response(response=404, description="Promotion not found")
     * )
     */
    public function destroy(string $id)
    {
        $promotion = Promotion::find($id);

        if (!$promotion) {
            return response()->json(['message' => 'Promotion not found'], 404);
        }

        $promotion->delete();

        return response()->json(['message' => 'Promotion deleted successfully'], 200);
    }
}
