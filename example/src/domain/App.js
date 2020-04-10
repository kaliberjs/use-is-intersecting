import { useIsIntersecting, useWasIntersecting }  from '@kaliber/use-is-intersecting'
import { visualizeRootMargin } from '/domain/visualizeRootMargin'
import styles from './App.css'

export default function App() {
  const [root, setRoot] = React.useState(null)
  const [rootMargin, setRootMargin] = React.useState('-10%')
  const { ref: isIntersectingRef, isIntersecting } = useIsIntersecting({ root, rootMargin })
  const { ref: wasIntersectingRef, wasIntersecting } = useWasIntersecting({ root, rootMargin })

  const rootMarginStyles = visualizeRootMargin(rootMargin)

  return (
    <div className={styles.app}>
      <input
        className={styles.rootMarginInput}
        value={rootMargin}
        onChange={e => setRootMargin(e.target.value)}
      />

      <div className={styles.scrollWrapper}>
        <div className={styles.rootMargin} style={rootMarginStyles} />
        <div ref={setRoot} className={styles.scroll}>
          <div
            className={cx(styles.element, isIntersecting && styles.isRevealed)}
            ref={isIntersectingRef}
          >
            {isIntersecting
              ? "Is in intersection root element"
              : "Is not in intersection root element"}
          </div>

          <div
            className={cx(styles.element, wasIntersecting && styles.isRevealed)}
            ref={wasIntersectingRef}
          >
            {wasIntersecting
              ? "Has been in intersection root element"
              : "Has not yet been in intersection root element"}
          </div>
        </div>
      </div>
    </div>
  );
}
