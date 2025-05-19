/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06b6d4',
          light: '#67e8f9',
          dark: '#0891b2'
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          light: '#7dd3fc',
          dark: '#0369a1'
        },
        aqua: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        },
        accent: '#8b5cf6',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',  // Added
          500: '#64748b',  // Added
          600: '#475569',  // Added
          700: '#334155',  // Added
          800: '#1e293b',  // Added
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      backgroundImage: {
        'aqua-gradient': 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
        'aqua-gradient-soft': 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)',
        'aqua-wave': 'linear-gradient(135deg, #0891b2 0%, #0ea5e9 50%, #06b6d4 100%)',
        'aqua-dark': 'linear-gradient(135deg, #0e7490 0%, #0369a1 100%)',
      },
      borderRadius: {
        'wave': '64% 36% 70% 30% / 53% 51% 49% 47%',
        'bubble': '60% 40% 40% 60% / 60% 30% 70% 40%',
        'water': '35% 65% 65% 35% / 40% 30% 70% 60%',
        'flow': '50% 50% 34% 66% / 56% 68% 32% 44%',
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}