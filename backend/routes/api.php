<?php
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;
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
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\ParrainController;
use App\Http\Controllers\PartiController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\ReclamController;
use App\Http\Controllers\StaController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UtilisateurController;




Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/promotions', [PromoController::class, 'index']);

Route::middleware(['auth.jwt'])->group(function () {

    // Accessible to all authenticated users
    Route::get('/profile', [UtilisateurController::class, 'showProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes restricted to specific roles
    Route::middleware(['role:1'])->group(function () {
        // Admin routes
        Route::apiResource('utilisateurs', UtilisateurController::class);
        Route::apiResource('employes', EmployeController::class);
    });

    Route::middleware(['role:2'])->group(function () {
        // Gerant routes
        Route::apiResource('commandes', CommandeController::class);
    });

    Route::middleware(['role:3'])->group(function () {
        // Employee routes
        Route::apiResource('reclamations', ReclamController::class);
    });
});
