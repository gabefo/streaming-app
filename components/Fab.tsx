import { styled } from 'stitches.config'

import ButtonBase from './ButtonBase'

const Fab = styled(ButtonBase, {
  width: 56,
  height: 56,
  borderRadius: '50%',
  bg: '$panel',
  boxShadow: '$6',
  color: '$textSecondary',
  fontSize: 28,
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    bg: '$neutral',
  },
})

export default Fab
