<?php

namespace App\Middleware;

use App\Utils\Env;

class CorsMiddleware
{
    /**
     * Handle incoming CORS headers and OPTIONS preflight requests.
     */
    public static function handle(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        $allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'https://myresumeiscooked.vercel.app'
        ];

        // Custom origin configured in environment
        $configuredOrigins = Env::get('ALLOWED_ORIGINS', '');
        if (!empty($configuredOrigins)) {
            $configured = array_map('trim', explode(',', $configuredOrigins));
            $allowedOrigins = array_merge($allowedOrigins, $configured);
        }

        $allowAll = in_array('*', $allowedOrigins, true);
        $isVercelOrigin = !empty($origin) && preg_match('/^https:\/\/[a-z0-9-]+(\.vercel\.app|\.onrender\.com)$/i', $origin);
        $isExplicitlyAllowed = !empty($origin) && in_array($origin, $allowedOrigins, true);

        if ($allowAll) {
            header('Access-Control-Allow-Origin: *');
        } elseif ($isExplicitlyAllowed || $isVercelOrigin) {
            header("Access-Control-Allow-Origin: {$origin}");
            header('Access-Control-Allow-Credentials: true');
        } elseif (empty($origin)) {
            header('Access-Control-Allow-Origin: *');
        } else {
            header("Access-Control-Allow-Origin: {$origin}");
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
        header('Access-Control-Max-Age: 86400');

        // Handle preflight OPTIONS request
        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
