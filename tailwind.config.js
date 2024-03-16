/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        devtalles: {
          100: "#c5c4ff",
          200: "#a6a1ff",
          300: "#8d7cfd",
          400: "#6131d1",
          500: "#26184a",
          600: "#1d1238",
        }
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#6131D1",
          "secondary": "#8D7CFD",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

