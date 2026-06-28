/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta principal solicitada
        marfil: {
          DEFAULT: '#F4EFE2',
          50: '#FBF9F3',
          100: '#F4EFE2',
          200: '#EBE3CE',
          300: '#DFD3B4',
        },
        celeste: {
          DEFAULT: '#7FB9DD',
          50: '#EAF4FB',
          100: '#D4E9F6',
          200: '#A9D2EC',
          300: '#7FB9DD',
          400: '#4AA3DF',
        },
        // Colores institucionales UCR
        ucr: {
          azul: '#0067A0',   // Azul institucional UCR
          celeste: '#4AA3DF',
          verde: '#00713C',  // Verde del escudo
          amarillo: '#F2C200', // Girasol / sol del escudo
          tinta: '#1F3A4D',  // Texto oscuro azulado
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(31, 58, 77, 0.25)',
      },
    },
  },
  plugins: [],
}
