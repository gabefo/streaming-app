import type { SearchMultipleResult } from 'lib/tmdb/types'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export default function useAutocomplete(ref: RefObject<HTMLInputElement>) {
  const { locale } = useRouter()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchMultipleResult[] | null>(null)

  useEffect(() => {
    const input = ref.current

    if (!input) {
      return
    }

    let controller: AbortController | undefined
    let timer: NodeJS.Timeout | undefined

    const handleInput = (event: Event) => {
      const element = event.target as HTMLInputElement
      const { value } = element

      setQuery(value)

      if (controller) {
        controller.abort()
      }

      if (timer) {
        clearTimeout(timer)
      }

      if (value) {
        timer = setTimeout(() => {
          controller = new AbortController()
          const { signal } = controller
          fetch(`/api/tmdb/search/multi?language=${locale}&query=${encodeURIComponent(value)}`, {
            signal,
          })
            .then((res) => res.json())
            .then((data) => setResults(data.results))
            .catch(() => {})
        }, 250)
      } else {
        setResults(null)
      }
    }

    input.addEventListener('input', handleInput)

    return () => {
      if (controller) {
        controller.abort()
      }

      if (timer) {
        clearTimeout(timer)
      }

      input.removeEventListener('input', handleInput)
    }
  }, [locale, ref])

  return { query, results }
}
