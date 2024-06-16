import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const CaughtPokemons: React.FC = () => {
  const pokemons = useSelector((state: RootState) =>
    state.pokemon.pokemons.filter(pokemon => pokemon.catched)
  );

  if (pokemons.length === 0) return <p>No pokémons caught yet.</p>;

  return (
    <div>
      <h2>Caught Pokémons</h2>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaughtPokemons;
