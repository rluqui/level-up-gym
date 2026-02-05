import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { exerciseLibrary } from '../data/exerciseLibrary';

const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
    // Mapa: { "Nombre Ejercicio": "URL Video" }
    const [videoOverrides, setVideoOverrides] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRefreshedData();
    }, []);

    const fetchRefreshedData = async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('exercises')
                .select('name, video_url');

            if (data) {
                const overrides = {};
                data.forEach(ex => {
                    if (ex.video_url) {
                        overrides[ex.name] = ex.video_url; // Usar nombre exacto como clave
                    }
                });
                setVideoOverrides(overrides);
            }
        } catch (err) {
            console.error("Error fetching exercises:", err);
        } finally {
            setLoading(false);
        }
    };

    // Función helper para obtener la URL correcta
    const getExerciseVideo = (exerciseName, defaultUrl) => {
        // Prioridad: 1. Supabase (override), 2. Default (local)
        return videoOverrides[exerciseName] || defaultUrl;
    };

    return (
        <ExercisesContext.Provider value={{ getExerciseVideo, refresh: fetchRefreshedData }}>
            {children}
        </ExercisesContext.Provider>
    );
};

export const useExercises = () => {
    return useContext(ExercisesContext);
};
