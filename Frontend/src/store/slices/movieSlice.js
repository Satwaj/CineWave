import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchTrending = createAsyncThunk('movies/fetchTrending', async (page = 1) => {
  const data = await tmdbService.getTrending(page);
  return data;
});

export const fetchPopular = createAsyncThunk('movies/fetchPopular', async (page = 1) => {
  const data = await tmdbService.getPopularMovies(page);
  return data;
});

export const fetchTopRated = createAsyncThunk('movies/fetchTopRated', async (page = 1) => {
  const data = await tmdbService.getTopRatedMovies(page);
  return data;
});

export const fetchPopularTv = createAsyncThunk('movies/fetchPopularTv', async (page = 1) => {
  const data = await tmdbService.getPopularTvShows(page);
  return data;
});

export const fetchMoviesByGenre = createAsyncThunk('movies/fetchByGenre', async ({ genreId, page = 1 }) => {
  const data = await tmdbService.getMoviesByGenre(genreId, page);
  return data;
});

export const fetchMovieDetail = createAsyncThunk('movies/fetchDetail', async ({ id, type = 'movie' }) => {
  const data = await tmdbService.getDetails(id, type);
  return data;
});

export const fetchMovieVideos = createAsyncThunk('movies/fetchVideos', async ({ id, type = 'movie' }) => {
  const data = await tmdbService.getVideos(id, type);
  return data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trending: { results: [], page: 1, totalPages: 1 },
    popular: { results: [], page: 1, totalPages: 1 },
    topRated: { results: [], page: 1, totalPages: 1 },
    popularTv: { results: [], page: 1, totalPages: 1 },
    genreMovies: { results: [], page: 1, totalPages: 1 },
    detail: null,
    videos: [],
    loading: false,
    detailLoading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state) => { state.detail = null; state.videos = []; },
    clearGenreMovies: (state) => { state.genreMovies = { results: [], page: 1, totalPages: 1 }; },
  },
  extraReducers: (builder) => {
    builder
      // Trending
      .addCase(fetchTrending.pending, (state) => { state.loading = true; })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload;
        if (page === 1) {
          state.trending = { results, page, totalPages: total_pages };
        } else {
          state.trending = { results: [...state.trending.results, ...results], page, totalPages: total_pages };
        }
      })
      .addCase(fetchTrending.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // Popular
      .addCase(fetchPopular.pending, (state) => { state.loading = true; })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload;
        if (page === 1) {
          state.popular = { results, page, totalPages: total_pages };
        } else {
          state.popular = { results: [...state.popular.results, ...results], page, totalPages: total_pages };
        }
      })
      .addCase(fetchPopular.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      // Top Rated
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload;
        if (page === 1) {
          state.topRated = { results, page, totalPages: total_pages };
        } else {
          state.topRated = { results: [...state.topRated.results, ...results], page, totalPages: total_pages };
        }
      })
      // Popular TV
      .addCase(fetchPopularTv.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload;
        if (page === 1) {
          state.popularTv = { results, page, totalPages: total_pages };
        } else {
          state.popularTv = { results: [...state.popularTv.results, ...results], page, totalPages: total_pages };
        }
      })
      // Genre
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload;
        if (page === 1) {
          state.genreMovies = { results, page, totalPages: total_pages };
        } else {
          state.genreMovies = { results: [...state.genreMovies.results, ...results], page, totalPages: total_pages };
        }
      })
      // Detail
      .addCase(fetchMovieDetail.pending, (state) => { state.detailLoading = true; })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => { state.detailLoading = false; state.detail = action.payload; })
      .addCase(fetchMovieDetail.rejected, (state, action) => { state.detailLoading = false; state.error = action.error.message; })
      // Videos
      .addCase(fetchMovieVideos.fulfilled, (state, action) => { state.videos = action.payload.results || []; });
  },
});

export const { clearDetail, clearGenreMovies } = movieSlice.actions;
export default movieSlice.reducer;
