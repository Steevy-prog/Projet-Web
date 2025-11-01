<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{

    // GET /api/cart
    public function index()
    {
        $user = JWTAuth::user();
        $cart = Cart::where('id_utilisateur', $user->id_utilisateur)
                    ->with('article')
                    ->get();
        return response()->json($cart);
    }

    // POST /api/cart
    public function add(Request $request)
    {
        $user = JWTAuth::user();
        $request->validate([
            'menuItemId' => 'required|exists:article,id_article',
            'quantity' => 'integer|min:1'
        ]);

        $articleId = $request->menuItemId;
        $quantity = $request->quantity ?? 1;

        $cartItem = Cart::firstOrNew([
            'id_utilisateur' => $user->id_utilisateur,
            'id_article' => $articleId
        ]);

        $cartItem->quantity += $quantity;
        $cartItem->save();

        return response()->json($cartItem);
    }

    // PATCH /api/cart/{id}
    public function update(Request $request, $id)
    {
        $user = JWTAuth::user();
        $request->validate(['quantity' => 'required|integer|min:0']);

        $cartItem = Cart::where('id_cart', $id)
                        ->where('id_utilisateur', $user->id_utilisateur)
                        ->firstOrFail();

        if ($request->quantity <= 0) {
            $cartItem->delete();
            return response()->json(['message' => 'Item removed from cart']);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json($cartItem);
    }

    // DELETE /api/cart/{id}
    public function remove($id)
    {
        $user = JWTAuth::user();

        $cartItem = Cart::where('id_cart', $id)
                        ->where('id_utilisateur', $user->id_utilisateur)
                        ->firstOrFail();

        $cartItem->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    // POST /api/cart/clear
    public function clear()
    {
        $user = Auth::user();
        Cart::where('id_utilisateur', $user->id_utilisateur)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}
