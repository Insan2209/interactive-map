/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

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
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
  safelist: [
    'bg-sky-800', 'bg-indigo-800', 'bg-green-800', 'bg-red-800', 'bg-gray-800',
    'hover:bg-sky-600', 'hover:bg-indigo-600', 'hover:bg-green-600', 'hover:bg-red-600', 'hover:bg-gray-600'
  ],
  
}

