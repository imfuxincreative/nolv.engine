'use client'

import { Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'

const BlurText = forwardRef(function BlurText(
  { position, message, theme, profile },
  externalRef
) {
  const ref = useRef()
  const pRef = useRef()
  const { camera } = useThree()
  const { isDarkMode } = useTheme()
  const CHAT_THEMES = {
    black: {
      bg: 'black',
      text: '#ffffff',
    },
    gray: {
      bg: '#ededed',
      text: 'black',
    },
    red: {
      bg: 'orangered',
      text: '#ffffff',
    },
    blue: {
      bg: '#0004DD',
      text: 'white',
    },
    pink: {
      bg: '#FDE4F2',
      text: 'black',
    },
    neon: {
      bg: '#D9FF00',
      text: 'black',
    },
  }
  const currentTheme =
    CHAT_THEMES[theme?.toLowerCase()] || CHAT_THEMES.black
  useFrame(() => {
    if (!ref.current) return

    // Items should stay fully visible if they are in front of the camera
    // If they go behind the camera, we can make them invisible
    if (ref.current.position.z > camera.position.z + 5) {
      ref.current.visible = false
    } else {
      ref.current.visible = true
      // fade the html brightness to 0 to make it black before UI slide (80% -> 90%)
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollMax))
      const fade = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.10))
      
      if (pRef.current) {
        // transitioning bg and text colors directly to black
        pRef.current.style.filter = `brightness(${1 - fade})`
      }
    }
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
          {/* <img
            src={img3}
            className="h-6 w-6 rounded-full"
            alt="avatar"
          /> */}

          <p
            ref={pRef}
            style={{
              backgroundColor: 'black',
              color: 'white',
              boxShadow: currentTheme.glow,
              // borderRadius: '18px 18px 18px 4px',
            }}
            className={` px-3 text-sm whitespace-nowrap
              `}
          >
            {message}
          </p>
        </div>
      </Html>
    </group>
  )
})

export default BlurText