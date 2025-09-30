import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode') === 'true';
    const storedNotify = localStorage.getItem('notifications') === 'true';
    const storedLang = localStorage.getItem('language') || 'en';

    setDarkMode(storedDark);
    setNotifications(storedNotify);
    setLanguage(storedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);
  }, [darkMode, notifications, language]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-6 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold">⚙️ Settings</h2>
        <p className="text-sm mt-1 opacity-80">Manage your preferences below</p>
      </div>

      {/* Settings Card */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow space-y-6 border border-gray-200">
        {/* Appearance */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Appearance</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="accent-blue-600 w-5 h-5"
            />
            <span className="text-gray-700">Enable Dark Mode</span>
          </label>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-blue-600 w-5 h-5"
            />
            <span className="text-gray-700">Email Notifications</span>
          </label>
        </section>

        {/* Language */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Language</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full max-w-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="fr">French</option>
          </select>
        </section>

        {/* Account */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <button className="text-red-600 hover:underline font-medium">Delete Account</button>
        </section>
      </div>
    </div>
  );
}