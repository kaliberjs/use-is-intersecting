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
        observerRef.current = new window.IntersectionObserver(callback, { root, rootMargin, threshold })
      }
      if (targetRef.current) observerRef.current.unobserve(targetRef.current)
      if (node) observerRef.current.observe(node)
      targetRef.current = node
    },
    [root, rootMargin, threshold, enabled]
  )

  React.useEffect(
    () => {
      ref(targetRef.current)
      return cleanup
    },
    [ref]
  )

  return { isIntersecting, ref }

  function cleanup() {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }

  function callback([entry]) {
    setIsIntersecting(entry.isIntersecting)
  }
}
