import { styled } from 'stitches.config'

export default styled('button', {
  fontFamily: '$body',
  padding: '0.05rem 0.2rem',
  textDecoration: 'none',
  border: '2px solid transparent',
  '&:hover, &:active': {
    borderColor: '$primary',
  },
  variants: {
    active: {
      true: {
        borderColor: '$primary',
      },
    },
  },
})
