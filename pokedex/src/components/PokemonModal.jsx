import React from 'react';
import Modal from 'react-modal';
import { usePokemonModalStore } from '../stores/modalStore';
import { typeColors } from '../utils/constants';


Modal.setAppElement('#root');

export const PokemonModal = () => {
    const { isOpen, closeModal, selectedPokemon } = usePokemonModalStore();

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
                    <div className="flex flex-col items-center">
                        <img
                            src={selectedPokemon.sprites.other['official-artwork'].front_default ||
                                selectedPokemon.sprites.front_default}
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

                    {/* Seção Direita (Estatísticas) */}
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
            </div>
        </Modal>
    );
};