
import { getRandomExercise } from '../data/exerciseLibrary';

export const generateRoutine = (profile) => {
    const { level, days, goal, age, sport } = profile;
    const routines = {};
    const isSenior = age >= 50;
    const playsBasketball = sport === 'basketball';

    // Función helper para crear sesiones
    const createSession = (id, title, desc, color, exercises) => ({
        id, title, description: desc, imageColor: color, exercises
    });

    let currentId = 20; // Empezamos en 20 para evitar conflictos

    // ESTRATEGIA: 3 DÍAS (Ideal para Gym + Deporte/Vida)
    if (days <= 3) {
        // Día 1: Gym Full Body (Controlado)
        routines[currentId] = createSession(
            currentId++,
            'Día 1: Fuerza Base (Gym)',
            isSenior ? 'Enfoque en salud articular y fuerza funcional.' : 'Cuerpo completo básico.',
            'from-blue-600 to-cyan-400',
            [
                { ...getRandomExercise('leg_knee'), sets: 3, reps: isSenior ? '12-15' : '8-10', muscles: 'Cuádriceps', benefits: 'Piernas fuertes.' },
                { ...getRandomExercise('push_horizontal'), sets: 3, reps: '10-12', muscles: 'Pecho', benefits: 'Empuje.' },
                { ...getRandomExercise('pull_vertical'), sets: 3, reps: '10-12', muscles: 'Espalda', benefits: 'Postura.' },
                { ...getRandomExercise('core'), sets: 3, reps: '20s', muscles: 'Core', benefits: 'Estabilidad.' }
            ]
        );

        // Día 2: COMPLEMENTARIO (Deporte o Movilidad)
        if (playsBasketball) {
            routines[currentId] = createSession(
                currentId++,
                'Día 2: Técnica Básquet 🏀',
                'Sesión de bajo impacto para mantener el toque sin fatigar piernas.',
                'from-orange-500 to-amber-500',
                [
                    { ...getRandomExercise('sport_basketball'), sets: 1, reps: '20 min', muscles: 'Coordinación', benefits: 'Técnica.' },
                    { ...getRandomExercise('mobility'), sets: 1, reps: '10 min', muscles: 'Articulaciones', benefits: 'Prevención lesiones.' },
                    { ...getRandomExercise('sport_basketball'), sets: 1, reps: '15 min', muscles: 'Tiro', benefits: 'Precisión.' }
                ]
            );
        } else {
            // Si no hace deporte, día de movilidad/cardio suave
            routines[currentId] = createSession(
                currentId++,
                'Día 2: Movilidad y Salud 🧘',
                'Recuperación activa y salud articular.',
                'from-teal-500 to-green-400',
                [
                    { ...getRandomExercise('mobility'), sets: 2, reps: '10 reps', muscles: 'Todo el cuerpo', benefits: 'Fluidez.' },
                    { ...getRandomExercise('active_recovery'), sets: 1, reps: '30 min', muscles: 'Corazón', benefits: 'Salud cardiovascular.' },
                    { ...getRandomExercise('core'), sets: 3, reps: '15', muscles: 'Abdomen', benefits: 'Soporte lumbar.' }
                ]
            );
        }

        // Día 3: Gym Full Body B
        routines[currentId] = createSession(
            currentId++,
            'Día 3: Fuerza & Estabilidad (Gym)',
            'Refuerzo de patrones de movimiento.',
            'from-indigo-600 to-purple-500',
            [
                { ...getRandomExercise('leg_hip'), sets: 3, reps: '10-12', muscles: 'Glúteo/Femoral', benefits: 'Cadena posterior.' },
                { ...getRandomExercise('push_vertical'), sets: 3, reps: '10-12', muscles: 'Hombros', benefits: 'Salud de hombros.' },
                { ...getRandomExercise('pull_horizontal'), sets: 3, reps: '10-12', muscles: 'Espalda Media', benefits: 'Corrección postural.' },
                { ...getRandomExercise('isolation_arms'), sets: 2, reps: '15', muscles: 'Brazos', benefits: 'Estética.' }
            ]
        );

    } else {
        // 4+ DÍAS: Estructura Híbrida
        // ... (Lógica similar expandida para más días)
        // Por brevedad, aplicamos una lógica simple de "Más Gym" pero manteniendo el día complementario
        routines[currentId] = createSession(currentId++, 'Día 1: Torso (Gym)', 'Fuerza superior.', 'from-red-500 to-orange-600', [
            { ...getRandomExercise('push_horizontal'), sets: 4, reps: '8' },
            { ...getRandomExercise('pull_vertical'), sets: 4, reps: '8' }
        ]);
        routines[currentId] = createSession(currentId++, 'Día 2: Pierna (Gym)', 'Fuerza inferior.', 'from-emerald-500 to-teal-600', [
            { ...getRandomExercise('leg_knee'), sets: 4, reps: '10' },
            { ...getRandomExercise('leg_hip'), sets: 3, reps: '12' }
        ]);

        // El día complementario siempre presente
        if (playsBasketball) {
            routines[currentId] = createSession(currentId++, 'Día 3: Básquet & Agilidad', 'Cancha.', 'from-orange-400 to-yellow-500', [
                { ...getRandomExercise('sport_basketball'), sets: 1, reps: '45 min' }
            ]);
        } else {
            routines[currentId] = createSession(currentId++, 'Día 3: Cardio & Core', 'Resistencia.', 'from-blue-400 to-indigo-500', [
                { ...getRandomExercise('active_recovery'), sets: 1, reps: '40 min' }
            ]);
        }

        routines[currentId] = createSession(currentId++, 'Día 4: Full Body (Gym)', 'Recordatorio muscular.', 'from-purple-600 to-pink-500', [
            { ...getRandomExercise('push_vertical'), sets: 3, reps: '12' },
            { ...getRandomExercise('pull_horizontal'), sets: 3, reps: '12' },
            { ...getRandomExercise('leg_knee'), sets: 3, reps: '15' }
        ]);
    }

    return routines;
};

