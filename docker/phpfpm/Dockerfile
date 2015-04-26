# Pull base image.
FROM ubuntu:14.04

# Install PHP.
RUN apt-get update && apt-get install -y php5-fpm php5-cli
# PHP additional config.
# PHP Timezone
RUN sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php5/cli/php.ini
RUN sed -i "s/;date.timezone =.*/date.timezone = UTC/" /etc/php5/fpm/php.ini
# PHP Memory Limit
RUN echo 'memory_limit = 256M' > /etc/php5/cli/php.ini
RUN echo 'memory_limit = 256M' > /etc/php5/fpm/php.ini

# PHP-FPM customization
RUN sed -i "s/listen = \/var\/run\/php5-fpm\.sock/listen = 0.0.0.0:9000/" /etc/php5/fpm/pool.d/www.conf

# Define default command.
CMD ["php5-fpm", "--nodaemonize", "--allow-to-run-as-root"]

# Expose ports.
#   - 9000: PHP-FPM
EXPOSE 9000
