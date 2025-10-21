<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middlewareGroups = [
    'web' => [
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \App\Http\Middleware\UserPreferences::class,  // <--- add here
        // ...
    ],
    ];
    /**
     * Route middleware.
     */
    protected $routeMiddleware = [
        'auth.jwt' => \App\Http\Middleware\AuthMiddleware::class, // JWT
        'role' => \App\Http\Middleware\RoleMiddleware::class,      // Role check
        'auth.role' => \App\Http\Middleware\RoleMiddleware::class, // Optional combined
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
}
