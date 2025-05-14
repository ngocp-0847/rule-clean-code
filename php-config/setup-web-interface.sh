#!/bin/bash

# Setup PHP-FPM for better performance when using PHP_CodeSniffer in a web environment
# This script is optional but recommended for production environments

echo "Setting up PHP-FPM for better CodeSniffer performance..."

# Install PHP-FPM if not already installed
sudo apt update
sudo apt install -y php8.1-fpm nginx

# Configure PHP-FPM
sudo cp /etc/php/8.1/fpm/pool.d/www.conf /etc/php/8.1/fpm/pool.d/www.conf.backup
sudo bash -c 'cat > /etc/php/8.1/fpm/pool.d/codesniff.conf << EOL
[codesniff]
user = www-data
group = www-data
listen = /run/php/php8.1-fpm-codesniff.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 10
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 3
php_admin_value[memory_limit] = 256M
EOL'

# Create Nginx configuration for web access
sudo bash -c 'cat > /etc/nginx/sites-available/codesniff << EOL
server {
    listen 80;
    server_name codesniff.local;
    
    root /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/web;
    
    index index.php;
    
    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm-codesniff.sock;
    }
}
EOL'

# Create web directory and simple interface
mkdir -p /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/web
cat > /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/web/index.php << EOL
<?php
if (isset(\$_FILES['file']) && \$_FILES['file']['error'] === UPLOAD_ERR_OK) {
    \$tmpFile = \$_FILES['file']['tmp_name'];
    \$output = null;
    \$return = null;
    exec("phpcs --standard=php-config " . escapeshellarg(\$tmpFile) . " 2>&1", \$output, \$return);
    echo "<h1>PHP CodeSniffer Results</h1>";
    echo "<pre>" . htmlspecialchars(implode("\n", \$output)) . "</pre>";
} else {
?>
<!DOCTYPE html>
<html>
<head>
    <title>PHP CodeSniffer Web Interface</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; }
        input[type="file"] { display: block; }
        button { background: #4CAF50; color: white; padding: 10px 15px; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>PHP CodeSniffer Web Interface</h1>
        <form method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="file">Select PHP file to check:</label>
                <input type="file" name="file" id="file" accept=".php">
            </div>
            <button type="submit">Check Code</button>
        </form>
    </div>
</body>
</html>
<?php } ?>
EOL

# Set permissions
sudo chown -R www-data:www-data /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/web

# Enable and restart services
sudo ln -sf /etc/nginx/sites-available/codesniff /etc/nginx/sites-enabled/
sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx

echo "Add the following line to your /etc/hosts file:"
echo "127.0.0.1 codesniff.local"
echo ""
echo "Then access the web interface at: http://codesniff.local"
