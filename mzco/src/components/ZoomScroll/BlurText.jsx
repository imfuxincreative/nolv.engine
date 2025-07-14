'use client'

import { Text } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'

const BlurText = forwardRef(function BlurText(
  { position, text, color = '#000000', fontSize = 0.35 },
  externalRef
) {
  const ref = useRef()
  const { camera } = useThree()

  useFrame(() => {
    if (!ref.current) return

    const distance = Math.abs(ref.current.position.z - camera.position.z)

    // 🔧 Adjust fade distance range
    const fadeStart = 20
    const fadeEnd = 60
    const t = Math.min(1, Math.max(0, (distance - fadeStart) / (fadeEnd - fadeStart)))

    const opacity = 1 - t

    if (ref.current.material) {
      ref.current.material.opacity = opacity
      ref.current.material.transparent = true
    }
  })

  return (
    <Text
      ref={(el) => {
        ref.current = el
        if (typeof externalRef === 'function') externalRef(el)
        else if (externalRef) externalRef.current = el
      }}
      position={position}
      fontSize={fontSize}
      anchorX="center"
      anchorY="middle"
      font="/inter.ttf"
      color={color}
    >
      {text}
    </Text>
  )
})

export default BlurText
