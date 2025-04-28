import { fetchSiteData } from 'graphql/api'
import { fetchPost, fetchNewsList } from 'graphql/news'
import MainContainer from 'components/MainContainer'
import PostDate from 'components/PostDate'
import FeaturedImage from 'components/FeaturedImage'

export async function getStaticPaths({ locales }) {
  const data = await fetchNewsList()

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
  const data = await fetchPost({ slug, preview, previewData })

  if (data.content) {
    data.content = data.content.replace(/\[details\]/g, '<div class="details">')
    data.content = data.content.replace(/\[\/details\]/g, '</div>')
  }

  return {
    props: {
      data,
      siteData,
      translation: data?.translations[0]?.slug ?? null,
      preview,
    },
    revalidate: 10,
  }
}

const SingleNews = ({ data }) => {
  return (
    <MainContainer>
      <PostDate date={data?.date} />

      <h1>{data?.title}</h1>

      <FeaturedImage
        image={data?.featuredImage?.node}
        caption={data?.featuredImage?.node?.imageCaption?.imageCaption}
      />

      <article dangerouslySetInnerHTML={{ __html: data?.content }} />
    </MainContainer>
  )
}

export default SingleNews
