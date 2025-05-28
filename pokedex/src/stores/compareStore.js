import { create } from 'zustand';

export const useCompareStore = create((set) => ({
  compareList: [],
  addToCompare: (pokemon) => 
    set((state) => {
      if (state.compareList.some(p => p.id === pokemon.id)) {
        return state; // Evita duplicados
      }
      return { compareList: [...state.compareList, pokemon].slice(0, 2) }; // Limita a 2
    }),
  removeFromCompare: (id) => 
    set((state) => ({
      compareList: state.compareList.filter(p => p.id !== id)
    })),
  clearCompare: () => set({ compareList: [] })
}));