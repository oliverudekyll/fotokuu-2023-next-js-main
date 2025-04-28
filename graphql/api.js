const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL
const PREVIEW_USER = process.env.PREVIEW_USER
const PREVIEW_PW = process.env.PREVIEW_PW

export async function fetchAPI({ query, variables, previewData = null }) {
  const headers = { 'Content-Type': 'application/json' }

  if (previewData?.refreshToken) {
    headers['Authorization'] = `Bearer ${previewData.refreshToken}`
  }

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.log(json.errors)
    throw new Error('Failed to fetch WP Graphql API')
  }

  return json.data
}

export async function fetchRefreshToken() {
  const query = `mutation Login {
    login(
      input: {
        clientMutationId: "uniqueId"
        password: "${PREVIEW_PW}"
        username: "${PREVIEW_USER}"
      }
    ) {
      refreshToken
    }
  }`

  const data = await fetchAPI({
    query,
  })

  return data
}

export async function getPreviewPost({ id, refreshToken }) {
  const query = `
    query PreviewPost($id: ID!) {
      contentNode(id: $id, idType: DATABASE_ID) {
        databaseId
        slug
        status
      }
    }
  `

  const variables = { id }
  const data = await fetchAPI({
    query,
    variables,
    previewData: { refreshToken },
  })

  return data.contentNode
}

export async function fetchSiteData({ locale }) {
  const query = `
    query ($menuId: ID!) {
      generalSettings {
        title
        description
      }
      programmeCategories(where: {hideEmpty: true, language: ${locale.toUpperCase()}}) {
        nodes {
          id
          slug
          name
        }
      }
      menu(id: $menuId, idType: DATABASE_ID) {
        menuItems(first: 99) {
          nodes {
            id
            parentId
            path
            label
            childItems(first: 99) {
              nodes {
                id
                parentId
                path
                label
              }
            }
          }
        }
      }
    }
  `

  let menuId

  switch (locale) {
    case 'en':
      menuId = 37 // English Main Menu
      break

    default: // Estonian Main Menu
      menuId = 36
      break
  }

  const variables = {
    locale: locale.toUpperCase(),
    menuId,
  }

  const siteData = await fetchAPI({
    query,
    variables,
  })

  return siteData
}
