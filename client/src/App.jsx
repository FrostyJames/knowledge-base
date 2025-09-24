import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Settings from './pages/Settings'
import ArticleView from './pages/ArticleView' 

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <TopBar />

        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/articles" element={<ArticleView />} /> {/* ✅ New route */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}