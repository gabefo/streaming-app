import { keyframes, styled } from 'stitches.config'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const LoadingIndicator = styled('span', {
  display: 'inline-block',
  width: 36,
  height: 36,
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: '$textDisabled $textDisabled transparent',
  borderRadius: '50%',
  transformOrigin: '50% 50%',
  animation: `${spin} 0.75s linear infinite`,
})

export default LoadingIndicator
