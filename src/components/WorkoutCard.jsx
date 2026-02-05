import React from 'react';
import { Clock, BarChart } from 'lucide-react';

const WorkoutCard = ({ title, duration, level, imageColor, onClick }) => {
    // Configuración de colores para los niveles
    const levelColors = {
        'Principiante': 'var(--color-success)',
        'Intermedio': 'var(--color-warning)',
        'Avanzado': 'var(--color-danger)'
    };

    const badgeColor = levelColors[level] || 'var(--color-text-secondary)';

    return (
        <div
            onClick={onClick}
            className="card animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}
        >
            {/* Placeholder visual */}
            <div style={{
                height: '120px',
                backgroundColor: imageColor || 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem'
            }}>
                💪
            </div>

            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{title}</h3>

                <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart size={16} />
                        <span style={{ color: badgeColor, fontWeight: 'bold' }}>{level}</span>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" style={{ marginTop: 'auto' }}>
                Comenzar
            </button>
        </div>
    );
};

export default WorkoutCard;
