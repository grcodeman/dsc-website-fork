/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      boxShadow: {
        'glow': '0 0 5px rgba(0, 255, 195, 0.3), 0 0 20px rgba(0, 255, 195, 0.2)',
        'glow-hover': '0 0 10px rgba(0, 255, 195, 0.5), 0 0 30px rgba(0, 255, 195, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s infinite',
        'border-rotate': 'border-rotate 4s linear infinite',
        'border-rotate-fast': 'border-rotate 1.5s linear infinite',
        'light-x': 'light-x 3s infinite linear',
        'light-y': 'light-y 3s infinite linear',
        'light-x-reverse': 'light-x-reverse 3s infinite linear',
        'light-y-reverse': 'light-y-reverse 3s infinite linear',
        'light-x-fast': 'light-x 1s infinite linear',
        'light-y-fast': 'light-y 1s infinite linear',
        'light-x-reverse-fast': 'light-x-reverse 1s infinite linear',
        'light-y-reverse-fast': 'light-y-reverse 1s infinite linear',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
        'border-rotate': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'move-right': {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        'move-down': {
          '0%': { top: '-100%' },
          '100%': { top: '200%' },
        },
        'move-left': {
          '0%': { right: '-100%' },
          '100%': { right: '200%' },
        },
        'move-up': {
          '0%': { bottom: '-100%' },
          '100%': { bottom: '200%' },
        },
      }
    },
  },
  plugins: [],
}
