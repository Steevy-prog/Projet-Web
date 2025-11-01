<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Http\Request;


/**
 *
 * @OA\Tag(
 *     name="Paiement",
 *     description="API Endpoints for Paiement Management"
 * )
 *
 * @OA\Schema(
 *     schema="Paiement",
 *     type="object",
 *     required={"id_commande","montant"},
 *     @OA\Property(property="id_paiement", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="montant", type="number", example=5000),
 *     @OA\Property(property="methode_paiement", type="string", example="carte"),
 *     @OA\Property(property="date_paiement", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="statut_paiement", type="string", example="valide"),
 *     @OA\Property(property="transaction_id", type="string", example="TX123456"),
 *     @OA\Property(property="points_utilises", type="integer", example=50),
 *     @OA\Property(property="montant_points", type="number", example=500),
 *     @OA\Property(property="montant_especes", type="number", example=4500),
 *     @OA\Property(property="reference_paiement", type="string", example="REF123456")
 * )
 */

class PaiementController extends Controller
{
    private $stripe;

    public function __construct()
    {
        $this->stripe = new Stripe\StripeClient(env('STRIPE_SECRET'));
    }

    /**
     * @OA\Post(
     *     path="/api/create-checkout-session",
     *     summary="Créer une session de paiement Stripe",
     *     tags={"Paiement"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"montant", "id_commande"},
     *             @OA\Property(property="montant", type="number", example=5000),
     *             @OA\Property(property="id_commande", type="integer", example=1),
     *             @OA\Property(property="description", type="string", example="Paiement de la commande #1")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Session de paiement créée avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="url", type="string", example="https://checkout.stripe.com/pay/...")
     *         )
     *     )
     * )
     */
    public function createCheckoutSession(Request $request)
    {
        // Validation simplifiée sans vérifier l'existence de la commande
        $request->validate([
            'montant' => 'required|numeric|min:0.5',
            'description' => 'sometimes|string'
        ]);

        try {
            // Configuration de la clé API Stripe
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

            // Création de la session Stripe Checkout
            $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => $request->description ?? 'Commande restaurant',
                            'description' => 'Paiement de votre commande'
                        ],
                        'unit_amount' => intval($request->montant * 100), // Montant en centimes
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => env('FRONTEND_URL', 'http://localhost:5173') . '/?payment=success&session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => env('FRONTEND_URL', 'http://localhost:5173') . '/?payment=cancelled',
            ]);

            return response()->json([
                'url' => $session->url,
                'session_id' => $session->id
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur Stripe: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erreur lors de la création de la session de paiement',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
