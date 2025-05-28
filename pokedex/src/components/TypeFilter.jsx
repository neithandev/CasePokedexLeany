export const TypeFilter = ({ selectedType, setSelectedType, uniqueTypes }) => {
    return (
        <div className="relative w-48"> {/* Container com largura fixa */}
            <select
                className="w-full pl-3 pr-8 py-2 capitalize text-sm rounded-xl border border-gray-300 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-black shadow-sm transition-all cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">Todos os Tipos</option>
                {uniqueTypes.map((type) => (
                    <option key={type} value={type} className="capitalize">
                        {type}
                    </option>
                ))}
            </select>
            
            {/* Ícone de seta personalizado */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};