import React, { useState } from 'react';
import { getFrequencyFeedback } from '../utils/aiCoach';
import ProfileHeader from '../components/ProfileHeader';
import StatsChart from '../components/StatsChart';
import SettingsMenu from '../components/SettingsMenu';
import FeedbackModal from '../components/FeedbackModal';
import { MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user: authUser, signOut } = useAuth();
    const navigate = useNavigate();

    // Estado del Perfil
    const [profile, setProfile] = useState(() => {
        return JSON.parse(localStorage.getItem('levelUp_userProfile')) || {
            level: 'beginner',
            goal: 'strength',
            days: 3,
            age: 30,
            sport: 'none',
            configured: false
        };
    });

    const [isEditing, setIsEditing] = useState(!profile.configured);
    const [tempProfile, setTempProfile] = useState(profile);
    const [showFeedback, setShowFeedback] = useState(false);

    const user = {
        name: 'Atleta Level Up',
        level: profile.age > 50 ? 57 : (profile.level === 'beginner' ? 1 : 15),
        xp: 2450,
        maxXp: 3000
    };

    const saveProfile = () => {
        const finalProfile = { ...tempProfile, configured: true };
        setProfile(finalProfile);
        localStorage.setItem('levelUp_userProfile', JSON.stringify(finalProfile));
        setIsEditing(false);
    };

    const handleDaySelection = (days) => {
        setTempProfile({ ...tempProfile, days });
    };

    const handleAgeChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setTempProfile({ ...tempProfile, age: '' });
        } else {
            setTempProfile({ ...tempProfile, age: parseInt(val) });
        }
    };

    const frequencyFeedback = getFrequencyFeedback(tempProfile.level, tempProfile.days);

    // Opciones de configuración
    const sportsOptions = [
        { id: 'none', label: 'Solo Gym', icon: '🏋️' },
        { id: 'basketball', label: 'Básquet', icon: '🏀' },
        { id: 'football', label: 'Fútbol', icon: '⚽' },
        { id: 'running', label: 'Running', icon: '🏃' },
        { id: 'swimming', label: 'Natación', icon: '🏊' },
        { id: 'cycling', label: 'Ciclismo', icon: '🚴' },
        { id: 'tennis', label: 'Tenis', icon: '🎾' },
        { id: 'crossfit', label: 'Crossfit', icon: '🔥' },
        { id: 'yoga', label: 'Yoga', icon: '🧘' },
        { id: 'martial_arts', label: 'Artes Marciales', icon: '🥋' }
    ];

    const levelOptions = [
        { id: 'beginner', label: 'Principiante' },
        { id: 'intermediate', label: 'Intermedio' },
        { id: 'advanced', label: 'Avanzado' }
    ];

    const goalOptions = [
        { id: 'weight_loss', label: 'Adelgazar', icon: '🔥' },
        { id: 'strength', label: 'Fuerza', icon: '🏋️' },
        { id: 'hypertrophy', label: 'Músculo', icon: '💪' },
        { id: 'endurance', label: 'Resistencia', icon: '🏃' },
        { id: 'health', label: 'Salud General', icon: '❤️' },
        { id: 'mobility', label: 'Movilidad', icon: '🤸' }
    ];

    return (
        <div style={{ paddingBottom: '7rem' }}>
            {!isEditing ? (
                <>
                    {!authUser ? (
                        <div
                            className="bg-gray-800 p-4 mb-4 rounded-lg flex justify-between items-center border border-gray-700"
                            onClick={() => navigate('/login')}
                            style={{ cursor: 'pointer' }}
                        >
                            <div>
                                <h4 className="text-white font-bold text-sm">Modo Invitado 👤</h4>
                                <p className="text-xs text-muted">Inicia sesión para guardar en la nube.</p>
                            </div>
                            <button className="btn btn-sm btn-primary">Login</button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center px-2 mb-2">
                            <span className="text-xs text-green-400 font-mono">● Conectado: {authUser.email}</span>
                        </div>
                    )}

                    <ProfileHeader {...user} />
                    <div className="card" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        <div className="flex justify-between items-center">
                            <h3>Tu Plan Integral</h3>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Editar</button>
                        </div>
                        <div className="flex gap-4 mt-2 overflow-x-auto pb-2">
                            <div className="flex flex-col min-w-[80px]">
                                <span className="text-muted text-sm">Edad</span>
                                <span className="font-bold">{profile.age} años</span>
                            </div>
                            <div className="flex flex-col min-w-[80px]">
                                <span className="text-muted text-sm">Deporte</span>
                                <span className="font-bold capitalize">{profile.sport === 'none' ? 'Ninguno' : profile.sport}</span>
                            </div>
                            <div className="flex flex-col min-w-[80px]">
                                <span className="text-muted text-sm">Frecuencia</span>
                                <span className="font-bold">{profile.days} días/sem</span>
                            </div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem' }}>Actividad Reciente</h3>
                    <StatsChart data={[
                        { label: 'L', ep: 20 }, { label: 'M', ep: 40 }, { label: 'X', ep: 10 },
                        { label: 'J', ep: 80 }, { label: 'V', ep: 50 }, { label: 'S', ep: 90 }, { label: 'D', ep: 0 }
                    ]} />

                    <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>Ajustes</h3>

                    <button
                        className="btn w-full flex items-center justify-between"
                        style={{
                            marginBottom: '1rem',
                            backgroundColor: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-primary)',
                            padding: '1rem'
                        }}
                        onClick={() => setShowFeedback(true)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-primary/20 text-primary">
                                <MessageSquare size={20} />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold">Enviar Sugerencia</span>
                                <span className="text-xs text-muted">Ayúdanos a mejorar la app</span>
                            </div>
                        </div>
                    </button>

                    <SettingsMenu />

                    {authUser && (
                        <button
                            className="btn btn-danger w-full mt-4 flex justify-center items-center gap-2"
                            onClick={() => signOut()}
                        >
                            <LogOut size={18} />
                            Cerrar Sesión
                        </button>
                    )}
                </>
            ) : (
                <div className="animate-fade-in">
                    <h2 style={{ marginBottom: '1.5rem' }}>Perfil Integral 🧬</h2>

                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 className="mb-2">Datos Personales</h3>
                        <label className="block text-sm text-muted mb-1">Tu Edad (Importante para salud articular)</label>
                        <input
                            type="number"
                            className="w-full p-2 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-bg-secondary)] text-white"
                            value={tempProfile.age}
                            onChange={handleAgeChange}
                            placeholder="Ej: 57"
                        />
                    </div>

                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 className="mb-2">¿Practicas algún deporte?</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {sportsOptions.map((sport) => (
                                <button
                                    key={sport.id}
                                    className={`btn ${tempProfile.sport === sport.id ? 'btn-primary' : 'btn-secondary'} flex items-center justify-center gap-2`}
                                    onClick={() => setTempProfile({ ...tempProfile, sport: sport.id })}
                                    style={{ fontSize: '0.9rem' }}
                                >
                                    {sport.label} {sport.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 className="mb-2">Experiencia en Pesas</h3>
                        <div className="flex gap-2">
                            {levelOptions.map((level) => (
                                <button
                                    key={level.id}
                                    className={`btn ${tempProfile.level === level.id ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setTempProfile({ ...tempProfile, level: level.id })}
                                    style={{ flex: 1 }}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h3 className="mb-2">2. ¿Tu objetivo principal?</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {goalOptions.map((goal) => (
                                <button
                                    key={goal.id}
                                    className={`btn ${tempProfile.goal === goal.id ? 'btn-primary' : 'btn-secondary'} flex items-center justify-center gap-2`}
                                    onClick={() => setTempProfile({ ...tempProfile, goal: goal.id })}
                                >
                                    {goal.label} {goal.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ marginBottom: '1rem', border: frequencyFeedback.status === 'warning' ? '1px solid var(--color-danger)' : '1px solid transparent' }}>
                        <h3 className="mb-2">Días Disponibles (Total)</h3>
                        <input
                            type="range"
                            min="2" max="6"
                            value={tempProfile.days}
                            onChange={(e) => handleDaySelection(parseInt(e.target.value))}
                            style={{ width: '100%', marginBottom: '1rem' }}
                        />
                        <div className="text-center font-bold text-xl mb-4">{tempProfile.days} Días</div>

                        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <p className="text-sm mb-3" style={{ color: frequencyFeedback.status === 'warning' ? '#ff6b6b' : 'var(--color-text-primary)' }}>
                                {frequencyFeedback.message}
                            </p>
                            <span className="text-xs text-muted">La AI ajustará la carga según tu edad y deporte.</span>
                        </div>
                    </div>

                    <button className="btn btn-primary w-full" style={{ padding: '1rem' }} onClick={saveProfile}>
                        Generar Plan 360° ✨
                    </button>
                </div>
            )}

            <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </div>
    );
};

export default Profile;