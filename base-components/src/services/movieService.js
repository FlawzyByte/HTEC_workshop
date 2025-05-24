import axios from 'axios';
import { API_CONFIG } from '../config';

const movieApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS
});

export const movieService = {
  getTrendingMovies: async () => {
    try {
      const response = await movieApi.get('/trending/movie/week');
      return response.data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  searchMovies: async (query) => {
    try {
      const response = await movieApi.get('/search/movie', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await movieApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
}; 