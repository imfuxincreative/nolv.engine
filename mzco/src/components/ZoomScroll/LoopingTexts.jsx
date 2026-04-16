import { useFrame } from '@react-three/fiber'
import React, { useMemo, useState, useEffect, useRef } from 'react'
import BlurText from './BlurText'
import Floating3DItem from './Floating3DItem'
import * as THREE from 'three'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'
import { scrollState } from './scrollState'
import { useLayoutMode } from '../../context/LayoutContext.jsx'

// ─── Image pool for floating images ──────────────────────────────────────────
import imgBeach2 from '../../assets/images/InfiniteImages/beach2.jpg'
import imgFlower from '../../assets/images/InfiniteImages/flower.jpg'


import imgMountain from '../../assets/images/InfiniteImages/mountain.jpg'
import imgRain from '../../assets/images/InfiniteImages/rain.jpg'
import imgSerenity from '../../assets/images/InfiniteImages/serenity.jpg'
import imgBuilding from '../../assets/images/InfiniteImages/building.jpg'
import imgLake from '../../assets/images/InfiniteImages/lake.jpg'

const CARD_IMAGES = [img3, imgBeach2, imgFlower, imgRain, imgSerenity, imgBuilding, '/InfiniteImages/abundance.webp', '/InfiniteImages/monster.webp', '/InfiniteImages/wanted.webp', '/InfiniteImages/nostalogia.webp', '/InfiniteImages/freedom.webp', '/InfiniteImages/architecture.webp', '/InfiniteImages/starlight.webp', '/harv.webp', '/fire.jpg', '/InfiniteImages/founder.webp', '/InfiniteImages/timeless.webp', '/InfiniteImages/black.jpg', '/InfiniteImages/white.jpg', '/InfiniteImages/first.jpg', '/InfiniteImages/ar.jpg', '/InfiniteImages/vtw.webp', '/InfiniteImages/vbw.webp', '/InfiniteImages/vai.webp', '/InfiniteImages/insane.jpg', '/InfiniteImages/air.jpg', '/InfiniteImages/kng.webp', '/InfiniteImages/flash.jpg', '/InfiniteImages/eid.heic', '/InfiniteImages/ky.jpg', '/InfiniteImages/color.jpg', '/InfiniteImages/dry.jpg', '/InfiniteImages/ship.heic', '/InfiniteImages/xxo.jpg', '/InfiniteImages/travis.webp', '/InfiniteImages/sham.jpg']

function LoopingTexts({ count = 80, zRange = 160, dragRef }) {
  const itemRefs = useRef([])

  // ── Chat text options ───────────────────────────────────────────────────────
  const textOptions = [
    { name: "User", profile: img3, message: "hiii", theme: "neon" },
    { name: "User", profile: img3, message: "I'm Fuckin' creative", theme: "neon" },
    { name: "User", profile: img3, message: "hello", theme: "gray" },
    { name: "User", profile: img3, message: "flow()", theme: "neon" },
    { name: "User", profile: img3, message: "code", theme: "pink" },
    { name: "User", profile: img3, message: "innovation", theme: "gray" },
    { name: "User", profile: img3, message: "function()", theme: "neon" },
    { name: "User", profile: img3, message: "404", theme: "black" },
    { name: "User", profile: img3, message: "<motion/>", theme: "neon" },
    { name: "User", profile: img3, message: "I love motion", theme: "blue" },
    { name: "User", profile: img3, message: "blend", theme: "gray" },
    { name: "User", profile: img3, message: "creative", theme: "neon" },
    { name: "User", profile: img3, message: "Design", theme: "gray" },
    { name: "User", profile: img3, message: ";)", theme: "black" },
    { name: "User", profile: img3, message: "craft", theme: "neon" },
    { name: "User", profile: img3, message: "visual", theme: "pink" },
    { name: "User", profile: img3, message: ":)", theme: "black" },
    { name: "User", profile: img3, message: "I'm wanna shine", theme: "pink" },
    { name: "User", profile: img3, message: "mzco.creative", theme: "neon" },
    { name: "User", profile: img3, message: "Stooop.", theme: "black" },
    { name: "User", profile: img3, message: "figma", theme: "pink" },
  ]

  // ── Generate random items: ~50% text, ~50% images ──────────────────────────
  const items = useMemo(() => {
    const areaSize = 45; // Match random layout area size for 2D wrapping
    return Array.from({ length: count }).map(() => {
      const roll = Math.random()

      const basePos = {
        x: (Math.random() - 0.5) * 8, // increase slightly to fill space
        y: (Math.random() - 0.5) * 6,
        zBase: 120 - Math.random() * zRange, // Items generated from Z=120 down to deepest tunnel bounds
        rand2DX: (Math.random() - 0.5) * areaSize,
        rand2DY: (Math.random() - 0.5) * areaSize,
      }

      if (roll < 0.15) {
        // ─── Chat text bubble ──────────────────────────────────────────
        return {
          type: 'text',
          ...basePos,
          data: textOptions[Math.floor(Math.random() * textOptions.length)],
        }
      } else {
        // ─── Floating image ────────────────────────────────────────────
        const img = CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)]
        return {
          type: 'image',
          ...basePos,
          data: {
            imageSrc: img,
            scale: 0.5 + Math.random() * 0.4,
          },
        }
      }
    })
  }, [count, zRange]) // added zRange to deps

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
      setLogoPoints(points.sort(() => 0.5 - Math.random()))
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

      // Tilt plane for isometric perspective
      const angleX = 0.15; // tilt slightly back
      const angleY = -0.15; // tilt the plane slightly

      let lz = 0;
      let ty = py * Math.cos(angleX) - lz * Math.sin(angleX);
      let tz = py * Math.sin(angleX) + lz * Math.cos(angleX);
      let updatedPY = ty; lz = tz;

      let tx = px * Math.cos(angleY) + lz * Math.sin(angleY);
      tz = -px * Math.sin(angleY) + lz * Math.cos(angleY);
      let updatedPX = tx; lz = tz;

      const pos2D_x = updatedPX;
      const pos2D_y = updatedPY;
      // We can also mildly randomize Z so they aren't totally flat, 
      // adding extreme depth to the scatter in 2D mode!
      const randZ = Math.sin(i * 24.11) * 2.0; // depth float
      const pos2D_z = z2D + lz + randZ;

      // Base uniform scale in 2D, organically randomized to reflect image aesthetic
      const randomScaleBase = Math.cos(i * 31.42); 
      let targetScale2D = item.type === 'text' 
          ? 0.35 + (randomScaleBase * 0.15) 
          : 0.95 + (randomScaleBase * 0.4); 
          
      // ensure we don't scale negatively
      if (targetScale2D < 0.2) targetScale2D = 0.2;

      // Apply lerp
      const lp = layoutProgress.current
      ref.position.x = pos3D_x + (pos2D_x - pos3D_x) * lp
      ref.position.y = pos3D_y + (pos2D_y - pos3D_y) * lp
      ref.position.z = pos3D_z + (pos2D_z - pos3D_z) * lp

      const finalScale = scale3D + (targetScale2D - scale3D) * lp
      ref.scale.set(finalScale, finalScale, finalScale)

      ref.rotation.x = angleX * lp
      ref.rotation.y = angleY * lp
    }
  })

  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'text') {
          return (
            <BlurText
              key={i}
              position={[item.x, item.y, item.zBase]}
              message={item.data.message}
              theme={item.data.theme}
              profile={item.data.profile}
              ref={(el) => (itemRefs.current[i] = el)}
            />
          )
        }

        return (
          <Floating3DItem
            key={i}
            position={[item.x, item.y, item.zBase]}
            itemType={item.type}
            itemData={item.data}
            ref={(el) => (itemRefs.current[i] = el)}
          />
        )
      })}
    </>
  )
}

export default LoopingTexts