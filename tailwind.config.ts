import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          orange: '#F97316',
        },
      },
    },
  },
  plugins: [],
}
export default config
