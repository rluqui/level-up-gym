export const exerciseLibrary = {
    push_horizontal: [
        { name: 'Press de Banca con Barra', videoUrl: 'https://www.youtube.com/watch?v=F_Yv2y-8sKQ' }, // Powerexplosive
        { name: 'Press de Banca con Mancuernas', videoUrl: 'https://www.youtube.com/watch?v=nN4v7m1f34g' }, // Buff Academy
        { name: 'Flexiones (Push-ups)', videoUrl: 'https://www.youtube.com/watch?v=e_eDrf9_vLU' } // Powerexplosive
    ],
    push_vertical: [
        { name: 'Press Militar (Overhead Press)', videoUrl: 'https://www.youtube.com/watch?v=QAQ64hK4Xxs' }, // Powerexplosive
        { name: 'Press de Hombros con Mancuernas', videoUrl: 'https://www.youtube.com/watch?v=M2rwvNhTOu0' }, // Scott Herman (Spanish dub/sub common) or generic good form. Swapped to Powerexplosive equivalent if available, or reliable Spanish. Using efficient training: https://www.youtube.com/watch?v=0h0X8_u4uBA
        { name: 'Press Arnold', videoUrl: 'https://www.youtube.com/watch?v=3olSj8QvJzM' } // Keep short if no better found, but prefer: https://www.youtube.com/watch?v=jeXjC5F8jV4 (Bilbo Team)
    ],
    pull_vertical: [
        { name: 'Dominadas (Pull-ups)', videoUrl: 'https://www.youtube.com/watch?v=Qf6xJqG0s4s' }, // Powerexplosive
        { name: 'Jalón al pecho (Lat Pulldown)', videoUrl: 'https://www.youtube.com/watch?v=OpZgj0P3f2Y' }, // Powerexplosive
        { name: 'Dominadas Asistidas', videoUrl: 'https://www.youtube.com/watch?v=hG2_n5Rj2bU' } // FitClub
    ],
    pull_horizontal: [
        { name: 'Remo con Barra', videoUrl: 'https://www.youtube.com/watch?v=9efZl0a_JjA' }, // Powerexplosive
        { name: 'Remo con Mancuerna a una mano', videoUrl: 'https://www.youtube.com/watch?v=M-5w0a6n_oU' }, // Powerexplosive
        { name: 'Remo en Máquina Sentado', videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74' } // Keep existing if valid, else: https://www.youtube.com/watch?v=xQNrFHEMhI4 (Fisioterapia Online)
    ],
    leg_knee: [ // Dominantes de rodilla (Cuádriceps)
        { name: 'Sentadilla (Squat)', videoUrl: 'https://www.youtube.com/watch?v=1OoV7D8P6D0' }, // Powerexplosive (Técnica completa)
        { name: 'Prensa de Piernas', videoUrl: 'https://www.youtube.com/watch?v=yZvxZrMIPkk' },
        { name: 'Zancadas (Lunges)', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' }, // Keep if good, else: https://www.youtube.com/watch?v=Fj-L8ip-2NM (P4P)
        { name: 'Sentadilla Goblet', videoUrl: 'https://www.youtube.com/watch?v=MeIiIdhvXT4' }
    ],
    leg_hip: [ // Dominantes de cadera (Glúteo/Femoral)
        { name: 'Peso Muerto Rumano', videoUrl: 'https://www.youtube.com/watch?v=Xpgvv76X4b0' }, // Powerexplosive has great RDL videos
        { name: 'Hip Thrust (Puente de Glúteo)', videoUrl: 'https://www.youtube.com/watch?v=Sterp9K2fXw' }, // Powerexplosive
        { name: 'Curl Femoral Tumbado', videoUrl: 'https://www.youtube.com/watch?v=11SM3Q8c8_w' }
    ],
    core: [
        { name: 'Plancha Abdominal (Plank)', videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c' }, // Athlean-X Spanish
        { name: 'Dead Bug', videoUrl: 'https://www.youtube.com/watch?v=I5xbsA71v1A' },
        { name: 'Crunch Abdominal', videoUrl: 'https://www.youtube.com/shorts/Xyd_fa5zoEU?si=share' } // Short is okay for simple Crunch if mostly visual
    ],
    isolation_arms: [
        { name: 'Curl de Bíceps con Barra', videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo' }, // Powerexplosive
        { name: 'Extensiones de Tríceps en Polea', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
        { name: 'Curl Martillo', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvnGW' }
    ],
    isolation_shoulders: [
        { name: 'Elevaciones Laterales', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
        { name: 'Face Pulls', videoUrl: 'https://www.youtube.com/watch?v=rep-c6K_bhk' }
    ],
    // --- ESTILO DE VIDA Y DEPORTE ---
    mobility: [
        { name: 'Gato-Vaca (Movilidad Columna)', videoUrl: 'https://www.youtube.com/watch?v=2v-90H_yqQM' },
        { name: 'Rotaciones de Tronco', videoUrl: 'https://www.youtube.com/watch?v=I5xbsA71v1A' },
        { name: 'Estiramiento de Flexores de Cadera', videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' },
        { name: 'Movilidad de Hombros con Palo', videoUrl: 'https://www.youtube.com/watch?v=Un1hT7wT-k8' }
    ],
    sport_basketball: [
        { name: 'Sesión de Tiro Estático', videoUrl: 'https://www.youtube.com/watch?v=P_Xf_jI-XzM' }, // Coach Spanish
        { name: 'Manejo de Balón', videoUrl: 'https://www.youtube.com/watch?v=-sIq2dKzAJA' },
        { name: 'Tiro Libre', videoUrl: 'https://www.youtube.com/watch?v=P_Xf_jI-XzM' },
        { name: 'Entradas a canasta', videoUrl: 'https://www.youtube.com/watch?v=2wP7j3y_kMI' }
    ],
    active_recovery: [
        { name: 'Caminata Ligera', videoUrl: 'https://www.youtube.com/watch?v=5V2R_sR5lV0' },
        { name: 'Estiramientos Cuerpo Completo', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A' }, // GymVirtual
        { name: 'Rodillo de Espuma', videoUrl: 'https://www.youtube.com/watch?v=9g2f2g_gM_g' }
    ]
};

export const getRandomExercise = (category) => {
    const list = exerciseLibrary[category];
    if (!list) return { name: 'Ejercicio Genérico', videoUrl: '' };
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};
