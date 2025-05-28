import { typeColors } from '../utils/constants';
import { usePokemonModalStore } from '../stores/modalStore';
import { useFavoritesStore } from '../stores/favoritesStore';
import { CompareButton } from './CompareButton';

export const PokemonCard = ({ pokemon }) => {
    const { openModal } = usePokemonModalStore();
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
    const favorites = useFavoritesStore((state) => state.favorites)
    const isFavorite = favorites.some(fav => fav.id === pokemon.id)

    return (
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col cursor-pointer" onClick={() => openModal(pokemon)}>
            <div className="bg-black bg-opacity-50 text-white p-2 z-10 flex items-center justify-between">
                <div className="z-20 flex-shrink-0 mr-2">
                    <CompareButton pokemon={pokemon} />
                </div>

                <h3 className="text-lg font-bold capitalize text-center flex-grow px-2 truncate min-w-0" title={pokemon.name}>
                    {pokemon.name}
                </h3>

                <div className="z-20 flex-shrink-0 ml-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(pokemon)
                        }}
                        className="p-1 bg-white/80 hover:bg-red-600 rounded-full backdrop-blur-sm cursor-pointer text-sm"
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>

            <div className="relative flex-grow min-h-[180px] bg-gray-100 flex items-center justify-center p-4">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-auto max-h-[160px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <div className="p-3 bg-white">
                <div className="flex gap-2 justify-center">
                    {pokemon.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={`px-3 py-1 rounded-full text-white text-xs font-bold capitalize ${typeColors[type.type.name]}`}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};