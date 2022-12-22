import { styled } from 'stitches.config'

const SocialLink = styled('a', {
  color: '$textSecondary',
  fontSize: '1.5rem',
  lineHeight: 1,
  textDecoration: 'none',

  '&:hover': {
    color: '$text',
  },
})

export default SocialLink
