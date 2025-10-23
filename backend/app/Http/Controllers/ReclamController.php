<?php

namespace App\Http\Controllers;

use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Reclamations",
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
     *     tags={"Reclamations"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all reclamations",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Reclamation"))
     *     )
     * )
     */
    public function index()
    {
        $reclamations = Reclamation::with(['utilisateur', 'commande', 'employe'])->get();

        if ($reclamations->isEmpty()) {
            return response()->json(['message' => 'No reclamations found'], 404);
        }

        return response()->json($reclamations, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/reclamations",
     *     summary="Create a new reclamation",
     *     tags={"Reclamations"},
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Reclamation")),
     *     @OA\Response(response=201, description="Reclamation created successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_utilisateur' => 'required|integer|exists:utilisateur,id_utilisateur',
            'id_commande' => 'nullable|integer|exists:commande,id_commande',
            'id_employe_traitement' => 'nullable|integer|exists:employe,id_employe',
            'description' => 'required|string|max:1000',
            'statut' => 'nullable|string|in:ouverte,en cours,fermee',
            'reponse' => 'nullable|string',
            'priorite' => 'nullable|string|in:basse,moyenne,haute',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $data = $validator->validated();
        $data['statut'] = $data['statut'] ?? 'ouverte';

        $reclamation = Reclamation::create($data);

        return response()->json(['message' => 'Reclamation created successfully', 'reclamation' => $reclamation], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/reclamations/{id}",
     *     summary="Get a single reclamation by ID",
     *     tags={"Reclamations"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Reclamation found"),
     *     @OA\Response(response=404, description="Reclamation not found")
     * )
     */
    public function show(string $id)
    {
        $reclamation = Reclamation::with(['utilisateur', 'commande', 'employe'])->find($id);

        if (!$reclamation) {
            return response()->json(['message' => 'Reclamation not found'], 404);
        }

        return response()->json($reclamation, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/reclamations/{id}",
     *     summary="Update a reclamation",
     *     tags={"Reclamations"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Reclamation")),
     *     @OA\Response(response=200, description="Reclamation updated successfully"),
     *     @OA\Response(response=404, description="Reclamation not found")
     * )
     */
    public function update(Request $request, string $id)
    {
        $reclamation = Reclamation::find($id);

        if (!$reclamation) {
            return response()->json(['message' => 'Reclamation not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string|max:1000',
            'statut' => 'nullable|string|in:ouverte,en cours,fermee',
            'reponse' => 'nullable|string',
            'priorite' => 'nullable|string|in:basse,moyenne,haute',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $reclamation->update($validator->validated());

        return response()->json(['message' => 'Reclamation updated successfully', 'reclamation' => $reclamation], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/reclamations/{id}",
     *     summary="Delete a reclamation",
     *     tags={"Reclamations"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Reclamation deleted successfully"),
     *     @OA\Response(response=404, description="Reclamation not found")
     * )
     */
    public function destroy(string $id)
    {
        $reclamation = Reclamation::find($id);

        if (!$reclamation) {
            return response()->json(['message' => 'Reclamation not found'], 404);
        }

        $reclamation->delete();

        return response()->json(['message' => 'Reclamation deleted successfully'], 200);
    }
}
