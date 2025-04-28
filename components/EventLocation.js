import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'

const EventLocation = ({ location, address }) => {
  return (
    <Location>
      <Wrapper>
        <p>{location}</p>
        {address && (
          <LinkWrapper>
            <LocationLink
              href={`https://www.google.com/maps/dir/?api=1&destination=${address}`}
              target="_blank">
              {getStringTranslation('openMap')}
            </LocationLink>
          </LinkWrapper>
        )}
      </Wrapper>
    </Location>
  )
}

export default EventLocation

const Location = styled('div', {
  marginBottom: '$1',
})

const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$gutter',
  '@medium': {
    justifyContent: 'flex-end',
  },
  p: {
    fontSize: '$p',
  },
})

const LinkWrapper = styled('div', {
  textAlign: 'right',
  '@mediumDown': {
    flexBasis: '50%',
  },
})

const LocationLink = styled('a', {
  display: 'inline-block',
  backgroundColor: '$primary',
  color: 'white',
  marginLeft: '$s',
  padding: '0.5rem',
  borderRadius: '4rem',
  border: '2px solid $primary',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '$white',
    color: '$primary',
  },
  '@medium': {
    textAlign: 'right',
  },
})
