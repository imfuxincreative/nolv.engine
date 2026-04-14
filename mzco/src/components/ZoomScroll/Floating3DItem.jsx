'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { forwardRef } from 'react'
import { scrollState } from './scrollState'

// ─── GLB Model (Desk) ─────────────────────────────────────────────────────────
function DeskModel({ scale = 1 }) {
  const { scene } = useGLTF('/models/Desk.glb')
  const cloned = useMemo(() => scene.clone(), [scene])
  return <primitive object={cloned} scale={scale} />
}

// PERF: Removed useGLTF.preload — DeskModel is never rendered (only 'image'
// type items are generated in LoopingTexts). The preload wasted network + memory
// loading a GLB that was never used.
// useGLTF.preload('/models/Desk.glb')

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

// ─── Shared geometry for ALL image planes ─────────────────────────────────────
// PERF: One geometry buffer shared across ~1000 instances instead of each
// creating its own. Scale is used to handle different aspect ratios.
const _sharedPlaneGeo = new THREE.PlaneGeometry(1, 1)

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
    // PERF: Disable mipmaps — these items are scaled dynamically already,
    // mipmaps waste GPU memory (especially with 13 unique textures).
    tex.generateMipmaps = false
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
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
      <mesh ref={meshRef} geometry={_sharedPlaneGeo} scale={[fixedWidth, fixedWidth * aspect, 1]} key={aspect}>
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
  const camera = useThree((s) => s.camera)

  // PERF: Track last fade to avoid redundant traverse() calls.
  // Previously, traverse() ran on ALL ~1000 items EVERY frame, even when
  // the color wasn't changing. Now it only runs when needed (~20 times total).
  const lastFade = useRef(-1)

  useFrame(() => {
    const g = groupRef.current
    if (!g || !innerRef.current) return

    // Make invisible if behind camera
    g.visible = g.position.z < camera.position.z + 5

    // PERF: Skip ALL further processing if item is invisible
    if (!g.visible) return

    // Transform items to black before the UI state (80% to 90%)
    const fade = Math.max(0, Math.min(1, (scrollState.progress - 0.80) / 0.10))

    // Only traverse when fade value actually changes (quantized to 20 steps)
    const rounded = (fade * 20 | 0) / 20
    if (rounded !== lastFade.current) {
      lastFade.current = rounded
      const v = 1 - fade
      innerRef.current.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
          child.material.color.setRGB(v, v, v)
        }
      })
    }
  })

  // PERF: Removed drag-to-rotate pointer handlers (onPointerDown/Move/Up/Leave).
  // Reasons:
  // 1. LoopingTexts sets ref.rotation.x = 0 and ref.rotation.y = 0 every frame,
  //    overriding any user-applied rotation anyway
  // 2. Pointer handlers cause THREE.js to raycast against ALL ~1000 items on
  //    EVERY mouse/touch move — extremely expensive, especially on mobile

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
    >
      <group ref={innerRef}>
        {renderItem()}
      </group>
    </group>
  )
})

export default Floating3DItem
