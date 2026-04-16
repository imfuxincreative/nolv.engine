import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import LoopingTexts from './LoopingTexts';
import { scrollState, updateScrollState } from './scrollState'
import LoadingScreen from '../LoadingScreen'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLayoutMode } from '../../context/LayoutContext.jsx'
import { useDrag } from '@use-gesture/react'

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
  const { isDarkMode } = useTheme()

  useEffect(() => {
    let rafId
    const tick = () => {
      // Sync strictly using 60fps shared R3F state vars rather than DOM scroll events
      const scrollProgress = scrollState.progress || 0;
      
      // Fade in the UI exclusively in the last 5% AFTER the logo slides up
      const fade = Math.max(0, Math.min(1, (scrollProgress - 0.95) / 0.05));
      
      // We only want the overlay mathematically visible when layout is deeply inside 3D mode (progress near 0)
      const lp = scrollState.layoutProgress || 0;
      // Tighten the layoutAlpha so the UI only begins to appear when morph is > 90% complete
      const layoutAlpha = Math.pow(1 - lp, 8);
      
      const targetFade = fade * layoutAlpha;

      // Only touch DOM when value actually changes significantly
      const rounded = Math.round(targetFade * 50) / 50
      if (rounded !== lastRounded.current && overlayRef.current) {
        lastRounded.current = rounded
        // Gradient wipe from bottom to top
        const X = (targetFade * 150) - 50
        const Y = X + 50
        overlayRef.current.style.WebkitMaskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.maskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
        overlayRef.current.style.pointerEvents = targetFade > 0.9 ? 'auto' : 'none'
      }
      
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-50"
      style={{ opacity: 1 }}
    >
      <div className="mt-4 text-center flex flex-col items-center" style={{ fontFamily: 'sans-serif' }}>
        <h3 className={`text-[15px] font-medium mb-0 transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          nolv / No Limit Visual
        </h3>
        <p className={`text-[14px] font-medium opacity-[0.66] mb-3 text-base transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          A creative <span className='font-medium'>engine </span> for <span className='italic'>visuals </span>recognization
        </p>
        <button 
          onClick={() => window.open('https://nolv.vercel.app/signup', '_self')}
          className={`px-5 py-1.5 text-[13px] rounded-[2px] transition-all duration-500 shadow-xl cursor-pointer ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
          Join now
        </button>
      </div>
    </div>
  )
}

const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))


function InfiniteCamera() {
  const camera = useThree((s) => s.camera)
  const { is2DMode } = useLayoutMode()
  const transitionRef = useRef(is2DMode ? 1 : 0)

  useFrame(() => {
    // Fast, uniform target mode interpolation
    const targetMode = is2DMode ? 1 : 0
    transitionRef.current += (targetMode - transitionRef.current) * 0.15

    // PERF: Uses shared scrollState instead of reading DOM
    const cameraProgress = Math.min(1, scrollState.progress / 0.90)

    // Linear interpolation for anamorphic perspective
    const startZ = -2200;
    const finalZ = 150;

    const scrollZ = startZ + cameraProgress * (finalZ - startZ);

    // Direct linear alignment with the layout toggle so there is zero camera lag/overtake variance
    const targetZ = scrollZ + (150 - scrollZ) * transitionRef.current;

    camera.position.z += (targetZ - camera.position.z) * 0.3
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
      const eased = 1 - Math.pow(1 - percent, 3)
      window.scrollTo(0, startY + (targetY - startY) * eased)
      if (percent < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  const { is2DMode } = useLayoutMode()

  const dragRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, isDragging: false });

  const bind = useDrag(
    ({ delta: [dx, dy], velocity: [vx, vy], direction: [dirX, dirY], first, last }) => {
      if (!is2DMode) return;

      if (first) {
        dragRef.current.isDragging = true;
        dragRef.current.vx = 0;
        dragRef.current.vy = 0;
      }

      // Update literal drag target directly based on user's finger/mouse
      dragRef.current.targetX += dx;
      dragRef.current.targetY += dy;

      if (last) {
        dragRef.current.isDragging = false;
        // Inject velocity at releasing moment for inertia continuation
        dragRef.current.vx = vx * dirX * 35; // Tune multiplier for throw intensity
        dragRef.current.vy = vy * dirY * 35;
      }
    },
    { pointer: { touch: true } }
  );

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
        <LoopingTexts count={mobile ? 1200 : 1200} zRange={2400} dragRef={dragRef} />
        <InfiniteCamera />
      </Canvas>
      <FinalUIOverlay />

      {/* 2D Mode Interaction Overlay */}
      {is2DMode && (
        <div
          {...bind()}
          className="fixed inset-0 z-40 touch-none cursor-grab active:cursor-grabbing"
          style={{ background: 'transparent' }}
        />
      )}

      {/* Screen Frame Vignette Overlay (Premium Gallery Framing) */}
      <div 
        className={`fixed inset-[12px] pointer-events-none z-[100] rounded-[34px] transition-all duration-1000 ease-in-out ${is2DMode ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          boxShadow: `0 0 0 100vmax #ffffff`, // Force white frame as requested
        }}
      />
    </div>
  )
}
