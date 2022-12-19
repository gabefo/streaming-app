import { styled } from 'stitches.config'

const IconButton = styled('button', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  p: 0,
  border: 0,
  outline: 0,
  borderRadius: '50%',
  bg: 'transparent',
  color: '$textSecondary',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: 1,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.1s',

  '&:hover': {
    bg: '$hover',
  },
})

export default IconButton
