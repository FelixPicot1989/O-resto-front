# Creation of the App

## Install of React App with ViteJS

```bash
npm create vite@latest
```

It will ask you the name for the folder's name project, what do you want to use between vanilla, vue, react... and between TypeScript or JavaScript.

Or you can do :
```bash
npm create vite@latest ./ -- --template react
```
to create it at the root and for React (it's faster to do it this way if you know what you want)

After you need to do

```bash
cd folder-project (if you install it with only npm create vite@latest)
npm install (to install the dependencies)
```

## Install SCSS librairies for ViteJS

```bash
npm add -D sass
```

To add the dependencies for scss and sass

## Launch Vite server

```bash
npm run dev
```

----

# Git

We decided to use Git Flow to manage the project

inside the git repositories :

```bash
git flow init
git flow feature start nameOfFeature
```

When feature is finished :

```bash
git flow feature finish nameOfFeature
```
