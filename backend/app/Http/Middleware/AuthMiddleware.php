<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    public function handle($request, Closure $next): Response
    {
try {
    $user = JWTAuth::parseToken()->authenticate();
} catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
    return response()->json(['message' => 'Token expired'], 401);
} catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
    return response()->json(['message' => 'Token invalid'], 401);
} catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
    return response()->json(['message' => 'Token missing'], 401);
}

        if (!$user) {
            return response()->json(['message' => 'Unauthorized and this time it is real'], 401);
        }

        // ✅ User is authenticated — continue
        return $next($request);
    }
}
