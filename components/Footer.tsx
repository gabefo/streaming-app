import { Icon } from '@iconify/react'
import Link from 'next/link'
import { styled } from 'stitches.config'
import Container from './Container'
import Flex from './Flex'
import LanguageSelect from './LanguageSelect'
import Logo from './Logo'
import SocialLink from './SocialLink'
import Text from './Text'
import ThemeSelect from './ThemeSelect'
import TMDBLogo from './TMDBLogo'

const StyledFooter = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  pb: 24,
})

const Separator = styled('div', {
  my: 32,
  borderBottom: 'thin solid $border',
})

const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  mt: 32,
  gap: 24,

  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const StyledLink = styled(Link, {
  color: '$textSecondary',
  fontSize: '0.875rem',
  lineHeight: '2rem',
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
  },
})

export default function Footer() {
  return (
    <StyledFooter>
      <Container gutters>
        <Separator />
        <Section>
          <Logo />
          <Flex direction="column">
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="/about">About</StyledLink>
            <StyledLink href="/terms-of-service">Terms of Service</StyledLink>
            <StyledLink href="/privacy">Privacy</StyledLink>
          </Flex>
          <Flex css={{ gap: 16 }}>
            <SocialLink href="https://github.com/gabefo/streaming-app" target="_blank">
              <Icon icon="mdi:github" />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/gabrielfomiranda/" target="_blank">
              <Icon icon="mdi:linkedin" />
            </SocialLink>
          </Flex>
          <Flex css={{ gap: 8 }}>
            <LanguageSelect />
            <ThemeSelect />
          </Flex>
        </Section>
        <Section>
          <Text variant="caption" color="disabled">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </Text>
          <TMDBLogo />
        </Section>
      </Container>
    </StyledFooter>
  )
}
