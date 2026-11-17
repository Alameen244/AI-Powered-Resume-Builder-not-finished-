<?php

namespace App\Controllers;

use App\Models\Resume;
use App\Utils\Response;
use App\Utils\Validator;
use Throwable;

class ResumeController
{
    /**
     * List all resume metadata records.
     * GET /api/resumes
     */
    public function index(): void
    {
        try {
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
            $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

            $resumes = Resume::getAll($limit, $offset);

            Response::json($resumes, 200, 'Resume records retrieved successfully');
        } catch (Throwable $e) {
            Response::error('Failed to retrieve resume records: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Show a single resume metadata record by ID.
     * GET /api/resumes/{id}
     */
    public function show(array $params): void
    {
        try {
            $id = isset($params['id']) ? (int)$params['id'] : 0;
            if ($id <= 0) {
                Response::error('Invalid resume ID specified', 400);
                return;
            }

            $resume = Resume::getById($id);
            if (!$resume) {
                Response::error("Resume record with ID {$id} not found", 404);
                return;
            }

            Response::json($resume, 200, 'Resume record retrieved successfully');
        } catch (Throwable $e) {
            Response::error('Failed to retrieve resume record: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Store new PDF metadata in database.
     * POST /api/resumes
     */
    public function store(): void
    {
        try {
            $body = Validator::getJsonBody();
            if ($body === null) {
                Response::error('Malformed JSON body. Please provide a valid JSON payload.', 400);
                return;
            }

            // Required fields validation
            $errors = Validator::validateRequired($body, ['file_name', 'file_size', 'template_name']);

            // Validate data types & lengths
            $sizeErr = Validator::validatePositiveInt($body, 'file_size', 1);
            if ($sizeErr) {
                $errors[] = $sizeErr;
            }

            $nameErr = Validator::validateMaxLength($body, 'file_name', 255);
            if ($nameErr) {
                $errors[] = $nameErr;
            }

            $tmplErr = Validator::validateMaxLength($body, 'template_name', 100);
            if ($tmplErr) {
                $errors[] = $tmplErr;
            }

            if (!empty($errors)) {
                Response::error(implode(' ', $errors), 422, ['validation_errors' => $errors]);
                return;
            }

            // Sanitize inputs
            $data = [
                'file_name'     => trim(strip_tags((string)$body['file_name'])),
                'file_size'     => (int)$body['file_size'],
                'template_name' => trim(strip_tags((string)$body['template_name'])),
            ];

            $created = Resume::create($data);
            if (!$created) {
                Response::error('Could not save resume metadata to database.', 500);
                return;
            }

            Response::json($created, 201, 'Resume metadata saved successfully');
        } catch (Throwable $e) {
            Response::error('Error saving resume metadata: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete a resume metadata record by ID.
     * DELETE /api/resumes/{id}
     */
    public function destroy(array $params): void
    {
        try {
            $id = isset($params['id']) ? (int)$params['id'] : 0;
            if ($id <= 0) {
                Response::error('Invalid resume ID specified', 400);
                return;
            }

            $deleted = Resume::delete($id);
            if (!$deleted) {
                Response::error("Resume record with ID {$id} not found or already deleted", 404);
                return;
            }

            Response::json(['id' => $id], 200, "Resume metadata record {$id} deleted successfully");
        } catch (Throwable $e) {
            Response::error('Failed to delete resume record: ' . $e->getMessage(), 500);
        }
    }
}
