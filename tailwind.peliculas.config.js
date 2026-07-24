/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './peliculas-solares-insulfilm/**/*.html',
    './scripts/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        moss: '#4F6F52',
        mossDark: '#3A523C',
        black: '#111111',
        surface: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        dock: '0 -10px 40px -10px rgba(0,0,0,0.1)',
        modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
