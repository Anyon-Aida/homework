import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import pokemonReducer from './features/pokemonSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
