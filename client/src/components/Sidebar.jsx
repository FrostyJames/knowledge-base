import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Knowledge Center', path: '/' },
    { name: 'Media Vault', path: '/documents' },
    { name: 'Articles', path: '/articles' },
    { name: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('knowbaseUser');
    navigate(0);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl h-full flex flex-col justify-between border-r border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-b-xl shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">🧠 KnowBase</h1>
        <p className="text-xs mt-1 opacity-80">Your smart workspace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-700 shadow-inner'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-lg bg-red-400 text-red-900 hover:bg-red-200 font-semibold transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}