module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.js', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'courierPrime': "'Courier Prime', monospace"
    },
    rotate: {
      '-25': '-25deg',
      '-12': '-12deg',
      25: '25deg',
      12: '12deg',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
