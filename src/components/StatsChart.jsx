import React from 'react';

const StatsChart = ({ data }) => {
    // Encontrar el valor máximo para escalar las barras
    const maxVal = Math.max(...data.map(d => d.ep));

    return (
        <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Actividad Semanal</h3>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: '150px',
                paddingTop: '1rem'
            }}>
                {data.map((day, index) => {
                    const heightPercentage = (day.ep / maxVal) * 100;
                    return (
                        <div key={index} className="flex flex-col items-center gap-2" style={{ flex: 1 }}>
                            <div style={{
                                width: '80%',
                                maxWidth: '20px',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'flex-end',
                                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: `${heightPercentage}%`,
                                    backgroundColor: heightPercentage > 80 ? 'var(--color-primary)' : 'var(--color-accent)',
                                    borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                    transition: 'height 1s ease-out',
                                    opacity: 0.8
                                }} />
                            </div>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>{day.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsChart;
