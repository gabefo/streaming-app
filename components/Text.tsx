import { styled } from 'stitches.config'

const Text = styled('span', {
  m: 0,

  variants: {
    variant: {
      inherit: {
        font: 'inherit',
      },
      body: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
      },
      title: {
        display: 'block',
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: '1.5rem',
      },
      caption: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
      },
      overline: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: '1.25rem',
        textTransform: 'uppercase',
      },
    },

    color: {
      inherit: {
        color: 'inherit',
      },
      primary: {
        color: '$text',
      },
      secondary: {
        color: '$textSecondary',
      },
      disabled: {
        color: '$textDisabled',
      },
    },

    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },

    gutterBottom: {
      true: {
        mb: 16,
      },
    },
  },

  defaultVariants: {
    variant: 'inherit',
    color: 'inherit',
  },
})

export default Text
