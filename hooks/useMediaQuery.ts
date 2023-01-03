import { useState } from 'react'
import useEnhancedEffect from './useEnhancedEffect'

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEnhancedEffect(() => {
    const mediaQuery = window.matchMedia(query)

    setMatches(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
