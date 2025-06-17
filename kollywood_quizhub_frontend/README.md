# Kollywood QuizHub 🎬

Kollywood QuizHub is a modular, client-only React SPA for conducting quizzes about Kollywood (Tamil cinema), powered by TMDb API movie/actor data.

---

## 🚀 Features

- **User Authentication:** Login and register (local, no backend).
- **Quiz Interface:** Get matched on Kollywood movies and actors—questions are randomly generated from TMDb.
- **User Progress Tracking & History:** View quiz results and history per user.
- **Quiz Data Management:** Questions are built real-time from TMDb (no backend needed).
- **Navigation:** SPA experience, with routing and back button.
- **Admin Demo Panel:** See current TMDb movie/actor sample data.
- **Session Storage:** Progress/history is stored locally (works offline).
- **Theming:** Modern light mode, brand styling with Kollywood flavor.

---

## 🛠 TMDb API Integration (Kollywood QuizHub)

This app integrates with [The Movie Database (TMDb)](https://www.themoviedb.org/) API to fetch Kollywood (Tamil) movie data for quizzes. The utility code is in `src/tmdbApi.js`.

### 🔑 Setup your TMDb API Key

1. Copy `.env.example` to `.env` in the `kollywood_quizhub_frontend` directory.
2. Set `REACT_APP_TMDB_API_KEY=YOUR_TMDB_KEY` in your `.env` file.
   - The provided demo key for development is: `5bc67d3b06aecbd18121a3cbbc16eb59`
   - **IMPORTANT:** Environment variables in Create React App must be prefixed with `REACT_APP_` (e.g., `REACT_APP_TMDB_API_KEY`) and will only be available in JavaScript code after rebuilding the app (they are injected at build time). 
   - Do **NOT** use `PUBLIC_URL` directly in JS — always use `process.env.PUBLIC_URL`. 
   - For static HTML (like `public/index.html`), use `%PUBLIC_URL%` as a placeholder.
   - If you run into runtime errors due to `process` or `process.env` not being defined, make sure you have named the variable correctly in your `.env`, and restarted your dev server after editing `.env`.
   - `tmdbApi.js` now uses a runtime guard so it will not break if `process.env` is not available (for development, preview, or alternative build setups).
   - DO NOT commit your `.env` to version control.

### Fetching Movie Data

- Use the functions in `src/tmdbApi.js` for quiz data or movie lookup. Example:
  ```js
  import { fetchKollywoodMovies, fetchMovieDetails } from './tmdbApi';
  // fetchKollywoodMovies().then(...)
  // fetchMovieDetails(movieId).then(...)
  ```
- The API utility is reusable and supports fetching movies, movie details, searching for Tamil titles, and actors.

---

## 🏗️ App Structure

- `src/features` - Modular feature folders: `auth/`, `quiz/`, `results/`, `user/`, `admin/`
- `src/components` - Shared UI components (`Navbar`)
- `src/utils` - Client-only utilities for auth, storage
- `src/tmdbApi.js` - TMDb fetch utility
- `.env.example` - Environment variable template for TMDb API key

## 🧑‍💻 Getting Started

1. Copy `.env.example` to `.env` and set your API key.
2. Run the app:
    ```
    npm install
    npm start
    ```
    The SPA runs at http://localhost:3000.

3. Log in or register to begin playing. Each quiz and profile is fully local—no backend required.

## ✏️ Customization

### Colors

Theme colors are defined in `src/App.css`:

```css
:root {
  --primary-bg: #f9fafb;
  --secondary: #f702cb;
  --accent: #1a1814;
  ...
}
```

### UI

The app is modular and can be extended for new quiz types or additional TMDb queries. All user state is in localStorage (per browser/user).

## 📜 License & Credits

Powered by [TMDb](https://www.themoviedb.org/) API.

---

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

## TMDb API Integration (Kollywood QuizHub)

This app integrates with [The Movie Database (TMDb)](https://www.themoviedb.org/) API to fetch Kollywood (Tamil) movie data for quizzes. The utility code is in `src/tmdbApi.js`.

### 🔑 Setup your TMDb API Key

1. Copy `.env.example` to `.env` in the `kollywood_quizhub_frontend` directory.
2. Set `REACT_APP_TMDB_API_KEY=YOUR_TMDB_KEY` in your `.env` file.
   - The provided demo key for development is: `5bc67d3b06aecbd18121a3cbbc16eb59`
   - **IMPORTANT:** Environment variables in Create React App must be prefixed with `REACT_APP_` (e.g., `REACT_APP_TMDB_API_KEY`) and will only be available in JavaScript code after rebuilding the app (they are injected at build time). 
   - Do **NOT** use `PUBLIC_URL` directly in JS — always use `process.env.PUBLIC_URL`. 
   - For static HTML (like `public/index.html`), use `%PUBLIC_URL%` as a placeholder.
   - If you run into runtime errors due to `process` or `process.env` not being defined, make sure you have named the variable correctly in your `.env`, and restarted your dev server after editing `.env`.
   - `tmdbApi.js` now uses a runtime guard so it will not break if `process.env` is not available (for development, preview, or alternative build setups).
   - DO NOT commit your `.env` to version control.

### Fetching Movie Data

- Use the functions in `src/tmdbApi.js` for quiz data or movie lookup. Example:
  ```js
  import { fetchKollywoodMovies, fetchMovieDetails } from './tmdbApi';
  // fetchKollywoodMovies().then(...)
  // fetchMovieDetails(movieId).then(...)
  ```
- The API utility is reusable and supports fetching movies, movie details, and searching for Tamil titles.

---

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Important Note: Babel Configuration

This project’s `package.json` includes a `babel` section with a plugin:

```json
"babel": {
"plugins": ["./.ve/babel-plugin-jsx-editor-id.js"]
}
```

This plugin enables **visual editing functionality** in supported tools.

**Warning for AI code agents and contributors:**
**DO NOT** remove or modify this section - it is ESSENTIAL for proper operation.
Removing it will break editor integration and visual editing features.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
