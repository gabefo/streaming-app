import type { ReactNode } from 'react'

import { useRouter } from 'next/router'

import Box from '@components/Box'
import Header from '@components/Header'

import { styled } from 'stitches.config'

const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  overflowX: 'hidden',
})

type LayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const { pathname } = useRouter()

  const hasNavbar = pathname === '/movies' || pathname === '/shows'

  return (
    <Root>
      <Header hasNavbar={hasNavbar} />
      <Box
        css={{
          position: 'relative',
          mt: hasNavbar ? 104 : 56,
          mb: 24,
          flexGrow: 1,
          '@md': {
            mt: 64,
          },
        }}
      >
        {children}
      </Box>
    </Root>
  )
}
