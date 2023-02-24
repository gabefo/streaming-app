import { useMediaQuery } from 'react-responsive'

import { styled } from 'stitches.config'

import Container from './Container'
import Logo from './Logo'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Settings from './settings'

const Root = styled('header', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  pr: 'var(--removed-body-scroll-bar-size, 0px)',
  bg: '$background',
  zIndex: 3,
})

const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: 56,
  pl: 24,
  pr: 12,
  gap: 16,

  '@md': {
    height: 64,
  },
})

type HeaderProps = {
  hasNavbar?: boolean
}

export default function Header({ hasNavbar }: HeaderProps) {
  const isDesktop = useMediaQuery({ minWidth: 840 })

  return (
    <Root>
      <Container maxWidth="xl">
        <Row>
          <Logo />
          {isDesktop && <Navbar />}
          <Searchbar
            detached={!isDesktop}
            css={isDesktop ? { mr: 'auto', width: 540 } : { ml: 'auto' }}
          />
          <Settings />
        </Row>
        {!isDesktop && hasNavbar && <Navbar css={{ height: 48 }} />}
      </Container>
    </Root>
  )
}
