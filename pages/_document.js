import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../stitches.config'
import Analytics from 'components/Head/Analytics'
import FavIcons from '@/components/Head/FavIcons'

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    const { locale } = ctx

    return {
      ...initialProps,
      locale,
    }
  }

  render() {
    const { locale } = this.props

    return (
      <Html lang={locale}>
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <Analytics />
          <FavIcons />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
