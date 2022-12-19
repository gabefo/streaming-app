import { TooltipProvider } from '@radix-ui/react-tooltip'
import { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { darkTheme, globalCss } from 'stitches.config'

const globalStyles = globalCss({
  ':root': {
    $gap: '24px',
    $header: '56px',

    '@md': {
      $header: '64px',
      $gap: '56px',
    },
  },

  '*, *::before, *::after': {
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',
    WebkitTapHighlightColor: 'transparent',
    WebkitOverflowScrolling: 'touch',
  },

  body: {
    m: 0,
    bg: '$background',
    color: '$text',
    fontFamily: '$openSans',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle',
    overflow: 'visible',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.className }}
        defaultTheme="system"
      >
        <TooltipProvider delayDuration={100} disableHoverableContent>
          {getLayout(<Component {...pageProps} />)}
        </TooltipProvider>
      </ThemeProvider>
    </>
  )
}
