import React, { useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import LoopingTexts from './LoopingTexts';
import LoopingUI from '../loopingUi';

const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))


function InfiniteCamera({ scrollRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = 10 + scrollRef.current * 10
    camera.position.z += (targetZ - camera.position.z) * 0.1
  })
  return null
}

export default function ScrollZoomCanvas() {
  const scrollRef = useRef(0)
  const [mobile] = useState(() => isMobile())

  useEffect(() => {
    let start = null
    const startY = window.scrollY
    const targetY = 500
    const duration = 500 // in ms

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percent = Math.min(progress / duration, 1)
      const eased = percent < 0.5
        ? 2 * percent * percent
        : -1 + (4 - 2 * percent) * percent

      window.scrollTo(0, startY + (targetY - startY) * eased)

      if (percent < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight


    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='relative w-full bg-transparent' style={{ height: mobile ? '20000px' : '100000px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}
        className='!fixed  top-0 left-0 w-full h-screen'
        dpr={mobile ? 1 : [1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: !mobile }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {!mobile && <pointLight position={[-3, 2, 4]} intensity={0.5} color="#D9FF00" />}
        {!mobile && <hemisphereLight groundColor="#1a1a2e" intensity={0.3} />}
        <LoopingTexts count={mobile ? 20 : 80} zRange={mobile ? 60 : 160} />
        {/* <LoopingUI />   */}
        <InfiniteCamera scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}

