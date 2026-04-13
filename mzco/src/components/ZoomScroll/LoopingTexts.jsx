import { useFrame } from '@react-three/fiber'
import React, { useMemo, useState, useEffect } from 'react'
import BlurText from './BlurText'
import Floating3DItem from './Floating3DItem'
import { useRef } from 'react'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'

// ─── Image pool for floating images ──────────────────────────────────────────
import imgBeach2 from '../../assets/images/InfiniteImages/beach2.jpg'
import imgFlower from '../../assets/images/InfiniteImages/flower.jpg'
import imgMountain from '../../assets/images/InfiniteImages/mountain.jpg'
import imgRain from '../../assets/images/InfiniteImages/rain.jpg'
import imgSerenity from '../../assets/images/InfiniteImages/serenity.jpg'
import imgBuilding from '../../assets/images/InfiniteImages/building.jpg'
import imgLake from '../../assets/images/InfiniteImages/lake.jpg'

const CARD_IMAGES = [img3, imgBeach2, imgFlower, imgRain, imgSerenity, imgBuilding, '/InfiniteImages/abundance.webp', '/InfiniteImages/monster.webp', '/InfiniteImages/wanted.webp', '/InfiniteImages/nostalogia.webp', '/InfiniteImages/freedom.webp', '/InfiniteImages/architecture.webp', '/InfiniteImages/starlight.webp']

function LoopingTexts({ count = 80, zRange = 160 }) {
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
    return Array.from({ length: count }).map(() => {
      const roll = Math.random()

      const basePos = {
        x: (Math.random() - 0.5) * 8, // increase slightly to fill space
        y: (Math.random() - 0.5) * 6,
        zBase: -Math.random() * zRange,
      }

      if (roll < 0.5) {
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

  // ── Read Logo points ────────────────────────────────────────────────────────
  const [logoPoints, setLogoPoints] = useState([])

  useEffect(() => {
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

  useFrame(() => {
    if (logoPoints.length === 0) return

    // The camera smoothly travels from z=10 to z=150.
    // At z=150, the perspective alignment perfectly recreates the logo.
    const finalCameraZ = 150

    itemRefs.current.forEach((ref, i) => {
      if (!ref) return
      
      const item = items[i]
      const targetPoint = logoPoints[i % logoPoints.length]
      
      // Keep items entirely stationary.
      const itemZ = item.zBase 
      const distanceToFinal = finalCameraZ - itemZ 

      // Multiply the normalized 2D point based on its distance to the final camera point.
      // This forms a perspective cone (anamorphic illusion).
      const spreadFactor = 0.40 
      
      ref.position.x = targetPoint.x * distanceToFinal * spreadFactor
      ref.position.y = targetPoint.y * distanceToFinal * spreadFactor
      ref.position.z = itemZ

      // Scale items so they appear roughly the same size regardless of Z depth.
      const scale = distanceToFinal * 0.035
      ref.scale.set(scale, scale, scale)
      
      // Make sure they face the camera perfectly to maintain the illusion
      ref.rotation.x = 0
      ref.rotation.y = 0
    })
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