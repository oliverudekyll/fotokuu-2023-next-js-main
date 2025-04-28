import { styled } from 'stitches.config'
import { fetchSiteData } from 'graphql/api'
import { fetchProgramme, fetchProgrammeList } from 'graphql/programmes'
import EventDate from 'components/EventDate'
import EventLocation from 'components/EventLocation'
import FeaturedImage from 'components/FeaturedImage'
import RelatedArtists from '../../components/RelatedArtists'
import RelatedEvents from '../../components/RelatedEvents'
import SubHeading from '../../components/SubHeading'

export async function getStaticPaths({ locales }) {
  const data = await fetchProgrammeList()

  const paths = data
    .map((post) =>
      locales.map((locale) => ({
        params: { slug: post.slug },
        locale,
      })),
    )
    .flat()

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({
  params,
  locale,
  preview = null,
  previewData,
}) {
  const { slug } = params
  const siteData = await fetchSiteData({ locale })
  const data = await fetchProgramme({ slug, preview, previewData })

  if (data.content) {
    data.content = data.content.replace(/\[details\]/g, '<div class="details">')
    data.content = data.content.replace(/\[\/details\]/g, '</div>')
  }

  return {
    props: {
      data,
      siteData,
      translation: data?.translations[0]?.slug,
      preview,
    },
    revalidate: false,
  }
}

const SingleProgramme = ({ data }) => {
  return (
    <Container>
      <Header>
        <Title>
          <div>
            {data?.programmeFields && (
              <EventDate
                startingDateTime={data?.programmeFields?.startingDatetime}
                endingDateTime={data?.programmeFields?.endingDatetime}
                isLarge
              />
            )}
            {data?.programmeFields?.subheading && (
              <SubHeading>{data.programmeFields.subheading}</SubHeading>
            )}
            <h1>{data?.title}</h1>
          </div>
          {data?.programmeFields && (
            <EventLocation
              location={data.programmeFields?.locationName}
              address={data.programmeFields?.locationAddress?.streetAddress}
            />
          )}
        </Title>

        <FeaturedImage
          image={data?.featuredImage?.node}
          caption={data?.featuredImage?.node?.imageCaption?.imageCaption}
        />
      </Header>
      <Content dangerouslySetInnerHTML={{ __html: data?.content }} />
      <Artists>
        {data?.programmeFields?.relatedArtists && (
          <RelatedArtists artists={data?.programmeFields?.relatedArtists} />
        )}
      </Artists>
      <Related>
        {data?.programmeFields?.relatedEvents && (
          <RelatedEvents events={data?.programmeFields?.relatedEvents} />
        )}
      </Related>
    </Container>
  )
}

export default SingleProgramme

const Container = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$gutter',
  margin: '$2 $1',
  '@large': {
    margin: '$3 $2',
  },
  '@xlarge': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
})

const Header = styled('div', {
  '@xlarge': {
    gridArea: '1 / span 5',
  },
})

const Title = styled('header', {
  marginBottom: '$l',
  h1: {
    fontFamily: '$heading',
    fontSize: '$headline',
    letterSpacing: '$heading',
    textAlign: 'right',
  },
  '@medium': {
    gridTemplateColumns: '1fr 1fr',
    display: 'grid',
    gridArea: '1 / span 3',
    gap: '$gutter',
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
    gridArea: '2 / span 3',
  },
})

const Artists = styled('div', {
  '@xlarge': {
    gridArea: '2 / 4',
  },
})

const Related = styled('div', {
  '@xlarge': {
    gridArea: '2 / 5',
  },
})
