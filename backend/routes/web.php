<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OAuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/auth/google/redirect', [OAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [OAuthController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';
