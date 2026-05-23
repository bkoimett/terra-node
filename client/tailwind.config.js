/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0A120E',
          light: '#141F1A',
          muted: '#1C2A22',
        },
        sage: {
          DEFAULT: '#86EFAC',
          dim: '#4ADE80',
          glow: 'rgba(134, 239, 172, 0.15)',
        },
        amber: {
          warm: '#F59E0B',
        },
        terra: {
          DEFAULT: '#E07A5F',
          dim: '#C96A52',
        },
        canvas: {
          text: '#F4F7F4',
          muted: '#A8B5A8',
          subtle: '#6B7A6E',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.06)',
          strong: 'rgba(134, 239, 172, 0.2)',
        },
        /* Legacy aliases — map to Regenerative Canvas */
        bg: {
          primary: '#0A120E',
          secondary: '#141F1A',
          tertiary: '#1C2A22',
        },
        accent: {
          green: '#86EFAC',
          amber: '#F59E0B',
          earth: '#E07A5F',
        },
        text: {
          primary: '#F4F7F4',
          secondary: '#C5D4C7',
          muted: '#8A9A8C',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        base: ['16px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        canvas: '1.25rem',
        pill: '9999px',
      },
      boxShadow: {
        canvas:
          '0 20px 50px rgba(10, 18, 14, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
        'canvas-hover':
          '0 28px 60px rgba(10, 18, 14, 0.55), 0 0 40px rgba(134, 239, 172, 0.08)',
        glow: '0 0 48px rgba(134, 239, 172, 0.12)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(134, 239, 172, 0.12), transparent 60%)',
        'terra-wash':
          'linear-gradient(135deg, rgba(224, 122, 95, 0.08) 0%, transparent 50%, rgba(245, 158, 11, 0.06) 100%)',
      },
    },
  },
  plugins: [],
};
