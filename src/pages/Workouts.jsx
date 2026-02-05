import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import { FolderOpen, Zap, RefreshCw } from 'lucide-react';
import { generateRoutine } from '../utils/routineGenerator';
import { workoutsDetails } from '../data/workouts';

const Workouts = () => {
    const navigate = useNavigate();

    const workoutsData = [
        {
            id: 1,
            title: 'Cuerpo Completo - Inicio',
            duration: '45 min',
            level: 'Principiante',
            imageColor: '#38BDF8' // Sky
        },
        {
            id: 2,
            title: 'Fuerza Superior',
            duration: '60 min',
            level: 'Intermedio',
            imageColor: '#F97316' // Orange
        },
        {
            id: 3,
            title: 'Cardio HIIT',
            duration: '30 min',
            level: 'Principiante',
            imageColor: '#22C55E' // Green
        }
    ];

    const [activeTab, setActiveTab] = useState('library'); // 'library' (Importadas) | 'ai' (Sugeridas)
    const [generatedRoutines, setGeneratedRoutines] = useState([]);

    // Cargar perfil
    const userProfile = JSON.parse(localStorage.getItem('levelUp_userProfile')) || { level: 'beginner', days: 3, goal: 'strength' };

    useEffect(() => {
        // Generar rutinas iniciales al montar
        loadAiRoutines();
    }, []);

    const loadAiRoutines = () => {
        const routines = generateRoutine(userProfile);
        setGeneratedRoutines(Object.values(routines));
    };

    // Convert object to array for mapping imported routines
    const importedWorkouts = Object.values(workoutsDetails);

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <header style={{ marginBottom: '1.5rem' }}>
                <h1>Entrenar</h1>
                <p className="text-muted">Elige tu plan de batalla</p>
            </header>

            {/* Pestañas de Navegación */}
            <div className="flex gap-2" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--color-bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                <button
                    className={`btn ${activeTab === 'library' ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1, fontSize: '0.9rem' }}
                    onClick={() => setActiveTab('library')}
                >
                    <FolderOpen size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    Importadas
                </button>
                <button
                    className={`btn ${activeTab === 'ai' ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ flex: 1, fontSize: '0.9rem' }}
                    onClick={() => setActiveTab('ai')}
                >
                    <Zap size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    AI Coach
                </button>
            </div>

            {/* Contenido Dinámico */}
            {activeTab === 'ai' && (
                <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Sugeridas para ti</h3>
                        <button
                            onClick={loadAiRoutines}
                            className="text-primary flex items-center gap-1"
                            style={{ background: 'none', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            <RefreshCw size={14} />
                            Variar Ejercicios
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {generatedRoutines.map(workout => (
                            <WorkoutCard
                                key={workout.id}
                                title={workout.title}
                                duration="40-50 min"
                                level={userProfile.level === 'beginner' ? 'Principiante' : 'Intermedio'}
                                imageColor={workout.imageColor}
                                onClick={() => navigate(`/workouts/ai-${workout.id}`, { state: { workoutData: workout, isAi: true } })}
                            />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'library' && (
                <div className="animate-fade-in">
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Biblioteca Importada</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {importedWorkouts.map(workout => (
                            <WorkoutCard
                                key={workout.id}
                                title={workout.title}
                                duration="60 min"
                                level="Genetic"
                                imageColor={workout.imageColor}
                                onClick={() => navigate(`/workouts/${workout.id}`)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workouts;
