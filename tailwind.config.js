/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
      },
      colors: {
        primary: '#233862',
        orange: "#FFA500",
        lightBlue: "#ECECF8",
        green: "#00810D",
        red: "#FF0202"
      },
    },
  },
  variants: {
    lineClamp: ['responsive'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
  mode: 'jit',
  darkMode: 'class',
};
