import { useObservedRef } from '@kaliber/use-observed-ref'

export function useIsIntersecting({ root = null, rootMargin = undefined, threshold = undefined, disabled = undefined }) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const createObserver = React.useCallback(
    () => {
      console.log(root, rootMargin)
      // @ts-ignore
      return new window.IntersectionObserver(
        ([entry]) => { setIsIntersecting(entry.isIntersecting) },
        { root, rootMargin, threshold }
      )
    },
    [root, rootMargin, threshold]
  );

  const reset = React.useCallback(() => { setIsIntersecting(false) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled })

  return { ref, isIntersecting }
}

export function useWasIntersecting({ root, rootMargin, threshold }) {
  const [disabled, setDisabled] = React.useState(false)
  const { ref, isIntersecting } = useIsIntersecting({ root, rootMargin, threshold, disabled })

  React.useEffect(
    () => { isIntersecting && setDisabled(true) },
    [isIntersecting]
  )

  return { wasIntersecting: isIntersecting, ref }
}

export function visualizeRootMargin(rootMargin) {
  if (!rootMargin) return { top: '', right: '', bottom: '', left: '' }

  // Split the rootMargin into parts, but flip the sign (positive becomes negative and vice versa)
  const [top, right, bottom, left] = rootMargin.split(' ').map(x => `-${x}`).map(x => x.replace('--', ''))
  const styles = { top, right, bottom, left }
  
  if (!styles.top) { styles.top = '' }
  if (!styles.right) { styles.right = styles.top }
  if (!styles.bottom) { styles.bottom = styles.top }
  if (!styles.left) { styles.left = styles.right }

  return styles
}