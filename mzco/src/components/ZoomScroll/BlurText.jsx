'use client'

import { Html } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLayoutMode } from '../../context/LayoutContext.jsx'
import img3 from '../../assets/images/InfiniteImages/beach1.jpg'
import { scrollState } from './scrollState'

const BlurText = forwardRef(function BlurText(
  { position, message, theme, profile },
  externalRef
) {
  const ref = useRef()
  const pRef = useRef()
  const camera = useThree((s) => s.camera)
  const { isDarkMode } = useTheme()
  const { is2DMode } = useLayoutMode()
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

  // PERF: Track last fade value to avoid unnecessary DOM writes
  const lastFade = useRef('')

  useFrame(() => {
    if (!ref.current) return

    // Items should stay fully visible if they are in front of the camera
    // If they go behind the camera, we can make them invisible
    if (ref.current.position.z > camera.position.z + 5) {
      ref.current.visible = false
    } else {
      ref.current.visible = true

      // PERF: Read from shared scrollState instead of DOM
      const fade = is2DMode ? 0 : Math.max(0, Math.min(1, (scrollState.progress - 0.80) / 0.10))

      const rounded = (fade * 20 | 0) / 20
      const cacheKey = `${rounded}_${isDarkMode}`
      if (cacheKey !== lastFade.current) {
        lastFade.current = cacheKey
        if (pRef.current) {
          if (isDarkMode) {
            // Dark mode: fade to white
            pRef.current.style.filter = `brightness(${1 + fade * 9})`
            // Force text to fade out (white on white) at high fades so it's a pure white block
            pRef.current.style.color = fade > 0.6 ? 'white' : 'black'
          } else {
            // Light mode: fade to black
            pRef.current.style.filter = `brightness(${1 - fade})`
            // Force text to fade out (black on black) at high fades so it's a pure black block
            pRef.current.style.color = fade > 0.6 ? 'black' : 'white'
          }
        }
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
        occlude="blending"
        wrapperClass="pointer-events-none"
      >
        <div
          className="flex gap-3 items-center transition-colors duration-500"
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
              backgroundColor: isDarkMode ? 'white' : 'black',
              color: isDarkMode ? 'black' : 'white',
              boxShadow: currentTheme.glow,
              // borderRadius: '18px 18px 18px 4px',
            }}
            className={` px-3 text-sm whitespace-nowrap transition-colors duration-500
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