import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface User {
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

interface JwtPayload {
  username: string;
  email: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }: { email: string; password: string; username: string }) => {
    const response = await axios.post('http://localhost:3000/auth/register', { email, password, username });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        const decodedToken = jwtDecode<JwtPayload>(action.payload.access_token);
        state.user = { email: decodedToken.email, username: decodedToken.username };
        console.log('Login successful, user:', state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        const decodedToken = jwtDecode<JwtPayload>(action.payload.access_token);
        state.user = { email: decodedToken.email, username: decodedToken.username };
        console.log('Registration successful, user:', state.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
