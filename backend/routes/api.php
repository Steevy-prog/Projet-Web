<?php
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Controllers\MessageController;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\EvenController;
use App\Http\Controllers\LigneComController;
use App\Http\Controllers\LivController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\ParrainController;
use App\Http\Controllers\PartiController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\OAuthController;
use Illuminate\Session\Middleware\StartSession;
use App\Http\Controllers\ReclamController;
use App\Http\Controllers\StaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UtilisateurController;
use App\Models\Utilisateur;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/promotions', [PromoController::class, 'index']);
Route::get('/auth/google/redirect', [OAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [OAuthController::class, 'handleGoogleCallback'])->middleware('web', StartSession::class);
Route::get('/me',[AuthController::class,'me']);


Route::middleware(['auth.jwt'])->group(function () {

    // Accessible to all authenticated users
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile/{id}', [UtilisateurController::class, 'update']);
    Route::get('employes/user',[EmployeController::class, 'indexcustomer']);
    Route::get('commandes/{userId}', [CommandeController::class, 'getUserOrders']);
    Route::post('commandes/keep', [CommandeController::class,'store']);
    Route::post('reclamations/keep', [ReclamController::class,'store']);
    Route::get('utilisateurs/lead', [UtilisateurController::class,'useruser']);
    Route::post('/create-checkout-session', [PaiementController::class, 'createCheckoutSession']);

    // Routes restricted to specific roles
    Route::middleware(['role:1'])->group(function () {
        // Etudiant routes
        Route::get('promotions',[PromoController::class, 'index']);
        Route::apiResource('cart', CartController::class);
        Route::get('messages/conversations', [MessageController::class, 'indexConversations']);

        // GET /api/messages/contact/{contactId}: Get messages for a specific contact
        Route::get('messages/contact/{contactId}', [MessageController::class, 'getMessagesByContactId']);

        // POST /api/messages: Send a new message
        Route::post('messages', [MessageController::class, 'store']);
    });

    Route::middleware(['role:2'])->group(function () {
        Route::get('messages/conversations', [MessageController::class, 'indexConversations']);
        // GET /api/messages/contact/{contactId}: Get messages for a specific contact
        Route::get('messages/contact/{contactId}', [MessageController::class, 'getMessagesByContactId']);
        // POST /api/messages: Send a new message
        Route::post('messages', [MessageController::class, 'store']);
    });

    Route::middleware(['role:3'])->group(function () {
        // Employee routes
        Route::get('messages/conversations', [MessageController::class, 'indexConversations']);
        // GET /api/messages/contact/{contactId}: Get messages for a specific contact
        Route::get('messages/contact/{contactId}', [MessageController::class, 'getMessagesByContactId']);
        Route::apiResource('commandes', CommandeController::class);

        // POST /api/messages: Send a new message
        Route::post('messages', [MessageController::class, 'store']);

    });
    Route::middleware(['role:2,3,4'])->group(function () {
        Route::apiResource('reclamations', ReclamController::class);
        Route::apiResource('commandes', CommandeController::class);
        Route::get('commandes/hebdomadaire',[CommandeController::class, 'weekly']);
    });

    Route::middleware(['role:2,3'])->group(function () {
        Route::get('users', [MessageController::class, 'getUsers']);
    });

    Route::middleware(['role:3,4'])->group(function () {

    });
    Route::middleware(['role:2,4'])->group(function () {
       Route::apiResource('employes', EmployeController::class);
       Route::apiResource('users',UtilisateurController::class);
       Route::apiResource('promotions' , PromoController::class);
    });


    Route::middleware(['role:4'])->group(function () {
        Route::get('messages/{userId}', [MessageController::class, 'getConversation']);
        Route::post('messages', [MessageController::class, 'store']);
       // Route::get('users', [MessageController::class, 'getUsers']);
    });

});
