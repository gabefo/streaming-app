import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import { keyframes, styled } from 'stitches.config'

const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  bg: '$overlay',
  zIndex: 1000,
})

const BarWrapper = styled('div', {
  position: 'relative',
  height: 4,
  overflow: 'hidden',
})

const long = keyframes({
  '0%': { left: '-35%', right: '100%' },
  '60%': { left: '100%', right: '-90%' },
  '100%': { left: '100%', right: '-90%' },
})

const short = keyframes({
  '0%': { left: '-200%', right: '100%' },
  '60%': { left: '107%', right: '-8%' },
  '100%': { left: '107%', right: '-8%' },
})

const Bar = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  bg: '#e32832',
  transition: 'transform 0.2s linear',
  transformOrigin: 'left center',
  animationDuration: '2.1s',
  animationIterationCount: 'infinite',

  variants: {
    animation: {
      long: {
        animationName: `${long}`,
        animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395)',
      },
      short: {
        animationName: `${short}`,
        animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        animationDelay: '1.15s',
      },
    },
  },
})

export default function ProgressBar() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
    }

    const handleStop = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  if (!loading) {
    return null
  }

  return (
    <RemoveScroll allowPinchZoom forwardProps>
      <Overlay>
        <BarWrapper>
          <Bar animation="long" />
          <Bar animation="short" />
        </BarWrapper>
      </Overlay>
    </RemoveScroll>
  )
}
