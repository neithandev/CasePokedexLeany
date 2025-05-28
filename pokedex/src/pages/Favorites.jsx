import { useFavoritesStore } from '../stores/favoritesStore'
import { PokemonCard } from '../components/PokemonCard'
import { useNavigate } from 'react-router-dom'

export const Favorites = () => {
    const favorites = useFavoritesStore((state) => state.favorites)
    const clearFavorites = useFavoritesStore((state) => state.clearFavorites)
    const navigate = useNavigate()

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-5 mt-5 px-4 py-2 bg-white border-2 border-blue-400 rounded-full shadow-md hover:bg-blue-50 hover:border-blue-500 transition-all duration-200 cursor-pointer">
                <span className="text-blue-600 font-medium">Voltar</span>
            </button>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Meus Favoritos</h1>
                {favorites.length > 0 && (
                    <button
                        onClick={clearFavorites}
                        className="px-4 py-2 bg-white border-2 rounded-full border-red-400 shadow-md hover:bg-red-50 hover:border-red-500 transition-colors cursor-pointer"
                    >
                        <span className="text-red-600 font-medium">Limpar favoritos!</span>
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">Nenhum Pokémon favoritado ainda!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    )
}