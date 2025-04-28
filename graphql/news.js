import fs from 'fs'
import path from 'path'

export async function fetchNews({ locale, first = 12 }) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    // Filter by locale if needed
    // For now, we'll return all news
    return data
  } catch (error) {
    console.error('Error reading news data:', error)
    return { nodes: [] }
  }
}

export async function fetchPost({ slug }) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    // Find the post with matching slug
    const post = data.nodes.find((node) => node.slug === slug)
    return post || null
  } catch (error) {
    console.error('Error reading post data:', error)
    return null
  }
}

export async function fetchNewsList() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    return data.nodes
  } catch (error) {
    console.error('Error reading news list:', error)
    return []
  }
}
