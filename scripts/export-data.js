import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

// WordPress GraphQL endpoint
const WORDPRESS_URL = 'https://fotokuu-23-admin.fotokuu.ee/graphql'

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(WORDPRESS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch data from WordPress')
  }
  return json.data
}

// Query to get all posts with their images
const POSTS_QUERY = `
  query {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        date
        content
        featuredImage {
          node {
            mediaItemUrl
            altText
            caption
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`

async function downloadImage(url, filePath) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  fs.writeFileSync(filePath, buffer)
}

async function exportData() {
  try {
    // Create necessary directories
    const dirs = ['data', 'public/images/news']
    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    })

    // Fetch all posts
    const data = await fetchGraphQL(POSTS_QUERY)
    const posts = data.posts.nodes

    console.log(`Found ${posts.length} posts to process`)

    // Process each post
    const processedPosts = await Promise.all(
      posts.map(async (post) => {
        console.log(`Processing post: ${post.title}`)
        if (post.featuredImage?.node?.mediaItemUrl) {
          const imageUrl = post.featuredImage.node.mediaItemUrl
          const imageName = path.basename(imageUrl)
          const localImagePath = `/images/news/${imageName}`

          console.log(`Downloading image: ${imageUrl}`)

          try {
            // Download image
            await downloadImage(
              imageUrl,
              path.join(process.cwd(), 'public', localImagePath),
            )

            // Update image path in post data
            return {
              ...post,
              featuredImage: {
                node: {
                  ...post.featuredImage.node,
                  mediaItemUrl: localImagePath,
                },
              },
            }
          } catch (error) {
            console.error(`Failed to download image for ${post.title}:`, error)
            return post
          }
        }
        return post
      }),
    )

    // Save to JSON file
    const jsonData = {
      nodes: processedPosts,
    }

    const outputPath = path.join(process.cwd(), 'data', 'news.json')
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2))

    console.log(
      `Data export completed successfully! Data saved to ${outputPath}`,
    )
  } catch (error) {
    console.error('Error exporting data:', error)
  }
}

exportData()
