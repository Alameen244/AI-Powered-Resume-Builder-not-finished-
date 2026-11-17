<?php

namespace App\Config;

use App\Utils\Env;

class Gemini
{
    /**
     * Get Gemini API configuration.
     */
    public static function getConfig(): array
    {
        return [
            'api_key' => Env::get('GEMINI_API_KEY', ''),
            'model'   => Env::get('GEMINI_MODEL', 'gemini-3.1-flash-lite'),
        ];
    }

    /**
     * Check if Gemini API key is configured.
     */
    public static function hasApiKey(): bool
    {
        $key = Env::get('GEMINI_API_KEY', '');
        return !empty($key) && $key !== 'your_gemini_api_key_here';
    }

    /**
     * Build the Gemini generateContent API endpoint URL.
     */
    public static function getEndpointUrl(?string $modelOverride = null): string
    {
        $config = self::getConfig();
        $model = urlencode($modelOverride ?: $config['model']);
        $apiKey = $config['api_key'];
        return "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
    }
}
