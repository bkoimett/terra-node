/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0a0f0d',
          secondary: '#141f1a',
          tertiary: '#1e2e26',
        },
        accent: {
          green: '#34d399',
          amber: '#fbbf24',
          earth: '#a0826d',
        },
        text: {
          primary: '#f0fdf4',
          secondary: '#86efac',
          muted: '#4ade80',
        },
        border: {
          DEFAULT: '#1e3a2f',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
