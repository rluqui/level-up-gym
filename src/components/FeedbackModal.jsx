import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('suggestion'); // suggestion, bug, other
    const [isSent, setIsSent] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulación de envío (Aquí conectaríamos con Supabase o Email)
        console.log('Feedback enviado:', { category, message });

        // Guardar en localStorage para persistencia temporal
        const existingFeedback = JSON.parse(localStorage.getItem('levelUp_feedback_outbox') || '[]');
        existingFeedback.push({
            id: Date.now(),
            category,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('levelUp_feedback_outbox', JSON.stringify(existingFeedback));

        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            setMessage('');
            onClose();
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--color-text-secondary)' }}
                >
                    <X size={24} />
                </button>

                {!isSent ? (
                    <form onSubmit={handleSubmit}>
                        <h3 className="flex items-center gap-2 mb-4">
                            <MessageSquare size={20} className="text-primary" />
                            Tu Opinión Cuenta
                        </h3>

                        <div className="mb-4">
                            <label className="block text-sm text-muted mb-2">Tipo de mensaje</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className={`btn ${category === 'suggestion' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setCategory('suggestion')}
                                    style={{ flex: 1, fontSize: '0.8rem' }}
                                >
                                    💡 Sugerencia
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${category === 'bug' ? 'btn-danger' : 'btn-secondary'}`}
                                    onClick={() => setCategory('bug')}
                                    style={{ flex: 1, fontSize: '0.8rem' }}
                                >
                                    🐛 Error
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-muted mb-2">¿Cómo podemos mejorar?</label>
                            <textarea
                                className="w-full p-3 rounded bg-[var(--color-bg-tertiary)] border border-[var(--color-bg-secondary)] text-white"
                                rows="4"
                                placeholder="Me gustaría que la app..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full flex justify-center items-center gap-2">
                            <Send size={18} />
                            Enviar Comentarios
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center py-8 text-center animate-scale-in">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500">
                            <Send size={32} />
                        </div>
                        <h3>¡Gracias!</h3>
                        <p className="text-muted">Hemos recibido tus comentarios.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;
