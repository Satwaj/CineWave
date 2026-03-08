import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const searchAll = createAsyncThunk('search/searchAll', async ({ query, page = 1 }) => {
  const data = await tmdbService.searchMulti(query, page);
  return { ...data, query };
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => { state.query = action.payload; },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => { state.loading = true; })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages, query } = action.payload;
        state.query = query;
        if (page === 1) {
          state.results = results;
        } else {
          state.results = [...state.results, ...results];
        }
        state.page = page;
        state.totalPages = total_pages;
      })
      .addCase(searchAll.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
