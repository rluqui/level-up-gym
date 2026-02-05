import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { Trophy } from 'lucide-react';

const LevelProgress = () => {
    const { level, getLevelProgress } = useGamification();
    const { currentLevelXp, nextLevelXp, percentage } = getLevelProgress();

    return (
        <div className="bg-[var(--color-bg-secondary)] px-4 py-3 border-b border-[var(--color-bg-tertiary)] sticky top-0 z-40 shadow-lg">
            <div className="flex justify-between items-end mb-1">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Trophy size={20} className="text-yellow-500" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <span className="text-xs text-muted font-bold uppercase tracking-wider">Nivel {level}</span>
                        <div className="text-sm font-bold text-white leading-none">Novato de Hierro</div>
                    </div>
                </div>
                <div className="text-xs text-muted font-mono">
                    {currentLevelXp} / {nextLevelXp} XP
                </div>
            </div>

            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default LevelProgress;
