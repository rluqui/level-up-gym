export const exerciseLibrary = {
    push_horizontal: [
        { name: 'Press de Banca con Barra', videoUrl: 'https://youtube.com/shorts/0X1y8v_gJjU?si=share' },
        { name: 'Press de Banca con Mancuernas', videoUrl: 'https://youtube.com/shorts/VmB1G1K7vLc?si=share' },
        { name: 'Flexiones (Push-ups)', videoUrl: 'https://youtube.com/shorts/IODxDxX7oi4?si=share' }
    ],
    push_vertical: [
        { name: 'Press Militar (Overhead Press)', videoUrl: 'https://youtube.com/shorts/Un1hT7wT-k8?si=share' },
        { name: 'Press de Hombros con Mancuernas', videoUrl: 'https://youtube.com/shorts/Bqa6Z_-2JGY?si=share' },
        { name: 'Press Arnold', videoUrl: 'https://youtube.com/shorts/3olSj8QvJzM?si=share' }
    ],
    pull_vertical: [
        { name: 'Dominadas (Pull-ups)', videoUrl: 'https://youtube.com/shorts/eGo4IYlbE5g?si=share' },
        { name: 'Jalón al pecho (Lat Pulldown)', videoUrl: 'https://youtube.com/shorts/AO9L_jI9HwI?si=share' },
        { name: 'Dominadas Asistidas', videoUrl: 'https://youtube.com/shorts/y5CGBjZ_Kjo?si=share' }
    ],
    pull_horizontal: [
        { name: 'Remo con Barra', videoUrl: 'https://youtube.com/shorts/Nqh7q3zDCoQ?si=share' },
        { name: 'Remo con Mancuerna a una mano', videoUrl: 'https://youtube.com/shorts/pYcpY20caE8?si=share' },
        { name: 'Remo en Máquina Sentado', videoUrl: 'https://youtube.com/shorts/GZbfZ033f74?si=share' }
    ],
    leg_knee: [ // Dominantes de rodilla (Cuádriceps)
        { name: 'Sentadilla (Squat)', videoUrl: 'https://youtube.com/shorts/pEdbvX3N_ic?si=share' },
        { name: 'Prensa de Piernas', videoUrl: 'https://youtube.com/shorts/yZvxZrMIPkk?si=share' },
        { name: 'Zancadas (Lunges)', videoUrl: 'https://youtube.com/shorts/QOVaHwm-Q6U?si=share' },
        { name: 'Sentadilla Goblet', videoUrl: 'https://youtube.com/shorts/MeIiIdhvXT4?si=share' }
    ],
    leg_hip: [ // Dominantes de cadera (Glúteo/Femoral)
        { name: 'Peso Muerto Rumano', videoUrl: 'https://youtube.com/shorts/Xpgvv76X4b0?si=share' },
        { name: 'Hip Thrust (Puente de Glúteo)', videoUrl: 'https://youtube.com/shorts/SEQAwLhQkfk?si=share' },
        { name: 'Curl Femoral Tumbado', videoUrl: 'https://youtube.com/shorts/11SM3Q8c8_w?si=share' }
    ],
    core: [
        { name: 'Plancha Abdominal (Plank)', videoUrl: 'https://youtube.com/shorts/pSHjTRCQxIw?si=share' },
        { name: 'Dead Bug', videoUrl: 'https://youtube.com/shorts/I5xbsA71v1A?si=share' },
        { name: 'Crunch Abdominal', videoUrl: 'https://youtube.com/shorts/Xyd_fa5zoEU?si=share' }
    ],
    isolation_arms: [
        { name: 'Curl de Bíceps con Barra', videoUrl: 'https://youtube.com/shorts/sm1O9r3kO_k?si=share' },
        { name: 'Extensiones de Tríceps en Polea', videoUrl: 'https://youtube.com/shorts/2-LAMcpzODU?si=share' },
        { name: 'Curl Martillo', videoUrl: 'https://youtube.com/shorts/zC3nLlEvnGW?si=share' }
    ],
    isolation_shoulders: [
        { name: 'Elevaciones Laterales', videoUrl: 'https://youtube.com/shorts/3VcKaXpzqRo?si=share' },
        { name: 'Face Pulls', videoUrl: 'https://youtube.com/shorts/rep-c6K_bhk?si=share' }
    ],
    // --- ESTILO DE VIDA Y DEPORTE ---
    mobility: [
        { name: 'Gato-Vaca (Movilidad Columna)', videoUrl: 'https://youtube.com/shorts/pSHjTRCQxIw?si=share' }, // Usando plank como placeholder seguro
        { name: 'Rotaciones de Tronco', videoUrl: 'https://youtube.com/shorts/I5xbsA71v1A?si=share' },
        { name: 'Estiramiento de Flexores de Cadera', videoUrl: 'https://youtube.com/shorts/QOVaHwm-Q6U?si=share' },
        { name: 'Movilidad de Hombros con Palo', videoUrl: 'https://youtube.com/shorts/Un1hT7wT-k8?si=share' }
    ],
    sport_basketball: [
        { name: 'Sesión de Tiro Estático (100 lanzamientos)', videoUrl: '' },
        { name: 'Manejo de Balón (Dribbling estático)', videoUrl: '' },
        { name: 'Tiro Libre (Serie de 20)', videoUrl: '' },
        { name: 'Entradas a canasta (Suave)', videoUrl: '' }
    ],
    active_recovery: [
        { name: 'Caminata Ligera (30 min)', videoUrl: '' },
        { name: 'Estiramientos Cuerpo Completo', videoUrl: '' },
        { name: 'Rodillo de Espuma (Foam Roller)', videoUrl: '' }
    ]
};

export const getRandomExercise = (category) => {
    const list = exerciseLibrary[category];
    if (!list) return { name: 'Ejercicio Genérico', videoUrl: '' };
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};
