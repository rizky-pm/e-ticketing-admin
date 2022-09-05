let plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('nth-first', '&:nth-child(1)');
      addVariant('nth-second', '&:nth-child(2)');
      addVariant('nth-third', '&:nth-child(3)');
      addVariant('nth-fourth', '&:nth-child(4)');
      addVariant('nth-fifth', '&:nth-child(5)');
      addVariant('nth-sixth', '&:nth-child(6)');
      addVariant('nth-seventh', '&:nth-child(7)');

      addVariant('nth-type-first', '&:nth-of-type(1)');
      addVariant('nth-type-second', '&:nth-of-type(2)');
      addVariant('nth-type-third', '&:nth-of-type(3)');
      addVariant('nth-type-fourth', '&:nth-of-type(4)');
      addVariant('nth-type-fifth', '&:nth-of-type(5)');
      addVariant('nth-type-sixth', '&:nth-of-type(6)');
      addVariant('nth-type-seventh', '&:nth-of-type(7)');
    }),
  ],
};
