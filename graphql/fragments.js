export const imageData = `
  id
  mediaItemUrl
  srcLQIP: sourceUrl(size: THUMBNAIL_LQIP)
  srcSet(size: _2800PX)
  altText
  caption
  title
  mediaDetails {
    width
    height
  }
  imageCaption {
    imageCaption
  }
`

export const pageInfo = `
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`

export const postFields = `
  id
  title
  slug
  date
  featuredImageId
  featuredImage {
    node {
      ${imageData}
    }
  }
`

export const yoastSeo = `
  seo {
    canonical
    cornerstone
    focuskw
    metaDesc
    metaKeywords
    metaRobotsNofollow
    metaRobotsNoindex
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      sourceUrl
      mediaDetails {
        height
        width
      }
    }
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphType
    opengraphUrl
    title
    twitterDescription
    twitterTitle
    twitterImage {
      sourceUrl
    }
  }
`
