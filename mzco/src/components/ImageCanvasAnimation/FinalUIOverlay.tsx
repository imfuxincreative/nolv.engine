import React, { useRef, useEffect } from 'react'
import { scrollState, interactState } from './scrollState'
import { useTheme } from '../../context/ThemeContext'
import styles from './FinalUIOverlay.module.css'

// ─── Final UI Overlay ─────────────────────────────────────────────────────────
// PERF: Changed from React state (setOpacity → re-render) to direct DOM
// manipulation via ref. Eliminates React re-renders on every scroll event.
export default function FinalUIOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lastRounded = useRef(-1)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    let rafId: ReturnType<typeof requestAnimationFrame>
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
        overlayRef.current.style.webkitMaskImage = `linear-gradient(to top, rgba(0,0,0,1) ${X}%, rgba(0,0,0,0) ${Y}%)`
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
      className={styles.container}
      style={{ opacity: 1 }}
    >
      <div className={styles.inner} style={{ fontFamily: 'sans-serif' }}>
        <h3 className={`${styles.title} ${isDarkMode ? styles.textWhite : styles.textBlack}`}>
          nolv / No Limit Visual
        </h3>
        <p className={`${styles.subtitle} ${isDarkMode ? styles.textWhite : styles.textBlack}`}>
          A creative <span className={styles.fontMedium}>engine </span> for <span className={styles.italic}>visuals </span>recognization
        </p>
        <button 
          onClick={() => window.open('https://nolv.vercel.app/signup', '_self')}
          className={`${styles.btn} ${isDarkMode ? styles.btnDark : styles.btnLight}`}>
          Join now
        </button>
      </div>
    </div>
  )
}
