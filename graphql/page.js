export async function fetchPagesList() {
  try {
    const data = await import('../data/pages.json')
    return data.nodes.map((node) => ({
      slug: node.slug,
      language: node.language,
    }))
  } catch (error) {
    console.error('Error reading pages list:', error)
    return []
  }
}

export async function fetchPage({ slug, preview, previewData }) {
  try {
    const data = await import('../data/pages.json')
    const page = data.nodes.find((node) => node.slug === slug)
    return page || null
  } catch (error) {
    console.error('Error reading page:', error)
    return null
  }
}
