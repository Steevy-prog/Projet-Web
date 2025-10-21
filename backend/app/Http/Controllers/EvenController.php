<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Evenement",
 *     description="API Endpoints for Evenement Management"
 * )
 *
 * @OA\Schema(
 *     schema="Evenement",
 *     type="object",
 *     required={"titre","date_debut","date_fin"},
 *     @OA\Property(property="id_evenement", type="integer", example=1),
 *     @OA\Property(property="titre", type="string", example="Concours Halloween"),
 *     @OA\Property(property="description", type="string", example="Concours de déguisement"),
 *     @OA\Property(property="date_debut", type="string", format="date-time", example="2025-10-31T10:00:00Z"),
 *     @OA\Property(property="date_fin", type="string", format="date-time", example="2025-10-31T18:00:00Z"),
 *     @OA\Property(property="type_evenement", type="string", example="concours"),
 *     @OA\Property(property="image_url", type="string", example="https://example.com/event.jpg"),
 *     @OA\Property(property="recompense_points", type="integer", example=100),
 *     @OA\Property(property="nombre_participants_max", type="integer", example=50),
 *     @OA\Property(property="est_actif", type="boolean", example=true),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */

class EvenController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/evenements",
     *     summary="Get all events",
     *     description="Returns a list of all events",
     *     tags={"Evenements"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Evenement")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No evenement found")
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
