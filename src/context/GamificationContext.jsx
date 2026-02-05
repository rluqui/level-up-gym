import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [showLevelUp, setShowLevelUp] = useState(false);

    useEffect(() => {
        const savedXp = parseInt(localStorage.getItem('levelUp_xp') || '0');
        setXp(savedXp);
        updateLevel(savedXp);
    }, []);

    const updateLevel = (currentXp) => {
        // Fórmula RPG simple: Nivel = floor(0.1 * sqrt(XP)) + 1
        // Ejemplo: 0xp = Lvl 1, 100xp = Lvl 2, 400xp = Lvl 3, 900xp = Lvl 4
        // Ajustamos para que sea más lineal al principio: Lvl * 100 * Lvl ? 
        // Usemos: Nivel = 1 + floor(currentXp / 500) para empezar suave.
        // Mejor: XP necesaria para siguiente nivel = Nivel * 500.

        // Vamos con algo estático y fácil de entender por ahora:
        // Lvl 1: 0-499
        // Lvl 2: 500-1499 (+1000)
        // Lvl 3: 1500-2999 (+1500)

        // Fórmula simple: Cada nivel cuesta 500 * Nivel
        let lvl = 1;
        let cost = 500;
        let tempXp = currentXp;

        while (tempXp >= cost) {
            tempXp -= cost;
            lvl++;
            cost = 500 * lvl; // La dificultad escala
        }

        setLevel(lvl);
        return { level: lvl, currentLevelXp: tempXp, nextLevelCost: cost };
    };

    const addXp = (amount) => {
        const newXp = xp + amount;
        setXp(newXp);
        localStorage.setItem('levelUp_xp', newXp.toString());

        const oldLevel = level;
        const { level: newLevel } = updateLevel(newXp);

        if (newLevel > oldLevel) {
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 4000); // 4 seg de fiesta
        }
    };

    const getLevelProgress = () => {
        // Recalcular para la UI
        let lvl = 1;
        let cost = 500;
        let totalXp = xp;

        while (totalXp >= cost) {
            totalXp -= cost;
            lvl++;
            cost = 500 * lvl;
        }

        return {
            currentLevelXp: totalXp,
            nextLevelXp: cost,
            percentage: (totalXp / cost) * 100,
            level: lvl
        };
    };

    return (
        <GamificationContext.Provider value={{ xp, level, addXp, getLevelProgress, showLevelUp }}>
            {children}
            {showLevelUp && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="text-center animate-bounce">
                        <div className="text-6xl mb-4">🆙🔥</div>
                        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            ¡NIVEL {level}!
                        </h2>
                        <p className="text-white mt-2 font-bold">¡Eres una máquina!</p>
                    </div>
                </div>
            )}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    return useContext(GamificationContext);
};
