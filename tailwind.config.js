/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './blog/**/*.html',
    './martelinho-de-ouro/**/*.html',
    './peliculas-solares-insulfilm/**/*.html',
    './ppf-pelicula-protetora/**/*.html',
    './servicos-estetica-automotiva/**/*.html',
    './scripts/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2fcf1',
          100: '#e1f7de',
          300: '#8fcf89',
          400: '#6f9f6a',
          500: '#4e7f49',
          600: '#3d6538',
          700: '#32512e',
          800: '#2a4227',
          900: '#1a2e19',
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
        'hero-pattern': "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url('../imgs/wall.jpeg')",
        'wall-art': "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url('../imgs/wall.jpeg')",
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
    },
  },
  plugins: [],
};
