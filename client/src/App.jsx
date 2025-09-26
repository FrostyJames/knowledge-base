// client/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import EditorDashboard from './pages/EditorDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Documents from './pages/Documents';
import ArticleView from './pages/ArticleView';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const { isAuthenticated, currentUser } = useAuth();

  const getDashboardPath = () => {
    if (!currentUser || !currentUser.roles || currentUser.roles.length === 0) return '/dashboard';
    const roleNames = currentUser.roles.map(r => r.name);
    if (roleNames.includes('Admin')) return '/admin-dashboard';
    if (roleNames.includes('Editor')) return '/editor-dashboard';
    return '/employee-dashboard';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {isAuthenticated && <Sidebar />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isAuthenticated && <TopBar />}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/editor-dashboard" element={
              <ProtectedRoute>
                <EditorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/employee-dashboard" element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/articles" element={
              <ProtectedRoute>
                <ArticleView />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

            {/* Redirects */}
            <Route path="/" element={
              isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <Navigate to="/login" replace />
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;