<?php

namespace App\Models;

use App\Config\Database;
use PDO;
use PDOException;

class Resume
{
    /**
     * Create a new generated resume metadata record.
     *
     * @param array $data ['file_name' => string, 'file_size' => int, 'template_name' => string]
     * @return array|false The created record with generated ID and timestamp, or false on failure
     */
    public static function create(array $data): array|false
    {
        $pdo = Database::getConnection();

        $sql = "INSERT INTO generated_resumes (file_name, file_size, template_name) 
                VALUES (:file_name, :file_size, :template_name)";

        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute([
            ':file_name'     => $data['file_name'],
            ':file_size'     => (int)$data['file_size'],
            ':template_name' => $data['template_name'],
        ]);

        if (!$success) {
            return false;
        }

        $id = (int)$pdo->lastInsertId();
        return self::getById($id);
    }

    /**
     * Retrieve all generated resume metadata records ordered by latest first.
     *
     * @param int $limit
     * @param int $offset
     * @return array
     */
    public static function getAll(int $limit = 50, int $offset = 0): array
    {
        $pdo = Database::getConnection();

        $limit = max(1, min($limit, 100)); // Cap limit between 1 and 100
        $offset = max(0, $offset);

        $sql = "SELECT id, file_name, file_size, template_name, generation_timestamp 
                FROM generated_resumes 
                ORDER BY generation_timestamp DESC 
                LIMIT :limit OFFSET :offset";

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Retrieve a specific metadata record by its primary key ID.
     *
     * @param int $id
     * @return array|null
     */
    public static function getById(int $id): ?array
    {
        $pdo = Database::getConnection();

        $sql = "SELECT id, file_name, file_size, template_name, generation_timestamp 
                FROM generated_resumes 
                WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        return $record ?: null;
    }

    /**
     * Delete a metadata record by ID.
     *
     * @param int $id
     * @return bool
     */
    public static function delete(int $id): bool
    {
        $pdo = Database::getConnection();

        $sql = "DELETE FROM generated_resumes WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }
}
