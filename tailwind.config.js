/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Island theme colors
        island: {
          primary: '#4ade80',
          secondary: '#22c55e',
          accent: '#86efac',
          background: '#f0fdf4',
          surface: '#dcfce7',
        },
        // Minecraft theme colors
        minecraft: {
          primary: '#8b4513',
          secondary: '#654321',
          accent: '#228b22',
          background: '#87ceeb',
          surface: '#90ee90',
        },
        // Modern theme colors
        modern: {
          primary: '#3b82f6',
          secondary: '#1d4ed8',
          accent: '#60a5fa',
          background: '#f8fafc',
          surface: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}