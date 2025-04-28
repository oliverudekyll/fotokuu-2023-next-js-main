import { fetchSiteData } from 'graphql/api'
import { fetchPage, fetchPagesList } from 'graphql/page'
import MainContainer from 'components/MainContainer'
import FeaturedImage from 'components/FeaturedImage'
import Partners from 'components/Partners'

export async function getStaticPaths() {
  const data = await fetchPagesList()
  const pages = ['programm', 'fotokuust', 'uudised', 'partnerid']

  const paths = data
    .filter((page) => !pages.includes(page.slug))
    .map((post) => ({
      params: { slug: post.slug },
    }))

  return {
    paths,
    fallback: 'blocking',
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
  const data = await fetchPage({ slug, preview, previewData })

  return {
    props: {
      data,
      siteData,
    },
    revalidate: false,
  }
}

const Page = ({ data }) => {
  return (
    <MainContainer>
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
