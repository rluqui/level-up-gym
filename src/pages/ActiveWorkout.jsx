import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Save, PlayCircle } from 'lucide-react';
import { workoutsDetails } from '../data/workouts';
import { useExercises } from '../context/ExercisesContext';

const ActiveWorkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { getExerciseVideo } = useExercises();
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(true);

    // Prefer data passed via state (AI/Dynamic), fallback to static ID lookup
    const workout = location.state?.workoutData || workoutsDetails[id] || workoutsDetails[1];

    // Estado para el progreso (checkboxes)
    // Estructura: { 'ejercicio-0-set-1': true/false }
    const [completedSets, setCompletedSets] = useState({});

    // Cronómetro
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const toggleSet = (exerciseIndex, setIndex) => {
        const key = `${exerciseIndex}-${setIndex}`;
        setCompletedSets(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleFinish = () => {
        setIsActive(false);
        const history = JSON.parse(localStorage.getItem('levelUp_history') || '[]');
        const newRecord = {
            id: Date.now(),
            workoutTitle: workout.title,
            duration: time,
            date: new Date().toISOString()
        };
        history.push(newRecord);
        localStorage.setItem('levelUp_history', JSON.stringify(history));

        alert(`¡Entrenamiento guardado!\nTiempo: ${formatTime(time)}`);
        navigate('/');
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            {/* Header Fijo con Cronómetro */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--color-bg-primary)',
                zIndex: 10,
                padding: '1rem 0',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--color-bg-tertiary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <button onClick={() => navigate(-1)} className="btn" style={{ padding: '0.5rem' }}>
                    <ArrowLeft size={24} color="var(--color-text-secondary)" />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>TIEMPO</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                        {formatTime(time)}
                    </span>
                </div>

                <button onClick={handleFinish} className="btn" style={{ padding: '0.5rem', color: 'var(--color-success)' }}>
                    <Save size={24} />
                </button>
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>{workout.title}</h2>

            <div className="flex flex-col gap-6">
                {workout.exercises.map((exercise, exIndex) => (
                    <div key={exIndex} className="animate-fade-in card">
                        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ marginBottom: 0 }}>{exercise.name}</h3>
                            {(exercise.videoUrl || getExerciseVideo(exercise.name)) && (
                                <a
                                    href={getExerciseVideo(exercise.name, exercise.videoUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn flex items-center gap-1"
                                    style={{
                                        padding: '0.4rem',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        textDecoration: 'none',
                                        fontSize: '0.75rem',
                                        borderRadius: 'var(--radius-sm)'
                                    }}
                                >
                                    <PlayCircle size={16} className="text-primary" />
                                    <span style={{ color: 'var(--color-text-primary)' }}>Video</span>
                                </a>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            {Array.from({ length: exercise.sets }).map((_, setIndex) => {
                                const isCompleted = completedSets[`${exIndex}-${setIndex}`];
                                return (
                                    <div
                                        key={setIndex}
                                        onClick={() => toggleSet(exIndex, setIndex)}
                                        className="flex justify-between items-center"
                                        style={{
                                            padding: '0.75rem',
                                            backgroundColor: isCompleted ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            border: isCompleted ? '1px solid var(--color-success)' : '1px solid transparent',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <span style={{ color: isCompleted ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                                            Set {setIndex + 1}
                                        </span>
                                        <CheckCircle
                                            size={20}
                                            color={isCompleted ? 'var(--color-success)' : 'var(--color-text-secondary)'}
                                            fill={isCompleted ? 'var(--color-success)' : 'transparent'}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleFinish}
                className="btn btn-primary w-full"
                style={{ marginTop: '2rem', padding: '1rem' }}
            >
                Finalizar Entrenamiento
            </button>
        </div>
    );
};

export default ActiveWorkout;
