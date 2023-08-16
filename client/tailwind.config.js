/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1536px' },
      // => @media (max-width: 1536px) { ... }
      'xl': { 'max': '1280px' },
      // => @media (max-width: 1280px) { ... }
      'lg': { 'max': '1024px' },
      // => @media (max-width: 1024px) { ... }
      'md': { 'max': '768px' },
      // => @media (max-width: 768px) { ... }
      'sm': { 'max': '640px' },
      // => @media (max-width: 640px) { ... }
      'xs': { 'max': '480px' },
      // => @media (max-width: 640px) { ... }
    },
    extend: {
      transitionProperty: {
        'right': 'right',
        'grid-template-rows': 'grid-template-rows',
      },
      listStyleType: {
        square: 'square'
      },
      borderWidth: {
        "6": "6px"
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    })
  ],
}