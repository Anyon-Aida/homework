import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../hooks';
import { fetchPokemons, fetchPokemonTypes } from '../features/pokemonSlice';
import { RootState } from '../store';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  imageUrl: string;
  catched: boolean;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { pokemons, types, loading, error } = useSelector((state: RootState) => state.pokemon);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCaughtOnly, setShowCaughtOnly] = useState<boolean>(false);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchPokemonTypes());
  }, [dispatch]);

  useEffect(() => {
    let filtered = pokemons;

    if (selectedType) {
      const typeFilter = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const pokemonNames = response.data.pokemon.map((p: any) => p.pokemon.name);
        filtered = filtered.filter(pokemon => pokemonNames.includes(pokemon.name));
        setFilteredPokemons(filtered);
      };
      typeFilter();
    } else {
      if (searchTerm) {
        filtered = filtered.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      if (showCaughtOnly) {
        filtered = filtered.filter(pokemon => pokemon.catched);
      }

      setFilteredPokemons(filtered);
    }
  }, [pokemons, selectedType, searchTerm, showCaughtOnly]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCaughtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCaughtOnly(event.target.checked);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const paginatedPokemons = filteredPokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  return (
    <div>
      <h2>Pokémons</h2>
      <div>
        <label htmlFor="type">Filter by Type: </label>
        <select id="type" value={selectedType} onChange={handleTypeChange}>
          <option value="">All</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="search">Search by Name: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for Pokémon"
        />
      </div>
      <div>
        <label htmlFor="caught">Show Caught Only: </label>
        <input
          type="checkbox"
          id="caught"
          checked={showCaughtOnly}
          onChange={handleCaughtChange}
        />
      </div>
      <ul>
        {paginatedPokemons.map(pokemon => (
          <li key={pokemon.id} style={{ border: pokemon.catched ? '2px solid green' : 'none' }}>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
