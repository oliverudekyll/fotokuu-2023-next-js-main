export async function fetchProgrammeList() {
  try {
    const data = await import('../data/programmes.json')
    return data.nodes.map((node) => ({
      slug: node.slug,
      language: node.language,
    }))
  } catch (error) {
    console.error('Error reading programme list:', error)
    return []
  }
}

export async function fetchUpcomingProgramme({ locale, timeStart }) {
  try {
    const data = await import('../data/programmes.json')

    const filteredNodes = data.nodes.filter((node) => {
      const matchesLocale = node.language?.slug === locale.toLowerCase()
      const matchesTime = node.programmeFields?.startingDatetime >= timeStart
      return matchesLocale && matchesTime
    })

    return {
      nodes: filteredNodes,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    }
  } catch (error) {
    console.error('Error reading upcoming programmes:', error)
    return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
  }
}

export async function fetchPastProgramme({
  locale,
  first,
  last,
  before,
  after,
  timeEnd,
}) {
  try {
    const data = await import('../data/programmes.json')

    const filteredNodes = data.nodes.filter((node) => {
      const matchesLocale = node.language?.slug === locale.toLowerCase()
      const matchesTime = node.programmeFields?.endingDatetime <= timeEnd
      return matchesLocale && matchesTime
    })

    // Apply pagination
    const startIndex = after ? parseInt(after) : 0
    const endIndex = first ? startIndex + first : undefined
    const paginatedNodes = filteredNodes.slice(startIndex, endIndex)

    return {
      nodes: paginatedNodes,
      pageInfo: {
        hasNextPage: endIndex < filteredNodes.length,
        hasPreviousPage: startIndex > 0,
        startCursor: startIndex.toString(),
        endCursor: endIndex?.toString() || filteredNodes.length.toString(),
      },
    }
  } catch (error) {
    console.error('Error reading past programmes:', error)
    return {
      nodes: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    }
  }
}

export async function fetchProgramme({ slug, preview, previewData }) {
  try {
    const data = await import('../data/programmes.json')
    const programme = data.nodes.find((node) => node.slug === slug)
    return programme || null
  } catch (error) {
    console.error('Error reading programme:', error)
    return null
  }
}
