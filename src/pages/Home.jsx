import React from 'react';

const Home = () => {
    const history = JSON.parse(localStorage.getItem('levelUp_history') || '[]');
    const totalWorkouts = history.length;

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Hola, Atleta <span role="img" aria-label="wave">👋</span></h1>
                <p className="text-muted">¿Listo para subir de nivel hoy?</p>
            </header>

            <section className="card" style={{ marginBottom: '1.5rem' }}>
                <h3>Resumen Semanal</h3>
                <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                    <div className="text-center">
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{totalWorkouts}</span>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Entrenamientos</p>
                    </div>
                    <div className="text-center">
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>850</span>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Kcal Hoy</p>
                    </div>
                    <div className="text-center">
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>4h</span>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Actividad</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 style={{ marginBottom: '1rem' }}>Acciones Rápidas</h3>
                <div className="flex flex-col gap-2">
                    <button className="btn btn-primary w-full">Registrar Entrenamiento</button>
                    <button className="btn" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}>Registrar Comida</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
