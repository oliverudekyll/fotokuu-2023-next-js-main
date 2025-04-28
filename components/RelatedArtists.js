import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'
import Accordion from './Accordion'

const RelatedArtists = ({ artists }) => {
  return (
    <Container>
      <h2>{getStringTranslation('artists')}</h2>
      <Accordion items={artists} />
    </Container>
  )
}

export default RelatedArtists

const Container = styled('div', {
  'div p': {
    fontSize: '$p',
  },
})
