export const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                placeholder="Buscar Pokémon..."
                className="
          w-full
          py-3
          pl-12
          pr-4
          rounded-2xl
          border
          border-gray-300
          bg-white
          text-gray-900
          placeholder-gray-400
          shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-rose-400
          focus:border-transparent
          transition
          duration-300
          caret-rose-500
        "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Ícone de lupa dentro do input */}
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                    className="w-5 h-5 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
        </div>
    );
};