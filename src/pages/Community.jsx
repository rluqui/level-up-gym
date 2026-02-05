import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { MessageSquare, Heart, Send, User } from 'lucide-react';

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);

    // Cargar Posts
    useEffect(() => {
        if (supabase) fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    id, content, created_at, likes_count,
                    profiles (username, avatar_url)
                `)
                .order('created_at', { ascending: false });

            if (error) console.error('Error loading posts:', error);
            else setPosts(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Crear Post
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim() || !user) return;

        try {
            const { error } = await supabase
                .from('posts')
                .insert([{ user_id: user.id, content: newPost }]);

            if (error) throw error;

            setNewPost('');
            fetchPosts(); // Recargar feed
        } catch (err) {
            console.error('Error creating post:', err);
            alert('Error al publicar. Intenta de nuevo.');
        }
    };

    // Dar Fuego (Like)
    const handleLike = async (postId) => {
        if (!user) return;
        // Nota: Esto es optimista, idealmente haríamos una llamada RPC o insert en tabla likes
        // Por ahora, simulamos el UI update
        const updatedPosts = posts.map(p =>
            p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
        );
        setPosts(updatedPosts);

        try {
            await supabase
                .from('likes')
                .insert([{ user_id: user.id, post_id: postId }]);
            // No recargamos todo para no perder scroll
        } catch (err) {
            // Si falla es probable que sea duplicado (unique constraint), lo ignoramos visualmente o manejamos error
            console.log("Already liked?");
        }
    };

    return (
        <div style={{ paddingBottom: '6rem' }}>
            <h2 className="mb-4">El Vestuario 👟</h2>

            {/* Input Área */}
            {user ? (
                <div className="card mb-6">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full bg-[var(--color-bg-tertiary)] rounded p-3 text-white mb-2 border border-transparent focus:border-primary outline-none"
                            placeholder="¿Qué lograste hoy? Comparte tus victorias..."
                            rows="2"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary btn-sm flex items-center gap-2">
                                <Send size={16} /> Publicar
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-blue-900/30 p-4 rounded mb-6 text-center border border-blue-500/30">
                    <p className="text-sm">Inicia sesión para compartir con la comunidad.</p>
                </div>
            )}

            {/* Feed */}
            {loading ? (
                <p className="text-center text-muted">Cargando el ambiente...</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="card animate-fade-in">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                                    {post.profiles?.avatar_url ? (
                                        <img src={post.profiles.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={20} className="text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="m-0 text-sm font-bold text-white">
                                        {post.profiles?.username || 'Usuario Anónimo'}
                                    </h4>
                                    <span className="text-xs text-muted">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

                            <div className="flex items-center gap-4 border-t border-gray-700/50 pt-3">
                                <button
                                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors"
                                    onClick={() => handleLike(post.id)}
                                >
                                    <Heart size={18} className={post.likes_count > 0 ? "text-orange-500 fill-orange-500" : ""} />
                                    <span>{post.likes_count || 0} Fuegos</span>
                                </button>
                                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                                    <MessageSquare size={18} />
                                    <span>Comentar</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {posts.length === 0 && (
                        <div className="text-center py-10 opacity-50">
                            <MessageSquare size={48} className="mx-auto mb-2" />
                            <p>Aún no hay mensajes. ¡Sé el primero!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Community;
