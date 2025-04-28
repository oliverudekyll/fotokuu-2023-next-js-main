import { fetchSiteData } from 'graphql/api'
import { fetchPage, fetchPagesList } from 'graphql/page'
import MainContainer from 'components/MainContainer'
import FeaturedImage from 'components/FeaturedImage'
import Partners from 'components/Partners'

export async function getStaticProps({ locale, preview = null, previewData }) {
  const siteData = await fetchSiteData({ locale })
  const data = await fetchPage({
    slug: locale === 'en' ? 'partners' : 'partnerid',
    preview,
    previewData,
  })

  return {
    props: {
      data,
      siteData,
    },
    revalidate: 10,
  }
}

const Page = ({ data }) => {
  return (
    <MainContainer fullWidth>
      <h1>{data?.title}</h1>

      {data?.featuredImage && (
        <FeaturedImage
          image={data.featuredImage?.node}
          caption={data.featuredImage?.node?.imageCaption?.imageCaption}
        />
      )}

      <article dangerouslySetInnerHTML={{ __html: data?.content }} />

      {data?.template?.partners && (
        <Partners partners={data?.template?.partners?.partners} />
      )}
    </MainContainer>
  )
}

export default Page
