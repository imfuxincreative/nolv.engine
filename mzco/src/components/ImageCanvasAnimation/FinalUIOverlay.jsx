import React, { useRef, useEffect } from 'react'
import { scrollState, interactState } from './scrollState'
import { useTheme } from '../../context/ThemeContext.jsx'

// ─── Final UI Overlay ─────────────────────────────────────────────────────────
// PERF: Changed from React state (setOpacity → re-render) to direct DOM
// manipulation via ref. Eliminates React re-renders on every scroll event.
export default function FinalUIOverlay() {
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
      
      const isFocused = interactState.focusedIndex !== null;
      const targetFade = isFocused ? 0 : (fade * layoutAlpha);

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
