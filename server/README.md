# AI Resume Generator - Backend Server (Core PHP MVC)

A lightweight, enterprise-grade Core PHP (no frameworks) backend architecture powering the AI Resume Generator application.

## Directory Structure & MVC Architecture

```text
server/
├── app/
│   ├── config/
│   │   ├── Database.php          # Database PDO connection & diagnostic utilities
│   │   └── Gemini.php            # Gemini API credentials & model configuration
│   ├── models/
│   │   └── Resume.php            # Resume metadata model (Prepared statement queries)
│   ├── controllers/
│   │   ├── ResumeController.php  # Metadata REST CRUD endpoints
│   │   └── AIController.php      # Google Gemini AI generation endpoint
│   ├── services/
│   │   └── GeminiService.php     # cURL client, prompt construction, anti-hallucination rules
│   ├── routes/
│   │   └── api.php               # Route registry & URI dispatcher
│   ├── middleware/
│   │   └── CorsMiddleware.php    # CORS header handler & preflight OPTIONS responder
│   └── utils/
│       ├── Env.php               # Native .env loader
│       ├── Response.php          # Standardized JSON response helper
│       └── Validator.php         # Request validation & payload decoders
├── database/
│   └── schema.sql                # MySQL table creation schema (`generated_resumes`)
├── public/
│   ├── .htaccess                 # Apache rewrite configuration to index.php
│   └── index.php                 # Core entry point & autoloader
├── .env.example                  # Environment configuration template
├── .gitignore                    # Secrets & logs ignore rules
└── README.md                     # Backend documentation
```

## System Requirements
- PHP 8.1+ (PHP 8.2 installed via XAMPP)
- PHP Extensions enabled: `pdo`, `pdo_mysql`, `curl`, `json`, `mbstring`
- MySQL / MariaDB (via XAMPP)
- Apache (via XAMPP) or PHP Built-in Server

## REST API Endpoints

| Method | Endpoint | Description | Request Body | Response Status |
|--------|----------|-------------|--------------|-----------------|
| `GET` | `/api/health` | Diagnostics & DB status | None | `200 OK` |
| `GET` | `/api/resumes` | List generated resume records | Query: `?limit=50&offset=0` | `200 OK` |
| `GET` | `/api/resumes/{id}` | Retrieve specific metadata record | None | `200 OK` / `404` |
| `POST`| `/api/resumes` | Store PDF export metadata in MySQL | `{ file_name, file_size, template_name }` | `201 Created` / `422` |
| `DELETE`| `/api/resumes/{id}` | Delete a metadata record | None | `200 OK` / `404` |
| `POST`| `/api/ai/generate-resume` | Generate ATS-ready resume with Gemini | Candidate JSON payload | `200 OK` / `422` / `500` |

## How to Run

### Option 1: Via XAMPP Apache
1. Open **XAMPP Control Panel**.
2. Start **Apache** and **MySQL**.
3. Access: `http://localhost/myResumeIsCooked/server/public/api/health`

### Option 2: Via PHP Built-in Server (Fast CLI)
Run from the repository root:
```powershell
C:\xampp\php\php.exe -S 127.0.0.1:8000 -t server/public
```
Access: `http://127.0.0.1:8000/api/health`
