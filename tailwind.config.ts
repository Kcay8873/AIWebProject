import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafaf9',
        foreground: '#1a1a1a',
        accent: '#1d4ed8',
        muted: '#525252',
        border: '#e5e5e5',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
            maxWidth: '72ch',
            a: {
              color: '#1d4ed8',
              textDecoration: 'underline',
              '&:hover': { color: '#1e40af' },
            },
            'h1,h2,h3,h4': {
              fontFamily: 'Newsreader, Georgia, serif',
            },
            code: {
              fontFamily: 'JetBrains Mono, Consolas, monospace',
              fontSize: '0.875em',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
