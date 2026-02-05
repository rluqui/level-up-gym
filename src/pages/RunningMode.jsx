import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Activity, Save, TrendingUp } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import LiveRunningMap from '../components/LiveRunningMap';

const RunningMode = () => {
    const navigate = useNavigate();

    // Estado del formulario
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState(''); // en minutos
    const [rpe, setRpe] = useState(5); // 1-10
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [showMap, setShowMap] = useState(false); // GPS Mode

    // Métricas calculadas
    const [pace, setPace] = useState(0); // min/km
    const [calories, setCalories] = useState(0);

    // Historial
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedRuns = JSON.parse(localStorage.getItem('levelUp_runHistory')) || [];
        setHistory(savedRuns);
    }, []);

    // Calcular Ritmo y Calorías en tiempo real
    useEffect(() => {
        if (distance > 0 && duration > 0) {
            // Pace: Minutos por Km
            const paceVal = parseFloat(duration) / parseFloat(distance);
            setPace(paceVal.toFixed(2));

            // Calorías (Estimación simple: PESO * KM * 1.036). Asumimos 75kg si no hay perfil
            // Mejoraremos esto conectando con el perfil real
            const userWeight = 75;
            const kCal = userWeight * parseFloat(distance) * 1.036;
            setCalories(Math.round(kCal));
        } else {
            setPace(0);
            setCalories(0);
        }
    }, [distance, duration]);

    const formatPace = (decimalPace) => {
        if (!decimalPace) return "0:00";
        const mins = Math.floor(decimalPace);
        const secs = Math.round((decimalPace - mins) * 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const { addXp } = useGamification();

    // Callback cuando el mapa termina y guarda
    const handleMapSave = (data) => {
        setShowMap(false);
        setDistance(data.distance);
        setDuration(data.duration);
        // Opcional: Auto-save inmediato o dejar que el usuario revise y guarde
        // Vamos a rellenar los inputs y dejar que el usuario ponga el RPE y guarde
    };

    if (showMap) {
        return <LiveRunningMap onSaveRun={handleMapSave} onClose={() => setShowMap(false)} />;
    }

    const handleSave = () => {
        if (!distance || !duration) return;

        // Gamificación: 50 XP base + 20 XP por km
        const gainedXp = 50 + Math.round(parseFloat(distance) * 20);
        addXp(gainedXp);

        const newRun = {
            id: Date.now(),
            date,
            distance: parseFloat(distance),
            duration: parseFloat(duration),
            pace: pace,
            calories,
            rpe
        };

        const updatedHistory = [newRun, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('levelUp_runHistory', JSON.stringify(updatedHistory));

        // Reset form
        setDistance('');
        setDuration('');
        setRpe(5);
        // Alert o feedback visual ya manejado por el modal de LevelUp, pero añadimos confirmación
        // No alertamos si sube de nivel para no solapar, pero por simplicidad:
        alert(`¡Carrera guardada! Ganaste +${gainedXp} XP 🔥`);
    };

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <div className="flex items-center gap-2 mb-4 mt-2">
                <button
                    onClick={() => navigate('/workouts')}
                    className="p-2 rounded-full hover:bg-white/10"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="m-0">Running Tracker 👟</h2>
            </div>

            {/* Tarjeta de Ingreso */}
            <div className="card mb-6 border-l-4 border-orange-500">

                {/* Botón GPS */}
                <button
                    onClick={() => setShowMap(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 py-3 rounded-lg mb-6 flex items-center justify-center gap-2 font-bold shadow-lg animate-pulse"
                >
                    <MapPin className="animate-bounce" />
                    INICIAR SEGUIMIENTO GPS (BETA)
                </button>

                <div className="text-center text-xs text-muted mb-4 border-b border-gray-700 pb-2">
                    o ingresa datos manuales
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm text-muted mb-1 flex items-center gap-1">
                            <MapPin size={14} /> Distancia (km)
                        </label>
                        <input
                            type="number"
                            className="w-full bg-[var(--color-bg-tertiary)] p-3 rounded text-xl font-bold text-white outline-none focus:ring-1 ring-orange-500"
                            placeholder="Ej: 5.0"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-muted mb-1 flex items-center gap-1">
                            <Clock size={14} /> Tiempo (min)
                        </label>
                        <input
                            type="number"
                            className="w-full bg-[var(--color-bg-tertiary)] p-3 rounded text-xl font-bold text-white outline-none focus:ring-1 ring-orange-500"
                            placeholder="Ej: 30"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                </div>

                {/* Resultados en Tiempo Real */}
                <div className="bg-[var(--color-bg-tertiary)] rounded p-4 mb-4 flex justify-between items-center text-center">
                    <div>
                        <div className="text-xs text-muted mb-1">RITMO ESTIMADO</div>
                        <div className="text-2xl font-bold text-orange-400">{formatPace(pace)} <span className="text-sm text-muted">/km</span></div>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-600"></div>
                    <div>
                        <div className="text-xs text-muted mb-1">QUEMA CALÓRICA</div>
                        <div className="text-2xl font-bold text-orange-400">{calories} <span className="text-sm text-muted">kcal</span></div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-muted mb-2 flex justify-between">
                        <span>Sensación (RPE)</span>
                        <span className="font-bold text-orange-400">{rpe}/10</span>
                    </label>
                    <input
                        type="range"
                        min="1" max="10"
                        value={rpe}
                        onChange={(e) => setRpe(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                        <span>Suave</span>
                        <span>Moderado</span>
                        <span>Mortal</span>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="btn btn-primary w-full flex justify-center items-center gap-2 py-3"
                    disabled={!distance || !duration}
                >
                    <Save size={20} /> Guardar Entrenamiento
                </button>
            </div>

            {/* Historial */}
            <h3 className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-orange-500" />
                Historial Reciente
            </h3>

            <div className="space-y-3">
                {history.length === 0 ? (
                    <p className="text-muted text-center py-4">Aún no hay carreras registradas.</p>
                ) : (
                    history.map(run => (
                        <div key={run.id} className="card py-3 px-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500/20 p-2 rounded-full text-orange-500">
                                    <TrendingUp size={20} />
                                </div>
                                <div>
                                    <div className="font-bold">{run.distance} km</div>
                                    <div className="text-xs text-muted">{new Date(run.date).toLocaleDateString()} • {run.duration} min</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-lg">{formatPace(run.pace)}</div>
                                <div className="text-xs text-muted">min/km</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RunningMode;
