import { keyframes, styled } from 'stitches.config'

const pulse = keyframes({
  from: { opacity: 0.5 },
  to: { opacity: 1 },
})

const Skeleton = styled('div', {
  position: 'relative',
  bg: '$skeleton',
  animation: `${pulse} 1.5s ease-in-out 0s infinite alternate`,

  variants: {
    variant: {
      text: {
        height: 20,
        borderRadius: 4,
        transform: 'scaleY(0.7)',
      },
      rounded: {
        borderRadius: 8,
      },
    },
  },
})

export default Skeleton
