export function visualizeRootMargin(rootMargin) {
  if (!rootMargin) return { top: '', right: '', bottom: '', left: '' }

  // Split the rootMargin into value strings, but flip the sign (positive becomes negative and vice versa)
  const [top, right, bottom, left] = rootMargin.split(' ').map(x => `-${x}`).map(x => x.replace('--', ''))
  const styles = { top, right, bottom, left }

  if (!styles.top) { styles.top = '' }
  if (!styles.right) { styles.right = styles.top }
  if (!styles.bottom) { styles.bottom = styles.top }
  if (!styles.left) { styles.left = styles.right }

  return styles
}
