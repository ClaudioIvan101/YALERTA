module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './index.ts',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'ya-primary': '#4dfd9d',
        'ya-surface': '#090e1c',
        'ya-surface-low': '#0d1323',
        'ya-surface-high': '#181f33',
        'ya-error': '#ff716c',
        'ya-tertiary': '#feb700',
        'ya-text-muted': '#a6aabf',
      },
      fontFamily: {
        headline: ['Space Grotesk'],
      },
    },
  },
  plugins: [],
};