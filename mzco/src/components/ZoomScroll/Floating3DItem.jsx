'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { forwardRef } from 'react'
import { scrollState, interactState } from './scrollState'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLayoutMode } from '../../context/LayoutContext.jsx'



// ─── Texture cache to prevent duplicate loads ─────────────────────────────────
// Stores { tex, aspect, listeners[] } per image source
const _textureCache = new Map()

// ─── Shared geometry for ALL image planes ─────────────────────────────────────
// PERF: One geometry buffer shared across ~1000 instances instead of each
// creating its own. Scale is used to handle different aspect ratios.
const _sharedPlaneGeo = new THREE.PlaneGeometry(1, 1)

// ─── Constants for smooth theme color interpolation ───────────────────────────
const _colorLightBg = new THREE.Color('#111111')
const _colorDarkBg = new THREE.Color('#ffffff')
const _colorLightText = new THREE.Color('#ffffff')
const _colorDarkText = new THREE.Color('#000000')
const _tempColor = new THREE.Color()

// ─── 3D Floating Image with Title Overlay ─────────────────────────────────────
// Each image gets an editorial-style title positioned at bottom-left, matching
// the magazine/editorial UI reference.
function FloatingImage({ imageSrc, scale = 1, title = 'nolv', isDarkMode, onClick }) {
  const meshRef = useRef()
  const bgMatRef = useRef()
  const textRef = useRef()
  const themeProgress = useRef(isDarkMode ? 1 : 0)
  const hoverProgress = useRef(0)
  const [aspect, setAspect] = useState(1)
  const [hovered, setHovered] = useState(false)
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

  // Smoothly interpolate label colors on theme change
  useFrame((state, delta) => {
    // Clamp delta to avoid massive jumps when browser hangs during theme toggle
    const safeDelta = Math.min(delta, 0.032)
    const target = isDarkMode ? 1 : 0
    const speed = 5.0 // Takes exactly 0.2 seconds to fully transition

    if (themeProgress.current < target) {
      themeProgress.current = Math.min(target, themeProgress.current + safeDelta * speed)
    } else if (themeProgress.current > target) {
      themeProgress.current = Math.max(target, themeProgress.current - safeDelta * speed)
    }

    if (bgMatRef.current) {
      bgMatRef.current.color.copy(_colorLightBg).lerp(_colorDarkBg, themeProgress.current)
    }
    if (textRef.current) {
      _tempColor.copy(_colorLightText).lerp(_colorDarkText, themeProgress.current)
      textRef.current.color = '#' + _tempColor.getHexString()
    }

    // Hover fade animation
    const hTarget = hovered ? 1 : 0
    if (Math.abs(hoverProgress.current - hTarget) > 0.001) {
      hoverProgress.current += (hTarget - hoverProgress.current) * (safeDelta * 10)
    } else {
      hoverProgress.current = hTarget
    }

    if (bgMatRef.current) {
      bgMatRef.current.opacity = hoverProgress.current
    }
    if (textRef.current) {
      textRef.current.fillOpacity = hoverProgress.current
    }
  })

  const labelWidth = Math.max(0.2, (title?.length || 0) * 0.02) + 0.04
  const labelHeight = 0.07

  const labelGeo = useMemo(() => {
    const shape = new THREE.Shape()
    const w = labelWidth
    const h = labelHeight
    const r = h // Full rounded top-right corner

    shape.moveTo(0, h)
    shape.lineTo(w - r, h)
    shape.absarc(w - r, h - r, r, Math.PI / 2, 0, true)
    shape.lineTo(w, 0)
    shape.lineTo(0, 0)
    shape.lineTo(0, h)

    const geo = new THREE.ShapeGeometry(shape)
    geo.translate(-w / 2, -h / 2, 0)
    return geo
  }, [labelWidth, labelHeight])


  return (
    <group scale={scale}>
      <mesh
        name="imagePlane"
        ref={meshRef}
        geometry={_sharedPlaneGeo}
        scale={[fixedWidth, fixedWidth * aspect, 1]}
        key={aspect}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHovered(true) }}
        onPointerOut={(e) => { document.body.style.cursor = 'auto'; setHovered(false) }}
        onClick={onClick}
      >
        <meshBasicMaterial
          map={texture}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* ── Editorial Title Overlay ── */}
      {title && (
        <group position={[
          -fixedWidth / 2 + labelWidth / 2,
          (fixedWidth * aspect) / 2 + labelHeight / 2,
          0.001
        ]}>
          <mesh geometry={labelGeo} position={[0, 0, 0]}>
            <meshBasicMaterial ref={bgMatRef} toneMapped={false} transparent opacity={0} depthWrite={false} />
          </mesh>
          <Text
            ref={textRef}
            position={[0, -0.002, 0.001]}
            fontSize={0.035}

            padding
            anchorX="center"
            anchorY="middle"
            font="/inter.ttf"
            letterSpacing={0.02}
            fillOpacity={0}
          >
            {title}
          </Text>
        </group>
      )}
    </group>
  )
}

// ─── Main Floating 3D Item ───────────────────────────────────────────────────
const Floating3DItem = forwardRef(function Floating3DItem(
  { position, itemType, itemData, index },
  externalRef
) {
  const groupRef = useRef()
  const innerRef = useRef()
  const camera = useThree((s) => s.camera)
  const { isDarkMode } = useTheme()
  const { is2DMode } = useLayoutMode()

  // PERF: Track last fade to avoid redundant traverse() calls.
  const lastFade = useRef('')

  useFrame(() => {
    const g = groupRef.current
    if (!g || !innerRef.current) return

    // Make invisible if behind camera
    g.visible = g.position.z < camera.position.z + 5

    // PERF: Skip ALL further processing if item is invisible
    if (!g.visible) return

    // Transform items to black/white before the UI state (80% to 90%)
    // Skip if in 2D grid mode or if this item is currently focused
    const isFocused = interactState.focusedIndex === index
    const fade = (is2DMode || isFocused) ? 0 : Math.max(0, Math.min(1, (scrollState.progress - 0.80) / 0.10))

    // Only traverse when fade value or dark mode actually changes
    const rounded = (fade * 20 | 0) / 20
    const cacheKey = `${rounded}_${isDarkMode}`
    if (cacheKey !== lastFade.current) {
      lastFade.current = cacheKey
      innerRef.current.traverse((child) => {
        if (child.isMesh && child.material && child.name === 'imagePlane') {
          // Save original texture map once
          if (child.material._origMap === undefined) {
            child.material._origMap = child.material.map
          }

          if (isDarkMode) {
            if (fade > 0.6) {
              // High fade: remove texture, solid white for clean logo
              if (child.material.map !== null) {
                child.material.map = null
                child.material.needsUpdate = true
              }
              child.material.color.setRGB(1, 1, 1)
            } else if (fade > 0) {
              // Mid fade: boost brightness with texture still visible
              if (child.material.map !== child.material._origMap) {
                child.material.map = child.material._origMap
                child.material.needsUpdate = true
              }
              const v = 1 + fade * 8
              child.material.color.setRGB(v, v, v)
            } else {
              // No fade: restore original
              if (child.material.map !== child.material._origMap) {
                child.material.map = child.material._origMap
                child.material.needsUpdate = true
              }
              child.material.color.setRGB(1, 1, 1)
            }
          } else {
            // Light mode: fade to black (multiplication naturally works)
            if (child.material.map !== child.material._origMap) {
              child.material.map = child.material._origMap
              child.material.needsUpdate = true
            }
            const v = 1 - fade
            child.material.color.setRGB(v, v, v)
          }
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

  const renderItem = () => (
    <FloatingImage 
      imageSrc={itemData.imageSrc} 
      scale={itemData.scale || 0.7} 
      title={itemData.title || ''} 
      isDarkMode={isDarkMode} 
      onClick={(e) => {
        e.stopPropagation()
        if (interactState.focusedIndex === index) {
          interactState.focusedIndex = null;
        } else {
          interactState.focusedIndex = index;
        }
      }}
    />
  )

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
