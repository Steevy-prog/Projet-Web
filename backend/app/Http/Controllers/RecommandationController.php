<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\LOG;
use Illuminate\Support\Facades\Auth;

class RecommandationController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
        $this->middleware('auth.jwt');
    }

    /**
     * @OA\Get(
     *     path="/api/recommendations",
     *     summary="Obtenir des recommandations personnalisées",
     *     tags={"Recommandations"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des recommandations",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="string")
     *         )
     *     )
     * )
     */
    public function getRecommendations(Request $request)
    {
        $user = Auth::user();
        $orderHistory = $this->getUserOrderHistory($user->id);

        $recommendations = $this->geminiService->generateRecommendations(
            $user->id,
            $orderHistory
        );

        return response()->json($recommendations);
    }

    private function getUserOrderHistory($userId): array
    {
        try {
            // Récupérer les commandes de l'utilisateur avec leurs articles
            $commandes = DB::table('commandes')
                ->where('id_utilisateur', $userId)
                ->where('statut_commande', '!=', 'annulee')
                ->orderBy('date_commande', 'desc')
                ->limit(10) // Les 10 dernières commandes
                ->get();

            $orderHistory = [];

            foreach ($commandes as $commande) {
                // Récupérer les articles de chaque commande
                $lignesCommande = DB::table('ligne_commandes')
                    ->join('articles', 'ligne_commandes.id_article', '=', 'articles.id_article')
                    ->where('ligne_commandes.id_commande', $commande->id_commande)
                    ->select('articles.nom_article', 'articles.description', 'ligne_commandes.quantite')
                    ->get();

                foreach ($lignesCommande as $ligne) {
                    $orderHistory[] = [
                        'nom' => $ligne->nom_article,
                        'description' => $ligne->description ?? '',
                        'quantite' => $ligne->quantite,
                        'date' => $commande->date_commande
                    ];
                }
            }

            return $orderHistory;
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération de l\'historique: ' . $e->getMessage());
            return [];
        }
    }
}
