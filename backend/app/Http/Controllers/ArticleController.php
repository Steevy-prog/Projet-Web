<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *  * @OA\Tag(
 *     name="Articles",
 *     description="API Endpoints for Article Management"
 * )
 *
 * @OA\Schema(
 *     schema="Article",
 *     type="object",
 *     required={"nom","prix","id_categorie"},
 *     @OA\Property(property="id_article", type="integer", example=1),
 *     @OA\Property(property="nom", type="string", example="Café Latte"),
 *     @OA\Property(property="description", type="string", example="Délicieux café au lait"),
 *     @OA\Property(property="prix", type="number", example=2500),
 *     @OA\Property(property="id_categorie", type="integer", example=1),
 *     @OA\Property(property="disponible", type="boolean", example=true),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/image.jpg"),
 *     @OA\Property(property="est_promotion", type="boolean", example=false),
 *     @OA\Property(property="stock_disponible", type="integer", example=50),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example=null)
 * )
 */


class ArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/articles",
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
