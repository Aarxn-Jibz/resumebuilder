/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        'background-dark': '#0f172a',
        'card-dark': '#1e293b',
        'text-dark': '#f8fafc',
        'subtext-dark': '#94a3b8',
        'border-dark': '#334155',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}