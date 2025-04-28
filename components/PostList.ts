import { styled } from 'stitches.config'

export default styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3 $gutter',
  margin: '$2 $1',
  div: {
    marginBottom: '$1',
  },
  h2: {
    marginBottom: 0,
  },
  '@large': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    margin: '$3 $2',
  },
})
