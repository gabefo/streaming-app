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
  '0%': { transform: 'scale(1)', opacity: 1 },
  '45%': { transform: 'scale(0.5)', opacity: 0.2 },
  '80%': { transform: 'scale(1)', opacity: 1 },
})

const Circle = styled('span', {
  display: 'inline-block',
  m: 2,
  width: 16,
  height: 16,
  borderRadius: '50%',
  bg: '$primary',
  animationName: `${pulse}`,
  animationDuration: '1s',
  animationTimingFunction: 'cubic-bezier(0.2, 0.68, 0.18, 1.08)',
  animationIterationCount: 'infinite',
  animationFillMode: 'both',

  variants: {
    order: {
      1: {
        animationDelay: '0.16s',
      },
      2: {
        animationDelay: '0.32s',
      },
      3: {
        animationDelay: '0.48s',
      },
    },
  },
})

export default function LoadingScreen() {
  return (
    <Root>
      <Box>
        <Circle order={1} />
        <Circle order={2} />
        <Circle order={3} />
      </Box>
    </Root>
  )
}
