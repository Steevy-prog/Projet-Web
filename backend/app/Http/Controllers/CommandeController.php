<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 *
 * @OA\Tag(
 *     name="Commande",
 *     description="API Endpoints for Commande Management"
 * )
 * @OA\Schema(
 *     schema="Commande",
 *     type="object",
 *     required={"id_utilisateur","montant_total"},
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="date_commande", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="montant_total", type="number", example=5000),
 *     @OA\Property(property="points_gagnes", type="integer", example=50),
 *     @OA\Property(property="type_service", type="string", example="livraison"),
 *     @OA\Property(property="heure_arrivee", type="string", format="date-time", example=null),
 *     @OA\Property(property="statut", type="string", example="en_attente"),
 *     @OA\Property(property="numero_commande", type="string", example="CMD123456"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example=null)
 * )
 */

class CommandeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/commandes",
     *     summary="Get all orders",
     *     description="Returns a list of all orders with user details",
     *     tags={"Commandes"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="string", example="1"),
     *                 @OA\Property(property="userId", type="string", example="1"),
     *                 @OA\Property(property="userName", type="string", example="John Doe"),
     *                 @OA\Property(property="userEmail", type="string", example="john@example.com"),
     *                 @OA\Property(property="total", type="number", example=5000),
     *                 @OA\Property(property="status", type="string", example="pending"),
     *                 @OA\Property(property="createdAt", type="string", format="date-time", example="2025-10-20T12:00:00Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=404, description="No orders found")
     * )
     */
    public function index()
    {
    // Load all commandes with user and order lines, including article info
    $commandes = Commande::with(['utilisateur', 'lignes.article'])->get();

    if ($commandes->isEmpty()) {
        return response()->json([], 200); // return empty array instead of 404
    }

    $result = $commandes->map(function ($cmd) {
        return [
            'id' => (string) $cmd->id_commande,
            'userId' => (string) $cmd->utilisateur->id_utilisateur,
            'userEmail' => $cmd->utilisateur->email,
            'userName' => $cmd->utilisateur->nom . ' ' . $cmd->utilisateur->prenom,
            'total' => (float) $cmd->montant_total,
            'status' => $cmd->statut,
            'createdAt' => $cmd->date_commande,
            'typeService' => $cmd->type_service,
            'arrivalTime' => $cmd->heure_arrivee,
            'orderNumber' => $cmd->numero_commande,
            'items' => $cmd->lignes->map(function ($line) {
                return [
                    'menuItem' => [
                        'id' => (string) $line->article->id_article,
                        'name' => $line->article->nom,
                        'description' => $line->article->description,
                        'price' => (float) $line->article->prix,
                        'category' => $line->article->id_categorie, // or map to category name
                        'image' => $line->article->image_url,
                        'popular' => $line->article->est_promotion,
                        'available' => $line->article->disponible,
                        'stock' => $line->article->stock_disponible,
                    ],
                    'quantity' => $line->quantite,
                    'subtotal' => (float) $line->sous_total,
                    'comment' => $line->commentaire_article,
                ];
            }),
        ];
    });

    return response()->json($result);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_utilisateur' => 'required|integer|exists:utilisateur,id_utilisateur',
            'date_commande' => 'required|date',
            'montant_total' => 'required|numeric',
            'points_gagnes' => 'required|integer',
            'type_service' => 'required|string',
            'heure_arrivee' => 'nullable|date_format:H:i:s',
            'statut' => 'required|string',
            'numero_commande' => 'required|string|unique:commande,numero_commande',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $commande = Commande::create($validator->validated());

        return response()->json([
            'message' => 'Order created successfully',
            'data' => [
                'id' => (string) $commande->id_commande,
                'userId' => (string) $commande->id_utilisateur,
                'total' => $commande->montant_total,
                'status' => $commande->statut,
                'createdAt' => $commande->date_commande,
            ],
        ], 201);
    }

    /**
     * Display a single order with details.
     */
    public function show($id)
    {
        $commande = Commande::with('utilisateur', 'lignes')->find($id);

        if (!$commande) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $orderDetails = [
            'id' => (string) $commande->id_commande,
            'userId' => (string) $commande->id_utilisateur,
            'userName' => $commande->utilisateur->nom . ' ' . $commande->utilisateur->prenom,
            'userEmail' => $commande->utilisateur->email,
            'total' => $commande->montant_total,
            'status' => $commande->statut,
            'createdAt' => $commande->date_commande,
            'items' => $commande->lignes->map(function ($line) {
                return [
                    'productId' => $line->id_produit,
                    'quantity' => $line->quantite,
                    'price' => $line->prix_unitaire,
                ];
            }),
        ];

        return response()->json($orderDetails);
    }

    /**
     * Update an order's status.
     */
    public function update(Request $request, $id)
    {
        $commande = Commande::find($id);
        if (!$commande) return response()->json(['message' => 'Order not found'], 404);

        $validated = $request->validate([
            'statut' => 'required|string',
        ]);

        $commande->update($validated);

        return response()->json(['message' => 'Order updated', 'data' => $commande]);
    }
public function weekly()
{
    $weeklyStats = DB::table('commande')
        ->selectRaw("TO_CHAR(date_commande, 'Day') as day, COUNT(*) as orders, SUM(montant_total) as revenue")
        ->where('date_commande', '>=', now()->subDays(7))
        ->groupBy('day')
        ->orderByRaw("MIN(date_commande)")
        ->get();

    return response()->json($weeklyStats);
}
    /**
     * Delete an order.
     */
    public function destroy($id)
    {
        $commande = Commande::find($id);
        if (!$commande) return response()->json(['message' => 'Order not found'], 404);

        $commande->delete();

        return response()->json(['message' => 'Order deleted']);
    }
    public function getUserOrders($userId)
{
    // Load orders with user and lines
    $commandes = Commande::with(['utilisateur', 'lignes.article'])
        ->where('id_utilisateur', $userId)
        ->get();

    if ($commandes->isEmpty()) {
        return response()->json(['message' => 'No orders found for this user'], 404);
    }

    $result = $commandes->map(function ($cmd) {
        return [
            'id' => (string) $cmd->id_commande,
            'userId' => (string) $cmd->utilisateur->id_utilisateur,
            'userEmail' => $cmd->utilisateur->email,
            'userName' => $cmd->utilisateur->nom . ' ' . $cmd->utilisateur->prenom,
            'total' => (float) $cmd->montant_total,
            'status' => $cmd->statut,
            'createdAt' => $cmd->date_commande,
            'typeService' => $cmd->type_service,
            'arrivalTime' => $cmd->heure_arrivee,
            'orderNumber' => $cmd->numero_commande,
            'items' => $cmd->lignes->map(function ($line) {
                return [
                    'menuItem' => [
                        'id' => (string) $line->article->id_article,
                        'name' => $line->article->nom,
                        'description' => $line->article->description,
                        'price' => (float) $line->article->prix,
                        'category' => $line->article->id_categorie,
                        'image' => $line->article->image_url,
                        'popular' => $line->article->est_promotion,
                        'available' => $line->article->disponible,
                        'stock' => $line->article->stock_disponible,
                    ],
                    'quantity' => $line->quantite,
                    'subtotal' => (float) $line->sous_total,
                    'comment' => $line->commentaire_article,
                ];
            }),
        ];
    });

    return response()->json($result, 200);
}
}
