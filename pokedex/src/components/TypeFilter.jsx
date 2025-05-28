export const TypeFilter = ({ selectedType, setSelectedType, uniqueTypes }) => {
    return (
        <div className="relative w-48">
            <select
                className="
          w-full
          py-3
          pl-4
          pr-10
          rounded-2xl
          border
          border-gray-300
          bg-white
          text-gray-900
          capitalize
          shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-rose-400
          focus:border-transparent
          cursor-pointer
          transition
          duration-300
          appearance-none
        "
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
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                    className="w-5 h-5 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
    );
};