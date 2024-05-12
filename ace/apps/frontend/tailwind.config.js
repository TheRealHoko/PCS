const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      primary: {
        light: '#C18428',
        DEFAULT: '#C18428',
      },
      secondary: {
        light: '#FFFFFF',
        DEFAULT: '#FFFFFF',
      },
      tertiary: {
        light: '#FF8383',
        DEFAULT: '#FF8383',
      },
      error: {
        DEFAULT: colors.red[800],
      },
    },
    extend: {},
  },
  plugins: [],
};
