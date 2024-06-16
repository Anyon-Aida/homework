// pokemonSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  imageUrl: string;
  catched: boolean;
}

interface PokemonState {
  pokemons: Pokemon[];
  types: { name: string; url: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  types: [],
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
  const results = response.data.results;

  const detailedPokemons = await Promise.all(
    results.map(async (pokemon: any) => {
      const pokemonDetails = await axios.get(pokemon.url);
      return {
        id: pokemonDetails.data.id.toString(),
        name: pokemonDetails.data.name,
        height: pokemonDetails.data.height,
        weight: pokemonDetails.data.weight,
        abilities: pokemonDetails.data.abilities.map((ability: any) => ability.ability.name),
        imageUrl: pokemonDetails.data.sprites.front_default,
        catched: false,
      };
    })
  );

  return detailedPokemons;
});

export const fetchPokemonTypes = createAsyncThunk('pokemon/fetchPokemonTypes', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  return response.data.results;
});

export const catchPokemon = createAsyncThunk('pokemon/catchPokemon', async ({ id, uid }: { id: string, uid: string }, { getState }) => {
  const state = getState() as RootState;
  const user = state.auth.user;

  if (!user) {
    throw new Error('User not logged in');
  }

  await axios.post(
    'http://localhost:3000/pokemon/catch',
    { id, uid },
  );
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setCatched(state, action) {
      const { id, catched } = action.payload;
      const index = state.pokemons.findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        state.pokemons[index].catched = catched;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemons';
      })
      .addCase(fetchPokemonTypes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemon types';
      })
      .addCase(catchPokemon.fulfilled, (state, action) => {
        const index = state.pokemons.findIndex(pokemon => pokemon.id === action.meta.arg.id);
        if (index !== -1) {
          state.pokemons[index].catched = true;
        }
      });
  },
});

export const { setCatched } = pokemonSlice.actions;
export default pokemonSlice.reducer;
