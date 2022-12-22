import { useEffect, useState } from 'react'

export default function useOffsetTop(threshold: number = 10) {
  const [isOffset, setOffset] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset > threshold)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isOffset
}
