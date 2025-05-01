/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ceci est important pour le fonctionnement du mode sombre
  theme: {
    extend: {},
  },
  plugins: [],
}
