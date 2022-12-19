import { Icon } from '@iconify/react'
import Container from 'components/Container'
import Logo from 'components/Logo'
import Text from 'components/Text'
import ThemeToggle from 'components/ThemeToggle'
import useScrollTrigger from 'hooks/useScrollTrigger'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { styled } from 'stitches.config'

const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

const Header = styled('header', {
  position: 'fixed',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '$header',
  pl: '$gap',
  pr: 8,
  bg: '$background',
  zIndex: 1,
  transition: 'box-shadow 0.2s ease-in-out',

  variants: {
    elevation: {
      true: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
})

const Content = styled('div', {
  pt: 'calc($sizes$header + 24px)',
  flexGrow: 1,
})

const Toolbar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
})

const StyledLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  height: 32,
  px: 16,
  border: '1px solid $border',
  borderRadius: '$pill',
  bg: 'transparent',
  color: '$textSecondary',
  fontSize: '0.875rem',
  fontWeight: 600,
  lineHeight: '1.25rem',
  textDecoration: 'none',
  cursor: 'pointer',

  '&:hover': {
    bg: '$hover',
  },

  variants: {
    active: {
      true: {
        borderColor: 'transparent',
        bg: '$primaryTransparent',
        color: '$primary',

        '&:hover': {
          bg: '$primaryTransparent',
        },
      },
    },
  },
})

interface LinkProps {
  children: ReactNode
  href: string
}

function Link({ children, href }: LinkProps) {
  const { pathname } = useRouter()

  return (
    <NextLink href={href} passHref legacyBehavior>
      <StyledLink active={pathname === href}>{children}</StyledLink>
    </NextLink>
  )
}

const Footer = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '$footer',
  px: '$gap',
})

const GitHub = styled('a', {
  color: '$textSecondary',
  fontSize: '1.5rem',
  lineHeight: 1,
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
  },
})

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const scrollTrigger = useScrollTrigger()

  return (
    <Root>
      <Header elevation={scrollTrigger}>
        <Logo />
        <ThemeToggle />
      </Header>
      <Content>
        <Container gutters css={{ mb: 40 }}>
          <Toolbar>
            <Link href="/">Movies</Link>
            <Link href="/coming-soon">Shows</Link>
          </Toolbar>
        </Container>
        {children}
      </Content>
      <Footer>
        <Text variant="caption" color="secondary">
          A project by Gabriel
        </Text>
        <GitHub href="https://github.com/gabefo/streaming-app" target="_blank">
          <Icon icon="mdi:github" />
        </GitHub>
      </Footer>
    </Root>
  )
}
