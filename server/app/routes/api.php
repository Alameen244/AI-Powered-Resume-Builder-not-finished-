<?php

namespace App\Routes;

use App\Controllers\AIController;
use App\Controllers\ResumeController;
use App\Utils\Response;

class Router
{
    private array $routes = [];

    /**
     * Register a GET route.
     */
    public function get(string $path, callable|array $handler): void
    {
        $this->addRoute('GET', $path, $handler);
    }

    /**
     * Register a POST route.
     */
    public function post(string $path, callable|array $handler): void
    {
        $this->addRoute('POST', $path, $handler);
    }

    /**
     * Register a DELETE route.
     */
    public function delete(string $path, callable|array $handler): void
    {
        $this->addRoute('DELETE', $path, $handler);
    }

    /**
     * Add route to registry.
     */
    private function addRoute(string $method, string $path, callable|array $handler): void
    {
        $this->routes[] = [
            'method'  => strtoupper($method),
            'pattern' => $this->convertPathToRegex($path),
            'handler' => $handler,
        ];
    }

    /**
     * Convert URI pattern like /api/resumes/{id} to a regular expression.
     */
    private function convertPathToRegex(string $path): string
    {
        $regex = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $path);
        return '#^' . $regex . '$#';
    }

    /**
     * Dispatch the current HTTP request.
     */
    public function dispatch(string $method, string $uri): void
    {
        $method = strtoupper($method);

        // Normalize URI: strip query string and trailing slashes
        $cleanUri = parse_url($uri, PHP_URL_PATH) ?? '/';
        $cleanUri = rtrim($cleanUri, '/');
        if ($cleanUri === '') {
            $cleanUri = '/';
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            if (preg_match($route['pattern'], $cleanUri, $matches)) {
                // Filter named parameters
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                if (is_callable($route['handler'])) {
                    call_user_func($route['handler'], $params);
                    return;
                }

                if (is_array($route['handler']) && count($route['handler']) === 2) {
                    [$class, $action] = $route['handler'];
                    if (class_exists($class)) {
                        $instance = new $class();
                        if (method_exists($instance, $action)) {
                            $instance->$action($params);
                            return;
                        }
                    }
                }
            }
        }

        // Route not found
        Response::error("Endpoint not found: {$method} {$cleanUri}", 404);
    }
}

/**
 * Configure all application routes.
 */
function registerRoutes(Router $router): void
{
    // Health and environment status route
    $router->get('/api/health', function () {
        $dbStatus = \App\Config\Database::testConnection();

        Response::json([
            'status'     => 'healthy',
            'timestamp'  => date('c'),
            'php_version'=> PHP_VERSION,
            'extensions' => [
                'pdo'       => extension_loaded('pdo'),
                'pdo_mysql' => extension_loaded('pdo_mysql'),
                'curl'      => extension_loaded('curl'),
                'json'      => extension_loaded('json'),
            ],
            'database'   => $dbStatus,
            'server'     => 'AI Resume Generator Backend (MVC)',
        ], 200, 'API service is running');
    });

    // Root API greeting
    $router->get('/api', function () {
        Response::json([
            'name'        => 'AI Resume Generator REST API',
            'version'     => '1.0.0',
            'health_check'=> '/api/health',
            'endpoints'   => [
                'GET /api/health'             => 'System diagnostics and health check',
                'GET /api/resumes'            => 'List all generated resume metadata records',
                'GET /api/resumes/{id}'       => 'Get a specific resume metadata record',
                'POST /api/resumes'           => 'Store PDF metadata',
                'DELETE /api/resumes/{id}'    => 'Delete a resume metadata record',
                'POST /api/ai/generate-resume'=> 'Generate structured resume with Google Gemini',
            ],
        ], 200, 'Welcome to the AI Resume Generator API');
    });

    // Resume metadata CRUD routes
    $router->get('/api/resumes', [ResumeController::class, 'index']);
    $router->get('/api/resumes/{id}', [ResumeController::class, 'show']);
    $router->post('/api/resumes', [ResumeController::class, 'store']);
    $router->delete('/api/resumes/{id}', [ResumeController::class, 'destroy']);

    // Gemini AI resume generation route
    $router->post('/api/ai/generate-resume', [AIController::class, 'generateResume']);
}
