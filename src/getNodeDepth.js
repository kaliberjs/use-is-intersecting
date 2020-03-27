export function getNodeDepth(root, target) {
  if (!root.contains(target)) return -1
  let depth = 0
  let node = target
  while(node.parentNode && node.parentNode !== root) {
    node = node.parentNode
    depth++
  }
  return depth
}