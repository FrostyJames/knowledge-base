/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',     // neon-indigo
        accent: '#F472B6',      // neon-pink highlight
        background: '#0F172A',  // main dark background
        cardBg: '#1E293B',      // card background
        textLight: '#F8FAFC',   // primary text
        textMuted: '#94A3B8',   // secondary text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 10px rgba(79, 70, 229, 0.6)',
        card: '0 4px 20px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
