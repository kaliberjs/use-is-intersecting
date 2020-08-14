import { useIsIntersecting, useWasIntersecting }  from '@kaliber/use-is-intersecting'
import { visualizeRootMargin } from '/domain/visualizeRootMargin'
import styles from './App.css'

export default function App() {
  const [root, setRoot] = React.useState(null)
  const [rootMargin, setRootMargin] = React.useState('-25%')
  const {
    ref: element1Ref,
    isIntersecting: element1IsIntersecting,
    wasIntersecting: element1WasIntersecting
  } = useIsIntersecting({ root, rootMargin })
  const {
    ref: element2Ref,
    wasIntersecting: element2WasIntersecting
  } = useWasIntersecting({ root, rootMargin })

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
            className={cx(styles.element, element1IsIntersecting && styles.isRevealed)}
            ref={element1Ref}
          >
            {element1IsIntersecting
              ? 'Is in intersection root element'
              : element1WasIntersecting
              ? 'Is not in intersection root element anymore'
              : 'Is not in intersection root element'}
          </div>

          <div
            className={cx(styles.element, element2WasIntersecting && styles.isRevealed)}
            ref={element2Ref}
          >
            {element2WasIntersecting
              ? 'Has been in intersection root element'
              : 'Has not yet been in intersection root element'}
          </div>
        </div>
      </div>
    </div>
  );
}
