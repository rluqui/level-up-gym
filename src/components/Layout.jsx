import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Layout = () => {
    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            <main className="container animate-fade-in">
                <Outlet />
            </main>
            <BottomNavigation />
        </div>
    );
};

export default Layout;
