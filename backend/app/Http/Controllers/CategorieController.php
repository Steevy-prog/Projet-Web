<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Categorie",
 *     description="API Endpoints for Categorie Management"
 * )
 *
 * @OA\Schema(
 *     schema="Categorie",
 *     type="object",
 *     required={"nom_categorie"},
 *     @OA\Property(property="id_categorie", type="integer", example=1),
 *     @OA\Property(property="nom_categorie", type="string", example="Boissons"),
 *     @OA\Property(property="description", type="string", example="Toutes les boissons disponibles"),
 *     @OA\Property(property="ordre_affichage", type="integer", example=1),
 *     @OA\Property(property="active", type="boolean", example=true),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */


class CategorieController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
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
