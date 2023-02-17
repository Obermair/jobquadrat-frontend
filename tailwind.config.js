/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',

  content: ["./src/**/*.{html,ts}"], 
  theme: {
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}