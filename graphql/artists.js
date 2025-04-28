import { fetchAPI } from './api'
import { imageData, yoastSeo } from './fragments'

export async function fetchProjectList() {
  const query = `
  query {
    artists(first: 100) {
      nodes {
        slug
      }
    }
  }
  `

  const data = await await fetchAPI({ query })
  return data.artists?.nodes
}

export async function fetchProjects({ locale }) {
  const query = `
  query ($locale: LanguageCodeFilterEnum!) {
    artists(first: 99, where: {language: $locale}) {
      nodes {
        title
        slug
      }
    }
  }
  `

  const variables = {
    locale: locale.toUpperCase(),
  }

  const data = await await fetchAPI({ query, variables })
  return data.artists
}

export async function fetchArtist({ slug, preview, previewData }) {
  const query = `
    query SingleArtist ($id: ID!, $idType: ArtistIdType!, $asPreview: Boolean) {
      artist(id: $id, idType: $idType, asPreview: $asPreview) {
        title
        featuredImage {
          node {
            ${imageData}
          }
        }
        content
        ${!preview ? yoastSeo : ''}
      }
    }
  `

  const variables = {
    id: preview ? previewData?.post?.databaseId : slug,
    idType: preview ? 'DATABASE_ID' : 'SLUG',
    asPreview: preview ? true : false,
  }

  const data = await fetchAPI({
    query,
    variables,
    previewData,
  })

  return data.artist
}
