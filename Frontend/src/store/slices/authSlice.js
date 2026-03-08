import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/signup', userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Signup failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('user');
});

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get profile');
  }
});

const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; })
      .addCase(getProfile.fulfilled, (state, action) => { state.user = { ...state.user, ...action.payload }; });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
