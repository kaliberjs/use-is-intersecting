import composeRefs from '@seznam/compose-react-refs'
import { useIsInViewport, useIsIntersecting, useWasIntersecting, useRootMargin, visualizeRootMargin }  from '@kaliber/use-is-intersecting'
import styles from './App.css'

export default function App() {
  const [useLargeRootMargin, setUseLargeRootMargin] = React.useState(false)

  const rootMargin = useLargeRootMargin ? '-25%' : '-10%'
  const { ref: isIntersectingRef, rootRef: isIntersectingRootRef, isIntersecting } = useIsIntersecting({ rootMargin })
  const { ref: wasIntersectingRef, rootRef: wasIntersectingRootRef, wasIntersecting } = useWasIntersecting({ rootMargin })
  const viewportRef = composeRefs(isIntersectingRootRef, wasIntersectingRootRef)

  const { ref: buttonRef, rootMargin: buttonRootMargin } = useRootMargin()
  const { ref: section1Ref, isInViewport: section1IsIntersecting } = useIsInViewport({ rootMargin: buttonRootMargin })
  const { ref: section2Ref, isInViewport: section2IsIntersecting } = useIsInViewport({ rootMargin: buttonRootMargin })

  const rootMarginStyles = visualizeRootMargin(rootMargin)
  const buttonRootMarginStyles = visualizeRootMargin(buttonRootMargin)

  return (
    <div ref={viewportRef} className={styles.app}>
      <div className={styles.rootMargin} style={rootMarginStyles} />
      <div className={styles.rootMargin} style={buttonRootMarginStyles} />
      <button
        ref={buttonRef}
        onClick={() => setUseLargeRootMargin(useLargeRootMargin  => !useLargeRootMargin)}
        className={cx(styles.button, (section1IsIntersecting || section2IsIntersecting) && styles.isInverted)}
      >
        Use {useLargeRootMargin ? "small" : "large"} rootMargin
      </button>

      <div ref={section1Ref} className={cx(styles.section, styles.sectionSolid)} />
      <div className={styles.section}>
        <div
          className={cx(styles.element, isIntersecting && styles.isRevealed)}
          ref={isIntersectingRef}
        >
          {isIntersecting ? 'Is in intersection root element' : 'Is not in intersection root element'}
        </div>
        <div
          className={cx(styles.element, wasIntersecting && styles.isRevealed)}
          ref={wasIntersectingRef}
        >
          {wasIntersecting ? 'Has been in intersection root element' : 'Has not yet been in intersection root element'}
        </div>
      </div>
      <div ref={section2Ref} className={cx(styles.section, styles.sectionSolid)} />
      <div className={styles.section} />
    </div>
  )
}
