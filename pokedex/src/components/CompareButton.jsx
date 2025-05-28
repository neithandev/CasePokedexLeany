import { useCompareStore } from '../stores/compareStore';

export const CompareButton = ({ pokemon }) => {
    const { compareList, addToCompare, removeFromCompare } = useCompareStore();
    const isComparing = compareList.some(p => p.id === pokemon.id);

    const handleClick = (e) => {
        e.stopPropagation(); // Impede a propagação do evento
        isComparing ? removeFromCompare(pokemon.id) : addToCompare(pokemon);
    };

    return (
        <button
            onClick={handleClick}
            className={`px-2 py-2 rounded-full text-[10px] flex-shrink-0 ml-2 cursor-pointer ${isComparing
                ? 'bg-rose-900 text-white hover:bg-rose-950'
                : 'bg-white/80 text-white hover:bg-yellow-900'
                }`}
        >
            <span className="text-lg">  {/* ou text-xl, text-2xl conforme necessário */}
                {isComparing ? '❌' : '🆚'}
            </span>
        </button>
    );
};