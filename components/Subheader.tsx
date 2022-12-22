import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { styled } from 'stitches.config'
import Container from './Container'
import Flex from './Flex'

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

export default function Subheader() {
  return (
    <Container gutters>
      <Flex css={{ gap: 12 }}>
        <Link href="/">Movies</Link>
        <Link href="/coming-soon">Shows</Link>
      </Flex>
    </Container>
  )
}
