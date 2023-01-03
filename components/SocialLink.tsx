import { styled } from 'stitches.config'

const SocialLink = styled('a', {
  color: '$textSecondary',
  fontSize: 24,
  lineHeight: 1,
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
  },
})

export default SocialLink
