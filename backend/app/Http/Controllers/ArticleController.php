<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Events\MenuUpdated;

/**
 *  * @OA\Tag(
 *     name="Articles",
 *     description="API Endpoints for Article Management"
 * )
 *
 * @OA\Schema(
 *     schema="Article",
 *     type="object",
 *     required={"nom","prix","id_categorie"},
 *     @OA\Property(property="id_article", type="integer", example=1),
 *     @OA\Property(property="nom", type="string", example="Café Latte"),
 *     @OA\Property(property="description", type="string", example="Délicieux café au lait"),
 *     @OA\Property(property="prix", type="number", example=2500),
 *     @OA\Property(property="category", type="object",
 *         @OA\Property(property="id_categorie", type="integer", example=1),
 *         @OA\Property(property="nom", type="string", example="Boissons")
 *     ),
 *     @OA\Property(property="disponible", type="boolean", example=true),
 *     @OA\Property(property="image", type="string", example="https://example.com/image.jpg"),
 *     @OA\Property(property="popular", type="boolean", example=false),
 *     @OA\Property(property="stock", type="integer", example=50),
 *     @OA\Property(property="date_creation", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="date_modification", type="string", format="date-time", example=null)
 * )
 */
class ArticleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/articles",
     *     summary="Get all articles with category info",
     *     description="Returns a list of all articles along with their categories",
     *     tags={"Articles"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Article")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No articles found")
     * )
     */
    public function index()
    {
        // Eager load the category relation
        $articles = Article::with('categorie')->get();

        // Map the response to match your frontend interface
        $response = $articles->map(function($article) {
            return [
                'id_article'   => $article->id_article,
                'nom'          => $article->nom,
                'description'  => $article->description,
                'prix'         => $article->prix,
                'category'     => $article->categorie->nom_categorie ?? null,
                'available'    => $article->disponible,
                'image'        => $article->image_url,
                'popular'      => $article->est_promotion,
                'stock'        => $article->stock_disponible,
                'date_creation'=> $article->date_creation,
                'date_modification'=> $article->date_modification,
            ];
        });

        return response()->json($response);
    }

    public function show(string $id)
    {
        $article = Article::with('categorie')->findOrFail($id);

        $response = [
            'id_article'   => $article->id_article,
            'nom'          => $article->nom,
            'description'  => $article->description,
            'prix'         => $article->prix,
            'category'     => $article->categorie->nom_categorie ?? null,
            'available'    => $article->disponible,
            'image'        => $article->image_url,
            'popular'      => $article->est_promotion,
            'stock'        => $article->stock_disponible,
            'date_creation'=> $article->date_creation,
            'date_modification'=> $article->date_modification,
        ];

        return response()->json($response);
    }
     public function store(Request $request)
    {
        $article = Article::create($request->all());
        broadcast(new MenuUpdated($article))->toOthers();
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        broadcast(new MenuUpdated($article))->toOthers();
        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        broadcast(new MenuUpdated($article))->toOthers();
        return response()->json(['message' => 'Article supprimé']);
    }

    public function toggleAvailability($id)
    {
        $article = Article::findOrFail($id);
        $article->disponible = !$article->disponible;
        $article->save();
        broadcast(new MenuUpdated($article))->toOthers();
        return response()->json($article);
    }
}

