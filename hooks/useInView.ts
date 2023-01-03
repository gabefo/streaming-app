import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

type InViewOptions = {
  root?: RefObject<Element | Document>
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export default function useInView(
  ref: RefObject<Element>,
  { root, rootMargin, threshold, once = false }: InViewOptions = {}
) {
  const [isInView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || (once && isInView)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else {
          setInView(false)
        }
      },
      { root: root?.current, rootMargin, threshold }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, ref, root, rootMargin])

  return isInView
}
