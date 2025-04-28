import { fetchSiteData } from 'graphql/api'
import { fetchNews } from 'graphql/news'
import PostList from 'components/PostList'
import PostItem from 'components/PostItem'

export async function getStaticProps({ locale }) {
  const siteData = await fetchSiteData({ locale })
  const news = await fetchNews({ locale, first: 12 })

  return {
    props: {
      posts: news.nodes,
      siteData,
    },
    revalidate: false,
  }
}

const News = ({ posts }) => {
  return (
    <PostList>
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} postType="slug_post" />
      })}
    </PostList>
  )
}

export default News
