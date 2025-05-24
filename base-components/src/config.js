// API Configuration
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const AUTH_TOKEN = import.meta.env.VITE_TMDB_AUTH_TOKEN;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// API Headers
export const API_HEADERS = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

// Complete API Config
export const API_CONFIG = {
  BASE_URL,
  IMAGE_BASE_URL,
  API_KEY,
  HEADERS: API_HEADERS
}; 