import { Icon } from '@iconify/react'
import Link from 'next/link'
import { styled } from 'stitches.config'
import Container from './Container'
import Flex from './Flex'
import LanguageSelect from './LanguageSelect'
import SocialLink from './SocialLink'
import Text from './Text'
import ThemeSelect from './ThemeSelect'
import TMDBLogo from './TMDBLogo'

const Root = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  pb: 24,
})

const Divider = styled('div', {
  my: 32,
  borderBottom: 'thin solid $border',
})

const StyledLink = styled(Link, {
  color: '$textSecondary',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
  },
})

export default function Footer() {
  return (
    <Root>
      <Container gutters>
        <Divider />
        <Flex
          direction={{ '@initial': 'column', '@md': 'row' }}
          align="start"
          justify="between"
          css={{ gap: 24 }}
        >
          <Flex
            direction="column"
            align="start"
            css={{
              gap: 24,
              '@md': { maxWidth: 240 },
            }}
          >
            <TMDBLogo />
            <Text variant="caption" color="disabled">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </Text>
            <Flex css={{ gap: 8 }}>
              <SocialLink href="https://github.com/gabefo/streaming-app" target="_blank">
                <Icon icon="mdi:github" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/" target="_blank">
                <Icon icon="mdi:facebook" />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/gabrielfomiranda/" target="_blank">
                <Icon icon="mdi:linkedin" />
              </SocialLink>
            </Flex>
          </Flex>
          <Flex direction="column" css={{ minWidth: 120, gap: 12 }}>
            <Text variant="overline">Watch</Text>
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="/about">About</StyledLink>
            <StyledLink href="/contact">Contact</StyledLink>
          </Flex>
          <Flex direction="column" css={{ minWidth: 120, gap: 12 }}>
            <Text variant="overline">Legal</Text>
            <StyledLink href="/terms-of-service">Terms of Service</StyledLink>
            <StyledLink href="/privacy">Privacy</StyledLink>
          </Flex>
          <Flex css={{ gap: 8 }}>
            <LanguageSelect />
            <ThemeSelect />
          </Flex>
        </Flex>
        <Text
          as="p"
          variant="caption"
          color="disabled"
          align={{ '@initial': 'center', '@md': 'left' }}
          css={{ mt: 40 }}
        >
          © {new Date().getFullYear()}. All rights reserved
        </Text>
      </Container>
    </Root>
  )
}
