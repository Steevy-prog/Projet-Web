<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user(); // Retrieves the authenticated user from JWT or session

        // Case 1: No user logged in
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Case 2: No matching role
        $userRole = optional($user->role)->nom_role; // safer (avoid null errors)
        if (!$userRole || !in_array($userRole, $roles)) {
            return response()->json(['message' => 'Unauthorized - Insufficient permissions'], 403);
        }

        return $next($request);
    }
}
