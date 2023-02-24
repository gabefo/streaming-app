import { useEffect, useRef } from 'react'

import { useInView } from 'framer-motion'

import { styled } from 'stitches.config'

import LoadingSpinner from './LoadingSpinner'

const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mt: 24,
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
      <LoadingSpinner />
    </Root>
  )
}
