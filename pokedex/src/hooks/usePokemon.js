import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]); // Todos os Pokémon
  const [displayedPokemons, setDisplayedPokemons] = useState([]); // Pokémon exibidos
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  // Busca TODOS os Pokémon uma única vez
  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const detailedPokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
          })
        );
        setAllPokemons(detailedPokemons);
        setDisplayedPokemons(detailedPokemons.slice(0, limit));
        setTotalPages(Math.ceil(detailedPokemons.length / limit));
      } catch (error) {
        console.error("Erro ao buscar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPokemons();
  }, []);

  // Atualiza os Pokémon exibidos quando muda a página
  useEffect(() => {
    if (allPokemons.length > 0) {
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      setDisplayedPokemons(allPokemons.slice(start, end));
    }
  }, [currentPage, allPokemons]);

  return { 
    allPokemons,        // Para busca global
    displayedPokemons,  // Para exibição paginada
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage 
  };
};