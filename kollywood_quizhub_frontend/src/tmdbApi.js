//
// tmdbApi.js
//
// Utility functions to interact with The Movie Database (TMDb) API for Kollywood QuizHub.
//
// This file handles TMDb API setup and encapsulates common fetches
// (e.g., discovering Kollywood movies, single movie/info fetch).
//

// PUBLIC_INTERFACE
/**
 * Get the TMDb API key from environment variables (safe method for create-react-app)
 * IMPORTANT: When running locally, set REACT_APP_TMDB_API_KEY=xxxx in your .env file (do not commit .env!)
 */
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Base REST API URL for TMDb (v3)
const API_BASE = "https://api.themoviedb.org/3";

/**
 * Helper to perform a GET request to TMDb.
 * @param {string} endpoint - The TMDb endpoint (e.g. '/search/movie')
 * @param {Object} params - Query parameters as a JS object
 * @returns {Promise<Object>} The parsed JSON data
 */
async function tmdbGet(endpoint, params = {}) {
  if (!API_KEY) throw new Error("TMDb API key not set in environment variables");
  // Add API key and language to params
  const url = new URL(API_BASE + endpoint);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("TMDb API error: " + response.statusText);
  return await response.json();
}

// PUBLIC_INTERFACE
/**
 * Search Kollywood (Tamil) movies.
 * See https://developers.themoviedb.org/3/discover/movie
 * Uses region & language settings to focus on Tamil content.
 * @param {number} [page=1] - Result page number.
 * @returns {Promise<Object>} Result from TMDb discover API.
 */
export async function fetchKollywoodMovies(page = 1) {
  // Kollywood/Tamil filtering:
  // - with_original_language=ta (Tamil)
  // Optionally, filter with genre/tags if needed.
  return await tmdbGet("/discover/movie", {
    with_original_language: "ta",
    sort_by: "popularity.desc",
    include_adult: "false",
    page,
  });
}

// PUBLIC_INTERFACE
/**
 * Fetch a single movie's details by TMDb movie ID.
 * @param {number|string} movieId - TMDb movie ID
 * @returns {Promise<Object>} Movie details from TMDb
 */
export async function fetchMovieDetails(movieId) {
  return await tmdbGet(`/movie/${movieId}`);
}

// PUBLIC_INTERFACE
/**
 * Search for a Tamil movie by name/text query.
 * @param {string} query - Movie search input
 * @param {number} [page=1] - Pagination (optional)
 * @returns {Promise<Object>} TMDb results
 */
export async function searchTamilMovies(query, page = 1) {
  return await tmdbGet("/search/movie", {
    query,
    page,
    include_adult: "false",
    language: "ta", // Give preference to Tamil releases for text match
  });
}

// PUBLIC_INTERFACE
/**
 * Example: fetch clues for a quiz – get popular Kollywood actors
 * @param {number} [page=1]
 * @returns {Promise<Object>}
 */
export async function fetchKollywoodActors(page = 1) {
  // with_original_language=ta focuses the search.
  return await tmdbGet("/person/popular", {
    language: "ta",
    page,
  });
}
