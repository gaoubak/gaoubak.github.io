/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        d2: {
          bg:      '#0b0b10',
          surface: '#14141a',
          crimson: '#3a1418',
          red:     '#8a3a3f',
          teal:    '#2fe6d8',
          magenta: '#e91e8c',
          gold:    '#f2c14e',
          blue:    '#4a90d9',
          purple:  '#9632c8',
          gray:    '#4a4a5a',
          muted:   '#8a8a9a',
          text:    '#e8e8e8',
        },
      },
      fontFamily: {
        hud:  ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        tilePulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(47,230,216,0.25)', borderColor: '#2fe6d8' },
          '50%':      { boxShadow: '0 0 18px rgba(47,230,216,0.5)', borderColor: 'rgba(47,230,216,0.6)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'tile-pulse': 'tilePulse 2s ease-in-out infinite',
        'count-up':   'countUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
