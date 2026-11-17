<?php

namespace App\Controllers;

use App\Services\GeminiService;
use App\Utils\Response;
use App\Utils\Validator;
use Throwable;

class AIController
{
    /**
     * Generate polished, structured resume content using Google Gemini.
     * POST /api/ai/generate-resume
     */
    public function generateResume(): void
    {
        try {
            $body = Validator::getJsonBody();
            if ($body === null || empty($body)) {
                Response::error('Empty or invalid JSON payload provided.', 400);
                return;
            }

            // Validate personal info presence
            if (empty($body['personal']) || !is_array($body['personal'])) {
                Response::error("Candidate 'personal' information object is required.", 422);
                return;
            }

            $personalErrors = Validator::validateRequired($body['personal'], ['fullName', 'email', 'phone', 'location']);
            if (!empty($personalErrors)) {
                Response::error('Personal information validation failed: ' . implode(' ', $personalErrors), 422);
                return;
            }

            // Validate at least one education entry
            if (empty($body['education']) || !is_array($body['education'])) {
                Response::error('At least one education entry is required.', 422);
                return;
            }

            // Validate technical skills
            if (empty($body['skills']['technical'])) {
                Response::error('Technical skills are required.', 422);
                return;
            }

            // Invoke Gemini Service
            $generatedResume = GeminiService::generateResume($body);

            Response::json($generatedResume, 200, 'Resume generated successfully with Gemini AI');
        } catch (Throwable $e) {
            error_log('AIController Error: ' . $e->getMessage());
            Response::error($e->getMessage(), 500);
        }
    }
}
