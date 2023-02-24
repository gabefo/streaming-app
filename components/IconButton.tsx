import { styled } from 'stitches.config'

import ButtonBase from './ButtonBase'

const IconButton = styled(ButtonBase, {
  flexShrink: 0,
  borderRadius: '50%',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: 1,
  transition: 'background-color 0.2s ease-in-out',

  '@hover': {
    '&:hover': {
      bg: '$hover',
    },
  },

  '&:active': {
    bg: '$active',
  },

  variants: {
    color: {
      default: {
        color: '$textDisabled',
      },
      light: {
        color: 'rgba(255, 255, 255, 0.9)',

        '@hover': {
          '&:hover': {
            color: '#fff',
          },
        },
      },
    },
    size: {
      small: {
        width: 32,
        height: 32,
      },
      medium: {
        width: 40,
        height: 40,
      },
      large: {
        width: 48,
        height: 48,
      },
    },
    edge: {
      start: {},
      end: {},
      both: {},
    },
  },

  compoundVariants: [
    {
      size: 'small',
      edge: 'start',
      css: {
        ml: -4,
      },
    },
    {
      size: 'small',
      edge: 'end',
      css: {
        mr: -4,
      },
    },
    {
      size: 'medium',
      edge: 'start',
      css: {
        ml: -8,
      },
    },
    {
      size: 'medium',
      edge: 'end',
      css: {
        mr: -8,
      },
    },
    {
      size: 'large',
      edge: 'start',
      css: {
        ml: -12,
      },
    },
    {
      size: 'large',
      edge: 'end',
      css: {
        mr: -12,
      },
    },
  ],

  defaultVariants: {
    size: 'medium',
    color: 'default',
  },
})

export default IconButton
