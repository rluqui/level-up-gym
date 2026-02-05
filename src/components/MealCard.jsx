import React from 'react';
import { Plus } from 'lucide-react';

const MealCard = ({ title, calories, items, icon, onAdd }) => {
    return (
        <div className="card animate-fade-in" style={{ marginBottom: '1rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <div className="flex items-center gap-2">
                    <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                    <div>
                        <h3 style={{ fontSize: '1.125rem' }}>{title}</h3>
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>{calories} kcal</p>
                    </div>
                </div>
                <button onClick={onAdd} className="btn" style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-primary)' }}>
                    <Plus size={20} color="var(--color-primary)" />
                </button>
            </div>

            {items.length > 0 ? (
                <ul style={{ listStyle: 'none' }}>
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center" style={{
                            padding: '0.5rem 0',
                            borderTop: '1px solid var(--color-bg-tertiary)',
                            fontSize: '0.925rem'
                        }}>
                            <span>{item.name}</span>
                            <span className="text-muted">{item.kcal}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted text-center" style={{ fontSize: '0.875rem', padding: '1rem 0' }}>
                    No hay alimentos registrados
                </p>
            )}
        </div>
    );
};

export default MealCard;
