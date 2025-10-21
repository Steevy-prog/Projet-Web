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

<<<<<<< HEAD

Route::get('/auth/google/redirect', [OAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [OAuthController::class, 'handleGoogleCallback'])->middleware('web', StartSession::class);

Route::get('/auth/facebook/redirect', [OAuthController::class, 'redirectToFacebook']);
Route::get('/auth/facebook/callback', [OAuthController::class, 'handleFacebookCallback']);
=======
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
>>>>>>> parent of a5a5a5d8 (...Feat OAuth 2.0 for google ig and facebook auth)

require __DIR__.'/auth.php';
