import { styled } from 'stitches.config'

const Container = styled('div', {
  position: 'relative',
  width: '100%',

  '@lg': {
    mx: 'auto',
    width: 1200,
  },

  variants: {
    gutters: {
      true: {
        px: '$gutterX',
      },
    },
  },
})

export default Container
