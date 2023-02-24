import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { FC, ReactNode, useEffect, useState } from 'react'

import { addCollection } from '@iconify/react'
import { Open_Sans } from '@next/font/google'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { appWithTranslation } from 'next-i18next'
import { ThemeProvider } from 'next-themes'

import LoadingScreen from '@components/LoadingScreen'
import ProgressBar from '@components/ProgressBar'

import { darkTheme, globalCss } from 'stitches.config'

import type { AppProps } from 'next/app'

// https://api.iconify.design/mdi.js?icons=arrow-left,arrow-right,arrow-top-left,brightness-6,check,chevron-left,chevron-right,close,cog,menu-down,play-outline,search,star,translate&pretty=1&callback=addCollection
addCollection({
  prefix: 'mdi',
  icons: {
    'arrow-left': {
      body: '<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"/>',
    },
    'arrow-right': {
      body: '<path fill="currentColor" d="M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11H4Z"/>',
    },
    'arrow-top-left': {
      body: '<path fill="currentColor" d="M19 17.59L17.59 19L7 8.41V15H5V5h10v2H8.41L19 17.59Z"/>',
    },
    'brightness-6': {
      body: '<path fill="currentColor" d="M12 18V6a6 6 0 0 1 6 6a6 6 0 0 1-6 6m8-2.69L23.31 12L20 8.69V4h-4.69L12 .69L8.69 4H4v4.69L.69 12L4 15.31V20h4.69L12 23.31L15.31 20H20v-4.69Z"/>',
    },
    check: {
      body: '<path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/>',
    },
    'chevron-left': {
      body: '<path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42Z"/>',
    },
    'chevron-right': {
      body: '<path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"/>',
    },
    close: {
      body: '<path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>',
    },
    cog: {
      body: '<path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>',
    },
    'menu-down': {
      body: '<path fill="currentColor" d="m7 10l5 5l5-5H7Z"/>',
    },
    'play-outline': {
      body: '<path fill="currentColor" d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7"/>',
    },
    search: {
      body: '<path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"/>',
    },
    star: {
      body: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/>',
    },
    translate: {
      body: '<path fill="currentColor" d="m12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11l.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z"/>',
    },
  },
  width: 24,
  height: 24,
})

const openSans = Open_Sans({ subsets: ['latin'] })

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
  },

  html: {
    height: '100%',
    fontFamily: openSans.style.fontFamily,
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',
    WebkitOverflowScrolling: 'touch',
  },

  body: {
    position: 'relative',
    m: 0,
    minHeight: '100%',
    bg: '$background',
    color: '$text',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    overflowY: 'scroll',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },

  b: {
    fontWeight: 500,
  },

  img: {
    verticalAlign: 'baseline',
  },

  svg: {
    display: 'inline-block',
    verticalAlign: 'middle',
    overflow: 'visible',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },
})

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.className }}
        defaultTheme="system"
      >
        <TooltipProvider delayDuration={100} disableHoverableContent>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
          <ProgressBar />
        </TooltipProvider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
