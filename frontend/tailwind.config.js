// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ya-primary': '#4dfd9d',          // El verde neón del logo
        'ya-surface': '#090e1c',          // El fondo azul profundo
        'ya-surface-low': '#0d1323',      // Gris para tarjetas
        'ya-surface-high': '#181f33',     // Gris claro para bordes
        'ya-error': '#ff716c',            // Rojo alerta
        'ya-tertiary': '#feb700',         // Amarillo batería/aviso
        'ya-text-muted': '#a6aabf',       // Texto gris
      },
      fontFamily: {
        'headline': ['Space Grotesk'],    // Si las instalás, sino usa system
      }
    },
  },
  plugins: [],
}