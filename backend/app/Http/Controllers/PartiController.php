<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Tag(
 *     name="Participation",
 *     description="API Endpoints for Participation Management"
 * )
 *
 * @OA\Schema(
 *     schema="Participation",
 *     type="object",
 *     required={"id_utilisateur","id_evenement"},
 *     @OA\Property(property="id_participation", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="id_evenement", type="integer", example=1),
 *     @OA\Property(property="date_participation", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="points_gagnes", type="integer", example=50),
 *     @OA\Property(property="score", type="integer", example=85),
 *     @OA\Property(property="a_gagne", type="boolean", example=false)
 * )
 */

class PartiController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/participations",
     *     summary="Get all participations",
     *     description="Returns a list of all participations",
     *     tags={"Participations"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Participation")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No participations found")
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
