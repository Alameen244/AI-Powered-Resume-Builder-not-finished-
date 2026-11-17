<?php

namespace App\Services;

use App\Config\Gemini;
use RuntimeException;

class GeminiService
{
    /**
     * Generate structured, ATS-optimized resume content using Google Gemini.
     *
     * @param array $resumeData Candidate input data from React form
     * @return array Polished structured resume JSON
     * @throws RuntimeException
     */
    public static function generateResume(array $resumeData): array
    {
        if (!Gemini::hasApiKey()) {
            throw new RuntimeException(
                "Gemini API key is not configured. Please add your GEMINI_API_KEY in server/.env (Get one from https://aistudio.google.com/)."
            );
        }

        $config = Gemini::getConfig();
        $primaryModel = $config['model'];

        // Models to try in case of 503 high-demand spike
        $modelCandidates = array_unique([
            $primaryModel,
            'gemini-3.1-flash-lite',
            'gemini-3.5-flash-lite',
            'gemini-flash-latest',
        ]);

        $prompt = self::buildPrompt($resumeData);
        $payload = [
            'contents' => [
                [
                    'role'  => 'user',
                    'parts' => [
                        ['text' => $prompt],
                    ],
                ],
            ],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'temperature'      => 0.25,
            ],
        ];
        $payloadJson = json_encode($payload);

        $lastError = '';

        foreach ($modelCandidates as $model) {
            $url = Gemini::getEndpointUrl($model);

            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payloadJson);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);

            if ($response === false) {
                $lastError = "cURL Network Error: {$curlError}";
                continue;
            }

            $decodedResponse = json_decode($response, true);

            if ($httpCode === 200 && !empty($decodedResponse['candidates'][0]['content']['parts'][0]['text'])) {
                $rawText = $decodedResponse['candidates'][0]['content']['parts'][0]['text'];

                // Clean any possible markdown code block wrappers (```json ... ```)
                $cleanJson = trim($rawText);
                if (str_starts_with($cleanJson, '```')) {
                    $cleanJson = preg_replace('/^```(?:json)?\s*/i', '', $cleanJson);
                    $cleanJson = preg_replace('/\s*```$/', '', $cleanJson);
                }

                $resumeJson = json_decode($cleanJson, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($resumeJson)) {
                    self::validateOutputStructure($resumeJson, $resumeData);
                    return $resumeJson;
                }
            }

            // If 503 or 429, save error and try next model
            $errorMsg = $decodedResponse['error']['message'] ?? "HTTP {$httpCode}";
            $lastError = "Gemini API Error ({$httpCode}) on model {$model}: {$errorMsg}";
            if ($httpCode !== 503 && $httpCode !== 429 && $httpCode !== 404) {
                break;
            }
        }

        throw new RuntimeException($lastError ?: "Failed to generate resume with Gemini. Please try again.");
    }

    /**
     * Construct prompt enforcing strict anti-hallucination and ATS optimization rules.
     */
    private static function buildPrompt(array $data): string
    {
        $candidateJson = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $jobDescription = !empty($data['jobDescription']) ? trim($data['jobDescription']) : null;

        $targetJobDirective = $jobDescription
            ? "TARGET JOB DESCRIPTION:\n\"\"\"\n{$jobDescription}\n\"\"\"\nCarefully emphasize and align relevant skills, keywords, and phrasing with this target job."
            : "No specific job description was provided. Optimize generally for modern ATS parsers and technical hiring managers.";

        return <<<PROMPT
You are a Principal Resume Strategist, ATS Optimization Specialist, and Senior Technical Recruiter.
Your task is to transform the candidate's raw resume data into polished, structured, achievement-oriented, ATS-ready resume content.

{$targetJobDirective}

CANDIDATE RAW DATA (JSON):
```json
{$candidateJson}
```

CRITICAL ANTI-HALLUCINATION RULES (STRICT COMPLIANCE REQUIRED):
1. NEVER invent employers, job titles, institutions, degrees, or certifications that the candidate did not provide.
2. NEVER invent fake metrics, statistics, or measurable percentages if not stated or reasonably derived from provided context.
3. PRESERVE the candidate's actual qualifications, dates, and experience.
4. If a section is empty or was not provided, return an empty array or empty string for that section. Do not fabricate filler data.
5. Transform passive responsibilities into active, compelling bullet points using strong action verbs (e.g., "Engineered", "Optimized", "Spearheaded", "Architected", "Refactored").
6. Highlight relevant technical skills and keywords naturally throughout the bullets.

REQUIRED OUTPUT FORMAT:
You MUST respond with STRICTLY VALID JSON ONLY conforming to the schema below.

JSON SCHEMA:
{
  "personal": {
    "fullName": "Candidate full name",
    "email": "Candidate email",
    "phone": "Candidate phone",
    "location": "Candidate location",
    "linkedIn": "LinkedIn URL or empty",
    "portfolio": "Portfolio URL or empty",
    "github": "GitHub URL or empty"
  },
  "summary": "3-4 concise, impactful sentences highlighting candidate's core strengths, technical domain, and career goals.",
  "skills": {
    "technical": ["Array", "of", "individual", "cleanly", "categorized", "skills"],
    "soft": ["Array", "of", "soft", "skills"]
  },
  "experience": [
    {
      "id": "exp-1",
      "jobTitle": "Role Title",
      "company": "Company Name",
      "duration": "Duration string",
      "bullets": [
        "Strong action-verb bullet point 1 detailing what was built and impact",
        "Strong action-verb bullet point 2 detailing technologies and outcomes"
      ]
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "Degree name",
      "institution": "University / College name",
      "location": "Location or empty",
      "startYear": "Start year",
      "endYear": "End year",
      "grade": "Grade / CGPA or empty"
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "Project Name",
      "technologies": "Comma-separated or key tech stack",
      "description": "Concise high-level architecture overview",
      "bullets": [
        "Key technical achievement or implementation detail bullet 1",
        "Key technical achievement or implementation detail bullet 2"
      ],
      "url": "Project URL or empty"
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "Certification name",
      "issuer": "Issuing organization",
      "year": "Year"
    }
  ],
  "additional": {
    "achievements": "Formatted achievements or empty",
    "languages": "Formatted languages or empty",
    "extracurricular": "Formatted extracurricular or empty"
  }
}
PROMPT;
    }

    /**
     * Validate and fill fallback structures.
     */
    private static function validateOutputStructure(array &$json, array $originalData): void
    {
        // Preserve original personal contact info if AI altered any critical contact field
        if (empty($json['personal'])) {
            $json['personal'] = $originalData['personal'] ?? [];
        } else {
            foreach (['email', 'phone', 'location', 'linkedIn', 'portfolio', 'github'] as $field) {
                if (empty($json['personal'][$field]) && !empty($originalData['personal'][$field])) {
                    $json['personal'][$field] = $originalData['personal'][$field];
                }
            }
        }

        if (empty($json['summary'])) {
            $json['summary'] = $originalData['summary'] ?? '';
        }
        if (!isset($json['skills']) || !is_array($json['skills'])) {
            $json['skills'] = [
                'technical' => is_string($originalData['skills']['technical'] ?? '')
                    ? array_map('trim', explode(',', $originalData['skills']['technical']))
                    : [],
                'soft' => is_string($originalData['skills']['soft'] ?? '')
                    ? array_map('trim', explode(',', $originalData['skills']['soft']))
                    : [],
            ];
        }
        if (!isset($json['experience']) || !is_array($json['experience'])) {
            $json['experience'] = [];
        }
        if (!isset($json['education']) || !is_array($json['education'])) {
            $json['education'] = [];
        }
        if (!isset($json['projects']) || !is_array($json['projects'])) {
            $json['projects'] = [];
        }
    }
}
