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
                        <h4 style={{ marginBottom: '0.5rem' }}>{exercise.name}</h4>

                        {/* Grid de Contenido: Info | Ilustración | Video */}
                        <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center mb-3">
                            {/* 1. Descripción (Izq) */}
                            <div style={{ fontSize: '0.85rem' }}>
                                <p className="flex items-center gap-1 text-accent mb-1">
                                    <span style={{ fontWeight: 600 }}>Zona:</span>
                                    <span
                                        className="cursor-pointer underline decoration-dotted relative"
                                        onMouseEnter={() => setHoveredMuscle(exercise.muscles)}
                                        onMouseLeave={() => setHoveredMuscle(null)}
                                    >
                                        {exercise.muscles}
                                        {hoveredMuscle === exercise.muscles && (
                                            <div className="animate-fade-in card absolute bottom-full left-1/2 -translate-x-1/2 z-50 p-4 w-[300px] shadow-2xl mb-2 pointer-events-none">
                                                <h5 className="text-center mb-2 text-white">Músculos Trabajados</h5>
                                                <BodyMap highlight={exercise.muscles} />
                                            </div>
                                        )}
                                    </span>
                                </p>
                                <p className="text-muted italic text-xs leading-relaxed">
                                    "{exercise.benefits}"
                                </p>
                            </div>

                            {/* 2. Ilustración (Centro) */}
                            {exercise.illustration && (
                                <div className="flex justify-center">
                                    <div className="bg-white p-1 rounded-lg shadow-sm" style={{ width: '80px', height: '80px' }}>
                                        <img
                                            src={exercise.illustration}
                                            alt={exercise.name}
                                            className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 3. Video y Datos (Derecha) */}
                            <div className="flex flex-col items-end gap-2">
                                {(exercise.videoUrl || getExerciseVideo(exercise.name)) && (
                                    <a
                                        href={getExerciseVideo(exercise.name, exercise.videoUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm bg-[var(--color-bg)] border border-[var(--color-primary)] text-primary hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <PlayCircle size={18} />
                                    </a>
                                )}
                            </div>
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
