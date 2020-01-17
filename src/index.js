function _useIsIntersecting(targetRef, { root, rootMargin, threshold }, enabled) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(handleIntersection, { root, rootMargin, threshold })
    observer.observe(targetRef.current)

    return () => observer.disconnect()

    function handleIntersection([entry]) {
      setIsIntersecting(entry.isIntersecting)
    }
  }, [targetRef, root, rootMargin, threshold, enabled])

  return isIntersecting
}

export function useIsIntersecting(targetRef, options) {
  return _useIsIntersecting(targetRef, options, true)
}

export function useWasIntersecting(targetRef, options) {
  const [wasIntersecting, setWasIntersecting] = React.useState(false)
  const isIntersecting = _useIsIntersecting(targetRef, options, !wasIntersecting)

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

export function useIsInViewport(targetRef, { root, ...options }) {
  return useIsIntersecting(targetRef, options)
}

export function useWasInViewport(targetRef, { root, ...options }) {
  return useWasIntersecting(targetRef, options)
}