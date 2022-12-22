import { styled } from 'stitches.config'

const IconButton = styled('button', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 0,
  border: 0,
  outline: 0,
  borderRadius: '50%',
  bg: 'transparent',
  color: '$textSecondary',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: 1,
  textDecoration: 'none',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.1s',

  '&:hover': {
    bg: '$hover',
  },

  variants: {
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
      start: {
        ml: -8,
      },
      end: {
        mr: -8,
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
})

export default IconButton
