/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette for North Public School.
        primary: {
          DEFAULT: '#0F4C81',
          50: '#eef5fb',
          100: '#d5e6f4',
          200: '#aacce9',
          300: '#7aaedb',
          400: '#4a8ecb',
          500: '#2b71b3',
          600: '#1d5a94',
          700: '#0F4C81',
          800: '#0c3c66',
          900: '#0a2f4f',
        },
        accent: {
          DEFAULT: '#FFB703',
          50: '#fff8e6',
          100: '#ffedbf',
          200: '#ffdf85',
          300: '#ffd04d',
          400: '#ffc21f',
          500: '#FFB703',
          600: '#d99a00',
          700: '#a67600',
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
        soft: '0 4px 20px -4px rgba(15, 76, 129, 0.12)',
        card: '0 8px 30px -8px rgba(15, 76, 129, 0.18)',
        lift: '0 20px 45px -15px rgba(15, 76, 129, 0.30)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(120deg, rgba(10,47,79,0.92) 0%, rgba(15,76,129,0.80) 45%, rgba(15,76,129,0.55) 100%)',
        'brand-gradient': 'linear-gradient(120deg, #0F4C81 0%, #1d5a94 100%)',
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
