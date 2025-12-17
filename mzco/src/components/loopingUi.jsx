import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import FloatingUI from './FloatingUI'
import img3 from '../assets/images/InfiniteImages/beach1.jpg'

function LoopingUI({ count = 20, zRange = 160 }) {
  const uiRefs = useRef([])

  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 3,
      z: -Math.random() * zRange,
    }))
  }, [count])

  useFrame(({ camera }) => {
    uiRefs.current.forEach((ref) => {
      if (!ref) return

      // recycle behind camera
      if (ref.position.z < camera.position.z - zRange) {
        ref.position.z += zRange
      }
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <FloatingUI
          key={i}
          img={img3}
          position={[pos.x, pos.y, pos.z]}
          ref={(el) => (uiRefs.current[i] = el)}
        />
      ))}
    </>
  )
}

export default LoopingUI
