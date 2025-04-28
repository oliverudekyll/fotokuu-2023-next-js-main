import Head from 'next/head'
import { useSiteData } from 'context/getSiteData'
import { useRouter } from 'next/router'

const Seo = ({ data = null }) => {
  const seo = data?.seo
  const router = useRouter()
  const siteData = useSiteData()

  if (!seo) {
    const title = data?.title ? data.title : siteData?.generalSettings?.title
    return (
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={siteData?.generalSettings?.description}
          key="description"
        />
      </Head>
    )
  }

  return (
    <Head>
      <title>{seo.title}</title>
      {seo.metaDesc && (
        <meta name="description" content={seo.metaDesc} key="description" />
      )}
      {/* <link rel="canonical" href={seo.canonical} key="canonical" /> */}
      <meta property="og:locale" content={router.locale} />
      <meta property="og:type" content={seo.opengraphType} />
      <meta property="og:title" content={seo.opengraphTitle} key="og-title" />
      {seo.opengraphDescription && (
        <meta
          property="og:description"
          content={seo.opengraphDescription}
          key="og-description"
        />
      )}
      {/* <meta property="og:url" content={seo.opengraphUrl} /> */}
      <meta property="og:site_name" content={seo.opengraphSiteName} />
      <meta
        property="article:modified_time"
        content={seo.opengraphModifiedTime}
      />
      {seo.opengraphImage && (
        <>
          <meta property="og:image" content={seo.opengraphImage.sourceUrl} />
          <meta
            property="og:image:width"
            content={seo.opengraphImage.mediaDetails.width}
          />
          <meta
            property="og:image:height"
            content={seo.opengraphImage.mediaDetails.height}
          />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.twitterTitle && (
        <meta name="twitter:title" content={seo.twitterTitle} />
      )}
      {seo.twitterDescription && (
        <meta name="twitter:description" content={seo.twitterDescription} />
      )}
      {seo.twitterImage && (
        <meta name="twitter:image" content={seo.twitterImage.sourceUrl} />
      )}
    </Head>
  )
}

export default Seo
