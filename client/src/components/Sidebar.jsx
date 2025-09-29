import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Media', path: '/documents' },
    { name: 'Articles', path: '/articles' }, 
    { name: 'Settings', path: '/settings' },
    
  ]

  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-4 font-bold text-xl border-b">KnowledgeBase</div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 rounded ${
              location.pathname === item.path
                ? 'bg-gray-200 font-semibold'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}