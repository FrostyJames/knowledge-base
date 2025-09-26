import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
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
    <div className="h-full w-full bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-gray-600 mb-4">Manage your preferences below.</p>

      {/* Appearance Settings */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Appearance</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="accent-blue-600"
          />
          <span>Enable Dark Mode</span>
        </label>
      </section>

      {/* Notification Settings */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="accent-blue-600"
          />
          <span>Email Notifications</span>
        </label>
      </section>

      {/* Language Settings */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
          <option value="fr">French</option>
        </select>
      </section>

      {/* Account Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Account</h3>
        <button className="text-red-600 hover:underline">Delete Account</button>
      </section>
    </div>
  );
}