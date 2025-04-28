import { fetchAPI } from './api'
import { imageData, yoastSeo } from './fragments'

export async function fetchPagesList() {
  const query = `
  query {
    pages(first: 100) {
      nodes {
        slug
      }
    }
  }
  `

  const data = await await fetchAPI({ query })
  return data.pages?.nodes
}

export async function fetchPage({ slug, preview, previewData }) {
  const query = `
    query SinglePage($id: ID!, $idType: PageIdType!, $asPreview: Boolean) {
      page(id: $id, idType: $idType, asPreview: $asPreview) {
        title
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
        content
        template {
          ... on Template_Supporters {
            templateName
            partners {
              partners {
                partnerUrl
                partnerLogo {
                  ${imageData}
                }
              }
            }
          }
        }
        ${!preview ? yoastSeo : ''}
      }
    }
  `

  const variables = {
    id: preview ? previewData?.post?.databaseId : slug,
    idType: preview ? 'DATABASE_ID' : 'URI',
    asPreview: preview ? true : false,
  }

  const data = await fetchAPI({
    query,
    variables,
    previewData,
  })

  return data.page
}
