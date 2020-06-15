import { useObservedRef } from '@kaliber/use-observed-ref'

export function useIsIntersecting({ root = null, rootMargin = undefined, threshold = undefined, disabled = undefined } = {}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const createObserver = React.useCallback(
    // @ts-ignore
    () => new window.IntersectionObserver(
      ([entry]) => { setIsIntersecting(entry.isIntersecting) },
      { root, rootMargin, threshold }
    ),
    [root, rootMargin, threshold]
  );

  const reset = React.useCallback(() => { setIsIntersecting(false) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled })

  return { ref, isIntersecting }
}

export function useWasIntersecting({ root = null, rootMargin = undefined, threshold = undefined } = {}) {
  const [disabled, setDisabled] = React.useState(false)
  const { ref, isIntersecting } = useIsIntersecting({ root, rootMargin, threshold, disabled })

  React.useEffect(
    () => { isIntersecting && setDisabled(true) },
    [isIntersecting]
  )

  return { wasIntersecting: isIntersecting, ref }
}
