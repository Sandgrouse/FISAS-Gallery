<?php

namespace App\Http\Middleware;

use Closure;

class ForceSSL
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->secure() && in_array(env('APP_ENV'), ['stage', 'production'])) {
            $request->setTrustedProxies( [ $request->getClientIp() ] );
            // return redirect()->secure($request->getRequestUri());
            return redirect()->secure($request->server('HTTP_X_FORWARDED_PROTO') != 'https');
        }

        return $next($request);
    }
}