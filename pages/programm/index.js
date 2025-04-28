import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { fetchSiteData } from 'graphql/api'
import { fetchUpcomingProgramme } from 'graphql/programmes'
import dayjs from 'dayjs'
import PostList from 'components/PostList'
import PostItem from 'components/PostItem'

export async function getStaticProps({ locale }) {
  const siteData = await fetchSiteData({ locale })
  const timeStart = '2022-12-04 00:00:00'
  const programme = await fetchUpcomingProgramme({ locale, timeStart })

  return {
    props: {
      upcomingEvents: programme.nodes,
      siteData,
    },
    revalidate: false,
  }
}

const Programme = ({ upcomingEvents }) => {
  const [filteredPosts, setFilteredPosts] = useState(upcomingEvents)

  const router = useRouter()

  useEffect(() => {
    if (router.query.category) {
      const postsByCategory = upcomingEvents.filter((event) => {
        return event.programmeCategories.nodes.some((category) => {
          return category.slug === router.query.category
        })
      })
      setFilteredPosts(postsByCategory)
    } else {
      setFilteredPosts(upcomingEvents)
    }
  }, [router])

  return (
    <>
      <PostList>
        {filteredPosts
          .sort((a, b) => {
            const dateA = new Date(a.programmeFields.startingDatetime)
            const dateB = new Date(b.programmeFields.startingDatetime)
            return dateA - dateB
          })
          .map((event) => {
            return (
              <PostItem key={event.id} post={event} postType="slug_programme" />
            )
          })}
      </PostList>
    </>
  )
}

export default Programme
