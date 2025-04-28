import { fetchAPI } from './api'
import { imageData, yoastSeo } from './fragments'

export async function fetchLocations({ locale, id, preview, previewData }) {
  const query = `
  query Locations($id: ID!, $locale: LanguageCodeFilterEnum!, $asPreview: Boolean) {
    page(id: $id, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      featuredImage {
        node {
          ${imageData}
        }
      }
      content
      ${!preview ? yoastSeo : ''}
    }
    locations(where: {language: $locale, status: PUBLISH}, first: 99) {
      nodes {
        id
        title
        featuredImageId
        featuredImage {
          node {
            ${imageData}
          }
        }
        locationFields {
          businessName
          capacity
          companyRegNo
          festivalEndingDate
          festivalStartDate
          homepage
          facebook
          instagram
          youtube
          performers
          videoUrl
          rental
          sound
          light
          riderUrl
          yearOfEstablishment
          location {
            city
            state
            streetName
            streetNumber
            country
            latitude
            longitude
            placeId
          }
        }
        terms(where: {taxonomies: LOCATIONTYPE}) {
          nodes {
            slug
            name
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }    
  `

  const variables = {
    id: id,
    locale: locale.toUpperCase(),
    asPreview: preview ? true : false,
  }

  const data = await fetchAPI({ query, variables, previewData })
  return data
}

export async function createLocation({ variables, previewData }) {
  const query = `mutation createLocation($clientMutationId: String!, $locationName: String, $locationCategory: Int, $locationImageID: Int, $companyHomePage: String, $companyFacebook: String, $companyInstagram: String, $companyYoutube: String, $companyRegNo: Float, $companyYear: Int, $companyEmail: String, $companyTelephone: String, $festivalStartingDate: String, $festivalEndingDate: String, $festivalPerformers: String, $locationAddress: String, $locationCapacity: Int, $locationLight: Boolean, $locationRental: String, $locationRider: String, $locationSound: Boolean, $locationVideoUrl: String, $companyBusinessName: String) {
    createSubmission(
      input: {clientMutationId: $clientMutationId, locationName: $locationName, companyBusinessName: $companyBusinessName, companyHomePage: $companyHomePage, companyFacebook: $companyFacebook, companyInstagram: $companyInstagram, companyYoutube: $companyYoutube, companyRegNo: $companyRegNo, companyYear: $companyYear, companyEmail: $companyEmail, companyTelephone: $companyTelephone,   festivalEndingDate: $festivalEndingDate, festivalPerformers: $festivalPerformers, festivalStartingDate: $festivalStartingDate, locationAddress: $locationAddress, locationCapacity: $locationCapacity, locationCategory: $locationCategory, locationImageID: $locationImageID, locationLight: $locationLight, locationRental: $locationRental, locationRider: $locationRider, locationSound: $locationSound, locationVideoUrl: $locationVideoUrl}
    ) {
      data
      success
    }
  }`

  const data = await fetchAPI({ query, variables, previewData })

  return data
}
