export async function fetchNews({ locale, first = 12 }) {
  try {
    const data = await import('../data/news.json')

    // Filter by locale if needed
    const filteredNodes = data.nodes.filter(
      (node) => node.language?.slug === locale.toLowerCase(),
    )

    return {
      nodes: filteredNodes.slice(0, first),
      pageInfo: {
        hasNextPage: filteredNodes.length > first,
        endCursor: null,
      },
    }
  } catch (error) {
    console.error('Error reading news data:', error)
    return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
  }
}

export async function fetchPost({ slug }) {
  try {
    const data = await import('../data/news.json')
    const post = data.nodes.find((node) => node.slug === slug)
    return post || null
  } catch (error) {
    console.error('Error reading post data:', error)
    return null
  }
}

export async function fetchNewsList() {
  try {
    const data = await import('../data/news.json')
    return data.nodes
  } catch (error) {
    console.error('Error reading news list:', error)
    return []
  }
}
