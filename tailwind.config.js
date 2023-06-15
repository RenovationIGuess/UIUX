/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-green': '#22C55E',
        'dark-gray': '#556987',
        'less-bright-green': '#1AA94F',
        'background-gray': '#F7F8F9',
        '45-gray': 'rgba(0, 0, 0, 0.45)',
        '65-gray': 'rgba(0, 0, 0, 0.65)',
        '85-gray': 'rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
}

