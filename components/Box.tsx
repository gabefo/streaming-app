import { styled } from 'stitches.config'

const Box = styled('div', {
  variants: {
    inline: {
      true: {
        display: 'inline-block',
      },
    },
  },
})

export default Box
