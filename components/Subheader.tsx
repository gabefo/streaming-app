import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
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

type LinkProps = {
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
  const { t } = useTranslation('common')

  return (
    <Container gutters css={{ pt: 24 }}>
      <Flex css={{ gap: 12 }}>
        <Link href="/">{t('movies')}</Link>
        <Link href="/coming-soon">{t('shows')}</Link>
      </Flex>
    </Container>
  )
}
