import { createClient } from '@supabase/supabase-js';

// Estas variables vendrán de tu archivo .env
// VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son los estándares para Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Creamos la instancia del cliente solo si las keys existen
// Esto evita errores si aún no se ha configurado el proyecto
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
