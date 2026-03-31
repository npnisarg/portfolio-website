import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // JetBrains Mono: distinctive technical font — far more characterful than Roboto Mono
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
        // Syne: bold geometric display font — editorial, memorable
        display: ['Syne', 'sans-serif'],
        // DM Sans: clean, slightly humanist — better than Inter for body
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          deep:  '#F4F0E8',   // warm cream — page background
          dark:  '#F0EBE1',   // slightly darker cream — section alternates
          card:  '#FFFFFF',   // pure white cards (pop against cream)
          card2: '#FAF8F4',   // near-white secondary cards
        },
        // Deep accent colors — better contrast on cream than neon variants
        neon: {
          purple: '#7C3AED',   // deep violet (was neon #a855f7)
          cyan:   '#0284C7',   // sky blue (was #06b6d4)
          green:  '#059669',   // deep emerald (was #10b981)
          pink:   '#DB2777',   // deep rose (was #ec4899)
          blue:   '#2563EB',   // deep blue (was #3b82f6)
        },
      },
      animation: {
        'gradient-x':  'gradient-x 6s ease infinite',
        'float':       'float 5s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':   'spin 8s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
export default config
