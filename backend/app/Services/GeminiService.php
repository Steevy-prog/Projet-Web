<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }

    /**
     * Génère des recommandations basées sur l'historique des commandes
     */
    public function generateRecommendations(int $userId, array $orderHistory): array
    {
        // Si pas d'historique, retourner des recommandations par défaut
        if (empty($orderHistory)) {
            return $this->getDefaultRecommendations();
        }

        $prompt = $this->buildPrompt($userId, $orderHistory);

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->apiUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 1000,
                ]
            ]);

            if ($response->successful()) {
                return $this->parseResponse($response->json());
            } else {
                Log::error('Erreur API Gemini: ' . $response->body());
                return $this->getDefaultRecommendations();
            }
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'appel à l\'API Gemini: ' . $e->getMessage());
            return $this->getDefaultRecommendations();
        }
    }

    private function buildPrompt(int $userId, array $orderHistory): string
    {
        $historyText = '';
        foreach ($orderHistory as $item) {
            $historyText .= "- {$item['nom']} (quantité: {$item['quantite']})";
            if (!empty($item['description'])) {
                $historyText .= " - {$item['description']}";
            }
            $historyText .= "\n";
        }

        return "Tu es un assistant de recommandation pour un restaurant.
Voici l'historique des commandes récentes d'un client :\n\n" .
               $historyText . "\n" .
               "Basé sur cet historique, recommande 5 plats ou menus qui pourraient plaire à ce client.
Réponds UNIQUEMENT avec une liste numérotée de 5 recommandations, sans introduction ni conclusion.
Format attendu :
1. Nom du plat - Courte description
2. Nom du plat - Courte description
etc.";
    }

    private function parseResponse(array $response): array
    {
        $recommendations = [];

        try {
            if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
                $text = $response['candidates'][0]['content']['parts'][0]['text'];

                // Extraire les lignes numérotées
                $lines = explode("\n", $text);
                foreach ($lines as $line) {
                    // Chercher les lignes qui commencent par un numéro
                    if (preg_match('/^\s*\d+[\.\)]\s*(.+)/', $line, $matches)) {
                        $recommendations[] = trim($matches[1]);
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error('Erreur lors du parsing de la réponse Gemini: ' . $e->getMessage());
        }

        // Si pas de recommandations extraites, utiliser les recommandations par défaut
        if (empty($recommendations)) {
            return $this->getDefaultRecommendations();
        }

        return array_slice($recommendations, 0, 5); // Limite à 5 recommandations max
    }

    private function getDefaultRecommendations(): array
    {
        return [
            "Pizza Margherita - Un classique italien avec mozzarella et basilic frais",
            "Burger Gourmet - Steak haché, cheddar, bacon et sauce maison",
            "Salade César - Poulet grillé, parmesan et croûtons croustillants",
            "Pâtes Carbonara - Crème, lardons et parmesan",
            "Tiramisu - Dessert italien traditionnel au café"
        ];
    }
}
