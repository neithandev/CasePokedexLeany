import { create } from 'zustand';

export const usePokemonModalStore = create((set) => ({
    isOpen: false,
    selectedPokemon: null,
    openModal: (pokemon) => set({ isOpen: true, selectedPokemon: pokemon }),
    closeModal: () => set({ isOpen: false, selectedPokemon: null }),
}));