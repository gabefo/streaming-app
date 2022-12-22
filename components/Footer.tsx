import { Icon } from '@iconify/react'
import { styled } from 'stitches.config'
import SocialLink from './SocialLink'
import Text from './Text'

const StyledFooter = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '$footer',
  px: '$gap',
})

export default function Footer() {
  return (
    <StyledFooter>
      <Text variant="caption" color="secondary">
        A project by Gabriel
      </Text>
      <SocialLink href="https://github.com/gabefo/streaming-app" target="_blank">
        <Icon icon="mdi:github" />
      </SocialLink>
    </StyledFooter>
  )
}
