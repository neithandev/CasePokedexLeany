import { useCompareStore } from '../stores/compareStore';
import { typeColors } from '../utils/constants';
import { ComparisonChart } from './ComparisonChart';

export const CompareModal = () => {
  const { compareList, clearCompare } = useCompareStore();

  if (compareList.length < 2) return null;

  const [pokemon1, pokemon2] = compareList;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto px-4 py-8">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl w-full max-w-5xl">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Comparando Pokémons</h2>
          <button
            onClick={clearCompare}
            className="text-gray-500 hover:text-red-500 transition-colors text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[pokemon1, pokemon2].map((poke) => (
            <div
              key={poke.name}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md w-full"
            >
              <img
                src={
                  poke.sprites.other['official-artwork'].front_default ||
                  poke.sprites.front_default
                }
                alt={poke.name}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-4"
              />
              <h3 className="text-lg sm:text-xl font-bold capitalize mb-2 text-gray-700">
                {poke.name}
              </h3>

              {/* Tipos */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {poke.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-1 rounded-full text-white text-sm font-semibold shadow 
                    ${typeColors[type.type.name]}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Estatísticas */}
              <ul className="w-full space-y-2">
                {poke.stats.map((stat) => (
                  <li key={stat.stat.name} className="flex justify-between items-center text-sm sm:text-base">
                    <span className="capitalize text-gray-600 w-1/2">
                      {stat.stat.name.replace('-', ' ')}:
                    </span>
                    <div className="flex items-center gap-2 w-1/2">
                      <span className="font-bold text-gray-900">{stat.base_stat}</span>
                      <div className="bg-gray-200 h-2 w-full rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(100, stat.base_stat)}%` }}
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gráfico comparativo */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Gráfico de Comparação
          </h3>
          <div className="overflow-x-auto">
            <ComparisonChart pokemon1={pokemon1} pokemon2={pokemon2} />
          </div>
        </div>
      </div>
    </div>
  );
};
