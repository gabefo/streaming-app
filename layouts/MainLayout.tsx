import Footer from 'components/Footer'
import Header from 'components/Header'
import { ReactNode } from 'react'
import { styled } from 'stitches.config'

const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

const Content = styled('div', {
  pt: 'calc($sizes$header + 24px)',
  pb: 24,
  flexGrow: 1,
})

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <Root>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Root>
  )
}
