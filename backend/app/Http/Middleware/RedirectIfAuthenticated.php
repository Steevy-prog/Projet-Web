<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @param  string|null $guard
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        // Check if user is authenticated using the given guard
        if (Auth::guard($guard)->check()) {
            // You can redirect to a dashboard or return a JSON message if it's an API
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Already authenticated'
                ], 403);
            }

            return redirect('/dashboard'); // redirect authenticated user
        }

        return $next($request);
    }
}
