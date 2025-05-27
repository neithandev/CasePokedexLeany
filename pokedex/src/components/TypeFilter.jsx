export const TypeFilter = ({ selectedType, setSelectedType, uniqueTypes }) => {
    return (
        <select
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
        >
            <option value="">Todos os Tipos</option>
            {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
};