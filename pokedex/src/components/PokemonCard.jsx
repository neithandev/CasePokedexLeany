import { typeColors } from '../utils/constants';
import { usePokemonModalStore } from '../stores/modalStore';

export const PokemonCard = ({ pokemon }) => {
    const { openModal } = usePokemonModalStore();
    return (
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col cursor-pointer" onClick={() => openModal(pokemon)}>
            {/* Nome sobre a imagem */}
            <div className="bg-black bg-opacity-50 text-white p-3 z-10">
                <h3 className="text-lg font-bold capitalize text-center truncate px-2" title={pokemon.name}>
                    {pokemon.name}
                </h3>
            </div>

            {/* Container da imagem */}
            <div className="relative flex-grow min-h-[180px] bg-gray-100 flex items-center justify-center p-4">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-full h-auto max-h-[160px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Tipos */}
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