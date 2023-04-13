/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'brand': {
          200: '#D9BDF9',
          400: '#8146D2',
          500: '#811AC0',
        },
        'brand-title': '#041B72',
        'neutral': {
          200: '#FAFAFA',
          400: '#EEEFF3',
          500: '#DEDEDE',
          600: '#D9D9D9',
          700: '#6E6E6E',
        }
      }
    },
  },
  plugins: [],
}
