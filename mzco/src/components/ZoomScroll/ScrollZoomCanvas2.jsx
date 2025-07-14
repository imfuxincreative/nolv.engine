'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useMemo } from 'react'
import BlurText from './BlurText.jsx' // make sure the filename is correct (TextBlur or BlurText)


function CameraScrollZoom({ scrollRef }) {
  const { camera } = useThree()
  useFrame(() => {

    const targetZ = 10 + scrollRef.current * 10
    camera.position.z += (targetZ - camera.position.z) * 0.1
   
  })

  return null
}

function FloatingLoopingTexts({ count = 80, zRange = 160 }) {
  const textRefs = useRef([])
  const textOptions = ['hi', 'meeza', 'code', 'love', 'blend', 'craft', ':)', 'UX', 'UI', 'JS']

  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 4,
      z: Math.random() * zRange,
      word: textOptions[Math.floor(Math.random() * textOptions.length)],
    }))
  }, [count])

  useFrame(({ camera }) => {
    textRefs.current.forEach((ref, i) => {
      if (!ref) return

      // Recycle if behind camera
      if (ref.position.z < camera.position.z - zRange) {
        ref.position.z += zRange
      }
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <BlurText
          key={i}
          position={[pos.x, pos.y, pos.z]}
          text={pos.word}
          ref={(el) => (textRefs.current[i] = el)}
        />
      ))}
    </>
  )
}

export default function ZoomCanvas({ count = 100 }) {
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight

      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative w-full h-[100000px] bg-white">
      <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      className="!fixed top-0 left-0 w-full h-screen"
    >
      <ambientLight intensity={1} />

      {/* Your text and camera movement */}
      <FloatingLoopingTexts count={count} />
      <CameraScrollZoom scrollRef={scrollRef} />

      {/* ✅ Add smooth blur effect here */}
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={5}   // sharp around z = 0–5
          focalLength={10}     // small depth = more blur
          bokehScale={3.5}         // strength of the blur
          height={720}           // effect resolution
        /> */}
      {/* </EffectComposer> */}
      {/* <GlassShaderOverlay/> */}
    </Canvas>
    </div>
  )
}
