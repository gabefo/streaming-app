import { styled } from 'stitches.config'

import ButtonBase from './ButtonBase'

const Button = styled(ButtonBase, {
  px: 16,
  gap: 8,
  borderRadius: 4,
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.5rem',
  transition: 'background-color 0.2s ease-in-out',

  variants: {
    variant: {
      ghost: {
        color: '$primary',

        '@hover': {
          '&:hover': {
            bg: '$hover',
          },
        },

        '&:active': {
          bg: '$active',
        },
      },
    },
    size: {
      small: {
        height: 32,
      },
      medium: {
        height: 40,
      },
      large: {
        height: 48,
      },
    },
    disabled: {
      true: {
        opacity: 0.38,
        pointerEvents: 'none',
      },
    },
  },

  defaultVariants: {
    variant: 'ghost',
    size: 'medium',
  },
})

export default Button
