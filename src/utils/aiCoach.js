export const getRecommendedFrequency = (level) => {
    if (level === 'beginner') return 3;
    if (level === 'intermediate') return 4;
    if (level === 'advanced') return 5;
    return 3;
};

export const getFrequencyFeedback = (level, selectedDays) => {
    const recommended = getRecommendedFrequency(level);

    if (selectedDays === recommended) {
        return {
            status: 'optimal',
            message: '¡Excelente elección! Esta frecuencia es ideal para tu nivel.',
            pros: ['Recuperación óptima', 'Progreso sostenido', 'Adherencia fácil'],
            cons: []
        };
    }

    if (level === 'beginner' && selectedDays > 3) {
        return {
            status: 'warning',
            message: `⚠️ Para un principiante, ${selectedDays} días puede ser excesivo.`,
            pros: ['Creación rápida de hábito'],
            cons: ['Alto riesgo de sobreentrenamiento', 'Menor recuperación = Menos músculo', 'Posible agotamiento mental']
        };
    }

    if (level === 'beginner' && selectedDays < 3) {
        return {
            status: 'warning',
            message: '⚠️ 2 días es poco estímulo para ver cambios rápidos.',
            pros: ['Muy poco tiempo requerido', 'Fácil de mantener'],
            cons: ['Progreso muy lento', 'Dificultad para aprender técnica (poca práctica)']
        };
    }

    if (level === 'intermediate' && selectedDays < 4) {
        return {
            status: 'neutral',
            message: 'Es una frecuencia aceptable, aunque podrías tolerar más volumen.',
            pros: ['Buena recuperación', 'Flexible con tu agenda'],
            cons: ['Podrías estar progresando más rápido con un día extra']
        };
    }

    return {
        status: 'neutral',
        message: `Has elegido ${selectedDays} días. Asegúrate de comer y dormir bien.`,
        pros: ['Personalizado a tu gusto'],
        cons: ['Requiere disciplina extra']
    };
};

export const analyzeImportedRoutine = (workout, userProfile) => {
    const alerts = [];
    const strengths = [];

    // 1. Análisis de Volumen
    const totalSets = workout.exercises.reduce((acc, ex) => acc + (ex.sets || 3), 0);

    if (totalSets > 20 && userProfile.level === 'beginner') {
        alerts.push({
            type: 'danger',
            title: 'Volumen Excesivo',
            text: 'Más de 20 series por sesión es contraproducente para principiantes. Gran parte será "volumen basura".'
        });
    } else if (totalSets > 15 && userProfile.level === 'beginner') {
        alerts.push({
            type: 'warning',
            title: 'Volumen Alto',
            text: '15-20 series es el límite superior. Asegúrate de descansar bien.'
        });
    } else {
        strengths.push('Volumen de entrenamiento adecuado.');
    }

    // 2. Análisis de Seguridad
    const dangerousKeywords = ['tras nuca', 'al mentón', 'biol']; // Ejemplos
    const hasDangerousEx = workout.exercises.some(ex =>
        dangerousKeywords.some(kw => ex.name.toLowerCase().includes(kw))
    );

    if (hasDangerousEx) {
        alerts.push({
            type: 'danger',
            title: 'Ejercicios Controvertidos',
            text: 'Detectamos ejercicios (como "tras nuca") que pueden ser lesivos para el hombro en algunas personas.'
        });
    }

    // 3. Balance (Simple check)
    const hasLegs = workout.exercises.some(ex => /pierna|sentadilla|prensa/i.test(ex.name));
    const hasUpper = workout.exercises.some(ex => /press|remo|jalón/i.test(ex.name));

    if (!hasLegs && !hasUpper) {
        // Asumimos que es específica, pero si es 'Full Body' declarada...
        // Por ahora lo dejamos pasar como rutina dividida (specifc days)
    }

    return { alerts, strengths };
};
