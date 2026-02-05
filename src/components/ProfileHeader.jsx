import React from 'react';
import { User, Shield } from 'lucide-react';

const ProfileHeader = ({ name, level, xp, maxXp }) => {
    const xpPercentage = Math.min((xp / maxXp) * 100, 100);

    return (
        <div className="flex flex-col items-center animate-fade-in" style={{ marginBottom: '2rem' }}>
            <div style={{
                position: 'relative',
                marginBottom: '1rem'
            }}>
                {/* Avatar Circle */}
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '4px solid var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-glow)'
                }}>
                    <User size={48} color="var(--color-text-primary)" />
                </div>

                {/* Level Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'var(--color-bg-primary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                }}>
                    <Shield size={12} fill="var(--color-primary)" color="var(--color-primary)" />
                    <span>NIVEL {level}</span>
                </div>
            </div>

            <h2 style={{ marginBottom: '0.5rem' }}>{name}</h2>

            {/* XP Bar */}
            <div style={{ width: '200px', textAlign: 'center' }}>
                <div style={{
                    height: '6px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    marginBottom: '0.25rem'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${xpPercentage}%`,
                        backgroundColor: 'var(--color-primary)'
                    }} />
                </div>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>{xp} / {maxXp} XP</p>
            </div>
        </div>
    );
};

export default ProfileHeader;
