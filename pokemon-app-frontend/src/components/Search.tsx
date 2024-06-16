import React, { useState } from 'react';
import axios from 'axios';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
      setResults([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Pokémon"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
