import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingScreen from 'components/LoadingScreen'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { styled } from 'stitches.config'
import { useRouter } from 'next/router'

const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

const Content = styled('div', {
  pt: '$sizes$header',
  flexGrow: 1,
})

type LayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const { isFallback } = useRouter()

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (isLoading || isFallback) {
    return <LoadingScreen />
  }

  return (
    <Root>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Root>
  )
}
