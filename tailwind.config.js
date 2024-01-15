/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./myresume/theme.py",
    "./myresume/templates/**/*.html",
    "./myresume/templatetags/*.py",
    "./myresume/assets-src/img/icons/*.svg",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        pixel: ["'Press Start 2P'", "monospace"],
      },
      maxWidth: {
        256: "64rem",
      }
    },
  },
  plugins: [],
}
