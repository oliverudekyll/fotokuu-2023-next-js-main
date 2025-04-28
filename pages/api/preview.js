import { getPreviewPost, fetchRefreshToken } from 'graphql/api'

export default async function preview(req, res) {
  const { secret, id, post_type } = req.query

  // Check the secret and ID parameter
  if (
    !process.env.WP_PREVIEW_SECRET ||
    secret !== process.env.WP_PREVIEW_SECRET ||
    !id
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const getToken = await fetchRefreshToken()
  const refreshToken = getToken?.login.refreshToken
  const post = await getPreviewPost({ id, refreshToken })

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Post not found' })
  }

  // Enable Preview Mode by setting the cookies

  res.setPreviewData({
    post: {
      databaseId: post.databaseId,
      slug: post.slug,
      status: post.status,
    },
    refreshToken,
  })

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `/${post_type === 'page' ? '' : `${post_type}/`}${
      post.slug || post.databaseId
    }`,
  })

  res.end()
}
