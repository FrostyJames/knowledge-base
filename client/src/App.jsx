import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import ArticleView from './pages/ArticleView';
import Login from './pages/Login';

// Simple error boundary wrapper
function ErrorBoundary({ children }) {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <ErrorWrapper>
            {children}
          </ErrorWrapper>
        }
      />
    </Routes>
  );
}

function ErrorWrapper({ children }) {
  try {
    return children;
  } catch (error) {
    console.error('App crashed:', error);
    return <div className="p-6 text-red-600">Something went wrong. Please refresh or try again.</div>;
  }
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('knowbaseUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-6">
            <Routes>
              <Route path="/" element={<Dashboard user={user} searchTerm={searchTerm} />} />
              <Route path="/documents" element={<Documents user={user} />} />
              <Route path="/settings" element={<Settings user={user} />} />
              <Route path="/articles" element={<ArticleView user={user} />} />
              <Route path="*" element={<Navigate to="/" replace />} /> {/* fallback route */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}