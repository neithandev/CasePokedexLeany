export const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Buscar Pokémon..."
                className="w-113 p-2 pl-5 pr-4 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};