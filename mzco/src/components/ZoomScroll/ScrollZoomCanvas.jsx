import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import LoopingTexts from './LoopingTexts';
import { scrollState, updateScrollState } from './scrollState'
import LoadingScreen from '../LoadingScreen'

// ─── Update shared scroll state exactly ONCE per frame ────────────────────────
// Priority -100 ensures this runs before all other useFrame callbacks.
function ScrollUpdater() {
  useFrame(() => {
    updateScrollState()
  }, -100)
  return null
}

// ─── Scene Ready Signal ───────────────────────────────────────────────────────
// Waits for the 3D scene to render enough frames, then signals the parent.
function SceneReadySignal({ onReady }) {
  const frameCount = useRef(0)
  const signaled = useRef(false)

  useFrame(() => {
    if (signaled.current) return
    frameCount.current++
    if (frameCount.current >= 90) {
      signaled.current = true
      onReady()
    }
  })
  return null
}

// ─── Final UI Overlay ─────────────────────────────────────────────────────────
// PERF: Changed from React state (setOpacity → re-render) to direct DOM
// manipulation via ref. Eliminates React re-renders on every scroll event.
function FinalUIOverlay() {
  const overlayRef = useRef()
  const lastRounded = useRef(-1)

  useEffect(() => {
    let rafId
    const update = () => {
      const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollMax))
      // Fade in the UI exclusively in the last 5% (0.95 to 1.0) AFTER the logo slides up
      const fade = Math.max(0, Math.min(1, (scrollProgress - 0.95) / 0.05))

      // Only touch DOM when value actually changes
      const rounded = Math.round(fade * 50) / 50
      if (rounded !== lastRounded.current && overlayRef.current) {
        lastRounded.current = rounded

        // Gradient wipe from bottom to top
        const X = (fade * 150) - 50
        const Y = X + 50
        overlayRef.current.style.WebkitMaskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.maskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.pointerEvents = fade > 0.9 ? 'auto' : 'none'
      }
    }

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount in case already scrolled
    update()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-50"
      style={{ opacity: 1 }}
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


function InfiniteCamera() {
  const camera = useThree((s) => s.camera)
  useFrame(() => {
    // PERF: Uses shared scrollState instead of reading DOM
    // Cap camera progress at 90% scroll so it locks into place before the final UI reveals
    const cameraProgress = Math.min(1, scrollState.progress / 0.90)

    // Linear interpolation for anamorphic perspective
    const startZ = -2200;
    const finalZ = 150;
    const targetZ = startZ + cameraProgress * (finalZ - startZ)
    camera.position.z += (targetZ - camera.position.z) * 0.1
  })
  return null
}

export default function ScrollZoomCanvas() {
  const [mobile] = useState(() => isMobile())
  const [sceneReady, setSceneReady] = useState(false)

  const handleSceneReady = useCallback(() => {
    setSceneReady(true)
  }, [])

  // Hide browser scrollbar while this page is active
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      html::-webkit-scrollbar { display: none !important; }
      html { scrollbar-width: none !important; -ms-overflow-style: none !important; }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  // Scroll animation — runs AFTER loading screen disappears
  const handleLoadingComplete = useCallback(() => {
    let start = null
    const startY = window.scrollY
    const targetY = 500
    const duration = 200 // fast snap

    const step = (timestamp) => {
      if (!start) start = timestamp
      const percent = Math.min((timestamp - start) / duration, 1)
      // Fast ease-out curve
      const eased = 1 - Math.pow(1 - percent, 3)

      window.scrollTo(0, startY + (targetY - startY) * eased)

      if (percent < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [])

  return (
    <div className='relative w-full bg-transparent' style={{ height: mobile ? '12000px' : '20000px' }}>
      <LoadingScreen sceneReady={sceneReady} onComplete={handleLoadingComplete} />
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
        <ScrollUpdater />
        <SceneReadySignal onReady={handleSceneReady} />
        <LoopingTexts count={mobile ? 1200 : 1200} zRange={2400} />
        <InfiniteCamera />
      </Canvas>
      <FinalUIOverlay />
    </div>
  )
}
