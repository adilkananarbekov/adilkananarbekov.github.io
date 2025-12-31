/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#07090c',
        'terminal-panel': 'rgba(10, 14, 18, 0.78)',
        'terminal-text': '#e8f7ff',
        'terminal-accent': '#7bff9e',
        'terminal-accent-2': '#36f5ff',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Chakra Petch', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
