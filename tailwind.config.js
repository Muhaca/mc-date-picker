/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'], // Pastikan lokasi file sesuai struktur project
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Definisikan nama font
      },
    },
  },
  plugins: [],
};
