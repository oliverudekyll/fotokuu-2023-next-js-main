import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import 'dayjs/locale/et'
import updateLocale from 'dayjs/plugin/updateLocale'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import { breakpoint } from 'utils/helpers'
import getStringTranslation from 'utils/getStringTranslation'
import ButtonClose from 'components/ButtonClose'
import PostImage from 'components/PostImage'

const InfoWindow = ({ content, onClick }) => {
  const { locale } = useRouter()
  dayjs.locale(locale)
  dayjs.extend(updateLocale)

  dayjs.updateLocale('et', {
    months: [
      'Jaanuarikuu',
      'Veebruarikuu',
      'Märtsikuu',
      'Aprillikuu',
      'Maikuu',
      'Juunikuu',
      'Juulikuu',
      'Augustikuu',
      'Septembrikuu',
      'Oktoobrikuu',
      'Novembrikuu',
      'Detsembrikuu',
    ],
  })

  const {
    festivalStartDate,
    performers,
    yearOfEstablishment,
    location,
    homepage,
    facebook,
    instagram,
    youtube,
    sound,
    light,
    rental,
    capacity,
    videoUrl,
    riderUrl,
  } = content.locationFields

  return (
    <>
      <Wrapper isVisible={content}>
        <Inner>
          <Close>
            <ButtonClose onClick={onClick} />
          </Close>

          <Header>
            <h2>{content.title}</h2>

            {festivalStartDate && (
              <p>
                <time dateTime={festivalStartDate}>
                  {dayjs(festivalStartDate).format('MMMM')}
                </time>
              </p>
            )}
          </Header>

          {videoUrl ? (
            <EmbedWrapper>
              <ReactPlayer
                url={videoUrl}
                muted={true}
                volume={0}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, autoplay: 1 },
                  },
                  vimeo: {
                    background: true,
                    controls: true,
                    muted: true,
                  },
                }}
                width="100%"
                height="100%"
              />
            </EmbedWrapper>
          ) : (
            <ImageWrapper>
              <PostImage
                imageId={content.featuredImageId}
                imageUrl={content.featuredImage?.node.mediaItemUrl}
                imageCaption={content.featuredImage?.node.caption}
                imageSize="50vw"
              />
            </ImageWrapper>
          )}

          {performers && (
            <div>
              <h3>{getStringTranslation('performers')}:</h3>
              <LargeText>{performers}</LargeText>
            </div>
          )}

          <TechnicalInfo>
            {yearOfEstablishment && (
              <div>
                <h3>{getStringTranslation('year_of_establishment')}:</h3>
                <LargeText>{yearOfEstablishment}</LargeText>
              </div>
            )}
            <div>
              <h3>{getStringTranslation('opportunities')}:</h3>
              <ul>
                {sound && <li>{getStringTranslation('sound')}</li>}
                {light && <li>{getStringTranslation('light')}</li>}
                {rental && <li>{getStringTranslation(rental)}</li>}
              </ul>
            </div>
            {capacity && (
              <div>
                <h3>{getStringTranslation('capacity')}:</h3>
                <LargeText>
                  {new Intl.NumberFormat(locale).format(capacity)}
                </LargeText>
              </div>
            )}
            {riderUrl && (
              <div>
                <h3>{getStringTranslation('technical_info')}:</h3>
                <a href={riderUrl} target="_blank" rel="noreferrer noopener">
                  Link
                </a>
              </div>
            )}
          </TechnicalInfo>

          <Contact>
            {location.streetName && (
              <p>
                {location.streetName} {location.streetNumber}, {location.city}
              </p>
            )}

            <SocialMedia>
              {facebook && (
                <a href={facebook} target="_blank" rel="noreferrer noopener">
                  Facebook
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noreferrer noopener">
                  Instagram
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noreferrer noopener">
                  YouTube
                </a>
              )}
              {homepage && (
                <a href={homepage} target="_blank" rel="noreferrer noopener">
                  {getStringTranslation('homepage')}
                </a>
              )}
            </SocialMedia>
          </Contact>
        </Inner>
      </Wrapper>
    </>
  )
}

export default InfoWindow

const Wrapper = styled.div`
  font-size: var(--font-size-small);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35%;
  height: 100%;
  overflow-y: scroll;
  background-color: var(--color-green);
  padding: calc(2 * var(--gutter));

  ${breakpoint.lessThan('large')`
    height: 75%;
    width: 100%;
  `}

  h2,
  h3,
  p {
    margin: 0;
  }

  h2,
  h3 {
    font-family: var(--font-family-body);
  }

  h3 {
    font-size: var(--font-size-body);
  }

  ul {
    list-style-type: square;
    margin-left: 1rem;
  }

  figure {
    padding-bottom: 0;
    margin-bottom: 2rem;
  }

  a {
    font-weight: bold;
    text-decoration: none;

    &:after {
      content: '→';
      font-feature-settings: 'ss03' 1;
      font-weight: normal;
      padding-left: 0.25rem;
    }
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;

  > * {
    padding-bottom: 2rem;
  }
`

const Close = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
`

const Header = styled.header`
  h2,
  p {
    font-size: var(--font-size-h2);
  }

  h2 {
    font-weight: bold;
  }
`

const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0;

  figcaption {
    bottom: -1.5rem;
  }
`

const LargeText = styled.p`
  font-size: var(--font-size-h2);
  font-weight: bold;
`

const TechnicalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`

const Contact = styled.footer`
  display: flex;
  justify-content: space-between;

  p {
    align-self: flex-end;
  }
`

const SocialMedia = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
`

const EmbedWrapper = styled.figure`
  > div {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
  }
`
