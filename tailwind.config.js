/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            maxWidth: 'none',
            a: {
              color: theme('colors.blue.600'),
              '&:hover': {
                color: theme('colors.blue.800'),
              },
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: theme('borderRadius.lg'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: theme('borderRadius.lg'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
