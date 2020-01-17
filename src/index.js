export function useIsIntersecting(targetRef, { root, rootMargin, threshold }) {
  const [isIntersecting, setIntersecting] = React.useState(false)
  const observerRef = React.useRef(null)

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, { root, rootMargin, threshold })

    return () => observerRef.current.disconnect()

    function handleIntersection([entry]) {
      setIntersecting(entry.isIntersecting)
    }
  }, [root, rootMargin, threshold])

  React.useEffect(() => {
    const subject = targetRef.current
    observerRef.current.observe(subject)

    return () => observerRef.current.unobserve(subject)
  }, [targetRef, root, rootMargin, threshold])

  return isIntersecting
}
