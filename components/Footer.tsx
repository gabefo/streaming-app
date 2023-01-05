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
  whiteSpace: 'nowrap',
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
          align={{ '@initial': 'stretch', '@md': 'start' }}
          justify={{ '@initial': 'start', '@md': 'between' }}
          css={{ rowGap: 24, columnGap: 40 }}
        >
          <Flex
            direction="column"
            align="start"
            css={{
              gap: 16,
              '@md': { maxWidth: 240 },
            }}
          >
            <TMDBLogo />
            <Text variant="caption" color="disabled">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </Text>
          </Flex>
          <Flex direction="column" css={{ gap: 12 }}>
            <Text variant="overline">Watch</Text>
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="/about">About</StyledLink>
            <StyledLink href="/contact">Contact</StyledLink>
          </Flex>
          <Flex direction="column" css={{ gap: 12 }}>
            <Text variant="overline">Legal</Text>
            <StyledLink href="/terms-of-service">Terms of Service</StyledLink>
            <StyledLink href="/privacy">Privacy</StyledLink>
          </Flex>
          <Flex justify="end" css={{ gap: 8 }}>
            <LanguageSelect />
            <ThemeSelect />
          </Flex>
        </Flex>
        <Flex
          direction={{ '@initial': 'column', '@md': 'row' }}
          align="center"
          justify="between"
          css={{ mt: 80, gap: 16 }}
        >
          <Flex css={{ gap: 16 }}>
            <SocialLink href="https://github.com/gabefo/streaming-app" target="_blank">
              <Icon icon="mdi:github" />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/gabrielfomiranda/" target="_blank">
              <Icon icon="mdi:linkedin" />
            </SocialLink>
          </Flex>
          <Text variant="caption" color="disabled">
            © {new Date().getFullYear()}. All rights reserved
          </Text>
        </Flex>
      </Container>
    </Root>
  )
}
