import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { cssReset, globalStyles } from 'styles/Global'
import * as analytics from 'analytics'
import { SiteDataProvider } from 'context/getSiteData'
import { useViewPort } from 'utils/useViewPort'
import Seo from 'components/Head/Seo'
import AppHeader from 'components/AppHeader'
import AppNavigation from 'components/AppNavigation'
import AppFooter from 'components/AppFooter'

export default function App({ Component, pageProps }) {
  cssReset()
  globalStyles()

  const { isXLargeDown } = useViewPort()
  const [navigation, toggleNavigation] = useState(false)
  const router = useRouter()

  const handleRouteChangeStart = () => {
    toggleNavigation(false)
  }

  const handleRouteChangeComplete = (url) => {
    analytics.pageview(url)
  }

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return
      toggleNavigation(false)
    }

    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.on('routeChangeStart', handleRouteChangeStart)
      router.events.on('routeChangeComplete', handleRouteChangeComplete)
    }
  })

  return (
    <SiteDataProvider siteData={pageProps.siteData}>
      {pageProps.siteData && <Seo data={pageProps.data} />}

      <AppHeader
        toggleNavigation={toggleNavigation}
        translation={pageProps.translation}
      />

      <AppNavigation
        isVisible={isXLargeDown ? navigation : true}
        toggleNavigation={toggleNavigation}
      />

      <Component {...pageProps} />

      <AppFooter />
    </SiteDataProvider>
  )
}
