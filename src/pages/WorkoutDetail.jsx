import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Repeat, PlayCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { workoutsDetails } from '../data/workouts';
import { analyzeImportedRoutine } from '../utils/aiCoach';
import BodyMap from '../components/BodyMap';
import { useExercises } from '../context/ExercisesContext';

const WorkoutDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener función para URLs dinámicas
    const { getExerciseVideo } = useExercises();

    // Detectar si es AI (viene por state) o Importada (por ID)
    const isAi = location.state?.isAi;
    const workoutData = isAi ? location.state.workoutData : (workoutsDetails[id] || workoutsDetails[1]);

    // Estado para visualización de músculos
    const [hoveredMuscle, setHoveredMuscle] = useState(null);

    // Perfil para análisis
    const userProfile = JSON.parse(localStorage.getItem('levelUp_userProfile')) || { level: 'beginner' };

    // Ejecutar análisis solo si NO es AI (las AI ya son seguras)
    const analysis = !isAi ? analyzeImportedRoutine(workoutData, userProfile) : null;

    return (
        <div style={{ paddingBottom: '100px' }}>
            {/* Header con botón de volver */}
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    className="btn"
                    style={{ padding: '0.5rem', backgroundColor: 'transparent', color: 'var(--color-text-secondary)' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex flex-col">
                    {isAi && <span className="text-xs text-primary font-bold tracking-wider">GENERADO POR AI</span>}
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 0, lineHeight: 1.2 }}>{workoutData.title}</h2>
                </div>
            </div>

            {/* Tarjeta de Análisis (Solo para Importadas) */}
            {analysis && (analysis.alerts.length > 0) && (
                <div className="card animate-fade-in" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-danger)' }}>
                    <div className="flex items-center gap-2 mb-2 text-danger">
                        <AlertTriangle size={20} />
                        <h4 style={{ margin: 0 }}>Análisis del Coach</h4>
                    </div>
                    <ul className="text-sm text-muted list-disc pl-4 space-y-1">
                        {analysis.alerts.map((alert, i) => (
                            <li key={i}>
                                <strong style={{ color: 'var(--color-text-primary)' }}>{alert.title}: </strong>
                                {alert.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <p className="text-muted" style={{ marginBottom: '2rem' }}>{workoutData.description}</p>

            {/* Botón Iniciar (Lógica simple de navegación) */}
            <button
                className="btn btn-primary w-full shadow-lg"
                style={{ marginBottom: '2rem', padding: '1rem' }}
                onClick={() => navigate(`/workouts/${workoutData.id}/active`, { state: { workoutData } })}
            >
                <Flame size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Iniciar Entrenamiento
            </button>

            <h3 style={{ marginBottom: '1rem' }}>Ejercicios</h3>
            <div className="flex flex-col gap-4">
                {workoutData.exercises.map((exercise, index) => (
                    <div key={index} className="card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                            <h4 style={{ marginBottom: 0 }}>{exercise.name}</h4>
                            {(exercise.videoUrl || getExerciseVideo(exercise.name)) && (
                                <a
                                    href={getExerciseVideo(exercise.name, exercise.videoUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary"
                                    style={{ fontSize: '0.875rem', textDecoration: 'none' }}
                                >
                                    <PlayCircle size={20} />
                                    <span style={{ fontWeight: 'bold' }}>Ver Video</span>
                                </a>
                            )}
                        </div>

                        {/* Info de Músculos y Beneficios */}
                        <div style={{ marginBottom: '0.75rem', fontSize: '0.85rem', position: 'relative' }}>
                            <p className="flex items-center gap-1 text-accent" style={{ marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: 600 }}>Zona:</span>
                                <span
                                    className="cursor-pointer underline decoration-dotted"
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setHoveredMuscle(exercise.muscles)}
                                    onMouseLeave={() => setHoveredMuscle(null)}
                                >
                                    {exercise.muscles}
                                    {/* Popover de Músculos */}
                                    {hoveredMuscle === exercise.muscles && (
                                        <div
                                            className="animate-fade-in card"
                                            style={{
                                                position: 'absolute',
                                                bottom: '100%',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                zIndex: 50,
                                                padding: '1rem',
                                                width: '300px',
                                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                                marginBottom: '0.5rem',
                                                pointerEvents: 'none' // Para que no parpadee al moverse
                                            }}
                                        >
                                            <h5 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Músculos Trabajados</h5>
                                            <BodyMap highlight={exercise.muscles} />
                                        </div>
                                    )}
                                </span>
                            </p>
                            <p className="text-muted" style={{ fontStyle: 'italic' }}>
                                "{exercise.benefits}"
                            </p>
                        </div>

                        <div className="flex justify-between text-muted" style={{
                            fontSize: '0.875rem',
                            borderTop: '1px solid var(--color-bg-tertiary)',
                            paddingTop: '0.75rem'
                        }}>
                            <div className="flex items-center gap-2">
                                <Repeat size={16} />
                                <span>{exercise.sets} series x {exercise.reps} reps</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>Descanso: 60-90s</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={() => navigate(`/workouts/${id}/active`, { state: { workoutData } })}
                    className="btn btn-primary w-full flex justify-center gap-2"
                >
                    <Flame size={20} />
                    <span>Iniciar Entrenamiento</span>
                </button>
            </div>
        </div>
    );
};

export default WorkoutDetail;
