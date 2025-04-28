import { createStitches } from '@stitches/react'
import { remCalc } from 'lib/helpers'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    fonts: {
      body: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      heading: '"Tempel Softland", Impact, sans-serif',
      accent: '"Strom", Helvetica, Arial, sans-serif',
    },
    fontSizes: {
      headline: 'var(--headline)',
      accentHeadline: 'var(--accentHeadline)',
      h1: 'var(--h1)',
      p: 'var(--p)',
    },
    letterSpacings: {
      heading: '0.02rem',
    },
    colors: {
      primary: '#000',
      secondary: '#ED1C24',
      gray: '#999',
    },
    space: {
      1: '1rem',
      2: '3rem',
      3: '5rem',
      4: '15rem',
      gutter: '$2',
    },
  },
  media: {
    small: '(max-width: 639px)',
    medium: '(min-width: 640px)',
    mediumOnly: '(min-width: 640px) and (max-width: 999px)',
    mediumDown: '(max-width: 999px)',
    large: '(min-width: 1000px)',
    xlargeDown: '(max-width: 1199px)',
    xlarge: '(min-width: 1200px)',
    xxlarge: '(min-width: 1440px)',
  },
})
