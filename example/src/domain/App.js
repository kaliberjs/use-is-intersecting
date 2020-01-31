import { useIsInViewport }  from '@kaliber/use-is-intersecting'
import styles from './App.css'

export default function App() {
  const elementRef = React.useRef(null)
  const isInViewport = useIsInViewport(elementRef)

  return (
    <div className={styles.app}>
      <div className={cx(styles.box, isInViewport && styles.isRevealed)} ref={elementRef}>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Hic quos laudantium rerum magnam at!</p>
        <p>Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Hic quos laudantium rerum magnam at!</p>
        <p>Hic quos laudantium rerum magnam at! Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
    </div>
  )
}
