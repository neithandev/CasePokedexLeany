import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (pokemon) =>
        set((state) => {
          const exists = state.favorites.some(fav => fav.id === pokemon.id)
          if (exists) {
            return { favorites: state.favorites.filter(fav => fav.id !== pokemon.id) }
          }
          return { favorites: [...state.favorites, pokemon] }
        }),
      clearFavorites: () => set({ favorites: [] })
    }),
    {
      name: 'pokemon-favorites',
      getStorage: () => localStorage,
    }
  )
)