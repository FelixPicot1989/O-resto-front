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

## Formatter configuration (ESLint, Prettier)

```bash
npm install --save-dev eslint eslint-plugin-react eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react-hooks prettier eslint-config-prettier eslint-plugin-prettier
```

then you need to creat 2 files at your root :

<details>
  <summary>.prettierrc</summary>
    <pre>
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true,
    "printWidth": 120
}
</pre>
</details>

<details>
  <summary>.eslintrc.cjs</summary>
      <pre>
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        printWidth: 120,
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
</pre>

</details>

## Installed librairies for our project

```bash
scss/sass : npm add -D sass
react-icons : npm install react-icons --save
react-responsive-carousel : npm i react-responsive-carousel
```

## Launch Vite server

```bash
npm run dev
```

---

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
