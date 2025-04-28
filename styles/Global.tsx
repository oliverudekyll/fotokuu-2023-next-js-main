import { remCalc, clampCalc } from 'lib/helpers'
import { globalCss } from 'stitches.config'

export const cssReset = globalCss({
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video':
    {
      margin: '0',
      padding: '0',
      border: '0',
      fontSize: '100%',
      font: 'inherit',
      verticalAlign: 'baseline',
    },
  'article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section':
    {
      display: 'block',
    },
  '*[hidden]': {
    display: 'none',
  },
  body: {
    lineHeight: '1',
  },
  'blockquote, q': {
    quotes: 'none',
  },
  'blockquote:before, blockquote:after, q:before, q:after': {
    content: '',
    // @ts-ignore
    content: 'none',
  },
  table: {
    borderSpacing: '0',
  },
})

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Strom',
      src: 'url("/fonts/Strom-DividedRegular.woff2") format("woff2")',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Tempel Softland',
      src: 'url("/fonts/TempelSoftland-Condensed.woff2") format("woff2")',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  ],
  ':root': {
    $headline: remCalc({ value: 54 }),
    $accentHeadline: remCalc({ value: 30 }),
    $h1: remCalc({ value: 20 }),
    $p: remCalc({ value: 15 }),
    '@medium': {
      $headline: remCalc({ value: 64 }),
      $h1: remCalc({ value: 24 }),
      $p: remCalc({ value: 18 }),
    },
    '@large': {
      $headline: remCalc({ value: 85 }),
    },
    '@xxlarge': {
      $headline: clampCalc({ value: 100 }),
      $accentHeadline: clampCalc({ value: 55 }),
      $h1: clampCalc({ value: 24 }),
      $p: clampCalc({ value: 16 }),
    },
  },
  body: {
    fontSize: '$p',
    fontFamily: '$body',
    lineHeight: 1,
    margin: 0,
  },
  a: {
    color: 'black',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '$secondary',
    },
  },
  'h1, h2': {
    fontFamily: '$accent',
    fontSize: '$accentHeadline',
    lineHeight: 0.8,
    marginBottom: '$1',

    '@xlarge': {
      marginBottom: '$2',
    },
  },
  'i, em': {
    fontStyle: 'italic',
  },
  figure: {
    position: 'relative',
    marginBottom: '$1',
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  figcaption: {
    color: '$gray',
    marginTop: '0.25rem',
    marginBottom: '2rem',
  },
  p: {
    fontSize: '$p',
    lineHeight: 1.1,
  },
  ul: {
    margin: '$2',
    li: {
      marginBottom: '0.5rem',
      '&:last-child': {
        marginBottom: '0',
      },
    },
  },
  'b, strong': {
    fontWeight: 'bold',
  },
  '.details p': {
    fontSize: '$p !important',
    marginBottom: '0 !important',
  },
  hr: {
    border: 'none',
    height: '1px',
    backgroundColor: '$primary',
    margin: '2rem 0',
  },
})
