'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { forwardRef } from 'react'

// ─── GLB Model (Desk) ─────────────────────────────────────────────────────────
function DeskModel({ scale = 1 }) {
  const { scene } = useGLTF('/models/Desk.glb')
  const cloned = useMemo(() => scene.clone(), [scene])
  return <primitive object={cloned} scale={scale} />
}

// Preload so it doesn't stutter
useGLTF.preload('/models/Desk.glb')

// ─── Simple Square Shape ──────────────────────────────────────────────────────
function SquareShape({ scale = 1 }) {
  return (
    <group scale={scale}>
      <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          color="#ededed"
          metalness={0.05}
          roughness={0.6}
        />
      </RoundedBox>
    </group>
  )
}

// ─── 3D Floating Image (no card, just the image as a plane) ───────────────────
function FloatingImage({ imageSrc, scale = 1 }) {
  const meshRef = useRef()
  const [aspect, setAspect] = useState(1)
  const fixedWidth = 0.9

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(imageSrc, (loaded) => {
      // Once loaded, read image natural size and compute aspect ratio
      const w = loaded.image.width
      const h = loaded.image.height
      setAspect(h / w)
    })
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [imageSrc])

  return (
    <group scale={scale}>
      <mesh ref={meshRef} key={aspect}>
        <planeGeometry args={[fixedWidth, fixedWidth * aspect]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

// ─── Main Floating 3D Item ───────────────────────────────────────────────────
const Floating3DItem = forwardRef(function Floating3DItem(
  { position, itemType, itemData },
  externalRef
) {
  const groupRef = useRef()
  const innerRef = useRef()
  const { camera } = useThree()

  // Drag-to-rotate state
  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })
  const rotationVelocity = useRef({ x: 0, y: 0 })



  useFrame((_, delta) => {
    if (!groupRef.current || !innerRef.current) return

    // Fade based on distance
    const distance = Math.abs(groupRef.current.position.z - camera.position.z)
    const fadeStart = 20
    const fadeEnd = 60
    const t = Math.min(1, Math.max(0, (distance - fadeStart) / (fadeEnd - fadeStart)))
    const opacity = 1 - t
    groupRef.current.visible = opacity > 0.01

    // Only rotate from drag momentum (no auto-rotate)
    rotationVelocity.current.x *= 0.96
    rotationVelocity.current.y *= 0.96
    innerRef.current.rotation.x += rotationVelocity.current.x * delta
    innerRef.current.rotation.y += rotationVelocity.current.y * delta
  })

  const handlePointerDown = (e) => {
    e.stopPropagation()
    isDragging.current = true
    previousMouse.current = { x: e.clientX, y: e.clientY }
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - previousMouse.current.x
    const dy = e.clientY - previousMouse.current.y
    rotationVelocity.current.x = dy * 0.08
    rotationVelocity.current.y = dx * 0.08
    previousMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  const renderItem = () => {
    switch (itemType) {
      case 'desk':
        return (
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <DeskModel scale={itemData.scale || 0.5} />
          </Float>
        )
      case 'square':
        return (
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <SquareShape scale={itemData.scale || 1} />
          </Float>
        )
      case 'image':
        return (
          <FloatingImage imageSrc={itemData.imageSrc} scale={itemData.scale || 0.7} />
        )
      default:
        return null
    }
  }

  return (
    <group
      ref={(el) => {
        groupRef.current = el
        if (typeof externalRef === 'function') externalRef(el)
        else if (externalRef) externalRef.current = el
      }}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <group ref={innerRef}>
        {renderItem()}
      </group>
    </group>
  )
})

export default Floating3DItem
