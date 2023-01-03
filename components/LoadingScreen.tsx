import { keyframes, styled } from 'stitches.config'
import Box from './Box'

const Root = styled('div', {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const pulse = keyframes({
  '0%': { transform: 'scale(0.5)', opacity: 0.2 },
  '25%': { transform: 'scale(1)', opacity: 1 },
  '50%': { transform: 'scale(0.5)', opacity: 0.2 },
})

const Circle = styled('span', {
  display: 'inline-block',
  width: 16,
  height: 16,
  borderRadius: '50%',
  bg: '$primary',
  transform: 'scale(0.5)',
  opacity: 0.2,
  animationName: `${pulse}`,
  animationDuration: '1.2s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',

  variants: {
    order: {
      1: {
        animationDelay: '0.3s',
      },
      2: {
        animationDelay: '0.6s',
      },
    },
  },
})

export default function LoadingScreen() {
  return (
    <Root>
      <Box>
        <Circle />
        <Circle order={1} />
        <Circle order={2} />
      </Box>
    </Root>
  )
}
