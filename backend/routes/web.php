<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
<<<<<<< HEAD
use App\Http\Controllers\OAuthController;
use Illuminate\Session\Middleware\StartSession;
=======
>>>>>>> parent of a5a5a5d8 (...Feat OAuth 2.0 for google ig and facebook auth)

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/auth/google/redirect', [OAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [OAuthController::class, 'handleGoogleCallback'])->middleware('web', StartSession::class);

Route::get('/auth/facebook/redirect', [OAuthController::class, 'redirectToFacebook']);
Route::get('/auth/facebook/callback', [OAuthController::class, 'handleFacebookCallback']);

require __DIR__.'/auth.php';
