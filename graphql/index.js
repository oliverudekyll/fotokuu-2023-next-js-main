import { fetchAPI } from './api'
import { imageData } from './fragments'

export async function fetchFrontPageData({ locale }) {
  const query = `
  query FrontPage($locale: LanguageCodeFilterEnum!) {
    posts(first: 6, where: {language: $locale }) {
      nodes {
        id
        title
        slug
        uri
        date
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
      }
    }
  }    
  `

  const variables = {
    locale: locale.toUpperCase(),
  }

  const data = await await fetchAPI({ query, variables })
  return data
}
