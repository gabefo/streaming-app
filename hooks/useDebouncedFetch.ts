import { useCallback, useEffect, useRef } from 'react'

export default function useDebouncedFetch(wait: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>()
  const controllerRef = useRef<AbortController>()

  const debouncedFetch = useCallback(
    (input: RequestInfo | URL): Promise<Response> => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      return new Promise((resolve, reject) => {
        timerRef.current = setTimeout(() => {
          controllerRef.current = new AbortController()
          fetch(input, { signal: controllerRef.current.signal }).then(resolve).catch(reject)
        }, wait)
      })
    },
    [wait]
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  return debouncedFetch
}
