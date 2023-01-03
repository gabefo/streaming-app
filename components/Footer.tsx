import { Icon } from '@iconify/react'
import { styled } from 'stitches.config'
import Container from './Container'
import Flex from './Flex'
import SocialLink from './SocialLink'
import Text from './Text'
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

export default function Footer() {
  return (
    <StyledFooter>
      <Container gutters>
        <Separator />
        <Flex direction="column" css={{ rowGap: 24 }}>
          <TMDBLogo />
          <Text variant="caption" color="secondary">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </Text>
        </Flex>
        <Flex css={{ mt: 32, gap: 16 }}>
          <SocialLink href="https://www.linkedin.com/in/gabrielfomiranda/" target="_blank">
            <Icon icon="mdi:linkedin" />
          </SocialLink>
          <SocialLink href="https://github.com/gabefo/streaming-app" target="_blank">
            <Icon icon="mdi:github" />
          </SocialLink>
        </Flex>
      </Container>
    </StyledFooter>
  )
}
