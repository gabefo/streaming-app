import { keyframes, styled } from 'stitches.config'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const StyledSpinner = styled('span', {
  display: 'inline-block',
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: '$textDisabled $textDisabled transparent',
  borderRadius: '50%',
  transformOrigin: '50% 50%',
  animation: `${spin} 0.75s linear infinite`,
})

type LoadingSpinnerProps = {
  size?: number
}
export default function LoadingSpinner({ size = 28 }: LoadingSpinnerProps) {
  return <StyledSpinner css={{ width: size, height: size }} />
}
