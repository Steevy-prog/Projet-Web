<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commentaire;

/**
 *
 * @OA\Tag(
 *     name="Commentaire",
 *     description="API Endpoints for Commentaire Management"
 * )
 *
 * @OA\Schema(
 *     schema="Commentaire",
 *     type="object",
 *     required={"id_commande","contenu"},
 *     @OA\Property(property="id_commentaire", type="integer", example=1),
 *     @OA\Property(property="id_commande", type="integer", example=1),
 *     @OA\Property(property="contenu", type="string", example="Très bon service"),
 *     @OA\Property(property="note", type="integer", example=5),
 *     @OA\Property(property="date_commentaire", type="string", format="date-time", example="2025-10-20T12:00:00Z"),
 *     @OA\Property(property="est_visible", type="boolean", example=true)
 * )
 */

class CommController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/commentaires",
     *     summary="Get all comments",
     *     description="Returns a list of all comments",
     *     tags={"Commentaires"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Commentaire")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No commentaire found")
     * )
     */
    public function index()
    {
        $comments = Commentaire::all();
        if($comments->isEmpty()){
            return response()->json(['message' => 'No comments found'], 404);
        }
        return response()->json($comments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

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
        try{
            Commentaire::create([
            'id_commande' => 1,
            'contenu' => 'Bon produit',
            'note' => 5,
            'est_visible' => true
        ]);
            return response()->json(['message' => 'Comment created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating comment'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Commentaire::find($id);
        if($comment){
            $comment->update($request->all());
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Commentaire::find($id);
        if($comment){
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully']);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }
}
