/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1D',
        teal: '#00FFC3',
        violet: '#B200FF',
        offwhite: '#E5E5E5',
      },
      fontFamily: {
        heading: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}
