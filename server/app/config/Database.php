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

            // Enable SSL for cloud MySQL providers (TiDB Cloud, Aiven, Railway, etc.)
            $isCloudHost  = str_contains($host, 'tidbcloud.com') || str_contains($host, 'aivencloud.com') || str_contains($host, 'rlwy.net');
            $sslRequested = filter_var(Env::get('DB_SSL', false), FILTER_VALIDATE_BOOLEAN) || $isCloudHost;

            if ($sslRequested) {
                $caBundle = Env::get('DB_SSL_CA');
                if (!$caBundle) {
                    $candidates = [
                        'C:\\xampp\\apache\\bin\\curl-ca-bundle.crt',
                        ini_get('openssl.cafile') ?: '',
                        ini_get('curl.cainfo') ?: '',
                        '/etc/ssl/certs/ca-certificates.crt',
                        '/etc/pki/tls/certs/ca-bundle.crt',
                        '/etc/ssl/cert.pem',
                    ];
                    foreach ($candidates as $cand) {
                        if (!empty($cand) && file_exists($cand)) {
                            $caBundle = $cand;
                            break;
                        }
                    }
                }

                if ($caBundle && defined('PDO::MYSQL_ATTR_SSL_CA')) {
                    $options[PDO::MYSQL_ATTR_SSL_CA] = $caBundle;
                }
                if (defined('PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT')) {
                    $options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
                }
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
