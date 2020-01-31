import { useIsInViewport }  from '@kaliber/use-is-intersecting'
import styles from './App.css'

export default function App() {
  const [useMorePadding, setUseMorePadding] = React.useState(false)
  const { ref, isInViewport } = useIsInViewport({ rootMargin: useMorePadding ? '-25%' : '-10%' })

  return (
    <div className={cx(styles.app, useMorePadding ? styles.morePadding : styles.lessPadding)}>
      <div className={cx(styles.element, isInViewport && styles.isRevealed)} {...{ ref }} />
      <button onClick={() => setUseMorePadding(!useMorePadding)} className={styles.button}>Use { useMorePadding ? 'less' : 'more' } padding</button>
    </div>
  )
}
