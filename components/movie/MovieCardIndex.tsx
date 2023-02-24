import { styled } from 'stitches.config'

const MovieCardIndex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 24,
  color: '$textSecondary',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',

  '@sm': {
    width: 32,
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
})

export default MovieCardIndex
