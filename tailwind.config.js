/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0D1015',
          900: '#14181F',
          800: '#1D232C',
          700: '#2A313C',
          600: '#3B4453',
          500: '#5A6577',
        },
        mist: {
          400: '#8B93A1',
          200: '#C4C9D1',
          50: '#E8EAED',
        },
        amber: {
          DEFAULT: '#E8A33D',
          soft: '#3A2F1C',
        },
        teal: {
          DEFAULT: '#5EA88A',
          soft: '#1B2C27',
        },
        brick: {
          DEFAULT: '#D1654F',
          soft: '#2E1D1A',
        },
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
