import { useFrame } from '@react-three/fiber'
import { updateScrollState } from './scrollState'

// ─── Update shared scroll state exactly ONCE per frame ────────────────────────
// Priority -100 ensures this runs before all other useFrame callbacks.
export default function ScrollUpdater() {
  useFrame(() => {
    updateScrollState()
  }, -100)
  return null
}
