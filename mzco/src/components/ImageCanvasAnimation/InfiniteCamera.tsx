import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { scrollState } from './scrollState'
import { useLayoutMode } from '../../context/LayoutContext'

export default function InfiniteCamera() {
  const camera = useThree((s) => s.camera)
  const { is2DMode } = useLayoutMode()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      // Replicate R3F's native pointer state math using generic global coordinates
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  useFrame(() => {

    // PERF: Uses shared scrollState instead of reading DOM
    const cameraProgress = Math.min(1, scrollState.progress / 0.90)

    // Linear interpolation for anamorphic perspective
    const startZ = -2200;
    const finalZ = 150;

    const scrollZ = startZ + cameraProgress * (finalZ - startZ);

    // Intro fly-through camera offset along Z axis (scroll direction)
    const introZOffset = scrollState.introOffset || 0;
    const targetZ = scrollZ + introZOffset;

    // Bind strictly perfectly to the EXACT layout metric used by the structural grid geometry.
    const lp = scrollState.layoutProgress || 0;
    camera.position.z = targetZ + (150 - targetZ) * lp;

    // --- Dynamic Mouse Skew Parallax ---
    // Physical shifting: moving the camera opposite to pointer makes items 'lean' toward pointer
    const targetX = -mouseRef.current.x * 3.0; // move opposite to slide items toward pointer
    const targetY = -mouseRef.current.y * 3.0;
    
    // Rotational skewing: turn the camera's gaze slightly to exaggerate the skew depth
    const targetRotX = mouseRef.current.y * 0.03;
    const targetRotY = mouseRef.current.x * 0.03;

    // Buttery smooth lerp applied constantly
    camera.position.x += (targetX - camera.position.x) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    
    camera.rotation.x += (targetRotX - camera.rotation.x) * 0.08;
    camera.rotation.y += (targetRotY - camera.rotation.y) * 0.08;
  })
  return null
}