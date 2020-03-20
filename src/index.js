import { useObservedRef } from '@kaliber/use-observed-ref'

export function useIsIntersecting({ rootMargin, threshold, disabled = undefined }) {
  const [root, setRoot] = React.useState(null)
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const createObserver = React.useCallback(
    () => {
      // @ts-ignore
      return new window.IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { root, rootMargin, threshold }
      )
    },
    [root, rootMargin, threshold]
  );

  const reset = React.useCallback(() => { setIsIntersecting(false) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled })

  return { isIntersecting, ref, rootRef: setRoot }
}

export function useWasIntersecting({ rootMargin, threshold }) {
  const [disabled, setDisabled] = React.useState(false)
  const { isIntersecting, ref, rootRef } = useIsIntersecting({ rootMargin, threshold, disabled })

  React.useEffect(
    () => {
      if (isIntersecting) {
        setDisabled(true)
      }
    },
    [isIntersecting]
  )

  return { wasIntersecting: isIntersecting, ref, rootRef }
}

export function useRootMargin() {
  const ref = React.useRef(null)
  const [rootMargin, setRootMargin] = React.useState('0px')

  React.useEffect(
    () => {
      window.addEventListener('resize', updateRootMargin)

      updateRootMargin()

      return () => {
        window.removeEventListener('resize', updateRootMargin)
      }

      function updateRootMargin()  {
        setRootMargin(deriveCenterPointRootMargin(ref.current)) 
      }
    },
    [ref.current]
  )

  return { ref, rootMargin }
}

export function deriveRootMargin(element, root) {
  const { top, right, bottom, left } = element.getBoundingClientRect()
  const width = (root || document.body).offsetWidth
  const height = (root || document.body).offsetHeight
  return [top, width - right, height - bottom, left].map(x => `-${x}px`).join(' ')
}

export function deriveCenterPointRootMargin(element, root) {
  const { top, right, bottom, left } = element.getBoundingClientRect()
  const x = (left + right) / 2
  const y = (top + bottom) / 2
  const width = root ? root.offsetWidth : document.body.clientWidth
  const height = root ? root.offsetHeight : window.innerHeight

  return [y, width - x - 1, height - y - 1, x].map(x => `-${x}px`).join(' ')
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