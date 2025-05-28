import Modal from 'react-modal';
import { usePokemonModalStore } from '../stores/modalStore';
import { typeColors } from '../utils/constants';
import { useEvolutionChain } from '../hooks/useEvolutionChain'; // caminho conforme sua estrutura



Modal.setAppElement('#root');

export const PokemonModal = () => {
    const { isOpen, closeModal, selectedPokemon } = usePokemonModalStore();
    const { evolutionChain, loading: loadingEvolution } = useEvolutionChain(selectedPokemon);

    if (!selectedPokemon) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal w-full max-w-2xl"
            overlayClassName="modal-overlay bg-black/50 backdrop-blur-sm"
        >
            <div className="bg-white p-6 rounded-xl shadow-2xl">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold capitalize text-gray-800">
                        {selectedPokemon.name}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-red-500 transition-colors text-2xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Corpo */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    {/* Esquerda: imagem e tipos */}
                    <div className="flex flex-col items-center">
                        <img
                            src={
                                selectedPokemon.sprites.other['official-artwork'].front_default ||
                                selectedPokemon.sprites.front_default
                            }
                            alt={selectedPokemon.name}
                            className="w-56 h-56 object-contain mb-4 drop-shadow-lg"
                        />

                        {/* Container de Tipos */}
                        <div className="flex flex-wrap justify-center gap-2 w-full">
                            {selectedPokemon.types.map((type) => (
                                <span
                                    key={type.type.name}
                                    className={`px-5 py-2 rounded-full text-white font-bold 
            capitalize text-center text-sm shadow-md 
            ${typeColors[type.type.name]}`}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Direita: Estatísticas */}
                    <div className="flex-1 w-full">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                            Estatísticas
                        </h3>
                        <ul className="space-y-3">
                            {selectedPokemon.stats.map((stat) => (
                                <li key={stat.stat.name} className="flex justify-between items-center">
                                    <span className="capitalize text-gray-600">
                                        {stat.stat.name.replace('-', ' ')}:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900 w-8 text-right">
                                            {stat.base_stat}
                                        </span>
                                        <div className="bg-gray-200 h-2 rounded-full w-24">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Cadeia Evolutiva (abaixo do conteúdo principal) */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                        Cadeia Evolutiva
                    </h3>
                    {loadingEvolution ? (
                        <p className="text-gray-500">Carregando...</p>
                    ) : (
                        <div className="flex flex-row items-center justify-center flex-wrap gap-6">
                            {evolutionChain.map((name, index) => (
                                <div key={name} className="flex flex-col items-center">
                                    <img
                                        src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}
                                        alt={name}
                                        className="w-24 h-24 object-contain mb-1"
                                    />
                                    <span className="capitalize text-sm text-gray-700">{name}</span>
                                </div>
                            )).reduce((acc, curr, index) => {
                                acc.push(curr);
                                if (index < evolutionChain.length - 1) {
                                    acc.push(
                                        <span key={`arrow-${index}`} className="text-xl text-gray-400 mx-2">→</span>
                                    );
                                }
                                return acc;
                            }, [])}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};