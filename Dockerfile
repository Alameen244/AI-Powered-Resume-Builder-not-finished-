# ========================================================
# AI Resume Generator - Production PHP 8.2 Dockerfile for Render
# (Root fallback for when Root Directory is left as default)
# ========================================================

FROM php:8.2-cli

# Install PDO MySQL driver
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /app

# Copy server files into container
COPY server/ /app

# Set default port for Render
ENV PORT=10000
EXPOSE 10000

# Start PHP built-in web server with public/index.php as router
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-10000} -t public public/index.php"]
