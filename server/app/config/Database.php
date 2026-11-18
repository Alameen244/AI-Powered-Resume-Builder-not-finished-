<?php

namespace App\Config;

use App\Utils\Env;
use PDO;
use PDOException;

class Database
{
    private static ?PDO $connection = null;

    /**
     * Get or create the singleton PDO connection.
     *
     * @return PDO
     * @throws PDOException
     */
    public static function getConnection(): PDO
    {
        if (self::$connection === null) {
            $host   = Env::get('DB_HOST', 'localhost');
            $port   = Env::get('DB_PORT', '3306');
            $dbName = Env::get('DB_NAME', 'ai_resume_builder');
            $user   = Env::get('DB_USER', 'root');
            $pass   = Env::get('DB_PASS', '');

            $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            // Enable SSL for cloud MySQL providers (Aiven, TiDB Cloud, Railway, etc.) if requested
            $sslEnabled = filter_var(Env::get('DB_SSL', false), FILTER_VALIDATE_BOOLEAN);
            if ($sslEnabled && defined('PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT')) {
                $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
            }

            try {
                self::$connection = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                throw new PDOException("Database connection error: Unable to connect to MySQL server.");
            }
        }

        return self::$connection;
    }

    /**
     * Test database connectivity and return diagnostic information.
     *
     * @return array
     */
    public static function testConnection(): array
    {
        try {
            $pdo = self::getConnection();
            $serverVersion = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
            $driverName = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);

            return [
                'connected'      => true,
                'driver'         => $driverName,
                'server_version' => $serverVersion,
                'database'       => Env::get('DB_NAME', 'ai_resume_builder'),
            ];
        } catch (PDOException $e) {
            return [
                'connected' => false,
                'error'     => $e->getMessage(),
            ];
        }
    }
}
