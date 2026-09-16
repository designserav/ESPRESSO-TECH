/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          base: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        background: '#FAFAFA',
        foreground: '#0A0A0A',
        secondary: '#525252',
        espresso: '#6F4328',
      },
      fontFamily: {
        satoshi: [
          'Satoshi',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass-pill': '0 20px 40px -12px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
        'glass-pill-hover': '0 28px 52px -12px rgba(0, 0, 0, 0.12), 0 12px 24px -4px rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 1)',
      },
    },
  },
  plugins: [],
}
