import Link from 'next/link'
import { styled } from 'stitches.config'
import { getStringTranslation } from 'utils/getStringTranslation'
import EventDate from './EventDate'
import PostDate from './PostDate'
import FeaturedImage from './FeaturedImage'
import SubHeading from './SubHeading'

const PostItem = ({ post, postType }) => {
  const postDate = post.date
  const startingDateTime = post?.programmeFields?.startingDatetime
  const endingDateTime = post?.programmeFields?.endingDatetime

  return (
    <Container href={`/${getStringTranslation(postType)}/${post.slug}`}>
      <FeaturedImage image={post.featuredImage?.node} />
      {postType === 'slug_programme' ? (
        <EventDate
          startingDateTime={startingDateTime}
          endingDateTime={endingDateTime}
        />
      ) : (
        <PostDate date={postDate} />
      )}
      {post?.programmeFields?.subheading && (
        <SubHeading>{post.programmeFields.subheading}</SubHeading>
      )}
      <h2>{post.title}</h2>
    </Container>
  )
}

export default PostItem

const Container = styled(Link, {
  textDecoration: 'none',
})
