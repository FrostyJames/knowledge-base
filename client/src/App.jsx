import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import ArticleView from './pages/ArticleView';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-slate-900 text-gray-200">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/articles" element={<ArticleView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
