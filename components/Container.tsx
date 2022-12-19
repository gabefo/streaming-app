import { styled } from 'stitches.config'

const Container = styled('div', {
  width: '100%',

  '@lg': {
    mx: 'auto',
    width: 1200,
  },

  variants: {
    gutters: {
      true: {
        px: '$gap',
      },
    },
  },
})

export default Container
