// hooks/useEvolutionChain.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useEvolutionChain = (pokemon) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        if (!pokemon) return;

        const speciesResponse = await axios.get(pokemon.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
        const chainResponse = await axios.get(evolutionChainUrl);

        const extractChain = (chain, collected = []) => {
          if (!chain) return collected;
          const speciesName = chain.species.name;
          collected.push(speciesName);
          if (chain.evolves_to.length > 0) {
            return extractChain(chain.evolves_to[0], collected);
          }
          return collected;
        };

        const chain = extractChain(chainResponse.data.chain);
        setEvolutionChain(chain);
      } catch (error) {
        console.error('Erro ao buscar cadeia de evolução:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemon]);

  return { evolutionChain, loading };
};
