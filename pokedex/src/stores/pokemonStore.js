import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePokemonStore = create(
    persist(
        (set) => ({
            favorites: [],
            addFavorite: (name) =>
                set((state) => ({ favorites: [...state.favorites, name] })),
            removeFavorite: (name) =>
                set((state) => ({ favorites: state.favorites.filter((f) => f !== name) })),
        }),
        {
            name: 'pokemon-favorites',
            getStorage: () => localStorage,
        }
    )
);