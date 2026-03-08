import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const IMG_BASE = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: TMDB_BASE,
  params: { api_key: TMDB_KEY },
});

const tmdbService = {
  // Trending
  getTrending: async (page = 1) => {
    const { data } = await tmdb.get('/trending/all/week', { params: { page } });
    return data;
  },

  // Movies
  getPopularMovies: async (page = 1) => {
    const { data } = await tmdb.get('/movie/popular', { params: { page } });
    return data;
  },

  getTopRatedMovies: async (page = 1) => {
    const { data } = await tmdb.get('/movie/top_rated', { params: { page } });
    return data;
  },

  getNowPlaying: async (page = 1) => {
    const { data } = await tmdb.get('/movie/now_playing', { params: { page } });
    return data;
  },

  getUpcoming: async (page = 1) => {
    const { data } = await tmdb.get('/movie/upcoming', { params: { page } });
    return data;
  },

  // TV Shows
  getPopularTvShows: async (page = 1) => {
    const { data } = await tmdb.get('/tv/popular', { params: { page } });
    return data;
  },

  getTopRatedTv: async (page = 1) => {
    const { data } = await tmdb.get('/tv/top_rated', { params: { page } });
    return data;
  },

  // Details
  getDetails: async (id, type = 'movie') => {
    const { data } = await tmdb.get(`/${type}/${id}`);
    return data;
  },

  // Videos (trailers)
  getVideos: async (id, type = 'movie') => {
    const { data } = await tmdb.get(`/${type}/${id}/videos`);
    return data;
  },

  // Credits
  getCredits: async (id, type = 'movie') => {
    const { data } = await tmdb.get(`/${type}/${id}/credits`);
    return data;
  },

  // Similar
  getSimilar: async (id, type = 'movie') => {
    const { data } = await tmdb.get(`/${type}/${id}/similar`);
    return data;
  },

  // Search
  searchMulti: async (query, page = 1) => {
    const { data } = await tmdb.get('/search/multi', { params: { query, page } });
    return data;
  },

  // By Genre
  getMoviesByGenre: async (genreId, page = 1) => {
    const { data } = await tmdb.get('/discover/movie', {
      params: { with_genres: genreId, page, sort_by: 'popularity.desc' },
    });
    return data;
  },

  // Genres list
  getGenres: async (type = 'movie') => {
    const { data } = await tmdb.get(`/genre/${type}/list`);
    return data.genres;
  },

  // People
  getPopularPeople: async (page = 1) => {
    const { data } = await tmdb.get('/person/popular', { params: { page } });
    return data;
  },

  getPersonDetail: async (id) => {
    const { data } = await tmdb.get(`/person/${id}`);
    return data;
  },

  getPersonCredits: async (id) => {
    const { data } = await tmdb.get(`/person/${id}/combined_credits`);
    return data;
  },
};

export default tmdbService;
