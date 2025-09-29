import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  // Load settings from localStorage on mount and apply dark mode
  useEffect(() => {
    const storedDark = localStorage.getItem('darkMode') === 'true';
    const storedNotify = localStorage.getItem('notifications') === 'true';
    const storedLang = localStorage.getItem('language') || 'en';
    const storedAutoSave = localStorage.getItem('autoSave') !== 'false';
    const storedFontSize = localStorage.getItem('fontSize') || 'medium';

    setDarkMode(storedDark);
    setNotifications(storedNotify);
    setLanguage(storedLang);
    setAutoSave(storedAutoSave);
    setFontSize(storedFontSize);
    
    // Apply dark mode to entire document
    if (storedDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save settings to localStorage on change and apply dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);
    localStorage.setItem('autoSave', autoSave);
    localStorage.setItem('fontSize', fontSize);

    // Apply dark mode to entire document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, notifications, language, autoSave, fontSize]);

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setDarkMode(false);
      setNotifications(true);
      setLanguage('en');
      setAutoSave(true);
      setFontSize('medium');
      localStorage.clear();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your experience and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
              </div>
              
              <div className="space-y-6">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      darkMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Font Size */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Font Size</h3>
                  <div className="flex gap-3">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          fontSize === size
                            ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preferences</h2>
              </div>
              
              <div className="space-y-6">
                {/* Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates and announcements</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      notifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Auto Save */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Auto Save</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Automatically save your work</p>
                  </div>
                  <button
                    onClick={() => setAutoSave(!autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      autoSave ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Language */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Language</h3>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  >
                    <option value="en" className="dark:bg-gray-700">English</option>
                    <option value="sw" className="dark:bg-gray-700">Swahili</option>
                    <option value="fr" className="dark:bg-gray-700">French</option>
                    <option value="es" className="dark:bg-gray-700">Spanish</option>
                    <option value="de" className="dark:bg-gray-700">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account</h2>
              </div>
              
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Download all your data</p>
                </button>
                
                <button 
                  onClick={handleResetSettings}
                  className="w-full text-left p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">Reset Settings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Restore all settings to default</p>
                </button>
                
                <button className="w-full text-left p-4 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group">
                  <h3 className="font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">Delete Account</h3>
                  <p className="text-sm text-red-500 dark:text-red-400/80">Permanently delete your account and all data</p>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 sticky top-6">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Preview</h2>
              </div>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className={`h-2 rounded-full mb-1 ${
                        darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`} style={{width: '80px'}}></div>
                      <div className={`h-1 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`} style={{width: '40px'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className={`h-2 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`h-2 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} style={{width: '90%'}}></div>
                    <div className={`h-2 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} style={{width: '70%'}}></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {darkMode ? 'Dark' : 'Light'} mode preview
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Changes apply instantly
                  </p>
                </div>
                
                {/* Current Settings Summary */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Current Settings</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Theme:</span>
                      <span className="text-gray-900 dark:text-white">{darkMode ? 'Dark' : 'Light'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Language:</span>
                      <span className="text-gray-900 dark:text-white">
                        {language === 'en' ? 'English' : 
                         language === 'sw' ? 'Swahili' : 
                         language === 'fr' ? 'French' : 
                         language === 'es' ? 'Spanish' : 'German'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Notifications:</span>
                      <span className="text-gray-900 dark:text-white">{notifications ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}