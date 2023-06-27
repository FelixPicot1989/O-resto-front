# How to install project on your local

Clone this repo :

```
git clone git@github.com:O-clock-Radium/projet-o-resto-front.git
```

Go on the folder `projet-o-resto-front`

Make sure you have at least node version 14 and run this to install dependencies :

```bash
npm install
```

To build the app, run this :

```bash
npm run build
```

and then a new folder "dist" are created, to see the build run this :

```bash
npm run preview
```

and clik on the link who display in your terminal. That's all.

**Or** you can upload the project to your server.
Don't forget to make DocumentRoot point to the folder "dist"

To change your Document Root on your sever run this:

```bash
sudo vi /etc/apache2/site-available/000-default.conf
```

**or**

```bash
sudo nano /etc/apache2/site-available/000-default.conf
```

in this file change the line where DocumentRoot are write.
Probably your DocumentRoot are like that : `/var/www/html`
Change that with de root of your repo, some thing like that:

```bash
{{ROOT-OF-YOUR-REPO}}/dist
```

Don't forget the `/dist`

And then save !

Restart apache2, run this :

```bash
sudo service apache2 restart
```

Go to your url

And it work !
