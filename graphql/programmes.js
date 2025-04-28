import { fetchAPI } from './api'
import { imageData, pageInfo, yoastSeo } from './fragments'

export async function fetchProgrammeList() {
  const query = `
  query {
    programmes(first: 100) {
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
  return data.programmes?.nodes
}

export async function fetchUpcomingProgramme({ locale, timeStart }) {
  const query = `
  query ($locale: LanguageCodeFilterEnum!, $timeStart: String!) {
    programmes(first: 99, where: {language: $locale, startingDateTime: $timeStart}) {
      nodes {
        id
        title
        slug
        uri
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
        programmeCategories {
          nodes {
            slug
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
        }
      }
    }
  }
  `

  const variables = {
    locale: locale.toUpperCase(),
    timeStart,
  }

  const data = await fetchAPI({ query, variables })
  return data.programmes
}

export async function fetchPastProgramme({
  locale,
  first,
  last,
  before,
  after,
  timeEnd,
}) {
  const query = `
  query ($locale: LanguageCodeFilterEnum!, $first: Int, $last: Int, $after: String, $before: String, $timeEnd: String) {
    programmes(first: $first, last: $last, before: $before, after: $after, where: {language: $locale, endingDateTime: $timeEnd}) {
      ${pageInfo}
      nodes {
        id
        title
        slug
        uri
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
        programmeCategories {
          nodes {
            slug
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
    timeEnd,
  }

  const data = await fetchAPI({ query, variables })
  return data.programmes
}

export async function fetchProgramme({ slug, preview, previewData }) {
  const query = `
    query Singleprogramme ($id: ID!, $idType: ProgrammeIdType!, $asPreview: Boolean) {
      programme(id: $id, idType: $idType, asPreview: $asPreview) {
        title
        featuredImageId
        featuredImage {
          node {
            ${imageData}
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
          relatedArtists {
            ... on Artist {
              id
              title
              content
            }
          }
          relatedEvents {
            ... on Programme {
              id
              title
              programmeFields {
                subheading
                startingDatetime
                endingDatetime
                locationName
              }
            }
          }
        }
        content
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

  return data.programme
}
