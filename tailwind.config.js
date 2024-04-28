/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {codeCademy: {
          "primary": "#f3f3f3",
          "secondary": "#fdd100",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#10162f",
        }
      }
    ],
  }
}

