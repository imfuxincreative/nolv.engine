import React, { useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import LoopingTexts from './LoopingTexts';
import LoopingUI from '../loopingUi';

function FinalUIOverlay() {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollMax))
      // Fade in the UI exclusively in the last 5% (0.95 to 1.0) AFTER the logo slides up
      const fade = Math.max(0, Math.min(1, (scrollProgress - 0.95) / 0.05))
      setOpacity(fade)
    }
    window.addEventListener('scroll', handleScroll)
    // Run once on mount in case already scrolled
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gradient wipe from bottom to top
  // At opacity=0, entire div is transparent. At opacity=1, entire div is visible.
  const X = (opacity * 150) - 50;
  const Y = X + 50;
  const maskStyle = {
    WebkitMaskImage: `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`,
    maskImage: `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`,
    pointerEvents: opacity > 0.9 ? 'auto' : 'none',
    opacity: 1 // ensure base opacity is 1 so mask works
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-50"
      style={maskStyle}
    >
      <div className="mt-4 text-center flex flex-col items-center" style={{ fontFamily: 'sans-serif' }}>
        <h3 className="text-[15px] font-medium text-black mb-0">nolv / No Limit Visual</h3>
        <p className="text-[14px] font-medium opacity-[0.66] mb-3 text-base ">A creative <span className='font-medium'>engine </span> for <span className='italic'>visuals </span>recognization</p>
        <button className="bg-black text-white px-5 py-1.5 text-[13px] rounded-[2px] hover:bg-gray-800 transition-colors shadow-xl">
          Join now
        </button>
      </div>
    </div>
  )
}

const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))


function InfiniteCamera({ scrollRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollMax))
    // Cap camera progress at 90% scroll so it locks into place before the final UI reveals
    const cameraProgress = Math.min(1, scrollProgress / 0.90)

    // Linear interpolation for anamorphic perspective
    const startZ = -2200;
    const finalZ = 150;
    const targetZ = startZ + cameraProgress * (finalZ - startZ)
    camera.position.z += (targetZ - camera.position.z) * 0.1
  })
  return null
}

export default function ScrollZoomCanvas() {
  const scrollRef = useRef(0)
  const [mobile] = useState(() => isMobile())

  useEffect(() => {
    let start = null
    const startY = window.scrollY
    const targetY = 500
    const duration = 500 // in ms

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percent = Math.min(progress / duration, 1)
      const eased = percent < 0.5
        ? 2 * percent * percent
        : -1 + (4 - 2 * percent) * percent

      window.scrollTo(0, startY + (targetY - startY) * eased)

      if (percent < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY / window.innerHeight


    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='relative w-full bg-transparent' style={{ height: mobile ? '12000px' : '20000px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50, far: 10000 }}
        className='!fixed  top-0 left-0 w-full h-screen'
        dpr={mobile ? 1 : [1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: !mobile }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        {!mobile && <pointLight position={[-3, 2, 4]} intensity={0.5} color="#D9FF00" />}
        {!mobile && <hemisphereLight groundColor="#1a1a2e" intensity={0.3} />}
        <LoopingTexts count={mobile ? 400 : 1200} zRange={mobile ? 1600 : 2400} />
        {/* <LoopingUI />   */}
        <InfiniteCamera scrollRef={scrollRef} />
      </Canvas>
      <FinalUIOverlay />
    </div>
  )
}

