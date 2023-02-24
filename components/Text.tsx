import { styled } from 'stitches.config'

const Text = styled('span', {
  display: 'inline-block',
  m: 0,

  variants: {
    variant: {
      inherit: {
        font: 'inherit',
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: '1.25rem',
      },
      title: {
        display: 'block',
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: '1.5rem',

        '@lg': {
          fontSize: '1.375rem',
          lineHeight: '1.75rem',
        },
      },
      subtitle: {
        display: 'block',
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: '1.5rem',
      },
      caption: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: '1.25rem',
      },
      overline: {
        fontSize: '0.875rem',
        fontWeight: 500,
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
