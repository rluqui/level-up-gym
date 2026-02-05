import React from 'react';
import { ChevronRight, Settings, Bell, Target, LogOut } from 'lucide-react';

const SettingsMenu = () => {
    const options = [
        { icon: Settings, label: 'Editar Perfil' },
        { icon: Target, label: 'Objetivos' },
        { icon: Bell, label: 'Notificaciones' },
        { icon: LogOut, label: 'Cerrar Sesión', danger: true },
    ];

    return (
        <div className="flex flex-col gap-2">
            {options.map((opt, index) => (
                <button
                    key={index}
                    className="card flex justify-between items-center w-full animate-fade-in"
                    style={{
                        padding: '1rem',
                        marginBottom: '0',
                        cursor: 'pointer',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: 'none',
                        animationDelay: `${index * 0.05}s`
                    }}
                >
                    <div className="flex items-center gap-3">
                        <opt.icon size={20} color={opt.danger ? 'var(--color-danger)' : 'var(--color-text-secondary)'} />
                        <span style={{ color: opt.danger ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>
                            {opt.label}
                        </span>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                </button>
            ))}
        </div>
    );
};

export default SettingsMenu;
