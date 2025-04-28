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

// Queries for different content types
const QUERIES = {
  news: `
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
  `,
  programmes: `
    query {
      programmes(first: 100) {
        nodes {
          id
          title
          slug
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
          programmeFields {
            subheading
            startingDatetime
            endingDatetime
            locationName
            locationAddress {
              streetAddress
            }
          }
        }
      }
    }
  `,
  pages: `
    query {
      pages(first: 100) {
        nodes {
          id
          title
          slug
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
  `,
  artists: `
    query {
      artists(first: 100) {
        nodes {
          id
          title
          slug
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
  `,
}

async function downloadImage(url, filePath) {
  try {
    const response = await fetch(url)
    const buffer = await response.buffer()
    fs.writeFileSync(filePath, buffer)
    console.log(`Downloaded: ${url} -> ${filePath}`)
  } catch (error) {
    console.error(`Failed to download image: ${url}`, error)
  }
}

async function processContent(type, data) {
  console.log(`\nProcessing ${type}...`)
  const nodes = data[type === 'news' ? 'posts' : type].nodes

  console.log(`Found ${nodes.length} items to process`)

  const processedNodes = await Promise.all(
    nodes.map(async (node) => {
      console.log(`Processing: ${node.title}`)

      if (node.featuredImage?.node?.mediaItemUrl) {
        const imageUrl = node.featuredImage.node.mediaItemUrl
        const imageName = path.basename(imageUrl)
        const localImagePath = `/images/${type}/${imageName}`

        console.log(`Downloading image: ${imageUrl}`)

        try {
          await downloadImage(
            imageUrl,
            path.join(process.cwd(), 'public', localImagePath),
          )

          return {
            ...node,
            featuredImage: {
              node: {
                ...node.featuredImage.node,
                mediaItemUrl: localImagePath,
              },
            },
          }
        } catch (error) {
          console.error(`Failed to process image for ${node.title}:`, error)
          return node
        }
      }
      return node
    }),
  )

  return processedNodes
}

async function exportAllContent() {
  try {
    // Create necessary directories
    const contentTypes = ['news', 'programmes', 'pages', 'artists']
    const dirs = [
      'data',
      ...contentTypes.map((type) => `public/images/${type}`),
    ]

    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    })

    // Process each content type
    for (const type of contentTypes) {
      console.log(`\nExporting ${type}...`)

      const data = await fetchGraphQL(QUERIES[type])
      const processedNodes = await processContent(type, data)

      const jsonData = {
        nodes: processedNodes,
      }

      const outputPath = path.join(process.cwd(), 'data', `${type}.json`)
      fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2))

      console.log(`${type} data saved to ${outputPath}`)
    }

    console.log('\nAll content exported successfully!')
  } catch (error) {
    console.error('Error exporting content:', error)
  }
}

exportAllContent()
