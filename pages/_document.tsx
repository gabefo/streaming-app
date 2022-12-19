import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
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

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssAndReset() }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
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
