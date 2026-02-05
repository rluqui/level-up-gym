import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Repeat, PlayCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { workoutsDetails } from '../data/workouts';
import { analyzeImportedRoutine } from '../utils/aiCoach';
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

            {/* LISTA DE EJERCICIOS CON DISEÑO FITCRON */}
            <div className="flex flex-col gap-6">
                {workoutData.exercises.map((exercise, index) => (
                    <div key={index} className="card animate-fade-in p-0 overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>

                        {/* 1. Header del Ejercicio (Nombre y Carga) */}
                        <div className="bg-[var(--color-bg-secondary)] p-4 border-b border-[var(--color-bg-tertiary)] flex justify-between items-center">
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{exercise.name}</h4>
                            <div className="flex gap-2 text-xs font-mono bg-black/20 px-2 py-1 rounded border border-white/5">
                                <Repeat size={14} className="text-primary" />
                                <span className="text-white/80">{exercise.sets} Series x {exercise.reps} Reps</span>
                            </div>
                        </div>

                        <div className="p-4 md:p-6">
                            {/* 2. Layout Principal: Grid Responsivo (Mobile: Stack, Desktop: 2 Cols) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                {/* COLUMNA IZQ: Visual (Imagen/GIF) */}
                                <div className="bg-black/20 rounded-lg border border-white/5 flex items-center justify-center p-4 min-h-[250px] relative group h-full">
                                    {exercise.illustration ? (
                                        <img
                                            src={exercise.illustration}
                                            alt={exercise.name}
                                            className="w-full h-full object-contain max-h-[300px] mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="text-muted flex flex-col items-center gap-2">
                                            <Info size={40} />
                                            <span>Sin imagen disponible</span>
                                        </div>
                                    )}

                                    {/* Botón de Video (Siempre accesible) */}
                                    {(exercise.videoUrl || getExerciseVideo(exercise.name)) && (
                                        <a
                                            href={getExerciseVideo(exercise.name, exercise.videoUrl)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-2 right-2 btn btn-xs btn-primary gap-1 shadow-lg opacity-90 hover:opacity-100"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <PlayCircle size={14} />
                                            VIDEO
                                        </a>
                                    )}
                                </div>

                                {/* COLUMNA DER: Ficha Técnica */}
                                <div className="flex flex-col justify-center">
                                    <table className="w-full text-sm mb-4 border-separate border-spacing-y-2">
                                        <tbody>
                                            <tr>
                                                <td className="text-muted w-1/3 text-xs uppercase tracking-wider">Tipo:</td>
                                                <td className="font-medium text-white">{exercise.type || 'Fuerza / Hipertrofia'}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted text-xs uppercase tracking-wider">Grupo:</td>
                                                <td className="font-medium text-accent">{exercise.muscles?.split(',')[0]}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted text-xs uppercase tracking-wider">Músculos:</td>
                                                <td className="text-xs leading-relaxed opacity-80">{exercise.muscles}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted text-xs uppercase tracking-wider">Equipo:</td>
                                                <td>{exercise.equipment || 'Gimnasio General'}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted text-xs uppercase tracking-wider">Nivel:</td>
                                                <td>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${exercise.difficulty === 'Alta' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-green-500/20 text-green-400 border border-green-500/20'}`}>
                                                        {exercise.difficulty || 'Media'}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Cita / Beneficio */}
                                    <div className="p-3 bg-[var(--color-bg-secondary)] rounded text-xs italic text-muted border-l-2 border-primary/50">
                                        "{exercise.benefits}"
                                    </div>
                                </div>
                            </div>

                            {/* 3. Footer: Instrucciones Paso a Paso */}
                            <div className="border-t border-white/5 pt-5">
                                <h5 className="mb-3 text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 bg-gradient-to-r from-white/10 to-transparent p-1 rounded w-fit px-2">
                                    <CheckCircle size={14} className="text-primary" />
                                    Ejecución Técnica
                                </h5>
                                {exercise.instructions ? (
                                    <div className="pl-2">
                                        {exercise.instructions.map((step, i) => (
                                            <div key={i} className="flex gap-3 mb-2 last:mb-0 text-sm opacity-90 group">
                                                <span className="font-mono text-primary/50 font-bold min-w-[1.5rem] group-hover:text-primary transition-colors">{i + 1}.</span>
                                                <p className="leading-relaxed text-gray-300">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted pl-2 italic">
                                        Sigue las indicaciones del video o consulta al instructor para una técnica segura.
                                    </p>
                                )}
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
