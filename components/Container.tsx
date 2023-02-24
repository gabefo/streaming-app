import { styled } from 'stitches.config'

const Container = styled('div', {
  position: 'relative',
  mx: 'auto',
  width: '100%',

  variants: {
    maxWidth: {
      lg: {
        '@xl': {
          maxWidth: 1200,
        },
      },
      xl: {
        maxWidth: 1360,
      },
      false: {
        maxWidth: '100%',
      },
    },
    gutters: {
      true: {
        px: 24,
      },
    },
  },

  defaultVariants: {
    maxWidth: 'lg',
  },
})

export default Container
