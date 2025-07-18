'use client'

import { Text } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import {useTheme} from '../../context/ThemeContext.jsx';


const BlurText = forwardRef(function BlurText(
  { position, text, fontSize = 0.35 },
  externalRef
) {
  const ref = useRef()
  const {isDarkMode} = useTheme()
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
        onSync={(textMesh) => {
    // Set the blend mode here
    textMesh.material.transparent = false;
    textMesh.material.blending = THREE.DifferenceBlending;
  }}
      position={position}
      fontSize={fontSize}
      anchorX="center"
      anchorY="middle"
      font="/inter.ttf"
      color={isDarkMode ? '#ffffff' :'#000000'}
  
    >
      {text}
    </Text>
  )
})

export default BlurText
