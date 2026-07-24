/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './servicos-estetica-automotiva/**/*.html',
    './scripts/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#8fcf89',
          400: '#6f9f6a',
          500: '#4e7f49',
          600: '#3d6538',
          700: '#32512e',
          800: '#2a4227',
          900: '#233722',
        },
        dark: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#121212',
          700: '#1c1c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('../servicos-estetica-automotiva/imgs/image.png')",
      },
      keyframes: {
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        progress: 'progress 3s linear forwards',
      },
    },
  },
  plugins: [],
};
