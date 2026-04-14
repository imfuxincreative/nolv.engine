import { useFrame } from '@react-three/fiber'
import React, { useMemo } from 'react'
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
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 4,
        z: -Math.random() * zRange,
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
  }, [count])

  useFrame(({ camera }) => {
    itemRefs.current.forEach((ref) => {
      if (!ref) return

      // Recycle if behind camera
      if (ref.position.z < camera.position.z - zRange) {
        ref.position.z += zRange
      }
    })
  })

  return (
    <>
      {items.map((item, i) => {
        if (item.type === 'text') {
          return (
            <BlurText
              key={i}
              position={[item.x, item.y, item.z]}
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
            position={[item.x, item.y, item.z]}
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