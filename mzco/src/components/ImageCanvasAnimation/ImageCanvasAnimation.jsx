import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import ImageCanvas from './ImageCanvas'
import { scrollState, interactState } from './scrollState'
import LoadingScreen from '../LoadingScreen'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLayoutMode } from '../../context/LayoutContext.jsx'
import { useDrag } from '@use-gesture/react'
import ScrollUpdater from './ScrollUpdater'
import SceneReadySignal from './SceneReadySignal'
import InfiniteCamera from './InfiniteCamera'
import FinalUIOverlay from './FinalUIOverlay'

const isMobile = () => typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))

export default function ImageCanvasAnimation() {
  const [mobile] = useState(() => isMobile())
  const [sceneReady, setSceneReady] = useState(false)
  const { isDarkMode } = useTheme()

  const handleSceneReady = useCallback(() => {
    setSceneReady(true)
  }, [])

  // Auto-close focused image when theme changes
  useEffect(() => {
    interactState.focusedIndex = null;
  }, [isDarkMode])

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

  const prevIs2DMode = useRef(is2DMode)
  useEffect(() => {
    if (is2DMode && !prevIs2DMode.current) {
      interactState.focusedIndex = null;
    }
    prevIs2DMode.current = is2DMode;
  }, [is2DMode])

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
    <div 
      {...(is2DMode ? bind() : {})} 
      className={`relative w-full bg-transparent ${is2DMode ? 'touch-none cursor-grab active:cursor-grabbing' : ''}`} 
      style={{ height: mobile ? '12000px' : '20000px' }}
    >
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
        <ImageCanvas count={mobile ? 1200 : 1200} zRange={2400} dragRef={dragRef} />
        <InfiniteCamera />
      </Canvas>
      <FinalUIOverlay />
    </div>
  )
}
