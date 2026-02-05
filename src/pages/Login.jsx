import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Para inserción directa post-registro

const Login = () => {
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // LOGIN
                const { error } = await signIn({ email, password });
                if (error) throw error;
                navigate('/profile');
            } else {
                // REGISTRO
                const { data: { user }, error } = await signUp({ email, password });
                if (error) throw error;

                // SINCRONIZACIÓN: Subir perfil local si existe
                if (user) {
                    const localProfile = JSON.parse(localStorage.getItem('levelUp_userProfile'));
                    if (localProfile) {
                        const { error: profileError } = await supabase
                            .from('profiles')
                            .insert([{
                                id: user.id,
                                email: user.email,
                                age: localProfile.age || 0,
                                sport: localProfile.sport || 'none',
                                level: localProfile.level || 'beginner',
                                days_available: localProfile.days || 3
                            }]);

                        if (profileError) console.error('Error sync profile:', profileError);
                    }
                }

                alert('¡Registro exitoso! Revisa tu email para confirmar (si está habilitado) o inicia sesión.');
                if (!error) navigate('/profile');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 animate-fade-in">
            <div className="card w-full max-w-md">
                <h2 className="text-center mb-6 text-primary">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm text-muted mb-1">Email</label>
                        <input
                            type="email"
                            className="input-field w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-muted mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="input-field w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : (isLogin ? 'Entrar' : 'Registrarse')}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-muted">
                        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                    </span>
                    <button
                        className="text-primary font-bold hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                    </button>
                    {!isLogin && (
                        <p className="text-xs text-muted mt-2">
                            ✨ Al registrarte, guardaremos tu perfil actual en la nube.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
