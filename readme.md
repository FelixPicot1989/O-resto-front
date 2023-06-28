# How to install project on your local

1. Create a new folder `oresto`

```back
mkdir /var/www/html/oresto
cd /var/www/html/oresto
```

2. Clone there repos :

```bash
git clone git@github.com:O-clock-Radium/projet-o-resto-front.git
git clone git@github.com:O-clock-Radium/projet-o-resto-back.git
```

3. Create Apache Configuration File
   Navigate to the /etc/apache2/sites-available directory:

```bash
cd /etc/apache2/sites-available
```

4. Create a new file called oresto.conf:

```bash
sudo vi oresto.conf
```

Add the following content to the file:

**Important: Make sure to replace {{YOUR-SERVER-NAME}} with your actual server name.**

```apache
<VirtualHost *:80>
    ServerName {{YOUR-SERVER-NAME}}-server.eddi.cloud
    DocumentRoot /var/www/html/oresto

    Alias /oresto /var/www/html/oresto/projet-o-resto-front/dist/
    <Directory /var/www/html/oresto/projet-o-resto-front/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /oresto
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^ . [L]
    </Directory>

    Alias /oresto-back /var/www/html/oresto/projet-o-resto-back/public
    <Directory /var/www/html/oresto/projet-o-resto-back/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

5. Enable the Apache Rewrite Module
   Run the following command to enable the rewrite module:

```bash
sudo a2enmod rewrite
```

6. Restart Apache
   Run the following command to restart Apache:

```bash
sudo service apache2 restart
```

7. Install and Build the Front-End Project
   Go to the front-end project directory and run the following commands:

```bash
npm install
npm run build
```

8. Access the Projects
   The front-end of your site is now accessible at the following URL:

```bash
http://{{YOUR-SERVER-NAME}}-server.eddi.cloud/oresto
```

And the back-end is accessible at:

```bash
http://{{YOUR-SERVER-NAME}}-server.eddi.cloud/oresto-back
```

9. Update the .env File
   In the .env file, update the VITE_BASE_URL_BACKOFFICE variable with the following value:

```bash
http://{{YOUR-SERVER-NAME}}-server.eddi.cloud/oresto-back
```

Similarly, update the VITE_BASE_URL variable with the following value:

```bash
http://{{YOUR-SERVER-NAME}}-server.eddi.cloud/oresto
```
