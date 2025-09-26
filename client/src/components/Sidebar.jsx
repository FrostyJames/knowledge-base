import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, BookOpen, Settings } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={18} /> },
    { name: 'Articles', path: '/articles', icon: <BookOpen size={18} /> }, 
    { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  ]

  return (
    <aside className="w-64 h-screen backdrop-blur-md bg-slate-900/60 text-gray-200 shadow-xl flex flex-col border-r border-slate-800">
      <div className="p-6 text-2xl font-extrabold tracking-wide text-indigo-400">
        KnowledgeHub
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'hover:bg-slate-800 hover:text-indigo-300'
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-gray-400">
        © 2025 KnowledgeHub
      </div>
    </aside>
  )
}
