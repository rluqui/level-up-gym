export const workoutsDetails = {
    1: {
        id: 1,
        title: 'Lunes: Piernas (Cuádriceps, Femorales, Pantorrillas)',
        description: 'Día enfocado en construir una base sólida. Trabajo intenso de pierna completa.',
        imageColor: 'from-orange-500 to-red-600',
        exercises: [
            {
                name: 'Prensa 45° o Sentadillas',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=wpHk7S4eF5I', // User suggestion for Prensa 45
                muscles: 'Cuádriceps, Glúteos',
                benefits: 'El rey de los ejercicios. Construye masa y fuerza general en todo el tren inferior.'
            },
            {
                name: 'Estocadas con mancuernas',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', // Valid Zancadas video
                muscles: 'Cuádriceps, Glúteos, Aductores',
                benefits: 'Mejora la estabilidad, el equilibrio y corrige desequilibrios musculares.'
            },
            {
                name: 'Extensión en sillón',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0', // Keep short if clear, or: HMBbL2eN1qQ
                muscles: 'Cuádriceps (Recto femoral)',
                benefits: 'Aísla el cuádriceps para un máximo detalle y separación muscular.'
            },
            {
                name: 'Camilla boca abajo (Femoral)',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=11SM3Q8c8_w',
                muscles: 'Isquiosurales (Femorales)',
                benefits: 'Desarrolla la parte posterior de la pierna, crucial para la estética lateral y prevención de lesiones.'
            },
            {
                name: 'Pantorrillas Sentado',
                sets: 5,
                reps: '15',
                videoUrl: 'https://www.youtube.com/watch?v=3i6c8s-YvCw',
                muscles: 'Sóleo',
                benefits: 'Trabaja el sóleo, dando anchura a la pantorrilla vista de frente.'
            },
            {
                name: 'Pantorrillas Parado',
                sets: 5,
                reps: '15',
                videoUrl: 'https://www.youtube.com/watch?v=N3t1Wp_hDpI',
                muscles: 'Gastrocnemio',
                benefits: 'Ataca el músculo visible más grande de la pantorrilla (forma de diamante).'
            }
        ]
    },
    2: {
        id: 2,
        title: 'Martes: Pecho y Tríceps',
        description: 'Combinación clásica de empuje para desarrollar un torso superior poderoso.',
        imageColor: 'from-blue-500 to-cyan-500',
        exercises: [
            {
                name: 'Press banco plano',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=F_Yv2y-8sKQ', // Powerexplosive
                muscles: 'Pectoral Mayor, Tríceps, Deltoides',
                benefits: 'Ejercicio compuesto fundamental para ganar volumen y fuerza en el pecho.'
            },
            {
                name: 'Press banco inclinado',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=jW0Nfw2s01o', // Powerexplosive
                muscles: 'Pectoral Superior, Deltoides Anterior',
                benefits: 'Llena la parte superior del pecho, dando esa apariencia de "armadura".'
            },
            {
                name: 'Apertura banco plano',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
                muscles: 'Pectoral Mayor (Estiramiento)',
                benefits: 'Enfatiza el estiramiento del pecho y ayuda a expandir la caja torácica.'
            },
            {
                name: 'Tríceps Polea alta (Pushdown)',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
                muscles: 'Tríceps (Cabeza Lateral)',
                benefits: 'Aísla el tríceps para conseguir esa forma de "herradura" característica.'
            },
            {
                name: 'Tríceps tras nuca (Cables/Mancuerna)',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=P1z-vSgR-Z8',
                muscles: 'Tríceps (Cabeza Larga)',
                benefits: 'Trabaja la cabeza larga del tríceps, que da la mayor parte del volumen al brazo.'
            }
        ]
    },
    3: {
        id: 3,
        title: 'Jueves: Espalda y Bíceps',
        description: 'Enfocado en la amplitud (forma de V) y densidad de la espalda, rematando con brazos.',
        imageColor: 'from-emerald-500 to-green-600',
        exercises: [
            {
                name: 'Polea alta (Lat Pulldown)',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=OpZgj0P3f2Y', // Powerexplosive
                muscles: 'Dorsal Ancho',
                benefits: 'Clave para ensanchar la espalda superior y lograr la forma de V.'
            },
            {
                name: 'Polea baja (Remo sentado)',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
                muscles: 'Espalda Media, Romboides',
                benefits: 'Añade densidad y grosor a la espalda media.'
            },
            {
                name: 'Remo 90° con barra',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=9efZl0a_JjA', // Powerexplosive
                muscles: 'Espalda Completa, Lumbares',
                benefits: 'Potente constructor de fuerza y masa para toda la cadena posterior.'
            },
            {
                name: 'Pullover con mancuerna',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=8w7k5q4s5-w',
                muscles: 'Dorsales, Serratos, Pecho',
                benefits: 'Trabaja la conexión mente-músculo de los dorsales y mejora la postura.'
            },
            {
                name: 'Bíceps Barra EZ parado',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo', // Powerexplosive
                muscles: 'Bíceps Braquial',
                benefits: 'El mejor ejercicio para masa general del bíceps.'
            },
            {
                name: 'Mancuernas banco 45°',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=9fItIqIVlGg',
                muscles: 'Bíceps (Cabeza Larga)',
                benefits: 'Pone el bíceps en estiramiento máximo, estimulando el crecimiento desde otro ángulo.'
            }
        ]
    },
    4: {
        id: 4,
        title: 'Viernes: Hombros y Trapecios',
        description: 'Construyendo hombros 3D para una silueta estética y atlética.',
        imageColor: 'from-purple-500 to-indigo-600',
        exercises: [
            {
                name: 'Press con barra sentado',
                sets: 5,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=QAQ64hK4Xxs', // Powerexplosive
                muscles: 'Deltoides Anterior y Medio',
                benefits: 'Fundamental para hombros grandes y fuertes.'
            },
            {
                name: 'Vuelos laterales sentado',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
                muscles: 'Deltoides Lateral',
                benefits: 'El único ejercicio que realmente te hace ver más ancho de hombros.'
            },
            {
                name: 'Elevaciones frontales manc.',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=-t7fuZb_t2M',
                muscles: 'Deltoides Anterior',
                benefits: 'Aísla la parte frontal del hombro para un look completo.'
            },
            {
                name: 'Remo barra al mentón',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=j5s6lc3L_aE',
                muscles: 'Trapecios, Hombros',
                benefits: 'Conecta visualmente los hombros con el cuello.'
            },
            {
                name: 'Qué me importa (Encogimientos)',
                sets: 4,
                reps: '10',
                videoUrl: 'https://www.youtube.com/watch?v=g6qdq7_jA-w',
                muscles: 'Trapecio Superior',
                benefits: 'Desarrolla la "montaña" del cuello.'
            },
            {
                name: 'Elevaciones de tronco (Crunch)',
                sets: 5,
                reps: '25',
                videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
                muscles: 'Recto Abdominal',
                benefits: 'Fortalece el núcleo y define los "cuadritos".'
            },
            {
                name: 'Elevaciones de piernas',
                sets: 5,
                reps: '25',
                videoUrl: 'https://www.youtube.com/watch?v=_OQUY55Pqj8',
                muscles: 'Abdominales Inferiores',
                benefits: 'Ataca la zona más difícil del abdomen bajo.'
            }
        ]
    }
};

export default workoutsDetails;
