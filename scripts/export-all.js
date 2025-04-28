const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

// WordPress GraphQL endpoint
const WORDPRESS_URL = 'https://fotokuu-23-admin.fotokuu.ee/graphql'

async function fetchGraphQL(query, variables = {}) {
  try {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const json = await response.json()
    if (json.errors) {
      console.error('GraphQL errors:', json.errors)
      throw new Error('Failed to fetch GraphQL data')
    }
    return json.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

// GraphQL queries for each content type
const NEWS_QUERY = `
  query GetNews {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        date
        content
        language {
          slug
        }
        translations {
          slug
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

const PROGRAMMES_QUERY = `
  query GetProgrammes {
    programmes(first: 100) {
      nodes {
        id
        title
        slug
        content
        language {
          slug
        }
        translations {
          slug
        }
        featuredImage {
          node {
            sourceUrl
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
          relatedEvents {
            ... on Programme {
              id
              title
              slug
              programmeFields {
                startingDatetime
                endingDatetime
                subheading
                locationName
              }
            }
          }
          relatedArtists {
            ... on Artist {
              id
              title
              content
            }
          }
        }
      }
    }
  }
`

const PAGES_QUERY = `
  query GetPages {
    pages(first: 100) {
      nodes {
        id
        title
        slug
        content
        language {
          slug
        }
        translations {
          slug
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        template {
          ... on Template_Supporters {
            partners {
              partners {
                partnerUrl
                partnerLogo {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
  }
`

const ARTISTS_QUERY = `
  query GetArtists {
    artists(first: 100) {
      nodes {
        id
        title
        slug
        content
        language {
          slug
        }
        translations {
          slug
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

async function downloadImage(url, filePath) {
  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Failed to fetch image: ${response.statusText}`)

    const buffer = await response.buffer()
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, buffer)
    console.log(`Downloaded: ${filePath}`)
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error)
  }
}

async function processContent(type, data) {
  const nodes = data[type]?.nodes || []
  const processedNodes = []

  for (const node of nodes) {
    const processedNode = { ...node }

    // Handle featured image
    if (node.featuredImage?.node?.sourceUrl) {
      const imageUrl = node.featuredImage.node.sourceUrl
      const imageName = path.basename(imageUrl)
      const imagePath = path.join('public', 'images', type, imageName)
      await downloadImage(imageUrl, imagePath)
      const localPath = `/images/${type}/${imageName}`
      processedNode.featuredImage.node.sourceUrl = localPath
      processedNode.featuredImage.node.src = localPath
    }

    // Handle partner logos if this is a supporters template page
    if (type === 'pages' && node.template?.partners?.partners) {
      const partners = node.template.partners.partners
      for (const partner of partners) {
        if (partner.partnerLogo?.sourceUrl) {
          const logoUrl = partner.partnerLogo.sourceUrl
          const logoName = path.basename(logoUrl)
          const logoPath = path.join('public', 'images', 'partners', logoName)
          await downloadImage(logoUrl, logoPath)
          const localPath = `/images/partners/${logoName}`
          partner.partnerLogo.sourceUrl = localPath
          partner.partnerLogo.src = localPath
        }
      }
    }

    processedNodes.push(processedNode)
  }

  return processedNodes
}

async function exportAllContent() {
  try {
    // Create necessary directories
    const dirs = [
      'data',
      'public/images/news',
      'public/images/programmes',
      'public/images/pages',
      'public/images/partners',
      'public/images/artists',
    ]
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    }

    // Fetch and process all content types
    const [newsData, programmesData, pagesData, artistsData] =
      await Promise.all([
        fetchGraphQL(NEWS_QUERY),
        fetchGraphQL(PROGRAMMES_QUERY),
        fetchGraphQL(PAGES_QUERY),
        fetchGraphQL(ARTISTS_QUERY),
      ])

    const processedNews = await processContent('posts', newsData)
    const processedProgrammes = await processContent(
      'programmes',
      programmesData,
    )
    const processedPages = await processContent('pages', pagesData)
    const processedArtists = await processContent('artists', artistsData)

    // Save processed data
    fs.writeFileSync(
      'data/news.json',
      JSON.stringify({ nodes: processedNews }, null, 2),
    )
    fs.writeFileSync(
      'data/programmes.json',
      JSON.stringify({ nodes: processedProgrammes }, null, 2),
    )
    fs.writeFileSync(
      'data/pages.json',
      JSON.stringify({ nodes: processedPages }, null, 2),
    )
    fs.writeFileSync(
      'data/artists.json',
      JSON.stringify({ nodes: processedArtists }, null, 2),
    )

    console.log('All content exported successfully!')
  } catch (error) {
    console.error('Error exporting content:', error)
  }
}

exportAllContent()
