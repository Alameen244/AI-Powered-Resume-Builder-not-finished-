<?php

declare(strict_types=1);

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Base paths
define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'app');

// Register custom autoloader for App\ namespace
spl_autoload_register(function (string $class) {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = APP_PATH . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

use App\Middleware\CorsMiddleware;
use App\Routes\Router;
use App\Utils\Env;
use App\Utils\Response;

// Load environment variables from server/.env if available
Env::load(BASE_PATH . DIRECTORY_SEPARATOR . '.env');

// Handle CORS headers and preflight requests
CorsMiddleware::handle();

// Include route definitions
require_once APP_PATH . DIRECTORY_SEPARATOR . 'routes' . DIRECTORY_SEPARATOR . 'api.php';

try {
    $router = new Router();
    \App\Routes\registerRoutes($router);

    // Extract request method and normalize path
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $rawUri = $_SERVER['REQUEST_URI'] ?? '/';

    // Parse URL path
    $parsedPath = parse_url($rawUri, PHP_URL_PATH) ?? '/';

    // Handle XAMPP subdirectory deployment (e.g., /myResumeIsCooked/server/public/api/...)
    // If the path contains '/api', extract starting from '/api'
    $apiPos = strpos($parsedPath, '/api');
    if ($apiPos !== false) {
        $uri = substr($parsedPath, $apiPos);
    } else {
        $uri = $parsedPath;
    }

    $router->dispatch($method, $uri);
} catch (Throwable $e) {
    Response::error('Internal Server Error: ' . $e->getMessage(), 500);
}
