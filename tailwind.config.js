/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        palette1:
        {
          a: '#CCC9DC',
          b: '#324A5F',
          c: '#1B2A41',
          d: '#0C1821',
          e: '#000000',
        },
        palette2:
        {
          a: '#3E92CC',
          b: '#2A628F',
          c: '#13293D',
          d: '#16324F',
          e: '#18435A',
        },
      },
      fontFamily:
      {
        lacquer: ['Lacquer', 'sans-serif'],
        dancingscript: ['Dancing Script', 'sans-serif'],
        bokor: ['Bokor', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}