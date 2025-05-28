import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const limit = 20;
  const chunkSize = 650; // Reduzi para evitar sobrecarga

  useEffect(() => {
    const fetchPokemonsInChunks = async () => {
      try {
        setLoading(true);
        const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const totalPokemons = listResponse.data.results;
        
        // Adiciona índice único para cada Pokémon
        const pokemonsWithUniqueIds = totalPokemons.map((pokemon, index) => ({
          ...pokemon,
          uniqueId: `${pokemon.name}-${index}` // Cria um ID único
        }));
        
        setTotalPages(Math.ceil(pokemonsWithUniqueIds.length / limit));

        for (let i = 0; i < pokemonsWithUniqueIds.length; i += chunkSize) {
          const chunk = pokemonsWithUniqueIds.slice(i, i + chunkSize);
          const detailedChunk = await Promise.all(
            chunk.map(async (pokemon) => {
              const res = await axios.get(pokemon.url);
              return {
                ...res.data,
                uniqueId: pokemon.uniqueId // Mantém o ID único
              };
            })
          );

          setAllPokemons(prev => {
            // Filtra para evitar duplicatas antes de adicionar
            const newPokemons = detailedChunk.filter(newPoke => 
              !prev.some(existingPoke => existingPoke.uniqueId === newPoke.uniqueId)
            );
            return [...prev, ...newPokemons];
          });

          if (i === 0) {
            setDisplayedPokemons(detailedChunk.slice(0, limit));
          }
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        setFullyLoaded(true);
      } catch (error) {
        console.error("Erro ao buscar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonsInChunks();
  }, []);

  useEffect(() => {
    if (allPokemons.length > 0) {
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      setDisplayedPokemons(allPokemons.slice(start, end));
    }
  }, [currentPage, allPokemons]);

  return {
    allPokemons,
    displayedPokemons,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    fullyLoaded 
  };
};