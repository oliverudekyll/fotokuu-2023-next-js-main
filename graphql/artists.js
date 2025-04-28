export async function fetchProjectList() {
  try {
    const data = await import('../data/artists.json')
    return data.nodes.map((node) => ({
      slug: node.slug,
      language: node.language,
    }))
  } catch (error) {
    console.error('Error reading artist list:', error)
    return []
  }
}

export async function fetchProjects({ locale }) {
  try {
    const data = await import('../data/artists.json')

    const filteredNodes = data.nodes.filter(
      (node) => node.language?.slug === locale.toLowerCase(),
    )

    return {
      nodes: filteredNodes,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    }
  } catch (error) {
    console.error('Error reading artists:', error)
    return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
  }
}

export async function fetchArtist({ slug, preview, previewData }) {
  try {
    const data = await import('../data/artists.json')
    const artist = data.nodes.find((node) => node.slug === slug)
    return artist || null
  } catch (error) {
    console.error('Error reading artist:', error)
    return null
  }
}
