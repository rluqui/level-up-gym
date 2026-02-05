import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Save, Search, Check, AlertCircle } from 'lucide-react';
import { exerciseLibrary } from '../data/exerciseLibrary';

const Admin = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [savingId, setSavingId] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        setLoading(true);
        // 1. Intentar cargar de Supabase
        const { data: dbExercises, error } = await supabase
            .from('exercises')
            .select('*');

        if (error) {
            console.error('Error cargando ejercicios:', error);
            // Fallback a local si falla (o está vacío)
            loadLocalExercises();
        } else {
            // Si la BD está vacía, cargamos los locales para "inicializar" la vista
            if (dbExercises.length === 0) {
                loadLocalExercises();
            } else {
                setExercises(dbExercises);
            }
        }
        setLoading(false);
    };

    const loadLocalExercises = () => {
        // Convertir el objeto exerciseLibrary a un array plano
        const flatList = [];
        Object.keys(exerciseLibrary).forEach(category => {
            exerciseLibrary[category].forEach(ex => {
                flatList.push({ ...ex, category, id: ex.name }); // Usamos nombre como ID temporal
            });
        });
        setExercises(flatList);
    };

    const handleUpdate = async (exercise) => {
        setSavingId(exercise.id || exercise.name);

        // Verificar si ya existe en BD por nombre (si venimos de local)
        const { data: existing } = await supabase
            .from('exercises')
            .select('id')
            .eq('name', exercise.name)
            .single();

        let result;
        if (existing) {
            // Actualizar
            result = await supabase
                .from('exercises')
                .update({ video_url: exercise.videoUrl })
                .eq('id', existing.id);
        } else {
            // Insertar nuevo
            result = await supabase
                .from('exercises')
                .insert([{
                    name: exercise.name,
                    video_url: exercise.videoUrl,
                    category: exercise.category
                }]);
        }

        if (result.error) {
            setMessage({ type: 'error', text: 'Error al guardar.' });
        } else {
            setMessage({ type: 'success', text: '¡Guardado correctamente!' });
            // Recargar para obtener IDs reales si fue inserción
            fetchExercises();
        }

        setSavingId(null);
        setTimeout(() => setMessage(null), 3000);
    };

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Panel de Admin 🛠️</h1>
                <p className="text-muted">Gestiona los videos de la aplicación.</p>
            </header>

            {message && (
                <div className={`card animate-fade-in ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}
                    style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <div className="flex items-center gap-2">
                        {message.type === 'success' ? <Check size={20} className="text-success" /> : <AlertCircle size={20} className="text-danger" />}
                        <span>{message.text}</span>
                    </div>
                </div>
            )}

            <div className="flex gap-2 mb-4">
                <div className="input-group flex-1">
                    <Search className="input-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar ejercicio..."
                        className="input-field"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {loading ? (
                    <p>Cargando ejercicios...</p>
                ) : (
                    filteredExercises.map((ex, index) => (
                        <div key={index} className="card">
                            <h4 style={{ marginBottom: '0.5rem' }}>{ex.name}</h4>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="input-field"
                                    defaultValue={ex.videoUrl || ex.video_url}
                                    placeholder="https://youtube.com/..."
                                    onChange={(e) => {
                                        ex.videoUrl = e.target.value; // Mutación local simple para el ejemplo
                                        ex.video_url = e.target.value;
                                    }}
                                />
                                <button
                                    className="btn btn-primary"
                                    disabled={savingId === (ex.id || ex.name)}
                                    onClick={() => handleUpdate(ex)}
                                >
                                    {savingId === (ex.id || ex.name) ? '...' : <Save size={20} />}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;
