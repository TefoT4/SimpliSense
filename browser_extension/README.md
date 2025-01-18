# SimpliSense Chrome Extension

A Chrome extension built with React, TypeScript, and Tailwind CSS.

## Getting Started

1. `npm i` to install dependencies
2. Create necessary configuration files:

   ```bash
   npx tailwindcss init
   ```

3. Create `postcss.config.js` in the root directory
4. Create `src/styles/global.css` for Tailwind imports
5. `npm start` to start the Webpack build process that bundles files into the `dist` folder
6. `npm i --save-dev <package_name>` to install new packages

## Required Configuration Files

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## Loading The Chrome Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle on `Developer mode` in the top right corner
3. Click `Load unpacked`
4. Select the entire `dist` folder

## Project Structure

```text
src/
├── background/
├── contentScript/
├── options/
├── popup/
├── static/
└── styles/
    └── global.css
```

## Development Notes

- Tailwind CSS utility classes can be used directly in your React components

- Folders get flattened in the build process

- Static references to images from HTML do not need to be relative `(i.e. icon.png` instead of `../static/icon.png`)

- Importing local ts/tsx/css files should be relative, as Webpack builds a dependency graph using these paths

- Update the manifest file for Chrome-related permissions; references to files should be flattened and not relative

## Production Build

1. `npm run build` to generate a minimized production build in the dist folder
2. ZIP the entire `dist` folder (e.g. `dist.zip`)
3. Publish the ZIP file on the Chrome Web Store Developer Dashboard

## Troubleshooting

If you encounter OpenSSL-related errors with Node.js v20+, the scripts in package.json already include the necessary OpenSSL legacy provider flag. If you still experience issues, try:

```bash
# For Windows Command Prompt
set NODE_OPTIONS=--openssl-legacy-provider

# For PowerShell
$env:NODE_OPTIONS='--openssl-legacy-provider'
```

## Technologies Used

- React 17

- TypeScript

- Tailwind CSS

- Webpack 5 ⌛️

- PostCSS
