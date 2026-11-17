-- ========================================================
-- AI Resume Generator - Database Schema
-- Database: ai_resume_builder
-- ========================================================

CREATE DATABASE IF NOT EXISTS `ai_resume_builder`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `ai_resume_builder`;

-- --------------------------------------------------------
-- Table: generated_resumes
-- Scope: PDF metadata ONLY (No PII, contact info, or resume content)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `generated_resumes` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `file_name` VARCHAR(255) NOT NULL COMMENT 'Generated PDF filename, e.g. John_Doe_Resume.pdf',
    `file_size` INT UNSIGNED NOT NULL COMMENT 'Calculated file size in bytes',
    `template_name` VARCHAR(100) NOT NULL COMMENT 'Template identifier (e.g. creative, developer, systems)',
    `generation_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the PDF was generated and downloaded',
    INDEX `idx_generation_timestamp` (`generation_timestamp` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
