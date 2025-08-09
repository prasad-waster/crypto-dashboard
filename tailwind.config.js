/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crypto-dark': '#1a1a2e',
        'crypto-blue': '#16213e',
        'crypto-purple': '#0f4c75',
        'crypto-green': '#00d4aa',
        'crypto-red': '#ff6b6b',
      },
    },
  },
  plugins: [],
}