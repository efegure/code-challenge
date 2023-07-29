/** @type {import('tailwindcss').Config} */
/* eslint-disable */ 
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
        ...fontFamily.sans,
      ],
    },
  },
  plugins: [],
}

