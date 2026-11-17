<?php

namespace App\Utils;

class Response
{
    /**
     * Send a standardized JSON response.
     *
     * @param mixed $data
     * @param int $statusCode
     * @param string $message
     * @return void
     */
    public static function json($data = null, int $statusCode = 200, string $message = ''): void
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=UTF-8');

        $isSuccess = $statusCode >= 200 && $statusCode < 300;

        $payload = [
            'success' => $isSuccess,
            'message' => $message,
            'data'    => $data,
        ];

        echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send a standardized error JSON response.
     *
     * @param string $message
     * @param int $statusCode
     * @param mixed $data
     * @return void
     */
    public static function error(string $message, int $statusCode = 400, $data = null): void
    {
        self::json($data, $statusCode, $message);
    }
}
