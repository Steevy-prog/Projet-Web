<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 *
 * @OA\Tag(
 *     name="Role",
 *     description="API Endpoints for Role Management"
 * )
 *
 * @OA\Schema(
 *     schema="Role",
 *     type="object",
 *     required={"nom_role"},
 *     @OA\Property(property="id_role", type="integer", example=1),
 *     @OA\Property(property="nom_role", type="string", example="Admin"),
 *     @OA\Property(property="description", type="string", example="Role with full access"),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z")
 * )
 */

class RoleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/roles",
     *     summary="Get all roles",
     *     description="Returns a list of all roles",
     *     tags={"Roles"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Role")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No roles found")
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
