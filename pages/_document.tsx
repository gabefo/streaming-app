import React from 'react'

import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import i18nextConfig from 'next-i18next.config'
import { getCssText, reset } from 'stitches.config'

/**
 * Get the css and reset the internal css representation.
 * This is very *IMPORTANT* to do as the server might handle multiple requests
 * and we don't want to have the css accumulated from previous requests
 */
const getCssAndReset = () => {
  const css = getCssText()
  reset()
  return css
}

class MyDocument extends NextDocument {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssAndReset() }} />
          <link rel="icon" href="/favicon.png" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
