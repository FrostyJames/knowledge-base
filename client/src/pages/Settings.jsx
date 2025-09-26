import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode') === 'true';
    const storedNotify = localStorage.getItem('notifications') === 'true';
    const storedLang = localStorage.getItem('language') || 'en';

    setDarkMode(storedDark);
    setNotifications(storedNotify);
    setLanguage(storedLang);
  }, []);

  // Save settings to localStorage on change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);
  }, [darkMode, notifications, language]);

  return (
    <div className="min-h-screen p-6 bg-slate-900 text-gray-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-indigo-400">Settings</h2>
        <p className="text-gray-400">Manage your preferences below.</p>

        {/* Appearance Settings */}
        <section className="bg-slate-800 p-4 rounded-lg shadow-lg shadow-indigo-500/30 space-y-2">
          <h3 className="text-xl font-semibold text-indigo-300">Appearance</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="accent-indigo-500 w-5 h-5"
            />
            <span className="text-gray-200">Enable Dark Mode</span>
          </label>
        </section>

        {/* Notification Settings */}
        <section className="bg-slate-800 p-4 rounded-lg shadow-lg shadow-indigo-500/30 space-y-2">
          <h3 className="text-xl font-semibold text-indigo-300">Notifications</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-indigo-500 w-5 h-5"
            />
            <span className="text-gray-200">Email Notifications</span>
          </label>
        </section>

        {/* Language Settings */}
        <section className="bg-slate-800 p-4 rounded-lg shadow-lg shadow-indigo-500/30 space-y-2">
          <h3 className="text-xl font-semibold text-indigo-300">Language</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full max-w-xs bg-slate-700 border border-slate-600 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="fr">French</option>
          </select>
        </section>

        {/* Account Actions */}
        <section className="bg-slate-800 p-4 rounded-lg shadow-lg shadow-red-500/30 space-y-2">
          <h3 className="text-xl font-semibold text-red-400">Account</h3>
          <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
