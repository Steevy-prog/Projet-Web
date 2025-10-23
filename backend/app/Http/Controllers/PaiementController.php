<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Paiements",
 *     description="API Endpoints for Payment Management"
 * )
 *
 * @OA\Schema(
 *     schema="Paiement",
 *     type="object",
 *     required={"id_commande", "montant", "methode_paiement"},
 *     @OA\Property(property="id_paiement", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=12),
 *     @OA\Property(property="montant", type="number", format="float", example=25900.50),
 *     @OA\Property(property="methode_paiement", type="string", example="Mobile Money"),
 *     @OA\Property(property="statut_paiement", type="string", example="validé"),
 *     @OA\Property(property="transaction_id", type="string", example="TXN123456789")
 * )
 */
class PaiementController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/paiements",
     *     summary="Get all paiements",
     *     tags={"Paiements"},
     *     @OA\Response(response=200, description="List of paiements", @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Paiement")))
     * )
     */
    public function index()
    {
        $paiements = Paiement::with('commande')->get();

        if ($paiements->isEmpty()) {
            return response()->json(['message' => 'No paiements found'], 404);
        }

        return response()->json($paiements, 200);
    }

    /**
     * @OA\Post(
     *     path="/api/paiements",
     *     summary="Create a new paiement",
     *     tags={"Paiements"},
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Paiement")),
     *     @OA\Response(response=201, description="Paiement created successfully"),
     *     @OA\Response(response=400, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_commande' => 'required|integer|exists:commande,id_commande',
            'montant' => 'required|numeric|min:0',
            'methode_paiement' => 'required|string|max:255',
            'statut_paiement' => 'nullable|string|in:en attente,validé,échoué',
            'transaction_id' => 'nullable|string|unique:paiement,transaction_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $data = $validator->validated();
        $data['statut_paiement'] = $data['statut_paiement'] ?? 'en attente';

        $paiement = Paiement::create($data);

        return response()->json(['message' => 'Paiement created successfully', 'paiement' => $paiement], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/paiements/{id}",
     *     summary="Get a single paiement by ID",
     *     tags={"Paiements"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paiement found"),
     *     @OA\Response(response=404, description="Paiement not found")
     * )
     */
    public function show(string $id)
    {
        $paiement = Paiement::with('commande')->find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        return response()->json($paiement, 200);
    }

    /**
     * @OA\Put(
     *     path="/api/paiements/{id}",
     *     summary="Update a paiement",
     *     tags={"Paiements"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Paiement")),
     *     @OA\Response(response=200, description="Paiement updated successfully"),
     *     @OA\Response(response=404, description="Paiement not found")
     * )
     */
    public function update(Request $request, string $id)
    {
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'montant' => 'nullable|numeric|min:0',
            'methode_paiement' => 'nullable|string|max:255',
            'statut_paiement' => 'nullable|string|in:en attente,validé,échoué',
            'transaction_id' => 'nullable|string|unique:paiement,transaction_id,' . $paiement->id_paiement . ',id_paiement',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $paiement->update($validator->validated());

        return response()->json(['message' => 'Paiement updated successfully', 'paiement' => $paiement], 200);
    }

    /**
     * @OA\Delete(
     *     path="/api/paiements/{id}",
     *     summary="Delete a paiement",
     *     tags={"Paiements"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Paiement deleted successfully"),
     *     @OA\Response(response=404, description="Paiement not found")
     * )
     */
    public function destroy(string $id)
    {
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json(['message' => 'Paiement not found'], 404);
        }

        $paiement->delete();

        return response()->json(['message' => 'Paiement deleted successfully'], 200);
    }
}
