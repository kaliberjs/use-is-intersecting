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