/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './content/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0f172a', 900: '#0f172a', 800: '#1e293b' },
        brand: { DEFAULT: '#2563eb', 50: '#eff6ff', 100: '#dbeafe', 600: '#2563eb', 700: '#1d4ed8' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: { prose: '72ch' },
    },
  },
  plugins: [],
};
