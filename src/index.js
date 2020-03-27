import { useObservedRef } from '@kaliber/use-observed-ref'
import { getNodeDepth } from './getNodeDepth'

export function useIsIntersecting({ rootMargin = undefined, threshold = undefined, disabled = undefined }) {
  const [root, setRoot] = React.useState(null)
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [depth, setDepth] = React.useState(-1)
  const createObserver = React.useCallback(
    () => {
      // @ts-ignore
      return new window.IntersectionObserver(
        ([entry]) => {
          setDepth(getNodeDepth(root || document.documentElement, entry.element))
          setIsIntersecting(entry.isIntersecting);
        },
        { root, rootMargin, threshold }
      )
    },
    [root, rootMargin, threshold]
  );

  const reset = React.useCallback(() => { setIsIntersecting(false) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled })

  return { isIntersecting, depth, ref, rootRef: setRoot }
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

export function useIsIntersectingFixedElement() { 
  const cleanupRef = React.useRef(null)
  const [rootMargin, setRootMargin] = React.useState('0px')

  const targetRef = React.useCallback(
    node => {
      cleanupRef.current && cleanupRef.current()

      if (node) {
        updateRootMargin()

        window.addEventListener('resize', updateRootMargin)
        cleanupRef.current = () => {
          window.removeEventListener('resize', updateRootMargin)
          cleanupRef.current = null
        }
      }

      function updateRootMargin()  {
        setRootMargin(findPointRootMargin(node)) 
      }
    },
    []
  )

  const { ref } = useIsIntersecting({ rootMargin })
  
  return { ref, targetRef }
}

export function findPointRootMargin(element, root) {
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