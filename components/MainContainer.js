import { styled } from 'stitches.config'

const MainContainer = ({ children, fullWidth }) => {
  return (
    <Container>
      <Content fullWidth={fullWidth}>{children}</Content>
    </Container>
  )
}

export default MainContainer

const Container = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$gutter',
  margin: '$2 $1',
  '@large': {
    margin: '$3 $2',
  },
  '@xlarge': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
})

const Content = styled('div', {
  'p,ul': {
    fontSize: '$h1',
  },
  p: {
    marginBottom: '1rem',
  },
  '@xlarge': {
    gridArea: '1 / 2 / 1 / span 2',
  },
  variants: {
    fullWidth: {
      true: {
        '@xlarge': {
          gridArea: '1 / span 4',
        },
      },
    },
  },
})
