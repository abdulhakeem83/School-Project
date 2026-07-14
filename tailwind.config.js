/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette for Apple Valley Creative School — Blue / Red / Yellow.
        // Primary = brand blue (used across the school building & signage).
        primary: {
          DEFAULT: '#1D4ED8',
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b3ccff',
          300: '#84a9ff',
          400: '#5a86f5',
          500: '#3563e0',
          600: '#1D4ED8',
          700: '#1a41b0',
          800: '#173690',
          900: '#152e75',
        },
        // Accent = brand yellow (highlights, buttons, CTAs).
        accent: {
          DEFAULT: '#FFC20E',
          50: '#fff9e6',
          100: '#ffefbf',
          200: '#ffe285',
          300: '#ffd44d',
          400: '#ffcb26',
          500: '#FFC20E',
          600: '#e0a600',
          700: '#a67c00',
        },
        // Brand red (logo lettering, ribbons) — available as a supporting hue.
        brandred: {
          DEFAULT: '#E11D2A',
          50: '#fdeaec',
          100: '#fbccd0',
          200: '#f5969d',
          300: '#ef616b',
          400: '#e93b47',
          500: '#E11D2A',
          600: '#c01623',
          700: '#96111b',
        },
        success: {
          DEFAULT: '#2E8B57',
          light: '#e6f4ec',
        },
        ink: '#1E293B',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(29, 78, 216, 0.12)',
        card: '0 8px 30px -8px rgba(29, 78, 216, 0.18)',
        lift: '0 20px 45px -15px rgba(29, 78, 216, 0.30)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(120deg, rgba(21,46,117,0.92) 0%, rgba(29,78,216,0.80) 45%, rgba(29,78,216,0.55) 100%)',
        'brand-gradient': 'linear-gradient(120deg, #152e75 0%, #1D4ED8 100%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
