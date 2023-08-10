/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
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
}