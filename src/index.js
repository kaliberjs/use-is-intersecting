import { useObservedRef } from '@kaliber/use-observed-ref'

export function useIsIntersecting({ root = null, rootMargin = undefined, threshold = undefined, disabled = undefined }) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [wasIntersecting, setWasIntersecting] = React.useState(false)
  const createObserver = React.useCallback(
    // @ts-ignore
    () => new window.IntersectionObserver(
      ([entry]) => { 
        setIsIntersecting(entry.isIntersecting) 
        setWasIntersecting(wasIntersecting => wasIntersecting || entry.isIntersecting) 
      },
      { root, rootMargin, threshold }
    ),
    [root, rootMargin, threshold]
  );

  const reset = React.useCallback(() => { setIsIntersecting(false) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled })

  return { ref, isIntersecting, wasIntersecting }
}

export function useWasIntersecting({ root, rootMargin, threshold }) {
  const [disabled, setDisabled] = React.useState(false)
  const { ref, wasIntersecting } = useIsIntersecting({ root, rootMargin, threshold, disabled })

  React.useEffect(
    () => { wasIntersecting && setDisabled(true) },
    [wasIntersecting]
  )

  return { wasIntersecting, ref }
}
