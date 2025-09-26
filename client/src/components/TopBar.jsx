// client/src/components/TopBar.jsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';

const TopBar = () => {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div style={styles.topBar}>
            <div style={styles.content}>
                <h1 style={styles.title}>Knowledge Base</h1>
                <div style={styles.userSection}>
                    <span style={styles.welcome}>Welcome, {currentUser?.name}</span>
                    <span style={styles.role}>({currentUser?.roles?.join(', ')})</span>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    topBar: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: '600'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    welcome: {
        fontSize: '1rem'
    },
    role: {
        fontSize: '0.9rem',
        opacity: 0.8,
        fontStyle: 'italic'
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem'
    }
};

export default TopBar;