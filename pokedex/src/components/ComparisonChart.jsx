export const ComparisonChart = ({ pokemon1, pokemon2 }) => {
  const stats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

  return (
    <div className="space-y-4">
      {stats.map((stat) => (
        <div key={stat} className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="capitalize text-sm font-medium">
              {stat.replace('-', ' ')}:
            </span>
            <span className="text-xs text-gray-500">
              {pokemon1.stats.find(s => s.stat.name === stat)?.base_stat || 0} vs {pokemon2.stats.find(s => s.stat.name === stat)?.base_stat || 0}
            </span>
          </div>
          <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500" 
              style={{ width: `${(pokemon1.stats.find(s => s.stat.name === stat)?.base_stat / 255) * 100}%` }}
            ></div>
            <div 
              className="bg-red-500" 
              style={{ width: `${(pokemon2.stats.find(s => s.stat.name === stat)?.base_stat / 255) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};