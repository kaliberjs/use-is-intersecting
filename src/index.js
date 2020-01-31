function _useIsIntersecting({ root, rootMargin, threshold }, enabled) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const observerRef = React.useRef(null)
  const targetRef = React.useRef(null)

  const observe = React.useCallback(
    node => {
      if (targetRef.current) observerRef.current.unobserve(targetRef.current)
      if (node) observerRef.current.observe(node)
      targetRef.current = node
    },
    []
  )

  React.useEffect(
    () => {
      if (!enabled) return
      if (!observerRef.current) {
        // @ts-ignore
        observerRef.current = new window.IntersectionObserver(callback, { root, rootMargin, threshold })
      }

      if (targetRef.current) {
        observe(targetRef.current)
      }

      return cleanup
    },
    [observe, enabled, root, rootMargin, threshold]
  )

  const ref = React.useCallback(
    node => {
      if (!enabled) return
      observe(node)
    },
    [observe, enabled]
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

export function useIsIntersecting(options) {
  return _useIsIntersecting(options, true)
}

export function useWasIntersecting(options) {
  const [wasIntersecting, setWasIntersecting] = React.useState(false)
  const isIntersecting = _useIsIntersecting(options, !wasIntersecting)

  React.useEffect(
    () => {
      if (isIntersecting && !wasIntersecting) {
        setWasIntersecting(true)
      }
    },
    [isIntersecting, wasIntersecting]
  )

  return wasIntersecting
}

export function useIsInViewport({ root, ...options }) {
  return useIsIntersecting({ ...options, root: null })
}

export function useWasInViewport({ root, ...options }) {
  return useWasIntersecting({ ...options, root: null })
}
