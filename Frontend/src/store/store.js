import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import searchReducer from './slices/searchSlice';
import favoriteReducer from './slices/favoriteSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    search: searchReducer,
    favorites: favoriteReducer,
  },
});

export default store;
