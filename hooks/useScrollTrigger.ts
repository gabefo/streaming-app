import { useEffect, useState } from 'react'

interface ScrollTriggerOptions {
  threshold?: number
}

export default function useScrollTrigger({ threshold = 10 }: ScrollTriggerOptions = {}) {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setTrigger(window.pageYOffset > threshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return trigger
}
