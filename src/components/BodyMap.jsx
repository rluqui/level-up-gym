import React from 'react';

const BodyMap = ({ highlight }) => {
    // Normalización de nombres de músculos para coincidir con los IDs del SVG
    // Input esperado: "Cuádriceps", "Isquiosurales", "Glúteos", "Gemelos", "Pectoral", etc.
    const active = highlight ? highlight.toLowerCase() : '';

    const getColor = (muscleName) => {
        // Mapeo flexible de términos
        if (active.includes('cuádriceps') || active.includes('quadriceps')) return muscleName === 'quads' ? '#ef4444' : '#374151';
        if (active.includes('isquios') || active.includes('femoral')) return muscleName === 'hamstrings' ? '#ef4444' : '#374151';
        if (active.includes('glúteo') || active.includes('glutes')) return muscleName === 'glutes' ? '#ef4444' : '#374151';
        if (active.includes('gemelo') || active.includes('sóleo') || active.includes('pantorrilla')) return muscleName === 'calves' ? '#ef4444' : '#374151';
        if (active.includes('pectoral') || active.includes('pecho')) return muscleName === 'chest' ? '#ef4444' : '#374151';
        if (active.includes('dorsal') || active.includes('espalda')) return muscleName === 'back' ? '#ef4444' : '#374151';
        if (active.includes('hombro') || active.includes('deltoides')) return muscleName === 'shoulders' ? '#ef4444' : '#374151';
        if (active.includes('bíceps')) return muscleName === 'biceps' ? '#ef4444' : '#374151';
        if (active.includes('tríceps')) return muscleName === 'triceps' ? '#ef4444' : '#374151';
        if (active.includes('abdomen') || active.includes('core')) return muscleName === 'abs' ? '#ef4444' : '#374151';

        return '#374151'; // Color por defecto (gris oscuro)
    };

    return (
        <div className="flex justify-center gap-4" style={{ height: '300px' }}>
            {/* VISTA FRONTAL */}
            <svg viewBox="0 0 200 450" style={{ height: '100%', maxWidth: '140px' }}>
                {/* Cabeza */}
                <circle cx="100" cy="30" r="20" fill="#9ca3af" />

                {/* Cuello */}
                <rect x="90" y="50" width="20" height="15" fill="#9ca3af" />

                {/* Hombros (Deltoides) */}
                <path d="M70 65 Q 50 80 50 110 L 70 110 Z" fill={getColor('shoulders')} />
                <path d="M130 65 Q 150 80 150 110 L 130 110 Z" fill={getColor('shoulders')} />

                {/* Pecho (Pectorales) */}
                <path d="M70 70 L 130 70 L 120 110 L 80 110 Z" fill={getColor('chest')} />

                {/* Brazos (Bíceps) */}
                <path d="M50 110 L 40 150 L 60 150 L 70 110 Z" fill={getColor('biceps')} />
                <path d="M150 110 L 160 150 L 140 150 L 130 110 Z" fill={getColor('biceps')} />

                {/* Abdomen (Abs) */}
                <path d="M80 110 L 120 110 L 115 170 L 85 170 Z" fill={getColor('abs')} />

                {/* Piernas (Cuádriceps) */}
                <path d="M75 180 L 125 180 L 120 280 L 80 280 Z" fill={getColor('quads')} />

                {/* Pantorrillas (Vista frontal - Tibial/Parte del gemelo visible) */}
                <path d="M80 290 L 120 290 L 115 380 L 85 380 Z" fill={getColor('calves')} />
            </svg>

            {/* VISTA TRASERA */}
            <svg viewBox="0 0 200 450" style={{ height: '100%', maxWidth: '140px' }}>
                {/* Cabeza */}
                <circle cx="100" cy="30" r="20" fill="#9ca3af" />
                <rect x="90" y="50" width="20" height="15" fill="#9ca3af" />

                {/* Espalda (Dorsales/Trapecios) */}
                <path d="M70 65 L 130 65 L 115 150 L 85 150 Z" fill={getColor('back')} />

                {/* Hombros Traseros */}
                <path d="M60 70 Q 50 80 50 100 L 70 100 Z" fill={getColor('shoulders')} />
                <path d="M140 70 Q 150 80 150 100 L 130 100 Z" fill={getColor('shoulders')} />


                {/* Tríceps */}
                <path d="M50 100 L 45 150 L 65 150 L 70 100 Z" fill={getColor('triceps')} />
                <path d="M150 100 L 155 150 L 135 150 L 130 100 Z" fill={getColor('triceps')} />

                {/* Glúteos */}
                <path d="M75 160 L 125 160 L 125 210 Q 100 230 75 210 Z" fill={getColor('glutes')} />

                {/* Femorales (Isquios) */}
                <path d="M75 215 L 125 215 L 120 285 L 80 285 Z" fill={getColor('hamstrings')} />

                {/* Gemelos (Calves - Vista trasera principal) */}
                <path d="M80 295 L 120 295 L 115 370 L 85 370 Z" fill={getColor('calves')} />
            </svg>
        </div>
    );
};

export default BodyMap;
