import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { catchPokemon } from '../features/pokemonSlice';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector((state: RootState) =>
    state.pokemon.pokemons.find((p) => p.id === id)
  );
  const user = useSelector((state: RootState) => state.auth.user);

  console.log('Current user:', user); // Log the current user for debugging

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const handleCatch = async () => {
    if (!user) {
      alert('You need to be logged in to catch a Pokemon');
      return;
    }
    try {
      await dispatch(catchPokemon({ id: pokemon.id, uid: user.email }));
      alert(`You caught ${pokemon.name}`);
    } catch (error) {
      console.error('Failed to catch pokemon:', error);
      alert('Failed to catch pokemon');
    }
  };

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Abilities: {pokemon.abilities.join(', ')}</p>
      <button onClick={handleCatch} disabled={pokemon.catched}>
        {pokemon.catched ? 'Caught' : 'Catch'}
      </button>
    </div>
  );
};

export default PokemonDetail;
