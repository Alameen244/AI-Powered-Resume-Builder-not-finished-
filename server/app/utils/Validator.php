<?php

namespace App\Utils;

class Validator
{
    /**
     * Validate an associative array of input against required fields.
     *
     * @param array $data
     * @param array $requiredFields
     * @return array List of missing or empty field error messages
     */
    public static function validateRequired(array $data, array $requiredFields): array
    {
        $errors = [];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || (is_string($data[$field]) && trim($data[$field]) === '')) {
                $errors[] = "Field '{$field}' is required.";
            }
        }
        return $errors;
    }

    /**
     * Validate a field is a positive integer.
     *
     * @param array $data
     * @param string $field
     * @param int $min
     * @return string|null Error message or null if valid
     */
    public static function validatePositiveInt(array $data, string $field, int $min = 1): ?string
    {
        if (!isset($data[$field]) || !is_numeric($data[$field]) || (int)$data[$field] < $min) {
            return "Field '{$field}' must be a positive number greater than or equal to {$min}.";
        }
        return null;
    }

    /**
     * Validate string maximum length.
     *
     * @param array $data
     * @param string $field
     * @param int $maxLength
     * @return string|null Error message or null if valid
     */
    public static function validateMaxLength(array $data, string $field, int $maxLength): ?string
    {
        if (isset($data[$field]) && is_string($data[$field]) && mb_strlen($data[$field]) > $maxLength) {
            return "Field '{$field}' cannot exceed {$maxLength} characters.";
        }
        return null;
    }

    /**
     * Parse incoming JSON request body.
     *
     * @return array|null Parsed JSON as associative array, or null if invalid
     */
    public static function getJsonBody(): ?array
    {
        $input = file_get_contents('php://input');
        if (empty($input)) {
            return [];
        }

        $decoded = json_decode($input, true);
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
            return null;
        }

        return $decoded;
    }
}
