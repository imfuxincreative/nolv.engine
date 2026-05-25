import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// ─── Scene Ready Signal ───────────────────────────────────────────────────────
// Waits for the 3D scene to render enough frames, then signals the parent.
interface SceneReadySignalProps {
  onReady: () => void;
}

export default function SceneReadySignal({ onReady }: SceneReadySignalProps) {
  const frameCount = useRef(0)
  const signaled = useRef(false)

  useFrame(() => {
    if (signaled.current) return
    frameCount.current++
    if (frameCount.current >= 90) {
      signaled.current = true
      onReady()
    }
  })
  return null
}
