import { RefObject, useEffect, useState } from 'react'

export default function useScrollBottom(threshold: number = 100) {
  const [isBottom, setBottom] = useState(false)

  useEffect(() => {
    const target = document.documentElement

    const handleScroll = () => {
      setBottom(Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < threshold)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isBottom
}
