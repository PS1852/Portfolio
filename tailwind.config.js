/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        ink: '#0F1F17',
        muted: '#4B5E54',
        'off-white': '#F8FAF9',
        'light': '#F0F4F2',
        'border-green': '#D1E7DD',
        'dark-bg': '#0A1F14',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'drift': 'drift 10s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      backgroundImage: {
        'emerald-gradient': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'dark-emerald': 'linear-gradient(135deg, #0A1F14 0%, #061210 100%)',
        'light-mesh': 'radial-gradient(at 40% 20%, #ecfdf5 0px, transparent 50%), radial-gradient(at 80% 0%, #d1fae5 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
}