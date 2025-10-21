<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Parrainage",
 *     description="API Endpoints for Parrainage Management"
 * )
 *
 * @OA\Schema(
 *     schema="Parrainage",
 *     type="object",
 *     required={"id_parrain","id_filleul"},
 *     @OA\Property(property="id_parrainage", type="integer", example=1),
 *     @OA\Property(property="id_parrain", type="integer", example=1),
 *     @OA\Property(property="id_filleul", type="integer", example=2),
 *     @OA\Property(property="date_parrainage", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="recompense_attribuee", type="boolean", example=false),
 *     @OA\Property(property="points_gagnes", type="integer", example=50),
 *     @OA\Property(property="date_recompense", type="string", format="date-time", example=null)
 * )
 */

class ParrainController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/parrains",
     *     summary="Get all parrains",
     *     description="Returns a list of all parrains",
     *     tags={"Parrains"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Parrainage")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No parrains found")
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
