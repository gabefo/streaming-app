import { styled } from 'stitches.config'

const SocialLink = styled('a', {
  p: 8,
  borderRadius: '50%',
  color: '$textSecondary',
  fontSize: 24,
  lineHeight: 1,
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
    bg: '$hover',
  },
})

export default SocialLink
