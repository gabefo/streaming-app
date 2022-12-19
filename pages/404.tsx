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

export default function Page404() {
  return (
    <Root>
      <TitleAndMetaTags />
      <Logo />
      <Text as="h6" variant="title" css={{ mt: 40, mb: 8 }}>
        404. Not found
      </Text>
      <Text as="p" color="secondary">
        Sorry, we couldn’t find the page you’re looking for.
      </Text>
    </Root>
  )
}
