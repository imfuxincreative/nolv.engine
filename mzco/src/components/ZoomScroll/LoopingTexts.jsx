import { useFrame } from '@react-three/fiber'
import React, { useMemo, useState, useEffect, useRef } from 'react'

import Floating3DItem from './Floating3DItem'
import * as THREE from 'three'

import { scrollState, interactState } from './scrollState'
import { useLayoutMode } from '../../context/LayoutContext.jsx'

// ─── Image pool for floating images ──────────────────────────────────────────
import imgBeach2 from '../../assets/images/InfiniteImages/beach2.jpg'
import imgFlower from '../../assets/images/InfiniteImages/flower.jpg'


import imgMountain from '../../assets/images/InfiniteImages/mountain.jpg'
import imgRain from '../../assets/images/InfiniteImages/rain.jpg'
import imgSerenity from '../../assets/images/InfiniteImages/serenity.jpg'
import imgBuilding from '../../assets/images/InfiniteImages/building.jpg'
import imgLake from '../../assets/images/InfiniteImages/lake.jpg'

const CARD_IMAGES = [imgFlower, imgRain, imgSerenity, imgBuilding, '/InfiniteImages/abundance.webp', '/InfiniteImages/monster.webp', '/InfiniteImages/wanted.webp', '/InfiniteImages/cyber.png', '/InfiniteImages/wanted.webp', '/InfiniteImages/flying.png', '/InfiniteImages/pre1.png', '/InfiniteImages/architecture.webp', '/InfiniteImages/starlight.webp', '/fire.jpg', '/InfiniteImages/black.jpg', '/InfiniteImages/white.jpg', '/InfiniteImages/ar.jpg', '/InfiniteImages/vai.webp', '/InfiniteImages/insane.jpg', '/InfiniteImages/air.jpg']

function LoopingTexts({ count = 80, zRange = 160, dragRef }) {
  const itemRefs = useRef([])



  // ── Generate image items ───────────────────────────────────────────────────
  const items = useMemo(() => {
    const areaSize = 45; // Match random layout area size for 2D wrapping
    return Array.from({ length: count }).map(() => {
      const img = CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)]
      return {
        type: 'image',
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
        zBase: 120 - Math.random() * zRange,
        rand2DX: (Math.random() - 0.5) * areaSize,
        rand2DY: (Math.random() - 0.5) * areaSize,
        data: {
          imageSrc: img,
          scale: 0.5 + Math.random() * 0.4,
          title: img.split('/').pop()
        },
      }
    })
  }, [count, zRange])

  // ── Read Logo points & Load Texture ────────────────────────────────────────────────────────
  const [logoPoints, setLogoPoints] = useState([])
  const [logoTex, setLogoTex] = useState(null)
  const realLogoRef = useRef()

  useEffect(() => {
    new THREE.TextureLoader().load('/nolv.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setLogoTex(tex)
    })

    const img = new Image()
    img.src = '/nolv.png'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const w = 150
      const h = Math.floor(img.height * (150 / img.width))
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)
      const data = ctx.getImageData(0, 0, w, h).data
      const points = []

      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const alpha = data[(y * w + x) * 4 + 3]
          if (alpha > 128) { // non-transparent
            const nx = (x / w) - 0.5
            const ny = -((y / h) - 0.5) * (h / w)
            points.push({ x: nx, y: ny })
          }
        }
      }
      // Removed random shuffle so the logo mapping physically ties to the grid map
      // This prevents the chaotic 'flying across the screen' and anchors their paths.
      setLogoPoints(points)
    }
  }, [])

  const { is2DMode } = useLayoutMode()
  const layoutProgress = useRef(0)

  const wrap = (val, max) => ((val % max) + max) % max;

  useFrame((stateEvent) => {
    if (logoPoints.length === 0) return

    // Interpolate layout mode smoothly and blazingly fast
    const targetMode = is2DMode ? 1 : 0
    layoutProgress.current += (targetMode - layoutProgress.current) * 0.15
    scrollState.layoutProgress = layoutProgress.current;

    // PERF: Read from shared scrollState instead of accessing DOM
    const scrollProgress = scrollState.progress

    // The camera smoothly travels from z=10 to z=150.
    // At z=150, the perspective alignment perfectly recreates the logo.
    const finalCameraZ = 150

    // PERF: Pre-compute values used by all items
    const cameraProgress = Math.min(1, scrollProgress / 0.90)
    const dynamicSizeMultiplier = 1 + (1.5 * (1 - cameraProgress))
    const finalFade = Math.max(0, Math.min(1, (scrollProgress - 0.90) / 0.04))
    const targetYOffset = finalFade * 0.8
    const spreadFactor = 0.08

    const refs = itemRefs.current
    const len = refs.length

    // Handle physics updates
    let dx = 0;
    let dy = 0;
    const state = dragRef?.current;
    if (state) {
      if (!state.isDragging) {
        // Friction on the inertia injection
        state.vx *= 0.92; // 0.92 adds nice slide
        state.vy *= 0.92;
        state.targetX += state.vx;
        state.targetY += state.vy;
      }

      // Smooth lerp for buttery lag like Lenis
      // Lenis uses ~0.1 interpolation rate
      state.x += (state.targetX - state.x) * 0.1;
      state.y += (state.targetY - state.y) * 0.1;

      dx = state.x * 0.025;
      dy = state.y * 0.025; // Positive to match natural grab/move action
    }

    // 2D Canvas Layout Area Constants
    const cols = Math.ceil(Math.sqrt(len));
    const gridSpacing = 1.6; // Keeping spacing relative to scales
    const gridWidth = cols * gridSpacing;
    const gridHeight = cols * gridSpacing;
    const z2D = 143; // Pulled back from camera (Z=150) for a wider, zoomed-out field of view

    const isMorphing = Math.abs(layoutProgress.current - targetMode) > 0.01;

    for (let i = 0; i < len; i++) {
      const ref = refs[i]
      if (!ref) continue

      const item = items[i]
      const targetPoint = logoPoints[i % logoPoints.length]

      // --- 3D Anamorphic Layout ---
      const itemZ = item.zBase
      const distanceToFinal = finalCameraZ - itemZ

      const pos3D_x = targetPoint.x * distanceToFinal * spreadFactor
      const pos3D_y = (targetPoint.y + targetYOffset) * distanceToFinal * spreadFactor
      const pos3D_z = itemZ
      const scale3D = distanceToFinal * 0.0015 * dynamicSizeMultiplier

      // --- 2D Scattered Layout ---
      const rowIndex = Math.floor(i / cols)
      const colIndex = i % cols

      // Deterministic pseudo-random scatter offsets based on node index
      const randX = Math.sin(i * 13.52) * 2.5; // organic horiz spread
      const randY = Math.cos(i * 18.21) * 2.5; // organic vert spread

      const rawX = colIndex * gridSpacing + randX + dx;
      const rawY = rowIndex * gridSpacing + randY + dy;

      const wrappedX = wrap(rawX, gridWidth);
      const wrappedY = wrap(rawY, gridHeight);

      const px = wrappedX - gridWidth / 2;
      const py = -(wrappedY - gridHeight / 2); // Drag pulls in natural inverted Y direction

      // Force pure flat 2D projection with zero isometric tilt
      const angleX = 0;
      const angleY = 0;

      const pos2D_x = px;
      const pos2D_y = py;

      // Microscopic Z offset purely for z-buffer layering (prevents flickering)
      // Removes all 'parallax' or floating depth completely.
      const pos2D_z = z2D + (i * 0.001);

      // Base uniform scale in 2D, organically randomized to reflect image aesthetic
      const randomScaleBase = Math.cos(i * 31.42);
      let targetScale2D = 0.95 + (randomScaleBase * 0.4);

      // ensure we don't scale negatively
      if (targetScale2D < 0.2) targetScale2D = 0.2;

      // Apply lerp
      const lp = layoutProgress.current
      let targetX = pos3D_x + (pos2D_x - pos3D_x) * lp
      let targetY = pos3D_y + (pos2D_y - pos3D_y) * lp
      let targetZ = pos3D_z + (pos2D_z - pos3D_z) * lp
      let finalScale = scale3D + (targetScale2D - scale3D) * lp
      let targetRotX = angleX * lp
      let targetRotY = angleY * lp

      // --- Focus Logic ---
      if (ref.userData.offsetX === undefined) {
        ref.userData.offsetX = 0;
        ref.userData.offsetY = 0;
        ref.userData.offsetZ = 0;
        ref.userData.offsetScale = 0;
        ref.userData.offsetRotX = 0;
        ref.userData.offsetRotY = 0;
      }
      
      const isFocused = interactState.focusedIndex === i;
      const anyFocused = interactState.focusedIndex !== null;

      let targetOffsetX = 0;
      let targetOffsetY = 0;
      let targetOffsetZ = 0;
      let targetOffsetScale = 0;
      let targetOffsetRotX = 0;
      let targetOffsetRotY = 0;

      if (isFocused) {
        const cam = stateEvent.camera;
        targetOffsetX = cam.position.x - targetX;
        targetOffsetY = cam.position.y - targetY;
        targetOffsetZ = (cam.position.z - 3) - targetZ;
        targetOffsetScale = 1.2 - finalScale;
        targetOffsetRotX = cam.rotation.x - targetRotX;
        targetOffsetRotY = cam.rotation.y - targetRotY;
      } else if (anyFocused) {
        let dirX = targetX;
        let dirY = targetY;
        
        if (Math.abs(dirX) < 0.1 && Math.abs(dirY) < 0.1) {
          dirX = (i % 2 === 0) ? 1 : -1;
          dirY = (i % 3 === 0) ? 1 : -1;
        }

        const len = Math.sqrt(dirX * dirX + dirY * dirY);
        dirX /= len;
        dirY /= len;

        targetOffsetX = dirX * 30;
        targetOffsetY = dirY * 30;
      }

      // Dynamic interpolation speeds
      let lerpSpeed = anyFocused ? 0.28 : 0.06;
      if (isMorphing && !anyFocused) {
        lerpSpeed = 0.15; // Match layout transition speed
      }

      ref.userData.offsetX += (targetOffsetX - ref.userData.offsetX) * lerpSpeed;
      ref.userData.offsetY += (targetOffsetY - ref.userData.offsetY) * lerpSpeed;
      ref.userData.offsetZ += (targetOffsetZ - ref.userData.offsetZ) * lerpSpeed;
      ref.userData.offsetScale += (targetOffsetScale - ref.userData.offsetScale) * lerpSpeed;
      ref.userData.offsetRotX += (targetOffsetRotX - ref.userData.offsetRotX) * lerpSpeed;
      ref.userData.offsetRotY += (targetOffsetRotY - ref.userData.offsetRotY) * lerpSpeed;

      ref.position.x = targetX + ref.userData.offsetX;
      ref.position.y = targetY + ref.userData.offsetY;
      ref.position.z = targetZ + ref.userData.offsetZ;

      const currentScale = finalScale + ref.userData.offsetScale;
      ref.scale.set(currentScale, currentScale, currentScale);

      ref.rotation.x = targetRotX + ref.userData.offsetRotX;
      ref.rotation.y = targetRotY + ref.userData.offsetRotY;
    }
  })

  return (
    <>
      {items.map((item, i) => (
        <Floating3DItem
          key={i}
          index={i}
          position={[item.x, item.y, item.zBase]}
          itemType={item.type}
          itemData={item.data}
          ref={(el) => (itemRefs.current[i] = el)}
        />
      ))}
    </>
  )
}

export default LoopingTexts