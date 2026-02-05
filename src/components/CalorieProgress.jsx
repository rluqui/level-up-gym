import React from 'react';

const CalorieProgress = ({ consumed, target, macros }) => {
    const percentage = Math.min((consumed / target) * 100, 100);
    const remaining = target - consumed;

    return (
        <div className="card animate-fade-in" style={{
            background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
            marginBottom: '1.5rem',
            border: '1px solid var(--color-bg-tertiary)'
        }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>{remaining}</h2>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>kcal restantes</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold' }}>{consumed} / {target}</p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>kcal consumidas</p>
                </div>
            </div>

            {/* Barra de progreso principal */}
            <div style={{
                height: '10px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: 'var(--color-primary)',
                    transition: 'width 1s ease-out'
                }} />
            </div>

            {/* Macros */}
            <div className="flex justify-between" style={{ fontSize: '0.875rem' }}>
                <div className="text-center">
                    <p style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>{macros.protein}g</p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Proteínas</p>
                </div>
                <div className="text-center">
                    <p style={{ fontWeight: 'bold', color: 'var(--color-secondary)' }}>{macros.carbs}g</p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Carbos</p>
                </div>
                <div className="text-center">
                    <p style={{ fontWeight: 'bold', color: '#F472B6' }}>{macros.fat}g</p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Grasas</p>
                </div>
            </div>
        </div>
    );
};

export default CalorieProgress;
