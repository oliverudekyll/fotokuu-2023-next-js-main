import { fetchAPI } from './api'
import { imageData, yoastSeo } from './fragments'

export async function fetchNewsList() {
  const query = `
  query {
    posts(first: 100) {
      nodes {
        slug
        language {
          slug
        }
      }
    }
  }
  `

  const data = await fetchAPI({ query })
  return data.posts?.nodes
}

export async function fetchNews({ locale, first, last, before, after, notIn }) {
  const query = `
  query ($locale: LanguageCodeFilterEnum!, $first: Int, $last: Int, $after: String, $before: String, $notIn: [ID]) {
    posts(first: $first, last: $last, before: $before, after: $after, where: {language: $locale, notIn: $notIn}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
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
    first,
    last,
    before,
    after,
    notIn,
  }

  const data = await fetchAPI({ query, variables })
  return data.posts
}

export async function fetchPost({ slug, preview, previewData }) {
  const query = `
    query SinglePost ($id: ID!, $idType: PostIdType!, $asPreview: Boolean) {
      post(id: $id, idType: $idType, asPreview: $asPreview) {
        databaseId
        title
        content
        date
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
        translations {
          slug
        }
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

  return data.post
}
