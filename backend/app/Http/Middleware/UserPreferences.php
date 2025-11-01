<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class UserPreferences
{
    public function handle(Request $request, Closure $next)
    {
        // Read cookies or set default values
        $theme = $request->cookie('theme', 'light');       // default 'light'
        $language = $request->cookie('language', 'en');    // default 'en'

        return $next($request);
    }
    public function setEncryptedCookie()
{
    $minutes = 60 * 24 * 365; // 1 year
    $themeCookie = cookie('theme', 'dark', $minutes, '/', null, false, true);
    $languageCookie = cookie('language', 'en', $minutes, '/', null, false, true);
    // Last true = HttpOnly, cookie will also be encrypted automatically

    return response('Encrypted cookie set')->cookie($themeCookie,$languageCookie);
}

public function getEncryptedCookie(Request $request)
{
    $theme = $request->cookie('theme'); // decrypted automatically
    return response()->json(['theme' => $theme]);
}

    public function updatePreferences(Request $request)
    {
    $theme = $request->input('theme', 'light');
    $language = $request->input('language', 'en');

    $minutes = 60 * 24 * 365 * 5; // 5 years
    return response('Preferences saved')
        ->cookie('theme', $theme, $minutes)
        ->cookie('language', $language, $minutes);
    }
}
