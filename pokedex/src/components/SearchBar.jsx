export const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};