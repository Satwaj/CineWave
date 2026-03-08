import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/favorites');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
  }
});

export const addToFavorites = createAsyncThunk('favorites/add', async (movie, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/favorites', movie);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
  }
});

export const removeFromFavorites = createAsyncThunk('favorites/remove', async (tmdbId, { rejectWithValue }) => {
  try {
    await api.delete(`/favorites/${tmdbId}`);
    return tmdbId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
  }
});

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => { state.loading = true; })
      .addCase(fetchFavorites.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchFavorites.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addToFavorites.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.tmdbId !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;
