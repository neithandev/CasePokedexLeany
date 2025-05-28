import { useState, useEffect } from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import { PokemonCard } from '../components/PokemonCard';
import { SearchBar } from '../components/SearchBar';
import { TypeFilter } from '../components/TypeFilter';
import { Link } from 'react-router-dom';

export const Home = () => {
    const { allPokemons, loading, currentPage, totalPages, setCurrentPage } = usePokemonList();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // Filtra TODOS os Pokémon (não apenas os da página atual)
    const filteredPokemons = allPokemons.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType
            ? pokemon.types.some((type) => type.type.name === selectedType)
            : true;
        return matchesSearch && matchesType;
    });

    // Atualiza a paginação quando os filtros mudam
    useEffect(() => {
        setCurrentPage(1); // Reset para a primeira página ao filtrar
    }, [searchTerm, selectedType]);

    // Pokémon para exibir na página atual (paginados)
    const paginatedPokemons = filteredPokemons.slice(
        (currentPage - 1) * 20,
        currentPage * 20
    );

    // Tipos únicos baseados em todos os Pokémon
    const uniqueTypes = [...new Set(
        allPokemons.flatMap((pokemon) =>
            pokemon.types.map((type) => type.type.name)
        )
    )];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8">
            <div className="container mx-auto px-4">
                <header className="text-center mb-8 mt-5 relative">
                    <h1 className="text-4xl font-bold text-black mb-2">Pokédex</h1>
                    <p className="text-gray-600">Encontre seu Pokémon favorito!</p>
                    <Link
                        to="/favorites"
                        className="absolute top-0 right-0 flex items-center gap-2 px-4 py-2 bg-white border-2 border-red-400 rounded-full shadow-md hover:bg-red-50 hover:border-red-500 transition-all duration-200 group"
                    >
                        <span className="text-red-500 group-hover:text-red-600 text-lg">❤️</span>
                        <span className="text-red-600 font-medium hidden md:inline">Meus Favoritos</span>
                    </Link>
                </header>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="w-full md:w-auto md:flex-1">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>

                    <div className="w-full md:w-auto">
                        <TypeFilter
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                            uniqueTypes={uniqueTypes}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        {/* Pokébola animada */}
                        <div className="relative w-16 h-16 animate-bounce">
                            <div className="absolute inset-0 rounded-full bg-red-600 border-4 border-black"></div>
                            <div className="absolute inset-0 rounded-full bg-white border-4 border-black"></div>
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-black"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-2 border-gray-300"></div>
                        </div>

                        {/* Texto com efeito de digitação */}
                        <div className="text-center space-y-2">
                            <p className="text-xl font-bold text-gray-700 animate-pulse">
                                Carregando sua Pokédex...
                            </p>
                            <p className="text-sm text-gray-500">
                                Isso pode levar alguns instantes
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {paginatedPokemons.map((pokemon) => (
                                <PokemonCard key={pokemon.name} pokemon={pokemon} />
                            ))}
                        </div>

                        {/* Paginação baseada nos resultados filtrados */}
                        {filteredPokemons.length > 0 && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1 || loading}
                                    className={`px-4 py-2 mx-1 rounded-lg transition-colors ${currentPage === 1 || loading
                                        ? "bg-gray-200 opacity-50 cursor-default"
                                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        }`}
                                >
                                    Anterior
                                </button>

                                {Array.from({ length: Math.min(5, Math.ceil(filteredPokemons.length / 20)) }, (_, i) => {
                                    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                                    return page <= Math.ceil(filteredPokemons.length / 20) && (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 mx-1 rounded-lg cursor-pointer transition-colors ${currentPage === page
                                                ? "bg-black text-white"
                                                : "bg-gray-200 hover:bg-gray-300"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(Math.min(Math.ceil(filteredPokemons.length / 20), currentPage + 1))}
                                    disabled={currentPage === Math.ceil(filteredPokemons.length / 20) || loading}
                                    className={`px-4 py-2 mx-1 rounded-lg transition-colors ${currentPage === Math.ceil(filteredPokemons.length / 20) || loading
                                        ? "bg-gray-200 opacity-50 cursor-default"
                                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                        }`}
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};