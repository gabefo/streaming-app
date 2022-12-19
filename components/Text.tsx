import { styled } from 'stitches.config'

const Text = styled('span', {
  m: 0,

  variants: {
    variant: {
      title: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: '1.5rem',
      },
      body: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
      },
      caption: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
      },
    },

    color: {
      primary: {
        color: '$text',
      },
      secondary: {
        color: '$textSecondary',
      },
    },
  },

  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
})

export default Text
