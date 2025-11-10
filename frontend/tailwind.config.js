/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swank-grey': '#b6b1b2',
        'petrified': '#8b8580',
        'reynard': '#b56547',
        'chocolate-choco': '#624d41',
        'glory-red': '#a50805',
        'black-slug': '#301d14',
      },
    },
  },
  plugins: [],
}