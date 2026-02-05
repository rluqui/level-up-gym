import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Utensils, User } from 'lucide-react';

const BottomNavigation = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/workouts', icon: Dumbbell, label: 'Entrenar' },
        { path: '/nutrition', icon: Utensils, label: 'Dieta' },
        { path: '/profile', icon: User, label: 'Perfil' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-bg-tertiary)',
            padding: '0.75rem 1rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 50,
            paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
        }}>
            {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        fontSize: '0.75rem',
                        gap: '0.25rem',
                        transition: 'color 0.2s ease',
                    })}
                >
                    <Icon size={24} />
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};

export default BottomNavigation;
