/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary - Health/Freshness (Green)
        primary: {
          DEFAULT: '#54d88c',
          foreground: '#242f2a',
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d4',
          300: '#86efb0',
          400: '#54d88c',
          500: '#2ec76f',
          600: '#1fa257',
          700: '#1a8047',
          800: '#19653c',
          900: '#175333',
        },
        // Secondary - Energy/Action (Orange)
        secondary: {
          DEFAULT: '#ffbf61',
          foreground: '#171717',
          50: '#fffbeb',
          100: '#fff4c6',
          200: '#ffe888',
          300: '#ffd64a',
          400: '#ffbf61',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Accent - Trust/Cleanliness (Blue) - keeping original
        accent: {
          DEFAULT: '#03A9F4',
          50: '#E1F5FE',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#03A9F4',
          600: '#039BE5',
          700: '#0288D1',
          800: '#0277BD',
          900: '#01579B',
        },
        // Neutral/Background colors
        background: '#F9FAFB',
        surface: '#FFFFFF',
        border: '#E5E7EB',
        // Text colors
        text: {
          primary: '#2D2D2D',
          secondary: '#6B7280',
        },
        // Status colors
        success: '#54d88c',
        error: '#E74C3C',
        warning: '#ffbf61',
        // Dark mode colors
        dark: {
          bg: '#171717',
          surface: '#242f2a',
          text: '#F3F4F6',
          border: '#404040',
        },
        // Nutrient-specific colors
        nutrient: {
          protein: '#03A9F4',
          carbs: '#ffbf61',
          fat: '#FDD835',
          fiber: '#54d88c',
          sugar: '#EC407A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Nunito Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'soft-md': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 12px 32px rgba(0, 0, 0, 0.12)',
        'glow-primary': '0 0 20px rgba(84, 216, 140, 0.3)',
        'glow-secondary': '0 0 20px rgba(255, 191, 97, 0.3)',
        'glow-accent': '0 0 20px rgba(3, 169, 244, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 1s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #54d88c 0%, #2ec76f 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ffbf61 0%, #f59e0b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #03A9F4 0%, #0288D1 100%)',
        'gradient-hero': 'linear-gradient(135deg, #54d88c 0%, #03A9F4 100%)',
      },
    },
  },
  plugins: [],
} 