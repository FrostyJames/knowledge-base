// client/src/auth/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios base URL
    useEffect(() => {
        axios.defaults.baseURL = 'http://localhost:5000';
        axios.defaults.withCredentials = true; // Important for sessions
    }, []);

    // Check if user is logged in on app start
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get('/auth/check-auth');
            if (response.data.authenticated) {
                setCurrentUser(response.data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            });

            setCurrentUser(response.data.user);
            return { success: true, user: response.data.user };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setCurrentUser(null);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('/auth/register', {
                name,
                email,
                password
            });

            setCurrentUser(response.data.user);
            return { success: true, user: response.data.user };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            };
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        register,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};