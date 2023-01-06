import useInView from 'hooks/useInView'
import { useEffect, useRef } from 'react'
import { keyframes, styled } from 'stitches.config'

const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 24,
})

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

type LoadMoreProps = { onLoadMore: () => void }

export default function LoadMore({ onLoadMore }: LoadMoreProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      onLoadMore()
    }
  }, [isInView, onLoadMore])

  return (
    <Root ref={ref}>
      <LoadingIndicator />
    </Root>
  )
}
