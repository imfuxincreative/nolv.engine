'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
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

// ─── Texture cache to prevent duplicate loads ─────────────────────────────────
// Stores { tex, aspect, listeners[] } per image source
const _textureCache = new Map()

// ─── 3D Floating Image (no card, just the image as a plane) ───────────────────
function FloatingImage({ imageSrc, scale = 1 }) {
  const meshRef = useRef()
  const [aspect, setAspect] = useState(1)
  const fixedWidth = 0.9

  const texture = useMemo(() => {
    if (_textureCache.has(imageSrc)) {
      return _textureCache.get(imageSrc).tex
    }
    const entry = { tex: null, aspect: null, listeners: [] }
    const tex = new THREE.TextureLoader().load(imageSrc, (loaded) => {
      entry.aspect = loaded.image.height / loaded.image.width
      // Notify all subscribed instances
      entry.listeners.forEach(fn => fn(entry.aspect))
      entry.listeners = []
    })
    tex.colorSpace = THREE.SRGBColorSpace
    entry.tex = tex
    _textureCache.set(imageSrc, entry)
    return tex
  }, [imageSrc])

  // Subscribe to get correct aspect ratio (works for both cached and fresh textures)
  useEffect(() => {
    const entry = _textureCache.get(imageSrc)
    if (!entry) return
    if (entry.aspect !== null) {
      setAspect(entry.aspect)
    } else {
      entry.listeners.push(setAspect)
      return () => {
        entry.listeners = entry.listeners.filter(fn => fn !== setAspect)
      }
    }
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

    // Make invisible if behind camera
    groupRef.current.visible = groupRef.current.position.z < camera.position.z + 5

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
