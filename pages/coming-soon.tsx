import Logo from 'components/Logo'
import Text from 'components/Text'
import TitleAndMetaTags from 'components/TitleAndMetaTags'
import { styled } from 'stitches.config'

const Root = styled('div', {
  my: 12,
  mx: 'auto',
  px: '$gap',
  maxWidth: 600,

  '@sm': {
    mt: 120,
  },
})

export default function ComingSoon() {
  return (
    <Root>
      <TitleAndMetaTags />
      <Logo />
      <Text as="h6" variant="title" css={{ mt: 40, mb: 8 }}>
        Coming Soon!
      </Text>
      <Text as="p" color="secondary">
        We are currently working on this page!
      </Text>
    </Root>
  )
}
