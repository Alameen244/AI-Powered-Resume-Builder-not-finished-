<?php

namespace App\Middleware;

class CorsMiddleware
{
    /**
     * Handle incoming CORS headers and OPTIONS preflight requests.
     */
    public static function handle(): void
    {
        $allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
        ];

        // Custom origin configured in environment
        if (!empty($_ENV['ALLOWED_ORIGINS'])) {
            $configured = array_map('trim', explode(',', $_ENV['ALLOWED_ORIGINS']));
            $allowedOrigins = array_merge($allowedOrigins, $configured);
        }

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, $allowedOrigins, true)) {
            header("Access-Control-Allow-Origin: {$origin}");
            header('Access-Control-Allow-Credentials: true');
        } else if (empty($origin)) {
            // Local same-origin or tools like cURL/Postman
            header('Access-Control-Allow-Origin: *');
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Max-Age: 86400');

        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}
