'use client'

import { Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'

const BlurText = forwardRef(function BlurText(
  { position, text },
  externalRef
) {
  const ref = useRef()
  const { camera } = useThree()
  const { isDarkMode } = useTheme()

  useFrame(() => {
    if (!ref.current) return

    const distance = Math.abs(ref.current.position.z - camera.position.z)

    const fadeStart = 20
    const fadeEnd = 60
    const t = Math.min(1, Math.max(0, (distance - fadeStart) / (fadeEnd - fadeStart)))
    const opacity = 1 - t

    // apply fade to DOM
    const el = ref.current.__html
    if (el) el.style.opacity = opacity
  })

  return (
    <group
      ref={(el) => {
        ref.current = el
        if (typeof externalRef === 'function') externalRef(el)
        else if (externalRef) externalRef.current = el
      }}
      position={position}
    >
      <Html
        transform
        distanceFactor={1.2}
        occlude={false}
        wrapperClass="pointer-events-none"
      >
        <div
          className="flex gap-3 items-center transition-opacity duration-100"
          style={{
            color: isDarkMode ? '#fff' : '#000',
          }}
        >
          <img
            src={img3}
            className="h-6 w-6 rounded-full"
            alt="avatar"
          />

          <p
            style={{ borderRadius: '18px 18px 18px 4px' }}
            className={`py-1.5 px-3 text-sm whitespace-nowrap
              ${!isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {text}
          </p>
        </div>
      </Html>
    </group>
  )
})

export default BlurText