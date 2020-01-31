export function useIsIntersecting(options = {}) {
  return useIsIntersectingBase(options, true)
}

export function useWasIntersecting(options = {}) {
  const [wasIntersecting, setWasIntersecting] = React.useState(false)
  const { ref, isIntersecting } = useIsIntersectingBase(options, !wasIntersecting)

  React.useEffect(
    () => {
      if (isIntersecting && !wasIntersecting) {
        setWasIntersecting(true)
      }
    },
    [isIntersecting, wasIntersecting]
  )

  return { ref, wasIntersecting }
}

export function useIsInViewport(options = {}) {
  const { ref, isIntersecting } = useIsIntersecting({ ...options, root: null })
  return { ref, isInViewport: isIntersecting }
}

export function useWasInViewport(options = {}) {
  const { ref, wasIntersecting } = useWasIntersecting({ ...options, root: null })
  return { ref, wasInViewport: wasIntersecting }
}

function useIsIntersectingBase({ root = null, rootMargin = undefined, threshold = undefined } = {}, enabled) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const observerRef = React.useRef(null)
  const targetRef = React.useRef(null)

  const ref = React.useCallback(
    node => {
      if (!enabled) return
      if (!observerRef.current) {
        // @ts-ignore
        observerRef.current = new window.IntersectionObserver(handleIntersectionObservation, { root, rootMargin, threshold })
      }
      if (targetRef.current) observerRef.current.unobserve(targetRef.current)
      if (node) observerRef.current.observe(node)
      targetRef.current = node
    },
    [root, rootMargin, threshold, enabled]
  )

  React.useEffect(
    () => {
      // If ref changed, that means the registered IntersectionObserver changed. 
      // We have to re-observe the targetRef in that case.
      ref(targetRef.current)

      return () => {
        if (!observerRef.current) return
        observerRef.current.disconnect()
        observerRef.current = null
      }
    },
    [ref]
  )

  return { isIntersecting, ref }

  function handleIntersectionObservation([entry]) {
    setIsIntersecting(entry.isIntersecting)
  }
}
