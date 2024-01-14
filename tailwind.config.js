/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./myresume/templates/**/*.html",
    "./myresume/templatetags/*.py",
    "./myresume/assets-src/img/icons/*.svg",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["'Press Start 2P'", "serif"],
      },
      maxWidth: {
        256: "64rem",
      }
    },
  },
  plugins: [],
}
