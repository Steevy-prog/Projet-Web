# ---- Base Image ----
FROM php:8.4-fpm


# Install PostgreSQL PDO extension
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo_pgsql

    
# ---- System Dependencies ----
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libpq-dev && \
    docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# ---- Composer ----
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# ---- Working Directory ----
WORKDIR /var/www

# ---- Copy Project Files ----
COPY . .

# ---- Install Dependencies ----
RUN composer install --no-dev --optimize-autoloader

# ---- Permissions ----
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# ---- Expose Port & Start ----
EXPOSE 9000
CMD ["php-fpm"]
